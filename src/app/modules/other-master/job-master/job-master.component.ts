
import { Component, OnInit, ResolvedReflectiveFactory, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { BankMasterAtCompanyService } from '../bank-master-at-company/bank-master-at-company.service';
import { JobMasterService } from './job-master.service';
@Component( {
  selector: 'app-job-master',
  templateUrl: './job-master.component.html',
  styleUrls: ['./job-master.component.scss'],
} )
export class JobMasterComponent implements OnInit {
  id: number;
  type: string;
  summaryType: string;
  public modalRef: BsModalRef;
  public summaryHtmlDataList = [];
  public summaryCompanyHtmlDataList = [];
  public summaryCompanyHtmlDataList1 = [];
  public getAllJobMastersList = [];
  public allJobsList : Array<any> = [];
  public allMappingList : Array<any> = [];
  public getAllJobMappingsList : Array<any> = [];
    public showButtonSaveAndReset = true;
  public isActivateButton: number;
  public isEditMode = false;
  public isSaveAndReset = true;
  public form: any = FormGroup;
  public formAssign: any = FormGroup;

  public masterGridDataList = [];
  public editedRecordIndex = 0;
  public getAllOtherMappingDetailsResponse: any;
  public summaryAllOtherMappingDetailsList = [];
  uncheckSelectAll: boolean = false;
  public selectedMasterTypeDropDownValue: string;

  public checks = false;
  public checksCompany = false;
  public enableCheckAll = false;
  public enableCompanyCheckAll = false;

  public tableDataList = [];
  // public tableDataList1 = [];
  public selectedCheckBox = [];
  public selectedCompanyListCheckBox = [];
  public hideFormControl = true;
  public groupCompanyDetailsList = [];
  public companyListResponse: any;
  public checkedList: any;
  public masterSelected: boolean;
  public Index: number;
  public jobMasterList = [
    // { value: 'All', postUrl: '', putUrl: '', deleteUrl: '' },
    // { value: 'Business Area', postUrl: 'job-master/', putUrl: 'business-area-master/update', deleteUrl: 'business-area-master/', postMappingToCompany: 'business-area-master-mapping/map-all', deleteMapping: 'business-area-master-mapping/' },
    // { value: 'Sub Area', postUrl: 'job-master/', putUrl: 'subarea-master/update', deleteUrl: 'subarea-master/', postMappingToCompany: 'subarea-master-mapping/map-all', deleteMapping: 'subarea-master-mapping/' },
    // { value: 'Strategic Business Unit', postUrl: 'job-master/', putUrl: 'strategicbusinessunit-master/update', deleteUrl: 'strategicbusinessunit-master/', postMappingToCompany: 'strategic-businessunit-mapping/map-all', deleteMapping: 'strategic-businessunit-mapping/' },
    // { value: 'Division', postUrl: 'job-master/', putUrl: 'division-master/update', deleteUrl: 'division-master/', postMappingToCompany: 'division-master-mapping/map-all', deleteMapping: 'division-master-mapping/' },
    // { value: 'Profit Centre', postUrl: 'job-master/', putUrl: 'profitcentre-master/update', deleteUrl: 'profitcentre-master/', postMappingToCompany: 'profitcentre-mapping/map-all', deleteMapping: 'profitcentre-mapping/' },
    // { value: 'Sub Location', postUrl: 'job-master/', putUrl: 'sublocation-master/update', deleteUrl: 'sublocation-master/', postMappingToCompany: 'sublocation-master-mapping/map-all', deleteMapping: 'sublocation-master-mapping/' },
    // { value: 'Work Location', postUrl: 'job-master/', putUrl: 'worklocation-master/update', deleteUrl: 'worklocation-master/', postMappingToCompany: 'worklocationmaster-mapping/map-all', deleteMapping: 'worklocationmaster-mapping/' },
    // { value: 'Cost Centre', postUrl: 'job-master/', putUrl: 'costcentre-master/update', deleteUrl: 'costcentre-master/', postMappingToCompany: 'costcentre-mapping/map-all', deleteMapping: 'costcentre-mapping/' },
    // { value: 'Sub Cost Centre', postUrl: 'job-master/', putUrl: 'subcostcentre-master/update', deleteUrl: 'subcostcentre-master/', postMappingToCompany: 'subcostcentre-master-mapping/map-all', deleteMapping: 'subcostcentre-master-mapping/' },
    // { value: 'Department', postUrl: 'job-master/', putUrl: 'department-master/update', deleteUrl: 'department-master/', postMappingToCompany: 'department-master-mapping/map-all', deleteMapping: 'department-master-mapping/' },
    // { value: 'Sub Department', postUrl: 'job-master/', putUrl: 'subdepartment-master/update', deleteUrl: 'subdepartment-master/', postMappingToCompany: 'subdepartment-master-mapping/map-all', deleteMapping: 'subdepartment-master-mapping/' },
    // { value: 'Grade', postUrl: 'job-master/', putUrl: 'grade-master/update', deleteUrl: 'grade-master/', postMappingToCompany: 'grade-master-mapping/map-all', deleteMapping: 'grade-master-mapping/' },
    // { value: 'Project', postUrl: 'job-master/', putUrl: 'project-master/update', deleteUrl: 'project-master/', postMappingToCompany: 'projectmaster-mapping/map-all', deleteMapping: 'projectmaster-mapping/' },
    // { value: 'Plant', postUrl: 'job-master/', putUrl: 'plant-master/update', deleteUrl: 'plant-master/', postMappingToCompany: 'plantmaster-mapping/map-all', deleteMapping: 'plantmaster-mapping/' },
    // { value: 'Region', postUrl: 'job-master/', putUrl: 'region-master/update', deleteUrl: 'region-master/', postMappingToCompany: 'regionmaster-mapping/map-all', deleteMapping: 'regionmaster-mapping/' },
    // { value: 'GL Code', postUrl: 'job-master/', putUrl: 'GLcode-master/update', deleteUrl: 'GLcode-master/', postMappingToCompany: 'GLcodemaster-mapping/map-all', deleteMapping: 'GLcodemaster-mapping/' },
  ];

  public viewMode = false;
  constructor( private formBuilder: FormBuilder, private modalService: BsModalService, private jobMasterService: JobMasterService, private alertService: AlertServiceService, private bankMasterAtCompanyService: BankMasterAtCompanyService ) {
    this.form = this.formBuilder.group( {
      masterType: new FormControl( 'All' ),
      masterCode: new FormControl( '', Validators.required ),
      masterDescription: new FormControl( '', Validators.required ),
      jobMasterId: new FormControl( ''),
      isActive: new FormControl( '' ),
      jobMasterValueId: new FormControl( '' ),
      active: new FormControl( '' ),
    } );


    this.formAssign = this.formBuilder.group( {
      groupCompanyId: new FormControl( 'All' ),
      // masterCode: new FormControl( '', Validators.required ),
      // masterDescription: new FormControl( '', Validators.required ),
      // jobMasterId: new FormControl( ''),
      // isActive: new FormControl( '' ),
      // jobMasterValueId: new FormControl( '' ),
      // active: new FormControl( '' ),
    } );

    this.refreshHtmlTable();
    this.masterSelected = false;
    this.form.get( 'isActive' ).setValue( true );
    this.hideFormControl = false;
  }

  public ngOnInit(): void {
    this.getJobMasterDropDownList();
    this.getJobMasterDropDownListAssign();

    // this.getAllJobMasters();

    this.jobMasterService.get( 'business-area-master/details' ).subscribe( ( res ) => {
      console.log( 'getBusinessAreaMasterDetails', res );
    } );
    this.jobMasterService.get( 'business-area-master-mapping/details' ).subscribe( ( res ) => {
      console.log( 'getBusinessAreaMasterMappingDetails', res );
    } );



    this.bankMasterAtCompanyService.getGroupCompanyDetails().subscribe( ( res ) => {
      console.log( 'bank company', res );
      this.companyListResponse = res.data.results;
      let i = 0;
      res.data.results.forEach( ( element ) => {
        if ( element.companyActive == true ) {
          const obj = {
            // id: i++,
            // groupCompanyId: element.groupCompanyId,
            // companyName: element.companyName,
            // companyActive: element.groupCompanyId,
            // isSelected: false,

            label: element.companyName,
            value: element.groupCompanyId,
          };
          // this.groupCompanyDetailsList.push( { id: element.groupCompanyId, itemName: element.companyName } );
          this.summaryCompanyHtmlDataList.push( obj );
          this.groupCompanyDetailsList.push( obj );
          this.summaryCompanyHtmlDataList1.push( obj );
        }
      } );
    } );


    //New added 01/07/2021
    // this.jobMasterService.getAllOtheMappingDetails().subscribe( ( res ) => {
    //   console.log( 'getAllOtheMappingDetails bank company', res );
    //   this.companyListResponse = res.data.results;
    //   let i = 0;
    //   res.data.results.forEach( ( element ) => {
    //     if ( element.companyActive == true ) {
    //       const obj = {


    //         SrNo: i++,
    //         masterMappingId: element.jobMasterMappingId,
    //         masterId: element.jobMasterValueId,
    //         groupCompanyId: element.groupCompanyId,
    //         masterMappingType: element.jobMasterType,
    //         masterCode: element.masterCode,
    //         companyName: element.masterDescription,
    //         isSelected: false,
    //         companyActive: element.active,


    //         // id: i++,
    //         // groupCompanyId: element.groupCompanyId,
    //         // companyName: element.masterCode,
    //         // companyActive: element.companyActive,
    //         // isSelected: false,
    //       };
    //       this.groupCompanyDetailsList.push( { id: element.groupCompanyId, itemName: element.companyName } );
    //       this.summaryCompanyHtmlDataList.push( obj );
    //       this.summaryCompanyHtmlDataList1.push( obj );
    //     }
    //   } );
    // } );

    // this.getAllOtheMappingDetails();
  }
  getJobMasterDropDownListAssign(){
    this.jobMasterService.get('all-othermasters-mapping/details').subscribe((res) => {
      this.getAllJobMappingsList = res.data.results;
      console.log("getAllJobMappingsList", this.getAllJobMappingsList )
        res.data.results.forEach((element) => {
        const obj = {
          label: element.companyName,
          value: element.companyName,
        };
        this.allMappingList.push(obj);
      });
    //  this.refreshHtmlTable();

    });
  }

  //komal // get Job Master Drop down API

  getJobMasterDropDownList(){
    this.jobMasterService.getAllJobMasters().subscribe((res) => {
      this.getAllJobMastersList = res.data.results;
      console.log("getAllJobMastersList", this.getAllJobMastersList )
        res.data.results.forEach((element) => {
        const obj = {
          label: element.jobMasterType,
          value: element.jobMasterType,
        };
        this.allJobsList.push(obj);

      });
    //  this.refreshHtmlTable();

    });
  }

  refreshHtmlTable() {


    this.jobMasterService.getAllOtherMasterDetails().subscribe( ( res ) => {
      this.masterGridDataList = res.data.results;
      console.log( 'getAllOtherMasterDetails xx', res );
      console.log( 'masterGridDataList xx', this.masterGridDataList );
      let i = 1;
      res.data.results.forEach( ( element ) => {

        const obj = {
          SrNo: i++,
          masterId: element.jobMasterId,
          jobMasterValueId: element.jobMasterValueId,
          masterCode: element.masterCode,
          masterDescription: element.masterDescription,
          jobMasterType: element.jobMasterType,
          isActive: element.active,
          isChecked: false,
        };
        this.summaryHtmlDataList.push( obj );
        this.tableDataList.push( obj );
        // this.tableDataList1.push( obj );

      } );
    } );

    this.tableDataList = [];
    // this.tableDataList1 = [];
    this.summaryHtmlDataList = [];
    this.masterGridDataList = [];
  }
  // saveBusinessAreaMasterMapping() {
  //   const saveData = ({
  //     masterCode: 'SampleCode',
  //     masterDescription: 'Description',
  //     createdBy: 'AnantT',
  //   });

  //   this.jobMasterService.post(saveData, 'business-area-master-mapping/map-all').subscribe((res) => {
  //     console.log('business-area-master-mapping/map-all', res);
  //     if (res.data.results.length !== 0) {
  //       this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
  //     } else {
  //       this.alertService.sweetalertWarning(res.status.messsage);
  //     }
  //   }, (error: any) => {
  //     this.alertService.sweetalertError(error['error']['status']['messsage']);
  //   });
  // }

  saveJobMaster(){
    // const data = this.form.getRawValue();


    const data = [{
      jobMasterId: this.form.get('jobMasterId').value,
      masterDescription: this.form.get( 'masterDescription' ).value,
      masterCode: this.form.get( 'masterCode' ).value,
    }];


    this.jobMasterService.postJobSelectedJobMaster(data).subscribe(
      (res: any) => {
        console.log(res);
        if(res){
          if(res.data.results.length > 0) {
            // this.tableDataList = res.data.results;
            this.refreshHtmlTable();
            this.alertService.sweetalertMasterSuccess( res.status.message, '' );
            this.alertService.sweetalertMasterSuccess( 'Recored Save Successfully.', '' );

          } else {
            this.alertService.sweetalertWarning(res.status.messsage);
          }
        }else {
          this.alertService.sweetalertError(
            'Something went wrong. Please try again.'
          );
        }
      });
      // this.refreshHtmlTable();
      this.form.reset();

      // this.refreshHtmlTable();
      // this.getJobMasterDropDownList();

  }

  viewJobMaster( i: number) {
    console.log( i)
    window.scrollTo( 0, 0 );
    this.isEditMode = true;
    this.hideFormControl = true;
    this.form.reset();
    this.form.patchValue( this.masterGridDataList[i] );

    this.form.patchValue( {
      masterId: this.masterGridDataList[i].masterId,
      jobMasterValueId: this.masterGridDataList[i].jobMasterValueId,
      masterCode: this.masterGridDataList[i].masterCode,
      masterDescription: this.masterGridDataList[i].masterDescription,
      jobMasterType: this.masterGridDataList[i].jobMasterType,
      isActive: this.masterGridDataList[i].isActive,

      // masterId: element.jobMasterId,
      // jobMasterValueId: element.jobMasterValueId,
      // masterCode: element.masterCode,
      // masterDescription: element.masterDescription,
      // jobMasterType: element.jobMasterType,
      // isActive: element.active,
      // isChecked: false,

    } );
    this.form.disable();

    this.form.disable();
  }




  // editUpdateDataJobMaster(i){
  //   // this.onSelectJobMaster( i );
  //   this.hideFormControl = true;
  //   this.isEditMode = true;
  //   window.scrollTo( 0, 0 );
  //   this.form.patchValue(this.masterGridDataList[i]);
  //   this.Index = i;

  // }

  editUpdateDataJobMaster(i: number){
    // this.onSelectJobMaster( i );
    this.hideFormControl = true;
    this.isEditMode = true;
    window.scrollTo( 0, 0 );
    this.form.patchValue(this.tableDataList[i]);
    this.Index = i;

  }

  updateSave(){
    console.log("masterType", this.form.get('masterType').value)

    const toSelect = this.masterGridDataList.find(
      (c) => c.jobMasterType == this.form.get('masterType').value);

       this.form.get('jobMasterId').setValue(toSelect.jobMasterId);
       this.form.get('jobMasterValueId').setValue(toSelect.jobMasterValueId);

       this.form.get('isActive').setValue(toSelect.active);

      console.log("jobMasterValueId", this.form.get('jobMasterValueId').setValue(toSelect.jobMasterValueId));
      console.log("active",  this.form.get('isActive').setValue(toSelect.active));

    const data = {
      jobMasterId: parseInt(this.form.get('jobMasterId').value),
      masterDescription: this.form.get( 'masterDescription' ).value,
      masterCode: this.form.get( 'masterCode' ).value,
      jobMasterValueId: parseInt(this.form.get( 'jobMasterValueId' ).value),
      active: this.form.get( 'isActive' ).value,
    };


    this.jobMasterService.putJobMasterDetails(data).subscribe(
      (res: any) => {
        // addAttributeCreation.attributeMasterIdList = [];
        if ( res.data.results.length > 0 ) {
          console.log( 'data is updated' );
          // this.isEditMode = false;
          this.refreshHtmlTable();
          this.alertService.sweetalertMasterSuccess( 'Recored Updated Successfully.', '' );

          // this.isSaveAndReset = true;
          // this.showButtonSaveAndReset = true;
          this.form.reset();

          this.isEditMode = false;
          // this.refreshHtmlTableData();
          // this.form.patchValue( {
          //   companyRegistrationId: '',
          //   issuedBy: '',
          // } );
        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }

      }
    );
  }


  public findByPolicyNo(masterId, tableDataList) {
    return tableDataList.find((x) => x.jobMasterId === masterId);
  }

  saveJobMasterMapping(){
    // const data = this.form.getRawValue();
    this.modalRef.hide();
    let businessArea = [];

    for ( let i = 0; i < this.selectedCheckBox.length; i++ ) {
      for ( let j = 0; j < this.selectedCompanyListCheckBox.length; j++ ) {

        const obj = {
          jobMasterValueId: this.selectedCheckBox[i].jobMasterValueId,
          groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
        };
        businessArea.push( obj );
      }
    }

    console.log("businessArea",businessArea);


    if ( businessArea.length > 0 ) {
      // const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Business Area' );
      this.jobMasterService.postMapping(businessArea).subscribe(
        (res: any) => {
        console.log( 'Business Area', res );
        if ( res.data.results.length !== 0 ) {
          this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }
      }, ( error: any ) => {
        this.alertService.sweetalertError( error['error']['status']['messsage'] );
      } );
    }
      this.enableCheckAll = false;
      this.uncheckSelectAll = false;
      this.selectedCheckBox = [];
      this.uncheckSelectAll = false;
      this.summaryHtmlDataList.forEach( x => x.isChecked = false );
      this.tableDataList.forEach( x => x.isChecked = false );
      this.enableCheckAll = false;

  }



  saveMaster() {
    //  let lastIndex = this.tableDataList.findIndex(o=>o.masterType =='Business Area')
    let a = this.form.get( 'masterType' ).value;
    console.log( 'a value ', a );

    let len = this.tableDataList.filter( function ( item ) {
      return item.masterType == a;
    } ).length;
    this.checks = false;
    this.enableCheckAll = false;
    this.selectedCheckBox = [];
    let isActive = 0;
    console.log( 'isActive value is', this.form.get( 'isActive' ).value );
    if ( this.form.get( 'isActive' ).value == true ) {
      isActive = 1;
    } else {
      isActive = 0;

    }
    const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === this.form.get( 'masterType' ).value );
    console.log( 'selected index' + selectedIndex );
    console.log( 'in update fucntion::', this.editedRecordIndex );
    if ( this.editedRecordIndex > 0 ) {
      console.log( 'in update fucntion::', this.editedRecordIndex );
      const saveData = {
        masterId: this.editedRecordIndex,
        masterDescription: this.form.get( 'masterDescription' ).value,
        masterCode: this.form.get( 'masterCode' ).value,
        createdBy: 'AnantT',
        isActive: isActive,
      };

      // this.jobMasterService.put( saveData, this.jobMasterList[selectedIndex].putUrl ).subscribe( ( res ) => {
        this.jobMasterService.put( saveData).subscribe( ( res ) => {
        // this.jobMasterService.put( saveData, ).subscribe( ( res ) => {
        console.log( res.status.messsage );
        console.log( res );
        if ( res.data.results.length !== 0 ) {
          this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
          //this.form.reset();
          // this.form.get('masterCode').setValue = '';
          // this.form.get('masterDescription').setValue = '';
          this.form.get( 'masterCode' ).setValue( null );
          this.form.get( 'masterDescription' ).setValue( null );
          this.form.get( 'isActive' ).setValue( true );
          this.isEditMode = false;
          this.editedRecordIndex = 0;

          let findIndex = this.tableDataList.findIndex( o => o.masterId == res.data.results[0].masterId );
          const obj = {
            masterType: this.jobMasterList[selectedIndex].value,
            masterId: res.data.results[0].masterId,
            masterDescription: res.data.results[0].masterDescription,
            masterCode: res.data.results[0].masterCode,
            isActive: res.data.results[0].isActive,
            SrNo: this.tableDataList[findIndex].SrNo,
          };
          this.tableDataList[findIndex] = obj;


          //  this.refreshHtmlTable();
          // this.getAllOtheMappingDetails();
          //  this.onSelectJobMaster( 'All' );
          //   this.tableDataList = this.tableDataList.filter( ( o ) => o.masterType === 'All' );
          // this.onSelectJobMaster( 'Plant' );
          this.form.patchValue( {
            masterCode: '',
            masterDescription: '',
            isActive: true,
          } );
          //  this.tableDataList = this.tableDataList.filter( ( o ) => o.masterType === 'Plant' );


        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }
      }, ( error: any ) => {
        this.alertService.sweetalertError( error['error']['status']['messsage'] );
      }, () => {

      } );
    } else {

      const saveData = {
        masterDescription: this.form.get( 'masterDescription' ).value,
        masterCode: this.form.get( 'masterCode' ).value,
        createdBy: 'AnantT',
      };

      // this.jobMasterService.post( saveData, this.jobMasterList[selectedIndex].postUrl ).subscribe( ( res ) => {
      //   console.log( res.status.messsage );
      //   console.log( res );
      //   if ( res.data.results.length !== 0 ) {
      //     this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
      //     this.form.patchValue( {
      //       masterCode: '',
      //       masterDescription: '',
      //       isActive: true,
      //     } );


      //     const obj = {
      //       masterType: this.jobMasterList[selectedIndex].value,
      //       masterId: res.data.results[0].masterId,
      //       masterDescription: res.data.results[0].masterDescription,
      //       masterCode: res.data.results[0].masterCode,
      //       isActive: res.data.results[0].isActive,
      //       SrNo: len + 1,
      //     };
      //     //  this.summaryHtmlDataList.push( obj );
      //     this.tableDataList.push( obj );
      //     this.summaryHtmlDataList.push( obj );

      //   } else {
      //     this.alertService.sweetalertWarning( res.status.messsage );
      //   }
      // }, ( error: any ) => {
      //   this.alertService.sweetalertError( error['error']['status']['messsage'] );
      // }, () => {

      // } );
    }
  }

  //komal delete summary table API

  deleteBusinessAreaMaster( id ): void {
    console.log( 'delete', id );
    // this.updateFlag = false;
    this.jobMasterService.delete( id )
      .subscribe( response => { //: saveBusinessYear[]
        this.alertService.sweetalertMasterSuccess( response.status.message, '' );
        // this.getAllBusinessyear();
        // this.BusinessYearform.reset();
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
  }


  // deleteBusinessAreaMaster() {
  //   const id = 0;
  //   this.jobMasterService.delete( id, '/business-area-master' ).subscribe( ( res ) => {
  //     console.log( res );
  //     this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
  //   }, ( error: any ) => {
  //     this.alertService.sweetalertError( error.error.status.messsage );
  //   }, () => { } );
  // }

  // deleteBusinessAreaMasterMapping() {
  //   let id = 0;
  //   this.jobMasterService.delete(id, '/business-area-master-mapping').subscribe((res) => {
  //     console.log(res);
  //     this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
  //   }, (error: any) => {
  //     this.alertService.sweetalertError(error.error['status'].messsage);
  //   }, () => { });
  // }

  DeleteMaster( jobMasterValueId: number, masterType: string ) {

    console.log( 'delete', jobMasterValueId );
    const selectedIndex = this.masterGridDataList.findIndex( ( o ) => o.value == masterType );
    console.log("selectedIndex",selectedIndex);
    this.jobMasterService.delete( jobMasterValueId).subscribe( ( res ) => {
      console.log( res );
      this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
      this.refreshHtmlTable();
    }, ( error: any ) => {
      this.alertService.sweetalertError( error.error.status.messsage );
    }, () => { } );
  }
// komal Delete master
  // DeleteMaster( masterId: number, masterType: string ) {
  //   console.log( 'in delete master' );

  //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value == masterType );
  //   this.jobMasterService.delete( masterId, this.jobMasterList[selectedIndex].deleteUrl ).subscribe( ( res ) => {
  //     console.log( res );
  //     this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
  //     this.refreshHtmlTable();
  //   }, ( error: any ) => {
  //     this.alertService.sweetalertError( error.error.status.messsage );
  //   }, () => { } );
  // }

  // editMaster( masterId: number, masterType: string ) {
  //   this.onSelectJobMaster( masterType );

  //   const findIndex = this.tableDataList.findIndex( ( o ) => o.masterId == masterId && o.masterType == masterType );
  //   this.editedRecordIndex = masterId;
  //   this.isEditMode = true;
  //   this.viewMode = false;
  //   this.form.patchValue( this.tableDataList[findIndex] );
  // }
  onSelectJobMaster( evt: any ) {
    this.selectedMasterTypeDropDownValue = this.form.get( 'masterType' ).value;
    this.enableCheckAll = false;
    // this.selectedCheckBox = [];
    this.tableDataList = this.summaryHtmlDataList;
    console.log( evt );
    if ( evt === 'All' ) {
      this.isEditMode = false;
      this.hideFormControl = false;
      this.tableDataList = this.summaryHtmlDataList;
      //  this.tableDataList1 = this.tableDataList;
    } else {
      this.hideFormControl = true;
      this.tableDataList = this.tableDataList.filter( ( o ) => o.masterType === evt );
    }
    // this.tableDataList1 = this.tableDataList;
    this.checks = false;
    console.log( evt );
    const toSelect = this.getAllJobMastersList.find(
      (c) => c.jobMasterType === this.form.get('masterType').value
    );
    this.form.get('jobMasterId').setValue(toSelect.jobMasterId);
      console.log("jobMasterId", this.form.get('jobMasterId').setValue(toSelect.jobMasterId));
      console.log("jobMasterId", this.form.jobMasterId)
  }
  cancelView() {
    this.summaryHtmlDataList.forEach( x => x.isChecked = false );
    this.tableDataList.forEach( x => x.isChecked = false );
    this.enableCheckAll = false;
    console.log( 'in reset' );
    this.checks = false;
    this.editedRecordIndex = 0;
    this.isEditMode = false;
    //  this.form.reset();
    this.form.get( 'isActive' ).setValue( true );
    //  this.onSelectJobMaster( 'All' );
    this.form.patchValue( {
      masterCode: '',
      masterDescription: '',
    } )
  }

  onCheckboxChangeMasterSummary( evt: any, id: number, masterType?: string, masterCode?: string ) {
    // this.enableCheckAll = false;
    // console.log(evt);
    // console.log(evt.target.checked);
    console.log( 'check Box', this.checks );
    // console.log(id);
    if ( id == -1 ) {
      console.log( 'id == -1::' );
      if ( evt.target.checked == true ) {
        this.checks = false;
        this.enableCheckAll = false;
        this.selectedCheckBox = [];
        this.enableCheckAll = true;

        // this.tableDataList.forEach( x => x.isChecked = true && x.active == false );


        for ( let i = 0; i < this.tableDataList.length; i++ ) {
          if ( this.tableDataList[i].isActive == 1 ) {
            this.selectedCheckBox.push( this.tableDataList[i] );
            this.tableDataList[i].isChecked = true;

          }
        }
      } else {
        for ( let i = 0; i < this.tableDataList.length; i++ ) {
          if ( this.tableDataList[i].isActive == 1 ) {
            this.tableDataList[i].isChecked = false;
          }
        }
        this.checks = false;
        this.enableCheckAll = false;
        this.selectedCheckBox = [];
      }
    } else {
      let findIndexOfTableDataList = this.tableDataList.findIndex( o => o.masterType == masterType && o.masterCode == masterCode );
      let findIndexOfSummaryHtmlDataListList = this.summaryHtmlDataList.findIndex( o => o.masterType == masterType && o.masterCode == masterCode );
      //console.log( 'indexe find is', findIndex );
      if ( evt.target.checked == true ) {
        console.log( 'xxxxxxxxx' );
        // this.summaryHtmlDataList[findIndex].isChecked = true;
        this.tableDataList[findIndexOfTableDataList].isChecked = true;
        this.summaryHtmlDataList[findIndexOfSummaryHtmlDataListList].isChecked = true;
        this.checks = false;


        console.log( 'chceck this', this.tableDataList );
        this.selectedCheckBox.push( this.tableDataList[findIndexOfTableDataList] );
        console.log( 'this.tableDataList[findIndex]', this.tableDataList[findIndexOfTableDataList] );
      } else if ( evt.target.checked === false ) {
        //   this.summaryHtmlDataList[findIndex].isChecked = false;
        this.tableDataList[findIndexOfTableDataList].isChecked = false;
        this.summaryHtmlDataList[findIndexOfSummaryHtmlDataListList].isChecked = false;
        this.checks = false;
        console.log( 'in removing section' );
        this.selectedCheckBox.splice( this.tableDataList[findIndexOfTableDataList], 1 );
        console.log( 'this.summaryHtmlDataList[findIndex]', this.tableDataList[findIndexOfTableDataList] );
      } else {
        console.log( 'something error' );
      }
    }
    console.log( this.selectedCheckBox );

  }


  deactiveActiveCheckBox() {
    console.log( this.form.get( 'isActive' ).value );
  }
  addItemType() { }

  onCheckCompanyboxChange( evt: any, id: number ) {
    this.enableCompanyCheckAll = false;

    if ( id == -1 ) {
      console.log( 'id == -1::' );
      console.log( 'this.summaryCompanyHtmlDataList::', this.summaryCompanyHtmlDataList );
      if ( evt.target.checked == true ) {
        this.enableCompanyCheckAll = true;
        this.selectedCompanyListCheckBox = this.summaryCompanyHtmlDataList1;
      } else {
        this.enableCompanyCheckAll = false;
        this.selectedCompanyListCheckBox = [];
      }
    } else {

      if ( evt.target.checked == true ) {
        this.selectedCompanyListCheckBox.push( this.summaryCompanyHtmlDataList[id] );
      } else if ( evt.target.checked === false ) {
        console.log( 'in removing section' );
        this.selectedCompanyListCheckBox.splice( this.summaryCompanyHtmlDataList[id], 1 );
      } else {
        console.log( 'something error' );
      }
    }
    console.log( this.selectedCompanyListCheckBox );
  }

  // onCheckCompanyboxChange1(evt: any, id: number) {
  //   this.enableCompanyCheckAll = false;
  //   if (id == -1) {
  //     console.log('id == -1::');
  //     if (evt.target.checked == true) {
  //       this.enableCompanyCheckAll = true;
  //       for(let i =0;i<this.tableDataList1.length;i++){
  //         if(this.tableDataList1[i].isActive == 1){
  //          this.selectedCompanyListCheckBox.push(this.tableDataList1[i]);
  //         }
  //       }
  //     } else {
  //       this.enableCompanyCheckAll = false;
  //       this.selectedCompanyListCheckBox = [];
  //     }
  //   } else {
  //     if (evt.target.checked == true) {
  //       this.selectedCompanyListCheckBox.push(this.summaryCompanyHtmlDataList[id]);
  //     } else if (evt.target.checked === false) {
  //       console.log('in removing section');
  //       this.selectedCompanyListCheckBox.splice(this.summaryCompanyHtmlDataList[id], 1);
  //     }
  //   }
  //   console.log(this.selectedCompanyListCheckBox);
  //    // if (evt.target.checked == true) {
  //   //   this.selectedCompanyListCheckBox.push(row);
  //   // } else if (evt.target.checked === false) {
  //   //   console.log('in removing section');
  //   //   this.selectedCompanyListCheckBox.splice(row, 1);
  //   // } else {
  //   //   console.log('something error');
  //   // }
  // }
  saveMapToCompany() {
    this.modalRef.hide();

    let businessArea = [];
    let Cost_Centre = [];
    const Department = [];
    const Division = [];
    let Sub_Cost_Centre = [];
    let Sub_Department = [];
    let Sub_Location = [];
    let GL_Code = [];
    const Grade = [];
    let Profit_Centre = [];
    const Project = [];
    const Region = [];
    const SubArea = [];
    let Strategic_Business_Unit = [];
    const Plant = [];
    let Work_Location = [];
    for ( let i = 0; i < this.selectedCheckBox.length; i++ ) {
      for ( let j = 0; j < this.selectedCompanyListCheckBox.length; j++ ) {



        if ( this.selectedCheckBox[i].masterType == 'Business Area' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          businessArea.push( obj );

        }
        if ( this.selectedCheckBox[i].masterType == 'Cost Centre' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Cost_Centre.push( obj );

        }
        if ( this.selectedCheckBox[i].masterType == 'Department' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Department.push( obj );

        }
        if ( this.selectedCheckBox[i].masterType == 'Division' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Division.push( obj );

        }
        if ( this.selectedCheckBox[i].masterType == 'Sub Cost Centre' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Sub_Cost_Centre.push( obj );

        }
        if ( this.selectedCheckBox[i].masterType == 'Sub Department' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Sub_Department.push( obj );

        }
        if ( this.selectedCheckBox[i].masterType == 'GL Code' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          GL_Code.push( obj );

        }
        if ( this.selectedCheckBox[i].masterType == 'Grade' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Grade.push( obj );

        }
        if ( this.selectedCheckBox[i].masterType == 'Plant' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Plant.push( obj );

        }
        if ( this.selectedCheckBox[i].masterType == 'Sub Location' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Sub_Location.push( obj );

        }
        if ( this.selectedCheckBox[i].masterType == 'Project' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Project.push( obj );

        }
        if ( this.selectedCheckBox[i].masterType == 'Profit Centre' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Profit_Centre.push( obj );
        }
        if ( this.selectedCheckBox[i].masterType == 'Region' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Region.push( obj );

        }
        if ( this.selectedCheckBox[i].masterType == 'Sub Area' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          SubArea.push( obj );

        }
        if ( this.selectedCheckBox[i].masterType == 'Strategic Business Unit' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Strategic_Business_Unit.push( obj );

        }
        if ( this.selectedCheckBox[i].masterType == 'Work Location' ) {
          const obj = {
            masterId: this.selectedCheckBox[i].masterId,
            groupCompanyId: this.selectedCompanyListCheckBox[j].groupCompanyId,
            createdBy: 'AnantT',
          };
          Work_Location.push( obj );

        }
      }
    }
    // const data = this.form.getRawValue();


    // this.jobMasterService.postJobSelectedJobMaster(data).subscribe(
    //   (res: any) => {
    //     // addAttributeCreation.attributeMasterIdList = [];
    //     // this.targetProducts = [];
    //     // this.getAllAttributeSelection();
    //     this.alertService.sweetalertMasterSuccess(res.status.message, '');
    //     this.form.reset();
    //     // this.resetAttributeSelection();
    //   },
    //   (error: any) => {
    //     this.alertService.sweetalertError(error['error']['status']['message']);
    //   }
    // );

    // if ( businessArea.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Business Area' );
    //   this.jobMasterService.postMapping( businessArea, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Business Area', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }


    /// end of two for loop i & j ...
    // if ( businessArea.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Business Area' );
    //   this.jobMasterService.postMapping( businessArea, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Business Area', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }


    // if ( Cost_Centre.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Cost Centre' );
    //   this.jobMasterService.post( Cost_Centre, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Cost Centre', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Department.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Department' );
    //   this.jobMasterService.post( Department, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Department', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Division.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Division' );
    //   this.jobMasterService.post( Division, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Division', res );
    //     if ( res.data.results.length !== 0 ) {

    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Sub_Cost_Centre.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Sub Cost Centre' );
    //   this.jobMasterService.post( Sub_Cost_Centre, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Sub Cost Centre', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Sub_Department.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Sub Department' );
    //   this.jobMasterService.post( Sub_Department, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Sub Department', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Sub_Location.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Sub Location' );
    //   this.jobMasterService.post( Sub_Location, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Sub Location', res );
    //     if ( res.data.results.length !== 0 ) {

    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( GL_Code.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'GL Code' );
    //   this.jobMasterService.post( GL_Code, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'GL Code', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Grade.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Grade' );
    //   this.jobMasterService.post( Grade, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Grade', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Plant.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Plant' );
    //   this.jobMasterService.post( Plant, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Plant', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Profit_Centre.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Profit Centre' );
    //   this.jobMasterService.post( Profit_Centre, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Profit Centre', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Project.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Project' );
    //   this.jobMasterService.post( Project, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Project', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Region.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Region' );
    //   this.jobMasterService.post( Region, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Region', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( SubArea.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Sub Area' );
    //   this.jobMasterService.post( SubArea, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'SubArea', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Strategic_Business_Unit.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Strategic Business Unit' );
    //   this.jobMasterService.post( Strategic_Business_Unit, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Strategic Business Unit', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );

    // }
    // if ( Work_Location.length > 0 ) {
    //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === 'Work Location' );
    //   this.jobMasterService.post( Work_Location, this.jobMasterList[selectedIndex].postMappingToCompany ).subscribe( ( res ) => {
    //     console.log( 'Work Location', res );
    //     if ( res.data.results.length !== 0 ) {
    //       this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
    //     } else {
    //       this.alertService.sweetalertWarning( res.status.messsage );
    //     }
    //   }, ( error: any ) => {
    //     this.alertService.sweetalertError( error['error']['status']['messsage'] );
    //   } );
    // }
    this.enableCheckAll = false;
    this.uncheckSelectAll = false;
    this.selectedCheckBox = [];
    this.uncheckSelectAll = false;


    this.summaryHtmlDataList.forEach( x => x.isChecked = false );
    this.tableDataList.forEach( x => x.isChecked = false );
    this.enableCheckAll = false;

  }

  // isAllSelected( evt: any ) {
  //   if ( evt.target.value == false ) {
  //     this.checkUncheckAll();
  //   } else {
  //     this.enableCompanyCheckAll = true;
  //     this.masterSelected = this.summaryCompanyHtmlDataList.every( function ( item: any ) {
  //       return item.isSelected == true;
  //     } );
  //     // this.getCheckedItemList();
  //   }
  // }

  // getCheckedItemList() {
  //   this.checkedList = [];
  //   for ( let i = 0; i < this.summaryCompanyHtmlDataList.length; i++ ) {
  //     if ( this.summaryCompanyHtmlDataList[i].isSelected ) {
  //       this.checkedList.push( this.summaryCompanyHtmlDataList[i] );
  //     }
  //   }
  //   this.checkedList = JSON.stringify( this.checkedList );
  // }

  // checkUncheckAll() {
  //   for ( let i = 0; i < this.summaryCompanyHtmlDataList.length; i++ ) {
  //     this.summaryCompanyHtmlDataList[i].isSelected = this.masterSelected;
  //   }
  //   this.getCheckedItemList();
  // }

  UploadModal( template: TemplateRef<any> ) {
    this.checksCompany = false;
    this.enableCompanyCheckAll = false;
    this.selectedCompanyListCheckBox = [];
    this.modalRef = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-md' } ),
    );
    this.getAllOtheMappingDetails();
  }
  getAllOtheMappingDetails() {
    this.summaryAllOtherMappingDetailsList = [];
    this.getAllOtherMappingDetailsResponse = [];


    this.jobMasterService.getAllOtheMappingDetails().subscribe( ( res ) => {
       console.log(res)
      this.getAllOtherMappingDetailsResponse = res.data.results;
      console.log("getAllOtherMappingDetailsResponse",this.getAllOtherMappingDetailsResponse);
      let i = 1;
      res.data.results.forEach( ( element ) => {
        if ( element.active == 1 ) {
          const obj = {
            // SrNo: i++,
            // masterMappingId: element.masterMappingId,
            // masterId: element.masterId,
            // groupCompanyId: element.groupCompanyId,
            // masterMappingType: element.masterMappingType,
            // masterCode: element.masterCode,
            // companyName: element.companyName,
            // isActive: element.isActive,

            SrNo: i++,
            masterMappingId: element.jobMasterMappingId,
            masterId: element.jobMasterValueId,
            groupCompanyId: element.groupCompanyId,
            masterMappingType: element.jobMasterType,
            masterCode: element.masterCode,
            companyName: element.masterDescription,
            isActive: element.active,


          //   SrNo: i++,
          //  jobMasterMappingId : element 43,
          //      jobMasterValueId : 39,
          //      groupCompanyId : 2,
          //      jobMasterType :Project ,
          //      masterCode :Project test ,
          //      masterDescription :Test Project ,
          //      active :

          };
          this.summaryAllOtherMappingDetailsList.push( obj );
          // this.tableDataList.push(obj);
        }
      } );
    } );

  }
//Komal comment
  // DeleteMasterMapping( masterId: number, masterType: string ) {
  //   console.log( 'in delete master mapping  id', masterId + 'Master type', masterType );
  //   const selectedIndex = this.jobMasterList.findIndex( ( o ) => o.value === masterType );

  //   this.jobMasterService.delete( masterId, this.jobMasterList[selectedIndex].deleteMapping ).subscribe( ( res ) => {
  //     console.log( res );
  //     this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
  //     this.getAllOtheMappingDetails();
  //   }, ( error: any ) => {
  //     this.alertService.sweetalertError( error.error.status.messsage );
  //   }, () => { } );
  // }

  DeleteMasterMapping( jobMasterValueId: number, masterType: string ) {

    console.log( 'delete', jobMasterValueId );
    const selectedIndex = this.getAllOtherMappingDetailsResponse.findIndex( ( o ) => o.value == masterType );
    console.log("selectedIndex",selectedIndex);
    this.jobMasterService.deleteMapping( jobMasterValueId).subscribe( ( res ) => {
      console.log( res );
      this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
      this.refreshHtmlTable();
    }, ( error: any ) => {
      this.alertService.sweetalertError( error.error.status.messsage );
    }, () => { } );
  }

  ConfirmationDialog( confirmdialog: TemplateRef<any>, id: number, type: string, summaryType: string ) {
    this.id = id;
    this.type = type;
    this.summaryType = summaryType;
    this.modalRef = this.modalService.show(
      confirmdialog,
      Object.assign( {}, { class: 'gray modal-md' } )
    );
  }
  clickedOnYes() {
    console.log( 'yes' );
    if ( this.summaryType == 'master-summary' ) {
      this.DeleteMaster( this.id, this.type );
    }
    if ( this.summaryType == 'assignment-summary' ) {
      // this.DeleteMasterMapping( this.id, this.type );
    }
  }
}
