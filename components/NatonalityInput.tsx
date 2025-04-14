/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Search, X, XCircle } from "lucide-react";

interface CountryData {
  name: string;
  flag: string;
  code: string;
}

interface NationalityInputProps {
  value: string;
  onChange: (nationality: string) => void;
  placeholder?: string;
  initialCountryCode?: string;
  error?: boolean;
  errorMessage?: string;
}

const NationalityInput: React.FC<NationalityInputProps> = ({
  value,
  onChange,
  placeholder = "Select nationality",
  initialCountryCode = "NG",
  error,
  errorMessage,
}) => {
  const countriesData: CountryData[] = require("../data/countryDialCode.json")

  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>({
    name: "Nigeria",
    flag: "🇳🇬",
    code: "NG",
  });
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);

  useEffect(() => {
    const defaultCountry = countriesData.find(
      (country) => country.code === initialCountryCode.toUpperCase()
    );
    if (defaultCountry && !selectedCountry) {
      setSelectedCountry(defaultCountry);
      if (!value) {
        onChange(defaultCountry.name);
      }
    }
  }, [initialCountryCode, countriesData]);

  useEffect(() => {
    if (value && !selectedCountry) {
      const country = countriesData.find(c => c.name === value);
      if (country) {
        setSelectedCountry(country);
      }
    }
  }, [value, countriesData]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCountries(countriesData);
    } else {
      const filtered = countriesData.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchQuery, countriesData]);

  const selectCountry = (country: CountryData) => {
    setSelectedCountry(country);
    onChange(country.name);
    setModalVisible(false);
    setSearchQuery("");
  };

  return (
    <div className="w-full relative">
      <div
        className={`flex text-[#999999] items-center border-1 h-[64px] px-[30px] py-[19px] bg-[white] rounded-md overflow-hidden ${
          error ? "border-[#D42620]" : "border-[#80838D]"
        }`}
        onClick={() => {
          setModalVisible(true);
          setFilteredCountries(countriesData);
        }}
        style={{fontFamily: 'Inter'}}
      >
        <div className="flex items-center px-3 py-3.5 w-full cursor-pointer">
          {selectedCountry ? (
            <div className="flex items-center">
              <span className="text-xl mr-2">{selectedCountry.flag}</span>
              <span className="text-sm text-[#999999]">
                {selectedCountry.name}
              </span>
            </div>
          ) : (
            <span className="text-[14px] text-[#808D]">{placeholder}</span>
          )}
          <ChevronDown size={16} className="text-gray-500 ml-auto" />
        </div>
      </div>

      {error && (
        <p className="text-[#D42620] mt-2 text-xs font-medium">
          {errorMessage}
        </p>
      )}

      {/* Country Selection Modal */}
      {modalVisible && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center sm:items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-xl max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-[#E0E0E0]">
              <h3 className="text-lg font-bold text-gray-800">
                Select Nationality
              </h3>
              <button
                className="p-1"
                onClick={() => {
                  setModalVisible(false);
                  setSearchQuery("");
                }}
              >
                <X size={24} className="text-gray-800" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex items-center mx-4 my-3 px-3 border border-[#E0E0E0] rounded-lg bg-[#F8F8F8]">
              <Search size={20} className="text-gray-500 mr-2" />
              <input
                className="flex-1 py-2.5 text-base text-gray-700 bg-transparent focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search nationalities..."
                autoCapitalize="none"
              />
              {searchQuery.length > 0 && (
                <button onClick={() => setSearchQuery("")}>
                  <XCircle size={20} className="text-gray-500" />
                </button>
              )}
            </div>

            {/* Country List */}
            <div className="overflow-y-auto flex-1">
              {filteredCountries.map((country) => (
                <div
                  key={country.code}
                  className="flex items-center py-3 px-4 border-b border-[#F0F0F0] cursor-pointer hover:bg-gray-50"
                  onClick={() => selectCountry(country)}
                >
                  <span className="text-2xl mr-3">{country.flag}</span>
                  <div className="text-base text-gray-800">{country.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NationalityInput;