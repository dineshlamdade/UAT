import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgModel, Validators} from '@angular/forms';
import { ExcelserviceService } from './../../../../core/services/excelservice.service';
import { AnyCnameRecord } from 'dns';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { SaveLeaveAttributeSelection } from '../../model/business-cycle-model';
import { LeaveHeadCreationService } from '../leave-head-creation.service';
import { SortEvent } from 'primeng/api';
@Component({
  selector: 'app-leave-attribute-group',
  templateUrl: './leave-attribute-group.component.html',
  styleUrls: ['./leave-attribute-group.component.scss'],
  styles : [`
        .outofstock {
          background-color: #ddd!important;
          color: #000!important;
          font-weight: 500;
        }
        .disable1{
           background-color:#D3D3D3 !important;
          color: #000!important;
          font-weight: 500;
        }`
  ]
})
export class LeaveAttributeGroupComponent implements OnInit {
  disabled = true;
  viewCancelButton = false;
  viewUpdateButton = false;
  LeaveAttributeGroupFrom : FormGroup;
  SourceProducts : Array<any> =[];
  selectedUser : Array<any> =[];
  selectedUser2 : Array<any> = [];
  targetProducts : Array<any> = [];
  targetData : Array<any> =[];
  HighlightRight : any;
  userHasSelectedMandatoryFieldOnly = false;
  viewLeftRightButton = true;
  summaryList = [];
  LeaveAttributeSelectionList : Array<any> =[];
  originalSourceProductList : Array<any> =[];
  originalTargetList = [];
  used = false;
  active =true;
  id : number = 0;
  groupId : number= 0;
  Data : Array<any> = [];
  deleteModalRef: BsModalRef;
  idToBeDeletetd: number = null;
  header: any[];
  excelData: any[];
  isExcelVisible = false;
  updateDisable = false;
  constructor( private formBuilder:FormBuilder,private leaveAttributeService : LeaveHeadCreationService,
    private alertService:AlertServiceService,private modalService: BsModalService,private excelservice:ExcelserviceService) { }

  ngOnInit(): void {
    this.LeaveAttributeGroupFrom = this.formBuilder.group({
      name: new FormControl('',Validators.required),
      description : new FormControl('',Validators.required),
      lmsAttributeNature : new FormControl(''),
      lmsAttributeGroupDefinitionId : new FormControl('')
    }
    );
    this.getAllAttributeCreation();
    this.getAllAttributeGroup();
    window.scrollTo( 0, 0 );
  }
 
  getAllAttributeCreation():void{
    this.leaveAttributeService.getAllLeaveAttributeCreation().subscribe((res:any)=>{
      this.SourceProducts = res.data.results[0];
    }); 
  }

  getAllAttributeGroup():void{
    this.summaryList = [];
    this.leaveAttributeService.getAllAttributeGroup().subscribe( res => {
      this.LeaveAttributeSelectionList = res.data.results;
      this.Data = res.data.results[0];
      res.data.results.forEach( (element: { description: any; lmsattributeGroupMasterResponseDTO: any; lmsAttributeGroupDefinitionId: any; name: any; isUsed: any; }) => {
        let obj = {
          //lmsAttributeNature: element.lmsAttributeNature,
          //numberOfOption: element.numberOfOption,
          description: element.description,
          options: ( element.lmsattributeGroupMasterResponseDTO ).length,
          lmsAttributeGroupDefinitionId: element.lmsAttributeGroupDefinitionId,
          name: element.name,
          isUsed: element.isUsed,
        }
        this.summaryList.push( obj );
      } );
    } );

  }


  RowSelected( u: any, ind: any ) {
    debugger
    console.log( u );
    let ind1 = this.SourceProducts.findIndex( o => o.lmsAttributeMasterId == u.lmsAttributeMasterId );
    let index = this.selectedUser.findIndex( o => o.lmsAttributeMasterId == u.lmsAttributeMasterId );
    let isContain = this.selectedUser.some( o => o.lmsAttributeMasterId == u.lmsAttributeMasterId );
    console.log( isContain, index );
    if ( isContain == true ) {
      this.SourceProducts[ind1].isHighlight = false;
      this.selectedUser.splice( index, 1 );
    } else {
      this.SourceProducts[ind1].isHighlight = true;
      this.selectedUser.push( u );
    }
    //console.log( 'selected row is', u );
    //console.log( 'selected user', this.selectedUser );
  }

