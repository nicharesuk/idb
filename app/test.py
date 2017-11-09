import requests
import json
import unittest


class TestAPI(unittest.TestCase):
    global s 
    s = requests.Session()
    s.headers.update({'accept' : 'application/vnd.api+json' , 'content-type' : 'application/vnd.api+json'})

    def test_animes(self):
        file = open("Test Data/anime/animes", "r")
        expected1 = json.load(file)
        file.close()
        r = s.get("http://www.weebmd.me/api/animes")
        actual1 = r.json()
        self.assertEqual(expected1, actual1)

    def test_animes_individual_1(self):

        file = open("Test Data/anime/1", "r")
        expected1 = json.load(file)
        file.close()
        r = s.get("http://www.weebmd.me/api/animes/1")		
        actual1 = r.json()
        self.assertEqual(expected1, actual1)


    def test_animes_individual_2(self):

        file = open("Test Data/anime/100", "r")
        expected1 = json.load(file)
        file.close()
        r = s.get("http://www.weebmd.me/api/animes/100")		
        actual1 = r.json()
        self.assertEqual(expected1, actual1)

    def test_animes_individual_3(self):

        file = open("Test Data/anime/50", "r")
        expected1 = json.load(file)
        file.close()
        r = s.get("http://www.weebmd.me/api/animes/50")		
        actual1 = r.json()
        self.assertEqual(expected1, actual1)

		




    def test_animes_linked_one_relation(self):

        file = open("Test Data/anime/25supp", "r")
        expected1 = json.load(file)
        file.close()
        r = s.get("http://www.weebmd.me/api/animes/25?include=mangas")		
        actual1 = r.json()
        self.assertEqual(expected1, actual1)


    def test_animes_linked_two_relations(self):

        file = open("Test Data/anime/75supp", "r")
        expected1 = json.load(file)
        expected = ordered(expected1)
        file.close()
        r = s.get("http://www.weebmd.me/api/animes/75?include=characters,actors")		
        actual1 = r.json()
        actual = ordered(actual1)
        self.assertEqual(expected, actual)

    def test_animes_linked_all_relations(self):

        file = open("Test Data/anime/13supp", "r")
        expected1 = json.load(file)
        expected = ordered(expected1)
        file.close()
        r = s.get("http://www.weebmd.me/api/animes/13?include=characters,actors,mangas")		
        actual1 = r.json()
        actual = ordered(actual1)
        self.assertEqual(expected, actual)


       

    def test_mangas(self):
        file = open("Test Data/manga/mangas", "r")
        expected1 = json.load(file)
        file.close()
        r = s.get("http://www.weebmd.me/api/mangas")		
        actual1 = r.json()
        self.assertEqual(expected1, actual1)

    def test_mangas_individual(self):
        file = open("Test Data/manga/1", "r")
        expected1 = json.load(file)
        file.close()
        r = s.get("http://www.weebmd.me/api/mangas/1")		
        actual1 = r.json()
        self.assertEqual(expected1, actual1)

    def test_mangas_linked_one_relations(self):
        file = open("Test Data/manga/22supp", "r")
        expected1 = json.load(file)
        expected = ordered(expected1)
        file.close()
        r = s.get("http://www.weebmd.me/api/mangas/22?include=characters")		
        actual1 = r.json()
        actual = ordered(actual1)
        self.assertEqual(expected, actual)

    def test_mangas_linked_two_relations(self):
        file = open("Test Data/manga/55supp", "r")
        expected1 = json.load(file)
        expected = ordered(expected1)
        file.close()
        r = s.get("http://www.weebmd.me/api/mangas/55?include=characters,animes")		
        actual1 = r.json()
        actual = ordered(actual1)
        self.assertEqual(expected, actual)

    def test_characters(self):
        file = open("Test Data/character/characters", "r")
        expected1 = json.load(file)
        file.close()
        r = s.get("http://www.weebmd.me/api/characters")		
        actual1 = r.json()
        self.assertEqual(expected1, actual1)

    def test_characters_individual(self):
        file = open("Test Data/character/1", "r")
        expected1 = json.load(file)
        file.close()
        r = s.get("http://www.weebmd.me/api/characters/1")		
        actual1 = r.json()
        self.assertEqual(expected1, actual1)

    def test_characters_linked_one_relations(self):
        file = open("Test Data/character/50supp", "r")
        expected1 = json.load(file)
        expected = ordered(expected1)
        file.close()
        r = s.get("http://www.weebmd.me/api/characters/50?include=animes")		
        actual1 = r.json()
        actual = ordered(actual1)
        self.assertEqual(expected, actual)

    def test_characters_linked_two_relations(self):
        file = open("Test Data/character/80supp", "r")
        expected1 = json.load(file)
        expected = ordered(expected1)
        file.close()
        r = s.get("http://www.weebmd.me/api/characters/80?include=mangas,animes")		
        actual1 = r.json()
        actual = ordered(actual1)
        self.assertEqual(expected, actual)

    def test_actors_individual(self):
        file = open("Test Data/actor/1", "r")
        expected1 = json.load(file)
        file.close()
        r = s.get("http://www.weebmd.me/api/actors/1")		
        actual1 = r.json()
        self.assertEqual(expected1, actual1)

    def test_actors_linked_one_relations(self):
        file = open("Test Data/actor/50supp", "r")
        expected1 = json.load(file)
        expected = ordered(expected1)
        file.close()
        r = s.get("http://www.weebmd.me/api/actors/50?include=animes")		
        actual1 = r.json()
        actual = ordered(actual1)
        self.assertEqual(expected, actual)

    def test_actors_linked_two_relations(self):
        file = open("Test Data/actor/80supp", "r")
        expected1 = json.load(file)
        expected = ordered(expected1)
        file.close()
        r = s.get("http://www.weebmd.me/api/actors/80?include=characters,animes")		
        actual1 = r.json()
        actual = ordered(actual1)
        self.assertEqual(expected, actual)







def ordered(obj):
    if isinstance(obj, dict):
        return sorted((k, ordered(v)) for k, v in obj.items())
    if isinstance(obj, list):
        return sorted(ordered(x) for x in obj)
    else:
        return obj

if __name__ == '__main__':
    unittest.main()