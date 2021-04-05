import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ComplianceHeadService } from '../compliance-head/compliance-head.service';
import { ComplianceMasterService } from '../compliance-master/compliance-master.service';
import { EstablishmentMasterService } from '../establishment-master/establishment-master.service';
import { StatuatoryComplianceService } from '../statutory-compliance/statuatory-compliance.service';
import { combineLatest } from 'rxjs';

@Component( {
  selector: 'app-compliance-mapping',
  templateUrl: './compliance-mapping.component.html',
  styleUrls: ['./compliance-mapping.component.scss']
} )
export class ComplianceMappingComponent implements OnInit {
  [x: string]: any;
  complianceHeadNameList = [];
  frequencyDropDownList = [];

  summaryHtmlDataListComplianceApplicability = [];
  public showButtonSaveAndReset1 = true;
  public showButtonSaveAndResetComplianceApplicability = true;
  public summaryHtmlDataList: Array<any> = [];

  complianceSDMMappingIdToDelete: number = 0;
  public isSaveAndReset1 = true;
  public deductionFrequencyList = [{ id: 1, itemName: 'Payroll' }, { id: 2, itemName: 'Statutory-Begin' }, { id: 3, itemName: ' Statutory-Last' }];
  complianceApplicationForm: FormGroup;
  complianceHeadId_Country_aplicabilityLevel_complianceHeadName_Object = [];
  institutionNameList = [];
  forQuarterly = [{ id: 1, itemName: 'Jan-Jun' }, { id: 2, itemName: 'Feb-Apr' }, { id: 3, itemName: 'Mar-May' }];
  forHalfYearly = [{ id: 1, itemName: 'Jan-Jun' }, { id: 2, itemName: 'Feb-Jul' }, { id: 3, itemName: 'Mar-Aug' }, { id: 1, itemName: 'Apr-Sep' }, { id: 2, itemName: 'May-Oct' }, { id: 3, itemName: 'Jun-Nov' }];



  constructor( private formBuilder: FormBuilder, private complianceHeadService: ComplianceHeadService, private modalService: BsModalService,
    private statuatoryComplianceService: StatuatoryComplianceService,
    private establishmentMasterService: EstablishmentMasterService, private datePipe: DatePipe,
    private complianceMasterService: ComplianceMasterService,
    private alertService: AlertServiceService ) {

  }

