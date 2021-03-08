
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debug } from 'console';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { BankMasterAtGroupService } from '../bank-master-at-group/bank-master-at-group.service';
import { CompanyMasterService } from '../company-master/company-master.service';
import { BankMasterAtCompanyService } from './bank-master-at-company.service';
import { MustMatch } from './password-match.validator';
@Component({
  selector: 'app-bank-master-at-company',
  templateUrl: './bank-master-at-company.component.html',
  styleUrls: ['./bank-master-at-company.component.scss'],
})
export class BankMasterAtCompanyComponent implements OnInit {
  public summaryHtmlDataList = [];
  public showButtonSaveAndReset = true;
  public isActivateButton: number;
  public isEditMode = false;
  public isSaveAndReset = true;
  public form: any = FormGroup;
  public isActive:boolean =false;
  public ifscCodeList = [];
  public bankMasterDetailsResponse: any;
  public companyBankMasterId: number;
  public typeOfAccountList = ['Current', 'OD', 'CC'];
  public isGlobalView = true;
  public masterGridData = [];
  public declarationService: any;
  countryCode: Array<any> = [];


  // public contactPersonName: string;
  // public designation: string;
  // public emailId: string;
  // public contactNumber: number;
  // public isActive:boolean;
  public groupCompanyDetailsList = [];
  public companyGroupId:number=0;
  public accountNumber: number = 0;
  public reEnterAccountNumber: number =0;

  constructor(private formBuilder: FormBuilder, private alertService: AlertServiceService, private bankMasterAtGroupService: BankMasterAtGroupService,
              private bankMasterAtCompanyService: BankMasterAtCompanyService, private companyMasterService: CompanyMasterService) {
    this.form = this.formBuilder.group({
      ifscCode: ['', Validators.required],
      bankName: [{ value: '', disabled: true }],
      branchName: [{ value: '', disabled: true }],
      accountType: ['', Validators.required],
      accountNumber: ['', Validators.required],
      reEnterAccountNumber: ['', Validators.required],
      pfFormArray: new FormArray([]),
      companyGroup: ['', Validators.required],

    },
      {
        validator: MustMatch('accountNumber', 'reEnterAccountNumber'),
      });

    this.pfArray.push(this.formBuilder.group({
      contactPersonName: [''],
      designation: [''],
      emailId: ['', Validators.required],
      isActive: [''],
      contactNumber: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      isdCode: [''],
      companyBankMappingId:[''],
    }));
  }
  public ngOnInit(): void {

    this.ifscCodeList = [];
    this.bankMasterAtGroupService.getBankMasterDetails().subscribe((res) => {
      console.log('bank master details', res);
      this.bankMasterDetailsResponse = res.data.results;
      res.data.results.forEach((element) => {
        this.ifscCodeList.push(element.ifscCode);
      });
    }, (error: any) => {
      this.alertService.sweetalertError(error.error.status.messsage);
    });
    this.bankMasterAtCompanyService.getGroupCompanyDetails().subscribe((res) => {
      console.log('bank company', res);
      res.data.results.forEach((element) => {
        if(element.active ==true){
          this.groupCompanyDetailsList.push({id:element.groupCompanyId, itemName:element.companyName});
        }
      });

    });
    this.companyMasterService.getCountryCodes().subscribe((res) => {
      console.log('country code', res);
      this.countryCode = res.data.results;
    });





    this.refreshHtmlTableData();
  }

