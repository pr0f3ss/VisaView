"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import SearchBar from "./SearchBar";

export default function Map() {
    const [map, setMap] = useState<L.Map | null>(null);

    useEffect(() => {
        const leafletMap = L.map("map").setView([20, 0], 2); // World view
        setMap(leafletMap);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(leafletMap);

        setMap(leafletMap);

        return () => {
            leafletMap.remove();
        };
    }, []);

    const handleSearch = async (query: string) => {
        if (!map) return;
        
        // RESTCountry call
        try {
            const response = await fetch(`/api/countries?q=${query}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const countries = await response.json();

            if (countries.length > 0 && map) {
                const { lat, lng } = countries[0];
                map.setView([lat, lng], 6);
                //L.marker([lat, lng]).addTo(map).bindPopup(countries[0].name).openPopup();
            } else {
                alert("Country not found!");
            }
        } catch (error) {
            console.error("Error fetching country data:", error);
            alert("Failed to fetch country data. Please try again.");
        }

        // GeoJSON call
        try {
            // Fetch the GeoJSON file
            const response = await fetch("/geojson/countries.geo.json");
            if (!response.ok) {
                throw new Error(`Failed to fetch GeoJSON: ${response.statusText}`);
            }
    
            const geojson = await response.json();
    
            // Ensure the GeoJSON has 'features'
            if (!geojson.features || !Array.isArray(geojson.features)) {
                throw new Error("Invalid GeoJSON structure: Missing 'features'");
            }
    
            // Search for the country based on the provided query
            const countryFeature = geojson.features.find(
                (feature: any) =>
                    feature.properties?.name?.toLowerCase() === query.toLowerCase() ||
                    feature.properties?.admin?.toLowerCase() === query.toLowerCase()
            );
    
            if (countryFeature) {
                // Create a Leaflet layer to highlight the country
                const layer = L.geoJSON(countryFeature, {
                    style: {
                        color: "blue",
                        weight: 2,
                        fillColor: "lightblue",
                        fillOpacity: 0.5,
                    },
                }).addTo(map);
    
                // Zoom to the country's bounds
                const bounds = layer.getBounds();
                map.fitBounds(bounds);
            } else {
                alert("Country not found!");
            }
        } catch (error) {
            console.error("Error fetching or processing GeoJSON:", error);
            alert("Failed to fetch or process GeoJSON data.");
        }
    };

    return (
        <div style={{ position: "relative" }}>
            <div id="map" style={{ height: "100vh", width: "100%" }}></div>
            <SearchBar onSearch={handleSearch} />
        </div>
    );
}
