// TMDB ID Verification Script
const https = require('https');
const TMDB_API_KEY = '4aee5b1e27484ae41ca1d919dc1c203f';

// Movie database (imported from movies.js)
const MOVIE_DATABASE = {
    fixed: {
        christmas: [
            { title: "The Muppet Christmas Carol", year: 1992, tmdbId: 10437 },
            { title: "A Charlie Brown Christmas", year: 1965, tmdbId: 13187 }
        ],
        blackFriday: { title: "Falling for Christmas", year: 2022, tmdbId: 835939 },
        fannyAndAlexander: { title: "Fanny and Alexander", year: 1982, tmdbId: 5961 },
        homeAlone: { title: "Home Alone", year: 1990, tmdbId: 771 }
    },
    early: [
        { title: "The Princess Switch", year: 2018, tmdbId: 549155 },
        { title: "Klaus", year: 2019, tmdbId: 508965 },
        { title: "Jingle Jangle: A Christmas Journey", year: 2020, tmdbId: 604822 },
        { title: "Single All the Way", year: 2021, tmdbId: 698444 },
        { title: "Happiest Season", year: 2020, tmdbId: 630566 },
        { title: "A Christmas Prince", year: 2017, tmdbId: 471415 },
        { title: "Noelle", year: 2019, tmdbId: 431580 }
    ],
    middle: [
        { title: "Rare Exports: A Christmas Tale", year: 2010, tmdbId: 43262 },
        { title: "Anna and the Apocalypse", year: 2017, tmdbId: 433988 },
        { title: "Better Watch Out", year: 2016, tmdbId: 425336 },
        { title: "Krampus", year: 2015, tmdbId: 272835 },
        { title: "Tokyo Godfathers", year: 2003, tmdbId: 13398 },
        { title: "The Man Who Invented Christmas", year: 2017, tmdbId: 424139 },
        { title: "The Holdovers", year: 2023, tmdbId: 840430 },
        { title: "Carol", year: 2015, tmdbId: 258480 },
        { title: "In Bruges", year: 2008, tmdbId: 9854 },
        { title: "Die Hard", year: 1988, tmdbId: 562 },
        { title: "Violent Night", year: 2022, tmdbId: 899112 },
        { title: "The Night Before", year: 2015, tmdbId: 254470 }
    ],
    late: [
        { title: "It's a Wonderful Life", year: 1946, tmdbId: 1585 },
        { title: "Miracle on 34th Street", year: 1947, tmdbId: 11881 },
        { title: "White Christmas", year: 1954, tmdbId: 13368 },
        { title: "Elf", year: 2003, tmdbId: 10719 },
        { title: "The Nightmare Before Christmas", year: 1993, tmdbId: 9479 },
        { title: "The Apartment", year: 1960, tmdbId: 284 },
        { title: "The Polar Express", year: 2004, tmdbId: 5255 }
    ]
};

// Helper function to make HTTPS requests
function httpsGet(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(new Error('Invalid JSON response'));
                    }
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Fetch movie data from TMDB
async function verifyTmdbId(movie) {
    try {
        const url = `https://api.themoviedb.org/3/movie/${movie.tmdbId}?api_key=${TMDB_API_KEY}`;
        const data = await httpsGet(url);

        // Extract year from release_date
        const tmdbYear = data.release_date ? parseInt(data.release_date.substring(0, 4)) : null;
        const tmdbTitle = data.title;
        const isAdult = data.adult || false;
        const genres = data.genres || [];
        const genreNames = genres.map(g => g.name);

        // Check for mismatches
        const titleMatch = tmdbTitle.toLowerCase() === movie.title.toLowerCase();
        const yearMatch = tmdbYear === movie.year;

        // Check for inappropriate content
        const warnings = [];
        if (isAdult) {
            warnings.push('ADULT CONTENT FLAGGED');
        }

        // Check for potentially problematic genres (this is just for awareness)
        const concerningGenres = ['Horror', 'Thriller'];
        const hasConcerningGenre = genreNames.some(g => concerningGenres.includes(g));

        if (!titleMatch || !yearMatch || isAdult) {
            return {
                movie: movie,
                status: 'mismatch',
                tmdbData: {
                    title: tmdbTitle,
                    year: tmdbYear,
                    id: data.id,
                    adult: isAdult,
                    genres: genreNames
                },
                titleMatch,
                yearMatch,
                warnings
            };
        }

        return {
            movie: movie,
            status: 'match',
            tmdbData: {
                title: tmdbTitle,
                year: tmdbYear,
                adult: isAdult,
                genres: genreNames
            },
            warnings
        };

    } catch (error) {
        return {
            movie: movie,
            status: 'error',
            message: error.message
        };
    }
}