  ngOnInit(): void {
    this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
    this.complianceApplicationForm = this.formBuilder.group( {
      complianceMasterId: new FormControl( '', Validators.required ),
      complianceApplicabilitySDMId: new FormControl( '', Validators.required ),
      statutoryFrequency: new FormControl( '', Validators.required ),
      incomePeriod: new FormControl( '', Validators.required ),
      statutoryFreqPeriodsDef: new FormControl( '', Validators.required ),
      deductionFrequency: new FormControl( '', Validators.required ),
      complianceHeadName: new FormControl( { value: '', disabled: true } ),
    } );


    this.complianceHeadService.getComplianceHeadDetails().subscribe( ( res ) => {
      console.log( res.data.results );
      this.complianceHeadDetailsObject = res.data.results;

      res.data.results.forEach( ( element ) => {
        this.complianceHeadNameList.push( element.complianceHeadName );
        this.complianceHeadId_Country_aplicabilityLevel_complianceHeadName_Object.push( { complianceHeadId: element.complianceHeadId, country: element.country, aplicabilityLevel: element.aplicabilityLevel, complianceHeadName: element.complianceHeadName } );
      }, ( err ) => {

      }, () => { } );
    } );

    this.complianceMasterService.getFrequencyMaster().subscribe( ( res ) => {
      console.log( 'frequency list respon', res );


      res.data.results.forEach( ( element ) => {
        this.frequencyDropDownList.push( { id: element.id, itemName: element.name } );

      }, ( err ) => {

      }, () => { } );
    } );

    setTimeout( () => {
      this.refreshHtmlTableDataOfComplianceApplicability();
      this.getDropDownValuesForComplianceStatutoryFrequencyFromSDM();
      this.getDropDownValuesForApplicabilityCompliance();
      this.getInstitutionMaster();
    }, 1000 )



  }
  cancelViewComplianceApplicability() {

    this.complianceApplicationForm.reset();
    this.showButtonSaveAndResetComplianceApplicability = true;
    this.isSaveAndReset1 = true;
    this.complianceSDMMappingIdToDelete = 0;
    this.complianceApplicationForm.patchValue( {
      complianceMasterId: '',
      // tslint:disable-next-line: object-literal-sort-keys
      complianceApplicabilitySDMId: '',
      statutoryFrequencySDMId: '',
      deductionFrequency: '',
      complianceHeadName: '',
      statutoryFrequency: '',
      statutoryFreqPeriodsDef: '',


    } )
    this.complianceApplicationForm.get( 'complianceHeadName' ).disable();
  }
  saveComplianceApplication() {

    if ( this.complianceSDMMappingIdToDelete > 0 ) {

      const data = this.complianceApplicationForm.getRawValue();
      data.complianceSDMMappingId = this.complianceSDMMappingIdToDelete;
      console.log( 'raw data', data );

      delete data.complianceHeadName;
      console.log( JSON.stringify( data ) );

      this.complianceMasterService.putComplianceApplicability( data ).subscribe( res => {
        console.log( res );
        if ( res.data.results.length > 0 ) {
          this.alertService.sweetalertMasterSuccess( 'Compliance Applicability Updated Successfully.', '' );
          this.complianceApplicationForm.reset();
          this.refreshHtmlTableDataOfComplianceApplicability();
          this.resetComplianceApplicability();
        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }

      }, ( error: any ) => {
        //  this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

      } );

    } else {
      const data = this.complianceApplicationForm.getRawValue();
      delete data.complianceHeadName;
      console.log( 'raw data', data );

      console.log( JSON.stringify( data ) );

      this.complianceMasterService.postComplianceApplicability( data ).subscribe( res => {
        console.log( res );
        if ( res.data.results.length > 0 ) {
          this.alertService.sweetalertMasterSuccess( 'Compliance Applicability Saved Successfully.', '' );
          this.complianceApplicationForm.reset();
          this.refreshHtmlTableDataOfComplianceApplicability();
          this.resetComplianceApplicability();
        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }

      }, ( error: any ) => {
        //this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

      } );

    }




  }
  refreshHtmlTableDataOfComplianceApplicability() {

    this.summaryHtmlDataListComplianceApplicability = [];

    this.complianceMasterService.getComplianceMasterSDMMapping().subscribe( ( res ) => {
      console.log( 'res', res );
      let i = 1;
      res.data.results.forEach( element => {
        const obj = {
          SrNo: i++,
          complianceSDMMappingId: element.complianceSDMMappingId,
          complianceMasterId: element.complianceMasterId,
          complianceApplicabilitySDMId: element.complianceApplicabilitySDMId,
          statutoryFrequency: element.statutoryFrequency,
          statutoryFreqPeriodsDef: element.statutoryFreqPeriodsDef,
          deductionFrequency: element.deductionFrequency,
          incomePeriod: element.incomePeriod,

        };
        this.summaryHtmlDataListComplianceApplicability.push( obj );
      } );
    } );
    console.log( this.summaryHtmlDataListComplianceApplicability );
  }
  resetComplianceApplicability() {
    this.complianceApplicationForm.reset();
    this.showButtonSaveAndResetComplianceApplicability = true;
    this.isSaveAndReset1 = true;
    this.showButtonSaveAndReset1 = true;
    this.complianceSDMMappingIdToDelete = 0;

    this.complianceApplicationForm.patchValue( {
      complianceMasterId: '',
      // tslint:disable-next-line: object-literal-sort-keys
      complianceApplicabilitySDMId: '',
      statutoryFrequencySDMId: '',
      deductionFrequency: '',

    } )

    // this.isSaveAndReset1 = false;

  }

