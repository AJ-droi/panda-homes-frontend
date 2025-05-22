// components/AddressAutocomplete.tsx
'use client';
/* eslint-disable */
import React, { useRef, useState } from 'react';
import {
  LoadScript,
  Autocomplete,
  // GoogleMap,
  // Marker
} from '@react-google-maps/api';

const libraries = ['places'] as any;

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 6.5244, // Default to Lagos, Nigeria
  lng: 3.3792,
};

export default function AddressAutocomplete({
  onPlaceSelected,
}: {
  onPlaceSelected: (place: google.maps.places.PlaceResult | null) => void;
}) {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place?.geometry?.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const position = { lat, lng };

      setMapCenter(position);
      setMarkerPosition(position);
      onPlaceSelected(place);
    } else {
      onPlaceSelected(place || null);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={libraries}
    >
      <div className="space-y-4">
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter a location"
            className={`w-full px-[30px]  py-[13px] mt-2 border-1 text-[14px] border-[#8692A6] rounded-[6px] focus:outline-none focus:border-[#785DBA] text-[#666666] transition-colors leading-[100%] font-[500]`}
          />
        </Autocomplete>

        {/* <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={14}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap> */}
      </div>
    </LoadScript>
  );
}
