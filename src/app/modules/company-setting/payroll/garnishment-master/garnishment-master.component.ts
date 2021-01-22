import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { GarnishmentService } from './garnishment.service';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';


@Component({
  selector: 'app-garnishment-master',
  templateUrl: './garnishment-master.component.html',
  styleUrls: ['./garnishment-master.component.scss']
})
export class GarnishmentMasterComponent implements OnInit {
  summaryHtmlDataList: Array<any> = [];
  showButtonSaveAndReset: boolean = true;
  complianceInstitutionMasterDetails: Array<any> = [];
  deductionHeadList: Array<any> = [];
  companyRegistrationMasterList: Array<any> = [];
  masterGridDataList: Array<any> = [];
  nameOfInstitution: number = 0;
  isSaveAndReset: boolean = true;
  isEditMode: boolean = false;
  tempObjForCompanyRegistration: any;
  public form: any = FormGroup;
  GarnishmentService: any;
  formulaList: Array<any> = [];
  sdmList: Array<any> = [];
  frequencyList: Array<any> = [];
  arningHeadlist: Array<any> = [];
  hideRemarkDiv: boolean;
  documentId:number=0;
  headMasterId: number = 0;
  thirdPartyMasterId: number = 0;
  incomeTexList:  Array<any> = [];
  countryList:  Array<any> = [];
  pinCodeList:  Array<any> = [];
  


  constructor(private formbuilder: FormBuilder, private garnishmentService: GarnishmentService,
    private alertService: AlertServiceService) {
    this.form = this.formbuilder.group({
      nameOfInstitution: new FormControl('', Validators.required),
      label: new FormControl(''),
      documentId: new FormControl(0),
      headMasterId: new FormControl(0),
      thirdPartyMasterId: new FormControl(0),
      description: new FormControl(null, Validators.required),
      contactNumber: new FormControl(null, Validators.required),
      contactPerson: new FormControl(null, Validators.required),
      // phoneNumber: new FormControl(null, Validators.required),
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
      familyMember: new FormControl('0'),
      remark: new FormControl(null, Validators.required),
      active: new FormControl('0'),
      generalRemark: new FormControl(null, Validators.required),
      // nameOfInstitution: new FormControl(''),
    });
    // this.frequencyList = [
    //   { label: 'Monthly', value: 'Monthly' },
    //   { label: 'Quarterly', value: 'Quarterly' },
    //   { label: 'Half-Yearly', value: 'Halfyearly' },
    //   { label: 'Yearly', value: 'Yearly' },
    // ];

  }


