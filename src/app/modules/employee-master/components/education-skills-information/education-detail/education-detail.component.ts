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
import { Router } from '@angular/router';


@Component({
  selector: 'app-education-detail',
  templateUrl: './education-detail.component.html',
  styleUrls: ['./education-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EducationDetailComponent implements OnInit {
  EducationInfoForm: FormGroup;
  SkillInfoForm: FormGroup;
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
  highestEducationList = 'Select,Illiterate,Non Matric,Senior Secondary,Higher Secondary,Graduate,Post Graduate,Doctorate,Technical(Professional)'.split(',');
  filteredHighestEducationList = 'Select,Illiterate,Non Matric,Senior Secondary,Higher Secondary,Graduate,Post Graduate,Doctorate,Technical(Professional)'.split(',');
  courseTypeList = 'Select,Full-Time, Part-Time, Correspondance'.split(',');
  filteredcourseTypeList = 'Select,Full-Time, Part-Time, Correspondance'.split(',');
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



  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService,
    public dialog: MatDialog,
    private router: Router,
    private matDialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private EducationSkillsInformationService: EducationSkillsInformationService,
    private CommonDataService: SharedInformationService) {
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    this.getAllEducationSummary();
    this.getAllSkillsSummary();
    this.getEducationList();
    this.getSkillsList();
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
      endDate: [''],
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
          this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
        })
      }
    })
  }


  getAllEducationSummary() {

    this.EducationSkillsInformationService.getAllEducationSummary(this.employeeMasterId).subscribe(res => {
      
      // this.EducationSummaryGridData = res.data.results[0];
      this.EducationSummaryData = res.data.results[0];
      this.validatingHigherQualification();
    }, (error: any) => {
      if (error["error"]["status"]["messsage"] == 'EmployeeSkillDetails details list is empty') {
        this.EducationSummaryData = [];
      }
    })
  }

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
  }

  deleteEducationRow(education) {

    this.educationId = education.employeeEducationID;
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      disableClose: true,
      width: '664px', height: '241px',
      data: { pageValue: 'educationItemDelete', info: 'Do you really want to delete?' }
    });
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

  // Skills Information

  getSkillsList() {

    this.EducationSkillsInformationService.getSkillsList().subscribe(res => {
      this.SkillSetList = res.data.results;
      setTimeout(() => {
        this.employeeSkillDetailsRequestModel.skillName = '';
      }, 100)
    })
  }

  getAllSkillsSummary() {

    this.EducationSkillsInformationService.getAllSkillsSummary(this.employeeMasterId).subscribe(res => {

      this.SkillSummaryGridData = res.data.results[0];
      this.SkillSummaryData = res.data.results[0];

      // this.validatingHigherQualification();
    })
  }

  postSkillsForm(employeeSkillDetailsRequestModel) {

    employeeSkillDetailsRequestModel.employeeMasterId = this.employeeMasterId;

    this.EducationSkillsInformationService.postSkillsInfoForm(employeeSkillDetailsRequestModel).subscribe(res => {

      this.getAllSkillsSummary();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.resetSkillForm();
      this.skillEditFlag = false;
      this.skillviewFlag = false;
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })

  }

  updateSkillsForm(employeeSkillDetailsRequestModel) {

    employeeSkillDetailsRequestModel.employeeMasterId = this.employeeMasterId;

    this.EducationSkillsInformationService.putSkillsInfoForm(employeeSkillDetailsRequestModel).subscribe(res => {

      this.getAllSkillsSummary();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.resetSkillForm();
      this.employeeSkillDetailsRequestModel.employeeSkillInfoId = 0;
      this.skillEditFlag = false;
      this.skillviewFlag = false;
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })

  }

  editSkillRow(skill) {

    this.skillEditFlag = true;
    this.skillviewFlag = false;
    this.employeeSkillDetailsRequestModel.employeeSkillInfoId = skill.employeeSkillInfoId;
    this.employeeSkillDetailsRequestModel.skillName = skill.skillName;
    this.employeeSkillDetailsRequestModel.proficiency = skill.proficiency;
    this.employeeSkillDetailsRequestModel.skillDescription = skill.skillDescription;

    const temp1 = this.SkillInfoForm.get('skillName');
    temp1.enable();
    const temp2 = this.SkillInfoForm.get('skillDescription');
    temp2.enable();
    const temp3 = this.SkillInfoForm.get('proficiency');
    temp3.enable();
  }

  viewSkillRow(skill) {

    this.skillEditFlag = false;
    this.skillviewFlag = true;
    this.employeeSkillDetailsRequestModel.employeeSkillInfoId = skill.employeeSkillInfoId;
    this.employeeSkillDetailsRequestModel.skillName = skill.skillName;
    this.employeeSkillDetailsRequestModel.proficiency = skill.proficiency;
    this.employeeSkillDetailsRequestModel.skillDescription = skill.skillDescription;

    const temp1 = this.SkillInfoForm.get('skillName');
    temp1.disable();
    const temp2 = this.SkillInfoForm.get('skillDescription');
    temp2.disable();
    const temp3 = this.SkillInfoForm.get('proficiency');
    temp3.disable();
  }

  deleteSkillRow(skill) {
    this.skillId = skill.employeeSkillInfoId;
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      disableClose: true,
      width: '664px', height: '241px',
      data: { pageValue: 'skillsItemDelete', info: 'Do you really want to delete?' }
    });
  }

  cancelSkillView() {
    this.skillEditFlag = false;
    this.skillviewFlag = false;
    this.resetSkillForm();
    this.employeeSkillDetailsRequestModel.employeeSkillInfoId = 0;
    const temp1 = this.SkillInfoForm.get('skillName');
    temp1.enable();
    const temp2 = this.SkillInfoForm.get('skillDescription');
    temp2.enable();
    const temp3 = this.SkillInfoForm.get('proficiency');
    temp3.enable();
    this.getAllSkillsSummary();
  }

  filterSkillSet(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.SkillSetList.length; i++) {
      let country = this.SkillSetList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredSkillSetList = filtered;
  }


  clearSkillsInformation() {

    this.employeeSkillDetailsRequestModel.skillDescription = '';
    this.employeeSkillDetailsRequestModel.proficiency = '';
  }

  validateGridSkills() {

    if (this.SkillSummaryGridData.length > 0) {
      this.SkillSummaryGridData.filter(res => {

        if (res.skillName == this.employeeSkillDetailsRequestModel.skillName) {
          this.CommonDataService.sweetalertWarning('This Record is already exist in Grid Summary');

          this.employeeSkillDetailsRequestModel.skillName = '';
          const description = this.SkillInfoForm.get('skillDescription');
          description.disable();
          const proficiency = this.SkillInfoForm.get('proficiency');
          proficiency.disable();
        } else {
          const description = this.SkillInfoForm.get('skillDescription');
          description.enable();
          const proficiency = this.SkillInfoForm.get('proficiency');
          proficiency.enable();
        }
      })
    } else {
      const description = this.SkillInfoForm.get('skillDescription');
      description.enable();
      const proficiency = this.SkillInfoForm.get('proficiency');
      proficiency.enable();
    }
  }

  resetSkillForm() {
    this.SkillInfoForm.reset();
  }

  clearDuration(){

    this.employeeEducationRequestModel.durationOfCourse = '';
  }
}
