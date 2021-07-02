import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { element } from 'protractor';
import { of } from 'rxjs/internal/observable/of';
import { ExcelserviceService } from '../../excel_service/excelservice.service';

import { AlertServiceService } from './../../../core/services/alert-service.service';
import { workflowService } from './../workflow.service';

@Component({
  selector: 'app-workflowMaster',
  templateUrl: './workflowMaster.component.html',
  styleUrls: ['./workflowMaster.component.css'],
})
export class WorkflowMasterComponent implements OnInit {
  public form: FormGroup;
  public methodOfApprovalArray: Array<string> = ['Reporting Manager', 'Manager through SDM'];
  public noOfApprovers: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public levelOfRM: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public sequence: Array<any> = [];
  public levelOfApprovers: Array<any>;
  public arrayApproverMaster: Array<any> = [];
  public templatedefinedArray: Array<any> = [];
  public reassignedSequenceArray: Array<any> = [];
  public reassignedSequenceArrayPopUp: Array<any> = [];
  public reassignedSequenceArrayForm: FormGroup;
  public summary: Array<any> = [];
  public treatmentUnActionedPlanArray: string[] = ['Auto Approval', 'Reassign'];
  public dummyArray: string[] = ['SDM1', 'SDM2'];
  public deleteApproverListsButtonShow: boolean;
  public cancelButtonShow = false;
  public addButtonPopup = true;
  public modalRef: BsModalRef;
  public approverSequence: number;
  public workflowMasterHeaderId: number;
  public workflowCodeFLag = false;
  public addReassignedButtonPopup = true;
  editReassignedIndex: any;
  sdmApplicabilityArray: Array<any> = [];
  excelData: any[];
  workflowMasterHeaderResponseDTO: any = [];
  selectedLevelManager: any;
  selectedLevelManagerRM: any;
  numberOfApprovalLevel: number = 1;
  header: any[];
  

