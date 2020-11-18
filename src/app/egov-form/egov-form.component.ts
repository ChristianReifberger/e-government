import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
  ApplicationCreator,
  ApplicationInformation,
  ApplicationType, ConstructionOfficer,
  ConstructionSection,
  ControlPlan,
  GenerateNoticeParameters
} from './egov-form-const';
import {environment} from '../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {GenerateNoticeService} from '../services/generate-notice.service';

const DEFAULT_MUST_ENTER_APPLICATION_CREATOR_ADDRESS_VALUE = true;

@Component({
  selector: 'egov-form',
  templateUrl: './egov-form.component.html',
  styleUrls: ['./egov-form.component.scss']
})
export class EgovFormComponent {

  public get applicantNamePlaceholder(): string {
    const selectedApplicationType = this.applicantControl?.value;
    if (selectedApplicationType === ApplicationType.NATURAL_PERSON) {
      return this.translate.instant('EGOVFormComponent.ApplicantNamePlaceholder.Name');
    } else {
      return this.translate.instant('EGOVFormComponent.ApplicantNamePlaceholder.Description');
    }
  }

  constructor(private readonly formBuilder: FormBuilder,
              private readonly translate: TranslateService,
              private readonly generateNoticeService: GenerateNoticeService) {
    this.applicantControl = new FormControl(null, this.getValidatorsBasedOnDevelopmentMode());

    this.applicationInformationForm = this.formBuilder.group({
      applicantName: new FormControl(null, this.getValidatorsBasedOnDevelopmentMode()),
      streetName: new FormControl(null, this.getValidatorsBasedOnDevelopmentMode()),
      houseNumber: new FormControl(null, this.getValidatorsBasedOnDevelopmentMode()),
      zipCode: new FormControl(null, this.getValidatorsBasedOnDevelopmentMode()),
      cityName: new FormControl(null, this.getValidatorsBasedOnDevelopmentMode()),
      countryName: new FormControl(null, this.getValidatorsBasedOnDevelopmentMode()),
      email: new FormControl(null, this.getValidatorsBasedOnDevelopmentMode()),
      phoneNumber: new FormControl(null, this.getValidatorsBasedOnDevelopmentMode())
    });

    this.applicationCreatorForm = this.formBuilder.group({
      applicationCreator: new FormControl(null, this.getValidatorsBasedOnDevelopmentMode()),
      applicationCreatorName: new FormControl(null, this.getValidatorsBasedOnDevelopmentMode()),
      applicationCreatorAddressSameAsApplicant:
        new FormControl(DEFAULT_MUST_ENTER_APPLICATION_CREATOR_ADDRESS_VALUE, this.getValidatorsBasedOnDevelopmentMode()),
      applicationCreatorAddress: this.formBuilder.group({
        streetName: new FormControl(null, this.getValidatorsBasedOnDevelopmentMode()),
        houseNumber: new FormControl(null, this.getValidatorsBasedOnDevelopmentMode()),
        zipCode: new FormControl(null, this.getValidatorsBasedOnDevelopmentMode()),
        cityName: new FormControl(null, this.getValidatorsBasedOnDevelopmentMode()),
        countryName: new FormControl(null, this.getValidatorsBasedOnDevelopmentMode()),
        email: new FormControl(null, this.getValidatorsBasedOnDevelopmentMode()),
        phoneNumber: new FormControl(null, this.getValidatorsBasedOnDevelopmentMode())
      })
    });

    const workTypeControl = new FormControl(null, this.getValidatorsBasedOnDevelopmentMode());
    const workDescriptionControl = new FormControl(null, this.getValidatorsBasedOnDevelopmentMode());
    const workDescriptionNameControl = new FormControl(null, this.getValidatorsBasedOnDevelopmentMode());
    const fileNumberControl = new FormControl(null, this.getValidatorsBasedOnDevelopmentMode());
    const lowBuildingDetailsTypeControl = new FormControl(null, this.getValidatorsBasedOnDevelopmentMode());
    this.controlPlanForm = this.formBuilder.group({
      workType: workTypeControl,
      workDescription: workDescriptionControl,

      // Only if workDescription = LowBuildingType.LOW_BUILDING_OTHER or workDescription = HighBuildingType.HIGH_BUILDING_OTHER
      workDescriptionName: workDescriptionNameControl,
      // Only if workType = WorkType.RENEWAL
      fileNumber: fileNumberControl,
      // Only if workType = WorkType.LOW_BUILDING
      lowBuildingDetailsType: lowBuildingDetailsTypeControl
    });

    workTypeControl.valueChanges.subscribe(() => {
      workDescriptionControl.reset();
      workDescriptionNameControl.reset();
      fileNumberControl.reset();
      lowBuildingDetailsTypeControl.reset();
    });

    this.sectionsControl = new FormControl([]);

    this.constructionOfficerForm = this.formBuilder.group({
      name: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl()
    });
  }

  public readonly applicantControl: FormControl;
  public readonly applicationInformationForm: FormGroup;
  public readonly applicationCreatorForm: FormGroup;
  public readonly controlPlanForm: FormGroup;
  public readonly sectionsControl: FormControl;
  public readonly constructionOfficerForm: FormGroup;

  public readonly applicationTypeConst = Object.keys(ApplicationType);

  public getValidatorsBasedOnDevelopmentMode() {
    return environment.production ? [] : [];
  }

  public generateNotice() {
    this.generateNoticeService.generateNotice({
      applicationType: this.applicantControl.value,
      applicationInformation: this.applicationInformationForm.value,
      applicationCreator: this.applicationCreatorForm.value,
      controlPlan: this.controlPlanForm.value,
      sections: this.sectionsControl.value,
      constructionOfficer: this.constructionOfficerForm.value
    });
  }

}
