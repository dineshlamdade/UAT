import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { StatuatoryComplianceService } from '../statutory-compliance/statuatory-compliance.service';
import { EstablishmentMasterService } from './establishment-master.service';
import { CompanyMasterService } from '../company-master/company-master.service';

@Component({
  selector: 'app-establishment-master',
  templateUrl: './establishment-master.component.html',
  styleUrls: ['./establishment-master.component.scss']
})
export class EstablishmentMasterComponent implements OnInit {
  public form: any = FormGroup;
  summaryHtmlDataList:Array <any> = [];
  issuedByList = ['Registrar of Companies', 'Commissioner of Charities'];
  primaryBusinessActivityList =['Payroll','PayRoll', 'IT', 'HR1', '22'];
  officePremisesOwnershipList = ['Owned','RENT', 'Lease'];
  //typeOfEstablishmentList = ['ESTD1','permant','EST-Banglore','Type1','Perm','Tesst'];
  showButtonSaveAndReset : boolean = true;
  registrationNumberList: Array<any> = [];
  companyRegistrationIdList: Array<any> = [];
  companyRegistrationMasterList : Array<any> = [];
  masterGridDataList : Array<any> = [];
  tempObjForCompanyRegistration: any;
  companyRegistrationId:number = 0;
  companyMasterId: number = 0;
  isSaveAndReset:boolean = true;
  countries = [];
  establishmentMasterId:number =0;
  regionMasterDetails = [];
  selectedRegionMasterCode: number;
  public typeOfEstablishmentList = [];



  constructor(private formBuilder: FormBuilder,private statuatoryComplianceService: StatuatoryComplianceService,
              private establishmentMasterService: EstablishmentMasterService, private companyMasterService: CompanyMasterService,
               private datePipe: DatePipe) {
    this.form = this.formBuilder.group({
     establishmentCode: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      typeOfEstablishment: new FormControl('', Validators.required),
      primaryBusinessActivity:  new FormControl('', Validators.required),
      dateOfSetup:  new FormControl(''),
      officePremisesOwnership:  new FormControl(''),
      regionMasterId:  new FormControl('', Validators.required),
      gstNumber:  new FormControl(''),
      gstIssueDate:  new FormControl(''),
      linNumber:  new FormControl(''),
      linIssueDate:  new FormControl(''),
      stpi:  new FormControl(''),
      stpiIssueDate:  new FormControl(''),
      address1:  new FormControl('', Validators.required),
      address2:  new FormControl('', Validators.required),
      address3:  new FormControl('', Validators.required),
      country:  new FormControl('', Validators.required),
      pinCode:  new FormControl('', Validators.required),
      state:  new FormControl(''),
      city:  new FormControl(''),
      village:  new FormControl(''),
    });

}

  ngOnInit(): void {
    this.companyMasterService.getTypeOfEstablishment().subscribe(res => {
      res.data.results.forEach(element => {
        const obj = {
          label: element.dropdownValue,
          value: element.dropdownName,
        };
        this.typeOfEstablishmentList.push(obj);
      });

    });


    this.statuatoryComplianceService.getLocationInformationOrCountryList().subscribe(res => {
      this.countries = res.data.results;
    });

    // get Region dropdown data
    this.establishmentMasterService.getRegionMasterDetails().subscribe(res => {
      this.regionMasterDetails = res.data.results;
    });
    this.refreshHtmlTableData();

}
refreshHtmlTableData(){
  this.summaryHtmlDataList = [];
  this.masterGridDataList = [];
  this.establishmentMasterService.getEstablishmentMasterDetails().subscribe(res => {
    this.masterGridDataList = res.data.results;
    console.log(this.masterGridDataList);
    let i = 1;
   res.data.results.forEach(element => {
      const obj = {
              SrNo: i++,
               establishmentMasterId: element.establishmentMasterId,
                establishmentCode: element.establishmentCode,
                description: element.description,
                regionMasterId: element.regionMasterId,
                typeOfEstablishment: element.typeOfEstablishment,
                primaryBusinessActivity: element.primaryBusinessActivity,
                address1: element.address1,
                address2: element.address2,
                address3: element.address3,
                pinCode: element.pinCode,
                country: element.country,
                state: element.state,
                city: element.city,
                village: element.village,
                dateOfSetup: element.dateOfSetup,
                officePremisesOwnership:element.officePremisesOwnership,
                linNumber: element.linNumber,
                linIssueDate: element.linIssueDate,
                gstNumber: element.gstNumber,
                gstIssueDate: element.gstIssueDate,
                stpi: element.stpi,
                stpiIssueDate: element.stpiIssueDate,
      };
      this.summaryHtmlDataList.push(obj);

    });
  });

















  this.establishmentMasterService.getEstablishmentMasterDetails().subscribe(res => {
    console.log(res);
   });
}
  save(){

    if(this.establishmentMasterId > 0 ){
      console.log('in update');
      const data = this.form.getRawValue();

      data.groupCompanyId = 1;
      const gstIssueDate = this.datePipe.transform(this.form.get('gstIssueDate').value, 'dd-MMM-yyyy');
      const linIssueDate = this.datePipe.transform(this.form.get('linIssueDate').value, 'dd-MMM-yyyy');
      const stpiIssueDate = this.datePipe.transform(this.form.get('stpiIssueDate').value, 'dd-MMM-yyyy');
      const dateOfSetup = this.datePipe.transform(this.form.get('dateOfSetup').value, 'dd-MMM-yyyy');

      data.gstIssueDate = gstIssueDate;
      data.linIssueDate = linIssueDate;
      data.stpiIssueDate = stpiIssueDate;
      data.dateOfSetup = dateOfSetup;
      data.regionMasterId = this.selectedRegionMasterCode;
      data.establishmentMasterId = this.establishmentMasterId ;

      delete data.officialCountryCode;

      console.log(JSON.stringify(data));


      this.establishmentMasterService.putEstablishmentMaster(data).subscribe(res => {
        console.log(res);
        if (res.data.results.length > 0) {
          this.sweetalertMasterSuccess('Establishment Master Details Updated Successfully.', '');
          this.form.reset();
          this.isSaveAndReset = true;
          this.showButtonSaveAndReset = true;
          this.establishmentMasterId = 0;
          this.refreshHtmlTableData();
        } else {
          this.sweetalertWarning(res.status.messsage);
         }

        }, (error: any) => {
          this.sweetalertError(error["error"]["status"]["messsage"]);

        });

    } else{
    const data = this.form.getRawValue();
    // groupComapnyId is hard coded

      data.groupCompanyId = 1;
      const gstIssueDate = this.datePipe.transform(this.form.get('gstIssueDate').value, 'dd-MMM-yyyy');
      const linIssueDate = this.datePipe.transform(this.form.get('linIssueDate').value, 'dd-MMM-yyyy');
      const stpiIssueDate = this.datePipe.transform(this.form.get('stpiIssueDate').value, 'dd-MMM-yyyy');
      const dateOfSetup = this.datePipe.transform(this.form.get('dateOfSetup').value, 'dd-MMM-yyyy');

      data.gstIssueDate =gstIssueDate;
      data.linIssueDate =linIssueDate;
      data.stpiIssueDate =stpiIssueDate;
      data.dateOfSetup = dateOfSetup;

      data.regionMasterId = this.selectedRegionMasterCode;
      console.log('---');
      console.log(data.regionMasterId);
      console.log('---');


      delete data.officialCountryCode;
      this.establishmentMasterService.postEstablishmentMaster(data).subscribe(res => {
        console.log(res);
        if (res.data.results.length > 0) {
          this.sweetalertMasterSuccess('Establishment Master Details Saved Successfully.', '');
          this.form.reset();
          this.refreshHtmlTableData();
        } else {
          this.sweetalertWarning(res.status.messsage);
         }

        }, (error: any) => {
          this.sweetalertError(error["error"]["status"]["messsage"]);

        });
      }

}

