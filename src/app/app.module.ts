import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {EgovFormComponent} from './egov-form/egov-form.component';
import {MatStepperModule} from '@angular/material/stepper';
import {ApplicationInformationFormComponent} from './egov-form/application-information-form/application-information-form.component';
import {ApplicationCreatorFormComponent} from './egov-form/application-creator-form/application-creator-form.component';
import {ControlPlanFormComponent} from './egov-form/control-plan-form/control-plan-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    EgovFormComponent,
    ApplicationInformationFormComponent,
    ApplicationCreatorFormComponent,
    ControlPlanFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatStepperModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
