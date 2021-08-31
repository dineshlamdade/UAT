import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,FormGroupDirective,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GarnishmentService } from './garnishment.service';


@Component({
  selector: 'app-garnishment-master',
  templateUrl: './garnishment-master.component.html',
  styleUrls: ['./garnishment-master.component.scss']
})
export class GarnishmentMasterComponent implements OnInit {
  public submitted = false;
  summaryHtmlDataList: Array<any> = [];
  showButtonSaveAndReset: boolean = true;

  deductionHeadList: Array<any> = [];
  companyRegistrationMasterList: Array<any> = [];
  masterGridDataList: Array<any> = [];
  nameOfInstitution: number = 0;
  isSaveAndReset: boolean = true;
  isEditMode: boolean = false;
  tempObjForGarnishmentMaster: any;
  tempObjForComplianceHeadMaster: any;
  tempObjForInstitutionMaster: any;
  public form: any = FormGroup;
  // GarnishmentService: any;
  formulaList: Array<any> = [];
  sdmList: Array<any> = [];
  frequencyList: Array<any> = [];
  arningHeadlist: Array<any> = [];
  hideRemarkDiv: boolean;
  documentId: number = 0;

  // thirdPartyMasterId: number = 0;
  incomeTexList: Array<any> = [];
  countryList: Array<any> = [];
  pinCodeList: Array<any> = [];
  complianceHeadNameList: Array<any> = [];
  complianceInstitutionMasterDetails: Array<any> = [];
  complianceInstitutionMasterDetails1: Array<any> = [];
  MasterHead: Array<any> = [];




