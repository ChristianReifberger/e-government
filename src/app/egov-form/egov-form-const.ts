export enum ApplicationType {
  NATURAL_PERSON = 'NATURAL_PERSON',
  LAWFUL_PERSON = 'LAWFUL_PERSON',
  PERSON_CORPORATION = 'PERSON_CORPORATION'
}

export enum ApplicationCreatorType {
  SELF = 'SELF',
  PROFESSIONAL_REPRESENTANT = 'PROFESSIONAL_REPRESENTANT',
  EMPLOYEE_OF_APPLICANT = 'EMPLOYEE_OF_APPLICANT',
  OTHER_REPRESENTANT = 'OTHER_REPRESENTANT'
}

export enum WorkType {
  LOW_BUILDING = 'LOW_BUILDING',
  HIGH_BUILDING = 'HIGH_BUILDING',
  RENEWAL = 'RENEWAL'
}

export enum LowBuildingType {
  EXCAVATION_WORK = 'EXCAVATION_WORK',
  CABLE_WORK = 'CABLE_WORK',
  NEW_BUILDING = 'NEW_BUILDING',
  PIPELINE_WORK = 'PIPELINE_WORK',
  STREET_BUILDING = 'STREET_BUILDING',
  LOW_BUILDING_OTHER = 'LOW_BUILDING_OTHER'
}

export enum HighBuildingType {
  PUBLIC_LIGHTING = 'PUBLIC_LIGHTING',
  FACADE_WORK = 'FACADE_WORK',
  NO_STOPPING = 'NO_STOPPING',
  HOUSE_DEMOLITION = 'HOUSE_DEMOLITION',
  LIFTING_WORK_CRANE = 'LIFTING_WORK_CRANE',
  APARTMENT_OR_STORE_MODIFICATION = 'APARTMENT_OR_STORE_MODIFICATION',
  TWO_STORY_EXTENSION = 'TWO_STORY_EXTENSION',
  HIGH_BUILDING_OTHER = 'HIGH_BUILDING_OTHER'
}

export enum LowBuildingDetailsType {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN'
}