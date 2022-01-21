
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debug } from 'console';
import { $ } from 'protractor';
import { bindCallback, observable } from 'rxjs';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { BankMasterAtGroupService } from '../bank-master-at-group/bank-master-at-group.service';
import { CompanyMasterService } from '../company-master/company-master.service';
import { BankMasterAtCompanyService } from './bank-master-at-company.service';
import { MustMatch } from './password-match.validator';
// import { ExcelserviceService } from '../../excel_service/excelservice.service';
import { ExcelserviceService } from './../../../core/services/excelservice.service';
import { SortEvent } from 'primeng/api';
import { el } from 'date-fns/locale';

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
 // accountNumber1: boolean = false;
  header: any[];
  excelData: any[];

    //for confirm account Number
  //  timeout: any = null;
    //end
// //change lll
//    public contactPersonName: string;
//    public designation: string;
//    public emailId: string;
//    public contactNumber: number;
   //end
  // public isActive:boolean;
  public groupCompanyDetailsList = [];
  public companyGroupId: number = 0;
  //for temporary add new row
  //  tempdata=new FormArray([]);
  public tempdata=[];
  contactPersonName: any='';
  pfArray: any;
  designation: any;
  emailId: any='';
  contactNumber: any='';
  isdCode: any ='';
  editIndex: any = -1;
  companyBankMappingId: any;
  viewFlag: boolean = false;
  //addrowflag:boolean=false;
 
  emailIdInvalid: boolean=false;
  validatedEmailFlag: boolean = false;

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
//new
      // ontactPersonName: ['',Validators.required],
      // designation: ['',Validators.required],
      // emailId: ['', Validators.required],
      // emailId: new FormControl('',[Validators.required]),
      // ontactPersonName:new FormControl('',[Validators.required]),
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
// let bydefault='select';
// this.form.controls['isdcode'].setValue(bydefault);
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

   // this.form.controls['isdCode'].setValue('Select')
  }
//Time set for Confirm Account Number

hideConfirmAccountNo( accountNumber ) {

 // if ( accountNumber == false ) {
    setTimeout( () => {
      this.accountNumber = false;
    }, 2000 )
 // }
}

