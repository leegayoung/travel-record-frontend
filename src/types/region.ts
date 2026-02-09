// src/types/region.ts

/**
 * @interface Region
 * @description 한국의 시/도 또는 군/구 지역 데이터의 타입을 정의합니다.
 * 지역 선택 UI(RegionSelector)에서 사용될 지역 정보의 구조를 명확히 합니다.
 */
export interface Region {
  code: string; // 지역 고유 코드 (예: "SEOUL", "Gyeonggi-DO", "SEOUL-GANGNAM")
  name: string; // 지역 이름 (예: "서울특별시", "경기도", "강남구")
  parentCode?: string; // 상위 지역 코드 (시/도에 속한 군/구의 경우 해당 시/도 코드)
}

/**
 * @interface Province
 * @description 한국의 '시/도' 단위 지역 데이터의 타입을 정의합니다.
 * Region 인터페이스를 확장하며, 하위 '군/구' 지역 목록을 포함할 수 있습니다.
 */
export interface Province extends Region {
  districts?: District[]; // 이 시/도에 속한 군/구 목록
}

/**
 * @interface District
 * @description 한국의 '군/구' 단위 지역 데이터의 타입을 정의합니다.
 * Region 인터페이스를 확장하며, 항상 상위 Province를 가집니다.
 */
export interface District extends Region {
  parentCode: string; // 이 군/구가 속한 시/도 코드
}
