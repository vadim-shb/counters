import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdInputModule,
  MdMenuModule,
  MdSelectModule, MdTabsModule,
  MdToolbarModule,
  PlatformModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    PlatformModule,
    MdMenuModule,
    MdSelectModule,
    MdToolbarModule,
    MdCardModule,
    MdTabsModule,

    // ***** Possible modules [DON'T FORGET to add it to export]: *****

    // MdChipsModule,
    // MdGridListModule,
    // MdListModule,
    // MdProgressBarModule,
    // MdProgressSpinnerModule,
    // MdRippleModule,
    // MdSidenavModule,
    // PortalModule,
    // ProjectionModule,
    // RtlModule,
    // ObserveContentModule,

    // // These modules include providers.

    // A11yModule,
    // MdButtonToggleModule,
    // MdDialogModule,
    // MdIconModule,
    // MdRadioModule,
    // MdSliderModule,
    // MdSlideToggleModule,
    // MdSnackBarModule,
    // MdTooltipModule,
    // OverlayModule,
    // DefaultStyleCompatibilityModeModule,
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    PlatformModule,
    MdMenuModule,
    MdSelectModule,
    MdToolbarModule,
    MdCardModule,
    MdTabsModule,
  ],
})
export class MaterialModule {
}
