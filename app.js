// Constants
const YEAR = 2025;
const START_DATE = new Date(YEAR, 10, 28); // November 28, 2025
const END_DATE = new Date(YEAR + 1, 0, 1); // January 1, 2026
const TOTAL_DAYS = 35; // Nov 28 - Jan 1

// TMDB API Configuration
const TMDB_API_KEY = '4aee5b1e27484ae41ca1d919dc1c203f';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

// Calendar state
let openedBoxes = new Set();
let openedBonuses = new Set();

// Fetch poster URL from TMDB API
async function fetchPosterUrl(tmdbId) {
    if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY_HERE' || tmdbId === 0) {
        return null;
    }

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}`
        );
        const data = await response.json();

        if (data.poster_path) {
            return `${TMDB_IMAGE_BASE}${data.poster_path}`;
        }
    } catch (error) {
        console.warn(`Failed to fetch poster for TMDB ID ${tmdbId}:`, error);
    }

    return null;
}

// Fetch all poster URLs and update the movie database
async function fetchAllPosters() {
    const cacheKey = 'tmdb_posters_cache_v2';
    const cacheTimeKey = 'tmdb_posters_cache_time_v2';
    const cached = localStorage.getItem(cacheKey);
    const cacheTime = localStorage.getItem(cacheTimeKey);
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    if (cached && cacheTime && (now - parseInt(cacheTime)) < sevenDays) {
        const cachedPosters = JSON.parse(cached);
        updateMoviePosterUrls(cachedPosters);
        return;
    }

    if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY_HERE') {
        console.warn('TMDB API key not configured. Using fallback placeholders.');
        return;
    }

    // Collect all movies
    const posterMap = {};
    const allMovies = [
        ...MOVIE_DATABASE.daily.flat(), // flat() handles the Christmas array
        ...MOVIE_DATABASE.bonus
    ];

    // Fetch all posters in parallel
    await Promise.all(
        allMovies.map(async (movie) => {
            if (movie.tmdbId && movie.tmdbId !== 0) {
                const posterUrl = await fetchPosterUrl(movie.tmdbId);
                if (posterUrl) {
                    posterMap[movie.tmdbId] = posterUrl;
                }
            }
        })
    );

    localStorage.setItem(cacheKey, JSON.stringify(posterMap));
    localStorage.setItem(cacheTimeKey, now.toString());

    updateMoviePosterUrls(posterMap);
}

// Update movie poster URLs in the database
function updateMoviePosterUrls(posterMap) {
    const updateMovie = (movie) => {
        if (movie.tmdbId && posterMap[movie.tmdbId]) {
            movie.poster = posterMap[movie.tmdbId];
        }
    };

    MOVIE_DATABASE.daily.forEach(item => {
        if (Array.isArray(item)) {
            item.forEach(updateMovie);
        } else {
            updateMovie(item);
        }
    });
    MOVIE_DATABASE.bonus.forEach(updateMovie);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    await fetchAllPosters();
    loadOpenedBoxes();
    renderCalendar();
    renderBonusMovies();
    setupEventListeners();
    checkResetButton();
});

// Load opened boxes from localStorage
function loadOpenedBoxes() {
    const dailyKey = 'openedBoxes_daily';
    const bonusKey = 'openedBoxes_bonus';

    const storedDaily = localStorage.getItem(dailyKey);
    const storedBonus = localStorage.getItem(bonusKey);

    if (storedDaily) {
        openedBoxes = new Set(JSON.parse(storedDaily));
    }
    if (storedBonus) {
        openedBonuses = new Set(JSON.parse(storedBonus));
    }
}

// Save opened boxes to localStorage
function saveOpenedBoxes() {
    localStorage.setItem('openedBoxes_daily', JSON.stringify([...openedBoxes]));
    localStorage.setItem('openedBoxes_bonus', JSON.stringify([...openedBonuses]));
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
    const isNewYears = dayIndex === 34;

    // Apply state classes
    if (!isUnlocked) {
        box.classList.add('locked');
        // Add random gift wrap pattern (1-4)
        const patternNum = (dayIndex % 4) + 1;
        box.classList.add(`wrap-pattern-${patternNum}`);
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

    if (isNewYears) {
        box.classList.add('christmas'); // Same styling as Christmas
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

// Render bonus movies section
function renderBonusMovies() {
    const grid = document.getElementById('calendarGrid');

    // Add a separator
    const separator = document.createElement('div');
    separator.style.gridColumn = '1 / -1';
    separator.style.margin = '2rem 0 1rem 0';
    separator.innerHTML = '<h2 style="text-align: center; color: var(--gold);">🎁 Bonus Movies 🎁</h2>';
    grid.appendChild(separator);

    const today = new Date();
    const startDate = new Date(START_DATE);
    const weeksPassed = Math.floor((today - startDate) / (7 * 24 * 60 * 60 * 1000));

    MOVIE_DATABASE.bonus.forEach((movie, index) => {
        const box = createBonusBox(movie, index, weeksPassed);
        grid.appendChild(box);
    });
}

// Create bonus movie box
function createBonusBox(movie, index, weeksPassed) {
    const box = document.createElement('div');
    box.className = 'calendar-box bonus-box';
    box.dataset.bonus = index;

    const isUnlocked = weeksPassed >= movie.unlockWeek;
    const isOpened = openedBonuses.has(index);

    if (!isUnlocked) {
        box.classList.add('locked');
        // Add random gift wrap pattern (1-4)
        const patternNum = (index % 4) + 1;
        box.classList.add(`wrap-pattern-${patternNum}`);
    } else if (isOpened) {
        box.classList.add('opened');
    } else {
        box.classList.add('unlocked');
    }

    const icon = document.createElement('div');
    icon.className = 'box-icon';
    icon.textContent = isOpened ? '🎬' : '🎁';

    const title = document.createElement('div');
    title.className = 'box-number';
    title.style.fontSize = '1rem';
    title.textContent = isUnlocked ? movie.title.substring(0, 20) : '???';

    const weekLabel = document.createElement('div');
    weekLabel.className = 'box-date';
    weekLabel.textContent = `Week ${movie.unlockWeek + 1}`;

    box.appendChild(icon);
    box.appendChild(title);
    box.appendChild(weekLabel);

    if (isUnlocked) {
        box.addEventListener('click', () => openBonusMovie(index));
    }

    return box;
}

// Get icon for box based on state
function getBoxIcon(dayIndex, isOpened, isUnlocked) {
    if (!isUnlocked) return '🔒';
    if (isOpened) return '🎬';
    if (dayIndex === 27) return '🎅';
    if (dayIndex === 34) return '🍾';
    return '🎁';
}

// Format date for display
function formatDate(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Open a calendar box
function openBox(dayIndex) {
    const movie = MOVIE_DATABASE.daily[dayIndex];

    if (!movie) {
        console.error('No movie found for day', dayIndex);
        return;
    }

    openedBoxes.add(dayIndex);
    saveOpenedBoxes();
    showMovieModal(movie, dayIndex);
    renderCalendar();
    renderBonusMovies();
}

// Open a bonus movie
function openBonusMovie(index) {
    const movie = MOVIE_DATABASE.bonus[index];

    openedBonuses.add(index);
    saveOpenedBoxes();
    showBonusModal(movie);
    renderCalendar();
    renderBonusMovies();
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
        setPosterWithFallback(poster, movie[0], `${movie[0].title} & ${movie[1].title}`);
        day.textContent = `Christmas Day Double Feature! 🎄`;
    } else {
        title.textContent = movie.title;
        setPosterWithFallback(poster, movie, movie.title);

        const boxDate = new Date(START_DATE);
        boxDate.setDate(boxDate.getDate() + dayIndex);
        day.textContent = `Day ${dayIndex + 1} • ${formatDate(boxDate)}`;
    }

    modal.style.display = 'block';
}

// Show bonus movie modal
function showBonusModal(movie) {
    const modal = document.getElementById('movieModal');
    const poster = document.getElementById('moviePoster');
    const title = document.getElementById('movieTitle');
    const day = document.getElementById('movieDay');

    title.textContent = movie.title;
    setPosterWithFallback(poster, movie, movie.title);
    day.textContent = `Bonus Movie • Week ${movie.unlockWeek}`;

    modal.style.display = 'block';
}

// Set poster image with fallback to placeholder
function setPosterWithFallback(imgElement, movie, altText) {
    imgElement.alt = `${altText} Poster`;

    // Try TMDB image first
    imgElement.src = movie.poster || `https://placehold.co/500x750/0F5132/D4AF37?text=${encodeURIComponent(movie.title)}+%0A(${movie.year})&font=cormorant-garamond`;

    // If TMDB fails, use placeholder with movie title and year
    imgElement.onerror = function() {
        const encodedTitle = encodeURIComponent(movie.title);
        const encodedYear = encodeURIComponent(movie.year);
        imgElement.src = `https://placehold.co/500x750/0F5132/D4AF37?text=${encodedTitle}+%0A(${encodedYear})&font=cormorant-garamond`;
        imgElement.onerror = null;
    };
}