  RowSelectedtargetProducts( u: any, i: any ): void {
    debugger
    console.log( u );
    if ( u.disabled == true ) {

    } else {

      this.HighlightRight = i;
      let temp = this.targetProducts;
      this.targetProducts = new Array();
      let index = this.selectedUser2.findIndex( o => o.lmsAttributeMasterId == u.lmsAttributeMasterId );
      let isContain = this.selectedUser2.some( o => o.lmsAttributeMasterId == u.lmsAttributeMasterId );
      console.log( isContain, index );
      if ( isContain == true ) {
        this.selectedUser2.splice( index, 1 );
      } else {
        this.selectedUser2.push( u );
      }
      this.targetProducts = temp;
      this.targetProducts.forEach( ( element, i ) => {
        if ( i == this.HighlightRight ) {
          if ( isContain == true ) {
            element.isHighlightright = false
            element.isHighlight = false
          }
          else {
            element.isHighlightright = true
            element.isHighlight = false
          }
        }
      } );

    }
  }

  lefttablePusg(): void {
    debugger
    //this.isExcelVisible =true;
    //if(this.selectedUser.length > 0){this.isExcelVisible = true}
    this.selectedUser.forEach( ( element, index ) => {
      element.isHighlightright = false;
      this.targetProducts.push( element );
      if(this.targetProducts.length > 0){
        this.isExcelVisible =true;
        this.updateDisable = false;
      }
    } );

    this.selectedUser.forEach( element => {
      var index = this.SourceProducts.indexOf( element )
      this.selectedUser = [];
      if ( index > -1 ) {
        this.SourceProducts.splice( index, 1 );
      }
    } );

    this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every( o => o.disabled == true );
    if ( this.userHasSelectedMandatoryFieldOnly ) {
      this.LeaveAttributeGroupFrom.setErrors( { 'invalid': true } );

    } else {
      console.log( 'in else block' );
      this.LeaveAttributeGroupFrom.setErrors( null );

    }
  }

  righttablePusg( u: any ): void {
    this.selectedUser2.forEach( element => {
      if ( element.attributeMasterId == null ) {
        console.log( 'attributer master id is not found' );
      } else {
        console.log( 'attributeMasterId', element.attributeMasterId );
      }
    } );

    this.selectedUser2.forEach( element => {
      element.isHighlight = false;
      this.SourceProducts.push( element );
    } );
    // var v = this.selectedUser;
    this.selectedUser2.forEach( element => {
      var index = this.targetProducts.indexOf( element, index )
      this.selectedUser2 = [];
      if ( index > -1 ) {
        this.targetProducts.splice( index, 1 )
      }
    } );
    this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every( o => o.disabled == true );
    if ( this.userHasSelectedMandatoryFieldOnly ) {
      this.LeaveAttributeGroupFrom.setErrors( { 'invalid': true } );

    } else {
      //console.log( 'in else block 123' );
      this.LeaveAttributeGroupFrom.setErrors( null );
    }
    if(this.targetProducts.length <= 0){
      this.isExcelVisible = false;
      this.updateDisable = true;
    }else{
      this.updateDisable = false;
    }
  }

  doubleClickOnLeftTable( u: any ) {
    this.RowSelected( u, -1 );
    this.lefttablePusg();
  }
  doubleClickOnRightTable( u: AnyCnameRecord ) {
    this.RowSelectedtargetProducts( u, -1 );
    this.righttablePusg( u );

  }

