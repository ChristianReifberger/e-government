import {Injectable} from '@angular/core';
import {
  ConstructionSection,
  ConstructionSiteType,
  ControlPlan,
  GenerateNoticeParameters,
  RuleplanL,
  WorkType
} from '../egov-form/egov-form-const';
import {TranslateService} from '@ngx-translate/core';

declare var PizZip;
declare var PizZipUtils;
declare var saveAs;

declare global {
  interface Window {
    docxtemplater: any;
  }
}

const calculateRuleplanL = (constructionSection: ConstructionSection) => {
  const questions = constructionSection?.controlPlanAssignment?.questionsRuleplanL;
  if (questions?.noNarrowingOfDriveWay) {
    return RuleplanL.L1;
  } else if (questions?.smallNarrowingOfDriveWay) {
    return RuleplanL.L2;
  } else if (questions?.lockingOfDriveWayAndWaitObligation) {
    return RuleplanL.L3;
  } else if (questions?.lockingOfDriveWayAndVLSARule) {
    return RuleplanL.L4;
  } else if (questions?.bothDriveWaysDisabledAndWorkWhileTraffic) {
    return RuleplanL.L5;
  } else if (questions?.workInBranchedOffRoad) {
    return RuleplanL.L6;
  }
};

const calculateLFRuleplan = (ruleplanL: RuleplanL) => {
  if (ruleplanL === RuleplanL.L1) {
    return 'LF1';
  } else if (ruleplanL === RuleplanL.L2) {
    return 'LF2';
  } else if (ruleplanL === RuleplanL.L3) {
    return 'LF3';
  } else if (ruleplanL === RuleplanL.L4) {
    return 'LF4';
  } else if (ruleplanL === RuleplanL.L5) {
    return 'LF5';
  } else if (ruleplanL === RuleplanL.L6) {
    return 'LF6';
  }
};

const calculateLORuleplan = (ruleplanL: RuleplanL) => {
  if (ruleplanL === RuleplanL.L1) {
    return 'LO1';
  } else if (ruleplanL === RuleplanL.L2) {
    return 'LO2';
  } else if (ruleplanL === RuleplanL.L3) {
    return 'LO3';
  } else if (ruleplanL === RuleplanL.L4) {
    return 'LO4';
  } else if (ruleplanL === RuleplanL.L5) {
    return 'LO5';
  } else if (ruleplanL === RuleplanL.L6) {
    return 'LO6';
  }
};


@Injectable()
export class GenerateNoticeService {

  constructor(private readonly translate: TranslateService) {
  }

  public generateNotice(parameters: GenerateNoticeParameters) {
    PizZipUtils.getBinaryContent('https://christianreifberger.github.io/e-government/assets/notice/Bescheid.docx', (error, content) => {
      if (error) {
        throw error;
      }

      const zip = new PizZip(content);
      let doc;
      try {
        doc = new window.docxtemplater(zip);
      } catch (err) {
        this.handleError(err);
      }
      console.warn(parameters);
      const ruleplanL = calculateRuleplanL(parameters?.sections[0]);

      doc.setData({
        currentDate: new Date(Date.now()).toLocaleDateString('de-DE'),

        applicantName: parameters?.applicationInformation.applicantName,
        applicantStreetName: parameters?.applicationInformation.streetName,
        applicantHouseNumber: parameters?.applicationInformation.houseNumber,
        applicantZipCode: parameters?.applicationInformation.zipCode,
        applicantCityName: parameters?.applicationInformation.cityName,

        applicationCreator: this.translate.instant('TypeConst.GenerateApplicationCreatorType.' +
          parameters?.applicationCreator.applicationCreator),
        applicationCreatorName: parameters?.applicationCreator.applicationCreatorName,

        constructionBegin: parameters?.sections[0]?.constructionDuration?.constructionStart,
        constructionEnd: parameters?.sections[0]?.constructionDuration?.constructionEnd,
        streetName: parameters?.sections[0]?.constructionSitePosition?.streetName,
        referencePoint: parameters?.sections[0]?.constructionSitePosition?.referencePoint,
        reason: this.translateReason(parameters?.controlPlan),
        constructionOfficerName: parameters?.constructionOfficer.name,
        constructionOfficerPhoneNumber: parameters?.constructionOfficer.phoneNumber,
        constructionOfficerMail: parameters?.constructionOfficer.email,

        driveWayCount: ruleplanL === RuleplanL.L3 || ruleplanL === RuleplanL.L4 ? 'einem' : 'zwei',
        ruleplanL: parameters?.sections[0]?.constructionSiteType === ConstructionSiteType.CITY_AREA ?
          calculateLORuleplan(ruleplanL) : calculateLFRuleplan(ruleplanL)
      });
      try {
        doc.render();
      } catch (err) {
        this.handleError(err);
      }

      const out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      saveAs(out, 'output.docx');
    });
  }

  private translateReason(controlPlan: ControlPlan): string {
    const workType = controlPlan.workType;
    if (workType === WorkType.LOW_BUILDING) {
      return this.translate.instant('TypeConst.LowBuildingType.' + controlPlan.workDescription);
    } else if (workType === WorkType.HIGH_BUILDING) {
      return this.translate.instant('TypeConst.HighBuildingType.' + controlPlan.workDescription);
    }
  }

  private handleError(error) {
    function replaceErrors(key, value) {
      if (value instanceof Error) {
        return Object.getOwnPropertyNames(value).reduce((e, k) => {
          e[k] = value[k];
          return e;
        }, {});
      }
      return value;
    }

    console.log(JSON.stringify({error}, replaceErrors));

    if (error.properties && error.properties.errors instanceof Array) {
      const errorMessages = error.properties.errors.map(e => {
        return e.properties.explanation;
      }).join('\n');
      console.log('errorMessages', errorMessages);
      // errorMessages is a humanly readable message looking like this :
      // 'The tag beginning with "foobar" is unopened'
    }
    throw error;
  }


}
