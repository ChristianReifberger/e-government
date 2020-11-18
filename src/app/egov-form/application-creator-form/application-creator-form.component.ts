import {Component, Input} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {ApplicationCreatorType, ApplicationType} from '../egov-form-const';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'egov-application-creator-form',
  templateUrl: './application-creator-form.component.html',
  styleUrls: ['./application-creator-form.component.scss']
})
export class ApplicationCreatorFormComponent {

  @Input() applicationCreatorForm: FormGroup;

  @Input() applicationType: ApplicationType;

  public get filteredApplicationCreatorType(): string[] {
    if (this.applicationType === ApplicationType.NATURAL_PERSON || this.applicationType === ApplicationType.PERSON_CORPORATION) {
      return Object.keys(ApplicationCreatorType);
    } else {
      return Object.keys(ApplicationCreatorType).filter(type => type !== ApplicationCreatorType.SELF);
    }
  }

  public getValidatorsBasedOnDevelopmentMode() {
    return environment.production ? [] : [];
  }

}
