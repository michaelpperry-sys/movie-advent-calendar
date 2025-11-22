// Constants
const YEAR = 2025;
const START_DATE = new Date(YEAR, 10, 28); // November 28, 2025
const END_DATE = new Date(YEAR, 11, 25); // December 25, 2025
const TOTAL_DAYS = 28;

// Calendar state
let calendarCode = '';
let movieSequence = [];
let openedBoxes = new Set();
let fannyAlexanderDay = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeCalendar();
    setupEventListeners();
    checkResetButton();
});

// Initialize calendar
function initializeCalendar() {
    // Get or create calendar code from URL
    const urlParams = new URLSearchParams(window.location.search);
    calendarCode = urlParams.get('calendar') || generateCalendarCode();

    // Load or generate movie sequence
    loadMovieSequence();

    // Load opened boxes from localStorage
    loadOpenedBoxes();

    // Render calendar
    renderCalendar();
}

// Generate a unique calendar code
function generateCalendarCode() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Load movie sequence from localStorage or generate new one
function loadMovieSequence() {
    const storageKey = `movieSequence_${calendarCode}`;
    const stored = localStorage.getItem(storageKey);

    if (stored) {
        const data = JSON.parse(stored);
        movieSequence = data.sequence;
        fannyAlexanderDay = data.fannyAlexanderDay;
    } else {
        generateMovieSequence();
        saveMovieSequence();
    }
}

// Generate movie sequence with tiering
function generateMovieSequence() {
    movieSequence = new Array(TOTAL_DAYS);

    // Assign fixed movies
    // Day 1 (Nov 28) - Black Friday movie
    movieSequence[0] = MOVIE_DATABASE.fixed.blackFriday;

    // Day 28 (Dec 25) - Christmas double feature
    movieSequence[27] = MOVIE_DATABASE.fixed.christmas;

    // Randomly select weekend day for Fanny and Alexander (excluding day 1 and 28)
    const weekendDays = [];
    for (let i = 1; i < 27; i++) {
        const date = new Date(START_DATE);
        date.setDate(date.getDate() + i);
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
            weekendDays.push(i);
        }
    }
    fannyAlexanderDay = weekendDays[Math.floor(Math.random() * weekendDays.length)];
    movieSequence[fannyAlexanderDay] = MOVIE_DATABASE.fixed.fannyAndAlexander;

    // Assign Home Alone to one of Dec 20-24 (days 23-27, but 27 is Christmas)
    const homeAloneDays = [22, 23, 24, 25, 26]; // Days 23-27 (Dec 20-24)
    const homeAloneDay = homeAloneDays[Math.floor(Math.random() * homeAloneDays.length)];
    movieSequence[homeAloneDay] = MOVIE_DATABASE.fixed.homeAlone;

    // Get shuffled pools
    const earlyPool = shuffle([...MOVIE_DATABASE.early]);
    const middlePool = shuffle([...MOVIE_DATABASE.middle]);
    const latePool = shuffle([...MOVIE_DATABASE.late]);

    // Assign early tier (Nov 28 - Dec 7 = days 0-9)
    let earlyIndex = 0;
    for (let i = 1; i < 10; i++) {
        if (!movieSequence[i]) {
            movieSequence[i] = earlyPool[earlyIndex++];
        }
    }

    // Assign middle tier (Dec 8 - Dec 18 = days 10-20)
    let middleIndex = 0;
    for (let i = 10; i <= 20; i++) {
        if (!movieSequence[i]) {
            movieSequence[i] = middlePool[middleIndex++];
        }
    }

    // Assign late tier (Dec 19 - Dec 24 = days 21-26)
    let lateIndex = 0;
    for (let i = 21; i <= 26; i++) {
        if (!movieSequence[i]) {
            movieSequence[i] = latePool[lateIndex++];
        }
    }
}

// Shuffle array (Fisher-Yates)
function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Save movie sequence to localStorage
function saveMovieSequence() {
    const storageKey = `movieSequence_${calendarCode}`;
    localStorage.setItem(storageKey, JSON.stringify({
        sequence: movieSequence,
        fannyAlexanderDay: fannyAlexanderDay
    }));
}

// Load opened boxes from localStorage
function loadOpenedBoxes() {
    const userKey = `openedBoxes_${calendarCode}_user`;
    const stored = localStorage.getItem(userKey);
    if (stored) {
        openedBoxes = new Set(JSON.parse(stored));
    }
}

// Save opened boxes to localStorage
function saveOpenedBoxes() {
    const userKey = `openedBoxes_${calendarCode}_user`;
    localStorage.setItem(userKey, JSON.stringify([...openedBoxes]));
}

// Render calendar grid
function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < TOTAL_DAYS; i++) {
        const boxDate = new Date(START_DATE);
        boxDate.setDate(boxDate.getDate() + i);

        const box = createCalendarBox(i, boxDate, today);
        grid.appendChild(box);
    }
}

