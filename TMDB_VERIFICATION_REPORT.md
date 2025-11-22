# TMDB ID Verification Report
Generated: 2025-11-22

## Summary

This report documents the TMDB ID verification process for all 31 movies in the Movie Advent Calendar.

## Known Issues Already Fixed

Based on git commit `df84d0b` (Fix incorrect TMDB IDs for 4 movies), the following corrections were previously made to `/home/user/movie-advent-calendar/movies.js`:

### 1. A Charlie Brown Christmas (1965)
- **Location**: `fixed.christmas[1]`
- **Incorrect TMDB ID**: 1358
- **Correct TMDB ID**: 13187
- **Status**: FIXED in movies.js

### 2. Fanny and Alexander (1982)
- **Location**: `fixed.fannyAndAlexander`
- **Incorrect TMDB ID**: 2178
- **Correct TMDB ID**: 5961
- **Status**: FIXED in movies.js

### 3. Tokyo Godfathers (2003)
- **Location**: `middle[4]`
- **Incorrect TMDB ID**: 4187
- **Correct TMDB ID**: 13398
- **Status**: FIXED in movies.js

### 4. White Christmas (1954)
- **Location**: `late[2]`
- **Incorrect TMDB ID**: 16530
- **Correct TMDB ID**: 13368
- **Status**: FIXED in movies.js

## Current Status

### movies.js
All TMDB IDs in `/home/user/movie-advent-calendar/movies.js` appear to be correct based on the previous verification and fixes.

### verify-tmdb-ids.js
The verification script was updated to match the corrected IDs in movies.js and now includes:
- Title and year verification
- Adult content flag checking
- Genre listing
- Detailed warnings for any inappropriate content

## All Movies in Database (31 total)

### Fixed Assignments (5 movies)
1. The Muppet Christmas Carol (1992) - TMDB ID: 10437
2. A Charlie Brown Christmas (1965) - TMDB ID: 13187 ✓ CORRECTED
3. Falling for Christmas (2022) - TMDB ID: 835939
4. Fanny and Alexander (1982) - TMDB ID: 5961 ✓ CORRECTED
5. Home Alone (1990) - TMDB ID: 771

### Early Tier (7 movies)
6. The Princess Switch (2018) - TMDB ID: 549155
7. Klaus (2019) - TMDB ID: 508965
8. Jingle Jangle: A Christmas Journey (2020) - TMDB ID: 604822
9. Single All the Way (2021) - TMDB ID: 698444
10. Happiest Season (2020) - TMDB ID: 630566
11. A Christmas Prince (2017) - TMDB ID: 471415
12. Noelle (2019) - TMDB ID: 431580

### Middle Tier (12 movies)
13. Rare Exports: A Christmas Tale (2010) - TMDB ID: 43262
14. Anna and the Apocalypse (2017) - TMDB ID: 433988
15. Better Watch Out (2016) - TMDB ID: 425336
16. Krampus (2015) - TMDB ID: 272835
17. Tokyo Godfathers (2003) - TMDB ID: 13398 ✓ CORRECTED
18. The Man Who Invented Christmas (2017) - TMDB ID: 424139
19. The Holdovers (2023) - TMDB ID: 840430
20. Carol (2015) - TMDB ID: 258480
21. In Bruges (2008) - TMDB ID: 9854
22. Die Hard (1988) - TMDB ID: 562
23. Violent Night (2022) - TMDB ID: 899112
24. The Night Before (2015) - TMDB ID: 254470

### Late Tier (7 movies)
25. It's a Wonderful Life (1946) - TMDB ID: 1585
26. Miracle on 34th Street (1947) - TMDB ID: 11881
27. White Christmas (1954) - TMDB ID: 13368 ✓ CORRECTED
28. Elf (2003) - TMDB ID: 10719
29. The Nightmare Before Christmas (1993) - TMDB ID: 9479
30. The Apartment (1960) - TMDB ID: 284
31. The Polar Express (2004) - TMDB ID: 5255

## Next Steps - Running Full Verification

Since external API calls are blocked from the current environment, you'll need to run the verification script from a machine with internet access:

```bash
cd /home/user/movie-advent-calendar
node verify-tmdb-ids.js
```

The enhanced verification script will:
1. Check all 31 TMDB IDs against the TMDB API
2. Verify titles and years match exactly
3. Check for adult content flags
4. List all genres for each movie
5. Generate a detailed report of any mismatches or concerns

## Expected Results

Based on the previous fixes, all TMDB IDs in movies.js should now be correct. The verification script should report:
- 31 matches
- 0 mismatches
- 0 adult content warnings

If any mismatches are found, they will be clearly listed with:
- Current TMDB ID
- What TMDB actually returns
- Correct TMDB ID to use

## Files Updated
- `/home/user/movie-advent-calendar/verify-tmdb-ids.js` - Updated with correct TMDB IDs and enhanced verification
- `/home/user/movie-advent-calendar/TMDB_VERIFICATION_REPORT.md` - This report

## Recommendations

1. Run `node verify-tmdb-ids.js` from a machine with internet access
2. Review the output for any new mismatches (there should be none)
3. Check that no movies are flagged as adult content
4. If any issues are found, update movies.js accordingly
5. Re-run the verification after any changes to confirm fixes
