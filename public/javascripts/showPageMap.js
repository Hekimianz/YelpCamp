mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/standard',
  center: campground.split(','),
  zoom: 15,
  pitch: 20,
});

new mapboxgl.Marker()
  .setLngLat(campground.split(','))
  .setPopup(
    new mapboxgl.Popup({
      offset: 25,
    }).setHTML(`<h3>${title}</h3>`)
  )
  .addTo(map);
