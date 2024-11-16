import React from "react";
import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "../ui/select";
import axios from "axios";

export default function LocationSelector({ onLocationChange }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
  const [isLoadingWards, setIsLoadingWards] = useState(false);

  const [result, setResult] = useState("");

  const host = "https://provinces.open-api.vn/api/";

  useEffect(() => {
    const fetchProvinces = async () => {
      setIsLoadingProvinces(true);
      try {
        const response = await axios.get(`${host}?depth=1`);
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setIsLoadingProvinces(false);
      }
    };
    fetchProvinces();
  }, []);

  const handleProvinceChange = async (provinceCode) => {
    setSelectedProvince(provinceCode);
    setSelectedDistrict("");
    setSelectedWard("");

    if (!provinceCode) return;

    setIsLoadingDistricts(true);
    try {
      const response = await axios.get(`${host}p/${provinceCode}?depth=2`);
      setDistricts(response.data.districts);
    } catch (err) {
      console.error("Error fetching districts:", err);
    } finally {
      setIsLoadingDistricts(false);
    }
  };

  const handleDistrictChange = async (districtCode) => {
    setSelectedDistrict(districtCode);
    setSelectedWard("");

    if (!districtCode) return;

    setIsLoadingWards(true);
    try {
      const response = await axios.get(`${host}d/${districtCode}?depth=2`);
      setWards(response.data.wards);
    } catch (err) {
      console.error("Error fetching districts:", err);
    } finally {
      setIsLoadingWards(false);
    }
  };

  const handleWardChange = (wardCode) => {
    setSelectedWard(wardCode);
  };

  useEffect(() => {
    if (selectedProvince && selectedDistrict && selectedWard) {
      const provinceName = provinces.find(
        (province) => province.code.toString() === selectedProvince // Fixed: was comparing with selectedWard
      )?.name;
      const districtName = districts.find(
        (district) => district.code.toString() === selectedDistrict
      )?.name;
      const wardName = wards.find(
        (ward) => ward.code.toString() === selectedWard
      )?.name;

      if (provinceName && districtName && wardName) {
        onLocationChange({
          province: { code: selectedProvince, name: provinceName },
          district: { code: selectedDistrict, name: districtName },
          ward: { code: selectedWard, name: wardName },
          fullAddress: `${provinceName}, ${districtName}, ${wardName}`,
        });
      }
    }
  }, [
    selectedProvince,
    selectedDistrict,
    selectedWard,
    provinces,
    districts,
    wards,
  ]);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="grid flex-col space-y-2">
        <label className="text-sm font-medium">Tỉnh / thành</label>
        <Select value={selectedProvince} onValueChange={handleProvinceChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn tỉnh / thành" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Chọn</SelectItem>
            {provinces.map((city) => (
              <SelectItem key={city.code} value={city.code.toString()}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Quận / huyện</label>
        <Select
          value={selectedDistrict}
          onValueChange={handleDistrictChange}
          disabled={!selectedProvince}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn quận / huyện" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Chọn</SelectItem>
            {districts.map((district) => (
              <SelectItem key={district.code} value={district.code.toString()}>
                {district.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Phường / xã</label>
        <Select
          value={selectedWard}
          onValueChange={handleWardChange}
          disabled={!selectedDistrict}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn phường / xã" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Chọn</SelectItem>
            {wards.map((ward) => (
              <SelectItem key={ward.code} value={ward.code.toString()}>
                {ward.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="text-sm">{result}</p>
        </div>
      )}
    </div>
  );
}
