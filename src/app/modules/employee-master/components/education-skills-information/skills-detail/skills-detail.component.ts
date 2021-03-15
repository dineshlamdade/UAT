import { Component, OnInit, ViewEncapsulation, ViewChild, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from '../../../employee-master-services/event-emitter/event-emitter.service';
import { employeeSkillDetailsRequest } from '../educatio-skills.model';
import { Subscription } from 'rxjs';
import { EducationSkillsInformationService } from '../education-skills-information.service';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-skills-detail',
  templateUrl: './skills-detail.component.html',
  styleUrls: ['./skills-detail.component.scss']
})
export class SkillsDetailComponent implements OnInit {

  SkillInfoForm: FormGroup;
  modalRef: BsModalRef;
  date = { startDate: "", endDate: "" }
  addPush: boolean;
  // public employeeEducationRequestModel = new employeeEducationRequest('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '')
  public employeeSkillDetailsRequestModel = new employeeSkillDetailsRequest('', '', '', '', '')
  EmptyGridTrue: boolean;
  proficiency: any;
  tomorrow = new Date();
  educationList: Array<any> = [];
  SkillSetList: Array<any> = [];
  filteredSkillSetList: Array<any> = [];
  courseTypeList = 'Select,Full-Time, Part-Time, Correspondance'.split(',');
  filteredcourseTypeList = 'Select,Full-Time, Part-Time, Correspondance'.split(',');
  SkillSummaryGridData: Array<any> = [];
  SkillSummaryData: Array<any> = [];
  employeeMasterId: number;
  confirmDeleteSubscription: Subscription
  deleteLanguageId: Array<any> = [];
  deleteSkillId: Array<any> = [];
  validateQualification: boolean;
  validateSkillsGridRow: boolean;
  skillId: number;
  skillEditFlag: boolean = false;
  skillviewFlag: boolean = false;
  confirmationMsg: string;



  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService,
    private EducationSkillsInformationService: EducationSkillsInformationService,
    private CommonDataService: SharedInformationService,
    private modalService: BsModalService) { }

  ngOnInit(): void {

    this.SkillInfoForm = this.formBuilder.group({
      skillName: ['', Validators.required],
      skillDescription: ['', Validators.required],
      proficiency: ['', Validators.required],
    });

    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    this.getAllSkillsSummary();
    this.getSkillsList();

    const temp2 = this.SkillInfoForm.get('skillDescription');
    temp2.disable();
    const temp3 = this.SkillInfoForm.get('proficiency');
    temp3.disable();
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
    }, (error: any) => {
      if (error["error"]["status"]["messsage"] == 'EmployeeSkillDetails details list is empty') {
        this.SkillSummaryData = [];
      }
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
    temp1.setValue(skill.skillName)
    const temp2 = this.SkillInfoForm.get('skillDescription');
    temp2.enable();
    temp2.setValue(skill.skillDescription)
    const temp3 = this.SkillInfoForm.get('proficiency');
    temp3.enable();
    temp3.setValue(skill.proficiency)
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

  deleteSkillRow(skill, confirmation) {

    this.skillId = skill.employeeSkillInfoId;
    this.confirmationMsg = 'Do you really want to delete?';
    this.modalRef = this.modalService.show(
      confirmation,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  deleteRecord() {
    this.EducationSkillsInformationService.deleteSkillsGridItem(this.skillId).subscribe(res => {
      this.getAllSkillsSummary();

      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.resetSkillForm();
      this.modalRef.hide();
    })
  }

  cancelSkillView() {
    this.skillEditFlag = false;
    this.skillviewFlag = false;
    this.resetSkillForm();
    this.employeeSkillDetailsRequestModel.employeeSkillInfoId = 0;
    const temp1 = this.SkillInfoForm.get('skillName');
    temp1.enable();
    const temp2 = this.SkillInfoForm.get('skillDescription');
    temp2.disable();
    const temp3 = this.SkillInfoForm.get('proficiency');
    temp3.disable();
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
          this.SkillInfoForm.get('skillName').setValue('');
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
    this.skillEditFlag = false;
    this.skillviewFlag = false;
    this.employeeSkillDetailsRequestModel.employeeSkillInfoId = 0;
    const temp2 = this.SkillInfoForm.get('skillDescription');
    temp2.disable();
    const temp3 = this.SkillInfoForm.get('proficiency');
    temp3.disable();

    this.employeeSkillDetailsRequestModel.skillName = '';
    this.SkillInfoForm.get('skillName').setValue('');
  }
}
