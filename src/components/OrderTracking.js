import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

function OrderTracking({ latitude, setLatitude, longitude, setLongitude }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA5qIQ4V2KvWEr6jREaXPe9gnJpWLdtYrQ",
  });

  // User's location (replace with actual coordinates)
  const [userLocation, setUserLocation] = useState({
    lat: latitude,
    lng: longitude,
  });

  // Delivery partner's location (replace with actual coordinates)
  const [deliveryPartnerLocation, setDeliveryPartnerLocation] = useState({
    lat: latitude,
    lng: longitude,
  });
  const [center, setCenter] = useState(null);

  console.log("center",center)
  console.log("userlocation",userLocation)
  console.log("delivery",deliveryPartnerLocation)

  useEffect(() => {
    setUserLocation({
      lat: latitude,
      lng: longitude,
    });
    setDeliveryPartnerLocation({
      lat: 28.713248267102593,
      lng: 77.65418330936467,
    });
  }, [latitude, longitude]);

  useEffect(() => {
    setCenter({
      lat: (userLocation.lat + deliveryPartnerLocation.lat) / 2,
      lng: (userLocation.lng + deliveryPartnerLocation.lng) / 2,
    });
  }, [userLocation.lat, userLocation.lng]);

  // useEffect(() => {
  //   // Simulate real-time updates for user and delivery partner locations
  //   const userLocationInterval = setInterval(() => {
  //     setUserLocation({
  //       lat: userLocation.lat + Math.random() / 100,
  //       lng: userLocation.lng + Math.random() / 100,
  //     });
  //   }, 5000); // Update every 5 seconds

  //   const deliveryPartnerLocationInterval = setInterval(() => {
  //     setDeliveryPartnerLocation({
  //       lat: deliveryPartnerLocation.lat + Math.random() / 100,
  //       lng: deliveryPartnerLocation.lng + Math.random() / 100,
  //     });
  //   }, 5000); // Update every 5 seconds

  //   return () => {
  //     clearInterval(userLocationInterval);
  //     clearInterval(deliveryPartnerLocationInterval);
  //   };
  // }, [userLocation, deliveryPartnerLocation]);

  return isLoaded&&center.lat ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      {/* User's location marker */}
      {userLocation.lat && <Marker position={userLocation} label="User" />}

      {/* Delivery partner's location marker */}
      {deliveryPartnerLocation.lat && (
        <Marker position={deliveryPartnerLocation} label="Delivery Partner" />
      )}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
}

export default React.memo(OrderTracking);
