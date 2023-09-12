import React, { useState, useEffect } from 'react';

const Location=({latitude, setLatitude, longitude, setLongitude})=> {
  console.log("latitude",latitude)
 
  const [error, setError] = useState(null);

  useEffect(()=>{
    requestLocation()
  },[])

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError(null); // Reset any previous errors
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div>
      {/* {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {latitude && longitude ? (
            <p>
              Latitude: {latitude}, Longitude: {longitude}
            </p>
          ) : (
            <p>Click the button below to get your location.</p>
          )}
          <button onClick={requestLocation}>Get My Location</button>
        </div>
      )} */}
    </div>
  );
}

export default Location;