  refreshHtmlTableData() {
    this.summaryHtmlDataList = [];
    this.masterGridData =[];
    console.log('in refrest');
    this.bankMasterAtCompanyService.getCompanyBanMasterMappingDetails().subscribe((res) => {
      console.log('summary table data', res);
      let k = 1;
      res.data.results.forEach((element) => {
        debugger
        console.log(this.bankMasterDetailsResponse);

        console.log(element);
        for (let i = 0; i < element.mappingDetails.length; i++) {
          let index =this.bankMasterDetailsResponse.findIndex(o=>o.companyBankMasterId ==  element.mappingDetails[i].companyBankMasterId);
          // if (element.mappingDetails[i].isActive === 1) {
            this.masterGridData.push(element);

            const obj = {
              SrNo: k++,
              bankName: this.bankMasterDetailsResponse[index].bankName,
              ifscCode: this.bankMasterDetailsResponse[index].ifscCode,
              companyBankMappingId: element.mappingDetails[i].companyBankMappingId,
              companyBankMasterId: element.mappingDetails[i].companyBankMasterId,
              accountType: element.mappingDetails[i].accountType,
              accountNumber: element.mappingDetails[i].accountNumber,
              contactPersonName: element.mappingDetails[i].contactPersonName,
              designation: element.mappingDetails[i].designation,
              emailId: element.mappingDetails[i].emailId,
              contactNumber: element.mappingDetails[i].contactNumber,
            };
            this.summaryHtmlDataList.push(obj);
          }
        });
      console.log(this.masterGridData);

    }, (error: any) => {
      this.alertService.sweetalertError(error.error.status.messsage);
    });

  }
  editMaster(accountNumber: number,companyBankMasterId:number,accountType:string) {
    window.scrollTo(0, 0);
    this.form.setControl('pfFormArray', new FormArray([]));
    this.companyBankMasterId = companyBankMasterId;
    this.isGlobalView = false;
    this.showButtonSaveAndReset = true;
    this.isSaveAndReset = false;
    this.isEditMode = true;


      this.bankMasterAtCompanyService.getCompanyBanMasterMappingDetails().subscribe((res) => {
        console.log(res);
        let flag = true;

        res.data.results.forEach((element) => {

          for (let j = 0; j < element.mappingDetails.length; j++) {

            if (accountNumber === element.mappingDetails[j].accountNumber && accountType == element.mappingDetails[j].accountType) {
              console.log(element.mappingDetails[j]);
              if (flag == true) {
                this.form.patchValue({
                  ifscCode: element.ifscCode,
                  bankName: element.bankName,
                  branchName: element.branchName,
                  companyGroup:element.mappingDetails[j].groupCompanyId,
                  accountType: element.mappingDetails[j].accountType,
                  accountNumber: element.mappingDetails[j].accountNumber,
                  reEnterAccountNumber: element.mappingDetails[j].accountNumber,
                });
              }
              flag = false;
              let contactNumberSplit = element.mappingDetails[j].contactNumber.split(' ');
              this.pfArray.push(this.formBuilder.group({
                contactPersonName: [element.mappingDetails[j].contactPersonName],
                designation: [element.mappingDetails[j].designation],
                emailId: [element.mappingDetails[j].emailId,Validators.required],
                isActive: [element.mappingDetails[j].isActive],
                isdCode:[contactNumberSplit[0]],
                contactNumber: [contactNumberSplit[1]],
                companyBankMappingId:[element.mappingDetails[j].companyBankMappingId],
              }));


              // this.addContactPerson(j);
              // const contactPersonName = element.mappingDetails[j].contactPersonName.split(' ');
              // const contactNumber = element.mappingDetails[j].contactNumber.split(' ');

              // this.pfArray.push(this.formBuilder.group({
              //   initial: [contactPersonName[0]],
              //   firstName: [contactPersonName[1]],
              //   lastName: [contactPersonName[2]],
              //   designation: [element.mappingDetails[j].designation],
              //   emailId: [element.mappingDetails[j].emailId, Validators.required],
              //   isdCode: [contactNumber[0]],
              //   contactNumber: [contactNumber[1]],
              //   companyBankMappingId: [element.mappingDetails[j].companyBankMappingId],
              // }));
              // console.log(this.pfArray.value);
            }
          }
        });

      }, (error: any) => {
        this.alertService.sweetalertError(error.error.status.messsage);

      });

      this.form.get('ifscCode').disable();
      this.form.get('bankName').disable();
      this.form.get('branchName').disable();
      this.form.get('accountType').disable();
      this.form.get('accountNumber').disable();
      this.form.get('reEnterAccountNumber').disable();
      this.form.get('companyGroup').disable();


  }
  viewMaster(accountNumber: number,companyBankMasterId:number,accountType: string) {
    window.scrollTo(0, 0);
    this.form.setControl('pfFormArray', new FormArray([]));
    this.companyBankMasterId =companyBankMasterId;
    this.isGlobalView = false;
    this.showButtonSaveAndReset = false;
    this.isSaveAndReset = false;
    this.isEditMode = true;


      this.bankMasterAtCompanyService.getCompanyBanMasterMappingDetails().subscribe((res) => {
        console.log(res);
        let flag = true;

        res.data.results.forEach((element) => {

          for (let j = 0; j < element.mappingDetails.length; j++) {

            if (accountNumber === element.mappingDetails[j].accountNumber && accountType == element.mappingDetails[j].accountType) {
              console.log(element.mappingDetails[j]);
              if (flag == true) {
                this.form.patchValue({
                  ifscCode: element.ifscCode,
                  bankName: element.bankName,
                  branchName: element.branchName,
                  companyGroup:element.mappingDetails[j].groupCompanyId,
                  accountType: element.mappingDetails[j].accountType,
                  accountNumber: element.mappingDetails[j].accountNumber,
                  reEnterAccountNumber: element.mappingDetails[j].accountNumber,
                });

              }
              flag = false;
              this.pfArray.push(this.formBuilder.group({
                contactPersonName: [{value:element.mappingDetails[j].contactPersonName,disabled:true}],
                designation: [{value:element.mappingDetails[j].designation,disabled:true}],
                emailId: [{value:element.mappingDetails[j].emailId,disabled:true}],
                isActive: [{value:element.mappingDetails[j].isActive,disabled:true}],
                contactNumber: [{value:element.mappingDetails[j].contactNumber,disabled:true}],
                companyBankMappingId:[element.mappingDetails[j].companyBankMappingId],
              }));
            }
          }
        });

      }, (error: any) => {
        this.alertService.sweetalertError(error.error.status.messsage);
      });
      this.form.get('ifscCode').disable();
      this.form.get('bankName').disable();
      this.form.get('branchName').disable();
      this.form.get('accountType').disable();
      this.form.get('accountNumber').disable();
      this.form.get('reEnterAccountNumber').disable();
      this.form.get('companyGroup').disable();
      this.form.disable();

   }
  cancelView() {
    this.form.setControl('pfFormArray', new FormArray([]));
    this.isEditMode = false;
    this.isActive = false;
    this.isSaveAndReset = true;

    this.showButtonSaveAndReset = true;

    this.form.reset();
    this.form.enable();
    this.pfArray.push(this.formBuilder.group({
      contactPersonName: [''],
      designation: [''],
      emailId: ['', Validators.required],
      isActive: [''],
      isdCode: [''],
      contactNumber: [''],
      companyBankMappingId:[''],
    }));
    this.form.get('bankName').disable();
    this.form.get('branchName').disable();
  }