  constructor(private formbuilder: FormBuilder,
     private garnishmentService: GarnishmentService,
    private alertService: ToastrService) 
    {
    this.form = this.formbuilder.group({
      nameOfInstitution: new FormControl('', Validators.required),
      complianceHeadName: new FormControl(''),
      label: new FormControl(''),
      documentId: new FormControl(1),
      headMasterId: new FormControl(null, Validators.required),
      thirdPartyMasterId: new FormControl(0),
      description: new FormControl(null, Validators.required),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      contactPerson: new FormControl(null, Validators.required),
      emailId: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null, Validators.required),
      address3: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      pinCode: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      villege: new FormControl(null, Validators.required),
      pan: new FormControl(null, Validators.required),
      accountNoInPayeeBook: new FormControl(null, Validators.required),
      standardName: new FormControl(null, Validators.required),
      formula: new FormControl(null, Validators.required),
      sdm: new FormControl(null, Validators.required),
      frequency: new FormControl(null, Validators.required),
      investmentSection: new FormControl(null, Validators.required),
      familyMember: new FormControl('1'),
      remark: new FormControl(null, Validators.required),
      active: new FormControl('0'),
      generalRemark: new FormControl(null, Validators.required),

    });


  }


  ngOnInit(): void {
    this.refreshHtmlTableData();
    // -------------------- Get All  country -------------------------
    this.garnishmentService.getLocationInformationOrCountryList().subscribe((res) => {
      console.log('country', res);
      const test2 = res.data.results;
      test2.forEach((element) => {

        const obj = {
          label: element,
          value: element,
        };
        this.countryList.push(obj);
      });
    });

    // -------------------- Get All  Heads -------------------------
    this.garnishmentService.getloanMasterAllDeductionHead().subscribe((res) => {
      this.MasterHead = res;
      console.log('dedection', res);

      res.forEach((element) => {

        const obj = {
          label: element.standardName,
          value: element.standardName,
        };
        this.deductionHeadList.push(obj);
      });
    });

    //-------------------- Get All Fomula data api -------------------------
    this.garnishmentService.getFromuladetails().subscribe((res) => {
      console.log(res);
      const test = res;
      test.data.results.forEach((element) => {
        const obj = {
          label: element.formulaName,
          value: element.formulaName,
        };
        this.formulaList.push(obj);
      });
    });

    //-------------------- Get All for sdm details -------------------------
    this.garnishmentService.getSDMdetails().subscribe((res) => {
      console.log(res);
      const test = res;
      test.data.results.forEach((element) => {
        const obj = {
          label: element.sdmSchemaName,
          value: element.sdmSchemaName,
        };
        this.sdmList.push(obj);
      });
    });

    //--------------------  GET ALL FrequecyDetails-------------------------
    this.garnishmentService.getALLFrequecyDetails().subscribe((res) => {
      console.log(res);
      const test1 = res;
      test1.data.results.forEach((element) => {
        const obj = {
          label: element.name,
          value: element.name,
        };
        this.frequencyList.push(obj);
      });
    });

    //--------------------  GET income text  Description-------------------------
    this.garnishmentService.getindianincometax().subscribe((res) => {
      console.log(res);
      const test1 = res;
      this.incomeTexList = test1.data.results
      // test1.data.results.forEach((element) => {
      //   const obj = {
      //     label: element.description,
      //     value: element.description,
      //   };
      //   this.incomeTexList.push(obj);
      // });
    });

    //-----------------------Get  compliance  head  Name  API ------------------------------

    //  this.garnishmentService.getComplianceHeadNane().subscribe((res) => {
    //   console.log(res);
    //   const test1 = res;
    //   test1.data.results.forEach((element) => {
    //     const obj = {
    //       label: element.complianceHeadName,
    //       value: element.complianceHeadName,
    //     };
    //     this.complianceHeadNameList.push(obj);
    //   });
    // });
    this.garnishmentService.getComplianceHeadNane().subscribe((res) => {
      this.tempObjForComplianceHeadMaster = res.data.results;
      console.log('getComplianceHeadNane:', this.tempObjForComplianceHeadMaster);
      // res.data.results.forEach((element) => {
      //   const obj = {
      //     label: element.complianceHeadName,
      //     value: element.complianceHeadId,
      //   };
      //   this.complianceHeadNameList.push(obj);
      // });
    });

   



    this.deactivateRemark();

  }

  // success(res) {
  //   console.log('summaryHtmlDataList::', res);
  //   this.summaryHtmlDataList = res.data.results;

  //   console.log('summaryHtmlDataList2::', this.summaryHtmlDataList);
  // }

  // failed(data) {
  //   console.log('err',data)
  // }
  checkLocalAddress() {
  }
  getPermanentAddressFromPIN() {
    console.log(this.form.get('pinCode').value);
    if (this.form.get('pinCode').value.length < 6) {
      this.form.get('state').setValue('');
      this.form.get('city').setValue('');
    }
    if (this.form.get('pinCode').value.length == 6 && this.form.get('country').value == 'India') {
      this.garnishmentService.getAddressFromPIN(this.form.get('pinCode').value).subscribe(res => {
        console.log(res);
        this.form.get('state').setValue(res.data.results[0].state);
        this.form.get('city').setValue(res.data.results[0].city);


      }, (error: any) => {
        this.alertService.error(error['error']['status']['messsage']);

      });
    }
  }



  refreshHtmlTableData() {
   this.garnishmentService.getGarnishmentMaster().subscribe(res =>{
     this.summaryHtmlDataList = res.data.results;
   })

    console.log('this.summaryHtmlDataList', this.summaryHtmlDataList);

  }

  // --------------- Deactivate the Remark -------------------
  deactivateRemark() {
    if (this.form.value.active === false) {
      // this.form.get('remark').enable();
      this.hideRemarkDiv = true;
      this.form.get('generalRemark').setValidators([Validators.required]);
    } else {
      this.form.get('generalRemark').clearValidators();
      this.hideRemarkDiv = false;
      //this.form.get('remark').disable();
      this.form.get('generalRemark').reset();
    }
  }

  save() {
    console.log(this.form);
    if (this.form.get('thirdPartyMasterId').value > 0) {
      const data = {
        nameOfInstitution: this.form.get('nameOfInstitution').value,
        complianceHeadName: this.form.get('complianceHeadName').value,
        thirdPartyMasterId: this.form.get('thirdPartyMasterId').value,
        documentId: this.form.get('documentId').value,
        headMasterId: this.form.get('headMasterId').value,
        description: this.form.get('description').value,
        contactPerson: this.form.get('contactPerson').value,
        contactNumber: this.form.get('contactNumber').value,
        emailId: this.form.get('emailId').value,
        address1: this.form.get('address1').value,
        address2: this.form.get('address2').value,
        address3: this.form.get('address3').value,
        country: this.form.get('country').value,
        pinCode: this.form.get('pinCode').value,
        state: this.form.get('state').value,
        city: this.form.get('city').value,
        villege: this.form.get('villege').value,
        pan: this.form.get('pan').value,
        accountNoInPayeeBook: this.form.get('accountNoInPayeeBook').value,
        standardName: this.form.get('standardName').value,
        formula: this.form.get('formula').value,
        sdm: this.form.get('sdm').value,
        frequency: this.form.get('frequency').value,
        investmentSection: this.form.get('investmentSection').value,
        familyMember: this.form.get('familyMember').value,
        remark: this.form.get('remark').value


      };
      console.log('garnishment Data', data);
      console.log(JSON.stringify(data));

      this.garnishmentService.updateGarnishmentMasterDetails(data).subscribe(res => {
        console.log('after save..', res);
        if (res.data.results.length > 0) {
          console.log('data is updated');

          this.alertService.success(res.data.messsage, '');
          this.form.get('nameOfInstitution').disable();
          this.isSaveAndReset = true;
          this.showButtonSaveAndReset = true;
          this.form.reset();
          this.isEditMode = false;
          this.refreshHtmlTableData();
        } else {
          this.alertService.warning(res.status.messsage);
        }

        this.form.reset();
      }, (error: any) => {
        this.alertService.error(error["error"]["status"]["messsage"]);
      });
    }
    else {
      console.log('clcicked on new record save button');

      const data = {
        nameOfInstitution: this.form.get('nameOfInstitution').value,
        complianceHeadName: this.form.get('complianceHeadName').value,
        documentId: this.form.get('documentId').value,
        headMasterId: this.form.get('headMasterId').value,
        description: this.form.get('description').value,
        contactPerson: this.form.get('contactPerson').value,
        contactNumber: this.form.get('contactNumber').value,
        emailId: this.form.get('emailId').value,
        address1: this.form.get('address1').value,
        address2: this.form.get('address2').value,
        address3: this.form.get('address3').value,
        country: this.form.get('country').value,
        pinCode: this.form.get('pinCode').value,
        state: this.form.get('state').value,
        city: this.form.get('city').value,
        villege: this.form.get('villege').value,
        pan: this.form.get('pan').value,
        accountNoInPayeeBook: this.form.get('accountNoInPayeeBook').value,
        standardName: this.form.get('standardName').value,
        formula: this.form.get('formula').value,
        sdm: this.form.get('sdm').value,
        frequency: this.form.get('frequency').value,
        investmentSection: this.form.get('investmentSection').value,
        familyMember: this.form.get('familyMember').value,
        remark: this.form.get('remark').value
      };
      // console.log("before save",data)
      this.garnishmentService.postGarnishmentMaster(data).subscribe(res => {
        console.log("before save", data)
        // console.log("after save",res);
        if (res.data.results.length > 0) {
          this.alertService.success('Garnishment master Details Saved Successfully.', '');
          this.form.reset();

        } else {
          this.alertService.warning(res.status.messsage);
        }
        this.form.reset();
        this.refreshHtmlTableData();
      },

        (error: any) => {
          this.alertService.error(error["error"]["status"]["messsage"]);

        });
    }
  }


  onSelectMasterHead(evt: any) {
    console.log(evt.target.value)
    const toSelect = this.MasterHead.find(
      (c) => c.standardName === evt.target.value
    );
    this.form.get('headMasterId').setValue(toSelect.headMasterId);

  }


  // onSelectHeadName(evt: any) {
  //   this.tempObjForInstitutionMaster="";
    
  //   let temp = this.complianceHeadNameList.find(o => 
  //   o.complianceHead === evt.target.value);
    
  //   if (temp) {
  //     this.complianceInstitutionMasterDetails = temp.complianceInstitutionMasterDetails;
  //     if(this.complianceInstitutionMasterDetails)
  //     {
  //       this.tempObjForInstitutionMaster=this.complianceInstitutionMasterDetails;       
  //     }
      
  //   } else {
  //     this.complianceInstitutionMasterDetails = [];
  //   }
  // }

