
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { BankMasterAtGroupService } from '../bank-master-at-group/bank-master-at-group.service';
import { CompanyMasterService } from '../company-master/company-master.service';
import { BankMasterAtCompanyService } from './bank-master-at-company.service';
import { MustMatch } from './password-match.validator';
import { ExcelserviceService } from './../../../core/services/excelservice.service';
import { SortEvent } from 'primeng/api';

@Component( {
  selector: 'app-bank-master-at-company',
  templateUrl: './bank-master-at-company.component.html',
  styleUrls: ['./bank-master-at-company.component.scss'],
} )
export class BankMasterAtCompanyComponent implements OnInit {
  submitted=false;
  public summaryHtmlDataList = [];
  public showButtonSaveAndReset = true;
  public isActivateButton: number;
  public isEditMode = false;
  public isSaveAndReset = true;
  public form: any = FormGroup;
  public isActive: boolean = false;
  public ifscCodeList = [];
  public bankMasterDetailsResponse: any;
  public companyBankMasterId: number;
  public typeOfAccountList = ['Current', 'OD', 'CC'];
  public isGlobalView = true;
  public masterGridData = [];
  public declarationService: any;
  countryCode: Array<any> = [];
  reEnterAccountNumber: boolean = false;
  accountNumber: boolean = false;
  header: any[];
  excelData: any[]
  public groupCompanyDetailsList = [];
  public companyGroupId: number = 0;
  public tempdata=[];
  contactPersonName: any;
  pfArray: any;
  designation: any;
  emailId: any;
  contactNumber: any;
  isdCode: any;
  editIndex: any = -1;
  companyBankMappingId: any;


  constructor( private formBuilder: FormBuilder, private alertService: AlertServiceService, private bankMasterAtGroupService: BankMasterAtGroupService,
    private bankMasterAtCompanyService: BankMasterAtCompanyService
    ,private excelservice: ExcelserviceService, private companyMasterService: CompanyMasterService ) {
    this.form = this.formBuilder.group( {
      ifscCode: ['', Validators.required],
      bankName: [{ value: '', disabled: true }],
      branchName: [{ value: '', disabled: true }],
      accountType: ['', Validators.required],
      accountNumber: ['', Validators.required],
      reEnterAccountNumber: ['', Validators.required],
      pfFormArray: ( [] ),
      companyGroup: ['', Validators.required],
    },
      {
        validator: MustMatch( 'accountNumber', 'reEnterAccountNumber' ),
      } );

    // this.pfArray.push( this.formBuilder.group( {
    //   //Change validation
    //   contactPersonName: ['',Validators.required],
    //   designation: ['',Validators.required],
    //   emailId: ['', Validators.required],
    //   isActive: [''],
    //  // contactNumber: ['', [Validators.required, Validators.minLength( 10 ), Validators.maxLength( 10 )]],
    //  contactNumber: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
     
    //   isdCode: [''],
    //   companyBankMappingId: [''],
    // } ) );
  }
  public ngOnInit(): void {

    this.ifscCodeList = [];
    this.bankMasterAtGroupService.getBankMasterDetails().subscribe( ( res ) => {
      console.log( 'bank master details', res );
      this.bankMasterDetailsResponse = res.data.results;
      res.data.results.forEach( ( element ) => {
        this.ifscCodeList.push( element.ifscCode );
      } );
    }, ( error: any ) => {
      this.alertService.sweetalertError( error.error.status.messsage );
    } );
    this.bankMasterAtCompanyService.getGroupCompanyDetails().subscribe( ( res ) => {
      console.log( 'bank company', res );
      res.data.results.forEach( ( element ) => {
        if ( element.active == true ) {
          this.groupCompanyDetailsList.push( { id: element.groupCompanyId, itemName: element.companyName } );
        }
      } );

    } );
    this.companyMasterService.getCountryCodes().subscribe( ( res ) => {
      console.log( 'country code', res );
      this.countryCode = res.data.results;
    } );





    this.refreshHtmlTableData();
  }
//Time set for Confirm Account Number

hideConfirmAccountNo( accountNumber ) {

  if ( accountNumber == true ) {
    setTimeout( () => {
      this.accountNumber = false;
    }, 2000 )
  }
}