  save() {
    if(this.isEditMode){
      const s = [];
      const formData = this.form.getRawValue();

      for (let i = 0; i < this.pfArray.length; i++) {
        let a =0 ;
        if( this.form.get('pfFormArray').value[i].isActive == true){
          a=1;
        }

        let contactNumberSplit =  this.form.get('pfFormArray').value[i].contactNumber;



        s.push({
           // groupCompanyId: this.companyGroupId,
          // companyBankMasterId: this.companyBankMasterId,
          // accountType: this.form.get('accountType').value,
          // accountNumber: this.form.get('accountNumber').value,
          contactPersonName: this.form.get('pfFormArray').value[i].contactPersonName,
          designation:  this.form.get('pfFormArray').value[i].designation,
          emailId:  this.form.get('pfFormArray').value[i].emailId,
          isdCode: contactNumberSplit[0],
          contactNumber:contactNumberSplit[1],
          isActive: a,
          companyBankMappingId: this.form.get('pfFormArray').value[i].companyBankMappingId,


        });
      }

      console.log(s);
      for(let k=0;k<s.length;k++){
        console.log(JSON.stringify(s[k]));
        this.bankMasterAtGroupService.putBankMasterMapping(s[k]).subscribe((res) => {
          console.log(res);

          if (res.data.results.length > 0) {
            //  this.alertService.sweetalertMasterSuccess('Bank Master Mapping Successfully.', '');
            this.alertService.sweetalertWarning(res.status.messsage);
            this.form.reset();
            this.isSaveAndReset = true;
            this.showButtonSaveAndReset = true;
            this.cancelView();


          } else {
            this.alertService.sweetalertWarning(res.status.messsage);
          }

        }, (error: any) => {
          this.alertService.sweetalertError(error.error.status.messsage);

        });
      }
      this.refreshHtmlTableData();



    } else {
        const s = [];
        const formData = this.form.getRawValue();
        console.log(formData);
        debugger
        for (let i = 0; i < this.pfArray.length; i++) {
          s.push({
            groupCompanyId: this.companyGroupId,
            companyBankMasterId: this.companyBankMasterId,
            accountType: this.form.get('accountType').value,
            accountNumber: this.form.get('accountNumber').value,
            contactPersonName: this.form.get('pfFormArray').value[i].contactPersonName,
            designation:  this.form.get('pfFormArray').value[i].designation,
            emailId:  this.form.get('pfFormArray').value[i].emailId,
            contactNumber: this.form.get('pfFormArray').value[i].isdCode +' '+ this.form.get('pfFormArray').value[i].contactNumber,
          });
        }
        console.log(s);
        this.bankMasterAtGroupService.postBankMasterMapping(s).subscribe((res) => {
          console.log(res);

          if (res.data.results.length > 0) {
            //  this.alertService.sweetalertMasterSuccess('Bank Master Mapping Successfully.', '');
            this.alertService.sweetalertWarning(res.status.messsage);
            this.form.reset();
            this.isSaveAndReset = true;
            this.showButtonSaveAndReset = true;
            this.cancelView();
            this.refreshHtmlTableData();
          } else {
            this.alertService.sweetalertWarning(res.status.messsage);
          }

        }, (error: any) => {
          this.alertService.sweetalertError(error.error.status.messsage);

        });
      }

  }
  onSelectIFSCCode(evt: any) {
    const index = this.bankMasterDetailsResponse.findIndex((o) => o.ifscCode == evt);
    console.log(this.bankMasterDetailsResponse);
    this.companyBankMasterId = this.bankMasterDetailsResponse[index].companyBankMasterId;
    this.form.patchValue({
      bankName: this.bankMasterDetailsResponse[index].bankName,
      branchName: this.bankMasterDetailsResponse[index].branchName,
    });
  }
  onSelectTypeOfAccount(evt: any) {
    console.log(evt);
  }
  onSelectCompanyGroup(evt:any){
    console.log(evt);
    this.companyGroupId = evt;
  }
  UpdateContactPerson() {

  }
  DeleteContactPerson() {

  }
  // addContactPerson(i: number) {
  //   this.pfArray.push(this.formBuilder.group({
  //     initial: ['Mr'],
  //     firstName: [''],
  //     lastName: [''],
  //     designation: [''],
  //     emailId: ['', Validators.required],
  //     isdCode: [''],
  //     contactNumber: [''],
  //     companyBankMappingId: [''],
  //   }));

