// Movie database - Fixed daily assignments (Nov 28 - Jan 1)
const MOVIE_DATABASE = {
    // Daily movies in order (35 days: Nov 28 - Jan 1)
    daily: [
        // Nov 28 - Dec 7
        { title: "Champagne Problems", year: 2025, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 1323475 },
        { title: "Bridge of Spies", year: 2015, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 296098 },
        { title: "In Bruges", year: 2008, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 8321 },
        { title: "A Merry Little Ex-Mas", year: 2025, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 1401318 },
        { title: "The Man Who Invented Christmas", year: 2017, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 450322 },
        { title: "Oh. What. Fun.", year: 2025, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 1261825 },
        { title: "Inside Llewyn Davis", year: 2013, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 86829 },
        { title: "Happiest Season", year: 2020, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 520172 },
        { title: "The Man Who Came to Dinner", year: 1942, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 26319 },
        { title: "My Secret Santa", year: 2025, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 1441563 },

        // Dec 8 - Dec 14
        { title: "The Preacher's Wife", year: 1996, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 21539 },
        { title: "Joy to the World", year: 2025, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 1570554 },
        { title: "Tokyo Godfathers", year: 2003, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 13398 },
        { title: "Merv", year: 2025, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 1255775 },
        { title: "Carol", year: 2015, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 258480 },
        { title: "Klaus", year: 2019, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 508965 },
        { title: "Fanny and Alexander", year: 1982, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 5961 },

        // Dec 15 - Dec 21
        { title: "Rare Exports: A Christmas Tale", year: 2010, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 48395 },
        { title: "Merry Christmas, Mr. Lawrence", year: 1983, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 11948 },
        { title: "Gremlins", year: 1984, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 927 },
        { title: "The Holdovers", year: 2023, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 840430 },
        { title: "Miracle on 34th Street", year: 1994, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 10510 },
        { title: "It's a Wonderful Life", year: 1946, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 1585 },
        { title: "The Nightmare Before Christmas", year: 1993, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 9479 },

        // Dec 22 - Dec 27
        { title: "Die Hard", year: 1988, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 562 },
        { title: "National Lampoon's Christmas Vacation", year: 1989, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 5825 },
        { title: "Home Alone", year: 1990, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 771 },
        [
            { title: "The Muppet Christmas Carol", year: 1992, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 10437 },
            { title: "A Charlie Brown Christmas", year: 1965, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 13187 }
        ], // Christmas double feature
        { title: "Phantom Thread", year: 2017, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 400617 },
        { title: "Four Rooms", year: 1995, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 5 },

        // Dec 28 - Jan 1
        { title: "The Apartment", year: 1960, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 284 },
        { title: "Hudsucker Proxy", year: 1994, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 11934 },
        { title: "Thin Man", year: 1934, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 3529 },
        { title: "When Harry Met Sally", year: 1989, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 639 },
        { title: "Big Night", year: 1996, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 18203 }
    ],

    // Bonus movies that unlock weekly
    bonus: [
        { title: "The Curse of the Cat People", year: 1944, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 28436, unlockWeek: 1 },
        { title: "Krampus", year: 2015, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 287903, unlockWeek: 2 },
        { title: "Let the Right One In", year: 2008, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 13310, unlockWeek: 3 },
        { title: "Night of The Demon", year: 1957, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 25103, unlockWeek: 4 },
        { title: "The Blackcoat's Daughter", year: 2015, poster: "https://image.tmdb.org/t/p/w500", tmdbId: 334536, unlockWeek: 5 }
    ]
};
