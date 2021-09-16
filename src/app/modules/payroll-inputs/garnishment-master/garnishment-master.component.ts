import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GarnishmentService } from './garnishment.service';


@Component({
  selector: 'app-garnishment-master',
  templateUrl: './garnishment-master.component.html',
  styleUrls: ['./garnishment-master.component.scss']
})
export class GarnishmentMasterComponent implements OnInit {
  garnishmentForm: FormGroup;
  garnishmentData: any;
  complianceHeadNanedata: any;
  institutionMasterData: any;
  countryList: any;
  loanDeductionData: any;
  frequencyData: any;
  incomeTaxData: any;
  editFlag: boolean = false;
  viewFlag: boolean = false;
  editdata: { [key: string]: any; };
  garnishmentMasterFrequencyList: any = [];


  constructor(private formbuilder: FormBuilder, private garnishmentService: GarnishmentService, private alertService: ToastrService) {
    this.garnishmentForm = new FormGroup({
      "garnishmentMasterId": new FormControl(''),
      "accountNoInPayeeBook": new FormControl(''),
      "address1": new FormControl(''),
      "address2": new FormControl(''),
      "address3": new FormControl(''),
      "city": new FormControl(''),
      "contactPerson": new FormControl(''),
      "country": new FormControl(''),
      "description": new FormControl(''),
      "emailId": new FormControl(''),
      "empAccNoApplicable": new FormControl(1),
      "empAccNoInCoBooksDisplayName": new FormControl(''),
      "empApplicationProcess": new FormControl(0),
      "familyMember": new FormControl(''),
      "garnishmentMasterDocumentList": new FormControl([]),
      "garnishmentMasterFrequencyList": new FormControl([]),
      "garnishmentMasterInputTypeList": new FormControl([]),
      "garnishmentMasterTransactionTypeList": new FormControl([]),
      "goal": new FormControl(1),
      "headMasterId": new FormControl(''),
      "incomeTaxGroup": new FormControl(1),
      "incomeTaxSection": new FormControl(''),
      "isActive": new FormControl(1),
      "nameOfInstitution": new FormControl(''),
      "nature": new FormControl(''),
      "pan": new FormControl(''),
      "phoneNumber": new FormControl(''),
      "pinCode": new FormControl(''),
      "remark": new FormControl(''),
      "standardName": new FormControl(''),
      "state": new FormControl(''),
      "villege": new FormControl(''),
    });

  }


  ngOnInit(): void {
    this.getAllMasterData()
    this.getComplianceHeadNane()
    this.getInstitutionMaster()
    this.getLocationInformationOrCountryList()
    this.getloanMasterAllDeductionHead()
    this.getALLFrequecyDetails()
    this.getindianincometax()
  }


  /** Get All summary data */
  getAllMasterData() {
    this.garnishmentService.getAllGarnishmentMaster().subscribe(res => {
      this.garnishmentData = res.data.results;
    })
  }

  /** Get Compliance Head Nane */
  getComplianceHeadNane() {
    this.garnishmentService.getComplianceHeadNane().subscribe(res => {
      this.complianceHeadNanedata = res.data.results;
    })
  }

  /** Get Institution Master */
  getInstitutionMaster() {
    this.garnishmentService.getInstitutionMaster().subscribe(res => {
      this.institutionMasterData = res.data.results;
    })
  }

  /** Get Location Information Or CountryList */
  getLocationInformationOrCountryList() {
    this.garnishmentService.getLocationInformationOrCountryList().subscribe(res => {
      this.countryList = res.data.results;
    })
  }

  /** Check pincode and set city state etc */
  getPermanentAddressFromPIN() {
    if (this.garnishmentForm.get('pinCode').value.length < 6) {
      this.garnishmentForm.get('state').setValue('');
      this.garnishmentForm.get('city').setValue('');
    }
    if (this.garnishmentForm.get('pinCode').value.length == 6 && this.garnishmentForm.get('country').value == 'India') {
      this.garnishmentService.getAddressFromPIN(this.garnishmentForm.get('pinCode').value).subscribe(res => {
        console.log(res);
        this.garnishmentForm.get('state').setValue(res.data.results[0].state);
        this.garnishmentForm.get('city').setValue(res.data.results[0].city);


      }, (error: any) => {
        this.alertService.error(error['error']['status']['messsage']);

      });
    }
  }

  /** Get Loan Master All Deduction Head */
  getloanMasterAllDeductionHead() {
    this.garnishmentService.getloanMasterAllDeductionHead().subscribe(res => {
      this.loanDeductionData = res;
    })
  }

  /** get ALL Frequecy Details */
  getALLFrequecyDetails() {
    this.garnishmentService.getALLFrequecyDetails().subscribe(res => {
      this.frequencyData = res.data.result;
      console.log("frequenct: " + JSON.stringify(this.frequencyData))
    })
  }

  /**get indian income tax */
  getindianincometax() {
    // this.garnishmentService.getindianincometax().subscribe(res => {
    //   this.incomeTaxData = res.data.result;
    // })
  }

  /**Get frequency data */
  getFrequencyData(value){
    this.garnishmentMasterFrequencyList.push({
      "frequencyid":1,
      "frequencyName": value
    })

    this.garnishmentForm.controls['garnishmentMasterFrequencyList'].setValue(this.garnishmentMasterFrequencyList)
  }

  /** Save Master Data */
  saveMasterData() {
    this.garnishmentForm.removeControl('garnishmentMasterId')
    this.garnishmentService.savemasterdata(this.garnishmentForm.value).subscribe(res => {
      this.alertService.success("", "Garnishment master data saved successfully")
      this.editFlag = false;
      this.viewFlag = false;
      this.garnishmentForm.reset()
      this.getAllMasterData()
    })
  }

  /** Edit Master data */
  editMasterData(data) {
    this.garnishmentService.masterDataGetById(data.garnishmentMasterId).subscribe(res => {
      this.editdata = res.data.results[0];
      this.garnishmentForm.patchValue(this.editdata)
      this.editFlag = true;
      this.viewFlag = false;
      this.garnishmentForm.enable()
    })
  }

  /** Save Master Data */
  updateMasterData() {
    this.garnishmentService.updatemasterdata(this.garnishmentForm.value).subscribe(res => {
      this.alertService.success("", "Garnishment master data updated successfully")
      this.editFlag = false;
      this.viewFlag = false;
      this.garnishmentForm.reset()
      this.getAllMasterData()
    })
  }

  /** Edit Master data */
  viewMasterData(data) {
    this.garnishmentService.masterDataGetById(data.garnishmentMasterId).subscribe(res => {
      this.editdata = res.data.results[0];
      this.garnishmentForm.patchValue(this.editdata)
      this.editFlag = false;
      this.viewFlag = true;
      this.garnishmentForm.disable()
    })
  }

  /** Reset Data */
  resetData() {
    this.editFlag = false;
    this.viewFlag = true;
    this.garnishmentForm.reset()
    this.garnishmentForm.enable()

  }

}