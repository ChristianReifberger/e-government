import {FormControl} from '@angular/forms';

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

export enum ConstructionSiteType {
  CITY_AREA = 'CITY_AREA',
  FREELAND = 'FREELAND'
}

export interface ConstructionSection {
  constructionSitePosition: ConstructionSitePosition;
  constructionDuration: ConstructionDuration;
  constructionSiteType: ConstructionSiteType;
  controlPlanAssignment: ControlPlanAssignment;
}

export interface ConstructionSitePosition {
  streetName?: string;
  houseNumber?: string;
  zipCode?: string;
  cityName?: string;
  referencePoint?: string;
  otherDescription?: string;
}

export interface ConstructionDuration {
  constructionStart: number;
  constructionEnd: number;
  constructionDuration: number;
  constructionDurationType: ConstructionDurationType;
}

export enum ConstructionDurationType {
  HOURS = 'HOURS',
  DAYS = 'DAYS'
}

export interface ControlPlanAssignment {
  questionsRuleplanL: {
    noNarrowingOfDriveWay: boolean;
    smallNarrowingOfDriveWay?: boolean;
    lockingOfDriveWayAndWaitObligation?: boolean;
    lockingOfDriveWayAndVLSARule?: boolean;
    bothDriveWaysDisabledAndWorkWhileTraffic?: boolean;
    workInBranchedOffRoad?: boolean;
  };
  questionsRuleplanGRNeeded: boolean;
  questionsRuleplanGR: {
    narrowingAllowsForContinuedTraffic: boolean;
    splitting?: boolean;
    movingOfDriveWays?: boolean;
  };
  questionsMotorTrafficAffectedNeeded: boolean;
  questionsMotorTrafficAffectedState?: MotorTrafficAffectedState;

  questionsIntersectionAffectedNeeded: boolean;
  questionsIntersectionAffectedState?: IntersectionAffectedState;
}

export enum MotorTrafficAffectedState {
  LOW_AFFECTED = 'LOW_AFFECTED',
  HIGH_AFFECTED = 'HIGH_AFFECTED'
}

export enum IntersectionAffectedState {
  NO_SPECIAL_RULES = 'NO_SPECIAL_RULES',
  VLSA_RULES = 'VLSA_RULES'
}

export interface ApplicationInformation {
  applicantName: string;
  streetName: string;
  houseNumber: string;
  zipCode: string;
  cityName: string;
  countryName: string;
  email: string;
  phoneNumber: string;
}

export interface ApplicationCreator {
  applicationCreator: string;
  applicationCreatorName: string;
  applicationCreatorAddressSameAsApplicant: boolean;
  applicationCreatorAddress: {
    streetName: string;
    houseNumber: string;
    zipCode: string;
    cityName: string;
    countryName: string;
    email: string;
    phoneNumber: string
  };
}

export interface ControlPlan {
  workType: WorkType;
  workDescription: LowBuildingType | HighBuildingType | null;

  // Only if workDescription = LowBuildingType.LOW_BUILDING_OTHER or workDescription = HighBuildingType.HIGH_BUILDING_OTHER
  workDescriptionName: string;
  // Only if workType = WorkType.RENEWAL
  fileNumber: string;
  // Only if workType = WorkType.LOW_BUILDING
  lowBuildingDetailsType: LowBuildingDetailsType;
}

export interface ConstructionOfficer {
  name: string;
  email: string;
  phoneNumber: string;
}

export enum RuleplanL {
  L1, L2, L3, L4, L5, L6
}

export interface GenerateNoticeParameters {
  applicationType: ApplicationType;
  applicationInformation: ApplicationInformation;
  applicationCreator: ApplicationCreator;
  controlPlan: ControlPlan;
  sections: ConstructionSection[];
  constructionOfficer: ConstructionOfficer;
}