  GetAttributeSelectionById( id: number, isUsed: boolean ): void {
    window.scrollTo( 0, 0 );
    this.SourceProducts = [];
    this.leaveAttributeService.getAllLeaveAttributeCreation().subscribe( res => {
      //this.originalSourceProductList = res.data.results;
      this.SourceProducts = res.data.results[0];
    }, ( error ) => {
      this.alertService.sweetalertError( error["error"]["status"]["message"] );

    }, () => {
      this.originalTargetList = [];
      this.targetProducts = [];
      this.targetData = [];
      this.viewLeftRightButton = true;
      this.disabled = true;
      this.isExcelVisible = true;
      this.LeaveAttributeGroupFrom.disable();
      this.viewUpdateButton = true;
      this.viewCancelButton = true;
      this.id = id;
       let index= this.LeaveAttributeSelectionList.findIndex( o => o.lmsAttributeGroupDefinitionId == id );
       this.targetData = this.LeaveAttributeSelectionList[index].lmsattributeGroupMasterResponseDTO;

       this.targetData.forEach( element => {
              element.disabled = isUsed;
              this.SourceProducts = this.SourceProducts.filter( e => e.code !== element.lmsAttributeMasterResponseDTO[0].code );
              let obj={
                code:element.lmsAttributeMasterResponseDTO[0].code,
                description:element.lmsAttributeMasterResponseDTO[0].description,
                lmsAttributeNature:element.lmsAttributeMasterResponseDTO[0].lmsAttributeNature,
                lmsAttributeGroupId:element.lmsAttributeGroupId,
                lmsAttributeMasterId:element.lmsAttributeMasterId,
                lmsAttributeGroupDefinitionId: this.LeaveAttributeSelectionList[index].lmsAttributeGroupDefinitionId,
                isUsed : this.LeaveAttributeSelectionList[index].isUsed,
              }
              this.targetProducts.push(obj); 
            } );
         //console.log('show final source',this.SourceProducts);

         this.LeaveAttributeGroupFrom.patchValue( { name:  this.LeaveAttributeSelectionList[index].name } );
         this.LeaveAttributeGroupFrom.patchValue( { description:  this.LeaveAttributeSelectionList[index].description } );
         //this.LeaveAttributeGroupFrom.patchValue( { lmsAttributeNature: this.LeaveAttributeSelectionList[index].name } );
         this.LeaveAttributeGroupFrom.patchValue( {
          lmsAttributeNature: ''
        } );
        // this.disabled = false;
        this.LeaveAttributeGroupFrom.disable();
    } );
  }