  // http://localhost:8083/hrms/v1/source-derived-matrix/derived-module-mapping/compliance/applicability compliance/
  getDropDownValuesForApplicabilityCompliance() {
    this.complianceApplicabilitySDMIdDropDownList = [];

    // http://localhost:8083/hrms/v1/source-derived-matrix/derived-module-mapping/compliance/complianceApplicabilitySDMId/
    //  let abc = 'complianceApplicabilitySDMId/';
    this.complianceMasterService.getDropDownValuesByApplicationModuleName_FieldName( 'complianceApplicabilitySDMId/' ).subscribe( ( res ) => {
      console.log( 'complianceApplicabilitySDMId sdm', res );
      //let i = 1;

      // complianceApplicabilitySDMId: 2
      // complianceMasterId: 1
      // complianceSDMMappingId: 1
      // createDateTime: "2021-02-11T05:48:45.607+00:00"
      // createdBy: "PaysquareDefault"
      // deductionFrequency: "MONTHLY"
      // incomePeriod: "0"
      // isActive: 1
      // lastModifiedBy: null
      // lastModifiedDateTime: "2021-02-11T05:48:45.607+00:00"
      // statutoryFreqPeriodsDef: "MAR-MAY"
      // statutoryFrequencySDMId: 3
      res.data.results.forEach( element => {

        const obj = {
          applicationModuleId: element.applicationModuleId,
          fieldName: element.fieldName,
          sdmDerivedMappingId: element.sdmDerivedMappingId,
          sdmDerivedModuleMappingId: element.sdmDerivedModuleMappingId,
          sourcePeriod: element.sdmMaster.sourcePeriod,
          sdmMasterId: element.sdmMaster.sdmMasterId,
          sdmName: element.sdmMaster.sdmName,
        };
        this.complianceApplicabilitySDMIdDropDownList.push( obj );

      } );
    } );
    // console.log(this.summaryHtmlDataListComplianceApplicability);
  }
  // compliance/statutory frequency/
  // http://localhost:8083/hrms/v1/source-derived-matrix/derived-module-mapping/compliance/statutoryFrequencySDMId/
  getDropDownValuesForComplianceStatutoryFrequencyFromSDM() {
    this.statutoryFrequencySDMIdDropDownList = [];
    this.complianceMasterService.getDropDownValuesByApplicationModuleName_FieldName( 'statutoryFrequencySDMId/' ).subscribe( ( res ) => {
      console.log( 'statutoryFrequencySDMId sdm', res );
      res.data.results.forEach( element => {
        const obj = {
          applicationModuleId: element.applicationModuleId,
          fieldName: element.fieldName,
          sdmDerivedMappingId: element.sdmDerivedMappingId,
          sdmDerivedModuleMappingId: element.sdmDerivedModuleMappingId,
          sourcePeriod: element.sdmMaster.sourcePeriod,
          sdmMasterId: element.sdmMaster.sdmMasterId,
          sdmName: element.sdmMaster.sdmName,
        };
        this.statutoryFrequencySDMIdDropDownList.push( obj );
      } );
    } );
  }


  getInstitutionMaster() {
    console.log( 'getInstitutionMaster' );
    this.institutionMasterList = [];
    this.complianceHeadNameList = [];
    this.institutionMasterObject = [];
    this.summaryHtmlDataList = [];
    this.masterGridDataList = [];
    this.getComplianceInstitutionMasterGridListObject = {};
    this.complianceHeadDetailsObject = {};

    combineLatest( [this.complianceHeadService.getComplianceHeadDetails(), this.statuatoryComplianceService.getCompliaceInstitutionMasterDetails(), this.complianceMasterService.getComplianceMasterDetails()] ).subscribe( ( res: any ) => {
      console.log( res[0] );
      console.log( res[1] );
      this.getComplianceHeadDetailsObject = res[0];
      this.getComplianceInstituionMasterDetails = res[1];
      this.complianceHeadDetailsObject = res[0].data.results;
      this.getComplianceInstitutionMasterGridListObject = res[1].data.results;

      res[1].data.results.forEach( ( element ) => {
        const getComplianceHeadObject = this.complianceHeadId_Country_aplicabilityLevel_complianceHeadName_Object.find( ( o ) => o.complianceHeadId == element.complianceHeadId );
        this.complianceHeadNameList.push( element.complianceHeadName );
        this.institutionMasterObject.push( { complianceHeadId: element.complianceHeadId, country: element.country, aplicabilityLevel: element.aplicabilityLevel, complianceHeadName: element.complianceHeadName } );
        let i = 1;
        this.institutionNameList.push( { label: element.institutionName, value: element.complianceHeadId } );
        const tempComplianceHeadObject = this.complianceHeadDetailsObject.find( ( o ) => o.complianceHeadId == element.complianceHeadId );

        const obj = {
          SrNo: i++,
          institutionName: element.institutionName,
          complianceHeadId: element.complianceHeadId,
          country: element.country,
          applicabilityLevel: element.applicabilityLevel,
          address1: element.address1,
          address2: element.address2,
          address3: element.address3,
          state: element.state,
          city: element.city,
          village: element.village,
          pinCode: element.pinCode,
          typeOfOffice: element.typeOfOffice,
          telephoneNumber: element.telephoneNumber,
          emailId: element.emailId,
          complianceHeadName: getComplianceHeadObject.complianceHeadName,
          country1: getComplianceHeadObject.country,
          complianceInstitutionMasterId: element.complianceInstitutionMasterId,
          getComplianceHeadObject,
          complianceDetailObject: tempComplianceHeadObject,
        };
        this.institutionMasterList.push( obj );
      } );

      let srNo = 1;
      res[2].data.results.forEach( ( element ) => {
        // if (element.isActive == 0) {
        // soft deleted record

        // } else {
        this.masterGridDataList.push( element );
        let filteredEvents = this.institutionMasterList.filter( function ( event ) {
          return event.institutionName == element.statutoryInstituteName;
        } );

        const tempObjEstablishmentAddress = this.establishmentDetailsMasterList.find( ( o ) => o.establishmentMasterId == element.establishmentMasterId );
        console.log( 'tempObjEstablishmentAddress', tempObjEstablishmentAddress );

        const obj = {
          SrNo: srNo++,
          complianceName: element.complianceName,
          statutoryInstituteName: element.statutoryInstituteName,
          // complianceHeadName: filteredEvents[0].complianceDetailObject.complianceHeadName,
          complianceHeadShortName: element.complianceHeadShortName,
          accountNumber: element.accountNumber,
          establishmentCode: tempObjEstablishmentAddress.establishmentCode,
          establishmentMasterId: element.establishmentMasterId,
          registrationNumber: element.registrationNumber,
          complianceMasterId: element.complianceMasterId,
          groupCompanyId: element.groupCompanyId,
          issueDate: element.issueDate,
          coverageDate: element.coverageDate,
          userNameForWebsite: element.userNameForWebsite,
          filter: filteredEvents[0],
          isActive: element.isActive,
        };
        this.summaryHtmlDataList.push( obj );
      } );
    } );

  }