  // }


  get pfArray() { return this.f.pfFormArray as FormArray; }
  get f() { return this.form.controls; }
  resetForm() {


    this.form.reset();
    // this.pfArray.push(this.formBuilder.group({
    //   initial: ['Mr'],
    //   firstName: [''],
    //   lastName: [''],
    //   designation: [''],
    //   emailId: ['', Validators.required],
    //   isdCode: [''],
    //   contactNumber: [''],
    //   companyBankMappingId: [''],
    // }));
  }
  UpdateDetails(i: number) {
    console.log('updateDetais');
    this.isGlobalView = true;
    const formData = this.form.getRawValue();
    delete formData.ifscCode;
    delete formData.bankName;
    delete formData.branchName;
    delete formData.reEnterAccountNumber;

    formData.companyBankMasterId = 1,
      formData.groupCompanyId = 1;
    const abc = {
      // companyBankMappingId: this.form.get('pfFormArray').value[i].companyBankMappingId,
      accountType: this.form.get('accountType').value,
      accountNumber: this.form.get('accountNumber').value,
      // contactPersonName: this.form.get('pfFormArray').value[i].initial + ' ' + this.form.get('pfFormArray').value[i].firstName.replace(/\s/g, '') + ' ' + this.form.get('pfFormArray').value[i].lastName.replace(/\s/g, ''),
      // designation: this.form.get('pfFormArray').value[i].designation,
      // emailId: this.form.get('pfFormArray').value[i].emailId,
      // contactNumber: this.form.get('pfFormArray').value[i].isdCode + ' ' + this.form.get('pfFormArray').value[i].contactNumber,
    };

    this.bankMasterAtGroupService.putBankMasterMapping(abc).subscribe((res) => {
      console.log(res);
      if (res.data.results.length > 0) {
        this.alertService.sweetalertMasterSuccess('Bank Master Mapping Updated Successfully.', '');
        this.form.reset();
        this.isSaveAndReset = true;
        this.showButtonSaveAndReset = true;

      } else {
        this.alertService.sweetalertWarning(res.status.messsage);
      }
    }, (error: any) => {
      this.alertService.sweetalertError(error.error.status.messsage);

    });
    this.refreshHtmlTableData();

  }

deleteRow(j: number) {
  console.log(j);
//this.lictransactionList.splice(j,1);
this.pfArray.removeAt(j);
}

addRow() {
  this.pfArray.push(this.formBuilder.group({
    contactPersonName: [''],
    designation: [''],
    emailId: ['', Validators.required],
    isActive: [''],
    isdCode: [''],
    contactNumber: [''],
  }));
  // this.lictransactionList.push({
  //   contactPersonName: undefined,
  //   designation: '',
  //   emailId: 'aaaba@gmail.com' ,
  //   contactNumber:'',
  //   isActive:true,
  // });
  // console.log(this.lictransactionList);

  // this.contactPersonName = null;
  // this.designation = null;
  // this.emailId = null;
  // this.contactNumber = null;
  // this.isActive = true;
}
DeleteBankAccount(){
  let data = {
    groupCompanyId:this.form.get('accountType').value,
    companyBankMasterId:this.companyBankMasterId,
    accountType:this.form.get('accountType').value,
    accountNumber:this.form.get('accountNumber').value,
  }
  console.log(data);
  this.bankMasterAtCompanyService.deleteCompanyBankMasterMapping(data).subscribe((res) => {
    console.log(res);
    this.alertService.sweetalertMasterSuccess('Bank Mapping Deleted Successfully.', '');

  }, (error: any) => {
    this.alertService.sweetalertError(error['error']['status']['messsage']);

  }, () => {

  });

}

}
