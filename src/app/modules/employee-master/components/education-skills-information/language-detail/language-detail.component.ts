import { Component, OnInit, ViewEncapsulation, ViewChild, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from '../../../employee-master-services/event-emitter/event-emitter.service';
import { employeeEducationRequest, employeeSkillDetailsRequest, employeeLanguageRequest } from '../../../dto-models/educatio-skills.model';
import { ConfirmationModalComponent } from '../../../shared modals/confirmation-modal/confirmation-modal.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EducationSkillsInformationService } from '../../../employee-master-services/education-skills-information.service';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';

@Component({
  selector: 'app-language--detail',
  templateUrl: './language-detail.component.html',
  styleUrls: ['./language-detail.component.scss']
})

export class LanguageDetailComponent implements OnInit {
  LanguageInfoForm: FormGroup;
  CertificationInfoForm: FormGroup;
  date = { startDate: "", endDate: "" }
  addPush: boolean;
  public employeeLanguageRequestModel = new employeeLanguageRequest('', '', '', '', '', '');
  ReadLanguage: any;
  EmptyGridTrue: boolean;
  proficiency: any;
  tomorrow = new Date();
  languageArray: Array<any> = [];

  languageItem: any;
  skillItem: any;
  LanguageSummaryGridData: Array<any> = [];
  filteredLanguageArray: Array<any> = [];
  educationPopupSaveSubscription: Subscription;
  EducationSkillsFormInitiateSubscription: Subscription
  employeeMasterId: number;
  confirmDeleteSubscription: Subscription
  deleteEducationId: Array<any> = [];
  deleteLanguageId: Array<any> = [];
  deleteSkillId: Array<any> = [];
  validateQualification: boolean;
  validateEducationGridRow: boolean;
  validateLanguageGridRow: boolean;
  validateSkillsGridRow: boolean;
  ishigherEducationValid: boolean;
  certificationBoolean: any = 'yes';
  LanguageEditFlag: boolean = false;
  LanguageviewFlag: boolean = false;
  languageId: number;



  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService,
    public dialog: MatDialog,
    private matDialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private EducationSkillsInformationService: EducationSkillsInformationService,
    private CommonDataService: SharedInformationService) { }

  ngOnInit(): void {
    this.LanguageInfoForm = this.formBuilder.group({
      language: ['', Validators.required],
      languageRead: [''],
      languageWrite: [''],
      languageSpeak: [''],
    });

    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    this.getLanguagesList();
    this.getAllLanguageSummary();
    this.disableLanguageOptions();

    this.confirmDeleteSubscription = this.EventEmitterService.setConfirmDeleteEducationSkills().subscribe(res => {

      if (res == 'languageItemDelete') {
        this.EducationSkillsInformationService.deleteLanguageGridItem(this.languageId).subscribe(res => {
          this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
          this.getAllLanguageSummary();
        })
      }
    })
  }

  // Language information
  getLanguagesList() {

    this.EducationSkillsInformationService.getLanguagesList().subscribe(res => {
      this.languageArray = res.data.results;
      setTimeout(() => {
        this.employeeLanguageRequestModel.language = '';
      }, 100)
    })
  }

  getAllLanguageSummary() {

    this.EducationSkillsInformationService.getAllLanguageSummary(this.employeeMasterId).subscribe(res => {

      this.LanguageSummaryGridData = res.data.results[0];

      // this.validatingHigherQualification();
    })
  }

  postLanguageForm(employeeLanguageRequestModel) {

    employeeLanguageRequestModel.employeeMasterId = this.employeeMasterId

    this.EducationSkillsInformationService.postLanguageInfoForm(employeeLanguageRequestModel).subscribe(res => {

      this.getAllLanguageSummary();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.resetLanguageForm()
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })

  }

  updateLanguageForm(employeeLanguageRequestModel) {

    employeeLanguageRequestModel.employeeMasterId = this.employeeMasterId

    this.EducationSkillsInformationService.putLanguageInfoForm(employeeLanguageRequestModel).subscribe(res => {

      this.getAllLanguageSummary();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.employeeLanguageRequestModel.employeeLanguageinfoId = 0;
      this.resetLanguageForm();
      this.LanguageEditFlag = false;
      this.LanguageviewFlag = false;
      this.disableLanguageOptions();
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })

  }

  editLanguageRow(language) {

    this.LanguageEditFlag = true;
    this.LanguageviewFlag = false;
    this.employeeLanguageRequestModel.employeeLanguageinfoId = language.employeeLanguageinfoId;
    this.employeeLanguageRequestModel.language = language.language;
    this.employeeLanguageRequestModel.read = language.read;
    this.employeeLanguageRequestModel.write = language.write;
    this.employeeLanguageRequestModel.speak = language.speak;

    const temp1 = this.LanguageInfoForm.get('language');
    temp1.enable();
   this.enableLanguageOptions();
  }

  viewLanguageRow(language) {

    this.LanguageEditFlag = false;
    this.LanguageviewFlag = true;
    this.employeeLanguageRequestModel = language;

    const temp1 = this.LanguageInfoForm.get('language');
    temp1.disable();
    this.disableLanguageOptions();
  }

  deleteLanguageRow(language) {

    this.languageId = language.employeeLanguageinfoId;
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      disableClose: true,
      width: '664px', height: '241px',
      data: { pageValue: 'languageItemDelete', info: 'Do you really want to delete?' }
    });
  }

  cancelLanguageView() {
    this.LanguageEditFlag = false;
    this.LanguageviewFlag = false;
    this.resetLanguageForm();
    this.employeeLanguageRequestModel.employeeLanguageinfoId = 0;
    const temp1 = this.LanguageInfoForm.get('language');
    temp1.enable();
    this.disableLanguageOptions();
    this.getAllLanguageSummary();
  }

  filterLanguages(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.languageArray.length; i++) {
      let country = this.languageArray[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredLanguageArray = filtered;
  }

  clearLanguageInformation() {

    this.employeeLanguageRequestModel.read = '';
    this.employeeLanguageRequestModel.write = '';
    this.employeeLanguageRequestModel.speak = '';

    this.enableLanguageOptions();
  }

  resetLanguageForm() {
    this.LanguageInfoForm.reset();
    this.LanguageEditFlag = false;
    this.LanguageviewFlag = false;
    this.disableLanguageOptions();
  }


  // Certificates Information

  disableLanguageOptions() {
    const temp2 = this.LanguageInfoForm.get('languageRead');
    temp2.disable();
    const temp3 = this.LanguageInfoForm.get('languageWrite');
    temp3.disable();
    const temp4 = this.LanguageInfoForm.get('languageSpeak');
    temp4.disable();
  }

  enableLanguageOptions(){
    const temp2 = this.LanguageInfoForm.get('languageRead');
    temp2.enable();
    const temp3 = this.LanguageInfoForm.get('languageWrite');
    temp3.enable();
    const temp4 = this.LanguageInfoForm.get('languageSpeak');
    temp4.enable();
  }
}
