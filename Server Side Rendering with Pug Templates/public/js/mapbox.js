const locations = JSON.parse(document.getElementById("map").dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3VzaGFudDU2NCIsImEiOiJjbDh6c3V2a2MwdDl6M3VtZmIyNTA5eDkxIn0.428tfeOTJIKGzAocQG_5mg";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/sushant564/cl8ztkzjl008l15n28ds1k1td",
  // center: [-118.113491, 34.111745],
  // zoom: 10,
  // interactive: false,
});
const bounds = new mapboxgl.LngLatBounds();
locations.forEach((loc) => {
  // Create marker
  const el = document.createElement("div");
  el.className = "marker";
  // Add Marker
  new mapboxgl.Marker({
    element: el,
    anchor: "bottom",
  })
    .setLngLat(loc.coordinates)
    .addTo(map);
  // Extends map bound to include current locations
  bounds.extends(loc.coordinates);
});
map.fitBounds(bounds);