 account(event){
 
  
  
    // setTimeout( () => {
    //   // this.accountNumber = true;
    //   // document.getElementsByTagName('input')[0].type="password"
    //  this.accountNumber = false;
    // // this.accountNumber=true;
    // }, 100 );
  
  
 }

// account( event: any ) {
//   const pattern = /[0-9]/;
//   let inputChar;
//   if ( event.keyCode != 8 && !pattern.test( inputChar ) ) {
//     event.preventDefault();
//     this.accountNumber=true;

//     setTimeout( () => {
//             // this.accountNumber = true;
//             // document.getElementsByTagName('input')[0].type="password"
//           //  this.accountNumber = false;
//           this.accountNumber=false;
//           }, 100 );
//   }
// }
//End
  refreshHtmlTableData() {
    this.summaryHtmlDataList = [];
    this.masterGridData = [];
    console.log( 'in refrest' );
    this.bankMasterAtCompanyService.getCompanyBanMasterMappingDetails().subscribe( ( res ) => {
      console.log( 'summary table data', res );
      let k = 1;
      res.data.results.forEach( ( element ) => {
        // debugger
        console.log( this.bankMasterDetailsResponse );

        console.log( element );
        for ( let i = 0; i < element.mappingDetails.length; i++ ) {
          let index = this.bankMasterDetailsResponse.findIndex( o => o.companyBankMasterId == element.mappingDetails[i].companyBankMasterId );
          // if (element.mappingDetails[i].isActive === 1) {
          this.masterGridData.push( element );

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
          this.summaryHtmlDataList.push( obj );
        }
      } );
      console.log( this.masterGridData );

    }, ( error: any ) => {
      this.alertService.sweetalertError( error.error.status.messsage );
    } );

  }
  editMaster( accountNumber: number, companyBankMasterId: number, accountType: string ) {
    this.tempdata = []
    window.scrollTo( 0, 0 );
    // this.form.setControl( 'pfFormArray', new FormArray( [] ) );
    this.companyBankMasterId = companyBankMasterId;
    this.isGlobalView = false;
    this.showButtonSaveAndReset = true;
    this.isSaveAndReset = false;
    this.isEditMode = true;
   // this.isEditMode = false;


    this.bankMasterAtCompanyService.getCompanyBanMasterMappingDetails().subscribe( ( res ) => {
      console.log( res );
      let flag = true;

      res.data.results.forEach( ( element ) => {

        for ( let j = 0; j < element.mappingDetails.length; j++ ) {

          if ( accountNumber === element.mappingDetails[j].accountNumber && accountType == element.mappingDetails[j].accountType ) {
           // console.log( element.mappingDetails[j] );
            if ( flag == true ) {
              this.form.patchValue( {
                ifscCode: element.ifscCode,
                bankName: element.bankName,
                branchName: element.branchName,
                companyGroup: element.mappingDetails[j].groupCompanyId,
                accountType: element.mappingDetails[j].accountType,
                accountNumber: element.mappingDetails[j].accountNumber,
                reEnterAccountNumber: element.mappingDetails[j].accountNumber,

                // contactPersonName:element.contactPersonName,
                // designation:element.designation,
                // emailId:element.emailId,
                // contactNumber:element.contactNumber,

              } );

              
                

            }
            flag = false;
            let contactNumberSplit = element.mappingDetails[j].contactNumber.split( ' ' );
          
          
          
            // this.pfArray.push( this.formBuilder.group( {
            //   contactPersonName: [element.mappingDetails[j].contactPersonName],
            //   designation: [element.mappingDetails[j].designation],
            //   emailId: [element.mappingDetails[j].emailId, Validators.required],
            //   isActive: [element.mappingDetails[j].isActive],
              

            //   //change
            //   // isdCode: [contactNumberSplit[0]],
            //   // contactNumber: [contactNumberSplit[1]],

            //   isdCode: [contactNumberSplit],
            //   contactNumber: [contactNumberSplit],
            //   companyBankMappingId: [element.mappingDetails[j].companyBankMappingId],
            // } ) );

            
            this.tempdata.push({
              "accountNumber": element.mappingDetails[j].accountNumber,
              "accountType": element.mappingDetails[j].accountType,
              "companyBankMasterId": element.mappingDetails[j].companyBankMasterId,
              "companyBankMappingId": element.mappingDetails[j].companyBankMappingId,
              "contactNumber": element.mappingDetails[j].contactNumber,
              "contactPersonName": element.mappingDetails[j].contactPersonName,
              "designation": element.mappingDetails[j].designation,
              "emailId": element.mappingDetails[j].emailId,
              "groupCompanyId": element.mappingDetails[j].groupCompanyId,
              "isActive": element.mappingDetails[j].isActive
          });

          console.log("this.tempdata is: "+ JSON.stringify(this.tempdata))


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

        console.log(JSON.stringify(this.tempdata))
        
      } );

    }, ( error: any ) => {
      this.alertService.sweetalertError( error.error.status.messsage );

    } );

    this.form.get( 'ifscCode' ).disable();
    this.form.get( 'bankName' ).disable();
    this.form.get( 'branchName' ).disable();
    this.form.get( 'accountType' ).disable();
    this.form.get( 'accountNumber' ).disable();
    this.form.get( 'reEnterAccountNumber' ).disable();
    this.form.get( 'companyGroup' ).disable();


  }
  viewMaster( accountNumber: number, companyBankMasterId: number, accountType: string ) {
    window.scrollTo( 0, 0 );
    // this.form.setControl( 'pfFormArray', new FormArray( [] ) );
    this.companyBankMasterId = companyBankMasterId;
    this.isGlobalView = false;
    this.showButtonSaveAndReset = false;
    this.isSaveAndReset = false;
    this.isEditMode = true;


    this.bankMasterAtCompanyService.getCompanyBanMasterMappingDetails().subscribe( ( res ) => {
      console.log( res );
      let flag = true;

      res.data.results.forEach( ( element ) => {

        for ( let j = 0; j < element.mappingDetails.length; j++ ) {

          if ( accountNumber === element.mappingDetails[j].accountNumber && accountType == element.mappingDetails[j].accountType ) {
            console.log( element.mappingDetails[j] );
            if ( flag == true ) {
              this.form.patchValue( {
                ifscCode: element.ifscCode,
                bankName: element.bankName,
                branchName: element.branchName,
                companyGroup: element.mappingDetails[j].groupCompanyId,
                accountType: element.mappingDetails[j].accountType,
                accountNumber: element.mappingDetails[j].accountNumber,
                reEnterAccountNumber: element.mappingDetails[j].accountNumber,
              } );

            }
            flag = false;
            this.pfArray.push( this.formBuilder.group( {
              contactPersonName: [{ value: element.mappingDetails[j].contactPersonName, disabled: true }],
              designation: [{ value: element.mappingDetails[j].designation, disabled: true }],
              emailId: [{ value: element.mappingDetails[j].emailId, disabled: true }],
              isActive: [{ value: element.mappingDetails[j].isActive, disabled: true }],
              contactNumber: [{ value: element.mappingDetails[j].contactNumber, disabled: true }],
              companyBankMappingId: [element.mappingDetails[j].companyBankMappingId],
            } ) );
          }
        }
      } );

    }, ( error: any ) => {
      this.alertService.sweetalertError( error.error.status.messsage );
    } );
    this.form.get( 'ifscCode' ).disable();
    this.form.get( 'bankName' ).disable();
    this.form.get( 'branchName' ).disable();
    this.form.get( 'accountType' ).disable();
    this.form.get( 'accountNumber' ).disable();
    this.form.get( 'reEnterAccountNumber' ).disable();
    this.form.get( 'companyGroup' ).disable();
    this.form.disable();

  }
  cancelView() {
    // this.form.setControl( 'pfFormArray', new FormArray( [] ) );
    this.isEditMode = false;
    this.isActive = false;
    this.isSaveAndReset = true;

    this.showButtonSaveAndReset = true;

    this.form.reset();
    this.form.enable();
    // this.pfArray.push( this.formBuilder.group( {
    //   //change for validation
    //   contactPersonName: ['',Validators.required],
    //   designation: ['',Validators.required],
    //   emailId: ['', Validators.required],
    //   isActive: [''],
    //   isdCode: [''],
    //  // contactNumber: [''],
    //   contactNumber: ['', Validators.required],
    //   companyBankMappingId: [''],
    // } ) );
    this.form.get( 'bankName' ).disable();
    this.form.get( 'branchName' ).disable();
    this.tempdata = []
  }


  save() {
    if ( this.isEditMode ) {
      const s = [];
      const formData = this.form.getRawValue();
//for new
      let requestData :any
      this.tempdata.forEach(ele =>{
        console.log(JSON.stringify(ele))
        let temp = ele.contactNumber.split(' ');
         requestData = {
          "companyBankMappingId": ele.companyBankMappingId,
          "contactNumber": temp[1],
          "contactPersonName": ele.contactPersonName,
          "designation": ele.designation,
          "emailId": ele.emailId,
          "isActive": 1,
          "isdCode": temp[0]
      }
     
      })

      this.bankMasterAtGroupService.putBankMasterMapping( requestData).subscribe( ( res ) => {
        console.log( res );

        if ( res.data.results.length > 0 ) {
          //  this.alertService.sweetalertMasterSuccess('Bank Master Mapping Successfully.', '');
          this.alertService.sweetalertWarning( res.status.messsage );
          this.form.reset();
          this.isSaveAndReset = true;
          this.showButtonSaveAndReset = true;
          this.cancelView();


        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }

      }, ( error: any ) => {
        this.alertService.sweetalertError( error.error.status.messsage );

      } );
      
        
      
      this.refreshHtmlTableData();

    } else {
      
      this.bankMasterAtGroupService.postBankMasterMapping( this.tempdata ).subscribe( ( res ) => {
        console.log( res );

              if ( res.data.results.length > 0 ) {
          //  this.alertService.sweetalertMasterSuccess('Bank Master Mapping Successfully.', '');
          this.alertService.sweetalertMasterSuccess( res.status.messsage,'' );
          this.form.reset();
          this.isSaveAndReset = true;
          this.showButtonSaveAndReset = true;
          this.cancelView();
          this.refreshHtmlTableData();
        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }

      }, ( error: any ) => {
        this.alertService.sweetalertError( error.error.status.messsage );

      } );
    }

  }
  onSelectIFSCCode( evt: any ) {
    const index = this.bankMasterDetailsResponse.findIndex( ( o ) => o.ifscCode == evt );
    console.log( this.bankMasterDetailsResponse );
    this.companyBankMasterId = this.bankMasterDetailsResponse[index].companyBankMasterId;
    this.form.patchValue( {
      bankName: this.bankMasterDetailsResponse[index].bankName,
      branchName: this.bankMasterDetailsResponse[index].branchName,
    } );
  }
  onSelectTypeOfAccount( evt: any ) {
    console.log( evt );
  }
  onSelectCompanyGroup( evt: any ) {
    console.log( evt );
    this.companyGroupId = evt;
  }
  UpdateContactPerson() {

  }
  DeleteContactPerson() {

  }
 


  // get pfArray() { return this.f.pfFormArray as FormArray; }
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

  UpdateDetails( i: number ) {
    console.log( 'updateDetais' );
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
      accountType: this.form.get( 'accountType' ).value,
      accountNumber: this.form.get( 'accountNumber' ).value,
      // contactPersonName: this.form.get('pfFormArray').value[i].initial + ' ' + this.form.get('pfFormArray').value[i].firstName.replace(/\s/g, '') + ' ' + this.form.get('pfFormArray').value[i].lastName.replace(/\s/g, ''),
      // designation: this.form.get('pfFormArray').value[i].designation,
      // emailId: this.form.get('pfFormArray').value[i].emailId,
      // contactNumber: this.form.get('pfFormArray').value[i].isdCode + ' ' + this.form.get('pfFormArray').value[i].contactNumber,
      
   
    };

    this.bankMasterAtGroupService.putBankMasterMapping( abc ).subscribe( ( res ) => {
      console.log( res );
      if ( res.data.results.length > 0 ) {
        this.alertService.sweetalertMasterSuccess( 'Bank Master Mapping Updated Successfully.', '' );
        this.form.reset();
        this.isSaveAndReset = true;
        this.showButtonSaveAndReset = true;

      } else {
        this.alertService.sweetalertWarning( res.status.messsage );
      }
    }, ( error: any ) => {
      this.alertService.sweetalertError( error.error.status.messsage );

    } );
    this.refreshHtmlTableData();

  }


  deleteRow( j: number ) {
    //debugger;
    // console.log( "ss..................:",j );
    console.log( j );
    //this.lictransactionList.splice(j,1);
    // this.pfArray.removeAt(j);
    this.tempdata.splice(j,1)
    this.form.controls['pfFormArray'].setValue(this.tempdata)

  }

  addRow() {

    this.tempdata.push({
        "accountNumber": this.form.get('accountNumber').value,
        "accountType": this.form.get('accountType').value,
        "companyBankMasterId": this.companyBankMasterId,
        "contactNumber": this.isdCode + ' ' +this.contactNumber,
        "contactPersonName": this.contactPersonName,
        "designation": this.designation,
        "emailId": this.emailId,
        "groupCompanyId": this.form.get('companyGroup').value
    })
    

    this.form.controls['pfFormArray'].setValue(this.tempdata)

    this.contactPersonName = ''
    this.designation = ''
    this.emailId = ''
    this.contactNumber = ''
    this.isdCode = ''
    //console.log("JSON for pfarray form: "+ JSON.stringify(this.form.value))
  
  }





/* addTable() {
    let group = ''
    let role = ''
    this.userGroupData.forEach(ele =>{
      if(ele.userGroupId == this.groupName){
         group = ele.groupName
      }
    })
    this.userRoleData.forEach(ele => {
      if(ele.userRoleId==this.roleName){
        role = ele.roleName
      }
    });
    const obj = {

      employeeCode: this.employeeCode,
      employeeMasterId: this.employeeMasterId,
       // employeeRoleAssignmentId:this.employeeRoleAssignmentId,
      userName: this.userName,
      companyName: this.companyName,
      roleName: role,
      groupName: group,
      //globalUserMasterId:this.globalUserMasterId
    };
     this.row.push(obj);

     console.log(JSON.stringify(this.companyGroupMasterId))
       this.saveAssignData.push({
        globalUserMasterId: this.globalUserMasterId,
        // employeeRoleAssignmentId:this.employeeRoleAssignmentId,
        companyGroupMasterId: this.companyGroupMasterId,
        globalCompanyMasterId: this.companyName,
        userRoleId: this.roleName,
    })
    this.groupName=''
    this.companyName=''
    this.roleName=''
    this.editFlag = true;
    // console.log(JSON.stringify(this.saveAssignData))
    
  }*/


  //Delete remove --
  // DeleteBankAccount() {
  //   let data = {
  //     groupCompanyId: this.form.get( 'accountType' ).value,
  //     companyBankMasterId: this.companyBankMasterId,
  //     accountType: this.form.get( 'accountType' ).value,
  //     accountNumber: this.form.get( 'accountNumber' ).value,
  //   }
  //   console.log( data );
  //   //deleteCompanyBankMasterMapping
  //   this.bankMasterAtCompanyService.deleteCompanyBankMasterMapping( data ).subscribe( ( res ) => {
  //     console.log( res );
  //     this.alertService.sweetalertMasterSuccess( 'Bank Mapping Deleted Successfully.', '' );

  //   }, ( error: any ) => {
  //     this.alertService.sweetalertError( error['error']['status']['messsage'] );

  //   }, () => {

  //   } );

  // }

  // excel code

  exportAsXLSX(): void {
    this.excelData = [];
    this.header = []
    this.header =["Bank Name","IFSC Code","Account Type"];
    this.excelData=[];
    
    if(this.summaryHtmlDataList.length>0){
    this.summaryHtmlDataList.forEach(element => {
      let obj = {
        "Bank Name":element.bankName,
        "IFSC Code":element.ifscCode,
        "Account Type": element.accountType,

      }
      this.excelData.push(obj)
    });
    console.log('this.excelData::', this.excelData);
  }
   
    this.excelservice.exportAsExcelFile(this.excelData, 'Company Bank Summary','Company Bank Summary',this.header);
  
  }

  //sort
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;
  
        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
  
        return (event.order * result);
    });
  
}

edittable(data,index1){
  this.editIndex = index1;
  this.contactPersonName = data.contactPersonName
  this.designation = data.designation
  this.emailId = data.emailId
  this.contactNumber = data.contactNumber
  this.isdCode = data.isdCode
  this.companyBankMappingId = data.companyBankMappingId
}

updateRow(){
  this.tempdata.splice(this.editIndex,1,{
    "accountNumber": this.form.get('accountNumber').value,
    "accountType": this.form.get('accountType').value,
    "companyBankMasterId": this.companyBankMasterId,
    "contactNumber": this.isdCode + ' ' +this.contactNumber,
    // "contactNumber": this.contactNumber,
    // "isdCode":this.isdCode,
    "companyBankMappingId": this.companyBankMappingId,
    "contactPersonName": this.contactPersonName,
    "designation": this.designation,
    "emailId": this.emailId,
    "groupCompanyId": this.form.get('companyGroup').value
  })
// this.form.reset();
  this.form.controls['pfFormArray'].setValue(this.tempdata)

    this.contactPersonName = ''
    this.designation = ''
    this.emailId = ''
    this.contactNumber = ''
    this.isdCode = ''
    this.editIndex = -1
}

}
