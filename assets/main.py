# from GoogleNews import GoogleNews
# googlenews = GoogleNews()
# googlenews = GoogleNews(lang='en', region='US')
# googlenews.get_news('Minneapolis')
from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/result", methods = ["POST", "GET"])
@cross_origin(supports_credentials=True)
def result():
    zipcode = 55414
    us_state_to_abbrev = {
        "Alabama": "AL",
        "Alaska": "AK",
        "Arizona": "AZ",
        "Arkansas": "AR",
        "California": "CA",
        "Colorado": "CO",
        "Connecticut": "CT",
        "Delaware": "DE",
        "Florida": "FL",
        "Georgia": "GA",
        "Hawaii": "HI",
        "Idaho": "ID",
        "Illinois": "IL",
        "Indiana": "IN",
        "Iowa": "IA",
        "Kansas": "KS",
        "Kentucky": "KY",
        "Louisiana": "LA",
        "Maine": "ME",
        "Maryland": "MD",
        "Massachusetts": "MA",
        "Michigan": "MI",
        "Minnesota": "MN",
        "Mississippi": "MS",
        "Missouri": "MO",
        "Montana": "MT",
        "Nebraska": "NE",
        "Nevada": "NV",
        "New Hampshire": "NH",
        "New Jersey": "NJ",
        "New Mexico": "NM",
        "New York": "NY",
        "North Carolina": "NC",
        "North Dakota": "ND",
        "Ohio": "OH",
        "Oklahoma": "OK",
        "Oregon": "OR",
        "Pennsylvania": "PA",
        "Rhode Island": "RI",
        "South Carolina": "SC",
        "South Dakota": "SD",
        "Tennessee": "TN",
        "Texas": "TX",
        "Utah": "UT",
        "Vermont": "VT",
        "Virginia": "VA",
        "Washington": "WA",
        "West Virginia": "WV",
        "Wisconsin": "WI",
        "Wyoming": "WY",
        "District of Columbia": "DC",
        "American Samoa": "AS",
        "Guam": "GU",
        "Northern Mariana Islands": "MP",
        "Puerto Rico": "PR",
        "United States Minor Outlying Islands": "UM",
        "U.S. Virgin Islands": "VI",
    }
        
    # invert the dictionary
    abbrev_to_us_state = dict(map(reversed, us_state_to_abbrev.items()))

    from pyzipcode import ZipCodeDatabase
    zcdb = ZipCodeDatabase()
    if zipcode in zcdb:
        obj = zcdb[zipcode]
        city = obj.city
        if obj.state in abbrev_to_us_state:
            state = abbrev_to_us_state[obj.state]
        else:
            print("State could not be found")
    else:
        print("Zipcode could not be found")

    import requests
    from bs4 import BeautifulSoup
    url = f"https://patch.com/{state}/{city}"
    session = requests.Session()
    print(url)
    page = session.get(url)

    soup = BeautifulSoup(page.content, "html.parser")

    results = soup.find_all("h2")
    titles = []
    print("hi")
    for val in results:
        print(val.get("href"))
        titles.append(val.text)
        if len(titles) == 5:
            break
    images = soup.select('a img') 
    index = 1
    img = []
    count = 0
    while count < 5:
        if images[index]['src'].startswith("https"):
            img.append(images[index]['src'])
            count += 1
            index += 1
        else:
            index += 1
    desc = []
    d = soup.find_all("p",attrs={"class":"styles_Card__Description__VF811"})
    for i in range (5):
        desc.append(d[i].text)
    return {"titles": titles, "images": img, "descriptions": desc}

app.run(debug=True, port=2000)


