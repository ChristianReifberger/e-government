import {Component, Input} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'egov-application-information-form',
  templateUrl: './application-information-form.component.html',
  styleUrls: ['./application-information-form.component.scss']
})
export class ApplicationInformationFormComponent {

  @Input() applicationInformationForm: FormGroup;

  @Input() applicantNamePlaceholder: string;

  public getValidatorsBasedOnDevelopmentMode() {
    return environment.production ? [] : [];
  }

}