  constructor(private formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private service: workflowService,
    private alertService: AlertServiceService,
    private modalService: BsModalService,
    private excelservice: ExcelserviceService) {
    this.form = this.formBuilder.group({
      active: new FormControl(true),
      autoApproval: new FormControl(false),
      changeOfApproverByManager: new FormControl(false),
      defined: new FormControl(false),
      definedTemplateId: new FormControl(null),
      description: new FormControl(null),
      remark: new FormControl(null),
      workflowCode: new FormControl(null, Validators.required),
      numberOfApprovalLevel: new FormControl(this.numberOfApprovalLevel),
      workflowMasterHeaderId: new FormControl(0),
    });

    this.reassignedSequenceArrayForm = formBuilder.group({
      active: new FormControl(true),
      approverMethod: new FormControl(null),
      levelOfRM: new FormControl(null),
      sdm: new FormControl(null),
      derivedID:new FormControl("201"),  
      sequence: new FormControl(null),
      workflowMasterHeaderId: new FormControl(null),
      workflowResequenceId: new FormControl(null),
    });

    this.sequence.push(1)
    this.arrayApproverMaster.push({
      approverMethod: null,
      levelOfRM: null,
      numberOfDays: null,
      sdm: null,
      derivedID:'201',  
      sequence: 1,
      treatmentUnActionedPlan: null,
      workflowMasterApproverId: 0,
      workflowMasterHeaderId: 0,
    })

  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  workflowCodeValidation(data) {
    if ((this.form.get('workflowMasterHeaderId').value === 0) && (this.summary.find((x) => x.workflowMasterHeaderResponseDTO.workflowCode === data))) {
      this.workflowCodeFLag = true;
    } else {
      this.workflowCodeFLag = false;
    }

  }

  ngOnInit() {

    this.service.getWorkflowMaster().subscribe((res) => {
      console.log(res);
      this.summary = res.data.results;
      this.summary.forEach(element => {
        this.workflowMasterHeaderResponseDTO.push(element.workflowMasterHeaderResponseDTO)
      })
    });

    this.service.getWorkflowMasterTemplateDriven().subscribe((data) => {
      console.log(data.data.results);
      this.templatedefinedArray = data.data.results;
    });

    this.getSdmApplicability();


    const definedTemplate = this.form.get('definedTemplateId');
    const remark = this.form.get('remark');

    this.form.get('autoApproval').valueChanges.subscribe((data) => {
      console.log(data)
      if ((this.form.get('workflowMasterHeaderId').value === 0) || (this.form.get('workflowMasterHeaderId').value === null)) {

        if (data === false) {
          this.arrayApproverMaster.push({
            approverMethod: null,
            levelOfRM: null,
            numberOfDays: null,
            sdm: null,
            sequence: 1,
            treatmentUnActionedPlan: null,
            workflowMasterApproverId: 0,
            workflowMasterHeaderId: 0,
          })
          this.sequence = [1]
          console.log(this.sequence)
        } else {
          this.arrayApproverMaster = [];
          this.reassignedSequenceArray = [];
        }
      }

    });
    this.form.get('defined').valueChanges.subscribe((data) => {
      if (data === false) {
        definedTemplate.clearValidators();
        definedTemplate.setValue(null);
      } else {
        definedTemplate.setValidators([Validators.required]);
      }
    });

    this.form.get('active').valueChanges.subscribe((data) => {
      if (data === false) {
        remark.setValidators(Validators.required);
      } else {
        remark.clearValidators();
        remark.setValue(null);
      }
    });

    const obs = of(this.arrayApproverMaster);
    obs.subscribe((arg) => console.log(arg));

    this.reassignedSequenceArrayForm.get('approverMethod').valueChanges.subscribe((data) => {
      const levelOfRM = this.reassignedSequenceArrayForm.get('levelOfRM');
      const sdm = this.reassignedSequenceArrayForm.get('sdm');
      data === 'Manager through SDM' ? levelOfRM.setValue(null) : sdm.setValue(null);
    });

  }

  getSdmApplicability() {
    this.service.getSdmApplicationModule().subscribe((res) => {
      this.sdmApplicabilityArray = res.data.results;
      console.log('SDM', this.sdmApplicabilityArray);
    })
  }

  approverTableValidation() {
    this.arrayApproverMaster.forEach((val, index) => {
      if (val.approverMethod) {
        if ((val.approverMethod === 'Reporting Manager') && (!val.levelOfRM)) {
          console.log(val.approverMethod, 'invalid', index);
        } else if ((val.approverMethod === 'Manager through SDM') && (!val.sdm)) {
          console.log(val.approverMethod, 'invalid', index);
        }
      } else {

      }
      // if (val.treatmentUnActionedPlan) {
      //   if (val.treatmentUnActionedPlan === 'Reassign') {
      //     if ((!val.approverMethodAtNextLevel ) || (!val.levelOfRMAtNextLevel) || (!val.sdmAtNextLevel) || (!val.sequenceAtNextLevel)) {}
      //   }
      // }

    });
  }

  submit() {
    if (this.form.invalid) {
      this.alertService.sweetalertWarning('Please fill value in code input field');
      return;
    }

    let returnFlag: boolean;
    this.arrayApproverMaster.forEach((val, index) => {
      let rank = index + 1;
      if (!val.approverMethod) {
        this.alertService.sweetalertWarning('Please fill data in Method Of Approval');
        returnFlag = true;
        return;
      } 
      else {
        if (val.approverMethod === 'Reporting Manager') {
          if (!val.levelOfRM) {
            this.alertService.sweetalertWarning('Please fill data in Level Of Reporting Manager');
            returnFlag = true;
            return;
          }
        } else {
          if (!val.sdm) {
            this.alertService.sweetalertWarning('Please fill data in Level Of Reporting Manager');
            returnFlag = true;
            return;
          }
        }
      }
      if (!val.treatmentUnActionedPlan) {
        this.alertService.sweetalertWarning('Please fill data in Treatment- Unactioned Application');
        returnFlag = true;
        return;
      } else {
        if (val.treatmentUnActionedPlan === 'Reassign') {
          if ((!this.reassignedSequenceArray.find((x) => x.sequence === parseInt(val.sequence)))) {
            this.alertService.sweetalertWarning('Treatment (Unactioned Application) and Post Days should be same for same sequence No.');
            // + val.sequence
            returnFlag = true;
            return;
          }
        }
      }

      if (!val.numberOfDays) {
        this.alertService.sweetalertWarning('Please fill data in Post- No. Of Days');
        returnFlag = true;
        return;
      }
    });

    this.arrayApproverMaster.sort((a, b) => a.sequence - b.sequence);
    if (this.form.get('autoApproval').value === true) {
      this.reassignedSequenceArray = [];
      this.arrayApproverMaster = [];
    }

    const data = {
      approverMasterRequestDTO: this.arrayApproverMaster,
      resequenceDetailsRequestDTO: this.reassignedSequenceArray,
      workflowMasterHeaderRequestDTO: this.form.getRawValue(),
    };
    if (returnFlag) {
      return;
    }
    data.workflowMasterHeaderRequestDTO.numberOfApprover = this.arrayApproverMaster.length
    console.log('result:', data);
    
    if (this.form.get('workflowMasterHeaderId').value === 0) {
      this.service.postWorkFlowMaster(data).subscribe((res) => {
        console.log(res.data);
        this.alertService.sweetalertMasterSuccess("Workflow-Master Saved Successfully", '');
        this.reset();
        this.sequence = []
        this.levelOfRM = []
        this.levelOfRM = [1,2,3,4,5,6,7,8,9,10]
        this.summary = res.data.results[0];
      }, (error: any) => {
        console.log();
        this.alertService.sweetalertWarning(error.error.status.messsage);
      });
    } else {
      this.service.putWorkFlowMaster(data).subscribe((res) => {
        console.log(res);
        this.summary = res.data.results[0];
        this.alertService.sweetalertMasterSuccess("Workflow-Master Updated Successfully", '');
        this.reset();
      }, (error: any) => {
        console.log();
        this.alertService.sweetalertWarning(error.error.status.messsage);
      });
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }

  reset() {
    this.form.enable();
    this.form.reset();
    this.form.patchValue({
      workflowMasterHeaderId: 0,
      defined: false,
      autoApproval: false,
      changeOfApproverByManager: false,
      active: true
    });
    this.cancelButtonShow = false;
    this.arrayApproverMaster = [];
    this.arrayApproverMaster.push({
      approverMethod: null,
      levelOfRM: null,
      numberOfDays: null,
      sdm: null,
      sequence: 1,
      treatmentUnActionedPlan: null,
      workflowMasterApproverId: 0,
      workflowMasterHeaderId: 0,
    })
    this.sequence = [1]
    this.reassignedSequenceArray = [];
  }

  getSelectedSequence(sequence){
    console.log(this.arrayApproverMaster)
    this.arrayApproverMaster.forEach(ele =>{
      if(ele.sequence == sequence){
        if(ele.treatmentUnActionedPlan == null){
          ele.treatmentUnActionedPlan = this.arrayApproverMaster[0].treatmentUnActionedPlan
          ele.numberOfDays = this.arrayApproverMaster[0].numberOfDays
        }
      }
    })
    var flags = [], output = [], l = this.arrayApproverMaster.length, i;
    for( i=0; i<l; i++) {
        if( flags[this.arrayApproverMaster[i].sequence]) continue;
        flags[this.arrayApproverMaster[i].sequence] = true;
        output.push(this.arrayApproverMaster[i]);
    }
    this.numberOfApprovalLevel = output.length
    this.form.controls['numberOfApprovalLevel'].setValue(this.numberOfApprovalLevel)
  }

  resetAssignedData(){
    this.reassignedSequenceArrayPopUp.forEach(ele =>{
      this.levelOfRM.push(ele.levelOfRM)
    })
    this.levelOfRM = this.levelOfRM.sort()
    this.reassignedSequenceArrayPopUp = []
  }

  approverMethodValidation(index) {
    this.arrayApproverMaster[index].approverMethod === 'Reporting Manager' ?
      this.arrayApproverMaster[index].sdm = null : this.arrayApproverMaster[index].levelOfRM = null;
  }

  getAssignedLeveOfRM(value){
    this.selectedLevelManagerRM = value
  }

  addAprrover() {
    var flags = [], output = [], l = this.arrayApproverMaster.length, i;
    for( i=0; i<l; i++) {
        if( flags[this.arrayApproverMaster[i].sequence]) continue;
        flags[this.arrayApproverMaster[i].sequence] = true;
        output.push(this.arrayApproverMaster[i]);
    }
    this.numberOfApprovalLevel = output.length
    this.form.controls['numberOfApprovalLevel'].setValue(this.numberOfApprovalLevel)
    let temparr = []
    this.levelOfRM.forEach((element,index) =>{
      if(element == parseInt(this.selectedLevelManager)){

        let ind = index;
        if(ind == 0){
          this.levelOfRM.splice(0,1)
        }else{
          let val = ind + 1;
          // alert(val)
          this.levelOfRM.splice(0,val)
        }
      }
      // if(element == parseInt(this.selectedLevelManager)){
      //   //console.log(element)
      //   let ind = index;
      //   //console.log("if1: "+ind)
      //   this.levelOfRM.splice(ind,1)
      // }
    })
    
  this.sequence.push(this.arrayApproverMaster.length + 1)
    var flags = [], output = [], l = this.sequence.length, i;
    for( i=0; i<l; i++) {
        if( flags[this.sequence[i]]) continue;
        flags[this.sequence[i]] = true;
        output.push(this.sequence[i]);
    }
    this.sequence = output

    this.arrayApproverMaster.push({
      approverMethod: null,
      levelOfRM: null,
      numberOfDays: null,
      sdm: null,
      sequence: this.arrayApproverMaster.length + 1,
      treatmentUnActionedPlan: null,
      workflowMasterApproverId: 0,
      workflowMasterHeaderId: 0,
    })
  }

  deleteApprover(i,data) {
    console.log(JSON.stringify(data))
    this.arrayApproverMaster.splice(i, 1);
    this.sequence.splice(i,1)
    this.levelOfRM.push(data.levelOfRM)
    this.levelOfRM.push(data.levelOfRM - 1)
    // console.log(data.levelOfRM.length)
    // for(let i= data.levelOfRM.length; i > data.levelOfRM.length; i--){
    //   console.log(data.levelOfRM[i])
    //   this.levelOfRM.push(data.levelOfRM[i])
    // }
    
    var flags = [], output = [], l = this.levelOfRM.length, i;
    for( i=0; i<l; i++) {
        if( flags[this.levelOfRM[i]]) continue;
        flags[this.levelOfRM[i]] = true;
        output.push(this.levelOfRM[i]);
    }
    this.levelOfRM = output
    console.log(this.levelOfRM)
 
    this.sequence.push(data.sequence)
    this.levelOfRM = this.levelOfRM.sort()
    this.sequence = this.sequence.sort()
  }

  gettreatmentUnActionedPlan(plan,data){
    console.log("this.reassignedSequenceArray: "+ JSON.stringify(this.reassignedSequenceArray))
    console.log("this.data: "+ JSON.stringify(data))
    if(plan == 'Auto Approval'){
     
      this.reassignedSequenceArray.forEach((element,index) =>{
        if(element.sequence == data.sequence){
          let ind = index;
          this.reassignedSequenceArray.splice(ind,1)
        }
      })
    }

    console.log("after.reassignedSequenceArray: "+ JSON.stringify(this.reassignedSequenceArray))
  }

  edit(item) {
    this.levelOfRM = []
    this.levelOfRM.push(1,2,3,4,5,6,7,8,9,10)
    this.scrollToTop();
    this.form.enable();
    this.arrayApproverMaster = [];
    this.form.get('workflowCode').disable();
    this.deleteApproverListsButtonShow = false;
    item.approverMasterResponseDTO.forEach(element => {
      element.derivedID = ''
      element.sdm = "",
      element.updatedBy = 'kuldeep'
    });
    this.arrayApproverMaster = item.approverMasterResponseDTO;
    this.form.patchValue(item.workflowMasterHeaderResponseDTO);
    this.cancelButtonShow = false;
    console.log(item);
    item.resequenceDetailsResponseDTO.forEach(element => {
      element.derivedID = '201'
      element.sdm = "",
      element.updatedBy = 'kuldeep'
    });
    this.reassignedSequenceArray = item.resequenceDetailsResponseDTO;
    this.arrayApproverMaster.forEach((element, index) => {
      this.sequence.push(index + 1);
    });
    this.reassignedSequenceArrayForm.controls['derivedID'].setValue('201')
  }

  view(item) {
    this.edit(item);
    this.form.disable();
    this.cancelButtonShow = true;
  }

  public reassignedValidation(template: TemplateRef<any>, item): void {
    this.approverSequence = item.sequence;

    this.levelOfRM.forEach((element,index) =>{
      if(element == parseInt(this.selectedLevelManager)){

        let ind = index;
        if(ind == 0){
          this.levelOfRM.splice(0,1)
        }else{
          let val = ind + 1;
          // alert(val)
          this.levelOfRM.splice(0,val)
        }
      }
    })
   
    // console.log(this.reassignedSequenceArray);
    this.reassignedSequenceArrayPopUp = this.reassignedSequenceArray.filter((o) => o.sequence === item.sequence);
   // console.log(this.reassignedSequenceArrayPopUp);
    this.workflowMasterHeaderId = item.workflowMasterHeaderId;
    this.reassignedSequenceArrayForm.get('workflowMasterHeaderId').setValue(item.workflowMasterHeaderId);
    this.reassignedSequenceArrayForm.get('sequence').setValue(this.approverSequence);
   // console.log(this.approverSequence);
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' }),
    );
  }

  public submitReassigned(): void {
    this.levelOfRM.forEach((element,index) =>{
      if(element == parseInt(this.selectedLevelManagerRM)){
        let ind = index;
        this.levelOfRM.splice(ind,1)
      }
    })
    //console.log(this.reassignedSequenceArrayForm.value);
    const temp = this.reassignedSequenceArrayForm.get('sequence').value;
    const id = this.reassignedSequenceArrayForm.get('workflowMasterHeaderId').value;
    this.reassignedSequenceArray.push(this.reassignedSequenceArrayForm.value);
    this.reassignedSequenceArrayPopUp.push(this.reassignedSequenceArrayForm.value);
    this.reassignedSequenceArrayForm.reset();
    this.reassignedSequenceArrayForm.get('sequence').setValue(temp);
    this.reassignedSequenceArrayForm.get('active').setValue(true);
    this.reassignedSequenceArrayForm.get('workflowMasterHeaderId').setValue(id);

  }

  public editReassignMethodDetails(item: Array<any>, index: number): void {
    console.log(item)
    this.reassignedSequenceArrayForm.patchValue(item);
    this.addReassignedButtonPopup = false;
    this.editReassignedIndex = index;
  }

  public updateReassignMethodDetails(): void {
    this.addReassignedButtonPopup = true;
    this.reassignedSequenceArrayPopUp[this.editReassignedIndex] = this.reassignedSequenceArrayForm.getRawValue();
    let length = this.reassignedSequenceArray.length;
    let seq = this.reassignedSequenceArrayForm.get('sequence').value;
    // console.log(this.reassignedSequenceArray)
    let temp = this.reassignedSequenceArray.filter((o) => o.sequence !== seq);
    this.reassignedSequenceArrayPopUp.forEach(element => {
      temp.push(element)
    });
    //temp.push(this.reassignedSequenceArrayPopUp);
    this.reassignedSequenceArray = temp;
    console.log(this.reassignedSequenceArray);
    this.reassignedSequenceArrayForm.reset();

  }

  /**
   * delete Reassign Method Details
   */
  public deleteReassignMethodDetails(i) {
    this.reassignedSequenceArray.splice(i, 1);
  }

  exportAsXLSX(): void {
    this.excelData = [];
    this.header = []
    this.header =["Code","Description","No. Of Approval Level","No. Of Approvers", "Auto Approval", "Create By", "Created Date"]
    //this.excelData = this.workflowMasterHeaderResponseDTO
    this.workflowMasterHeaderResponseDTO.forEach(element => {
      if(element.autoApproval == true){
        element.autoApproval = 'Yes'
      }else{
        element.autoApproval = 'No'
      }
			let obj = {
				"Code": element.workflowCode,
				"Description": element.description,
        "No. of Approval Level": element.numberOfApprovalLevel,
				"No.Of Approvers": element.numberOfApprover,
				"Auto Approval": element.autoApproval,
				"Created By": element.createdBy,
				"Created Date": element.createdOn
			}
			this.excelData.push(obj)
		});
    this.excelservice.exportAsExcelFile(this.excelData, 'Workflow-Summary','Workflow-Master',this.header);
  }


  excelDownload(tableID, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    document.getElementById(tableID).style.border = "1px solid black";
    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      var blob = new Blob(['\ufeff', tableHTML], {
        type: dataType
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }
  }


  deleteRow() { }

  selectedLevelOfRM(data){
    this.selectedLevelManager = data
  }
}
