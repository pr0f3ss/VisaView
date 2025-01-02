"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import SearchBar from "@/components/SearchBar"; // Adjust import based on file location

export default function Map() {
    useEffect(() => {
        const map = L.map("map").setView([51.505, -0.09], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        return () => {
            map.remove();
        };
    }, []);

    const handleSearch = (query: string) => {
        console.log("Searching for:", query);
        // Implement database query or API call to fetch country coordinates
    };

    return (
        <div style={{ position: "relative" }}>
            <div id="map" style={{ height: "100vh", width: "100%" }}></div>
            <SearchBar onSearch={handleSearch} />
        </div>
    );
}
