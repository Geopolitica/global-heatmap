# Geopolitica Global Heatmap 🌏

Demo version of Geopolitica's Global Heatmap. It visualizes the number of times each country has been mentioned by the BBC in the last 24 hours and updates every 15 minutes.

[See the online demo here](https://geopolitica-global-heatmap.herokuapp.com/)

_(The link may load slowly, but this is normal)_

## Installation

Clone the repo to a new directory, the navigate to that directly and run:

```bash
npm install
```

## Usage

### Prep the Database

For the app to work, you'll need to set up a MongoDB Atlas database. You can set one up here:

[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

Set up a database on the free tier and find your connection string, which should look something like this:

`mongodb+srv://{username}:{password}@cluster0.zywmu.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&ssl=true`

Next, open the repo in your code editor and add a file called `.env` at the root level. Enter the following snippet with your connection string:

```
DATABASE=your_connection_string
```

Back in your database, load the following JSON file to a collection named "worldcountries". This will render the map tiles for the world map.

[worldcountries.json](https://github.com/johan/world.geo.json/blob/master/countries.geo.json)

[See here for tips on loading a JSON using MongoDB Compass](https://docs.mongodb.com/compass/current/import-export)

Then, save the changes and run:

```bash
npm start
```

Open `http://localhost:3000/` on your browser to see the map.

## Contributors

[Brittany Witham](https://github.com/brittwitham)

Pull requests are welcome.

## License

[MIT](https://choosealicense.com/licenses/mit/)
