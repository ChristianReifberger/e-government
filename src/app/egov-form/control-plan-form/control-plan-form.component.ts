import {Component, Input} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {HighBuildingType, LowBuildingDetailsType, LowBuildingType, WorkType} from '../egov-form-const';

@Component({
  selector: 'egov-control-plan-form',
  templateUrl: './control-plan-form.component.html',
  styleUrls: ['./control-plan-form.component.scss']
})
export class ControlPlanFormComponent {

  @Input() controlPlanForm: FormGroup;

  public readonly workTypeConst = Object.keys(WorkType);
  public readonly workType: typeof WorkType = WorkType;

  public readonly lowBuildingTypeConst = Object.keys(LowBuildingType);
  public readonly lowBuildingType: typeof LowBuildingType = LowBuildingType;

  public readonly highBuildingTypeConst = Object.keys(HighBuildingType);
  public readonly highBuildingType: typeof HighBuildingType = HighBuildingType;

  public readonly lowBuildingDetailsTypeConst = Object.keys(LowBuildingDetailsType);

  public getValidatorsBasedOnDevelopmentMode() {
    return environment.production ? [] : [];
  }

}
