import React from 'react';
import maplibregl from 'maplibre-gl'; // Import MapLibre GL JS
import axios from 'axios';
import 'maplibre-gl/dist/maplibre-gl.css'; // Import MapLibre GL JS styles
import restos from './restaurants.json';
import Modal from './Modal';
const MapWithMarkers = () => {
  const mapContainerRef = React.useRef(null);
  const [modal, setModal] = React.useState({open: false, resto: {title: '', description: '', reviews: [], address: '', picture: ''}});
  const [markers, setMarkers] = React.useState(restos); // State to store markers

  React.useEffect( () => {

    const encodedParams = new URLSearchParams();
    encodedParams.set('language', 'en_US');
    encodedParams.set('location_id', '297704');
    encodedParams.set('currency', 'USD');
    encodedParams.set('offset', '0');

    const options = {
      method: 'POST',
      url: 'https://worldwide-restaurants.p.rapidapi.com/search',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '93726a1c1dmsh57e764f0a917522p16e867jsnc9ed27c6e064',
        'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
      },
      data: encodedParams,
    };

    axios.request(options).then(function (response) {
      setMarkers(response.data.results.map( resto => {
        return {
          title: resto.name,
          description: resto.description,
          reviews: resto.reviews,
          address: resto.address,
          picture: resto.photo,
          location: {
            type: "point",
            coordinates: [
              resto.latitud, resto.longitude
            ]
          },
          }
          }))
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    })
  
  }, []);

  React.useEffect(() => {

    // Initialize the map
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'http://localhost:8080/styles/basic-preview/style.json', // local map server
      center: [-58.9522753655155, -34.6121817866322], // Initial center coordinates (longitude, latitude)
      zoom: 13, // Initial zoom level
      attributionControl: false
    });

    markers.forEach( marker => {
      // Add a marker with tooltip
    new maplibregl.Marker()
      .setLngLat([marker.location.coordinates[1], marker.location.coordinates[0]]) // Marker coordinates (longitude, latitude)
      .setPopup(new maplibregl.Popup({
        closeButton: false, // Disable the close button
        closeOnClick: true
      }).setHTML(marker.title)) // Tooltip content
      .addTo(map)
      .getElement()
      .addEventListener('click', () => {
        // Open the modal when the marker is clicked
        setModal({open: true, resto: marker})
      })
    })
  }, [markers]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ width: 'inherit', height: 'inherit' }} ref={mapContainerRef} />
      {modal.open && <Modal {...modal.resto} setModal={setModal} />}
    </div>
  );
};

export default MapWithMarkers;