  onBsValueChangeDateOfIncorporation() {}
  onSelectCompanyRegistrationId(evt: any){
    let temp = this.tempObjForCompanyRegistration.find ( o => o.code == this.form.get('regionMasterId').value);
    this.companyMasterId = temp.companyMasterId;
  //  this.selectedRegionMasterCode = temp.masterId;
    console.log(temp.companyMasterId);
    this.companyMasterId = temp.companyMasterId;
    this.form.patchValue({

      });

  }
  onSelectIssuedBy(){}

  editMaster(i: number, establishmentMasterId :number){
    this.isSaveAndReset = false;
    this.showButtonSaveAndReset = true;
    this.form.enable();
    this.form.reset();
    this.establishmentMasterId = establishmentMasterId;
    this.form.patchValue(this.masterGridDataList[i]);

    console.log(this.masterGridDataList[i]);
    this.form.enable();
    this.form.get('regionMasterId').disable();

  }
  viewMaster(i:number){
    this.establishmentMasterId = 0;

    this.isSaveAndReset = false;
    this.showButtonSaveAndReset = false;
    this.showButtonSaveAndReset = false;
    this.form.reset();
    this.form.patchValue(this.masterGridDataList[i]);


      this.form.patchValue({
        // companyRegistrationId: this.masterGridDataList[i].companyMasterResponseDto.code,
        // companyName: this.masterGridDataList[i].companyMasterResponseDto.companyName,
        // companyGroupName:this.masterGridDataList[i].companyMasterResponseDto.companyGroupName,
        });



    this.form.disable();
  }
  cancelView(){
     this.establishmentMasterId = 0;
    this.isSaveAndReset = true;
    this.showButtonSaveAndReset = true;
    this.form.enable();
    this.form.reset();
    this.form.get('companyName').disable();
    this.form.get('companyGroupName').disable();
    this.showButtonSaveAndReset = true;
    this.companyRegistrationId = 0;  // for save it should be 0 and update it should have any integer value

  }
  checkLocalAddress(){}
  onSelectPrimaryBusinessActivity(evt:any){}
  getPermanentAddressFromPIN() {
    console.log(this.form.get('pinCode').value);
    if (this.form.get('pinCode').value.length < 6) {
      this.form.get('state').setValue('');
      this.form.get('city').setValue('');
    }
    if (this.form.get('pinCode').value.length == 6 &&  this.form.get('country').value == 'India') {
      this.statuatoryComplianceService.getAddressFromPIN(this.form.get('pinCode').value).subscribe(res => {
        console.log(res);
        this.form.get('state').setValue( res.data.results[0].state);
        this.form.get('city').setValue(res.data.results[0].city);

      }, (error: any) => {
        this.sweetalertError(error["error"]["status"]["messsage"]);

      });
    }
  }
  onSelectTypeOfEstablishment(evt:any){}
  onBsValueChangeDateOfSetup(evt:any){}
  onSelectOfficePremisesOwnership(evt:any){}
  onBsValueChangeDateOfGstIssueDate(){}
  onBsValueChangeLinIssueDate() {}
  onBsValueChangeStpiIssueDate() {}
  onSelectRegionMasterId(evt:any){
    console.log(evt);
    this.selectedRegionMasterCode = evt;



    console.log(this.regionMasterDetails);
    let tempObj =   this.regionMasterDetails.find ( o => o.masterCode == this.form.get('regionMasterId').value.trim());

   console.log(tempObj) ;
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

}
