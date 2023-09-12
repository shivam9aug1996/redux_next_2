"use client";
import React, { useState, useEffect } from "react";

import Location from "./Location";
import OrderTracking from "./OrderTracking";
// import Pusher from "pusher-js";

const Map = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // useEffect(() => {
  //   Pusher.logToConsole = true;

  //   const pusher = new Pusher("037b0dc3c53577544e54", {
  //     cluster: "ap2",
  //     authEndpoint: "/api/verifyPusher",
  //   });
  //   const channel = pusher.subscribe("private-channel-name");

  //   channel.bind("client-private-channel-name", (data) => {
  //     console.log("jhgfdfgi876", data);
  //   });

  //   channel.bind("pusher:subscription_succeeded", (data) => {
  //     console.log("Channel subscription succeeded", data);
     

  //    setTimeout(() => {
  //     channel.trigger("client-private-channel-name", { message: "ji" });
  //    }, 2000);
  //   });
   
  // }, []);


  return (
    <>
      <OrderTracking latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude} />
      <Location latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude} />
    </>
  );
};

export default Map;
