import { CompanySettingsService } from './../company-settings.service';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AlertServiceService } from '../../../../app/core/services/alert-service.service';
import { SaveHeadCreation } from '../model/business-cycle-model';


@Component( {
  selector: 'app-head-creation',
  templateUrl: './head-creation.component.html',
  styleUrls: ['./head-creation.component.scss'],
  encapsulation: ViewEncapsulation.None
} )
export class HeadCreationComponent implements OnInit {
  NatureList: Array<any> = [];
  headCreationList = [];
  TypeList: Array<any> = [];
  HeadCreationList: Array<any> = [];
  viewCancelButton: boolean = false;
  HeadCreationForm: FormGroup;
  Name: string;
  disabled: boolean = true;
  categoryList = [{ value: 'Reimbursement', label: 'Reimbursement' }, { value: 'Statutory', label: 'Statutory' }];
  constructor(
    private formBuilder: FormBuilder, private alertService: AlertServiceService,
    private headCreationService: CompanySettingsService,
    @Inject( DOCUMENT ) private document: Document ) {
    this.NatureList = [
      { label: 'Earning', value: 'Earning' },
      { label: 'Deduction', value: 'Deduction' },
      { label: 'Perquisite', value: 'Perquisite' },
    ];
  }

  ngOnInit(): void {

    this.HeadCreationForm = this.formBuilder.group( {
      id: new FormControl( null ),
      shortName: new FormControl( '', Validators.required ),
      headNature: new FormControl( '', Validators.required ),
      standardName: new FormControl( '', Validators.required ),
      description: new FormControl( '', Validators.required ),
      category: new FormControl( '' ),
      //  statutory: new FormControl( 'false' ),
      type: new FormControl( '', Validators.required ),
    } );
    this.getAllHeadCreation();
  }

  // get All HeadCreation
  getAllHeadCreation(): void {
    this.headCreationService.getAllHeadCreation().subscribe( res => {
      let i = 1;
      this.HeadCreationList = res.data.results;
      res.data.results.forEach( element => {

        let obj = {
          SrNo: i++,
          globalAttributeMasterId: element.globalAttributeMasterId,
          code: element.code,
          attributeNature: element.attributeNature,
          numberOfOption: element.numberOfOption,
          description: element.description,

        };
        // let optionList = [];
        // if ( element.optionList.length !== undefined ) {
        //   for ( let i = 0; i < element.optionList.length; i++ ) {
        //     if ( i == 0 ) {
        //       optionList.push( element.optionList[i].optionValue );
        //     } else {
        //       optionList.push( +',' + element.optionList[i].optionValue );
        //     }
        //   }
        // }

        // obj.optionList = optionList;
        this.headCreationList.push( obj );
      } );
    } );
  }

  // get HeadCreation by Id
  GetHeadCreationbyIdDisable( id ): void {
    // this.CycleupdateFlag=true;
    // this.CycleupdateFlag1=false;
    this.disabled = false;
    this.viewCancelButton = true;
    this.headCreationService.GetHeadCreationById( id )
      .subscribe( response => {

        this.HeadCreationForm.patchValue( { id: response.data.results[0].headMasterId } );
        this.HeadCreationForm.patchValue( { standardName: response.data.results[0].standardName } );
        this.HeadCreationForm.patchValue( { description: response.data.results[0].description } );
        this.HeadCreationForm.patchValue( { shortName: response.data.results[0].shortName } );
        this.HeadCreationForm.patchValue( { headNature: response.data.results[0].headNature } );
        this.HeadCreationForm.patchValue( { type: response.data.results[0].type } );
        //  this.HeadCreationForm.patchValue( { statutory: ( response.data.results[0].statutory ).toString() } );
        this.HeadCreationForm.patchValue( { category: response.data.results[0].category } );
      } );
  }

  addHeadCreation(): void {

    const addHeadCreation: SaveHeadCreation = Object.assign( {}, this.HeadCreationForm.value );
    if ( addHeadCreation.id == undefined || addHeadCreation.id == 0 ) {
      // delete addHeadCreation.id;
      // delete addHeadCreation.type;
      console.log( JSON.stringify( addHeadCreation ) );
      this.headCreationService.AddHeadCreation( addHeadCreation ).subscribe( ( res: any ) => {
        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.getAllHeadCreation();
        this.HeadCreationForm.reset();
        // this.HeadCreationForm.patchValue( { statutory: '0' } );
      },
        ( error: any ) => {
          this.alertService.sweetalertError( error["error"]["status"]["message"] );
        } );
    }
  }
  CancelHeadCreation(): void {
    this.disabled = true;
    this.HeadCreationForm.reset();
    this.viewCancelButton = false;
    // this.HeadCreationForm.patchValue( { statutory: 'false' } );
    this.HeadCreationForm.patchValue( {
      headNature: '',
      type: '',
      category: '',
    } );
  }

  ResetHeadCreation(): void {
    this.HeadCreationForm.reset();
    this.viewCancelButton = false;
    //  this.HeadCreationForm.patchValue( { statutory: 'false' } );
    this.HeadCreationForm.patchValue( {
      headNature: '',
      type: '',
      category: '',
    } );
  }


  onChangeEvent( event: any ): void {
    this.Name = event.target.value;
    // if ((this.id == undefined || this.id == '00000000-0000-0000-0000-000000000000')) {
    this.HeadCreationForm.patchValue( { shortName: this.Name } );
    // this.EventDetails.controls["RegistrationClosedDate"].setValue["EventStartDate"];
    // this.notificationForm.patchValue({ scheduleTime: this.CurrentTime });
    // }

  }
  onChangeNature( evt: any ) {
    this.TypeList = [];
    console.log( evt );
    this.headCreationService.getByHeadMasterByNature( evt ).subscribe( res => {

      this.TypeList = res.data.results;
      console.log( this.TypeList );
    } );
    this.HeadCreationForm.patchValue( { type: '' } );
  }

}
