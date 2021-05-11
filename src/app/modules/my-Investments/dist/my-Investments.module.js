"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MyInvestmentsModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var accordion_1 = require("ngx-bootstrap/accordion");
var alert_1 = require("ngx-bootstrap/alert");
var carousel_1 = require("ngx-bootstrap/carousel");
var collapse_1 = require("ngx-bootstrap/collapse");
var datepicker_1 = require("ngx-bootstrap/datepicker");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var modal_1 = require("ngx-bootstrap/modal");
var popover_1 = require("ngx-bootstrap/popover");
var progressbar_1 = require("ngx-bootstrap/progressbar");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var ngx_toastr_1 = require("ngx-toastr");
var NumberFormatPipe_1 = require("../../core/utility/pipes/NumberFormatPipe");
var sharedlayout_module_1 = require("../sharedlayout/sharedlayout.module");
var slider_1 = require("@angular/material/slider");
var housingloan_component_1 = require("./housingloan/housingloan.component");
var housingloandeclaration_component_1 = require("./housingloan/housingloandeclaration/housingloandeclaration.component");
var housingloanmaster_component_1 = require("./housingloan/housingloanmaster/housingloanmaster.component");
var housingloansummary_component_1 = require("./housingloan/housingloansummary/housingloansummary.component");
var my_Investments_routing_module_1 = require("./my-Investments-routing.module");
var my_investments_component_1 = require("./my-investments.component");
var app_primeNG_module_1 = require("../../app.primeNG.module");
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
var inputnumber_1 = require("primeng/inputnumber");
var housingrent_component_1 = require("./housingrent/housingrent.component");
var houserentdeclaration_component_1 = require("./housingrent/houserentdeclaration/houserentdeclaration.component");
var houserentmaster_component_1 = require("./housingrent/houserentmaster/houserentmaster.component");
var houserentsummary_component_1 = require("./housingrent/houserentsummary/houserentsummary.component");
var previousemployer_component_1 = require("./previousemployer/previousemployer.component");
var previousemployersummary_component_1 = require("./previousemployer/previousemployersummary/previousemployersummary.component");
var previousemployermaster_component_1 = require("./previousemployer/previousemployermaster/previousemployermaster.component");
var national_saving_certificate_nsc_component_1 = require("./Other/national-saving-certificate-nsc/national-saving-certificate-nsc.component");
var house_property_component_1 = require("./Other/house-property/house-property.component");
var principal_repayment_on_housing_loan_component_1 = require("./Other/principal-repayment-on-housing-loan/principal-repayment-on-housing-loan.component");
var tax_adjustments_component_1 = require("./Other/tax-adjustments/tax-adjustments.component");
var tax_adjustments_amount_component_1 = require("./Other/tax-adjustments/tax-adjustments-amount/tax-adjustments-amount.component");
var tax_adjustments_summary_component_1 = require("./Other/tax-adjustments/tax-adjustments-summary/tax-adjustments-summary.component");
var childhostelallowance_component_1 = require("./Other/Child Hostel Allowance(CHA)/childhostelallowance/childhostelallowance.component");
var childeducationallowance_component_1 = require("./Other/Child Education Allowance/childeducationallowance/childeducationallowance.component");
var cha_component_1 = require("./Other/Child Hostel Allowance(CHA)/childhostelallowance/cha/cha.component");
var cea_component_1 = require("./Other/Child Education Allowance/cea/cea.component");
var ceamaster_component_1 = require("./Other/Child Education Allowance/ceamaster/ceamaster.component");
var chamaster_component_1 = require("./Other/Child Hostel Allowance(CHA)/childhostelallowance/chamaster/chamaster.component");
var chapter_vi_a_summary_component_1 = require("./VI-A/chapter-vi-a-summary/chapter-vi-a-summary.component");
// import { OtherincomeSummaryComponent } from './Other/Other Income/otherincome-summary/otherincome-summary.component';
var otherincomesummary_component_1 = require("./Other/Other Income/otherincome_summary/otherincomesummary/otherincomesummary.component");
var otherincomedeclaration_component_1 = require("./Other/Other Income/otherincome_declaration&actual/otherincomedeclaration/otherincomedeclaration.component");
var otherincome_component_1 = require("./Other/Other Income/otherincome/otherincome.component");
var employee_nps80_ccd_component_1 = require("./Other/EmployeeNationalPensionScheme80CCD/employee-nps80-ccd/employee-nps80-ccd.component");
var angular2_signaturepad_1 = require("angular2-signaturepad");
var signature_pad_component_1 = require("./previousemployer/signature-pad/signature-pad.component");
var scrollpanel_1 = require("primeng/scrollpanel");
var MyInvestmentsModule = /** @class */ (function () {
    function MyInvestmentsModule() {
    }
    MyInvestmentsModule = __decorate([
        core_1.NgModule({
            declarations: [
                my_investments_component_1.MyInvestmentsComponent,
                housingloan_component_1.HousingloanComponent,
                signature_pad_component_1.SignaturePadComponent,
                housingloanmaster_component_1.HousingloanmasterComponent,
                housingloansummary_component_1.HousingloansummaryComponent,
                housingloandeclaration_component_1.HousingloandeclarationComponent,
                housingrent_component_1.HousingrentComponent,
                houserentdeclaration_component_1.HouserentdeclarationComponent,
                houserentmaster_component_1.HouserentmasterComponent,
                houserentsummary_component_1.HouserentsummaryComponent,
                previousemployer_component_1.PreviousemployerComponent,
                previousemployersummary_component_1.PreviousemployersummaryComponent,
                previousemployermaster_component_1.PreviousemployermasterComponent,
                national_saving_certificate_nsc_component_1.NationalSavingCertificateNSCComponent,
                house_property_component_1.HousePropertyComponent,
                principal_repayment_on_housing_loan_component_1.PrincipalRepaymentOnHousingLoanComponent,
                tax_adjustments_component_1.TaxAdjustmentsComponent,
                tax_adjustments_amount_component_1.TaxAdjustmentsAmountComponent,
                tax_adjustments_summary_component_1.TaxAdjustmentsSummaryComponent,
                childhostelallowance_component_1.ChildhostelallowanceComponent,
                cha_component_1.ChaComponent,
                childeducationallowance_component_1.ChildeducationallowanceComponent,
                cea_component_1.CeaComponent,
                ceamaster_component_1.CeamasterComponent,
                chamaster_component_1.ChamasterComponent,
                chapter_vi_a_summary_component_1.ChapterVIASummaryComponent,
                principal_repayment_on_housing_loan_component_1.PrincipalRepaymentOnHousingLoanComponent,
                // OtherincomeSummaryComponent,
                otherincomesummary_component_1.OtherincomesummaryComponent,
                otherincomedeclaration_component_1.OtherincomedeclarationComponent,
                otherincome_component_1.OtherincomeComponent,
                employee_nps80_ccd_component_1.EmployeeNPS80CCDComponent,
            ],
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                slider_1.MatSliderModule,
                tooltip_1.TooltipModule.forRoot(),
                datepicker_1.BsDatepickerModule.forRoot(),
                collapse_1.CollapseModule.forRoot(),
                accordion_1.AccordionModule.forRoot(),
                tooltip_1.TooltipModule.forRoot(),
                popover_1.PopoverModule.forRoot(),
                alert_1.AlertModule.forRoot(),
                dropdown_1.BsDropdownModule.forRoot(),
                modal_1.ModalModule.forRoot(),
                progressbar_1.ProgressbarModule.forRoot(),
                carousel_1.CarouselModule.forRoot(),
                datepicker_1.BsDatepickerModule.forRoot(),
                carousel_1.CarouselModule.forRoot(),
                ngx_toastr_1.ToastrModule.forRoot({
                    positionClass: 'toast-top-center'
                }),
                sharedlayout_module_1.SharedlayoutModule,
                my_Investments_routing_module_1.MyInvestmentsRoutingModule,
                app_primeNG_module_1.PrimeNGModule,
                // BrowserModule,
                // BrowserAnimationsModule,
                inputnumber_1.InputNumberModule,
                forms_1.FormsModule,
                angular2_signaturepad_1.SignaturePadModule,
                scrollpanel_1.ScrollPanelModule,
            ],
            providers: [common_1.DatePipe, NumberFormatPipe_1.NumberFormatPipe]
        })
    ], MyInvestmentsModule);
    return MyInvestmentsModule;
}());
exports.MyInvestmentsModule = MyInvestmentsModule;
