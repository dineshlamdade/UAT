import { Component, OnInit, ViewEncapsulation, ViewChild, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from '../../../employee-master-services/event-emitter/event-emitter.service';
import { employeeLanguageRequest } from '../educatio-skills.model';
import { Subscription } from 'rxjs';
import { EducationSkillsInformationService } from '../education-skills-information.service';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-language--detail',
  templateUrl: './language-detail.component.html',
  styleUrls: ['./language-detail.component.scss']
})

export class LanguageDetailComponent implements OnInit {
  LanguageInfoForm: FormGroup;
  modalRef: BsModalRef;
  // CertificationInfoForm: FormGroup;
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
  confirmationMsg: string;



  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService,
    private EducationSkillsInformationService: EducationSkillsInformationService,
    private CommonDataService: SharedInformationService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.LanguageInfoForm = this.formBuilder.group({
      language: ['', Validators.required],
      languageRead: [''],
      languageWrite: [''],
      languageSpeak: [''],
    });

     
    console.log('employee Master Id as adEmp',JSON.parse(localStorage.getItem("adEmp")).employeeMasterId);

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
    }, (error: any) => {
      
      this.LanguageSummaryGridData.find(res => {

        const index = this.LanguageSummaryGridData.findIndex(x => res.employeeLanguageinfoId == this.languageId);
        if (res.employeeLanguageinfoId == this.languageId) {
          this.LanguageSummaryGridData.splice(index, 1);
        }
      })
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
    window.scrollTo(0, 0);
    this.LanguageEditFlag = true;
    this.LanguageviewFlag = false;
    this.employeeLanguageRequestModel.employeeLanguageinfoId = language.employeeLanguageinfoId;
    this.employeeLanguageRequestModel.language = language.language;
    this.employeeLanguageRequestModel.read = language.read;
    this.employeeLanguageRequestModel.write = language.write;
    this.employeeLanguageRequestModel.speak = language.speak;

    const temp1 = this.LanguageInfoForm.get('language');
    temp1.enable();
    temp1.setValue(language.language);
    this.enableLanguageOptions();
  }

  viewLanguageRow(language) {

    this.LanguageEditFlag = false;
    this.LanguageviewFlag = true;
    this.employeeLanguageRequestModel.language = language.language;
    this.employeeLanguageRequestModel.read = language.read;
    this.employeeLanguageRequestModel.write = language.write;
    this.employeeLanguageRequestModel.speak = language.speak;
    this.employeeLanguageRequestModel.employeeLanguageinfoId = language.employeeLanguageinfoId;
    const temp1 = this.LanguageInfoForm.get('language');
    temp1.disable();
    this.disableLanguageOptions();
  }

  deleteLanguageRow(language, confirmation) {

    this.languageId = language.employeeLanguageinfoId;
    this.confirmationMsg = 'Do you really want to delete?';
    this.modalRef = this.modalService.show(
      confirmation,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  deleteRecord() {

    this.EducationSkillsInformationService.deleteLanguageGridItem(this.languageId).subscribe(res => {
      this.getAllLanguageSummary();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.modalRef.hide();
      this.resetLanguageForm();
    })
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
    this.employeeLanguageRequestModel.employeeLanguageinfoId = 0;
    this.employeeLanguageRequestModel.language = '';
    this.LanguageInfoForm.get('language').setValue('');
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

  enableLanguageOptions() {
    const temp2 = this.LanguageInfoForm.get('languageRead');
    temp2.enable();
    const temp3 = this.LanguageInfoForm.get('languageWrite');
    temp3.enable();
    const temp4 = this.LanguageInfoForm.get('languageSpeak');
    temp4.enable();
  }

  validateGridLanguage() {
    if (this.LanguageSummaryGridData.length > 0) {
      this.LanguageSummaryGridData.forEach(res => {

        if (res.language == this.employeeLanguageRequestModel.language) {
          // this.validateLanguageGridRow = true;
          // this.notifyService.showError('This Record is already exist in Grid Summary', "Attention..!!");
          this.CommonDataService.sweetalertError('This Record is already exist in Grid Summary');
          this.disableLanguageOptions()
          this.employeeLanguageRequestModel.language = '';
          this.LanguageInfoForm.get('language').setValue('');
          return;
        } else {
          this.enableLanguageOptions();
        }
      })
    }
  }
  afterChangeReadValue(){
    // check that which radio button is selected 
    if(this.LanguageInfoForm.get('languageRead').value.length>0){
      this.LanguageInfoForm.get('languageRead').setValue('');
    }
    else{}  
  }
  afterChangeWriteValue(){
    // check that which radio button is selected 
    if(this.LanguageInfoForm.get('languageWrite').value.length>0){
      this.LanguageInfoForm.get('languageWrite').setValue('');
    }
    else{}  
  }
  afterChangeSpeakValue(){
    // check that which radio button is selected 
    if(this.LanguageInfoForm.get('languageSpeak').value.length>0){
      this.LanguageInfoForm.get('languageSpeak').setValue('');
    }
    else{}  
  }
}
