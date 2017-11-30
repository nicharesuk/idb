import requests
import json

api_key = "[PLACE API KEY HERE]"


def getd3data():
    global s
    s = requests.Session()
    s.headers.update({
    'accept': 'application/vnd.api+json',
    'content-type': 'application/vnd.api+json'
    })
    url = "http://poupon.me/api/artists"
    r = requests.get(url)
    if r.status_code == 200:
        r = r.json()
        artist_id = []
        artist_name = []
        artist_city = []
        artist_count = 1
        for artist in r:
            print(artist_count)
            artist_count += 1
            artist_id.append(artist["artist_id"])
            artist_name.append(artist["name"])
        file_name = "flare.csv"
        print('SUCCESS: ' + file_name)
        with open(file_name, 'w') as outfile:
            outfile.write("id,value")
            for i in range(0, len(artist_id)) :
                r2 = requests.get(url + "/" + str(artist_id[i]))
                if r2.status_code == 200 :
                    r2 = r2.json()
                    outfile.write("\n" + artist_name[i].encode("utf-8") + "," + str(len(r2["albums"])))
    url = "http://poupon.me/api/cities"
    r = requests.get(url)
    if r.status_code == 200:
        r = r.json()
        city_ids = []
        for city in r:
            city_ids.append(city["city_id"])
        file_name = "artists_cities.csv"
        with open(file_name, 'w') as outfile:
            outfile.write("city,population")
            for i in range(0, len(city_ids)) :
                r2 = requests.get(url + "/" + str(city_ids[i]))
                if r2.status_code == 200 :
                    r2 = r2.json()
                    outfile.write("\n" + r2["city"]["name"].encode("utf-8") + "," + str(len(r2["artists"])))

def getHeatMapInfo():
    url = "http://poupon.me/api/cities"
    r = requests.get(url)
    if r.status_code == 200:
        r = r.json()

        city_location = {}
        for city in r:
            city_state_str = city["name"] + ", " + city["state"]
            geocode_url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city_state_str.replace(" ", "+") + api_key
            print(geocode_url)

            num_artists = 0
            r2 = requests.get(url + "/" + str(city["city_id"]))
            if r2.status_code == 200 :
                r2 = r2.json()
                num_artists = len(r2["artists"])

            g = requests.get(geocode_url)
            if g.status_code == 200:
                g = g.json()
                
                lat_lng = g["results"][0]["geometry"]["location"]
                lat = lat_lng["lat"]
                lng = lat_lng["lng"]

                print(lat_lng)

                city_location[city["city_id"]] = (str(num_artists), city["name"], str(lat), str(lng))

        print(city_location)

        with open("cities-lived.csv", 'w') as outfile:
            outfile.write("years,place,lat,lon")
            for key, value in city_location.items():
                outfile.write("\n" + ",".join(value))


if __name__ == "__main__" :

    getd3data()
