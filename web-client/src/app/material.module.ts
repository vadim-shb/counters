import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdInputModule,
  MdMenuModule,
  MdSelectModule,
  MdToolbarModule,
  PlatformModule
} from "@angular/material";
import {NgModule} from "@angular/core";

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

    // ***** Possible modules [DON'T FORGET to add it to export]: *****

    // MdChipsModule,
    // MdGridListModule,
    // MdListModule,
    // MdProgressBarModule,
    // MdProgressSpinnerModule,
    // MdRippleModule,
    // MdSidenavModule,
    // MdTabsModule,
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
  ],
})
export class MaterialModule {
}
