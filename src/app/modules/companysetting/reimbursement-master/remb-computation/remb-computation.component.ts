import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { ReimbursementMasterService } from '../../reimbursement-master/reimbursement-master.service';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { DatePipe, DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-remb-computation',
  templateUrl: './remb-computation.component.html',
  styleUrls: ['./remb-computation.component.scss']
})
export class RembComputationComponent implements OnInit {
  public computationForm: FormGroup;
  public submitted: boolean = false;
  public bsConfig: Partial<BsDatepickerConfig>;
  public dropdownSettings = {};
  public taxableList = [];
  public lapsePayblelist = [];
  public today: any = new Date();
  public taxView = false;
  public lapseView = false;
  constructor(
    public fb: FormBuilder,
    private datePipe: DatePipe,
    private service: ReimbursementMasterService,
    public alertService: AlertServiceService,
  ) { }

  ngOnInit(): void {
console.log(this.service.getReimbursementSubmitData());
    this.computationForm = this.fb.group({
      reiMasterComputationSettingID: new FormControl(''),
      nonTaxableMethod: new FormControl('', Validators.required),
      nonTaxableSDMId: new FormControl(''),
      taxableMethodFNF: new FormControl('false'),
      taxableMethodLastCycle: new FormControl('false'),
      taxableMethodIntermediary: new FormControl('false'),
      taxableFrequency: new FormControl(''),
      taxablePeriodDefination: new FormControl(''),
      taxableNoOfCycle: new FormControl(''),
      lapseAccruedEntPayableFNF: new FormControl('false'),
      lapseAccruedEntPayableLastCycle: new FormControl('false'),
      lapseAccruedEntPayableIntermediary: new FormControl('false'),
      lapseAccruedEntPayableFrequency: new FormControl(''),
      LapseaccrentpayablePeriodDefinition: new FormControl(''),
      lapseAccruedEntPayableNoOfCycle: new FormControl(''),
      subBillMethod: new FormControl(''),
      subBillWithCount: new FormControl(''),
      billDateNotAllowedMethod: new FormControl(''),
      billDateNotAllowedCount: new FormControl(''),
      billLastFinYearClaimedInNextFinYear: new FormControl('2015-03-25'),
      unPaidBillCarryForward: new FormControl('false'),
      cyclewiseNumLineItemsAllowed: new FormControl(''),
      gapsBetwTwoHeadClaims: new FormControl(''),
      active: new FormControl('false'),
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };

    this.taxableList = [
      { id: 1, label: 'FNF' },
      { id: 2, label: 'Last Cycle ' },
      { id: 3, label: 'Intermediary' },
    ];
    this.lapsePayblelist = [
      { id: 1, label: 'FNF' },
      { id: 2, label: 'Last Cycle ' },
      { id: 3, label: 'Intermediary' },
    ];
  }

  get f() { return this.computationForm.controls; }

  submitComputationMaster() {
    this.submitted = true;
    // if (this.computationForm.invalid) {
    //   return;
    // }
   // console.log("this.generalform", this.computationForm.value);
    let postData = this.computationForm.getRawValue();
    // postData.reimbursementTrackingRequestDTO = this.computationForm;
    console.log('general Form',this.service.getReimbursementSubmitData());
    console.log("postdata", postData);
    let data : any;
    data = this.service.getReimbursementSubmitData();
    data.reimbursementMasterComputationSettingRequestDTO = this.computationForm.getRawValue();
    console.log(data);
    this.service.postReimbursementSubmitData(data).subscribe((res)=> {
      console.log("comp result", res);
      this.alertService.sweetalertMasterSuccess("Computation form submitted successfully", "");
      
      // console.log("templateUserId", this.templateUserIdList);
    })

  }

 

  onChangeFromDate() {
    const from = this.datePipe.transform(this.computationForm.get('billLastFinYearClaimedInNextFinYear').value, 'yyyy-MM-dd');
    console.log(from);
    this.today = new Date(from);

  }
// ...........................  Select box dropdown items events............


  onItemSelect(event) {
    let myevents = event;
    console.log("onItemSelect", event);
    console.log("onItemSelect", myevents.id);

    if (myevents.id == 3) {
      this.taxView = true;
    }

    if (myevents.id == 1) {
      this.computationForm.controls['taxableMethodFNF'].setValue("true");
    } else if (myevents.id == 2) {
      this.computationForm.controls['taxableMethodLastCycle'].setValue("true");
    } else if (myevents.id == 3) {
      this.computationForm.controls['taxableMethodIntermediary'].setValue("true");
    } else {
      this.computationForm.controls['taxableMethodFNF'].setValue("false");
      this.computationForm.controls['taxableMethodLastCycle'].setValue("false");
      this.computationForm.controls['taxableMethodIntermediary'].setValue("false");
    }
  }

  onSelectAll(event) {
    console.log("onSelectAll", event);
    let myevents = event[2].id;
    console.log("onItemSelectss", event);
    console.log("onItemSelectss", myevents);

    if (myevents == 3) {
      this.taxView = true;
    } else {
      this.taxView = false;
    }

  }

  onDeSelect(event) {
    let myevents = event;
    console.log("onItemSelect", event);
    console.log("onItemSelect", myevents.id);
    if (myevents.id == 3) {
      this.taxView = false;
    }
    if (myevents.id == 1) {
      this.computationForm.controls['taxableMethodFNF'].setValue("false");
    } else if (myevents.id == 2) {
      this.computationForm.controls['taxableMethodLastCycle'].setValue("false");
    } else if (myevents.id == 3) {
      this.computationForm.controls['taxableMethodIntermediary'].setValue("false");
    }
  }

  onDeSelectAll(event) {
    let myevents = event;
    console.log("onItemSelect", event);
    console.log("onItemSelect", myevents.label);

    if (myevents.id == 3) {
      this.taxView = false;
    } else {
      this.taxView = true;
    }
  }


  
  onItemSelectLapse(event) {
    let myevents = event;
    console.log("onItemSelect", event);
    console.log("onItemSelect", myevents.id);

    if (myevents.id == 3) {
      this.lapseView = true;
    }

    if (myevents.id == 1) {
      this.computationForm.controls['taxableMethodFNF'].setValue("true");
    } else if (myevents.id == 2) {
      this.computationForm.controls['taxableMethodLastCycle'].setValue("true");
    } else if (myevents.id == 3) {
      this.computationForm.controls['taxableMethodIntermediary'].setValue("true");
    } else {
      this.computationForm.controls['taxableMethodFNF'].setValue("false");
      this.computationForm.controls['taxableMethodLastCycle'].setValue("false");
      this.computationForm.controls['taxableMethodIntermediary'].setValue("false");
    }
  }

  onSelectAllLapse(event) {
    console.log("onSelectAll", event);
    let myevents = event[2].id;
    console.log("onItemSelectss", event);
    console.log("onItemSelectss", myevents);

    if (myevents == 3) {
      this.lapseView = true;
    } else {
      this.lapseView = false;
    }

  }

  onDeSelectLapse(event) {
    let myevents = event;
    console.log("onItemSelect", event);
    console.log("onItemSelect", myevents.id);
    if (myevents.id == 3) {
      this.lapseView = false;
    }
    if (myevents.id == 1) {
      this.computationForm.controls['taxableMethodFNF'].setValue("false");
    } else if (myevents.id == 2) {
      this.computationForm.controls['taxableMethodLastCycle'].setValue("false");
    } else if (myevents.id == 3) {
      this.computationForm.controls['taxableMethodIntermediary'].setValue("false");
    }
  }

  onDeSelectAllLapse(event) {
    let myevents = event;
    console.log("onItemSelect", event);
    console.log("onItemSelect", myevents.label);

    if (myevents.id == 3) {
      this.lapseView = false;
    } else {
      this.lapseView = true;
    }
  }

 
  
}
