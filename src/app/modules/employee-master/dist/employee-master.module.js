"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EmployeeMasterModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var NumberFormatPipe_1 = require("../../core/utility/pipes/NumberFormatPipe");
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
var sharedlayout_module_1 = require("../sharedlayout/sharedlayout.module");
var slider_1 = require("@angular/material/slider");
var employee_master_routing_module_1 = require("./employee-master-routing.module");
var transloco_loader_1 = require("./../../core/strategies/transloco.loader");
var transloco_1 = require("@ngneat/transloco");
var en_GB_1 = require("@angular/common/locales/en-GB");
var fr_1 = require("@angular/common/locales/fr");
var personal_information_component_1 = require("./components/personal-information/personal-information.component");
var confirmation_modal_component_1 = require("./shared modals/confirmation-modal/confirmation-modal.component");
var contact_information_component_1 = require("./components/contact-information/contact-information.component");
var identity_information_component_1 = require("./components/identity-information/identity-information.component");
var app_material_module_1 = require("./../../app.material.module");
var previous_employment_information_component_1 = require("./components/previous-employment-information/previous-employment-information.component");
common_1.registerLocaleData(fr_1["default"], 'fr');
common_1.registerLocaleData(en_GB_1["default"], 'en-GB');
var app_primeNG_module_1 = require("./../../app.primeNG.module");
var payroll_area_information_component_1 = require("./components/payroll-area-information/payroll-area-information.component");
var family_information_component_1 = require("./components/family-information/family-information.component");
var family_details_component_1 = require("./components/family-information/family-details/family-details.component");
var nomination_details_component_1 = require("./components/family-information/nomination-details/nomination-details.component");
var bank_details_component_1 = require("./components/family-information/bank-details/bank-details.component");
var education_skills_information_component_1 = require("./components/education-skills-information/education-skills-information.component");
var education_detail_component_1 = require("./components/education-skills-information/education-detail/education-detail.component");
var language_detail_component_1 = require("./components/education-skills-information/language-detail/language-detail.component");
var skills_detail_component_1 = require("./components/education-skills-information/skills-detail/skills-detail.component");
var certification_detail_component_1 = require("./components/education-skills-information/certification-detail/certification-detail.component");
var job_information_component_1 = require("./components/job-information/job-information.component");
var organization_detail_component_1 = require("./components/job-information/organization-detail/organization-detail.component");
var position_detail_component_1 = require("./components/job-information/position-detail/position-detail.component");
var project_detail_component_1 = require("./components/job-information/project-detail/project-detail.component");
var deputation_detail_component_1 = require("./components/job-information/deputation-detail/deputation-detail.component");
var compliance_information_component_1 = require("./components/compliance-information/compliance-information.component");
var input_compliance_information_component_1 = require("./components/compliance-information/input-compliance-information/input-compliance-information.component");
var compliance_type_information_component_1 = require("./components/compliance-information/compliance-type-information/compliance-type-information.component");
var sub_compliance_type_information_component_1 = require("./components/compliance-information/compliance-type-information/sub-compliance-type-information/sub-compliance-type-information.component");
var minimum_wages_detail_component_1 = require("./components/job-information/minimum-wages-detail/minimum-wages-detail.component");
var employment_information_component_1 = require("./components/employment-information/employment-information.component");
var joining_information_component_1 = require("./components/employment-information/joining-information/joining-information.component");
var re_joining_information_component_1 = require("./components/employment-information/re-joining-information/re-joining-information.component");
var transfer_information_component_1 = require("./components/employment-information/transfer-information/transfer-information.component");
var exit_information_component_1 = require("./components/employment-information/exit-information/exit-information.component");
var employee_summary_component_1 = require("./components/employee-summary/employee-summary.component");
var employment_summary_component_1 = require("./components/employment-information/employment-summary/employment-summary.component");
var compliance_summary_component_1 = require("./components/compliance-information/compliance-summary/compliance-summary.component");
var job_summary_component_1 = require("./components/job-information/job-summary/job-summary.component");
var landing_page_component_1 = require("./../../modules/employee-master/components/landing-page/landing-page.component");
var appBlockCopyPasteDirective_1 = require("./../../core/utility/directives/appBlockCopyPasteDirective");
var EmployeeMasterModule = /** @class */ (function () {
    function EmployeeMasterModule() {
    }
    EmployeeMasterModule = __decorate([
        core_1.NgModule({
            declarations: [
                personal_information_component_1.PersonalInformationComponent,
                confirmation_modal_component_1.ConfirmationModalComponent,
                contact_information_component_1.ContactInformationComponent,
                identity_information_component_1.IdentityInformationComponent,
                previous_employment_information_component_1.PreviousEmploymentInformationComponent,
                // BankInformationComponent,
                payroll_area_information_component_1.PayrollAreaInformationComponent,
                family_information_component_1.FamilyInformationComponent,
                family_details_component_1.FamilyDetailsComponent,
                nomination_details_component_1.NominationDetailsComponent,
                bank_details_component_1.BankDetailsComponent,
                education_skills_information_component_1.EducationSkillsInformationComponent,
                education_detail_component_1.EducationDetailComponent,
                language_detail_component_1.LanguageDetailComponent,
                skills_detail_component_1.SkillsDetailComponent,
                certification_detail_component_1.CertificationDetailComponent,
                job_information_component_1.JobInformationComponent,
                organization_detail_component_1.OrganizationDetailComponent,
                position_detail_component_1.PositionDetailComponent,
                project_detail_component_1.ProjectDetailComponent,
                deputation_detail_component_1.DeputationDetailComponent,
                compliance_information_component_1.ComplianceInformationComponent,
                input_compliance_information_component_1.InputComplianceInformationComponent,
                compliance_type_information_component_1.ComplianceTypeInformationComponent,
                sub_compliance_type_information_component_1.SubComplianceTypeInformationComponent,
                minimum_wages_detail_component_1.MinimumWagesDetailComponent,
                employment_information_component_1.EmploymentInformationComponent,
                joining_information_component_1.JoiningInformationComponent,
                re_joining_information_component_1.ReJoiningInformationComponent,
                transfer_information_component_1.TransferInformationComponent,
                exit_information_component_1.ExitInformationComponent,
                employee_summary_component_1.EmployeeSummaryComponent,
                employment_summary_component_1.EmploymentSummaryComponent,
                compliance_summary_component_1.ComplianceSummaryComponent,
                job_summary_component_1.JobSummaryComponent,
                landing_page_component_1.LandingPageComponent,
                appBlockCopyPasteDirective_1.BlockCopyPasteDirective
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
                employee_master_routing_module_1.EmployeeMasterRoutingModule,
                transloco_1.TranslocoModule,
                app_material_module_1.DemoMaterialModule,
                app_primeNG_module_1.PrimeNGModule,
            ],
            providers: [common_1.DatePipe, NumberFormatPipe_1.NumberFormatPipe,
                transloco_loader_1.translocoLoader, {
                    provide: transloco_1.TRANSLOCO_CONFIG,
                    useValue: {
                        availableLangs: [{ id: 'en', label: 'English' }, { id: 'fr', label: 'French' }, { id: 'hi', label: 'Hindi' }],
                        listenToLangChange: true,
                        reRenderOnLangChange: true,
                        defaultLang: 'en',
                        fallbackLang: 'fr',
                        prodMode: false
                    }
                }
            ],
            entryComponents: [confirmation_modal_component_1.ConfirmationModalComponent]
        })
    ], EmployeeMasterModule);
    return EmployeeMasterModule;
}());
exports.EmployeeMasterModule = EmployeeMasterModule;