  addLeaveAttributeSelection():void{

   const addAttributeCreation: SaveLeaveAttributeSelection = Object.assign( {} );
    addAttributeCreation.lmsAttributeList = [];
    this.targetProducts.forEach( function ( f ) {
      let obj={
        lmsAttributeGroupId : 0,
        lmsAttributeMasterId : f.lmsAttributeMasterId,
        lmsAttributeGroupDefinitionId : 0,
        isActive: true
      }
      addAttributeCreation.lmsAttributeList.push( obj );
    } );
    addAttributeCreation.name = this.LeaveAttributeGroupFrom.value.name;
    addAttributeCreation.description = this.LeaveAttributeGroupFrom.value.description;
    addAttributeCreation.isUsed =this.used;
    addAttributeCreation.lmsAttributeGroupDefinitionId = 0;
    addAttributeCreation.isActive = this.active;
    //console.log( JSON.stringify( addAttributeCreation ) );

    this.leaveAttributeService.AddLeaveAttributeGroup( addAttributeCreation ).subscribe( ( res: any ) => {
      addAttributeCreation.lmsAttributeList = [];
      this.targetProducts = [];
      //this.getAllAttributeSelection();
      this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
      this.LeaveAttributeGroupFrom.reset();
      this.isExcelVisible = false;
      this.getAllAttributeCreation();
      this.getAllAttributeGroup();
      //this.resetAttributeSelection();
    },
      ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["messsage"] );
      } );
  }

  resetAttributeSelection(): void {
    window.scrollTo( 0, 0 );
    this.targetProducts = [];
    this.SourceProducts = [];
    this.selectedUser2 = [];
    this.selectedUser = [];
    this.isExcelVisible =false;
    this.LeaveAttributeGroupFrom.reset();
    this.viewCancelButton = false;
    this.LeaveAttributeGroupFrom.patchValue( {
      lmsAttributeNature: ''
    } );
    this.getAllAttributeCreation();
  }


  UpdateAttributeSelection(): void {
    const addAttributeCreation: SaveLeaveAttributeSelection = Object.assign( {} );
    addAttributeCreation.lmsAttributeList = [];
    let addLeaveAttributeCreation1=this.LeaveAttributeGroupFrom.getRawValue();

        this.targetProducts.forEach(function(e){
          
          if(e.lmsAttributeGroupDefinitionId === undefined ){
          e["lmsAttributeGroupDefinitionId"]=0;
          e["lmsAttributeGroupId"]=0;
          e["isUsed"]=0;
          }
        });
        
        for(let i=0 ;i <this.targetProducts.length;i++ ){
          if(this.targetProducts[i].lmsAttributeGroupDefinitionId !=0){
            this.groupId =this.targetProducts[i].lmsAttributeGroupDefinitionId;
            this.used =this.targetProducts[i].isUsed;
          }else{
            this.targetProducts[i].lmsAttributeGroupDefinitionId= this.groupId;
            this.targetProducts[i].isUsed= this.used;
          }
        }

    this.targetProducts.forEach( function ( f ) {
      let obj={
        lmsAttributeGroupId : f.lmsAttributeGroupId,
        lmsAttributeMasterId : f.lmsAttributeMasterId,
        lmsAttributeGroupDefinitionId : f.lmsAttributeGroupDefinitionId,
        isActive: true
      }
      addAttributeCreation.lmsAttributeList.push( obj );

      addAttributeCreation.isUsed = f.isUsed;
      addAttributeCreation.lmsAttributeGroupDefinitionId = f.lmsAttributeGroupDefinitionId;
    } );
    addAttributeCreation.name = this.LeaveAttributeGroupFrom.value.name;
    addAttributeCreation.description = this.LeaveAttributeGroupFrom.value.description;
    
    addAttributeCreation.isActive = this.active;

    console.log( JSON.stringify( addAttributeCreation ) );
    this.leaveAttributeService.UpdateLeaveAttributeGroup( addAttributeCreation ).subscribe( ( res: any ) => {
      addAttributeCreation.lmsAttributeList = [];
      this.targetProducts = [];
      this.disabled = true;
      this.viewCancelButton = false;
      this.viewUpdateButton = false;
      this.isExcelVisible = false;
      this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
      this.LeaveAttributeGroupFrom.reset();
      this.LeaveAttributeGroupFrom.enable();
      this.resetAttributeSelection();
      this.getAllAttributeGroup();
    },
      ( error: any ) => {
        this.alertService.sweetalertError( error["error"]["status"]["messsage"] );
      } );
    }

    CancelAttributeCreation(): void {
      window.scrollTo( 0, 0 );
      this.targetProducts = [];
      this.SourceProducts = [];
      this.selectedUser2 = [];
      this.selectedUser = [];
      this.LeaveAttributeGroupFrom.reset();
      this.LeaveAttributeGroupFrom.enable();
      this.disabled = true;
      this.viewCancelButton = false;
      this.viewUpdateButton = false;
      this.viewLeftRightButton = true;
      this.isExcelVisible= false;
      this.SourceProducts = this.originalSourceProductList;
      this.LeaveAttributeGroupFrom.patchValue( {
        attributeNature: ''
      } );
      this.getAllAttributeCreation();
    }

    DeleteAttributeGroupSelection():void{
        this.disabled = true;
        this.isExcelVisible = false;
        this.leaveAttributeService.DeleteLeaveAttributeGroup(this.idToBeDeletetd).subscribe(res=>{
        this.getAllAttributeGroup();
        this.alertService.sweetalertMasterSuccess( res.status.messsage, '' );
        this.LeaveAttributeGroupFrom.reset();
        this.targetProducts = [];
}, ( error ) => {
  this.alertService.sweetalertError( error["error"]["status"]["messsage"] );
});
    }

    UploadModal1( template: TemplateRef<any>, id: number ) {
      this.idToBeDeletetd = id;
      this.deleteModalRef = this.modalService.show(
        template,
        Object.assign( {}, { class: 'gray modal-md' } )
      );
    }

    GetAttributeSelectionByIdDisable(id :number):void{
    window.scrollTo( 0, 0 );
    this.SourceProducts = [];
    this.isExcelVisible =true;
    this.leaveAttributeService.getAllLeaveAttributeCreation().subscribe( res => {
      this.SourceProducts = res.data.results[0];
    }, ( error ) => {
      this.alertService.sweetalertError( error["error"]["status"]["message"] );

    }, () => {
      this.targetProducts = [];
      this.targetData = [];
      this.viewLeftRightButton = false;
      this.disabled = false;
      this.viewUpdateButton = false;
      this.viewCancelButton = true;
      this.id = id;
      this.isExcelVisible = true;
       let index= this.LeaveAttributeSelectionList.findIndex( o => o.lmsAttributeGroupDefinitionId == id );
       this.targetData = this.LeaveAttributeSelectionList[index].lmsattributeGroupMasterResponseDTO;
       this.targetData.forEach( element => {
              this.SourceProducts = this.SourceProducts.filter( e => e.code !== element.lmsAttributeMasterResponseDTO[0].code );
              let obj={
                code:element.lmsAttributeMasterResponseDTO[0].code,
                description:element.lmsAttributeMasterResponseDTO[0].description,
                lmsAttributeNature:element.lmsAttributeMasterResponseDTO[0].lmsAttributeNature,
                lmsAttributeGroupId:element.lmsAttributeGroupId,
                lmsAttributeMasterId:element.lmsAttributeMasterId,
                lmsAttributeGroupDefinitionId: this.LeaveAttributeSelectionList[index].lmsAttributeGroupDefinitionId,
                isUsed : this.LeaveAttributeSelectionList[index].isUsed,
              }
              this.targetProducts.push(obj); 
            } );
         this.LeaveAttributeGroupFrom.patchValue( { name:  this.LeaveAttributeSelectionList[index].name } );
         this.LeaveAttributeGroupFrom.patchValue( { description:  this.LeaveAttributeSelectionList[index].description } );
         //this.LeaveAttributeGroupFrom.patchValue( { lmsAttributeNature: this.LeaveAttributeSelectionList[index].name } );
         this.LeaveAttributeGroupFrom.patchValue( {
          lmsAttributeNature: ''
        } );
         this.LeaveAttributeGroupFrom.disable();
    } );
}