hideConfirmAccountNo1( reEnterAccountNumber ) {

   //if ( reEnterAccountNumber == false ) {
     setTimeout( () => {
       this.reEnterAccountNumber = false;
     }, 2000 )
   //}
 }

  account(event){
  }
  
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
          //  isdCode:element.mappingDetails[i].isdCode,
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

   // Flag for view 
   this.viewFlag = false;


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
              // "isdcode":contactNumberSplit[0],
              // "contactNumber":contactNumberSplit[1],
             // "contactNumber": element.mappingDetails[j].contactNumber +''+element.mappingDetails[j].isdCode,
              "contactPersonName": element.mappingDetails[j].contactPersonName,
              "designation": element.mappingDetails[j].designation,
              "emailId": element.mappingDetails[j].emailId,
              "groupCompanyId": element.mappingDetails[j].groupCompanyId,
              "isActive": element.mappingDetails[j].isActive,
              "isdCode":element.mappingDetails[j].isdCode,
             
          });
          this.form.controls['pfFormArray'].setValue(this.tempdata);
          console.log("this.tempdata is: "+ JSON.stringify(this.tempdata))
        
         // this.form.controls['isdCode'].setValue();

          // this.form.controls.isdCode.setValue('Select');

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
      
    }
     , ( error: any ) => {
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

    // Flag for view 
    this.viewFlag = true;
    

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
            // this.pfArray.push( this.formBuilder.group( {
            //   contactPersonName: [{ value: element.mappingDetails[j].contactPersonName, disabled: true }],
            //   designation: [{ value: element.mappingDetails[j].designation, disabled: true }],
            //   emailId: [{ value: element.mappingDetails[j].emailId, disabled: true }],
            //   isActive: [{ value: element.mappingDetails[j].isActive, disabled: true }],
            //   contactNumber: [{ value: element.mappingDetails[j].contactNumber, disabled: true }],
            //   companyBankMappingId: [element.mappingDetails[j].companyBankMappingId],
            // } ) );
         
        //   this.tempdata.push({
            
        //     "contactNumber": element.mappingDetails[j].contactNumber,
        //     "contactPersonName": element.mappingDetails[j].contactPersonName,
        //     "designation": element.mappingDetails[j].designation,
        //     "emailId": element.mappingDetails[j].emailId,
            
        // });
// this.form.edittable().disable();
// this.f.addRow().disable();

 
  this.contactPersonName = element.mappingDetails[j].contactPersonName,
  this.designation = element.mappingDetails[j].designation,
  this.emailId = element.mappingDetails[j].emailId,
  this.contactNumber = element.mappingDetails[j].contactNumber,
  this.isdCode = element.mappingDetails[j].isdCode
  //this.companyBankMappingId = element.companyBankMappingId
 
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
    
   // this.form.controls['contactPersonName'].disable();
    this.form.disable();
  //  this.isEditMode=false;
 // this.form.addRow().disable();
    

  }
  cancelView() {
    // this.form.setControl( 'pfFormArray', new FormArray( [] ) );
    this.isEditMode = false;
    this.isActive = false;
    this.isSaveAndReset = true;
// Flag for view 
    this.viewFlag = false;
    
    this.showButtonSaveAndReset = true;
    
    this.form.enable();
    this.form.reset();
    
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
  //   this.showButtonSaveAndReset = true;
  //  this.companyGroupId=0;
   
this.form.patchValue({
  ifscCode:'',
  accountType:'',
  companyGroup:'',
})

    this.tempdata = []
//for new code 
    this.form.controls['pfFormArray'].setValue(this.tempdata)

    this.contactPersonName = ''
    this.designation = ''
    this.emailId = ''
    this.contactNumber = ''
    this.isdCode = ''

   
  }

  // reset() {
  //   // this.isEditMode = false;
  //   this.companyGroupId = -1;
  //   this.showButtonSaveAndReset = true;
  //   this.companyGroupId = 0;
  //   //this.form.get( 'companyGroupActive' ).setValue( true );
  //  // this.saveFormValidation();

  // }

  save() {
    
    if ( this.isEditMode ) {
      const s = [];
      const formData = this.form.getRawValue();
//for new

      // let requestData :any
      // this.tempdata.forEach(ele =>{
      //   console.log(JSON.stringify(ele))
      //   let temp = ele.contactNumber.split(' ');

      //    requestData = {
      //     "companyBankMappingId": ele.companyBankMappingId,
      //     "contactNumber": temp[1],
      //     "contactPersonName": ele.contactPersonName,
      //     "designation": ele.designation,
      //     "emailId": ele.emailId,
      //     "isActive": 1,
      //     "isdCode": temp[0]
      // }
    
     
      // })

      let requestData :any
      this.tempdata.forEach(ele =>{
        console.log(JSON.stringify(ele))
        
         requestData = {
          "companyBankMappingId": ele.companyBankMappingId,
          "contactNumber": ele.contactNumber,
          "contactPersonName": ele.contactPersonName,
          "designation": ele.designation,
          "emailId": ele.emailId,
          "isActive": 1,
          "isdCode": ele.isdCode,
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
      console.log(this.tempdata);
      this.form.setValue(
        {
          isdCode:this.isdCode,
        }
      )
      
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
        //  this.alertService.sweetalertWarning( res.status.messsage );
        this.alertService.sweetalertWarning('Filled Contact Person  Details');
        }

      }, ( error: any ) => {
        this.alertService.sweetalertError( error.error.status.messsage );

      } );
    }
    
    //new code for ISDCODE byDefault Select
    this.form.setValue(
      {
        isdCode:this.isdCode,
      }
    )
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
// Flag for view 
this.viewFlag = false;

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
   
  //  if(this.validatedEmailFlag){
   // if(this.emailId!='' && this.contactPersonName!='' ){
    
      if(this.emailId!=''){
        if(this.contactPersonName!=''){
      if(this.validatedEmailFlag){
      this.tempdata.push({
          "accountNumber": this.form.get('accountNumber').value,
          "accountType": this.form.get('accountType').value,
          "companyBankMasterId": this.companyBankMasterId,
           "contactNumber": this.isdCode + ' ' +this.contactNumber,
         // "contactNumber":this.contactNumber,
         // "isdCode":this.isdCode,
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
      else
    {
     
     this.alertService.sweetalertWarning('Please Enter Email ID in Format');
   
    } 
   }
    else
    {
     
     this.alertService.sweetalertWarning('Please Enter Mandentory Fields');
   
    } 
  }
  else
    {
     
     this.alertService.sweetalertWarning('Please Enter Contact Person Details.');
   
    }
    
  
       
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
 // let requestData :any
      // this.tempdata.forEach(ele =>{
      //   console.log(JSON.stringify(ele))
      //   let temp = ele.contactNumber.split(' ');

      //    requestData = {
      //     "companyBankMappingId": ele.companyBankMappingId,
      //     "contactNumber": temp[1],
      //     "contactPersonName": ele.contactPersonName,
      //     "designation": ele.designation,
      //     "emailId": ele.emailId,
      //     "isActive": 1,
      //     "isdCode": temp[0]
      // }
    
     
      // })

edittable(data,index1){

  let temp=data.contactNumber.split(' ');

  this.editIndex = index1;
  this.contactPersonName = data.contactPersonName
  this.designation = data.designation
  this.emailId = data.emailId
  // this.contactNumber = data.contactNumber
  // this.isdCode = data.isdCode
  this.contactNumber = temp[1]
  this.isdCode = temp[0]
  this.companyBankMappingId = data.companyBankMappingId
  
  // this.isdCode=''
}

// updateRow(){
//   if(this.validatedEmailFlag){
//     if(this.emailId!='' && this.contactPersonName!='' ){
//   this.tempdata.splice(this.editIndex,1,{
//     "accountNumber": this.form.get('accountNumber').value,
//     "accountType": this.form.get('accountType').value,
//     "companyBankMasterId": this.companyBankMasterId,
//      "contactNumber": this.isdCode + ' ' +this.contactNumber,
//  // "contactNumber": this.contactNumber,
// // "isdCode":this.isdCode,
//     "companyBankMappingId": this.companyBankMappingId,
//     "contactPersonName": this.contactPersonName,
//     "designation": this.designation,
//     "emailId": this.emailId,
//     "groupCompanyId": this.form.get('companyGroup').value
//   })

//   this.form.controls['pfFormArray'].setValue(this.tempdata)

//     this.contactPersonName = ''
//     this.designation = ''
//     this.emailId = ''
//     this.contactNumber = ''
//     this.isdCode = ''
//     this.editIndex = -1
// }
//   }
//   else
//   {
  
//    this.alertService.sweetalertWarning('Please Enter Vaild Email Id.');
//   } 
 
// }

updateRow(){
  if(this.emailId!=''){
    if(this.contactPersonName!=''){
  if(this.validatedEmailFlag){
    
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

  this.form.controls['pfFormArray'].setValue(this.tempdata)

    this.contactPersonName = ''
    this.designation = ''
    this.emailId = ''
    this.contactNumber = ''
    this.isdCode = ''
    this.editIndex = -1
}
else
{
 
 this.alertService.sweetalertWarning('Please Enter Email ID in Format');

} 
}
else
{
 
 this.alertService.sweetalertWarning('Please Enter Mandentory Fields');

} 
}
else
{
 
 this.alertService.sweetalertWarning('Please Enter Contact Person Details.');

}
 
}

// validateEmail(email) {
//   const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return regularExpression.test(String(email).toLowerCase());
//  }

validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(re.test(email))
  this.validatedEmailFlag  = re.test(email)
  return re.test(email);
}
}
