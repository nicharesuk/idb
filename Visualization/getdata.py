import requests
import json


def getdata():
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
        artistID = []
        artistName = []
        vount = 0
        for i in r:
            print(vount)
            vount += 1
            artistID.append(i["artist_id"])
            artistName.append(i["name"])
        file_name = "flare.csv"
        print('SUCCESS: ' + file_name)
        with open(file_name, 'w') as outfile:
            outfile.write("id,value")
            for i in range(0, len(artistID)) :
                r2 = requests.get(url + "/" + str(artistID[i]))
                if r2.status_code == 200 :
                    r2 = r2.json()
                    outfile.write("\n" + artistName[i].encode("utf-8") + "," + str(len(r2["albums"])))





if __name__ == "__main__" :
    getdata()