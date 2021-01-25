let map = L.map("map").setView([20, 20], 2);
L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }
);

//- L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//-     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//- }).addTo(map);

function lookupCountryInObject(name) {
  for (let i = 0, len = mentions_array.length; i < len; i++) {
    if (mentions_array[i]._id === name) return true;
  }
  return false;
}

// TODO: Convert from Jquery
function getMapLayers() {
  $.getJSON("/maplayers", function (result) {
    $.each(result, function (i, mlayer) {
      $.getJSON("/mapjson/" + mlayer.properties.name, function (data) {
        addLayer(data, mlayer.properties.name);
      });
    });
  });
}

let mentions_array = [];

function getArray() {
  fetch("/mentions")
    .then((response) => response.json())
    .then(function (data) {
      for (i = 0; i < data.length; i++) {
        mentions_array.push(data[i]);
      }
    });
}
getArray();
getMapLayers(mentions_array);
console.log(mentions_array);

function getColor(d) {
  return d > 7
    ? "#e79200" // '#800026'
    : d > 6
    ? "#e79200"
    : d > 5
    ? "#ffa917"
    : d > 4
    ? "#feba45"
    : d > 3
    ? "#ffcb73"
    : d > 2
    ? "#ffdca2"
    : d > 1
    ? "#ffedd0"
    : "#ffffff";
}

function getCountryColour(country) {
  let color;
  for (let i = 0; i < mentions_array.length; i++) {
    if (mentions_array[i]._id === country) {
      color = getColor(mentions_array[i].count);
      break;
    }
  }
  return color;
}

function style(feature) {
  return {
    fillColor: getCountryColour(feature), // .properties.name), // getColor(feature.properties.density),
    weight: 0.5,
    opacity: 1,
    color: "white",
    dashArray: "0",
    fillOpacity: 0.7,
  };
}

let geojson;

function addLayer(layer, name) {
  let leaf_layer;
  leaf_layer = L.geoJson(layer, { style: name, onEachFeature: onEachFeature });
  leaf_layer.addTo(map);
}

function highlightFeature(e) {
  let layer = e.target;

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
  });
}