onSelectHeadName(evt: any) {
  this.complianceInstitutionMasterDetails=[];

  
   //-----------------------Get Institution API api------------------------------
   this.garnishmentService.getInstitutionMaster().subscribe((res) => {
  
    this.tempObjForInstitutionMaster = res.data.results;
    // console.log('getInstitutionMaster:', this.tempObjForInstitutionMaster);
    this.tempObjForInstitutionMaster.forEach(element => {
      if(element.complianceHeadId == evt.target.value){
        
        const obj = {
            label: element.institutionName,
            value: element.institutionName,
          };

          this.complianceInstitutionMasterDetails.push(obj);

          
      }
    });
    if(this.complianceInstitutionMasterDetails.length == 1){
    //  alert("here")
    this.form.get('complianceHeadName').setValue(evt.target.value)
    this.form.get('nameOfInstitution').setValue(this.complianceInstitutionMasterDetails[0].label)
     this.onSelectThirdPartyMasterId(this.complianceInstitutionMasterDetails[0].label)
    }else{
      // debugger
      // this.form.reset();
      // console.log(JSON.stringify(this.form.value))
      this.form.get('complianceHeadName').setValue(evt.target.value)
    }
  });

  
  
    // console.log(evt.target.value)
  

    

   // this.complianceInstitutionMasterDetails.push(institutionName);
 

   
  }

    // const toSelect = this.MasterHead.find(
    //   (c) => c.standardName === evt.target.value
    // );

    // this.complianceInstitutionMasterDetails1 = this.complianceInstitutionMasterDetails.filter
    // (complianceHeadName => complianceHeadName.value == evt.target.value);
  // }

  //----------- Family relationship shown on Policyholder selection ---------------
  //  OnSelectionfamilyMemberGroup() {
  //   const toSelect = this.familyMemberGroup.find(
  //     (c) => c.familyMemberName === this.form.get('policyholdername').value
  //   );
  //   this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
  //   this.form.get('relationship').setValue(toSelect.relation);
  // }




  onSelectThirdPartyMasterId(evt: any) {
    // console.log('tempObjForInstitutionMaster', this.tempObjForInstitutionMaster);
// alert(this.form.get('nameOfInstitution').value)
    let temp = this.tempObjForInstitutionMaster.find
      (o => o.institutionName == this.form.get('nameOfInstitution').value);
    console.log('temp::', temp);
    this.form.patchValue({
      address1: temp.address1,
      address2: temp.address2,
      city: temp.city,
      country: temp.country,
      emailId: temp.emailId,
      pinCode: temp.pinCode,
      state: temp.state,
      contactNumber: temp.contactNumber,
      villege: temp.village,
      address3: temp.address3,
    });

  }


  editMaster(i: number) {
    console.log(i);
    console.log(this.summaryHtmlDataList[i]);
    this.isEditMode = true;
    this.isSaveAndReset = false;
    this.showButtonSaveAndReset = true;
    this.form.enable();
    this.form.reset();

    this.form.patchValue(this.summaryHtmlDataList[i]);
    this.form.get('complianceHeadName').disable();
    this.form.get('nameOfInstitution').disable();
    console.log(this.form.value);



  }

  viewMaster(i: number) {

    this.isSaveAndReset = false;
    this.isEditMode = true;
    this.showButtonSaveAndReset = false;
    // this.showButtonSaveAndReset = false;
    this.form.reset();
    this.form.patchValue(this.summaryHtmlDataList[i]);

    this.form.patchValue({
      // nameOfInstitution: this.summaryHtmlDataList[i].label,
      // description: this.masterGridDataList[i].description,
      // contactPerson: this.masterGridDataList[i].contactPerson,
    });
    this.form.disable();
  }

  cancelView() {
    this.isEditMode = false;
    this.isSaveAndReset = true;
    this.showButtonSaveAndReset = true;
    this.form.enable();
    this.form.reset();
    this.showButtonSaveAndReset = true;
    this.nameOfInstitution = 0;  // for save it should be 0 and update it should have any integer value

  }
  deleteMaster(masterid: number) {
    console.log(masterid);
    this.garnishmentService.deleteGarnishmentMasterDetails(masterid)
      .subscribe(() => {
        this.alertService.success('Garnishment master Details Deleted successfully', '');
        // this.summaryHtmlDataList.splice(masterid, thirdPartyMasterId);
      })
  }

  // removeSelectedRow(index: number) {
  //   this.summaryHtmlDataList.splice(index, 1);
  // }


}