// Collect all movies
function getAllMovies() {
    const movies = [
        ...MOVIE_DATABASE.fixed.christmas,
        MOVIE_DATABASE.fixed.blackFriday,
        MOVIE_DATABASE.fixed.fannyAndAlexander,
        MOVIE_DATABASE.fixed.homeAlone,
        ...MOVIE_DATABASE.early,
        ...MOVIE_DATABASE.middle,
        ...MOVIE_DATABASE.late
    ];
    return movies;
}

// Main verification function
async function verifyAllMovies() {
    console.log('Starting TMDB ID verification...\n');
    console.log('='.repeat(80));

    const movies = getAllMovies();
    const results = [];

    // Process movies with a small delay to avoid rate limiting
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        console.log(`\nChecking ${i + 1}/${movies.length}: ${movie.title} (${movie.year})`);

        const result = await verifyTmdbId(movie);
        results.push(result);

        if (result.status === 'match') {
            console.log(`  ✓ MATCH: TMDB has "${result.tmdbData.title}" (${result.tmdbData.year})`);
            console.log(`    Adult: ${result.tmdbData.adult ? 'YES ⚠️' : 'No'}`);
            console.log(`    Genres: ${result.tmdbData.genres.join(', ')}`);
            if (result.warnings && result.warnings.length > 0) {
                console.log(`    ⚠️  WARNINGS: ${result.warnings.join(', ')}`);
            }
        } else if (result.status === 'mismatch') {
            console.log(`  ✗ MISMATCH!`);
            console.log(`    Expected: "${movie.title}" (${movie.year})`);
            console.log(`    TMDB has: "${result.tmdbData.title}" (${result.tmdbData.year})`);
            console.log(`    Adult: ${result.tmdbData.adult ? 'YES ⚠️' : 'No'}`);
            console.log(`    Genres: ${result.tmdbData.genres.join(', ')}`);
            if (result.warnings && result.warnings.length > 0) {
                console.log(`    ⚠️  WARNINGS: ${result.warnings.join(', ')}`);
            }
        } else if (result.status === 'error') {
            console.log(`  ⚠ ERROR: ${result.message}`);
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 250));
    }

    console.log('\n' + '='.repeat(80));
    console.log('\nVERIFICATION SUMMARY:');
    console.log('='.repeat(80));

    const matches = results.filter(r => r.status === 'match');
    const mismatches = results.filter(r => r.status === 'mismatch');
    const errors = results.filter(r => r.status === 'error');
    const adultContent = results.filter(r => r.tmdbData && r.tmdbData.adult);

    console.log(`\nTotal movies checked: ${results.length}`);
    console.log(`✓ Matches: ${matches.length}`);
    console.log(`✗ Mismatches: ${mismatches.length}`);
    console.log(`⚠ Errors: ${errors.length}`);
    console.log(`🔞 Adult Content Flagged: ${adultContent.length}`);

    if (mismatches.length > 0) {
        console.log('\n' + '='.repeat(80));
        console.log('MOVIES WITH INCORRECT TMDB IDs:');
        console.log('='.repeat(80));

        mismatches.forEach((result, index) => {
            console.log(`\n${index + 1}. ${result.movie.title} (${result.movie.year})`);
            console.log(`   Current TMDB ID: ${result.movie.tmdbId}`);
            console.log(`   TMDB returns: "${result.tmdbData.title}" (${result.tmdbData.year})`);
            console.log(`   Issues: ${!result.titleMatch ? 'Title mismatch' : ''} ${!result.yearMatch ? 'Year mismatch' : ''}`);
        });
    }

    if (errors.length > 0) {
        console.log('\n' + '='.repeat(80));
        console.log('ERRORS:');
        console.log('='.repeat(80));

        errors.forEach((result, index) => {
            console.log(`\n${index + 1}. ${result.movie.title} (${result.movie.year})`);
            console.log(`   TMDB ID: ${result.movie.tmdbId}`);
            console.log(`   Error: ${result.message}`);
        });
    }

    if (adultContent.length > 0) {
        console.log('\n' + '='.repeat(80));
        console.log('⚠️  ADULT CONTENT WARNINGS:');
        console.log('='.repeat(80));

        adultContent.forEach((result, index) => {
            console.log(`\n${index + 1}. ${result.movie.title} (${result.movie.year})`);
            console.log(`   TMDB ID: ${result.movie.tmdbId}`);
            console.log(`   TMDB Title: "${result.tmdbData.title}"`);
            console.log(`   Genres: ${result.tmdbData.genres.join(', ')}`);
            console.log(`   ⚠️  This movie is flagged as adult content in TMDB`);
        });
    }

    console.log('\n' + '='.repeat(80));
}

// Run verification
verifyAllMovies().catch(console.error);
