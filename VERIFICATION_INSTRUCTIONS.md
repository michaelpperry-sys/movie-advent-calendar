# TMDB ID Verification Instructions

## What Was Done

I've analyzed all TMDB IDs in your Movie Advent Calendar and prepared comprehensive verification tools. Here's what I found:

### Previously Fixed Issues

Based on git commit `df84d0b`, **4 TMDB IDs were already corrected** in movies.js:

1. **A Charlie Brown Christmas** (1965): 1358 → **13187** ✓
2. **Fanny and Alexander** (1982): 2178 → **5961** ✓
3. **Tokyo Godfathers** (2003): 4187 → **13398** ✓
4. **White Christmas** (1954): 16530 → **13368** ✓

### Current Status

- **movies.js**: All TMDB IDs appear correct based on previous verification
- **verify-tmdb-ids.js**: Updated to match movies.js
- **verify-tmdb-ids.py**: New Python alternative script
- All verification scripts are synchronized ✓

## Unable to Complete Full API Verification

Unfortunately, I cannot make external API calls to TMDB from this sandboxed environment due to network restrictions (all attempts returned 403 Access Denied). Therefore, I cannot verify all 31 movies against the live TMDB API.

## How to Complete Verification

You need to run the verification script from a machine with internet access. You have two options:

### Option 1: Node.js Script (Recommended)

```bash
cd /home/user/movie-advent-calendar
node verify-tmdb-ids.js
```

### Option 2: Python Script

```bash
cd /home/user/movie-advent-calendar
python3 verify-tmdb-ids.py
# or
./verify-tmdb-ids.py
```

The Python script also saves results to `tmdb-verification-results.json` for further analysis.

## What the Scripts Check

Both scripts verify:

1. **Title Match**: TMDB title matches your database
2. **Year Match**: Release year matches your database
3. **Adult Content**: Flags any movies marked as adult content
4. **Genres**: Lists all genres for review
5. **Comprehensive Report**: Detailed output of all findings

## Expected Results

Since the 4 known incorrect IDs were already fixed, you should see:

```
Total movies checked: 31
✓ Matches: 31
✗ Mismatches: 0
⚠ Errors: 0
🔞 Adult Content Flagged: 0
```

## If You Find Issues

If the verification script reports any mismatches:

1. The script will show:
   - What your database has
   - What TMDB actually returns
   - Specific issues (title/year mismatch)

2. To fix issues in movies.js:
   - Locate the movie in the appropriate tier (fixed, early, middle, or late)
   - Update the tmdbId to the correct value
   - Re-run verification to confirm

3. Also update both verification scripts to keep them synchronized

## All 31 Movies Currently in Database

### Fixed (5 movies)
- The Muppet Christmas Carol (1992) - ID: 10437
- A Charlie Brown Christmas (1965) - ID: 13187 ✓
- Falling for Christmas (2022) - ID: 835939
- Fanny and Alexander (1982) - ID: 5961 ✓
- Home Alone (1990) - ID: 771

### Early Tier (7 movies)
- The Princess Switch (2018) - ID: 549155
- Klaus (2019) - ID: 508965
- Jingle Jangle: A Christmas Journey (2020) - ID: 604822
- Single All the Way (2021) - ID: 698444
- Happiest Season (2020) - ID: 630566
- A Christmas Prince (2017) - ID: 471415
- Noelle (2019) - ID: 431580

### Middle Tier (12 movies)
- Rare Exports: A Christmas Tale (2010) - ID: 43262
- Anna and the Apocalypse (2017) - ID: 433988
- Better Watch Out (2016) - ID: 425336
- Krampus (2015) - ID: 272835
- Tokyo Godfathers (2003) - ID: 13398 ✓
- The Man Who Invented Christmas (2017) - ID: 424139
- The Holdovers (2023) - ID: 840430
- Carol (2015) - ID: 258480
- In Bruges (2008) - ID: 9854
- Die Hard (1988) - ID: 562
- Violent Night (2022) - ID: 899112
- The Night Before (2015) - ID: 254470

### Late Tier (7 movies)
- It's a Wonderful Life (1946) - ID: 1585
- Miracle on 34th Street (1947) - ID: 11881
- White Christmas (1954) - ID: 13368 ✓
- Elf (2003) - ID: 10719
- The Nightmare Before Christmas (1993) - ID: 9479
- The Apartment (1960) - ID: 284
- The Polar Express (2004) - ID: 5255

## Files Created/Updated

1. `/home/user/movie-advent-calendar/verify-tmdb-ids.js` - Updated Node.js verification script
2. `/home/user/movie-advent-calendar/verify-tmdb-ids.py` - New Python verification script
3. `/home/user/movie-advent-calendar/TMDB_VERIFICATION_REPORT.md` - Detailed report
4. `/home/user/movie-advent-calendar/VERIFICATION_INSTRUCTIONS.md` - This file

## Questions?

- The TMDB API key is already configured in the scripts: `4aee5b1e27484ae41ca1d919dc1c203f`
- Both scripts include rate limiting (250ms delay between requests) to avoid hitting API limits
- The scripts will clearly show any adult content warnings or genre concerns
- Results can be reviewed in the console output or in the JSON file (Python version)