// Create individual calendar box
function createCalendarBox(dayIndex, boxDate, today) {
    const box = document.createElement('div');
    box.className = 'calendar-box';
    box.dataset.day = dayIndex;

    const isUnlocked = boxDate <= today;
    const isToday = boxDate.getTime() === today.getTime();
    const isOpened = openedBoxes.has(dayIndex);
    const isChristmas = dayIndex === 27;

    // Apply state classes
    if (!isUnlocked) {
        box.classList.add('locked');
    } else if (isToday) {
        box.classList.add('today');
    } else if (isOpened) {
        box.classList.add('opened');
    } else {
        box.classList.add('unlocked');
    }

    if (isChristmas) {
        box.classList.add('christmas');
    }

    // Create box content
    const icon = document.createElement('div');
    icon.className = 'box-icon';
    icon.textContent = getBoxIcon(dayIndex, isOpened, isUnlocked);

    const number = document.createElement('div');
    number.className = 'box-number';
    number.textContent = dayIndex + 1;

    const date = document.createElement('div');
    date.className = 'box-date';
    date.textContent = formatDate(boxDate);

    box.appendChild(icon);
    box.appendChild(number);
    box.appendChild(date);

    // Add click handler
    if (isUnlocked) {
        box.addEventListener('click', () => openBox(dayIndex));
    }

    return box;
}

// Get icon for box based on state
function getBoxIcon(dayIndex, isOpened, isUnlocked) {
    if (!isUnlocked) return '🔒';
    if (isOpened) return '🎬';
    if (dayIndex === 27) return '🎅';
    return '🎁';
}

// Format date for display
function formatDate(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Open a calendar box
function openBox(dayIndex) {
    const movie = movieSequence[dayIndex];

    if (!movie) {
        console.error('No movie found for day', dayIndex);
        return;
    }

    // Mark as opened
    openedBoxes.add(dayIndex);
    saveOpenedBoxes();

    // Show movie modal
    showMovieModal(movie, dayIndex);

    // Update box appearance
    renderCalendar();
}

// Show movie reveal modal
function showMovieModal(movie, dayIndex) {
    const modal = document.getElementById('movieModal');
    const poster = document.getElementById('moviePoster');
    const title = document.getElementById('movieTitle');
    const day = document.getElementById('movieDay');

    // Handle Christmas double feature
    if (Array.isArray(movie)) {
        title.textContent = `${movie[0].title} & ${movie[1].title}`;
        poster.src = movie[0].poster;
        poster.alt = `${movie[0].title} & ${movie[1].title} Poster`;
        day.textContent = `Christmas Day Double Feature! 🎄`;
    } else {
        title.textContent = movie.title;
        poster.src = movie.poster;
        poster.alt = `${movie.title} Poster`;

        const boxDate = new Date(START_DATE);
        boxDate.setDate(boxDate.getDate() + dayIndex);
        day.textContent = `Day ${dayIndex + 1} • ${formatDate(boxDate)}`;
    }

    modal.style.display = 'block';
}

// Setup event listeners
function setupEventListeners() {
    // Modal close buttons
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    closeButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            modals[index].style.display = 'none';
        });
    });

    // Click outside modal to close
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Share button
    document.getElementById('shareBtn').addEventListener('click', showShareModal);

    // Copy button
    document.getElementById('copyBtn').addEventListener('click', copyShareLink);

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetCalendar);
}

// Show share modal
function showShareModal() {
    const modal = document.getElementById('shareModal');
    const shareLink = document.getElementById('shareLink');

    const url = `${window.location.origin}${window.location.pathname}?calendar=${calendarCode}`;
    shareLink.value = url;

    modal.style.display = 'block';
}

// Copy share link to clipboard
function copyShareLink() {
    const shareLink = document.getElementById('shareLink');
    shareLink.select();
    shareLink.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(shareLink.value).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });
}

// Check if reset button should be enabled
function checkResetButton() {
    const resetBtn = document.getElementById('resetBtn');
    const today = new Date();
    const resetDate = new Date(YEAR, 11, 26); // December 26

    if (today >= resetDate) {
        resetBtn.disabled = false;
    }
}

// Reset calendar
function resetCalendar() {
    if (!confirm('Are you sure you want to reset your calendar? This will clear all opened boxes and generate a new movie sequence.')) {
        return;
    }

    // Clear localStorage
    const sequenceKey = `movieSequence_${calendarCode}`;
    const openedKey = `openedBoxes_${calendarCode}_user`;

    localStorage.removeItem(sequenceKey);
    localStorage.removeItem(openedKey);

    // Generate new calendar code and reinitialize
    calendarCode = generateCalendarCode();
    openedBoxes.clear();

    // Update URL without reload
    const url = `${window.location.origin}${window.location.pathname}?calendar=${calendarCode}`;
    window.history.pushState({}, '', url);

    // Reinitialize
    initializeCalendar();
}

// Update calendar every hour to unlock new boxes at midnight
setInterval(() => {
    renderCalendar();
    checkResetButton();
}, 60 * 60 * 1000); // Check every hour
