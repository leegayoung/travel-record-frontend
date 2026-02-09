// src/components/RegionSelector.tsx

import React, { useState, useEffect } from 'react';
import { getProvinces, getDistrictsByProvinceCode, getRegionByCode } from '../api/regionApi'; // 지역 API 함수 임포트
import type { Province, District } from '../types/region'; // 지역 타입 임포트
 // 지역 타입 임포트

/**
 * @interface RegionSelectorProps
 * @description RegionSelector 컴포넌트가 받을 props의 타입을 정의합니다.
 */
interface RegionSelectorProps {
  onSelectRegion: (regionCode: string, regionName: string) => void; // 지역 선택 시 호출될 콜백 함수
  initialRegionCode?: string; // 초기 선택될 지역 코드 (선택 사항)
}

/**
 * @function RegionSelector
 * @description 한국의 시/도와 군/구를 단계적으로 선택할 수 있는 드롭다운 컴포넌트입니다.
 * @param {RegionSelectorProps} props - onSelectRegion, initialRegionCode 등의 props
 * @returns {React.ReactElement} - 지역 선택 드롭다운 UI
 */
const RegionSelector: React.FC<RegionSelectorProps> = ({ onSelectRegion, initialRegionCode }) => {
  // 모든 시/도 목록을 저장하는 상태
  const [provinces, setProvinces] = useState<Province[]>([]);
  // 현재 선택된 시/도 코드를 저장하는 상태
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>('');
  // 현재 선택된 시/도에 속하는 군/구 목록을 저장하는 상태
  const [districts, setDistricts] = useState<District[]>([]);
  // 현재 선택된 군/구 코드를 저장하는 상태
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string>('');

  // 컴포넌트가 처음 마운트될 때 시/도 목록을 불러옵니다.
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (error) {
        console.error('Failed to fetch provinces:', error);
      }
    };
    fetchProvinces();
  }, []); // 빈 배열은 컴포넌트 마운트 시 한 번만 실행됨을 의미합니다.

  // initialRegionCode prop이 변경될 때 초기 선택을 설정합니다.
  useEffect(() => {
    const setInitialSelection = async () => {
      if (initialRegionCode) {
        const region = await getRegionByCode(initialRegionCode);
        if (region) {
          if (region.parentCode) { // 군/구인 경우
            setSelectedProvinceCode(region.parentCode);
            setSelectedDistrictCode(region.code);
            // 부모 시/도에 해당하는 군/구 목록을 미리 로드
            const fetchedDistricts = await getDistrictsByProvinceCode(region.parentCode);
            setDistricts(fetchedDistricts);
            onSelectRegion(region.code, region.name);
          } else { // 시/도인 경우
            setSelectedProvinceCode(region.code);
            setSelectedDistrictCode(''); // 시/도만 선택했으므로 군/구는 초기화
            onSelectRegion(region.code, region.name);
          }
        }
      }
    };
    setInitialSelection();
  }, [initialRegionCode, onSelectRegion]); // initialRegionCode 또는 onSelectRegion 변경 시 실행

  // selectedProvinceCode가 변경될 때마다 해당 시/도에 속하는 군/구 목록을 불러옵니다.
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvinceCode) {
        try {
          const data = await getDistrictsByProvinceCode(selectedProvinceCode);
          setDistricts(data);
          // 시/도를 변경하면 군/구 선택을 초기화합니다.
          // 초기 regionCode가 있을 경우, initialRegionCode의 district가 selectedDistrictCode에 들어있으므로,
          // selectedProvinceCode가 변경될 때만 selectedDistrictCode를 ''으로 초기화하면 됩니다.
          if (initialRegionCode?.startsWith(selectedProvinceCode) && initialRegionCode.length > selectedProvinceCode.length) {
            // initialRegionCode가 현재 province에 속하는 district인 경우, districtCode를 유지
          } else {
             setSelectedDistrictCode('');
          }
        } catch (error) {
          console.error(`Failed to fetch districts for ${selectedProvinceCode}:`, error);
          setDistricts([]); // 에러 발생 시 목록 초기화
        }
      } else {
        setDistricts([]); // 시/도가 선택되지 않으면 군/구 목록 초기화
        setSelectedDistrictCode('');
      }
    };
    fetchDistricts();
  }, [selectedProvinceCode, initialRegionCode]);

  // 시/도 선택 변경 핸들러
  const handleProvinceChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const code = event.target.value;
    setSelectedProvinceCode(code);
    setSelectedDistrictCode(''); // 시/도 변경 시 군/구 초기화

    // 선택된 시/도에 대한 이름 찾아서 콜백 호출 (군/구 선택하지 않았으므로 시/도만 전달)
    const selectedProvince = provinces.find(p => p.code === code);
    if (selectedProvince) {
      onSelectRegion(code, selectedProvince.name);
    } else {
      // 아무것도 선택 안 했을 경우 초기화
      onSelectRegion('', '');
    }
  };

  // 군/구 선택 변경 핸들러
  const handleDistrictChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const code = event.target.value;
    setSelectedDistrictCode(code);

    // 선택된 군/구에 대한 이름 찾아서 콜백 호출
    const selectedDistrict = districts.find(d => d.code === code);
    if (selectedDistrict) {
      onSelectRegion(code, selectedDistrict.name);
    } else {
      // 아무것도 선택 안 했을 경우, 현재 선택된 시/도 정보 다시 전달
      const selectedProvince = provinces.find(p => p.code === selectedProvinceCode);
      if (selectedProvince) {
        onSelectRegion(selectedProvinceCode, selectedProvince.name);
      } else {
        onSelectRegion('', '');
      }
    }
  };

  return (
    <div className="flex space-x-2 mb-4">
      {/* 시/도 선택 드롭다운 */}
      <select
        value={selectedProvinceCode}
        onChange={handleProvinceChange}
        className="block w-1/2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">시/도 선택</option>
        {provinces.map((province) => (
          <option key={province.code} value={province.code}>
            {province.name}
          </option>
        ))}
      </select>

      {/* 군/구 선택 드롭다운 (시/도가 선택되어야 활성화) */}
      <select
        value={selectedDistrictCode}
        onChange={handleDistrictChange}
        disabled={!selectedProvinceCode || districts.length === 0} // 시/도가 선택되지 않았거나 군/구가 없으면 비활성화
        className="block w-1/2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">군/구 선택</option>
        {districts.map((district) => (
          <option key={district.code} value={district.code}>
            {district.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionSelector;
