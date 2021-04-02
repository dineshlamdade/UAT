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
  NatureList = [{ label: 'Earning', value: 'Earning' }, { label: 'Deduction', value: 'Deduction' }, { label: 'Perquisite', value: 'Perquisite' }];
  categoryList = [{ value: 'Reimbursement', label: 'Reimbursement' }, { value: 'Statutory', label: 'Statutory' }];
  headCreationList = [];
  TypeList: Array<any> = [];
  HeadCreationList: Array<any> = [];
  viewCancelButton: boolean = false;
  HeadCreationForm: FormGroup;
  disabled: boolean = true;
  constructor(
    private formBuilder: FormBuilder, private alertService: AlertServiceService,
    private headCreationService: CompanySettingsService,
    @Inject( DOCUMENT ) private document: Document ) {

  }

  ngOnInit(): void {

    this.HeadCreationForm = this.formBuilder.group( {
      id: new FormControl( null ),
      shortName: new FormControl( '', Validators.required ),
      headNature: new FormControl( '', Validators.required ),
      standardName: new FormControl( '', Validators.required ),
      description: new FormControl( '', Validators.required ),
      category: new FormControl( '', Validators.required ),
      type: new FormControl( '', Validators.required ),
    } );
    this.getAllHeadCreation();
  }

  // get All HeadCreation
  getAllHeadCreation(): void {
    this.HeadCreationList = [];
    this.headCreationService.getAllHeadCreation().subscribe( res => {
      this.HeadCreationList = res.data.results;
    } );
  }

  // get HeadCreation by Id
  GetHeadCreationbyIdDisable( id ): void {
    this.disabled = false;
    this.viewCancelButton = true;
    this.headCreationService.GetHeadCreationById( id )
      .subscribe( response => {
        this.HeadCreationForm.patchValue( { id: response.data.results[0].headMasterId } );
        this.HeadCreationForm.patchValue( { standardName: response.data.results[0].standardName } );
        this.HeadCreationForm.patchValue( { description: response.data.results[0].description } );
        this.HeadCreationForm.patchValue( { shortName: response.data.results[0].shortName } );
        this.HeadCreationForm.patchValue( { headNature: response.data.results[0].headNature } );
        this.onChangeNature( response.data.results[0].headNature );
        this.HeadCreationForm.patchValue( { type: response.data.results[0].type } );
        this.HeadCreationForm.patchValue( { category: response.data.results[0].category } );
      } );
    this.HeadCreationForm.disable();
  }

  addHeadCreation(): void {

    const addHeadCreation: SaveHeadCreation = Object.assign( {}, this.HeadCreationForm.value );
    console.log( JSON.stringify( addHeadCreation ) );
    this.headCreationService.AddHeadCreation( addHeadCreation ).subscribe( ( res: any ) => {
      this.alertService.sweetalertMasterSuccess( res.status.message, '' );
      this.getAllHeadCreation();
      this.CancelHeadCreation();
    },
      ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["message"] );
      } );

  }
  CancelHeadCreation(): void {
    this.HeadCreationForm.enable();
    this.disabled = true;
    this.HeadCreationForm.reset();
    this.viewCancelButton = false;
    this.HeadCreationForm.patchValue( {
      headNature: '',
      type: '',
      category: '',
    } );
  }

  ResetHeadCreation(): void {
    this.HeadCreationForm.reset();
    this.viewCancelButton = false;
    this.HeadCreationForm.patchValue( {
      headNature: '',
      type: '',
      category: '',
    } );
  }


  onChangeEvent( event: any ): void {
    this.HeadCreationForm.patchValue( { shortName: event.target.value } );
  }
  onChangeNature( evt: any ) {
    this.TypeList = [];
    this.headCreationService.getByHeadMasterByNature( evt ).subscribe( res => {
      this.TypeList = res.data.results;
    } );
    this.HeadCreationForm.patchValue( { type: '' } );
  }

}
