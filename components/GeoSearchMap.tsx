/*eslint-disable */
import { useState} from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await res.json();
    return data?.display_name || null;
  } catch {
    return null;
  }
}

function SearchControl({
  onSelect,
}: {
  onSelect: (coords: { lat: number; lng: number }, address: string) => void;
}) {
  const map = useMap();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const provider = new OpenStreetMapProvider({ params: { countrycodes: "NG" } });

  const handleSearch = async (query = searchTerm) => {
    try {
      const results = await provider.search({ query });
      if (results.length > 0) {
        const { x, y, label } = results[0];
        map.setView([y, x], 15);
        onSelect({ lat: y, lng: x }, label);
        setSuggestions([]);
        setErrorMessage("");
      } else {
        setErrorMessage("No results found.");
      }
    } catch {
      setErrorMessage("Search error.");
    }
  };

  const handleInputChange = async (value: string) => {
    setSearchTerm(value);
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const results = await provider.search({ query: value });
      setSuggestions(results.slice(0, 5)); // limit to 5
      setErrorMessage("");
    } catch {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (result: any) => {
    const { x, y, label } = result;
    map.setView([y, x], 15);
    onSelect({ lat: y, lng: x }, label);
    setSearchTerm(label);
    setSuggestions([]);
  };

  return (
    <div className="absolute z-[1000] top-2 left-2 bg-white p-2 rounded shadow w-[300px]">
      <div className="flex gap-1 mb-1">
        <input
          className="flex-1 px-2 py-1 border border-gray-300 rounded"
          type="text"
          placeholder="Search address in Nigeria"
          value={searchTerm}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={() => handleSearch()}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Enter
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="bg-white border rounded max-h-[150px] overflow-y-auto text-sm">
          {suggestions.map((result, i) => (
            <li
              key={i}
              onClick={() => handleSelectSuggestion(result)}
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
            >
              {result.label}
            </li>
          ))}
        </ul>
      )}

      {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
    </div>
  );
}

function MapClickHandler({
  onSelect,
}: {
  onSelect: (coords: { lat: number; lng: number }, address: string) => void;
}) {
  useMapEvent("click", async (e) => {
    const { lat, lng } = e.latlng;
    const address = await reverseGeocode(lat, lng);
    if (address) {
      onSelect({ lat, lng }, address);
    } else {
      alert("Could not find address for this location.");
    }
  });
  return null;
}

export default function GeoSearchMap({
  onLocationSelect,
}: {
  onLocationSelect: (coords: { lat: number; lng: number }, address: string) => void;
}) {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string>("");

  if (typeof window === "undefined") return null;

  return (
    <div className="relative w-full">
      <div className="relative w-full h-[300px]">
        <MapContainer
          center={[9.082, 8.6753]}
          zoom={6}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <SearchControl
            onSelect={(coords, addr) => {
              setMarker(coords);
              setAddress(addr);
              onLocationSelect(coords, addr);
            }}
          />
          <MapClickHandler
            onSelect={(coords, addr) => {
              setMarker(coords);
              setAddress(addr);
              onLocationSelect(coords, addr);
            }}
          />
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {marker && <Marker position={[marker.lat, marker.lng]} icon={markerIcon} />}
        </MapContainer>
      </div>

      {marker && address && (
        <div className="mt-3 bg-gray-100 p-2 rounded text-sm text-gray-700">
          <div>📍 <strong>Selected Address:</strong></div>
          <div>{address}</div>
        </div>
      )}
    </div>
  );
}
