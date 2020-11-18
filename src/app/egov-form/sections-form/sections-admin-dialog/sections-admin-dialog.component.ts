import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConstructionDurationType, ConstructionSection, ConstructionSiteType} from '../../egov-form-const';

export enum SectionsAdminDialogType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE'
}

export interface SectionsAdminDialogParameters {
  type: SectionsAdminDialogType;

  // Only exists if type = SectionsAdminDialogType.UPDATE
  existingConstructionSection?: ConstructionSection;
}

@Component({
  selector: 'egov-sections-admin-dialog',
  templateUrl: './sections-admin-dialog.component.html',
  styleUrls: ['./sections-admin-dialog.component.scss']
})
export class SectionsAdminDialogComponent {

  public readonly dialogType: SectionsAdminDialogType;

  public readonly constructionSectionForm: FormGroup;

  public readonly constructionSiteTypeConst = Object.keys(ConstructionSiteType);
  public readonly constructionDurationTypeConst = Object.keys(ConstructionDurationType);

  public showSmallNarrowingOfDriveWay = false;
  public showLockingOfDriveWayAndWaitObligation = false;
  public showLockingOfDriveWayAndVLSARule = false;
  public showBothDriveWaysDisabledAndWorkWhileTraffic = false;
  public showWorkInBranchedOffRoad = false;