  ngOnInit(): void {
     // -------------------- Get All  country -------------------------

    // this.garnishmentService.getLocationInformationOrCountryList().subscribe((res) => {
    //   console.log('country', res);
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
      console.log('dedection', res);
      const test2 = res;
      test2.forEach((element) => {

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
      test1.data.results.forEach((element) => {
        const obj = {
          label: element.description,
          value: element.description,
        };
        this.incomeTexList.push(obj);
      });
    });


    this.garnishmentService.getInstitutionMaster().subscribe((res) => {
      this.tempObjForCompanyRegistration = res.data.results;
      console.log('tempObjForCompanyRegistration:', this.tempObjForCompanyRegistration);
      res.data.results.forEach((element: { institutionName: any }) => {
        const obj = {
          label: element.institutionName,
          value: element.institutionName,
        };
        this.complianceInstitutionMasterDetails.push(obj);
      });
    });

    //--------------------  GET ALL Loan Master Get All Earning Head-------------------------
    // this.garnishmentService.getloanMasterAllEarningHead().subscribe((res) => {
    //   res.data.results.forEach((element: { earningHead: any }) => {
    //     const obj = {
    //       label: element.earningHead,
    //       value: element.earningHead,
    //     };
    //     this.arningHeadlist.push(obj);
    //   });
    // });


    //-----------------------Delete data api------------------------------

    //  this.garnishmentService.deleteGarnishmentMasterDetails().subscribe((res) => {
    //   res.data.results.forEach((element: { earningHead: any }) => {
    //     const obj = {
    //       label: element.earningHead,
    //       value: element.earningHead,
    //     };
    //     this.arningHeadlist.push(obj);
    //   });
    // });


    // this.deactivateRemark();

    console.log('summaryHtmlDataList::',);
    this.garnishmentService.getGarnishmentMaster().subscribe((res) => {
      console.log('summaryHtmlDataList::', res);
      this.summaryHtmlDataList = res.data.results;
      res.data.results.forEach(element => {


        const obj = {
          reason: element.reason,
          // companyGroupName: element.companyGroupName,
          thirdPartyMasterId: element.thirdPartyMasterId,

        };
        this.summaryHtmlDataList.push(obj);
      });

    });

    console.log('showButtonSaveAndReset::', this.showButtonSaveAndReset);
    this.refreshHtmlTableData();
  }
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
        this.alertService.sweetalertError(error['error']['status']['messsage']);

      });
    }
  }



  refreshHtmlTableData() {
    this.garnishmentService.getGarnishmentMasterDetailsbyId().subscribe(res => {
      this.summaryHtmlDataList = [];
      this.companyRegistrationMasterList = res.data.results;
      
      let i = 1;
      this.masterGridDataList = res.data.results;
      res.data.results.forEach(element => {

        const obj = {
          SrNo: i++,
          nameOfInstitution: element.nameOfInstitution,
          thirdPartyMasterId: element.thirdPartyMasterId,
          description: element.description,
          contactPerson: element.contactPerson,
          contactNumber: element.contactNumber,
          emailId: element.emailId,
          address1: element.address1,
          address2: element.address2,
          address3: element.address3,
          country: element.country,
          pinCode: element.pinCode,
          state: element.state,
          city: element.city,
          villege: element.villege,
          pan: element.pan,
          accountNoInPayeeBook: element.accountNoInPayeeBook,
          standardName: element.standardName,
          formula: element.formula,
          sdm: element.sdm,
          frequency: element.frequency,
          investmentSection: element.investmentSection,
          familyMember: element.familyMember,
          documentId: element.documentId,
          remark: element.remark

        };
        this.summaryHtmlDataList.push(obj);



        var s = this.complianceInstitutionMasterDetails.findIndex(function (o) {
          return o.thirdPartyMasterId === obj.thirdPartyMasterId;
        });
        if (s !== -1) {
          this.complianceInstitutionMasterDetails.splice(s, 1);

        }

      });

    }, (error: any) => {
      this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

    }, () => {


    });



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
    if (this.nameOfInstitution > 0) {
      const data = {
        nameOfInstitution: this.nameOfInstitution,
        thirdPartyMasterId: this.thirdPartyMasterId,
        documentId: this.documentId,
        headMasterId: this.headMasterId,
        description:this.form.get('description').value,
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
        investmentSection:this.form.get('investmentSection').value,
        familyMember:this.form.get('familyMember').value,
         remark:this.form.get('remark').value


      };
      console.log('garnishment Data',data);
      console.log(JSON.stringify(data));

      this.garnishmentService.updateGarnishmentMasterDetails(data).subscribe(res => {
        console.log(res);
        if (res.data.results.length > 0) {
          console.log('data is updated');
          // this.isEditMode = false;
          this.alertService.sweetalertMasterSuccess(res.data.messsage, '');
          this.isSaveAndReset = true;
          this.showButtonSaveAndReset = true;
          this.form.reset();
          this.isEditMode = false;
          this.refreshHtmlTableData();
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
      });
    }
    else {
      console.log('clcicked on new record save button');

      const data = {
        // nameOfInstitution: this.nameOfInstitution,
        nameOfInstitution:0,
        thirdPartyMasterId: this.thirdPartyMasterId,
        documentId: this.documentId,
        headMasterId: this.headMasterId,
        description:this.form.get('description').value,
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
        investmentSection:this.form.get('investmentSection').value,
        familyMember:this.form.get('familyMember').value,
        remark:this.form.get('remark').value
      };
      this.garnishmentService.postGarnishmentMaster(data).subscribe(res => {
        console.log(res);
        if (res.data.results.length > 0) {
          this.alertService.sweetalertMasterSuccess('Garnishment master Details Saved Successfully.', '');
          this.form.reset();
          this.refreshHtmlTableData();
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }

      }, (error: any) => {
        this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

      });
    }

  }

 

  onSelectThirdPartyMasterId(evt: any) {
    //this.tempObjForCompanyRegistration = this.companyRegistrationMasterList;
    console.log('tempObjForCompanyRegistration:', this.tempObjForCompanyRegistration);
    let temp = this.tempObjForCompanyRegistration.find(o => o.institutionName == this.form.get('nameOfInstitution').value);
    console.log('temp::',temp);
    //this.thirdPartyMasterId = temp.thirdPartyMasterId;
    //console.log(temp.thirdPartyMasterId);
    //this.thirdPartyMasterId = temp.thirdPartyMasterId;
    this.form.patchValue({
      address1: temp.address1,
      address2: temp.address2,
      city: temp.city,
      country: temp.country,
      emailId: temp.emailId,
      pinCode: temp.pinCode,
      state : temp.state,
      contactNumber:temp.telephoneNumber,
      villege : temp.village,
      address3 : temp.address3,
    });

  }
 

  editMaster(i: number) {
    this.isEditMode = true;


    this.isSaveAndReset = false;
    this.showButtonSaveAndReset = true;
    this.form.enable();
    this.form.reset();


    // this.nameOfInstitution = this.masterGridDataList[i].nameOfInstitution;
    this.thirdPartyMasterId = this.masterGridDataList[i].thirdPartyMasterId;

    this.form.patchValue(this.masterGridDataList[i]);
    console.log(this.masterGridDataList[i]);

    // this.form.patchValue({
    //   nameOfInstitutionId: this.masterGridDataList[i].companyMasterResponseDto.label,
    //   description: this.masterGridDataList[i].companyMasterResponseDto.description,
    //   contactPerson: this.masterGridDataList[i].companyMasterResponseDto.contactPerson,
    //   contactPerson1: this.masterGridDataList[i].companyMasterResponseDto.contactPerson,
    // });
    // this.form.enable();
    // this.form.get('description').disable();
    // this.form.get('contactPerson').disable();
    // this.form.get('contactPerson1').disable();
    // this.form.get('nameOfInstitutionId').disable();

  }

  viewMaster(i: number) {

    this.isSaveAndReset = false;
    this.isEditMode = true;
    this.showButtonSaveAndReset = false;
    this.showButtonSaveAndReset = false;
    this.form.reset();
    this.form.patchValue(this.masterGridDataList[i]);

    this.form.patchValue({
      nameOfInstitution: this.masterGridDataList[i].companyMasterResponseDto.label,
      description: this.masterGridDataList[i].companyMasterResponseDto.description,
      contactPerson: this.masterGridDataList[i].companyMasterResponseDto.contactPerson,
    });
    this.form.disable();
  }

  cancelView() {
    this.isEditMode = false;
    this.isSaveAndReset = true;
    this.showButtonSaveAndReset = true;
    this.form.enable();
    this.form.reset();

    // this.form.get('description').disable();
    // this.form.get('contactPerson').disable();
    this.showButtonSaveAndReset = true;
    this.nameOfInstitution = 0;  // for save it should be 0 and update it should have any integer value

  }



}

