// Movie database organized by tiers
const MOVIE_DATABASE = {
    // Fixed assignments
    fixed: {
        christmas: [
            {
                title: "The Muppet Christmas Carol",
                year: 1992,
                poster: "https://image.tmdb.org/t/p/w500/hGsZF4a7red1rmKNiKDjaC3WlyI.jpg",
                tmdbId: 10437
            },
            {
                title: "A Charlie Brown Christmas",
                year: 1965,
                poster: "https://image.tmdb.org/t/p/w500/2VubJULkSAkHKczNjjiG1B1FHte.jpg",
                tmdbId: 1358
            }
        ],
        blackFriday: {
            title: "Falling for Christmas",
            year: 2022,
            poster: "https://image.tmdb.org/t/p/w500/4ZXJhFNaLxeUxJrTEHGuKJTXTbS.jpg",
            tmdbId: 835939
        },
        fannyAndAlexander: {
            title: "Fanny and Alexander",
            year: 1982,
            poster: "https://image.tmdb.org/t/p/w500/6x0LwMEP5R62xOW40dNdVlfhF1e.jpg",
            tmdbId: 2178
        },
        homeAlone: {
            title: "Home Alone",
            year: 1990,
            poster: "https://image.tmdb.org/t/p/w500/onTSipZ8R3bliBdKfPtsDuHTdlL.jpg",
            tmdbId: 771
        }
    },

    // Early days (Nov 28 - Dec 7): Lighter fare, newer streaming movies
    early: [
        {
            title: "The Princess Switch",
            year: 2018,
            poster: "https://image.tmdb.org/t/p/w500/yR3QhRr4f89VbDVTf70RsLsIjG.jpg",
            tmdbId: 549155
        },
        {
            title: "Klaus",
            year: 2019,
            poster: "https://image.tmdb.org/t/p/w500/q125RHUDgR4gjwh1QkfYuJLYkL.jpg",
            tmdbId: 508965
        },
        {
            title: "Jingle Jangle: A Christmas Journey",
            year: 2020,
            poster: "https://image.tmdb.org/t/p/w500/5RbyHIVydD3Krmec1LlUV7rRjet.jpg",
            tmdbId: 604822
        },
        {
            title: "Single All the Way",
            year: 2021,
            poster: "https://image.tmdb.org/t/p/w500/7adjAkiP5L2FMxJnS5WTOBZT3Qv.jpg",
            tmdbId: 698444
        },
        {
            title: "Happiest Season",
            year: 2020,
            poster: "https://image.tmdb.org/t/p/w500/vzec9kkOSE93tygyfOktedkeOQ.jpg",
            tmdbId: 630566
        },
        {
            title: "A Christmas Prince",
            year: 2017,
            poster: "https://image.tmdb.org/t/p/w500/6fyxTiHJCE3LKjDXQ2BGQfSx65C.jpg",
            tmdbId: 471415
        },
        {
            title: "Noelle",
            year: 2019,
            poster: "https://image.tmdb.org/t/p/w500/7CJzuNIzWOFLFIXkLe6ck6aLfr7.jpg",
            tmdbId: 431580
        }
    ],

    // Middle days (Dec 8 - Dec 18): Quirky, horror, surprising picks
    middle: [
        {
            title: "Rare Exports: A Christmas Tale",
            year: 2010,
            poster: "https://image.tmdb.org/t/p/w500/6W0pPL8FpKW4zOLsOMrZXqvQ2Fp.jpg",
            tmdbId: 43262
        },
        {
            title: "Anna and the Apocalypse",
            year: 2017,
            poster: "https://image.tmdb.org/t/p/w500/dJCGcOuC6hgKEcPc8hMJaJCQQr3.jpg",
            tmdbId: 433988
        },
        {
            title: "Better Watch Out",
            year: 2016,
            poster: "https://image.tmdb.org/t/p/w500/2mODXHdwb8pjScAq2NpBPLWY1Ya.jpg",
            tmdbId: 425336
        },
        {
            title: "Krampus",
            year: 2015,
            poster: "https://image.tmdb.org/t/p/w500/sAolMRYhzTH7M8eJ9smJVe8UBGM.jpg",
            tmdbId: 272835
        },
        {
            title: "Tokyo Godfathers",
            year: 2003,
            poster: "https://image.tmdb.org/t/p/w500/4KduJy9rPD89xJIHhq5r1EnLxiY.jpg",
            tmdbId: 4187
        },
        {
            title: "The Man Who Invented Christmas",
            year: 2017,
            poster: "https://image.tmdb.org/t/p/w500/3wDyBBfVbEMFBkOKjE2e8M7OOkJ.jpg",
            tmdbId: 424139
        },
        {
            title: "The Holdovers",
            year: 2023,
            poster: "https://image.tmdb.org/t/p/w500/hallVbFeYM4llMSDX5H5PcFQiUn.jpg",
            tmdbId: 840430
        },
        {
            title: "Carol",
            year: 2015,
            poster: "https://image.tmdb.org/t/p/w500/cJeled7EyPdur6TnCA5GYg0UfvW.jpg",
            tmdbId: 258480
        },
        {
            title: "In Bruges",
            year: 2008,
            poster: "https://image.tmdb.org/t/p/w500/5tT1sCUM5kZ2xvHLsbaDqcWmfB0.jpg",
            tmdbId: 9854
        },
        {
            title: "Die Hard",
            year: 1988,
            poster: "https://image.tmdb.org/t/p/w500/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg",
            tmdbId: 562
        },
        {
            title: "Violent Night",
            year: 2022,
            poster: "https://image.tmdb.org/t/p/w500/1XSYOP0JjjyMz1irihvWywro82r.jpg",
            tmdbId: 899112
        },
        {
            title: "The Night Before",
            year: 2015,
            poster: "https://image.tmdb.org/t/p/w500/fQJIHP9JNwuCPwUiHqDhDZWGKBU.jpg",
            tmdbId: 254470
        }
    ],

    // Late days (Dec 19-24, excluding Home Alone day): Classic holiday films
    late: [
        {
            title: "It's a Wonderful Life",
            year: 1946,
            poster: "https://image.tmdb.org/t/p/w500/bSqt9rhDZx1Q7UZ86dBPKdNomp2.jpg",
            tmdbId: 1585
        },
        {
            title: "Miracle on 34th Street",
            year: 1947,
            poster: "https://image.tmdb.org/t/p/w500/b3Nnqte1AjdmKnuqRf0ZnLxDj2g.jpg",
            tmdbId: 11881
        },
        {
            title: "White Christmas",
            year: 1954,
            poster: "https://image.tmdb.org/t/p/w500/rMJR7O6lf04Rr4jPRJKXp5wkXXr.jpg",
            tmdbId: 16530
        },
        {
            title: "Elf",
            year: 2003,
            poster: "https://image.tmdb.org/t/p/w500/oGGwEs20FZKOo28OKTq3cyvJDvJ.jpg",
            tmdbId: 10719
        },
        {
            title: "The Nightmare Before Christmas",
            year: 1993,
            poster: "https://image.tmdb.org/t/p/w500/xkOZB8CuGjHyBg2rFaTNqZlgRU.jpg",
            tmdbId: 9479
        },
        {
            title: "The Apartment",
            year: 1960,
            poster: "https://image.tmdb.org/t/p/w500/ckRmXt5R97gRSeF4YLFgpOPZBxj.jpg",
            tmdbId: 284
        },
        {
            title: "The Polar Express",
            year: 2004,
            poster: "https://image.tmdb.org/t/p/w500/58oRQlK7aPVCfsJIcDhOcRVMldp.jpg",
            tmdbId: 5255
        }
    ]
};
