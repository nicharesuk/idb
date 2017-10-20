import sys
import requests
import json
import os
import errno
import filecmp
import re

# Incomplete, plan to use to get four images for each anime and manga
def get_anime_pics() :
    url = 'https://anilist.co/api/search'
    for filename in os.listdir('jikan_anime'):
        with open('jikan_anime/' + filename) as datafile:
            data = json.load(datafile)
                if 'title' in data:
                    r = requests.get(url + data['title'], headers={'Authorization': 'A4xsnis49CZ3lXmoKHX5DQZNjDP68mk0UmedL31H'})

# Incomplete, use to retrieve access token for anilist
def get_access() :
    url = 'https://anilist.co/api/auth/access_token'
    resp = requests.post(url, data={}, auth=('user', 'pass'))

if __name__ == "__main__":
    get_anime_vids()