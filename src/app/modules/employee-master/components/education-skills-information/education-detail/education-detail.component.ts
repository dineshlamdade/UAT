import { Component, OnInit, ViewEncapsulation, ViewChild, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from '../../../employee-master-services/event-emitter/event-emitter.service';
import { employeeEducationRequest, employeeSkillDetailsRequest, employeeLanguageRequest } from './../educatio-skills.model';
import { Subscription } from 'rxjs';
import { EducationSkillsInformationService } from './../education-skills-information.service';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { exists } from 'fs';


@Component({
  selector: 'app-education-detail',
  templateUrl: './education-detail.component.html',
  styleUrls: ['./education-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EducationDetailComponent implements OnInit {
  EducationInfoForm: FormGroup;
  SkillInfoForm: FormGroup;
  modalRef: BsModalRef;
  date = { startDate: "", endDate: "" }
  addPush: boolean;
  public employeeEducationRequestModel = new employeeEducationRequest('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '')
  public employeeSkillDetailsRequestModel = new employeeSkillDetailsRequest('', '', '', '', '')
  EmptyGridTrue: boolean;
  proficiency: any;
  tomorrow = new Date();
  educationList: Array<any> = [];
  SkillSetList: Array<any> = [];
  filteredSkillSetList: Array<any> = [];
  standardDurationList = 'Days,Weeks,Months,Years'.split(',');
  highestEducationList = 'Doctorate,Post Graduate,Graduate,Technical(Professional),Higher Secondary,Senior Secondary,Non Matric,Illiterate'.split(',');
  filteredHighestEducationList = 'Illiterate,Non Matric,Senior Secondary,Higher Secondary,Graduate,Post Graduate,Doctorate,Technical(Professional)'.split(',');
  courseTypeList = 'Full-Time, Part-Time, Correspondence'.split(',');
  filteredcourseTypeList = 'Full-Time, Part-Time, Correspondence'.split(',');
  EducationSummaryGridData: Array<any> = [];
  EducationSummaryData: Array<any> = [];
  SkillSummaryGridData: Array<any> = [];
  SkillSummaryData: Array<any> = [];
  educationPopupSaveSubscription: Subscription;
  EducationSkillsFormInitiateSubscription: Subscription
  employeeMasterId: number;
  confirmDeleteSubscription: Subscription
  deleteEducationId: Array<any> = [];
  deleteLanguageId: Array<any> = [];
  deleteSkillId: Array<any> = [];
  validateQualification: boolean;
  validateEducationGridRow: boolean;
  validateSkillsGridRow: boolean;
  ishigherEducationValid: boolean;
  educationEditFlag: boolean = false;
  educationviewFlag: boolean = false;
  educationId: number;
  skillId: number;
  skillEditFlag: boolean = false;
  skillviewFlag: boolean = false;
  saveNextBoolean: boolean = false
  public today = new Date();
  confirmationMsg: string;
  public degreeNameInvalid :boolean=false;
  public universityNameInvalid :boolean=false;
  public countryNameInvalid :boolean=false;
  public specializationOneNameInvalid :boolean=false;
  public specializationTwoNameInvalid :boolean=false;
  


  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService,
    private router: Router,
    private EducationSkillsInformationService: EducationSkillsInformationService,
    private CommonDataService: SharedInformationService,
    private modalService: BsModalService,) {
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    this.getAllEducationSummary();
    // this.getAllSkillsSummary();
    // this.getEducationList();
    // this.getSkillsList();
  }

  ngOnInit(): void {
    this.EducationInfoForm = this.formBuilder.group({
      education: ['', Validators.required],
      degreeName: [''],
      durationOfCourse: [''],
      duration: [''],
      courseType: [''],
      location: [''],
      instituteUniversityName: [''],
      startDate: [''],
      endDate: [{ value: '', disabled: true }],
      percentageOrCGPAOrGrade: [''],
      specialization1: [''],
      specialization2: [''],
      Remark: [''],
      isHighestQualificationBoolean: [''],
      qualification: [{ value: null, disabled: true }]
    });

    this.SkillInfoForm = this.formBuilder.group({
      skillName: ['', Validators.required],
      skillDescription: [''],
      proficiency: [''],
    });



    const temp2 = this.SkillInfoForm.get('skillDescription');
    temp2.disable();
    const temp3 = this.SkillInfoForm.get('proficiency');
    temp3.disable();

    this.confirmDeleteSubscription = this.EventEmitterService.setConfirmDeleteEducationSkills().subscribe(res => {

      if (res == 'educationItemDelete') {
        this.EducationSkillsInformationService.deleteEducationGridItem(this.educationId).subscribe(res => {

          this.getAllEducationSummary();
          this.resetEducationForm();
          this.educationEditFlag = false;
          this.educationviewFlag = false;
          this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
        })
      }
    })
    this.EducationInfoForm.get('startDate').valueChanges.subscribe(() => {
      this.checkStartDate();
    })
  }


  getAllEducationSummary() {

    this.EducationSkillsInformationService.getAllEducationSummary(this.employeeMasterId).subscribe(res => {

      // this.EducationSummaryGridData = res.data.results[0];
      this.EducationSummaryData = res.data.results[0];
      this.validatingHigherQualification();
      // console.log(this.EducationSummaryData)
      this.setEducationList();
    }, (error: any) => {
      if (error["error"]["status"]["messsage"] == 'EmployeeSkillDetails details list is empty') {
        this.EducationSummaryData = [];
      }
    })
  }

  
  setEducationList() {
    // to check the value is present or not in the grid for senior secondary and higher secondary
    var target = this.EducationSummaryData.find(temp => temp.education == 'Higher Secondary' || 'Senior Secondary')

    let len = this.EducationSummaryData.length - 1;
    for (let i = len; i > 0; i--) {
      if ((this.EducationSummaryData[i].education == 'Senior Secondary') || (this.EducationSummaryData[i].education == 'Higher Secondary'))  //("Higher Secondary")) //|| 
      {
        let value = this.EducationSummaryData[i].education;
        for (let j = this.highestEducationList.length - 1; j > 0; j--) {
          if (this.highestEducationList[j] === value) {
            this.highestEducationList.splice(j, 1);
            break;
          }
        }
      }
    }   
  }

//   dateSet(){
//     if( this.EducationInfoForm.get('education').value=='Senior Secondary' ||  this.EducationInfoForm.get('Higher Secondary').value=='')
//     if( this.EducationInfoForm.get('education').value=='Senior Secondary'){
//       if()
// startDate='';

//     }else{

//     }
//   }


  getEducationList() {

    this.EducationSkillsInformationService.getEducationList().subscribe(res => {
      this.educationList = res.data.results;

      setTimeout(() => {
        this.employeeEducationRequestModel.education = '';
        this.employeeEducationRequestModel.specialisation1 = '';
      }, 100)
    })
  }

  educationSaveNextSubmit(employeeEducationRequestModel) {

    this.saveNextBoolean = true;

    this.postEducationForm(employeeEducationRequestModel);
  }


  postEducationForm(employeeEducationRequestModel) {

    employeeEducationRequestModel.employeeMasterId = this.employeeMasterId

    employeeEducationRequestModel.startDate = this.datepipe.transform(employeeEducationRequestModel.startDate, 'dd-MMM-yyyy');
    employeeEducationRequestModel.endDate = this.datepipe.transform(employeeEducationRequestModel.endDate, 'dd-MMM-yyyy');

    this.EducationSkillsInformationService.postEducationInfoForm(employeeEducationRequestModel).subscribe(res => {

      this.getAllEducationSummary();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.resetEducationForm();
      this.educationEditFlag = false;
      this.educationviewFlag = false;
      if (this.saveNextBoolean == true) {
        this.saveNextBoolean = false;
        this.router.navigate(['/employee-master/employee-summary']);
      }
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })

  }

  updateEducationForm(employeeEducationRequestModel) {

    employeeEducationRequestModel.employeeMasterId = this.employeeMasterId

    employeeEducationRequestModel.startDate = this.datepipe.transform(employeeEducationRequestModel.startDate, 'dd-MMM-yyyy');
    employeeEducationRequestModel.endDate = this.datepipe.transform(employeeEducationRequestModel.endDate, 'dd-MMM-yyyy');

    this.EducationSkillsInformationService.putEducationInfoForm(employeeEducationRequestModel).subscribe(res => {
      this.getAllEducationSummary();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.resetEducationForm();
      this.employeeEducationRequestModel.employeeEducationID = 0;
      this.educationEditFlag = false;
      this.educationviewFlag = false;
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })

  }

  editEducationRow(education) {
    window.scrollTo(0, 0);
    this.educationEditFlag = true;
    this.educationviewFlag = false;
    this.validateQualification = false;

    this.employeeEducationRequestModel.employeeEducationID = education.employeeEducationID;
    this.employeeEducationRequestModel.education = education.education;
    this.employeeEducationRequestModel.degreeName = education.degreeName;
    this.employeeEducationRequestModel.qualification = education.qualification;
    this.employeeEducationRequestModel.location = education.location;
    this.employeeEducationRequestModel.instituteUniversityName = education.instituteUniversityName;
    this.employeeEducationRequestModel.durationOfCourse = education.durationOfCourse;
    this.employeeEducationRequestModel.durationOfCourseValue = education.durationOfCourseValue;
    this.employeeEducationRequestModel.startDate = education.startDate;
    this.employeeEducationRequestModel.endDate = education.endDate;
    this.employeeEducationRequestModel.percentageOrCGPAOrGrade = education.percentageOrCGPAOrGrade;
    this.employeeEducationRequestModel.courseType = education.courseType;
    this.employeeEducationRequestModel.specialisation1 = education.specialisation1;
    this.employeeEducationRequestModel.specialisation2 = education.specialisation2;
    this.employeeEducationRequestModel.remark = education.remark;
    this.employeeEducationRequestModel.isHighestQualification = education.isHighestQualification;

    const temp1 = this.EducationInfoForm.get('education');
    temp1.enable();
    const temp2 = this.EducationInfoForm.get('degreeName');
    temp2.enable();
    const temp3 = this.EducationInfoForm.get('durationOfCourse');
    temp3.enable();
    const temp4 = this.EducationInfoForm.get('courseType');
    temp4.enable();
    const temp5 = this.EducationInfoForm.get('location');
    temp5.enable();
    const temp6 = this.EducationInfoForm.get('instituteUniversityName');
    temp6.enable();
    const temp7 = this.EducationInfoForm.get('startDate');
    temp7.enable();
    const temp8 = this.EducationInfoForm.get('endDate');
    temp8.enable();
    const temp9 = this.EducationInfoForm.get('percentageOrCGPAOrGrade');
    temp9.enable();
    const temp10 = this.EducationInfoForm.get('specialization1');
    temp10.enable();
    const temp11 = this.EducationInfoForm.get('specialization2');
    temp11.enable();
    const temp13 = this.EducationInfoForm.get('Remark');
    temp13.enable();
    const temp14 = this.EducationInfoForm.get('isHighestQualificationBoolean');
    temp14.enable();
    const temp15 = this.EducationInfoForm.get('qualification');
    temp15.enable();
    const temp16 = this.EducationInfoForm.get('duration');
    temp16.enable();
  }

  viewEducationRow(education) {

    this.educationviewFlag = true;
    this.educationEditFlag = false;
    this.validateQualification = true;
    this.employeeEducationRequestModel.employeeEducationID = education.employeeEducationID;
    this.employeeEducationRequestModel.education = education.education;
    this.employeeEducationRequestModel.degreeName = education.degreeName;
    this.employeeEducationRequestModel.qualification = education.qualification;
    this.employeeEducationRequestModel.location = education.location;
    this.employeeEducationRequestModel.instituteUniversityName = education.instituteUniversityName;
    this.employeeEducationRequestModel.durationOfCourse = education.durationOfCourse;
    this.employeeEducationRequestModel.durationOfCourseValue = education.durationOfCourseValue
    this.employeeEducationRequestModel.startDate = education.startDate;
    this.employeeEducationRequestModel.endDate = education.endDate;
    this.employeeEducationRequestModel.percentageOrCGPAOrGrade = education.percentageOrCGPAOrGrade;
    this.employeeEducationRequestModel.courseType = education.courseType;
    this.employeeEducationRequestModel.specialisation1 = education.specialisation1;
    this.employeeEducationRequestModel.specialisation2 = education.specialisation2;
    this.employeeEducationRequestModel.remark = education.remark;
    this.employeeEducationRequestModel.isHighestQualification = education.isHighestQualification;
    const temp1 = this.EducationInfoForm.get('education');
    temp1.disable();
    const temp2 = this.EducationInfoForm.get('degreeName');
    temp2.disable();
    const temp3 = this.EducationInfoForm.get('durationOfCourse');
    temp3.disable();
    const temp4 = this.EducationInfoForm.get('courseType');
    temp4.disable();
    const temp5 = this.EducationInfoForm.get('location');
    temp5.disable();
    const temp6 = this.EducationInfoForm.get('instituteUniversityName');
    temp6.disable();
    const temp7 = this.EducationInfoForm.get('startDate');
    temp7.disable();
    const temp8 = this.EducationInfoForm.get('endDate');
    temp8.disable();
    const temp9 = this.EducationInfoForm.get('percentageOrCGPAOrGrade');
    temp9.disable();
    const temp10 = this.EducationInfoForm.get('specialization1');
    temp10.disable();
    const temp11 = this.EducationInfoForm.get('specialization2');
    temp11.disable();
    const temp13 = this.EducationInfoForm.get('Remark');
    temp13.disable();
    const temp14 = this.EducationInfoForm.get('isHighestQualificationBoolean');
    temp14.disable();
    const temp15 = this.EducationInfoForm.get('qualification');
    temp15.disable();
    const temp16 = this.EducationInfoForm.get('duration');
    temp16.disable();
  }

  deleteEducationRow(education, confirmation) {

    this.educationId = education.employeeEducationID;

    this.confirmationMsg = 'Do you really want to delete?';
    this.modalRef = this.modalService.show(
      confirmation,
      Object.assign({}, { class: 'gray modal-md' })
    );
    
  }

  cancelEducationEditView() {

    this.educationEditFlag = false;
    this.educationviewFlag = false;
    this.validateQualification = false;
    this.employeeEducationRequestModel.employeeEducationID = 0;
    this.employeeEducationRequestModel.education = '';
    this.EducationInfoForm.get('education').setValue('');
    this.employeeEducationRequestModel.durationOfCourseValue = '';
    this.resetEducationForm();
    const temp1 = this.EducationInfoForm.get('education');
    temp1.enable();
    const temp2 = this.EducationInfoForm.get('degreeName');
    temp2.enable();
    const temp3 = this.EducationInfoForm.get('durationOfCourse');
    temp3.enable();
    const temp4 = this.EducationInfoForm.get('courseType');
    temp4.enable();
    const temp5 = this.EducationInfoForm.get('location');
    temp5.enable();
    const temp6 = this.EducationInfoForm.get('instituteUniversityName');
    temp6.enable();
    const temp7 = this.EducationInfoForm.get('startDate');
    temp7.enable();
    const temp8 = this.EducationInfoForm.get('endDate');
    temp8.enable();
    const temp9 = this.EducationInfoForm.get('percentageOrCGPAOrGrade');
    temp9.enable();
    const temp10 = this.EducationInfoForm.get('specialization1');
    temp10.enable();
    const temp11 = this.EducationInfoForm.get('specialization2');
    temp11.enable();
    const temp13 = this.EducationInfoForm.get('Remark');
    temp13.enable();
    const temp14 = this.EducationInfoForm.get('isHighestQualificationBoolean');
    temp14.enable();
    const temp15 = this.EducationInfoForm.get('qualification');
    temp15.enable();
    const temp16 = this.EducationInfoForm.get('duration');
    temp16.enable();
    this.getAllEducationSummary();
  }

  resetEducationForm() {
    this.EducationInfoForm.reset();
    this.educationEditFlag = false;
    this.educationviewFlag = false;
    this.employeeEducationRequestModel.education = '';
    this.EducationInfoForm.get('education').setValue('');
    this.employeeEducationRequestModel.durationOfCourseValue = '';
  }



  highestEducationBoolean(isHighestQualification) {

    if (isHighestQualification) {
      const temp = this.EducationInfoForm.get('qualification');
      temp.enable();
      this.employeeEducationRequestModel.isHighestQualification = 1;
    } else {
      const temp = this.EducationInfoForm.get('qualification');
      temp.disable();
      this.employeeEducationRequestModel.isHighestQualification = 0;
    }
  }

  IlliterateValidation() {
    if (this.employeeEducationRequestModel.education == 'Illiterate') {
      this.employeeEducationRequestModel.isHighestQualification = true;
      const temp10 = this.EducationInfoForm.get('specialization1');
      temp10.disable();
      const temp11 = this.EducationInfoForm.get('specialization2');
      temp11.disable();
    } else {
      this.employeeEducationRequestModel.isHighestQualification = false;
      const temp10 = this.EducationInfoForm.get('specialization1');
      temp10.enable();
      const temp11 = this.EducationInfoForm.get('specialization2');
      temp11.enable();
    }
  }

  filterHighestEducation(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.highestEducationList.length; i++) {
      let country = this.highestEducationList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredHighestEducationList = filtered;
  }

  validatingHigherQualification() {
    if (this.EducationSummaryGridData.length > 0) {
      let temp;
      temp = this.EducationSummaryGridData.filter(data => {
        return data.qualification != '';
      })
      if (temp.length == 1) {
        this.validateQualification = true;
        const temp15 = this.EducationInfoForm.get('qualification');
        temp15.disable();
      } else {
        this.validateQualification = false;
      }
    }
  }

  filtercourseType(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.courseTypeList.length; i++) {
      let country = this.courseTypeList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredcourseTypeList = filtered;
  }

  comparespecialization() {
    if (this.employeeEducationRequestModel.specialisation1 && this.employeeEducationRequestModel.specialisation2) {
      if (this.employeeEducationRequestModel.specialisation1 == this.employeeEducationRequestModel.specialisation2) {
        this.CommonDataService.sweetalertWarning('Specialization 1 & Specialization 2 fields should be different');
        this.employeeEducationRequestModel.specialisation1 = '';
        this.employeeEducationRequestModel.specialisation2 = '';
      }
    }
  }
  //   onChangeStartDate(evt: any) {
  //        console.log(this.EducationInfoForm.get('startDate').value)
  //       if(this.EducationInfoForm.get('startDate').value==null)
  //       {
  //        this.EducationInfoForm.controls["startDate"].setValidators([Validators.required]);

  //       }else{
  //    this.EducationInfoForm.controls["startDate"].clearValidators();

  // }


  //   }

  // checkStartDate(evt: any){
  //   if(this.EducationInfoForm.get('startDate').value===""){
  //     console.log(this.EducationInfoForm.get('startDate').value);
  //     this.EducationInfoForm.clearValidators();
  //     this.EducationInfoForm.controls["startDate"].setValidators(Validators.required);

  //   } 
  //   else{
  //     this.EducationInfoForm.clearValidators();
  //     this.EducationInfoForm.controls["startDate"].clearValidators();
  //   }
  // this.EducationInfoForm.get('startDate').updateValueAndValidity();
  // }


  checkStartDate() {
    this.EducationInfoForm.controls["endDate"].enable();
  }


  deleteRecord() {
    this.EducationSkillsInformationService.deleteEducationGridItem(this.educationId).subscribe(res => {

      this.getAllEducationSummary();
      this.resetEducationForm();
      this.educationEditFlag = false;
      this.educationviewFlag = false;
      this.modalRef.hide();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.setEducationList();
    })
  }

  clearDuration() {

    this.employeeEducationRequestModel.durationOfCourse = '';
  }
  keyPressedOnlyNumbersAllow(event) {
    const pattern = /[^0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (pattern.test(inputChar)) {
      event.preventDefault();

    }
  }

  isDegreeNameContainsOnlySpecialCharacter() {
    this.degreeNameInvalid = false
    var splChars = "*|,\" :<>[]{}`\!';()@&$#%1234567890";
    for ( var i = 0; i < this.EducationInfoForm.get( 'degreeName' ).value.length; i++ ) {
      if ( splChars.indexOf( this.EducationInfoForm.get( 'degreeName' ).value.charAt( i ) ) != -1 ) {
        //alert("Illegal characters detected!");
        this.degreeNameInvalid = true;
      } else {
        this.degreeNameInvalid = false;
        break;
      }
    }
    if ( this.degreeNameInvalid == true ) {
      this.EducationInfoForm.get('degreeName').invalid;

    }
  }

  isUniversityNameContainsOnlySpecialCharacter() {
    this.universityNameInvalid = false
    var splChars = "*|,\" :<>[]{}`\!';()@&$#%1234567890";
    for ( var i = 0; i < this.EducationInfoForm.get( 'instituteUniversityName' ).value.length; i++ ) {
      if ( splChars.indexOf( this.EducationInfoForm.get( 'instituteUniversityName' ).value.charAt( i ) ) != -1 ) {
        //alert("Illegal characters detected!");
        this.universityNameInvalid = true;
      } else {
        this.universityNameInvalid = false;
        break;
      }
    }
    if ( this.universityNameInvalid==true) {
      this.EducationInfoForm.get('instituteUniversityName').invalid;
    }
  }

  isCountryNameContainsOnlySpecialCharacter() {
    this.countryNameInvalid = false
    var splChars = "*|,\" :<>[]{}`\!';()@&$#%1234567890";
    for ( var i = 0; i < this.EducationInfoForm.get( 'location' ).value.length; i++ ) {
      if ( splChars.indexOf( this.EducationInfoForm.get( 'location' ).value.charAt( i ) ) != -1 ) {
        //alert("Illegal characters detected!");
        this.countryNameInvalid = true;
      } else {
        this.countryNameInvalid = false;
        break;
      }
    }
    if ( this.countryNameInvalid==true) {
      this.EducationInfoForm.get('location').invalid;
    }
  }

  isSpecilizationOneNameContainsOnlySpecialCharacter() {
    this.specializationOneNameInvalid= false
    var splChars = "*|,\" :<>[]{}`\!';()@&$#%1234567890";
    for ( var i = 0; i < this.EducationInfoForm.get( 'specialization1' ).value.length; i++ ) {
      if ( splChars.indexOf( this.EducationInfoForm.get( 'specialization1' ).value.charAt( i ) ) != -1 ) {
        //alert("Illegal characters detected!");
        this.specializationOneNameInvalid = true;
      } else {
        this.specializationOneNameInvalid = false;
        break;
      }
    }
    if ( this.specializationOneNameInvalid==true) {
      this.EducationInfoForm.get('specialization1').invalid;
    }
  }

  isSpecilizationTwoNameContainsOnlySpecialCharacter() {
    this.specializationTwoNameInvalid= false
    var splChars = "*|,\" :<>[]{}`\!';()@&$#%1234567890";
    for ( var i = 0; i < this.EducationInfoForm.get( 'specialization2' ).value.length; i++ ) {
      if ( splChars.indexOf( this.EducationInfoForm.get( 'specialization2' ).value.charAt( i ) ) != -1 ) {
        //alert("Illegal characters detected!");
        this.specializationTwoNameInvalid = true;
      } else {
        this.specializationTwoNameInvalid = false;
        break;
      }
    }
    if ( this.specializationTwoNameInvalid==true) {
      this.EducationInfoForm.get('specialization2').invalid;
    }
  }

}
