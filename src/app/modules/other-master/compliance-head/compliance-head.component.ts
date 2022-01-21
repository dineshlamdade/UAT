import { ComplianceMasterService } from './../compliance-master/compliance-master.service';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ComplianceHeadService } from './compliance-head.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ExcelserviceService } from './../../../core/services/excelservice.service';
import { SortEvent } from 'primeng/api';
import { AnyMxRecord } from 'dns';

interface City {
  name: string,
  code: string
}

export interface User1 {
  state;
  Applicable;
  
}


@Component( {
  selector: 'app-compliance-head',
  templateUrl: './compliance-head.component.html',
  styleUrls: ['./compliance-head.component.scss'],
} )
export class ComplianceHeadComponent implements OnInit {
hideType=false;
isshowAP:boolean= true;

  countries: Array<any> = [];
  summaryHtmlDataList: Array<any> = [];
  masterGridDataList: Array<any> = [];
 // shortNameList: Array<any> = ['PF', 'EPS', 'PT', 'TDS', 'ESIC', 'LWF', 'S&E', 'Factories', 'SA', 'Gratuity', 'BOCW', 'CLRA', 'EE', 'PWD'];
  aplicabilityLevelList: Array<any> = ['Central', 'State', 'City', 'Municipal Corporation', 'Establishment'];
  public form: any = FormGroup;
  showButtonSaveAndReset: boolean = true;
  isSaveAndReset: boolean = true;
  isEditMode: boolean = false;
  //invalidWebsite: boolean = false;
  editedComplianceHeadId: number = 0;
  hideRemark = false;
  public modalRef: BsModalRef;
  public invalidComplianceHeadName: boolean = false;

  header: any[];
  excelData: any[];
<<<<<<< HEAD
  statutoryFrq:Array<any>=[];
  officeTypeList:Array<any>=['Area Office', 'Regional Office','Zonal Office'];
  RelatedTo:Array<any>=['Employee Related','Organization Related' ];

  users1: User1[];
  
  dropdownSettings = {};
  frequencyData: any;

  State:any;
  // stateName: any;
  // cityName: any;
  //stateName1:any='Haryana';
  stateName1:any;
 
=======
>>>>>>> 901aa714da86419b95844b63f4889487c377de9d
  constructor( private modalService: BsModalService, private complianceHeadService: ComplianceHeadService, private formBuilder: FormBuilder,
    private alertService: AlertServiceService,private excelservice: ExcelserviceService ) {
    this.form = this.formBuilder.group( {
      complianceHeadName: new FormControl( null, Validators.required ),
     // shortName: new FormControl(null),
      country: new FormControl( '', Validators.required ),
      aplicabilityLevel: new FormControl( '', Validators.required ),
    //  authorityHandling: new FormControl( null, Validators.required ),
     // website: new FormControl( '', [Validators.pattern( '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?' )] ),

      //website: new FormControl('', [Validators.required, Validators.pattern('/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/')]),
      remark: new FormControl( { value: '', disabled: true } ),
      complianceActive: new FormControl( { value: true, disabled: true } ),
      statutory: new FormControl(''),
      officetype: new FormControl(''),
      related: new FormControl(''),
      monetary: new FormControl(''),
    } );
  }

  ngOnInit(): void {
<<<<<<< HEAD
 // this.getData(); //api call for Statotary Frequency

  this.getState(); //Api call for State 
    
  this.getCity(); //API call for stae with city
  
=======
  this.getData(); //api call for Statotary Frequency

  this.getState(); //Api call for State
    
>>>>>>> 901aa714da86419b95844b63f4889487c377de9d
    this.complianceHeadService.getLocationInformationOrCountryList().subscribe( res => {
      this.countries = res.data.results;
    } );
   
    this.refreshHtmlTableData();
   // this.getStatutoryFreq1();

    
  }

getState(){
this.complianceHeadService.getState().subscribe(res =>{
  this.State=res.data.results;
});
}
 
<<<<<<< HEAD
  // getData(): void {
    
  //   this.complianceHeadService.getStatutoryFreq().subscribe(res => {
  //     this.frequencyData = res.data.results

  //     this.dropdownSettings = {
  //       singleSelection: false,
  //       idField: 'id',
  //       textField: 'name',
  //       selectAllText: 'Select All',
  //       unSelectAllText: 'UnSelect All',
  //       itemsShowLimit: 3,
  //       allowSearchFilter: true
  //     };
  //   });
  // }

  /** Select multiselect frequency */
  // onItemSelect(event){
  //   //push(event.id)
  // }

  //   /** Select all multiselect frequency */
  // onSelectAll(event){
  //   this.frequencyData.forEach(element => {
  //     //push(event.id)
  //   });
  // }

  // /** Select multiselect frequency */
  // onDeItemSelect(event){
  //   this.frequencyData.forEach((element,index) => {
  //     if(element.id == event.id){
  //       let ind = index;
  //       //splice(ind,1)
  //     }
  //   });
  // }

