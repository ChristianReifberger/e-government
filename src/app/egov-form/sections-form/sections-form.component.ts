import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ConstructionSection} from '../egov-form-const';
import {MatDialog} from '@angular/material/dialog';
import {SectionsAdminDialogComponent, SectionsAdminDialogType} from './sections-admin-dialog/sections-admin-dialog.component';

@Component({
  selector: 'egov-sections-form',
  templateUrl: './sections-form.component.html',
  styleUrls: ['./sections-form.component.scss']
})
export class SectionsFormComponent {

  @Input() sectionsControl: FormControl;

  public readonly visibleSections: Set<ConstructionSection> = new Set();

  constructor(private readonly dialog: MatDialog) {
  }

  public openAddSectionDialog() {
    const addDialog = this.dialog.open(SectionsAdminDialogComponent, {
      data: {type: SectionsAdminDialogType.CREATE}
    });

    addDialog.afterClosed().subscribe(constructionSection => {
      if (constructionSection) {
        this.visibleSections.add(constructionSection);
        this.sectionsControl.setValue([constructionSection]);
      }
    });
  }

}
