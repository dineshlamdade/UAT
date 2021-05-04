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
  public nonTaxSelectedvalue = false;
  public rembGeneralId: number;
  public unPaidBill = ''
  constructor(
    public fb: FormBuilder,
    private datePipe: DatePipe,
    private service: ReimbursementMasterService,
    public alertService: AlertServiceService,
  ) { }

  ngOnInit(): void {
    console.log("sss", this.service.getReimbursementSubmitData());
    this.getRembIdValue();

    this.computationForm = this.fb.group({
      reiMasterComputationSettingID: new FormControl(''),
      reimbursementMasterGeneralSettingId: new FormControl(''),
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
      subBillWithCount: new FormControl('', Validators.required),
      billDateNotAllowedMethod: new FormControl(''),
      billDateNotAllowedCount: new FormControl('', Validators.required),
      billLastFinYearClaimedInNextFinYear: new FormControl('', Validators.required),
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
    window.scrollTo(0, 0);
    if (this.rembGeneralId > 0) {
      this.submitted = true;
      if (this.computationForm.invalid) {
        return;
      }
      // console.log("this.generalform", this.computationForm.value);
      let postData = this.computationForm.getRawValue();

      // postData.reimbursementTrackingRequestDTO = this.computationForm;
      console.log('general Form', this.service.getReimbursementSubmitData());
      console.log("postdata", postData);
      let data: any;
      data = this.service.getReimbursementSubmitData();
      // data.billLastFinYearClaimedInNextFinYear = this.datePipe.transform(this.computationForm.get('billLastFinYearClaimedInNextFinYear').value, 'MM-dd');
      data.reimbursementMasterComputationSettingRequestDTO = this.computationForm.getRawValue();
      console.log("json data", JSON.stringify(data));
      this.service.putReimbursementUpdateData(data).subscribe((res) => {
        console.log("comp result", res);
        this.alertService.sweetalertMasterSuccess("Computation form updated successfully", "");

        // console.log("templateUserId", this.templateUserIdList);
     })
     this.resetForm(); 
    } else {
      this.submitted = true;
      if (this.computationForm.invalid) {
        return;
      }
      // console.log("this.generalform", this.computationForm.value);
      let postData = this.computationForm.getRawValue();

      // postData.reimbursementTrackingRequestDTO = this.computationForm;
      console.log('general Form', this.service.getReimbursementSubmitData());
      console.log("postdata", postData);
      let data: any;
      data = this.service.getReimbursementSubmitData();
      // data.billLastFinYearClaimedInNextFinYear = this.datePipe.transform(this.computationForm.get('billLastFinYearClaimedInNextFinYear').value, 'MM-dd');
      data.reimbursementMasterComputationSettingRequestDTO = this.computationForm.getRawValue();
      console.log("json data", JSON.stringify(data));
      this.service.postReimbursementSubmitData(data).subscribe((res) => {
        console.log("comp result", res);
        this.alertService.sweetalertMasterSuccess("Computation form submitted successfully", "");

        // console.log("templateUserId", this.templateUserIdList);
      })
      this.resetForm(); 
    }
  }
  getRembIdValue() {
    let generalData = this.service.getReimbursementSubmitData();
    if (generalData == undefined) {
      console.log("No data available");
    } else {
      if (generalData.reimbursementMasterGeneralSettingId > 0) {
        this.rembGeneralId = generalData.reimbursementMasterGeneralSettingId;
        this.getViewgeneralById(this.rembGeneralId);
        console.log("rembids", generalData.reimbursementMasterGeneralSettingId);
      }
    }

  }


  getViewgeneralById(policyNo) {
    console.log("show data");
    window.scrollTo(0, 0);
    this.service.getGeneralTemplateViewById(policyNo).subscribe((res) => {
      console.log("results", res);
      let generalViewData = res.data.results[0].reimbursementMasterComputationSettingResponseDTO;
      this.computationForm.patchValue(generalViewData);
      // this.computationForm.disable();
      if (generalViewData.unPaidBillCarryForward == true) {
        this.unPaidBill = 'true';
      } else {
        this.unPaidBill = 'false';
      }
      let changeNonTaxValue = generalViewData.nonTaxableMethod;
      console.log("changeNonTaxValue", changeNonTaxValue);
      this.changeSelectedNonTaxvalue(changeNonTaxValue);
      this.onItemSelect(3);
    })

  }




  onChangeFromDate() {
    const yearDate = this.datePipe.transform(this.computationForm.get('billLastFinYearClaimedInNextFinYear').value, 'MM-dd');
    // console.log("form", yearDate);
    // this.today = new Date(yearDate);
    // console.log("yearDate", this.today);
    this.computationForm.controls['billLastFinYearClaimedInNextFinYear'].setValue(yearDate);
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

  //on change event value get
  changeSelectedNonTaxvalue(eventValue) {
    let nonTaxvalue = eventValue;
    if (nonTaxvalue == 'SDM') {
      this.nonTaxSelectedvalue = true;
    } else {
      this.nonTaxSelectedvalue = false;
    }
  }

  resetForm() {
    window.scrollTo(0, 0);
    this.computationForm.reset();

  }
}