  // monetaryOption(evt:any){

  // }

  getCity(){
    this.complianceHeadService.getCitywithState().subscribe(res=>{
     
      this.stateName1=res.data.results;
    
     console.log(res);
      
    })
  }

//   getStateName(evt:any){
//     this.cityName=[];
// this.stateName1.forEach(element => {
//   if(element.stateName==evt){
// this.cityName.push(element);
//   }
// });
//   }

//   getCityName(evt:any)
//   {
//     this.stateName=[];
//     this.stateName1.forEach(element => {
//       if(element.stateName==evt){
//     this.stateName.push(element);
//       }
//     });
//   }
 
=======
  getData(): void {
    
    this.complianceHeadService.getStatutoryFreq().subscribe(res => {
      this.frequencyData = res.data.results

      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    });
  }

  /** Select multiselect frequency */
  onItemSelect(event){
    //push(event.id)
  }

    /** Select all multiselect frequency */
  onSelectAll(event){
    this.frequencyData.forEach(element => {
      //push(event.id)
    });
  }

  /** Select multiselect frequency */
  onDeItemSelect(event){
    this.frequencyData.forEach((element,index) => {
      if(element.id == event.id){
        let ind = index;
        //splice(ind,1)
      }
    });
  }

  monetaryOption(evt:any){

  }
>>>>>>> 901aa714da86419b95844b63f4889487c377de9d

