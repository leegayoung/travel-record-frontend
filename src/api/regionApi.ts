// src/api/regionApi.ts

// src/api/regionApi.ts
import type { Province, District, Region } from '../types/region';

/**
 * @constant MOCK_KOREA_REGIONS
 * @description 한국의 시/도 및 군/구 데이터를 포함하는 Mock 데이터입니다.
 * 실제 서비스에서는 이 데이터를 백엔드 API로부터 받아와야 합니다.
 * 여기서는 UI 개발을 위해 정적인 데이터로 사용합니다.
 * 각 Province는 code, name을 가지며, districts 배열에 하위 District를 가질 수 있습니다.
 * District는 code, name, parentCode(상위 Province의 code)를 가집니다.
 */
const MOCK_KOREA_REGIONS: Province[] = [
  {
    code: 'SEOUL',
    name: '서울특별시',
    districts: [
      { code: 'SEOUL-GANGNAM', name: '강남구', parentCode: 'SEOUL' },
      { code: 'SEOUL-GANGDONG', name: '강동구', parentCode: 'SEOUL' },
      { code: 'SEOUL-MAPO', name: '마포구', parentCode: 'SEOUL' },
      { code: 'SEOUL-JUNGGU', name: '중구', parentCode: 'SEOUL' },
      // ... 서울의 다른 구들
    ],
  },
  {
    code: 'Gyeonggi-DO',
    name: '경기도',
    districts: [
      { code: 'Gyeonggi-Suwon', name: '수원시', parentCode: 'Gyeonggi-DO' },
      { code: 'Gyeonggi-Yongin', name: '용인시', parentCode: 'Gyeonggi-DO' },
      { code: 'Gyeonggi-Seongnam', name: '성남시', parentCode: 'Gyeonggi-DO' },
      // ... 경기도의 다른 시/군들
    ],
  },
  {
    code: 'Busan',
    name: '부산광역시',
    districts: [
      { code: 'Busan-Haeundae', name: '해운대구', parentCode: 'Busan' },
      { code: 'Busan-Busanjin', name: '부산진구', parentCode: 'Busan' },
      // ... 부산의 다른 구들
    ],
  },
  {
    code: 'Jeju-DO',
    name: '제주특별자치도',
    districts: [
      { code: 'Jeju-JejuSi', name: '제주시', parentCode: 'Jeju-DO' },
      { code: 'Jeju-SeogwipoSi', name: '서귀포시', parentCode: 'Jeju-DO' },
    ],
  },
  // TODO: 실제 한국의 모든 시/도, 군/구 데이터를 추가하거나 백엔드에서 받아오도록 구현 필요
];

/**
 * @function getProvinces
 * @description 한국의 모든 시/도 목록을 비동기적으로 가져옵니다.
 * @returns {Promise<Province[]>} - 시/도 목록 (하위 군/구 정보는 제외)
 */
export const getProvinces = async (): Promise<Province[]> => {
  // 실제 API 호출을 흉내 내기 위해 비동기 처리를 합니다.
  return new Promise((resolve) => {
    setTimeout(() => {
      // 군/구 정보 없이 시/도만 반환
      const provincesOnly = MOCK_KOREA_REGIONS.map((p) => ({ code: p.code, name: p.name }));
      resolve(provincesOnly);
    }, 100); // 100ms 지연
  });
};

/**
 * @function getDistrictsByProvinceCode
 * @description 특정 시/도 코드에 해당하는 모든 군/구 목록을 비동기적으로 가져옵니다.
 * @param {string} provinceCode - 시/도의 고유 코드
 * @returns {Promise<District[]>} - 해당 시/도에 속한 군/구 목록
 */
export const getDistrictsByProvinceCode = async (provinceCode: string): Promise<District[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const province = MOCK_KOREA_REGIONS.find((p) => p.code === provinceCode);
      if (province && province.districts) {
        resolve(province.districts);
      } else if (province && !province.districts) {
        // 하위 군/구가 없는 시/도일 경우 빈 배열 반환
        resolve([]);
      } else {
        reject(new Error(`Province not found for code: ${provinceCode}`));
      }
    }, 100); // 100ms 지연
  });
};

/**
 * @function getRegionByCode
 * @description 특정 지역 코드(시/도 또는 군/구)에 해당하는 지역 정보를 가져옵니다.
 * @param {string} regionCode - 조회할 지역의 고유 코드
 * @returns {Promise<Region | undefined>} - 해당 지역 정보 또는 undefined
 */
export const getRegionByCode = async (regionCode: string): Promise<Region | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      for (const province of MOCK_KOREA_REGIONS) {
        if (province.code === regionCode) {
          return resolve({ code: province.code, name: province.name });
        }
        if (province.districts) {
          const district = province.districts.find((d) => d.code === regionCode);
          if (district) {
            return resolve(district);
          }
        }
      }
      resolve(undefined); // 찾지 못하면 undefined 반환
    }, 50);
  });
};