  getInstitutionMasterOld() {
    console.log( 'getInstitutionMaster' );
    this.institutionMasterList = [];
    this.complianceHeadNameList = [];
    this.institutionMasterObject = [];
    //  this.summaryHtmlDataList = [];
    this.masterGridDataList = [];
    this.getComplianceInstitutionMasterGridListObject = {};
    this.complianceHeadDetailsObject = {};

    combineLatest( [this.complianceHeadService.getComplianceHeadDetails(), this.statuatoryComplianceService.getCompliaceInstitutionMasterDetails(), this.complianceMasterService.getComplianceMasterDetails()] ).subscribe( ( res: any ) => {
      console.log( 'getComplianceHeadDetails', res[0] );
      console.log( 'getCompliaceInstitutionMasterDetails', res[1] );
      console.log( 'getComplianceMasterDetails', res[2] );
    } );

    this.complianceMasterService.getComplianceMasterDetails().subscribe( ( res: any ) => {
      res.data.results.forEach( element => {

        const obj = {
          complianceName: element.complianceName,
          statutoryInstituteName: element.statutoryInstituteName,
          complianceHeadShortName: element.complianceHeadShortName,
          accountNumber: element.accountNumber,
          establishmentMasterId: element.establishmentMasterId,
          registrationNumber: element.registrationNumber,
          complianceMasterId: element.complianceMasterId,
          groupCompanyId: element.groupCompanyId,
          issueDate: element.issueDate,
          coverageDate: element.coverageDate,
          userNameForWebsite: element.userNameForWebsite,
          isActive: element.isActive,
        };
        this.summaryHtmlDataList.push( obj );
      } );


    } )
  }
  editMasterComplinaceApplicability( i: number, complianceSDMMappingId: number, complianceMasterId: number ) {
    window.scrollTo( 0, 0 );

    this.showButtonSaveAndResetComplianceApplicability = true;
    this.complianceSDMMappingIdToDelete = complianceSDMMappingId;
    this.isSaveAndReset1 = false;
    // this.isSaveAndReset1 = true;
    // this.showButtonSaveAndReset = false;
    this.complianceApplicationForm.reset();
    this.complianceApplicationForm.patchValue( this.summaryHtmlDataListComplianceApplicability[i] );
    let index = this.summaryHtmlDataList.findIndex( o => o.complianceMasterId == this.summaryHtmlDataListComplianceApplicability[i].complianceMasterId );
    console.log( index );
    this.complianceApplicationForm.patchValue( {
      complianceHeadName: this.summaryHtmlDataList[index].filter.complianceDetailObject.complianceHeadName,
    } );


  }
  viewMasterComplianceApplicability( i: number, complianceSDMMappingId: number, complianceMasterId: number ) {
    window.scrollTo( 0, 0 );
    this.complianceSDMMappingIdToDelete = 0;
    this.showButtonSaveAndResetComplianceApplicability = true;
    this.complianceSDMMappingIdToDelete = complianceSDMMappingId;
    this.isSaveAndReset1 = false;
    // this.isSaveAndReset1 = true;
    // this.showButtonSaveAndReset = false;
    this.complianceApplicationForm.reset();
    this.complianceApplicationForm.patchValue( this.summaryHtmlDataListComplianceApplicability[i] );
    let index = this.summaryHtmlDataList.findIndex( o => o.complianceMasterId == this.summaryHtmlDataListComplianceApplicability[i].complianceMasterId );
    console.log( index );
    this.complianceApplicationForm.patchValue( {
      complianceHeadName: this.summaryHtmlDataList[index].filter.complianceDetailObject.complianceHeadName,
    } );
    this.form.disable();

  }
  ConfirmationDialog( confirmdialog: TemplateRef<any>, i: number, complianceSDMMappingId: number, complianceMasterId: number ) {
    this.complianceSDMMappingIdToDelete = complianceSDMMappingId;

    this.modalRef = this.modalService.show(
      confirmdialog,
      Object.assign( {}, { class: 'gray modal-md' } )
    );
  }
  clickedOnYes() {
    console.log( 'yes' );
    this.complianceMasterService.deleteComplianceApplicability( this.complianceSDMMappingIdToDelete ).subscribe( ( res ) => {
      console.log( res );
      this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );

    }, ( error: any ) => {
      this.alertService.sweetalertError( error.error.status.messsage );
    }, () => {
      this.refreshHtmlTableDataOfComplianceApplicability();
    } );
  }
  onChangeStatutoryFrequency( evt: any ) {

    console.log( 'summaryHtmlDataList', this.summaryHtmlDataList );
    console.log( evt );
    if ( evt == 'Half-Yearly' ) {
      console.log( 'in half yearly' );
      this.statutoryFreqPeriodsDefList = [];
      this.statutoryFreqPeriodsDefList = this.forHalfYearly;
    } else if ( evt == 'Quarterly' ) {
      console.log( 'in Quarterly' );
      this.statutoryFreqPeriodsDefList = [];
      this.statutoryFreqPeriodsDefList = this.forQuarterly;
    } else {
      this.statutoryFreqPeriodsDefList = [{ id: 0, itemName: 'dummy' }];

    }
  }
  onChangeComplianceMaster( complianceMasterId: any ) {

    if ( complianceMasterId == '' ) {
      this.complianceApplicationForm.patchValue( {
        complianceHeadName: '',
      } );
    } else {
      console.log( this.summaryHtmlDataList );
      let index = this.summaryHtmlDataList.findIndex( o => o.complianceMasterId == complianceMasterId );
      console.log( index );
      this.complianceApplicationForm.patchValue( {
        complianceHeadName: this.summaryHtmlDataList[index].filter.complianceDetailObject.complianceHeadName,
      } );
    }
  }
  getEstablishmentMasterDetailsAndRefreshHtmlTable() {
    this.dropdownList = [];
    this.establishmentDetailsMasterList = [];
    this.establishmentDetailsmasterGridDataList = [];
    this.establishmentCodeAndId = [];
    this.establishmentMasterService.getEstablishmentMasterDetails().subscribe( ( res ) => {
      this.establishmentDetailsmasterGridDataList = res.data.results;
      this.dropdownList = res.data.results;
      let i = 1;

      res.data.results.forEach( ( element ) => {
        this.establishmentCodeAndId.push( { label: element.establishmentCode, value: element.establishmentMasterId } );
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
          officePremisesOwnership: element.officePremisesOwnership,
          linNumber: element.linNumber,
          linIssueDate: element.linIssueDate,
          gstNumber: element.gstNumber,
          gstIssueDate: element.gstIssueDate,
          stpi: element.stpi,
          stpiIssueDate: element.stpiIssueDate,
        };
        this.establishmentDetailsMasterList.push( obj );
      } );
    }, ( error: any ) => {
      this.alertService.sweetalertError( error['error']['status']['messsage'] );

    }, () => {
      // this.refreshHtmlTableData();
    } );
  }
}
