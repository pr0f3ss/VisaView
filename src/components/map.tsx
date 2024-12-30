"use client";

import { useEffect } from "react";
import L from "leaflet";

export default function Map() {
    useEffect(() => {
        // Create the map after the component mounts
        const map = L.map("map").setView([51.505, -0.09], 13);

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Add a marker
        L.marker([51.505, -0.09]).addTo(map).bindPopup("A pretty popup!").openPopup();

        return () => {
            // Clean up the map on component unmount
            map.remove();
        };
    }, []);

    return (
        <div
            id="map"
            style={{
                height: "100vh", // Set height for the map container
                width: "100%",  // Full width
            }}
        ></div>
    );
}
