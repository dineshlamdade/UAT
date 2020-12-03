import { Component, OnInit, ViewChild, TemplateRef, Inject, HostListener, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { DatePipe, DOCUMENT } from '@angular/common';

import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { NumberFormatPipe } from '../../../core/utility/pipes/NumberFormatPipe';
import { from } from 'rxjs';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { start } from 'repl';
import { rangeContainsMarker } from '@fullcalendar/angular';
import { CompanyMasterService } from './company-master.service';
import { CompanyGroupMasterService } from '../company-group-master/company-group-master.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

import { isThisSecond } from 'date-fns';
import { companyMasterRequestDTOs, EmployeeMasterRequestDTO , requestDTOString} from './dto-models/company-master-dto';
import { strict } from 'assert';
import { element } from 'protractor';
import { yearsPerPage } from '@angular/material/datepicker';

@Component({
  selector: 'app-company-master',
  templateUrl: './company-master.component.html',
  styleUrls: ['./company-master.component.scss'],
})
export class CompanyMasterComponent implements OnInit {
  public companyMasterform: any = FormGroup;
  selectedImageFileLogo1: any;
  selectedImageFileLogo2: any;
  selectedImageFileLogo3: any;
    @ViewChild('fileInput') public el: ElementRef;

  imageUrl: any = "./assets/emp-master-images/empIcon5.png";
  selectedImg: any;



  employeeMasterRequestDTO  = new EmployeeMasterRequestDTO('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','');
  countryCode: Array<any> = [];
  public isContractorDataList = ['No', 'Yes'];
  public companyClassificationList = ['A', 'B', 'C'];
 // public languageList = ['English'];
  //public currencyList = ['Dollar','Euro', 'Rupee', 'Yen', 'Pound','Rupees'];
  currencyList: Array<any> = [];
  languageList: Array<any> = [];
  public summaryHtmlDataList = [];
  public companyGroupNameList = [];
  masterGridDataList: Array<any> = [];
 public scaleList = [];
 public   reasonForExitList = [];
 public typeOfEstablishmentList = [];
 public industryTypeList = [];
 countries: Array<any> = [];
 isEditMode: boolean = false;
 companyMasterRequestDTOs = new companyMasterRequestDTOs();
 requestDTOString = new requestDTOString();
 index:any;
 showButtonSaveAndReset:boolean= true;
 globalCompanyMasterId: number;
 hideRemarkDiv: boolean = true;
 uploadFiles: any;
 public tempObjForgroupNameScaleStartDate: any;
 isSaveAndReset : boolean = true;

 public groupNameScaleNameStartDateObject:any[] = [];




  constructor( private cd: ChangeDetectorRef,private formBuilder: FormBuilder, private datePipe: DatePipe, private companyMasterService: CompanyMasterService, private companyGroupMasterService:CompanyGroupMasterService) {
    this.summaryHtmlDataList = [];
    this.tempObjForgroupNameScaleStartDate = {scale:'',groupName:'',startDate:''};




    this.companyMasterform = this.formBuilder.group({
      code: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      shortName: new FormControl( '', Validators.required),
      companyGroupName: new FormControl('', Validators.required ),
      companyGroupName1: new FormControl({ value: null, disabled: true }),
      typeOfEstablishment: new FormControl('', Validators.required ),
      industryType: new FormControl('', Validators.required),
      scale: new FormControl('', Validators.required ),
      coClassification: new FormControl('', Validators.required),
      startDate: new FormControl('', [Validators.required] ),
      formerName: new FormControl('' ),
      address1: new FormControl('', Validators.required ),
      address2: new FormControl('' ),
      address3: new FormControl('' ),
      country: new FormControl('' ),
      pinCode: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl('' ),
      village: new FormControl('' ),
      phoneNumber: new FormControl('' ),
      emailId: new FormControl('' , [  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      website: new FormControl('',  [  Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]),
      contractor: new FormControl('' ),
      language: new FormControl(''),
      currency: new FormControl(''),
      logo1: new FormControl('' ),
      logo2: new FormControl('' ),
      logo3:  new FormControl('' ),
      endDate: new FormControl(''),
      reason: new FormControl(''),
      remark: new FormControl(''),
      isdCode: new FormControl(''),
      officialMobileNumber: new FormControl(''),
      contactInformation: new FormControl(''),
      companyActive: new FormControl(''),
    });

    this.companyMasterform.get('remark').disable();
    this.companyMasterform.get('reason').disable();
    this.companyMasterform.get('endDate').disable();
    this.companyMasterform.get('companyActive').setValue(true);
    this.companyMasterform.get('companyActive').disable();
    this.employeeMasterRequestDTO.contractor = 'No';
    this.employeeMasterRequestDTO.language = 'English';

   // this.companyMasterform.set('contractor').value = false;
    // this.companyMasterform.setValue({
    //   contractor: false,
    // });
  }

  ngOnInit(): void {
    this.deactiveActiveCheckBox();
   // this.isEditMode = false;

    this.companyMasterService.getLanguagesList().subscribe(res => {
      this.languageList = res.data.results;
      // setTimeout(() => {
      //   this.employeeLanguageRequestModel.language = '';
      // }, 100)
    })

    this.companyMasterService.getCurrencyList().subscribe(res => {
      this.currencyList = res.data.results;
      // setTimeout(() => {
      //     this.previousEmploymentInformation.currency = '';
      // }, 1)
  }, (error: any) => {
    this.sweetalertError(error["error"]["status"]["messsage"]);

  }, () => {
    this.companyMasterform.patchValue({
      currency: this.currencyList[2],
      });
  });
  this.employeeMasterRequestDTO.currency = this.currencyList[2];

// this.companyMasterform.get('companyActive').setValue(true);
    this.employeeMasterRequestDTO.companyActive = true;
      this.companyMasterService.getLocationInformationOrCountryList().subscribe(res => {
        this.countries = res.data.results;
      });

      // this.companyMasterService.getCompanyMasterDataById(7).subscribe(res =>{
      // });

    this.companyGroupMasterService.getCompanygroupdropdownReasonForExitMaster().subscribe(res => {
      // console.log(res);
      res.data.results.forEach(element => {
        const obj = {
          label: element.dropdownValue,
          value: element.dropdownName,
        };
        this.reasonForExitList.push(obj);
      });
    });

    this.companyMasterService.getTypeOfEstablishment().subscribe(res => {
      res.data.results.forEach(element => {
        const obj = {
          label: element.dropdownValue,
          value: element.dropdownName,
        };
        this.typeOfEstablishmentList.push(obj);
      });

    });

    this.companyGroupMasterService.getCompanygroupdropdownScaleMaster().subscribe(res => {
      res.data.results.forEach(element => {
        const obj = {
          label: element.dropdownValue,
          value: element.dropdownName,
        };
        this.scaleList.push(obj);
      });
    });

    this.companyMasterService.getIndustryTypeMaster().subscribe(res => {
      res.data.results.forEach(element => {
        const obj = {
          label: element.dropdownValue,
          value: element.dropdownName,
        };
        this.industryTypeList.push(obj);
      });
    });
      this.companyMasterService.getCountryCodes().subscribe(res => {
      this.countryCode = res.data.results;
    });
    this.refreshHtmlTableData();
  }

  editMaster(i: number, globalCompanyMasterId: number) {
    this.tempObjForgroupNameScaleStartDate = {scale:'',groupName:'',startDate:'',groupName1:''};
    this.showButtonSaveAndReset = true;
    this.isSaveAndReset = false;
    this.requestDTOString.companyMasterRequestDTOs =[];


    this.selectedImageFileLogo1 = undefined;
    this.selectedImageFileLogo2 = undefined;
    this.selectedImageFileLogo3 = undefined;
    this.companyMasterform.reset();
    this.companyMasterform.enable();
    this.globalCompanyMasterId = globalCompanyMasterId;


    const to = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'yyyy-MM-dd');
    if (to !== '9999-12-31'){
      this.companyMasterform.controls['remark'].clearValidators();
      this.companyMasterform.controls['remark'].updateValueAndValidity();
      this.companyMasterform.controls['reason'].clearValidators();
      this.companyMasterform.controls['reason'].updateValueAndValidity();
    }
    this.index = 0;
    console.log(this.masterGridDataList[i].contractor);

    this.companyMasterform.patchValue(this.masterGridDataList[i]);
    console.log(this.masterGridDataList[i]);

    this.tempObjForgroupNameScaleStartDate = this.groupNameScaleNameStartDateObject.find ( o => o.groupName ===this.masterGridDataList[i].companyGroupName);
    console.log(  this.tempObjForgroupNameScaleStartDate );
    this.companyMasterform.patchValue({
      companyGroupName1: this.tempObjForgroupNameScaleStartDate.companyGroupName,
      });

    if(this.employeeMasterRequestDTO.contractor === true){
      this.companyMasterform.patchValue({
      contractor: 'Yes',
      });
  } else {
    this.companyMasterform.patchValue({
      contractor:'No',
      });
      this.companyMasterform.get('companyGroupName1').disable();

  }

    this.companyMasterform.controls['endDate'].clearValidators();
    this.companyMasterform.controls['remark'].clearValidators();
    this.companyMasterform.controls["endDate"].updateValueAndValidity();
    this.companyMasterform.controls["remark"].updateValueAndValidity();
    this.companyMasterform.get('code').disable();
}

viewMaster(globalCompanyMasterId: number, i:number) {
  this.tempObjForgroupNameScaleStartDate = {scale:'',groupName:'',startDate:'',groupName1:''};

  this.selectedImageFileLogo1 = undefined;
  this.selectedImageFileLogo2 = undefined;
  this.selectedImageFileLogo3 = undefined;
  this.globalCompanyMasterId = 0;
  this.showButtonSaveAndReset = false;
  this.companyMasterform.reset();
this.companyMasterform.patchValue(this.masterGridDataList[i]);
this.tempObjForgroupNameScaleStartDate = this.groupNameScaleNameStartDateObject.find ( o => o.groupName ===this.masterGridDataList[i].companyGroupName);
console.log(  this.tempObjForgroupNameScaleStartDate );
this.companyMasterform.patchValue({
  companyGroupName1: this.tempObjForgroupNameScaleStartDate.companyGroupName,
  });
  if(this.employeeMasterRequestDTO.contractor === true){
      this.companyMasterform.patchValue({
      contractor: 'Yes',
      });
  } else {
    const newLocal = 'No';
    this.companyMasterform.patchValue({
      contractor:  newLocal,
      });

  }
  this.companyMasterform.disable();
}

  refreshHtmlTableData() {
    this.summaryHtmlDataList = [];
    this.masterGridDataList = [];

    this.companyMasterService.getAllCompanyMasterData().subscribe(res => {
      console.log(res);
      this.masterGridDataList = res.data.results;
      let i = 1;
      res.data.results.forEach(element => {
        let contractor;
        if(element.contractor === false){
          contractor = 'No';
        } else{
          contractor = 'Yes'
        }
          const obj = {
            SrNo: i++,
            shortName: element.shortName,
            StartDate: element.startDate,
            EndDate: element.endDate,
            Scale: element.scale,
            companyGroupId: element.companyGroupId,
            globalCompanyMasterId: element.globalCompanyMasterId,
            address1: element.address1,
            address2: element.address2,
            address3: element.address3,
            city: element.city,
            coClassification: element.coClassification,
            code: element.code,
            companyActive: element.companyActive,
            companyLogo1: element.companyLogo1 ? null : '',
            companyLogo2: element.companyLogo2 ? null : '',
            companyLogo3: element.companyLogo3 ? null : '',
            companyName: element.companyName,
            country: element.country,
            createdBy: element.createdBy,
            createdOn: element.createdOn,
            currency: element.currency,
            emailId: element.emailId,
            formerName: element.formerName,
            industryType: element.industryType,
            language: element.language,
            logo1ImageName: element.logo1ImageName ? null : '',
            logo1Type: element.logo1Type  ? null : '',
            logo2ImageName: element.logo2ImageName  ? null : '',
            logo2Type: element.logo2Type  ? null : '',
            logo3ImageName:element.logo3ImageName  ? null : '',
            logo3Type: element.logo3ImageName  ? null : '',
            pinCode: element.pinCode,
            reason: element.reason,
            remark: element.remark,
            scale: element.scale,
            state : element.state,
            typeOfEstablishment: element.typeOfEstablishment,
            updatedBy: element.updatedBy,
            updatedOn: element.updatedOn,
            contractor: contractor,
            village: element.village,
            website: element.website,
          };
          this.summaryHtmlDataList.push(obj);
         // console.log(this.summaryHtmlDataList);
      });
    });

    console.log('summary');
    console.log(this.summaryHtmlDataList);

    this.companyGroupMasterService.getCompanyGroupMaster().subscribe(res => {
      let companyGroupcode;
      let startDate;
      let scale;
      console.log(res);

      res.data.results.forEach ( element => {
        this.companyGroupNameList.push(element.companyGroupCode);

      this.groupNameScaleNameStartDateObject.push({groupName:element.companyGroupCode, startDate: element.startDate, scale:element.scale, companyGroupName:element.companyGroupName});


      });
    });
    console.log(this.groupNameScaleNameStartDateObject);
    console.log('--');


  }
  cancelViewMasterForm() {
    this.showButtonSaveAndReset = true;
    this.isSaveAndReset = true;

    this.employeeMasterRequestDTO  = new EmployeeMasterRequestDTO('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','');
   // this.isEditMode = false;
    this.selectedImageFileLogo1 = undefined;
    this.selectedImageFileLogo2 = undefined;
    this.selectedImageFileLogo3 = undefined;
    this.tempObjForgroupNameScaleStartDate = {scale:'',groupName:'',startDate:'',groupName1:''};
    this.globalCompanyMasterId = 0;


    this.deactivateRemark();
    this.saveFormValidation();
  }
  onChangeEndDate(evt: any) {
    console.log(evt);
    console.log(this.companyMasterform.get('endDate').value);
    const from = this.datePipe.transform(this.companyMasterform.get('startDate').value, 'yyyy-MM-dd');
    const to = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'yyyy-MM-dd');
    if(from > to) {
        this.companyMasterform.controls['endDate'].reset();

}
  this.companyMasterform.controls["remark"].setValidators(Validators.required);
  this.companyMasterform.controls["remark"].updateValueAndValidity();

  this.companyMasterform.controls["reason"].setValidators(Validators.required);
  this.companyMasterform.controls["reason"].updateValueAndValidity();
  this.companyMasterform.get('companyActive').setValue(false);

  this.deactivateRemark();
}
onChangeStartDate(){
  const from = this.datePipe.transform(this.companyMasterform.get('startDate').value, 'yyyy-MM-dd');
  const to =  this.datePipe.transform(this.tempObjForgroupNameScaleStartDate.startDate, 'yyyy-MM-dd');
  console.log(this.tempObjForgroupNameScaleStartDate.startDate);
  console.log(from);
  if(from < to) {
   alert('Start Date should not be less than Company Group Start Date');
   this.companyMasterform.patchValue({
    startDate:''
   });
} else{
  console.log('greater');
}

}
deactivateRemark() {
    if (this.companyMasterform.value.companyActive === false) {
      this.companyMasterform.get('companyActive').disable();

      // this.hideRemarkDiv = true;
        this.companyMasterform.get('remark').setValidators([Validators.required]);
       // this.companyMasterform.get('companyActive').disable();
    } else {

        this.companyMasterform.get('remark').clearValidators();
       // this.hideRemarkDiv = false;
       this.companyMasterform.get('companyActive').enable();


        // this.companyMasterform.get('remark').reset();
    }
}
deactiveActiveCheckBox() {
  this.deactivateRemark();
}


  saveCompanyMaster(employeeMasterRequestDTO){

    console.log(employeeMasterRequestDTO);
    if (this.globalCompanyMasterId > 0) {
      this.requestDTOString.companyMasterRequestDTOs =[];
      console.log('clcicked on update button');
      const companyName = this.companyMasterform.get('companyName').value;
      const scale = this.companyMasterform.get('scale').value;
      const code = this.companyMasterform.get('code').value;
      const data = this.companyMasterform.getRawValue();
      const startDate = this.datePipe.transform(this.companyMasterform.get('startDate').value, 'dd-MMM-y');
      const endDate = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'dd-MMM-y');
      let isContractor1: boolean = false;
      if( this.companyMasterform.get('contractor').value === 'No'){
        isContractor1 = false;
      } else {
        isContractor1 = true;
      }

      this.companyMasterRequestDTOs.employeeMasterRequestDTO.globalCompanyMasterId = this.globalCompanyMasterId;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.code = code;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.shortName = this.companyMasterform.get('shortName').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyName = this.companyMasterform.get('companyName').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.formerName = this.companyMasterform.get('formerName').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyGroupName = this.companyMasterform.get('companyGroupName').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.address1 = this.companyMasterform.get('address1').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.address2 = this.companyMasterform.get('address2').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.address3 = this.companyMasterform.get('address3').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.country = this.companyMasterform.get('country').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.pinCode = this.companyMasterform.get('pinCode').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.state = this.companyMasterform.get('state').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.city = this.companyMasterform.get('state').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.village = this.companyMasterform.get('village').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.isdCode  = this.companyMasterform.get('isdCode').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.phoneNumber  = this.companyMasterform.get('phoneNumber').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.emailId = this.companyMasterform.get('emailId').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.website = this.companyMasterform.get('website').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.contractor = isContractor1;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.typeOfEstablishment  = this.companyMasterform.get('typeOfEstablishment').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.language  = this.companyMasterform.get('language').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.currency = this.companyMasterform.get('currency').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.industryType  = this.companyMasterform.get('industryType').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.scale = scale;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.coClassification = this.companyMasterform.get('coClassification').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.startDate = startDate;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.endDate = endDate;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.reason = this.companyMasterform.get('reason').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyActive = true;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.remark = this.companyMasterform.get('remark').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo1  = this.companyMasterform.get('logo1').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo2 = this.companyMasterform.get('logo2').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo3 = this.companyMasterform.get('logo3').value;

     this.companyMasterRequestDTOs.companyMasterRequestDTOs.push(this.companyMasterRequestDTOs.employeeMasterRequestDTO);

      console.log(this.companyMasterRequestDTOs.companyMasterRequestDTOs);

      this.requestDTOString.companyMasterRequestDTOs.push(this.companyMasterRequestDTOs.companyMasterRequestDTOs[0]);
      console.log(this.selectedImageFileLogo2);


  var formData = new FormData();
  console.log('222'+this.employeeMasterRequestDTO.code);
  console.log( JSON.stringify(this.requestDTOString));
  formData.append('requestDTOString', JSON.stringify(this.requestDTOString) );
  if( this.selectedImageFileLogo1 !== undefined){
    formData.append('files', this.selectedImageFileLogo1, this.employeeMasterRequestDTO.code+' 1.jpg');
  }
  if( this.selectedImageFileLogo2 !== undefined){
    formData.append('files', this.selectedImageFileLogo2, this.employeeMasterRequestDTO.code+' 2.jpg');
  }
  if( this.selectedImageFileLogo3 !== undefined){
    formData.append('files',this.selectedImageFileLogo3, this.employeeMasterRequestDTO.code+' 3.jpg');
  }






      this.companyMasterService.postCompanyMaster(formData).subscribe(res => {
        console.log(res);
        if (res.data.results.length > 0) {
          this.sweetalertMasterSuccess('Company  Master Updated Successfully.', '');
          this.employeeMasterRequestDTO  = new EmployeeMasterRequestDTO('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','');
          this.saveFormValidation();
         // this.companyMasterform.reset();
         this.isSaveAndReset = true;
         this.showButtonSaveAndReset = true;
          this.globalCompanyMasterId = 0;
          this.refreshHtmlTableData();
        } else {
          this.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.sweetalertError(error["error"]["status"]["messsage"]);

      });

    } else {
      console.log('clcicked on new record save button');
      this.requestDTOString.companyMasterRequestDTOs =[];
      const companyName = this.companyMasterform.get('companyName').value;
      const scale = this.companyMasterform.get('scale').value;
      const code = this.companyMasterform.get('code').value;
      const data = this.companyMasterform.getRawValue();
      const startDate = this.datePipe.transform(this.companyMasterform.get('startDate').value, 'dd-MMM-y');
      const endDate = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'dd-MMM-y');
      let isContractor2: boolean;
      if( this.companyMasterform.get('contractor').value === 'No'){
        isContractor2 = false;
      } else {
        isContractor2 = true;
      }

      this.companyMasterRequestDTOs.employeeMasterRequestDTO.globalCompanyMasterId = 0;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.code = this.companyMasterform.get('code').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.shortName = this.companyMasterform.get('shortName').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyName = this.companyMasterform.get('companyName').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.formerName = this.companyMasterform.get('formerName').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyGroupName = this.companyMasterform.get('companyGroupName').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.address1 = this.companyMasterform.get('address1').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.address2 = this.companyMasterform.get('address2').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.address3 = this.companyMasterform.get('address3').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.country = this.companyMasterform.get('country').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.pinCode = this.companyMasterform.get('pinCode').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.state = this.companyMasterform.get('state').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.city = this.companyMasterform.get('state').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.village = this.companyMasterform.get('village').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.phoneNumber  = this.companyMasterform.get('phoneNumber').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.isdCode  = this.companyMasterform.get('isdCode').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.emailId = this.companyMasterform.get('emailId').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.website = this.companyMasterform.get('website').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.contractor = isContractor2;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.typeOfEstablishment  = this.companyMasterform.get('typeOfEstablishment').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.language  = this.companyMasterform.get('language').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.currency = this.companyMasterform.get('currency').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.industryType  = this.companyMasterform.get('industryType').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.scale = scale;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.coClassification = this.companyMasterform.get('coClassification').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.startDate = startDate;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.endDate = endDate;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.reason = this.companyMasterform.get('reason').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.companyActive = true;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.remark = this.companyMasterform.get('remark').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo1 = this.companyMasterform.get('logo1').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo2 = this.companyMasterform.get('logo2').value;
      this.companyMasterRequestDTOs.employeeMasterRequestDTO.logo3 = this.companyMasterform.get('logo3').value;

      this.companyMasterRequestDTOs.companyMasterRequestDTOs.push(this.companyMasterRequestDTOs.employeeMasterRequestDTO);

      console.log(this.companyMasterRequestDTOs.companyMasterRequestDTOs);

      this.requestDTOString.companyMasterRequestDTOs.push(this.companyMasterRequestDTOs.companyMasterRequestDTOs[0]);

  var formData = new FormData();
  console.log( JSON.stringify(this.requestDTOString));
  formData.append('requestDTOString', JSON.stringify(this.requestDTOString) );

  if( this.selectedImageFileLogo1 !== undefined){
    formData.append('files', this.selectedImageFileLogo1, this.employeeMasterRequestDTO.code+' 1.jpg');
  }
  if( this.selectedImageFileLogo2 !== undefined){
    formData.append('files', this.selectedImageFileLogo2, this.employeeMasterRequestDTO.code+' 2.jpg');
  }
  if( this.selectedImageFileLogo3 !== undefined){
    formData.append('files',this.selectedImageFileLogo3, this.employeeMasterRequestDTO.code+' 3.jpg');
  }

      this.companyMasterService.postCompanyMaster(formData).subscribe(res => {
        console.log(res);
        if (res.data.results.length > 0) {
          this.sweetalertMasterSuccess('Company  Master Saved Successfully.', '');
          this.saveFormValidation();
         // this.companyMasterform.reset();
          this.refreshHtmlTableData();
        } else {
          this.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.sweetalertError(error["error"]["status"]["messsage"]);

      });

    }


  }
  onSelectScale(){}

  checkLocalAddress() {
  }
  clearLocalAddressFields() {


  }
  getPermanentAddressFromPIN() {
    console.log(this.companyMasterform.get('pinCode').value);
    if (this.companyMasterform.get('pinCode').value.length < 6) {
      this.companyMasterform.get('state').setValue('');
      this.companyMasterform.get('city').setValue('');
    }
    if (this.companyMasterform.get('pinCode').value.length == 6 &&  this.companyMasterform.get('country').value == 'India') {
      this.companyMasterService.getAddressFromPIN(this.companyMasterform.get('pinCode').value).subscribe(res => {
        console.log(res);
        this.companyMasterform.get('state').setValue( res.data.results[0].state);
        this.companyMasterform.get('city').setValue(res.data.results[0].city);

      }, (error: any) => {
        this.sweetalertError(error["error"]["status"]["messsage"]);

      });
    }
  }

  setPaymentDetailToDate(){
    const to = this.datePipe.transform(this.companyMasterform.get('endDate').value, 'yyyy-MM-dd');
    if(to !==null) {
      if(to.trim() === '9999-12-31' ) {
        this.companyMasterform.controls["remark"].clearValidators();
        this.companyMasterform.controls["remark"].updateValueAndValidity();

        this.companyMasterform.controls["reason"].clearValidators();
        this.companyMasterform.controls["reason"].updateValueAndValidity();
        this.companyMasterform.get('companyActive').setValue(true);
        this.deactivateRemark();
    }

  }
  }




sweetalertError(message:any) {
    Swal.fire({
        title: message,
        showCloseButton: true,
        showCancelButton: false,
        toast:true,
        position:'top-end',
        showConfirmButton:false,
        icon:'error',
        timer: 15000,
        timerProgressBar: true,
    });
}
sweetalertWarning(message: any) {
  Swal.fire({
    title: message,
    showCloseButton: true,
    showCancelButton: false,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    background: '#e68a00',
    icon: 'warning',
    timer: 15000,
    timerProgressBar: true,
  });
}
sweetalertMasterSuccess(message: any, text: any) {
  Swal.fire({
    title: message,
    text: text,
    showCloseButton: true,
    showCancelButton: false,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    icon: 'success',
    timer: 15000,
    timerProgressBar: true,
  });
}

  // selected image bindind
  uploadFile(event, uploadFile) {
    console.log(event);
    console.log(uploadFile);
    console.log(uploadFile.files[0]);

   //  this.selectedImageFile = uploadFile.files[0];
      this.uploadFiles = uploadFile.files[0];
      this.companyMasterform.markAsTouched();

    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;

       // this.selectedImageFile = this.imageUrl;
        //  this.companyMasterform.get("logo3").patchValue({file: this.selectedImageFile});
        //  this.companyMasterform.patchValue({
        //    file: reader.result
        //  });

      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
  logo1(event, uploadFile){
    console.log('in log1');

    let file = (event.target.files[0] as File);
    let reader = new FileReader();
    console.log(reader);

    if (event.target.files && event.target.files.length) {


      this.selectedImageFileLogo1 = event.target.files[0];
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     // console.log(reader.result);
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
    logo2(event, uploadFile){

      const file = (event.target.files[0] as File);
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {

        this.selectedImageFileLogo2 = event.target.files[0];
       // console.log(event.target.files);
        const [file] = event.target.files;
        reader.readAsDataURL(file);

       // console.log(reader.result);


          // need to run CD since file load runs outside of zone
          this.cd.markForCheck();
        };
      }


      logo3(event, uploadFile){

        const file = (event.target.files[0] as File);
        const reader = new FileReader();

        if (event.target.files && event.target.files.length) {
                   this.selectedImageFileLogo3 = event.target.files[0];
          const [file] = event.target.files;
          reader.readAsDataURL(file);
          // need to run CD since file load runs outside of zone
            this.cd.markForCheck();
          };
        }

        onSelectGroupMaster(evt:any){
          this.tempObjForgroupNameScaleStartDate =null;
         console.log(evt);
         //  console.log(evt.target.value);
          this.tempObjForgroupNameScaleStartDate = this.groupNameScaleNameStartDateObject.find ( o => o.groupName === evt);
          console.log(this.tempObjForgroupNameScaleStartDate);
         this.companyMasterform.patchValue({
           scale:this.tempObjForgroupNameScaleStartDate.scale,
           companyGroupName1: this.tempObjForgroupNameScaleStartDate.companyGroupName,
         });
        }

        saveFormValidation(){
          this.selectedImageFileLogo1 = undefined;
          this.selectedImageFileLogo2 = undefined;
          this.selectedImageFileLogo3 = undefined;







          // this.companyMasterform = this.formBuilder.group({
          //   code: new FormControl('', Validators.required),
          //   companyName: new FormControl('', Validators.required),
          //   shortName: new FormControl( '', Validators.required),
          //   companyGroupName: new FormControl('', Validators.required ),
          //   typeOfEstablishment: new FormControl('', Validators.required ),
          //   industryType: new FormControl('', Validators.required),
          //   scale: new FormControl('', Validators.required ),
          //   coClassification: new FormControl('', Validators.required),
          //   startDate: new FormControl('', [Validators.required] ),
          //   emailId: new FormControl('' , [  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
          //   website: new FormControl('',  [  Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]),

          // });
          this.isEditMode = false;

          this.companyMasterform.reset();
          this.companyMasterform.enable();



         //  this.employeeMasterRequestDTO.contractor = 'No';






          this.companyMasterform.get('companyActive').setValue(true);


           this.companyMasterform.controls['endDate'].clearValidators();
           this.companyMasterform.controls['remark'].clearValidators();
           this.companyMasterform.controls['reason'].clearValidators();
           this.companyMasterform.controls["endDate"].updateValueAndValidity();
           this.companyMasterform.controls["remark"].updateValueAndValidity();
           this.companyMasterform.controls["reason"].updateValueAndValidity();


           this.companyMasterform.controls["code"].setValidators(Validators.required);
           this.companyMasterform.controls["code"].updateValueAndValidity();

           this.companyMasterform.controls["address1"].setValidators(Validators.required);
           this.companyMasterform.controls["address1"].updateValueAndValidity();



           this.companyMasterform.controls["companyGroupName"].setValidators(Validators.required);
           this.companyMasterform.controls["companyGroupName"].updateValueAndValidity();

           this.companyMasterform.controls["shortName"].setValidators(Validators.required);
           this.companyMasterform.controls["shortName"].updateValueAndValidity();

           this.companyMasterform.controls["scale"].setValidators(Validators.required);
           this.companyMasterform.controls["scale"].updateValueAndValidity();

           this.companyMasterform.controls["startDate"].setValidators(Validators.required);
           this.companyMasterform.controls["startDate"].updateValueAndValidity();

       //   this.companyMasterform.get('companyGroupActive').setValue(true);
          this.companyMasterform.get('endDate').disable();
          this.companyMasterform.get('reason').disable();

          this.companyMasterform.get('remark').disable();
          this.companyMasterform.get('companyActive').setValue(true);
          this.companyMasterform.get('contractor').setValue('No');
          this.companyMasterform.patchValue({
            language: 'English',
            });
            this.companyMasterform.patchValue({
              currency: this.currencyList[2],
              });

          this.deactiveActiveCheckBox();
          this.companyMasterform.get('companyActive').disable();
      }



  }
