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

MAL_TOP_URL = "https://myanimelist.net/topanime.php?limit="

def get_top_anime():
    top_anime_ids = set()

    for limit in range(0, 251, 50):
        r = requests.get(MAL_TOP_URL + str(limit))
        matches = re.findall("https://myanimelist\.net/anime/(\d*)/", r.text)
        top_anime_ids = top_anime_ids.union({x for x in matches})
        
    print(",".join(top_anime_ids))

    


# -------
# functions
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
                            request = requests.get('http://jikan.me/api/manga/' + manga_id + '/characters_staff')
                            if request.status_code != 404:
                                r = request.json()
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

                        request = requests.get('http://jikan.me/api/manga/' + manga_id + '/characters_staff')
                        if request.status_code != 404:
                            r = request.json()
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
    existing_actors = set()
    for actor_id in os.listdir(write_folder):
        existing_actors.add(actor_id)

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

                                            if tokenized_id in existing_actors:
                                                continue

                                            url = url_type + tokenized_id
                                            print(url)
                                            rjson = None
                                            try:
                                                request = requests.get(url)
                                                rjson = request.json()
                                            except requests.exceptions.ConnectionError:
                                                print("TIME OUT")

                                            if isinstance(rjson, bool):
                                                continue

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

                                                rjson['language'] = language
                                                json.dump(rjson, outfile)
                                                print(data['title'] + " ID: " + filename)
                                            print('')


# Runs through the anime we have locally, gets the first main character, and adds them to jikan_character
# Limited to one per show
def get_matches_character(read_folder, write_folder, url_type):
    existing_characters = set()
    for actor_id in os.listdir(write_folder):
        existing_characters.add(actor_id)

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

                                if tokenized_id in existing_characters:
                                    continue

                                print(url)
                                try:
                                    r = requests.get(url).json()

                                    if isinstance(r, bool):
                                        continue

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

def delete_bad_actors():
    read_folder = 'jikan_person'
    for filename in os.listdir(read_folder):
        file_path = read_folder + '/' + filename
        with open(file_path) as datafile:
            data = json.load(datafile)
            if 'error' in data and len(data['error']) > 0:
                print(filename + " is an error\n")
                os.remove(file_path)

def delete_bad_characters():
    read_folder = 'jikan_character'
    for filename in os.listdir(read_folder):
        file_path = read_folder + '/' + filename
        with open(file_path) as datafile:
            data = json.load(datafile)
            if 'error' in data and len(data['error']) > 0:
                print(filename + " is an error\n")
                os.remove(file_path)


# ----
# main
# ----

if __name__ == "__main__":

    # get_top_anime()

    # count_files(DIR_ANIME)

    # get_manga_matches()

    # jikan_get_anime_range(ANIME_URL, 34000, 33500, -1, DIR_ANIME)
    # get_matches_people(DIR_ANIME, "jikan_person", 'http://jikan.me/api/person/')
    # get_matches_character('jikan_manga', 'jikan_character', 'http://jikan.me/api/character/')

    # multi_anime = [1142,23327,2966,265,23755,264,10800,22507,137,136,4224,19815,139,11981,28851,35788,32935,11665,32937,24415,34096,7054,12029,2921,31043,14397,2402,31758,19647,572,30503,9890,31757,813,33486,33255,34376,33095,10379,5028,263,5460,23273,9989,11577,36259,31181,32867,23847,13601,329,962,12531,5300,2559,57,7311,19,5690,31051,35843,30346,11771,2418,372,28735,820,2251,5205,9260,6594,16498,16664,2904,3002,31988,31933,28891,12859,392,32902,17389,34822,25681,4081,27821,34534,2025,4282,3297,15227,26055,16782,5258,25537,13759,4722,19363,34036,16067,34240,918,1033,523,11123,12431,1842,28725,30709,28805,585,16894,22789,31240,9253,18617,14513,245,28223,32366,1559,8129,34591,32005,7785,21329,10030,21,15335,6675,23283,33,32,24687,853,24701,36038,1535,3091,31174,10863,513,512,9969,431,35180,578,9735,338,32983,30654,4181,35062,18195,35067,45,457,17074,25781,18115,18689,7655,4107,22145,199,19123,15417,22135,170,31658,11741,1453,31715,15323,5941,12031,31964,23317,1889,13125,1506,30276,21939,4477,1257,28701,25777,10153,1210,9130,32188,2581,10408,20899,467,6,11977,32182,2685,164,9863,437,2246,1364,31812,5341,28171,9756,6114,18,4155,5420,34599,34076,24277,1519,28957,31646,28675,33674,5081,1365,5114,35247,30,558,10271,33352,6811,10165,4565,11979,185,21557,9617,5365,6746,239,235,14719,7674,11917,6945,20651,22535,11061,32995,22297,12115,21899,20583,877,44,10087,43,2236,1,2001,5,5681,10162,7472,10937,759,1698,12355,777,205,721,16706,3901,30230,34542,2167,138,32282,35413,627,32281,6864,486,3701,23623,5040,6547,4938,12365,1827,3784,121,3226,3702,1604,36275,6467,25835,1367,6336,34618,33051,28977,801,11843,1575]
    # for id in multi_anime:
    #     jikan_get_anime(id, ANIME_URL, DIR_ANIME, True)

    # get_manga_from_anime(110)

    # delete_bad_anime()
    # delete_bad_actors()
    # delete_bad_characters()

    print("END OF SCRIPT\n")
