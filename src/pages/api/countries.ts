import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
        return res.status(400).json({ message: "Query parameter 'q' is required" });
    }

    try {
        // Call the RestCountries API
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(q)}`);
        if (!response.ok) {
            return res.status(response.status).json({ message: "Failed to fetch country data" });
        }

        const data = await response.json();
        const results = data.map((country: any) => ({
            name: country.name.common,
            lat: country.latlng[0],
            lng: country.latlng[1],
        }));

        res.status(200).json(results);
    } catch (error) {
        console.error("Error in API:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
