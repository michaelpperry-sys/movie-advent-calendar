#!/usr/bin/env python3
"""
TMDB ID Verification Script (Python version)
Verifies all TMDB IDs in the movie database against the TMDB API
"""

import requests
import time
import json

TMDB_API_KEY = '4aee5b1e27484ae41ca1d919dc1c203f'
TMDB_BASE_URL = 'https://api.themoviedb.org/3'

# Movie database
MOVIE_DATABASE = {
    'fixed': {
        'christmas': [
            {'title': 'The Muppet Christmas Carol', 'year': 1992, 'tmdbId': 10437},
            {'title': 'A Charlie Brown Christmas', 'year': 1965, 'tmdbId': 13187}
        ],
        'blackFriday': {'title': 'Falling for Christmas', 'year': 2022, 'tmdbId': 835939},
        'fannyAndAlexander': {'title': 'Fanny and Alexander', 'year': 1982, 'tmdbId': 5961},
        'homeAlone': {'title': 'Home Alone', 'year': 1990, 'tmdbId': 771}
    },
    'early': [
        {'title': 'The Princess Switch', 'year': 2018, 'tmdbId': 549155},
        {'title': 'Klaus', 'year': 2019, 'tmdbId': 508965},
        {'title': 'Jingle Jangle: A Christmas Journey', 'year': 2020, 'tmdbId': 604822},
        {'title': 'Single All the Way', 'year': 2021, 'tmdbId': 698444},
        {'title': 'Happiest Season', 'year': 2020, 'tmdbId': 630566},
        {'title': 'A Christmas Prince', 'year': 2017, 'tmdbId': 471415},
        {'title': 'Noelle', 'year': 2019, 'tmdbId': 431580}
    ],
    'middle': [
        {'title': 'Rare Exports: A Christmas Tale', 'year': 2010, 'tmdbId': 43262},
        {'title': 'Anna and the Apocalypse', 'year': 2017, 'tmdbId': 433988},
        {'title': 'Better Watch Out', 'year': 2016, 'tmdbId': 425336},
        {'title': 'Krampus', 'year': 2015, 'tmdbId': 272835},
        {'title': 'Tokyo Godfathers', 'year': 2003, 'tmdbId': 13398},
        {'title': 'The Man Who Invented Christmas', 'year': 2017, 'tmdbId': 424139},
        {'title': 'The Holdovers', 'year': 2023, 'tmdbId': 840430},
        {'title': 'Carol', 'year': 2015, 'tmdbId': 258480},
        {'title': 'In Bruges', 'year': 2008, 'tmdbId': 9854},
        {'title': 'Die Hard', 'year': 1988, 'tmdbId': 562},
        {'title': 'Violent Night', 'year': 2022, 'tmdbId': 899112},
        {'title': 'The Night Before', 'year': 2015, 'tmdbId': 254470}
    ],
    'late': [
        {'title': "It's a Wonderful Life", 'year': 1946, 'tmdbId': 1585},
        {'title': 'Miracle on 34th Street', 'year': 1947, 'tmdbId': 11881},
        {'title': 'White Christmas', 'year': 1954, 'tmdbId': 13368},
        {'title': 'Elf', 'year': 2003, 'tmdbId': 10719},
        {'title': 'The Nightmare Before Christmas', 'year': 1993, 'tmdbId': 9479},
        {'title': 'The Apartment', 'year': 1960, 'tmdbId': 284},
        {'title': 'The Polar Express', 'year': 2004, 'tmdbId': 5255}
    ]
}


def get_all_movies():
    """Collect all movies from the database"""
    movies = []
    movies.extend(MOVIE_DATABASE['fixed']['christmas'])
    movies.append(MOVIE_DATABASE['fixed']['blackFriday'])
    movies.append(MOVIE_DATABASE['fixed']['fannyAndAlexander'])
    movies.append(MOVIE_DATABASE['fixed']['homeAlone'])
    movies.extend(MOVIE_DATABASE['early'])
    movies.extend(MOVIE_DATABASE['middle'])
    movies.extend(MOVIE_DATABASE['late'])
    return movies


def verify_tmdb_id(movie):
    """Verify a single movie's TMDB ID"""
    try:
        url = f"{TMDB_BASE_URL}/movie/{movie['tmdbId']}?api_key={TMDB_API_KEY}"
        response = requests.get(url, timeout=10)

        if response.status_code != 200:
            return {
                'movie': movie,
                'status': 'error',
                'message': f"HTTP {response.status_code}: {response.text[:100]}"
            }

        data = response.json()

        # Extract data
        tmdb_title = data.get('title', '')
        release_date = data.get('release_date', '')
        tmdb_year = int(release_date[:4]) if release_date else None
        is_adult = data.get('adult', False)
        genres = [g['name'] for g in data.get('genres', [])]

        # Check matches
        title_match = tmdb_title.lower() == movie['title'].lower()
        year_match = tmdb_year == movie['year']

        # Warnings
        warnings = []
        if is_adult:
            warnings.append('ADULT CONTENT FLAGGED')

        if not title_match or not year_match or is_adult:
            return {
                'movie': movie,
                'status': 'mismatch',
                'tmdbData': {
                    'title': tmdb_title,
                    'year': tmdb_year,
                    'id': data.get('id'),
                    'adult': is_adult,
                    'genres': genres
                },
                'titleMatch': title_match,
                'yearMatch': year_match,
                'warnings': warnings
            }

        return {
            'movie': movie,
            'status': 'match',
            'tmdbData': {
                'title': tmdb_title,
                'year': tmdb_year,
                'adult': is_adult,
                'genres': genres
            },
            'warnings': warnings
        }

    except Exception as e:
        return {
            'movie': movie,
            'status': 'error',
            'message': str(e)
        }


