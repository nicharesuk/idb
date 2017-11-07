### Important, this must be run with Python, not Python3 ###
# -------
# imports
# -------

import sys
import requests
import json
import os
import errno
import filecmp
import re

# -------
# constants
# -------

ANIME_URL = "http://jikan.me/api/anime/"
DIR_ANIME = "jikan_anime"

# -------
# methods
# -------

# Counts the number of files in the given folder
# def count_files(folder):
#     print len([name for name in os.listdir(folder) if os.path.isfile(os.path.join(folder, name))])

def jikan_get_anime(id, url_type, folder_name, filter_porn=True):
        url = url_type + str(id) + '/characters_staff'
        r = requests.get(url)

        if r.status_code != 404:
            r = r.json()

            has_porn = False
            # checks if the anime is pornographic, but only if filter_porn
            # is set to true
            if filter_porn :
                for x in r['genre'] :
                    if x[1] == 'Hentai':
                        has_porn = True

            # only add the anime if it's not porn, will always run if filter_porn
            # is set to false
            if has_porn != True:
                file_name = folder_name + '/' + str(id)
                print('SUCCESS: ' + file_name)
                if not os.path.exists(os.path.dirname(file_name)):
                    try:
                        os.makedirs(os.path.dirname(file_name))
                    except OSError, exc:

                        # Guard against race condition

                        if exc.errno != errno.EEXIST:
                            raise

                with open(str(file_name), 'w') as outfile:
                    json.dump(r, outfile)
                    print('')
                    return True
            
            return False

# Used to get anime, starting at id 1 and going until you have num_items
def jikan_get_anime_range(url_type, start_id, end_id, step, folder_name, filter_porn=True):

    for id in range(start_id, end_id, step):
        isSuccess = jikan_get_anime(id, url_type, folder_name, filter_porn)

def get_manga_from_anime(anime_id):
    read_file = 'jikan_anime/' + str(anime_id)
    with open(read_file) as datafile:
            data = json.load(datafile)
            if 'related' in data:
                related = data['related']
                if 'Adaptation' in related:
                    check_obj = related['Adaptation']
                    if isinstance(check_obj[0], list):
                        for list_obj in related['Adaptation']:
                            # print(list_obj)
                            tokens = list_obj[1].split('/')
                            manga_id = tokens[2]
                            # print('ID: ' + manga_id)
                            r = requests.get('http://jikan.me/api/manga/' + manga_id + '/characters_staff').json()

                            write_file = 'jikan_manga/' + manga_id
                            if not os.path.exists(os.path.dirname(write_file)):
                                try:
                                    os.makedirs(os.path.dirname(write_file))
                                except OSError as exc:  # Guard against race condition
                                    if exc.errno != errno.EEXIST:
                                        raise
                            # write the file
                            with open(write_file, 'w') as outfile:
                                json.dump(r, outfile)
                                print('MANGA: ' + r['title'])
                                # count += 1
                    else:
                        manga = related['Adaptation']
                        manga = manga[1].split('/')
                        manga_id = manga[2]
                        print('Manga ID: ' + manga_id)
                        r = requests.get('http://jikan.me/api/manga/' + manga_id + '/characters_staff').json()
                        write_file = 'jikan_manga/' + manga_id
                        if not os.path.exists(os.path.dirname(write_file)):
                            try:
                                os.makedirs(os.path.dirname(write_file))
                            except OSError as exc:  # Guard against race condition
                                if exc.errno != errno.EEXIST:
                                    raise
                        # write the file
                        with open(write_file, 'w') as outfile:
                            json.dump(r, outfile)
                            print('MANGA: ' + r['title'])
                            # count += 1

def get_manga_matches():
    for filename in os.listdir('jikan_anime'):
        get_manga_from_anime(filename)

# Runs through the anime we have locally, gets the first main character, gets the Japanese voice actor for that character
# Limited to one per show
def get_matches_people(read_folder, write_folder, url_type):

    for filename in os.listdir(read_folder):
        print('in people')
        with open(read_folder + '/' + filename) as datafile:
            data = json.load(datafile)
            if 'character' in data:
                for character in data['character']:
                    if 'role' in character:
                        if character['role'] == 'Main':
                            if 'voice-actor' in character:
                                for actor in character['voice-actor']:
                                    language = actor['role']
                                    if language == 'Japanese' or language == 'English':
                                        if 'url' in actor:
                                            tokenized_id = (actor['url'].split('/'))[4]

                                            url = url_type + tokenized_id
                                            r = requests.get(url).json()

                                            file_name = write_folder + '/' + tokenized_id
                                            # create the folder if it does not exist in this dir
                                            if not os.path.exists(os.path.dirname(file_name)):
                                                try:
                                                    os.makedirs(os.path.dirname(file_name))
                                                except OSError as exc:  # Guard against race condition
                                                    if exc.errno != errno.EEXIST:
                                                        raise
                                            # write the file
                                            with open(file_name, 'w') as outfile:
                                                r['language'] = language
                                                json.dump(r, outfile)
                                                print(data['title'])
                                            print('')


# Runs through the anime we have locally, gets the first main character, and adds them to jikan_character
# Limited to one per show
def get_matches_character(read_folder, write_folder, url_type):

    for filename in os.listdir(read_folder):
        with open(read_folder + '/' + filename) as datafile:
            print("filename: " +filename)
            data = json.load(datafile)
            if 'character' in data:
                for character in data['character']:
                    if 'role' in character:
                        if character['role'] == 'Main':
                            if 'url' in character:
                                tokenized_id = (character['url'].split('/'))[4]

                                url = url_type + tokenized_id
                                print(url)
                                try:
                                    r = requests.get(url).json()

                                    file_name = write_folder + '/' + tokenized_id
                                    # create the folder if it does not exist in this dir
                                    if not os.path.exists(os.path.dirname(file_name)):
                                        try:
                                            os.makedirs(os.path.dirname(file_name))
                                        except OSError as exc:  # Guard against race condition
                                            if exc.errno != errno.EEXIST:
                                                raise
                                    # write the file
                                    with open(file_name, 'w') as outfile:
                                        json.dump(r, outfile)
                                        print(data['title'])
                                    print('')
                                except:
                                    pass

def delete_bad_anime():
    read_folder = 'jikan_anime'
    for filename in os.listdir(read_folder):
        file_path = read_folder + '/' + filename
        with open(file_path) as datafile:
            data = json.load(datafile)
            if 'staff' in data and len(data['staff']) == 0:
                print(filename + " has no characters\n")
                os.remove(file_path)


# ----
# main
# ----

if __name__ == "__main__":

    # test()

    # count_files(DIR_ANIME)

    # get_manga_matches()

    # jikan_get_anime_range(ANIME_URL, 34000, 33500, -1, DIR_ANIME)
    # get_matches_people(DIR_ANIME, "jikan_person", 'http://jikan.me/api/person/')    
    # get_matches_character('jikan_manga', 'jikan_character', 'http://jikan.me/api/character/')

    # multi_anime = [384]
    # for id in multi_anime:
    #     jikan_get_anime(id, ANIME_URL, DIR_ANIME, True)
    # get_manga_from_anime(110)

    delete_bad_anime()