  save() {
    if ( this.editedComplianceHeadId > 0 ) {
      console.log( 'in edit mode' );


      const data = this.form.getRawValue();
      data.complianceHeadId = this.editedComplianceHeadId;
      data.createdBy = 'PaysquareGlobal';
      data.isActive = 1;
      console.log( JSON.stringify( data ) );
      this.complianceHeadService.putComplianceHead( data ).subscribe( res => {
        console.log( res );
        if ( res.data.results.length > 0 ) {
          this.alertService.sweetalertMasterSuccess( 'Compliance Head Updated Successfully.', '' );
          this.form.reset();
          this.refreshHtmlTableData();
          this.saveFormValidation();
        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }
      }, ( error: any ) => {
        // this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
        //   this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

      } );

    } else {
      const data = this.form.getRawValue();
      console.log( JSON.stringify( data ) );
      this.complianceHeadService.postComplianceHead( data ).subscribe( res => {
        console.log( res );
        if ( res.data.results.length > 0 ) {
          this.alertService.sweetalertMasterSuccess( 'Compliance Head Saved Successfully.', '' );
          this.form.reset();
          this.refreshHtmlTableData();
          this.saveFormValidation();
        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }

      }, ( error: any ) => {
        // this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

      } );

    }

  }
  cancelView( i: number ) {
    this.editedComplianceHeadId = 0;
    this.isEditMode = false;
    this.isSaveAndReset = true;
    this.showButtonSaveAndReset = true;
    this.form.enable();
    this.form.reset();
    this.showButtonSaveAndReset = true;
    this.saveFormValidation();
    this.form.get( 'remark' ).disable();
    this.form.get( 'complianceActive' ).setValue( true );
    this.form.get( 'complianceActive' ).disable();
    this.hideRemark = false;
  }
  viewMaster( i: number ) {
    this.editedComplianceHeadId = 0;
    window.scrollTo( 0, 0 );
    this.showButtonSaveAndReset = false;
    this.form.reset();
    this.form.patchValue( this.masterGridDataList[i] );
    this.form.disable();
  }
  onSelectShortName( evt: any ) { }
  //for Select State in Applicability Level
<<<<<<< HEAD
  onSelectApplicabilityLevel( evt: any,template : TemplateRef<any>,template3:TemplateRef<any>) {
=======
  onSelectApplicabilityLevel( evt: any,template : TemplateRef<any>) {
>>>>>>> 901aa714da86419b95844b63f4889487c377de9d
    if(evt == 'State'){
      this.modalRef = this.modalService.show(
        template,
        Object.assign({}, { class: 'gray modal-lg' })
      );
    }
<<<<<<< HEAD
     else if(evt == 'City'){
      this.modalRef = this.modalService.show(
        template3,
        Object.assign({}, { class: 'gray modal-md'})
      );
     }
=======
    //  else if(evt == 'City'){
    //   this.modalRef = this.modalService.show(
    //     template,
    //     Object.assign({}, { class: 'gray modal-lg' })
    //   );
    //  }
>>>>>>> 901aa714da86419b95844b63f4889487c377de9d
   }

  refreshHtmlTableData() {
    this.summaryHtmlDataList = [];
    this.masterGridDataList = [];
    this.complianceHeadService.getComplianceHeadDetails().subscribe( res => {
      console.log( res );
      this.masterGridDataList = res.data.results;
      let i = 1;
      console.log( res.data.results );
      res.data.results.forEach( element => {
        const obj = {
          SrNo: i++,
          complianceHeadName: element.complianceHeadName,
       //   shortName: element.shortName,
          country: element.country,
          aplicabilityLevel: element.aplicabilityLevel,
       //   authorityHandling: element.authorityHandling,
          complianceActive: element.complianceActive,
          remark: element.remark,
          isActive: element.isActive,
         // website: element.website,
          complianceHeadId: element.complianceHeadId,
        };
        this.summaryHtmlDataList.push( obj );
      } );
    } );
  }
  saveFormValidation() {
    this.form.patchValue( {
     // shortName: '',
      country: '',
      aplicabilityLevel: '',
    } );
    this.isEditMode = false;
    this.isSaveAndReset = true;
    this.showButtonSaveAndReset = true;
    this.editedComplianceHeadId = 0;
  }
  editMaster( i: number, complianceHeadId: number ) {
    this.editedComplianceHeadId = complianceHeadId
    window.scrollTo( 0, 0 );
    this.isEditMode = true;
    this.isSaveAndReset = false;
    this.showButtonSaveAndReset = true;
    this.form.enable();
    this.form.reset();
    this.form.patchValue( this.summaryHtmlDataList[i] );
  }
  deactiveActiveCheckBox() { }
  // onChangeWebsiteName( evt: string ) {
  //   if ( evt.length !== 0 ) {
  //     var text = evt.split( '.' );
  //     let s = evt.lastIndexOf( '.' ) - evt.indexOf( '.' );
  //     console.log( s );
  //     // if tow dot presnt and without space
  //     if ( evt.indexOf( '.' ) == evt.lastIndexOf( '.' ) || s == 1 ) {
  //       this.invalidWebsite = true;
  //     } else {
  //       this.invalidWebsite = false;

  //     }
  //   } else {
  //     this.invalidWebsite = false;

  //   }

  // }

  deactivateRemark() {
    console.log( 'in deactive remakr' );

    if ( this.form.get( 'complianceActive' ).value === false ) {
      this.form.get( 'remark' ).enable();
      this.hideRemark = true;
      this.form.controls['remark'].setValidators( Validators.required );
      this.form.controls['remark'].updateValueAndValidity();
    } else {
      this.hideRemark = false;

      // this.form.get('remark').disable();
      // this.form.controls['remark'].clearValidator();

      this.form.controls["remark"].clearValidators();
      this.form.controls["remark"].updateValueAndValidity();
      // this.form.get('remark').reset();
    }
  }
  ConfirmationDialog( confirmdialog: TemplateRef<any>, id: number ) {
    this.editedComplianceHeadId = id;

    this.modalRef = this.modalService.show(
      confirmdialog,
      Object.assign( {}, { class: 'gray modal-md' } )
    );
  }
  clickedOnYes() {
    console.log( 'yes' );
    this.deleteComplianceHead( this.editedComplianceHeadId );
  }
  deleteComplianceHead( id: number ) {

    this.complianceHeadService.deleteComplianceHead( id ).subscribe( ( res ) => {
      console.log( res );
      this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
      this.refreshHtmlTableData();
    }, ( error: any ) => {
      this.alertService.sweetalertError( error.error.status.messsage );
    }, () => { } );
  }
  isShortNameContainsOnlySpecialCharacter() {
    this.invalidComplianceHeadName = false
    var splChars = "*|,\":<>[]{}`\!';^()@&$#%1234567890";
    for ( var i = 0; i < this.form.get( 'complianceHeadName' ).value.length; i++ ) {
      if ( splChars.indexOf( this.form.get( 'complianceHeadName' ).value.charAt( i ) ) != -1 ) {
        //alert("Illegal characters detected!");
        this.invalidComplianceHeadName = true;
      } else {
        this.invalidComplianceHeadName = false;
        break;
      }
    }
    if ( this.invalidComplianceHeadName == true ) {
      this.form.get( 'complianceHeadName' ).status = 'INVALID';
    }
  }
//Excel
exportAsXLSX(): void {
  this.excelData = [];
  this.header = []
  this.header =["Head Name","Type","Country","Applicability Level","Authority Handling","Remark"];
  this.excelData=[];
  
  if(this.summaryHtmlDataList.length>0){
  this.summaryHtmlDataList.forEach(element => {
    let obj = {
      "Head Name":element.complianceHeadName,
    //  "Type":element.shortName,
      "Country": element.country,
      "Applicability Level":element.aplicabilityLevel,
    //  "Authority Handling":element.authorityHandling,
      "Remark":element.remark,
    
    }
    this.excelData.push(obj)
  });
  console.log('this.excelData::', this.excelData);
}
 
  this.excelservice.exportAsExcelFile(this.excelData, 'Company Registration Details','Company Registration Details',this.header);

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

largepopup(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })
  );
}

showAP(){
  this.isshowAP=true;
}
hideAP(){
 this.isshowAP=false;
}

CityModal(template3: TemplateRef<any>){
  this.modalRef = this.modalService.show(
    template3,
    Object.assign({}, { class: 'gray modal-md'})
  );
}


}
