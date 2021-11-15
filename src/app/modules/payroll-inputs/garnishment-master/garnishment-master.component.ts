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
  isshowtable: boolean = false;
  documentList: any;
  isEditMode: boolean = false;
  headData: { displayName: string; headMasterId: number; }[];
  garnishmentMasterTransactionTypeList: any = [];
  defaultTransactionType: any = 0;
  garnishmentMasterInputTypeList: any = [];
  defaultInputType: any = 0;
  docMandetory: any = 1;
  documentName: any;
  garnishmentMasterDocumentList: any = [];
  inputTypeData: any = [];
  transactionTypeData: any = []
  countryCode: any;
  isdCode: any = '';
  frequenciesData: any = []
  dropdownSettings: any;
  editFrequencyData: any[];

  constructor(private formbuilder: FormBuilder, private garnishmentService: GarnishmentService,
    private alertService: ToastrService) {

      // true = 1 and false = 0

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
      "familyMemberInfoId": new FormControl(1)
    });


    this.documentList = [{
      'srNo': 1,
      'documentName': 'abc'
    }]

    // this.headData = [
    //   { displayName: 'Incentive', headMasterId: 27 },
    //   { displayName: 'Performance_Incentive', headMasterId: 29 },
    // ]

    this.frequenciesData = [
      {
        "item_id": 1,
        "displayName": "Monthly",
        "item_text": "Month"
      },
      {
        "item_id": 2,
        "displayName": "Quarterly",
        "item_text": "Quarter"
      },
      {
        "item_id": 3,
        "displayName": "HalfYearly",
        "item_text": "HalfYear"
      },
      {
        "item_id": 4,
        "displayName": "Yearly",
        "item_text": "Year"
      },
      {
        "item_id": 5,
        "displayName": "SemiMonthly",
        "item_text": "SemiMonth"
      },
      {
        "item_id": 6,
        "displayName": "Weekly",
        "item_text": "Week"
      },
      {
        "item_id": 7,
        "displayName": "BiWeekly",
        "item_text": "BiWeek"
      }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }


  ngOnInit(): void {
    this.payrollheadmaster()
    this.getAllMasterData()
    this.setTypeData()
    this.getComplianceHeadNane()
    this.getInstitutionMaster()
    this.getLocationInformationOrCountryList()
    // this.getloanMasterAllDeductionHead()
    // this.getALLFrequecyDetails()
    this.getindianincometax()
  }

  /** e&d head */
  payrollheadmaster(){
    this.garnishmentService.payrollheadmaster().subscribe(res =>{
      this.headData = res.data.results
    })
  }

  /**set Array of input type and transaction type */
  setTypeData() {
    this.transactionTypeData = [
      {
        'transactionTypeName': 'Defined Date',
        'defaultTransactionType': true,
        "transactionTypeId": 1,
        "checked": true,
        "default": true
      },
      {
        'transactionTypeName': 'NoOfTransaction',
        'defaultTransactionType': false,
        "transactionTypeId": 2,
        "checked": false,
        "default": false
      },
      {
        'transactionTypeName': 'Perpetual',
        'defaultTransactionType': false,
        "transactionTypeId": 3,
        "checked": false,
        "default": false
      }
    ]

    this.garnishmentMasterTransactionTypeList.push({
      "defaultTransactionType": 1,
      "transactionTypeId": 1,
      "transactionTypeName": 'Defined Date'
    })


    this.inputTypeData = [
      {
        "inputTypeId": 1,
        "inputTypeName": "Percentage",
        "defaultInput": false,
        "checked": false,
        "default": false
      },
      {
        "inputTypeId": 1,
        "inputTypeName": "SDM",
        "defaultInput": false,
        "checked": false,
        "default": false
      },
      {
        "inputTypeId": 1,
        "inputTypeName": "Amount",
        "defaultInput": true,
        "checked": true,
        "default": true
      }
    ]


    this.garnishmentMasterInputTypeList.push({
      "defaultInput": 1,
      "inputTypeId": 1,
      "inputTypeName": "Amount"
    })
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

  /** Get selected institution */
  getInstitutionName(institutionName) {
    let alldata: any;
    this.institutionMasterData.forEach(element => {
      if (element.institutionName == institutionName) {
        alldata = element
      }
    });
    // console.log("alldata : " + JSON.stringify(alldata))
    this.garnishmentForm.patchValue(alldata)
    this.garnishmentForm.controls['description'].setValue(alldata.institutionName)
    let value = alldata.telephoneNumber.split(' ')
    this.isdCode = value[0]
    this.garnishmentForm.controls['phoneNumber'].setValue(value[1])
    this.garnishmentForm.controls['villege'].setValue(alldata.village)
  }

  /** Get Location Information Or CountryList */
  getLocationInformationOrCountryList() {
    this.garnishmentService.getLocationInformationOrCountryList().subscribe(res => {
      this.countryList = res.data.results;
    })

    this.garnishmentService.getCountryCodes().subscribe(res => {
      this.countryCode = res.data.results;
    });
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
    this.garnishmentService.getindianincometax().subscribe(res => {
      this.incomeTaxData = res.data.result;
    })
  }

  /**Get frequency data */
  getFrequencyData(value) {
    let val = value.split(',')
    this.garnishmentMasterFrequencyList.push({
      "frequencyid": parseInt(val[0]),
      "frequencyName": val[1]
    })

    this.garnishmentForm.controls['garnishmentMasterFrequencyList'].setValue(this.garnishmentMasterFrequencyList)
  }

  /** get selected frequency  */
  onSelectDataValue(event) {
    this.garnishmentMasterFrequencyList.push({
      "frequencyid": parseInt(event.item_id),
      "frequencyName": event.item_text + 'ly'
    })

    this.garnishmentForm.controls['garnishmentMasterFrequencyList'].setValue(this.garnishmentMasterFrequencyList)
  }

  /** de select frequency */
  deSelectValueListDataValue(event) {
    this.garnishmentMasterFrequencyList.forEach((element, index) => {
      if (element.frequencyid == event.item_id) {
        let ind = index;
        this.garnishmentMasterFrequencyList.splice(ind, 1)
      }
    });
    this.garnishmentForm.controls['garnishmentMasterFrequencyList'].setValue(this.garnishmentMasterFrequencyList)
  }

  /** get all selected frequency */
  onSelectAllValueListDataValue(event) {
    event.forEach((element, index) => {
      this.garnishmentMasterFrequencyList.push({
        "frequencyid": parseInt(element.item_id),
        "frequencyName": element.item_text + 'ly'
      })
    })
    this.garnishmentForm.controls['garnishmentMasterFrequencyList'].setValue(this.garnishmentMasterFrequencyList)

  }

  /** Get Transaction Type */
  getTransactionTypeCheck(event, type, id) {
    if (event.checked) {

      this.garnishmentMasterTransactionTypeList.push({
        "defaultTransactionType": this.defaultTransactionType,
        "transactionTypeId": id,
        "transactionTypeName": type
      })
    
    } else {
      if (this.garnishmentMasterTransactionTypeList.length > 0) {
        this.garnishmentMasterTransactionTypeList.forEach((element, index) => {
          if (element.transactionTypeName == type) {
            let ind = index;
            this.garnishmentMasterTransactionTypeList.splice(ind, 1)
          }
        })
      } else {
        this.garnishmentMasterTransactionTypeList = []
      }
    }
    console.log("JSON.transaction type: "+ JSON.stringify(this.garnishmentMasterTransactionTypeList))
  }

  /** Default value of Transaction type */
  getDefaultValueTransactionType(event, type, id) {
    if (event.checked) {
      this.defaultTransactionType = 1
      if (this.garnishmentMasterTransactionTypeList.length > 0) {
        this.garnishmentMasterTransactionTypeList.forEach((element, index) => {
          if (element.defaultTransactionType == 1) {
            element.defaultTransactionType = 0
           }
          if (element.transactionTypeName == type) {
            let ind = index;
            this.garnishmentMasterTransactionTypeList.splice(ind, 1, {
              "defaultTransactionType": this.defaultTransactionType,
              "transactionTypeId": id,
              "transactionTypeName": type
            })
          }
        })
      }
    } else {
      this.defaultTransactionType = 0
      if (this.garnishmentMasterTransactionTypeList.length > 0) {
        this.garnishmentMasterTransactionTypeList.forEach((element, index) => {
          if (element.transactionTypeName == type) {
            let ind = index;
            this.garnishmentMasterTransactionTypeList.splice(ind, 1, {
              "defaultTransactionType": this.defaultTransactionType,
              "transactionTypeId": id,
              "transactionTypeName": type
            })
          }
        })
      }
    }


    console.log("JSON.transaction type: "+ JSON.stringify(this.garnishmentMasterTransactionTypeList))

    this.transactionTypeData.forEach(element => {
      this.garnishmentMasterTransactionTypeList.forEach(ele => {
        if (element.transactionTypeName == ele.transactionTypeName) {
          element.default = ele.defaultTransactionType
        } 
      });
    });
  }

  /** Get Input Type */
  getInputTypeCheck(event, type, id) {
    if (event.checked) {
      this.garnishmentMasterInputTypeList.push({
        "defaultInput": this.defaultInputType,
        "inputTypeId": id,
        "inputTypeName": type
      })
    } else {
      if (this.garnishmentMasterInputTypeList.length > 0) {
        this.garnishmentMasterInputTypeList.forEach((element, index) => {
          if (element.transactionTypeName == type) {
            let ind = index;
            this.garnishmentMasterInputTypeList.splice(ind, 1)
          }
        })
      } else {
        this.garnishmentMasterInputTypeList = []
      }
    }

    console.log("JSON.input type: "+ JSON.stringify(this.garnishmentMasterInputTypeList))

  }

  /** Default value of Input Type */
  getDefaultValueInputType(event, type, id) {
    if (event.checked) {
      this.defaultInputType = 1
      if (this.garnishmentMasterInputTypeList.length > 0) {
        this.garnishmentMasterInputTypeList.forEach((element, index) => {
          if (element.defaultInput == 1) {
            element.defaultInput = 0
           }
          if (element.inputTypeName == type) {
            let ind = index;
            this.garnishmentMasterInputTypeList.splice(ind, 1, {
              "defaultInput": this.defaultInputType,
              "inputTypeId": id,
              "inputTypeName": type
            })
          }
        })
      }
    } else {
      this.defaultInputType = 0
      if (this.garnishmentMasterInputTypeList.length > 0) {
        this.garnishmentMasterInputTypeList.forEach((element, index) => {
          if (element.inputTypeName == type) {
            let ind = index;
            this.garnishmentMasterInputTypeList.splice(ind, 1, {
              "defaultInput": this.defaultInputType,
              "inputTypeId": id,
              "inputTypeName": type
            })
          }
        })
      }
    }

    console.log("JSON.input type: "+ JSON.stringify(this.garnishmentMasterInputTypeList))


    this.inputTypeData.forEach(element => {
      this.garnishmentMasterInputTypeList.forEach(ele => {
        if (element.inputTypeName == ele.inputTypeName) {
          element.default = ele.defaultInput
        } 
      });
    });
  }

  getDocMandatory(event) {
    if (event.checked) {
      this.docMandetory = 1
    } else {
      this.docMandetory = 0
    }
  }

  addDocumentList() {
    this.garnishmentMasterDocumentList.push({
      "documentName": this.documentName,
      "mandetory": this.docMandetory
    })
    this.documentName = ''
  }

  removeDocumentList(index) {
    this.garnishmentMasterDocumentList.splice(index, 1)
  }

  /** Save Master Data */
  saveMasterData() {
    this.garnishmentForm.removeControl('garnishmentMasterId')
    this.garnishmentForm.controls['empAccNoApplicable'].setValue(parseInt(this.garnishmentForm.controls['empAccNoApplicable'].value))
    this.garnishmentForm.controls['garnishmentMasterTransactionTypeList'].setValue(this.garnishmentMasterTransactionTypeList)
    this.garnishmentForm.controls['garnishmentMasterInputTypeList'].setValue(this.garnishmentMasterInputTypeList)
    this.garnishmentForm.controls['garnishmentMasterDocumentList'].setValue(this.garnishmentMasterDocumentList)


    // console.log("Save data is: "+ JSON.stringify(this.garnishmentForm.value))
    this.garnishmentService.savemasterdata(this.garnishmentForm.value).subscribe(res => {
      this.alertService.success("", "Garnishment master data saved successfully")
      this.garnishmentForm.addControl('garnishmentMasterId', new FormControl(''))
      this.editFlag = false;
      this.viewFlag = false;
      this.garnishmentForm.reset()
      this.getAllMasterData()
      this.garnishmentMasterDocumentList = []
      this.garnishmentMasterFrequencyList = []
      this.garnishmentMasterInputTypeList = []
      this.garnishmentMasterTransactionTypeList = []
      this.inputTypeData = []
      this.transactionTypeData = []
      this.setTypeData()
      this.garnishmentForm.controls['description'].disable()
      this.garnishmentForm.controls['phoneNumber'].disable()
      this.garnishmentForm.controls['emailId'].disable()
      this.garnishmentForm.controls['address1'].disable()
      this.garnishmentForm.controls['address2'].disable()
      this.garnishmentForm.controls['address3'].disable()
      this.garnishmentForm.controls['country'].disable()
      this.garnishmentForm.controls['pinCode'].disable()
      this.garnishmentForm.controls['state'].disable()
      this.garnishmentForm.controls['city'].disable()
      this.garnishmentForm.controls['villege'].disable()
    })
  }

  /** Edit Master data */
  editMasterData(data) {
    this.garnishmentService.masterDataGetById(data.garnishmentMasterId).subscribe(res => {
      this.editdata = res.data.results[0];
      this.garnishmentForm.patchValue(this.editdata)
      this.garnishmentMasterDocumentList = this.editdata.garnishmentMasterDocumentList
      this.garnishmentMasterFrequencyList = this.editdata.garnishmentMasterFrequencyList
      this.garnishmentMasterInputTypeList = this.editdata.garnishmentMasterInputTypeList
      this.garnishmentMasterTransactionTypeList = this.editdata.garnishmentMasterTransactionTypeList
      this.editFlag = true;
      this.viewFlag = false;
      this.garnishmentForm.enable()


      this.inputTypeData.forEach(input => {
        this.garnishmentMasterInputTypeList.forEach(editdata => {
          if (input.inputTypeName == editdata.inputTypeName) {
            input.checked = true
            input.default = editdata.defaultInput
          }
        });
      });

      this.transactionTypeData.forEach(input => {
        this.garnishmentMasterTransactionTypeList.forEach(editdata => {
          if (input.transactionTypeName == editdata.transactionTypeName) {
            input.checked = true
            input.default = editdata.defaultTransactionType
          }
        });
      });

      this.editFrequencyData = []
      this.garnishmentMasterFrequencyList.forEach(element => {
        let name = element.frequencyName.toString()
        let frequency = name.slice(0, -2);
        this.editFrequencyData.push(
          {
            item_id: element.frequencyid,
            item_text: frequency
          }
        )
      });

    })


    this.garnishmentForm.controls['nameOfInstitution'].disable()
    this.garnishmentForm.controls['description'].disable()
    this.garnishmentForm.controls['phoneNumber'].disable()
    this.garnishmentForm.controls['emailId'].disable()
    this.garnishmentForm.controls['address1'].disable()
    this.garnishmentForm.controls['address2'].disable()
    this.garnishmentForm.controls['address3'].disable()
    this.garnishmentForm.controls['country'].disable()
    this.garnishmentForm.controls['pinCode'].disable()
    this.garnishmentForm.controls['state'].disable()
    this.garnishmentForm.controls['city'].disable()
    this.garnishmentForm.controls['villege'].disable()
  }

  /** Update Master Data */
  updateMasterData() {
    this.garnishmentForm.controls['empAccNoApplicable'].setValue(parseInt(this.garnishmentForm.controls['empAccNoApplicable'].value))
    this.garnishmentForm.controls['garnishmentMasterTransactionTypeList'].setValue(this.garnishmentMasterTransactionTypeList)
    this.garnishmentForm.controls['garnishmentMasterInputTypeList'].setValue(this.garnishmentMasterInputTypeList)
    this.garnishmentForm.controls['garnishmentMasterDocumentList'].setValue(this.garnishmentMasterDocumentList)

    this.garnishmentService.updatemasterdata(this.garnishmentForm.value).subscribe(res => {
      this.alertService.success("", "Garnishment master data updated successfully")
      this.editFlag = false;
      this.viewFlag = false;
      this.garnishmentMasterDocumentList = []
      this.garnishmentMasterFrequencyList = []
      this.garnishmentMasterInputTypeList = []
      this.garnishmentMasterTransactionTypeList = []
      this.garnishmentForm.reset()
      this.getAllMasterData()
      this.inputTypeData = []
      this.transactionTypeData = []
      this.setTypeData()

      this.garnishmentForm.controls['description'].disable()
      this.garnishmentForm.controls['phoneNumber'].disable()
      this.garnishmentForm.controls['emailId'].disable()
      this.garnishmentForm.controls['address1'].disable()
      this.garnishmentForm.controls['address2'].disable()
      this.garnishmentForm.controls['address3'].disable()
      this.garnishmentForm.controls['country'].disable()
      this.garnishmentForm.controls['pinCode'].disable()
      this.garnishmentForm.controls['state'].disable()
      this.garnishmentForm.controls['city'].disable()
      this.garnishmentForm.controls['villege'].disable()
    })
  }

  /** Edit Master data */
  viewMasterData(data) {
    this.garnishmentService.masterDataGetById(data.garnishmentMasterId).subscribe(res => {
      this.editdata = res.data.results[0];
      this.garnishmentForm.patchValue(this.editdata)
      this.garnishmentMasterDocumentList = this.editdata.garnishmentMasterDocumentList
      this.garnishmentMasterFrequencyList = this.editdata.garnishmentMasterFrequencyList
      this.garnishmentMasterInputTypeList = this.editdata.garnishmentMasterInputTypeList
      this.garnishmentMasterTransactionTypeList = this.editdata.garnishmentMasterTransactionTypeList
      this.editFlag = false;
      this.viewFlag = true;
      this.garnishmentForm.disable()


      this.inputTypeData.forEach(input => {
        this.garnishmentMasterInputTypeList.forEach(editdata => {
          if (input.inputTypeName == editdata.inputTypeName) {
            input.checked = true
            input.default = editdata.defaultInput
          }
        });
      });

      this.transactionTypeData.forEach(input => {
        this.garnishmentMasterTransactionTypeList.forEach(editdata => {
          if (input.transactionTypeName == editdata.transactionTypeName) {
            input.checked = true
            input.default = editdata.defaultTransactionType
          }
        });
      });

    })
  }

  /** Reset Data */
  resetData() {
    this.editFlag = false;
    this.viewFlag = false;
    this.garnishmentForm.reset()
    this.garnishmentForm.enable()
    this.garnishmentMasterDocumentList = []
    this.garnishmentMasterFrequencyList = []
    this.garnishmentMasterInputTypeList = []
    this.garnishmentMasterTransactionTypeList = []
    this.inputTypeData = []
    this.transactionTypeData = []
    this.setTypeData()
    this.garnishmentForm.controls['description'].disable()
    this.garnishmentForm.controls['phoneNumber'].disable()
    this.garnishmentForm.controls['emailId'].disable()
    this.garnishmentForm.controls['address1'].disable()
    this.garnishmentForm.controls['address2'].disable()
    this.garnishmentForm.controls['address3'].disable()
    this.garnishmentForm.controls['country'].disable()
    this.garnishmentForm.controls['pinCode'].disable()
    this.garnishmentForm.controls['state'].disable()
    this.garnishmentForm.controls['city'].disable()
    this.garnishmentForm.controls['villege'].disable()
  }

}