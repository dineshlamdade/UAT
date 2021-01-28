import { ChangeDetectorRef, Component, OnInit, TemplateRef  } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs/internal/observable/of';
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
  public sequence: Array<any>;
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

  constructor(private formBuilder: FormBuilder,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private service: workflowService,
              private alertService: AlertServiceService,
              private modalService: BsModalService) {
    this.form = this.formBuilder.group({
      active: new FormControl(true),
      autoApproval: new FormControl(false),
      changeOfApproverByManager: new FormControl(false),
      defined: new FormControl(false),
      definedTemplateId: new FormControl(null),
      description: new FormControl(null, Validators.required),
      numberOfApprover: new FormControl(null, Validators.required),
      remark: new FormControl(null),
      workflowCode: new FormControl(null, Validators.required),
      workflowMasterHeaderId: new FormControl(0),
    });

    this.reassignedSequenceArrayForm = formBuilder.group({
      active: new FormControl(true),
      approverMethod: new FormControl(null),
      levelOfRM: new FormControl(null),
      sdm: new FormControl(null),
      sequence: new FormControl(null),
      workflowMasterHeaderId: new FormControl(null),
      workflowResequenceId: new FormControl(null),
    });

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

    numberofApproverValidation(data) {
      data = parseInt(data);
      this.sequence = [];

      // this.arrayApproverMaster = [];

      if ((data > 0) || (data != null)) {
            if ((this.form.get('workflowMasterHeaderId').value === 0) || (this.form.get('workflowMasterHeaderId').value === null)) {
              this.arrayApproverMaster = [];
              this.deleteApproverListsButtonShow = false;
              for (let i = 1; i <= data;  i++) {
                  this.arrayApproverMaster.push({
                        approverMethod: null,
                       // approverMethodAtNextLevel: '',
                        levelOfRM: null,
                       // levelOfRMAtNextLevel: null,
                        numberOfDays: null,
                        sdm: null,
                       // sdmAtNextLevel: null,
                        sequence: i,
                        treatmentUnActionedPlan: null,
                        workflowMasterApproverId: 0,
                        workflowMasterHeaderId: 0,
                        // sequenceAtNextLevel:null,
                      });
                    }
              } else {
              const length = data - this.arrayApproverMaster.length;
              if (length >= 0) {
                        for (let i = 0; i < length;  i++) {
                          this.arrayApproverMaster.push({
                                approverMethod: null,
                                approverMethodAtNextLevel: '',
                                levelOfRM: null,
                                levelOfRMAtNextLevel: null,
                                numberOfDays: null,
                                sdm: null,
                                sdmAtNextLevel: null,
                                sequence: (this.arrayApproverMaster.length + 1),
                                treatmentUnActionedPlan: null,
                                workflowMasterApproverId: 0,
                                workflowMasterHeaderId: 0,
                                // sequenceAtNextLevel:null,
                              });
                            }
                      } else {
                        // this.alertService.sweetalertWarning('Please Delete '+ length*-1 + ' lists from Approver Table');
                    this.deleteApproverListsButtonShow = true;
                      }
              }
          }
          // for (let i = 1; i <= this.arrayApproverMaster.length;  i++){
          //   this.sequence.push(i);
          // }
      if ((this.form.get('workflowMasterHeaderId').value === 0) || (this.form.get('workflowMasterHeaderId').value === null)) {
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < this.arrayApproverMaster.length;  i++) {
            // this.sequence.push(i);
              const tempvar = [];
              for (let j = 1; j <= this.arrayApproverMaster.length;  j++) {
                  tempvar.push(j);
              }
              this.sequence = this.sequence.concat([tempvar]);

            }
          } else {
            for (let i = 0; i < this.arrayApproverMaster.length;  i++) {
              const tempvar = [];
              for (let j = 1; j <= this.form.get('numberOfApprover').value;  j++) {
                  tempvar.push(j);
              }
              if (this.arrayApproverMaster[i].sequence > this.form.get('numberOfApprover').value) {
                const tempSeq = parseInt(this.arrayApproverMaster[i].sequence);
                tempvar.push(tempSeq);
                }
              this.sequence = this.sequence.concat([tempvar]);

            }
          }
    }

  ngOnInit() {

    this.service.getWorkflowMaster().subscribe((res) => {
      console.log(res);
      this.summary = res.data.results;
    });

    this.service.getWorkflowMasterTemplateDriven().subscribe((data) => {
      console.log(data.data.results);
      this.templatedefinedArray = data.data.results;
    });

    const definedTemplate = this.form.get('definedTemplateId');
    const numberOfApprover = this.form.get('numberOfApprover');
    const remark = this.form.get('remark');

    this.form.get('autoApproval').valueChanges.subscribe((data) => {
      if (data === true) {
  // this.noOfApprovers  = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  numberOfApprover.setValue(0);
  numberOfApprover.disable();
  this.deleteApproverListsButtonShow = false;
      } else {
        numberOfApprover.enable();
        numberOfApprover.setValue(null);
        // this.noOfApprovers  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        }

    });
    this.form.get('defined').valueChanges.subscribe((data) => {
      if (data === false) {
       // numberOfApprover.enable();
          numberOfApprover.setValidators([Validators.required]);
          definedTemplate.clearValidators();
          definedTemplate.setValue(null);
          // definedTemplate.disable();
        } else {
        // definedTemplate.enable();
          definedTemplate.setValidators([Validators.required]);
          numberOfApprover.clearValidators();
         // numberOfApprover.disable();
          numberOfApprover.setValue(null);
          // if(this.form.get('workflowMasterHeaderId').value ===0) {

          // }
      }
    });
    this.form.get('numberOfApprover').valueChanges.subscribe((data) => {
      this.sequence = [];

      // this.arrayApproverMaster = [];

      if ((data > 0) || (data != null)) {
            if ((this.form.get('workflowMasterHeaderId').value === 0) || (this.form.get('workflowMasterHeaderId').value === null)) {
              this.arrayApproverMaster = [];
              this.deleteApproverListsButtonShow = false;
              for (let i = 1; i <= data;  i++) {
                  this.arrayApproverMaster.push({
                        approverMethod: null,
                       // approverMethodAtNextLevel: '',
                        levelOfRM: null,
                       // levelOfRMAtNextLevel: null,
                        numberOfDays: null,
                        sdm: null,
                       // sdmAtNextLevel: null,
                        sequence: i,
                        treatmentUnActionedPlan: null,
                        workflowMasterApproverId: 0,
                        workflowMasterHeaderId: 0,
                        // sequenceAtNextLevel:null,
                      });
                    }
              } else {
              const length = data - this.arrayApproverMaster.length;
              if (length >= 0) {
                        for (let i = 0; i < length;  i++) {
                          this.arrayApproverMaster.push({
                                approverMethod: null,
                                approverMethodAtNextLevel: '',
                                levelOfRM: null,
                                levelOfRMAtNextLevel: null,
                                numberOfDays: null,
                                sdm: null,
                                sdmAtNextLevel: null,
                                sequence: (this.arrayApproverMaster.length + 1),
                                treatmentUnActionedPlan: null,
                                workflowMasterApproverId: 0,
                                workflowMasterHeaderId: 0,
                                // sequenceAtNextLevel:null,
                              });
                            }
                      } else {
                        // this.alertService.sweetalertWarning('Please Delete '+ length*-1 + ' lists from Approver Table');
                    this.deleteApproverListsButtonShow = true;
                      }
              }
          }
          // for (let i = 1; i <= this.arrayApproverMaster.length;  i++){
          //   this.sequence.push(i);
          // }
      if ((this.form.get('workflowMasterHeaderId').value === 0) || (this.form.get('workflowMasterHeaderId').value === null)) {
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < this.arrayApproverMaster.length;  i++) {
            // this.sequence.push(i);
              const tempvar = [];
              for (let j = 1; j <= this.arrayApproverMaster.length;  j++) {
                  tempvar.push(j);
              }
              this.sequence = this.sequence.concat([tempvar]);

            }
          } else {
            for (let i = 0; i < this.arrayApproverMaster.length;  i++) {
              const tempvar = [];
              for (let j = 1; j <= this.form.get('numberOfApprover').value;  j++) {
                  tempvar.push(j);
              }
              if (this.arrayApproverMaster[i].sequence > this.form.get('numberOfApprover').value) {
                const tempSeq = parseInt(this.arrayApproverMaster[i].sequence);
                tempvar.push(tempSeq);
                }
              this.sequence = this.sequence.concat([tempvar]);

            }
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

  public hideApproverDeleteOption(i: number): void {
    this.arrayApproverMaster.splice(i, 1);
    const length = this.form.get('numberOfApprover').value;
    this.deleteApproverListsButtonShow = this.arrayApproverMaster.length <= length ? false : true;
  }

  public sequenceTableValidation(i, item): void {
    console.log(this.sequence[i][this.form.get('numberOfApprover').value]);
    const temp = parseInt(this.form.get('numberOfApprover').value);
    this.sequence[i].splice(temp, 1);
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
      if (val.treatmentUnActionedPlan) {
        if (val.treatmentUnActionedPlan === 'Reassign') {
          if ((!val.approverMethodAtNextLevel ) || (!val.levelOfRMAtNextLevel) || (!val.sdmAtNextLevel) || (!val.sequenceAtNextLevel)) {}
        }
      }

    });
  }

  submit() {
    if (this.form.invalid) {
      this.alertService.sweetalertWarning('Please fill all the Red Marked Input fields');
      return;
    }

    if (this.deleteApproverListsButtonShow) {
      const length = this.arrayApproverMaster.length - parseInt(this.form.get('numberOfApprover').value );
      this.alertService.sweetalertWarning('Please Delete ' + length + ' lists from Approver Table');
      return;
    }

    let returnflag: boolean;

    if (this.form.get('numberOfApprover').value) {
      this.arrayApproverMaster.forEach((val, index) => {
        if (val.sequence > this.form.get('numberOfApprover').value) {
          this.alertService.sweetalertWarning('Please fill valid sequence at ' + (index + 1));
          returnflag = true;
          return;
        }
        if (!val.approverMethod) {
          this.alertService.sweetalertWarning('Please fill data in Method Of Approval');
          return;
        } else {
          if (val.approverMethod === 'Reporting Manager') {
           if (!val.levelOfRM) { this.alertService.sweetalertWarning('Please fill data in Level Of Reporting Manager');
                                 return; }
          } else {
            if (!val.sdm) { this.alertService.sweetalertWarning('Please fill data in Level Of Reporting Manager');
                            return; }
          }
        }
        if (!val.treatmentUnActionedPlan) {
          this.alertService.sweetalertWarning('Please fill data in Treatment- Unactioned Application');
          return;
        } else {
          if (val.treatmentUnActionedPlan === 'Reassign') {
           if ((!this.reassignedSequenceArray.find((x) => x.sequence === parseInt(val.sequence)))) { this.alertService.sweetalertWarning('Please click on Add button below action button to add Reassign Application details for' + val.sequence);
                                                                                                     return;
                  }
          }
        }

        if (!val.numberOfDays) { this.alertService.sweetalertWarning('Please fill data in Post- No. Of Days');
                                 return; }
      });
    }

    this.arrayApproverMaster.sort((a, b) => a.sequence - b.sequence);
    const data = {
      approverMasterRequestDTO: this.arrayApproverMaster,
      resequenceDetailsRequestDTO: this.reassignedSequenceArray,
      workflowMasterHeaderRequestDTO: this.form.getRawValue(),
    };
    console.log('result:', data);
    if (returnflag) {
  return;
}
    if (this.form.get('workflowMasterHeaderId').value === 0) {
      this.service.postWorkFlowMaster(data).subscribe((res) => {
        console.log(res.data);
        this.alertService.sweetalertMasterSuccess(res.status.result, res.status.messages);
        this.reset();
        this.summary = res.data.results[0];
      }, (error: any) => {
        console.log();
        this.alertService.sweetalertWarning(error.error.status.messsage);
      });
    } else {
      this.service.putWorkFlowMaster(data).subscribe((res) => {
        console.log(res);
        this.summary = res.data.results[0];
        this.alertService.sweetalertMasterSuccess(res.status.result, res.status.messages);
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
      active: true,
      numberOfApprover: null,
    });
    this.cancelButtonShow = false;
  }

  unactionedAppValidation(index) {
    if (this.arrayApproverMaster[index].treatmentUnActionedPlan === 'Auto Approval')  {
      this.arrayApproverMaster[index].approverMethodAtNextLevel = '';
      this.arrayApproverMaster[index].levelOfRMAtNextLevel = null;
      this.arrayApproverMaster[index].sdmAtNextLevel = null;
      // this.arrayApproverMaster[index].sequenceAtNextLevel = null;
    }
  }

  approverMethodValidation(index) {
    this.arrayApproverMaster[index].approverMethod === 'Reporting Manager' ?
    this.arrayApproverMaster[index].sdm = null : this.arrayApproverMaster[index].levelOfRM = null;
  }

  approverMethodAtNextLevelValidation(index) {
    this.arrayApproverMaster[index].approverMethodAtNextLevel === 'Reporting Manager' ?
    this.arrayApproverMaster[index].sdmAtNextLevel = null : this.arrayApproverMaster[index].levelOfRMAtNextLevel = null;
  }

  edit(item) {
    console.log(item);
    this.scrollToTop();
    this.form.enable();
    this.arrayApproverMaster = [];
    this.form.get('workflowCode').disable();
    this.deleteApproverListsButtonShow = false;
    this.arrayApproverMaster = item.approverMasterResponseDTO;
    if (item.workflowMasterHeaderResponseDTO.numberOfApprover !== item.approverMasterResponseDTO.length) {
      for (let i = item.workflowMasterHeaderResponseDTO.numberOfApprover; i <= item.approverMasterResponseDTO.length; i ++) {
        this.arrayApproverMaster.splice(-1, 1);
        console.log(i);
      }
    }
    this.form.patchValue(item.workflowMasterHeaderResponseDTO);
    this.cancelButtonShow = false;
    console.log(item);
    this.reassignedSequenceArray = item.resequenceDetailsResponseDTO;

  }

  view(item) {
  this.edit(item);
  this.form.disable();
  this.form.get('numberOfApprover').setValue(item.workflowMasterHeaderResponseDTO.numberOfApprover);
  this.cancelButtonShow = true;
  }

  public reassignedValidation(template: TemplateRef<any>, item): void {
    this.approverSequence = item.sequence;
    console.log(this.reassignedSequenceArray);
    this.reassignedSequenceArrayPopUp = this.reassignedSequenceArray.filter((o) =>  o.sequence === item.sequence );
    console.log(this.reassignedSequenceArrayPopUp);
    this.workflowMasterHeaderId = item.workflowMasterHeaderId;
    this.reassignedSequenceArrayForm.get('workflowMasterHeaderId').setValue(item.workflowMasterHeaderId);
    this.reassignedSequenceArrayForm.get('sequence').setValue(this.approverSequence);
    console.log(this.approverSequence);
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' }),
    );
  }

  public submitReassigned(): void {
    console.log(this.reassignedSequenceArrayForm.value);
    const temp = this.reassignedSequenceArrayForm.get('sequence').value;
    const id = this.reassignedSequenceArrayForm.get('workflowMasterHeaderId').value;
    this.reassignedSequenceArray.push(this.reassignedSequenceArrayForm.value);
    this.reassignedSequenceArrayForm.reset();
    this.reassignedSequenceArrayForm.get('sequence').setValue(temp);
    this.reassignedSequenceArrayForm.get('active').setValue(true);
    this.reassignedSequenceArrayForm.get('workflowMasterHeaderId').setValue(id);
  }

  public editReassignMethodDetails(item: Array<any>): void {
    this.reassignedSequenceArrayForm.patchValue(item);
    this.addReassignedButtonPopup = false;
  }

  public updateReassignMethodDetails(i): void {
    this.addReassignedButtonPopup = true;
    this.reassignedSequenceArrayPopUp[i] = this.reassignedSequenceArrayForm.getRawValue();
    this.reassignedSequenceArrayForm.reset();

  }

  /**
   * delete Reassign Method Details
   */
  public deleteReassignMethodDetails(i) {
    this.reassignedSequenceArray.splice(i, 1);
  }

}