// Setup event listeners
function setupEventListeners() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    closeButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            modals[index].style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    document.getElementById('shareBtn').addEventListener('click', showShareModal);
    document.getElementById('copyBtn').addEventListener('click', copyShareLink);
    document.getElementById('resetBtn').addEventListener('click', resetCalendar);
}

// Show share modal
function showShareModal() {
    const modal = document.getElementById('shareModal');
    const shareLink = document.getElementById('shareLink');
    const url = window.location.href.split('?')[0];
    shareLink.value = url;
    modal.style.display = 'block';
}

// Copy share link to clipboard
function copyShareLink() {
    const shareLink = document.getElementById('shareLink');
    shareLink.select();
    shareLink.setSelectionRange(0, 99999);

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
    const resetDate = new Date(YEAR + 1, 0, 2); // January 2

    if (today >= resetDate) {
        resetBtn.disabled = false;
    }
}

// Reset calendar
function resetCalendar() {
    if (!confirm('Are you sure you want to reset your calendar? This will clear all opened boxes.')) {
        return;
    }

    localStorage.removeItem('openedBoxes_daily');
    localStorage.removeItem('openedBoxes_bonus');
    openedBoxes.clear();
    openedBonuses.clear();

    renderCalendar();
    renderBonusMovies();
}

// Update calendar every hour
setInterval(() => {
    renderCalendar();
    renderBonusMovies();
    checkResetButton();
}, 60 * 60 * 1000);
