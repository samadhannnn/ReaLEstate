import { useEffect, useRef } from 'react';

const PropertyMap = ({ properties, setSelectedProperty }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initMap();
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDuPU05orTRiIa3CQ_zOWLbQoR3j8mM8Zg`;
        script.async = true;
        script.defer = true;
        script.onload = () => initMap();
        document.head.appendChild(script);
      }
    };

    loadGoogleMaps();

    return () => {
      markers.current.forEach(marker => marker.setMap(null));
    };
  }, []);

  const initMap = () => {
    if (!window.google || !window.google.maps) return;

    const defaultCenter = { lat: 39.8283, lng: -98.5795 }; // Center of the US
    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      zoom: 4,
      center: defaultCenter,
      mapTypeControl: true,
      zoomControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    });

    updateMarkers();
  };

  const updateMarkers = () => {
    if (!mapInstance.current || !properties.length) return;

    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];

    const bounds = new window.google.maps.LatLngBounds();
    properties.forEach(property => {
      if (property.coordinates?.lat && property.coordinates?.lng) {
        const position = { lat: property.coordinates.lat, lng: property.coordinates.lng };
        const marker = new window.google.maps.Marker({
          position,
          map: mapInstance.current,
          title: property.name || 'Property',
        });

        marker.addListener('click', () => {
          setSelectedProperty(property);
        });

        markers.current.push(marker);
        bounds.extend(position);
      }
    });

    if (properties.length) {
      mapInstance.current.fitBounds(bounds);
      if (properties.length === 1) mapInstance.current.setZoom(15);
    }
  };

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default PropertyMap;