def main():
    """Main verification function"""
    print('Starting TMDB ID verification...\n')
    print('=' * 80)

    movies = get_all_movies()
    results = []

    for i, movie in enumerate(movies, 1):
        print(f"\nChecking {i}/{len(movies)}: {movie['title']} ({movie['year']})")

        result = verify_tmdb_id(movie)
        results.append(result)

        if result['status'] == 'match':
            print(f"  ✓ MATCH: TMDB has \"{result['tmdbData']['title']}\" ({result['tmdbData']['year']})")
            print(f"    Adult: {'YES ⚠️' if result['tmdbData']['adult'] else 'No'}")
            print(f"    Genres: {', '.join(result['tmdbData']['genres'])}")
            if result.get('warnings'):
                print(f"    ⚠️  WARNINGS: {', '.join(result['warnings'])}")
        elif result['status'] == 'mismatch':
            print(f"  ✗ MISMATCH!")
            print(f"    Expected: \"{movie['title']}\" ({movie['year']})")
            print(f"    TMDB has: \"{result['tmdbData']['title']}\" ({result['tmdbData']['year']})")
            print(f"    Adult: {'YES ⚠️' if result['tmdbData']['adult'] else 'No'}")
            print(f"    Genres: {', '.join(result['tmdbData']['genres'])}")
            if result.get('warnings'):
                print(f"    ⚠️  WARNINGS: {', '.join(result['warnings'])}")
        else:
            print(f"  ⚠ ERROR: {result['message']}")

        # Small delay to avoid rate limiting
        time.sleep(0.25)

    print('\n' + '=' * 80)
    print('\nVERIFICATION SUMMARY:')
    print('=' * 80)

    matches = [r for r in results if r['status'] == 'match']
    mismatches = [r for r in results if r['status'] == 'mismatch']
    errors = [r for r in results if r['status'] == 'error']
    adult_content = [r for r in results if r.get('tmdbData') and r['tmdbData'].get('adult')]

    print(f"\nTotal movies checked: {len(results)}")
    print(f"✓ Matches: {len(matches)}")
    print(f"✗ Mismatches: {len(mismatches)}")
    print(f"⚠ Errors: {len(errors)}")
    print(f"🔞 Adult Content Flagged: {len(adult_content)}")

    if mismatches:
        print('\n' + '=' * 80)
        print('MOVIES WITH INCORRECT TMDB IDs:')
        print('=' * 80)

        for i, result in enumerate(mismatches, 1):
            movie = result['movie']
            print(f"\n{i}. {movie['title']} ({movie['year']})")
            print(f"   Current TMDB ID: {movie['tmdbId']}")
            print(f"   TMDB returns: \"{result['tmdbData']['title']}\" ({result['tmdbData']['year']})")
            issues = []
            if not result.get('titleMatch'):
                issues.append('Title mismatch')
            if not result.get('yearMatch'):
                issues.append('Year mismatch')
            print(f"   Issues: {', '.join(issues)}")

    if errors:
        print('\n' + '=' * 80)
        print('ERRORS:')
        print('=' * 80)

        for i, result in enumerate(errors, 1):
            movie = result['movie']
            print(f"\n{i}. {movie['title']} ({movie['year']})")
            print(f"   TMDB ID: {movie['tmdbId']}")
            print(f"   Error: {result['message']}")

    if adult_content:
        print('\n' + '=' * 80)
        print('⚠️  ADULT CONTENT WARNINGS:')
        print('=' * 80)

        for i, result in enumerate(adult_content, 1):
            movie = result['movie']
            print(f"\n{i}. {movie['title']} ({movie['year']})")
            print(f"   TMDB ID: {movie['tmdbId']}")
            print(f"   TMDB Title: \"{result['tmdbData']['title']}\"")
            print(f"   Genres: {', '.join(result['tmdbData']['genres'])}")
            print(f"   ⚠️  This movie is flagged as adult content in TMDB")

    print('\n' + '=' * 80)

    # Save results to JSON
    with open('tmdb-verification-results.json', 'w') as f:
        json.dump(results, f, indent=2)
    print('\nResults saved to: tmdb-verification-results.json')


if __name__ == '__main__':
    main()
