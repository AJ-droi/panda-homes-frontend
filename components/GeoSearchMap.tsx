// "use client";
import {  useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvent } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function SearchControl({ onSelect }: { onSelect: (coords: { lat: number; lng: number }) => void }) {
  const map = useMap();
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Added error state

  const handleSearch = async () => {
    const provider = new OpenStreetMapProvider({
      params: { countrycodes: "NG" }, // Restrict to Nigeria
    });

    try {
      const results = await provider.search({ query: searchTerm });

      if (results && results.length > 0) {
        const { x, y } = results[0]; // x = longitude, y = latitude
        map.setView([y, x], 15);
        onSelect({ lat: y, lng: x });
        setErrorMessage(""); // Reset error message if results are found
      } else {
        setErrorMessage("No results found. Try a more specific search."); // Show error if no results
      }
    } catch (error) {
      console.error("Search failed", error);
      setErrorMessage("Error occurred while searching.");
    }
  };

  return (
    <div className="absolute z-[1000] top-2 left-2 bg-white p-2 rounded shadow">
      <input
        className="w-64 px-2 py-1 border border-gray-300 rounded"
        type="text"
        placeholder="Type an address in Nigeria"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>} {/* Display error message */}
    </div>
  );
}

function MapClickHandler({ onSelect }: { onSelect: (coords: { lat: number; lng: number }) => void }) {
  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    onSelect({ lat, lng });
  });
  return null;
}

export default function GeoSearchMap({ onLocationSelect }: { onLocationSelect: (coords: { lat: number; lng: number }) => void }) {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);

    // Render map only on client side
    if (typeof window === "undefined") {
        return null; // Avoid rendering on the server-side
      }

  return (
    <div className="relative w-full">
      <div className="relative w-full h-[300px]">
        <MapContainer center={[9.082, 8.6753]} zoom={6} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
          <SearchControl
            onSelect={(coords) => {
              setMarker(coords);
              onLocationSelect(coords);
            }}
          />
          <MapClickHandler
            onSelect={(coords) => {
              setMarker(coords);
              onLocationSelect(coords);
            }}
          />
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {marker && <Marker position={[marker.lat, marker.lng]} icon={markerIcon} />}
        </MapContainer>
      </div>

      {marker && (
        <div className="mt-3 bg-gray-100 p-2 rounded text-sm text-gray-700">
          <div>📍 <strong>Selected Coordinates:</strong></div>
          <div>Latitude: {marker.lat.toFixed(6)}</div>
          <div>Longitude: {marker.lng.toFixed(6)}</div>
        </div>
      )}
    </div>
  );
}