onStatusChange( event ) {
  debugger
  this.selectedUser2 = [];
  this.selectedUser = [];
  this.SourceProducts = [];
  this.targetProducts = [];
  if ( event.target.value == '' ) {
    this.LeaveAttributeGroupFrom.setErrors( null );
    this.leaveAttributeService.getAllLeaveAttributeCreation().subscribe( res => {
      this.originalSourceProductList = res.data.results;
      this.SourceProducts = res.data.results[0];
      this.isExcelVisible = false;
    } );
  } else {
      this.targetData = [];
      this.viewLeftRightButton = true;
      this.disabled = true;
      this.isExcelVisible = true;
      this.viewUpdateButton = false;
      this.viewCancelButton = false;
      this.id = event.target.value;

      this.leaveAttributeService.getAllLeaveAttributeCreation().subscribe((res:any)=>{
        this.SourceProducts = res.data.results[0];
      }, ( error ) => {
        this.alertService.sweetalertError( error["error"]["status"]["messsage"] );
  
      },() => {

       let index= this.LeaveAttributeSelectionList.findIndex( o => o.name == event.target.value );
       this.targetData = this.LeaveAttributeSelectionList[index].lmsattributeGroupMasterResponseDTO;

       this.targetData.forEach( element => {              
              this.SourceProducts = this.SourceProducts.filter( e => e.code !== element.lmsAttributeMasterResponseDTO[0].code );
              let obj={
                code:element.lmsAttributeMasterResponseDTO[0].code,
                description:element.lmsAttributeMasterResponseDTO[0].description,
                lmsAttributeNature:element.lmsAttributeMasterResponseDTO[0].lmsAttributeNature,
                lmsAttributeGroupId:element.lmsAttributeGroupId,
                lmsAttributeMasterId:element.lmsAttributeMasterId,
                lmsAttributeGroupDefinitionId: this.LeaveAttributeSelectionList[index].lmsAttributeGroupDefinitionId,
                isUsed : this.LeaveAttributeSelectionList[index].isUsed,
              }
              this.targetProducts.push(obj); 
            } );
           } );
  }
}

//excel
exportAsXLSX(): void {
  this.excelData = [];
  this.header = [];
  this.header =["Attribute Group Name","Discription","Attribute Count"];
  this.excelData=[];
  if(this.summaryList.length>0){
  this.summaryList.forEach(element => {
    let obj = {
      "Attribute Group Name":element.name,
      "Discription":element.description,
      "Attribute Count": element.options,
    }
    this.excelData.push(obj)
  });
  console.log('this.excelData::', this.excelData);
} 
  this.excelservice.exportAsExcelFile(this.excelData, 'Leave Attribute Group ','Leave Attribute Group',this.header);
      
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
  
//excel
selectexportAsXLSX(): void {
  this.excelData = [];
  this.header = [];
  this.header =["Code","Discription","Nature"];
  this.excelData=[];
  if(this.targetProducts.length>0){
  this.targetProducts.forEach(element => {
    let obj = {
      "Code":element.code,
      "Discription":element.description,
      "Nature": element.lmsAttributeNature,
    }
    this.excelData.push(obj)
  });
  console.log('this.excelData::', this.excelData);
} 
  this.excelservice.exportAsExcelFile(this.excelData, 'Select Attribute','Select Attribute',this.header);
      
}


//sort
selectcustomSort(event: SortEvent) {
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


  }