  public showNarrowingAllowsForContinuedTraffic = false;
  public showSplitting = false;
  public showMovingOfDriveWays = false;

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data: SectionsAdminDialogParameters,
              private readonly formBuilder: FormBuilder,
              private readonly dialogRef: MatDialogRef<SectionsAdminDialogComponent>) {
    this.dialogType = data.type;

    this.constructionSectionForm = this.formBuilder.group({
      constructionSitePosition: this.formBuilder.group({
        streetName: new FormControl(),
        houseNumber: new FormControl(),
        zipCode: new FormControl(),
        cityName: new FormControl(),
        referencePoint: new FormControl(),
        otherDescription: new FormControl()
      }),
      constructionDuration: this.formBuilder.group({
        constructionStart: new FormControl(null, Validators.required),
        constructionEnd: new FormControl(null, Validators.required),
        constructionDuration: new FormControl(null, Validators.required),
        constructionDurationType: new FormControl(null, Validators.required)
      }),
      constructionSiteType: new FormControl(null, Validators.required),
      controlPlanAssignment: this.formBuilder.group({
        questionsRuleplanL: this.createQuestionsRuleplanLForm(),

        questionsRuleplanGRNeeded: new FormControl(),
        questionsRuleplanGR: this.createQuestionsRuleplanGRForm(),

        questionsMotorTrafficAffectedNeeded: new FormControl(),
        questionsMotorTrafficAffectedState: new FormControl(),

        questionsIntersectionAffectedNeeded: new FormControl(),
        questionsIntersectionAffectedState: new FormControl(),
      })
    });

    if (this.dialogType === SectionsAdminDialogType.UPDATE) {
      this.constructionSectionForm.setValue(data.existingConstructionSection);
    }
  }

  public onSave() {
    this.dialogRef.close(this.constructionSectionForm.value);
  }

  private createQuestionsRuleplanGRForm() {
    const narrowingAllowsForContinuedTrafficControl = new FormControl();
    const splittingControl = new FormControl();
    const movingOfDriveWaysControl = new FormControl();

    narrowingAllowsForContinuedTrafficControl.valueChanges.subscribe(selected => {
      if (!selected) {
        this.showSplitting = true;
      } else {
        this.showSplitting = false;
        this.showMovingOfDriveWays = false;
        splittingControl.reset(null, {emitEvent: false});
        movingOfDriveWaysControl.reset(null, {emitEvent: false});
      }
    });

    splittingControl.valueChanges.subscribe(selected => {
      if (!selected) {
        this.showMovingOfDriveWays = true;
      } else {
        this.showMovingOfDriveWays = false;
        movingOfDriveWaysControl.reset(null, {emitEvent: false});
      }
    });

    return this.formBuilder.group({
      narrowingAllowsForContinuedTraffic: narrowingAllowsForContinuedTrafficControl,
      splitting: splittingControl,
      movingOfDriveWays: movingOfDriveWaysControl
    });
  }

  private createQuestionsRuleplanLForm() {
    const noNarrowingOfDriveWayControl = new FormControl();
    const smallNarrowingOfDriveWayControl = new FormControl();
    const lockingOfDriveWayAndWaitObligationControl = new FormControl();
    const lockingOfDriveWayAndVLSARuleControl = new FormControl();
    const bothDriveWaysDisabledAndWorkWhileTrafficControl = new FormControl();
    const workInBranchedOffRoadControl = new FormControl();

    noNarrowingOfDriveWayControl.valueChanges.subscribe(selected => {
      if (!selected) {
        this.showSmallNarrowingOfDriveWay = true;
      } else {
        this.showSmallNarrowingOfDriveWay = false;
        this.showLockingOfDriveWayAndWaitObligation = false;
        this.showLockingOfDriveWayAndVLSARule = false;
        this.showBothDriveWaysDisabledAndWorkWhileTraffic = false;
        this.showWorkInBranchedOffRoad = false;
        smallNarrowingOfDriveWayControl.reset(null, {emitEvent: false});
        lockingOfDriveWayAndWaitObligationControl.reset(null, {emitEvent: false});
        lockingOfDriveWayAndVLSARuleControl.reset(null, {emitEvent: false});
        bothDriveWaysDisabledAndWorkWhileTrafficControl.reset(null, {emitEvent: false});
        workInBranchedOffRoadControl.reset(null, {emitEvent: false});
      }
    });

    smallNarrowingOfDriveWayControl.valueChanges.subscribe(selected => {
      if (!selected) {
        this.showLockingOfDriveWayAndWaitObligation = true;
      } else {
        this.showLockingOfDriveWayAndWaitObligation = false;
        this.showLockingOfDriveWayAndVLSARule = false;
        this.showBothDriveWaysDisabledAndWorkWhileTraffic = false;
        this.showWorkInBranchedOffRoad = false;
        lockingOfDriveWayAndWaitObligationControl.reset(null, {emitEvent: false});
        lockingOfDriveWayAndVLSARuleControl.reset(null, {emitEvent: false});
        bothDriveWaysDisabledAndWorkWhileTrafficControl.reset(null, {emitEvent: false});
        workInBranchedOffRoadControl.reset(null, {emitEvent: false});
      }
    });

    lockingOfDriveWayAndWaitObligationControl.valueChanges.subscribe(selected => {
      if (!selected) {
        this.showLockingOfDriveWayAndVLSARule = true;
      } else {
        this.showLockingOfDriveWayAndVLSARule = false;
        this.showBothDriveWaysDisabledAndWorkWhileTraffic = false;
        this.showWorkInBranchedOffRoad = false;
        lockingOfDriveWayAndVLSARuleControl.reset(null, {emitEvent: false});
        bothDriveWaysDisabledAndWorkWhileTrafficControl.reset(null, {emitEvent: false});
        workInBranchedOffRoadControl.reset(null, {emitEvent: false});
      }
    });

    lockingOfDriveWayAndVLSARuleControl.valueChanges.subscribe(selected => {
      if (!selected) {
        this.showBothDriveWaysDisabledAndWorkWhileTraffic = true;
      } else {
        this.showBothDriveWaysDisabledAndWorkWhileTraffic = false;
        this.showWorkInBranchedOffRoad = false;
        bothDriveWaysDisabledAndWorkWhileTrafficControl.reset(null, {emitEvent: false});
        workInBranchedOffRoadControl.reset(null, {emitEvent: false});
      }
    });

    bothDriveWaysDisabledAndWorkWhileTrafficControl.valueChanges.subscribe(selected => {
      if (!selected) {
        this.showWorkInBranchedOffRoad = true;
      } else {
        this.showWorkInBranchedOffRoad = false;
        workInBranchedOffRoadControl.reset(null, {emitEvent: false});
      }
    });

    return this.formBuilder.group({
      noNarrowingOfDriveWay: noNarrowingOfDriveWayControl,
      smallNarrowingOfDriveWay: smallNarrowingOfDriveWayControl,
      lockingOfDriveWayAndWaitObligation: lockingOfDriveWayAndWaitObligationControl,
      lockingOfDriveWayAndVLSARule: lockingOfDriveWayAndVLSARuleControl,
      bothDriveWaysDisabledAndWorkWhileTraffic: bothDriveWaysDisabledAndWorkWhileTrafficControl,
      workInBranchedOffRoad: workInBranchedOffRoadControl
    });
  }

}
