import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SortEvent } from 'primeng/api';
import { PayRollService } from './pay-roll.service';

import { NgForm } from '@angular/forms';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { SaveAttributeSelection } from '../model/business-cycle-model';
import { AnyCnameRecord } from 'node:dns';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

export class headDetail {
  headGroupDefinitionId: number;
}


interface User1 {
  code;
  standardname;
  nature;
}
interface User2 {
  code;
  description;
}
interface User3 {
  code;
  description;
  nature;
}

interface groupList {
  name: string;
  code: string;
}

@Component({
  selector: 'app-pay-roll-structure',
  templateUrl: './pay-roll-structure.component.html',
  styleUrls: ['./pay-roll-structure.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(200%)' }),
        animate('700ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
    [
      trigger('stateAnimation', [
        transition(':enter', [
          style({ width: '2vh' }),
          animate('700ms ease-in', style({ width: '0vh' })),
        ]),
        transition(':leave', [
          style({ width: '0vh' }),
          animate('0ms ease-in', style({ width: '2vh' })),
        ]),
      ]),
    ],
  ],
  styles: [
    `
      .outofstock {
        background-color: #ddd !important;
        color: #000 !important;
        font-weight: 500;
      }
    `,
  ],
})
export class PayRollStructureComponent implements OnInit {
  public listOfPHG: Array<any> = [];
  public selectedUser: Array<any> = [];
  public GroupMasterCode: Array<any> = [];
  public headGroupDefinitions: Array<any> = [];
  public allGroupList: Array<any> = [];

  public allGroupListByPostTime: Array<any> = [];

  public targetProductsListBeforeSave: Array<any> = [];
    public allGroupAndDescriptionList: Array<any> = [];
  public targetProducts: Array<any> = [];
  public HighlightRight: any;
  public isVisible: boolean = false;
  selectedUser2: Array<any> = [];
  selectedheadName: Array<any> = [];
  headGroupDefinitionId: number;
  // public allGroupAndDescriptionList : groupList[];

  //  public allGroupList: groupList[];

  selectedCities: groupList[];

  users1: User1[];
  users2: User2[];
  users3: User3[];

  sdmFormStep1: FormGroup;
  pHGForm: FormGroup;
  summaryGridData: Array<any> = [];
  sourceArray: Array<any> = [];
  sourceCountArray: Array<number> = [1, 2, 3, 4, 5];
  sourcePeriodArrayList: ['Asd', 'Asd', 'Asd', 'Asd', 'Asd'];
  public windowScrolled: boolean;
  HighlightRow: number;
  alertService: any;
  constructor(
    private formBuilder: FormBuilder,
    private payRollService: PayRollService
  ) {
    this.sdmFormStep1 = this.formBuilder.group({
      sdmName: new FormControl(null, Validators.required),
      sdmDescription: new FormControl(null),
      noOfSourceCount: new FormControl(null, Validators.required),
      sourcePeriod: new FormControl(null, Validators.required),

    });
  }
  stepperIndex = 0;
  ngOnInit() {
    this.getListOfAllPHG();
    this.getGroupList();

    this.pHGForm = this.formBuilder.group({
      companyGroupMasterId: new FormControl(null),
      companyGroupCode: new FormControl('', Validators.required),
      companyGroupName: new FormControl(''),
      headGroupDefinitionId : new FormControl (''),
      headGroupDefinitionName : new FormControl (''),
    });

    this.users1 = [{ code: '1', standardname: 'grp', nature: 'earning' }];
    this.users2 = [{ code: '1', description: 'grp' }];

    this.users3 = [{ code: '1', description: 'grp', nature: 'earning' }];
  }
  //Get Group Drop Down List API
  getGroupList() {
    this.payRollService.getAllGroupId().subscribe((res) => {
      console.log('getGroupList', res);
      this.allGroupList = res.data.results;
      console.log('allGroupList', this.allGroupList);
      res.data.results.forEach((element) => {
        const obj = {
          name: element.companyGroupCode,
          code: element.companyGroupCode,
        };
        this.allGroupAndDescriptionList.push(obj);
      });
    });
  }

  // // -------------- Family Member List API call ---------------------------
  // this.Service.getFamilyInfo().subscribe((res) => {
  //   this.familyMemberGroup = res.data.results;
  //   console.log('familyMemberName::', res);
  //   res.data.results.forEach((element) => {
  //     const obj = {
  //       label: element.familyMemberName,
  //       value: element.familyMemberName,
  //     };
  //     this.familyMemberName.push(obj);
  //   });
  // });

  // tslint:disable-next-line: typedef
  OnSelectionfamilyMemberGroup() {
    let companyCode = this.pHGForm.get('companyGroupCode').value;
    console.log('companyCode', companyCode);
    if (companyCode.length == 1) {
      this.isVisible = true;
      const toSelect = this.allGroupList.find(
        (c) => c.companyGroupCode === companyCode[0].code
      );
      this.pHGForm.get('companyGroupName').setValue(toSelect.companyGroupName);
    } else {
      this.pHGForm.patchValue({ companyGroupName: null });
      this.isVisible = false;
    }
  }

  //Get All PHG API
  getListOfAllPHG() {
    this.payRollService.getAllPHGGroup().subscribe((res) => {
      console.log('getAllPHGGroup', res);
      this.listOfPHG = res.data.results;
      console.log('getAllPHGGroup', this.listOfPHG);
    });
  }

  //Select Row in left table of PHG
  RowSelected(u: any, ind: number) {
    this.HighlightRow = ind;
    console.log('in row selected ', u);

    let temp = this.listOfPHG;
    this.listOfPHG = new Array();
    let index = this.selectedUser.findIndex(
      (o) => o.headGroupDefinitionId == u.headGroupDefinitionId
    );
    let isContain = this.selectedUser.some(
      (o) => o.headGroupDefinitionId == u.headGroupDefinitionId
    );
    console.log(isContain, index);
    if (isContain == true) {
      this.selectedUser.splice(index, 1);
    } else {
      this.selectedUser.push(u);
    }

    this.listOfPHG = temp;

    this.listOfPHG.forEach((element, i) => {
      if (i == this.HighlightRow) {
        element.isHighlightright = false;
        if (isContain == true) {
          element.isHighlight = false;
        } else {
          if (i == this.HighlightRow) {
            element.isHighlight = true;
          }
        }
      }
    });
  }

  //Row select from right table
  RowSelectedtargetProducts(u: any, i: number): void {
    console.log(u);
    if (u.disabled == true) {
    } else {
      this.HighlightRight = i;
      let indexOfTargetProd = this.targetProducts.findIndex(
        (o) => o.headGroupDefinitionId == u.headGroupDefinitionId
      );
      let index = this.selectedUser2.findIndex(
        (o) => o.headGroupDefinitionId == u.headGroupDefinitionId
      );
      let isContain = this.selectedUser2.some(
        (o) => o.headGroupDefinitionId == u.headGroupDefinitionId
      );
      console.log(isContain, index);
      if (isContain == true) {
        this.targetProducts[indexOfTargetProd].isHighlightright = false;
        this.selectedUser2.splice(index, 1);
        this.selectedheadName.splice(index, 1);
      } else {
        this.targetProducts[indexOfTargetProd].isHighlightright = true;
        this.selectedUser2.push(u);
        this.selectedheadName.push(u);
      }
    }
  }

  //Data send from left to right table
  lefttablePusg(): void {
    this.selectedUser.forEach((element) => {
      element.isHighlight = false;
      element.isHighlightright = false;
      this.targetProducts.push(element);
    });

    var v = this.selectedUser;

    this.selectedUser.forEach((element) => {
      var index = this.listOfPHG.indexOf(element);
      this.selectedUser = [];
      if (index > -1) {
        this.listOfPHG.splice(index, 1);
      }
    });
  }

  //Data send from right to left table
  righttablePusg(): void {
    console.log('righttablePusg');

    this.selectedUser2.forEach((element) => {
      element.isHighlight = false;
      element.isHighlightright = false;
      this.listOfPHG.push(element);
    });
    var v = this.selectedUser;

    this.selectedUser2.forEach((element) => {
      var index = this.targetProducts.indexOf(element);
      this.selectedUser2 = [];
      if (index > -1) {
        this.targetProducts.splice(index, 1);
      }
    });
  }

  //select PHG
  doubleClickOnLeftTable(evt: any) {}
  doubleClickOnRightTable(evt: any) {}

  //Post PHG API

  // addHeadCreation(): void {

  //   const addHeadCreation: SaveHeadCreation = Object.assign( {}, this.HeadCreationForm.value );
  //   console.log( JSON.stringify( addHeadCreation ) );
  //   this.headCreationService.AddHeadCreation( addHeadCreation ).subscribe( ( res: any ) => {
  //     this.alertService.sweetalertMasterSuccess( res.status.message, '' );
  //     this.getAllHeadCreation();
  //     this.CancelHeadCreation();
  //   },
  //     ( error: any ) => {
  //       this.alertService.sweetalertError( error["error"]["status"]["message"] );
  //     } );

  // }

  savePHG() {
    const selectedCompanyGroupCodes = this.pHGForm.get('companyGroupCode').value;
    console.log('selectedCompanyGroupCodes' + selectedCompanyGroupCodes);
    selectedCompanyGroupCodes.forEach((element) => {
      this.allGroupListByPostTime.push(element.code);
    });
    console.log("allGroupListByPostTime",this.allGroupListByPostTime);

      console.log("allGroupList",this.allGroupList);
      this.targetProducts.forEach((element) => {
        const obj = {
          headGroupDefinitionId: element.headGroupDefinitionId,
        };
        this.targetProductsListBeforeSave.push(obj);
      });

         const data = {
        headGroupDefinitions : this.targetProductsListBeforeSave,
        groupCode : this.allGroupListByPostTime,
        // groupCode : this.pHGForm.get('companyGroupCode').value,
        groupDescription : this.pHGForm.get('companyGroupName').value
       }


    this.payRollService.postAllPHG(data).subscribe(
      (res: any) => {
        console.log(res);
        if(res){
          if(res.data.results.length > 0) {
            this.targetProducts = res.data.results;
            console.log(res);
            // this.refreshHtmlTable();
            this.alertService.sweetalertMasterSuccess( res.status.message, '' );
            this.alertService.sweetalertMasterSuccess( 'PHG saved Successfully to group', '' );

          } else {
            this.alertService.sweetalertWarning(res.status.messsage);
          }
        }else {
          this.alertService.sweetalertError(
            'Something went wrong. Please try again.'
          );
        }
      });
      this.pHGForm.reset();
      }

  // //Anant Save post aPI
  //   //add Payroll HeadGroup
  //   addPayrollHeadGroup(): void {
  //     console.log( 'addPayrollHeadGroup' );

  //     const addAttributeCreation: SavePHGGlobal = Object.assign( {} );
  //     console.log( JSON.stringify( addAttributeCreation ) );
  //     addAttributeCreation.headMasters = [];
  //     this.targetProducts.forEach( function ( f ) {
  //       const headDetail: headDetail = Object.assign( {} );
  //       headDetail.headMasterId = f.headMasterId;
  //       headGroupDefinitionId
  //       addAttributeCreation.headMasters.push( headDetail );
  //     } );
  //     addAttributeCreation.globalHeadGroupDefinitionName = this.payrollHeadGroupCreationForm.value.headGroupDefinitionName;
  //     addAttributeCreation.description = this.payrollHeadGroupCreationForm.value.description;
  //     addAttributeCreation.attributeGroupName = this.payrollHeadGroupCreationForm.value.attributeNature;
  //     addAttributeCreation.countryId = 1;
  //     addAttributeCreation.createdBy = 'Nisha';
  //     addAttributeCreation.isActive = true;
  //     console.log( JSON.stringify( addAttributeCreation ) );
  //     if ( this.viewupdateButton == false ) {

  //       // this.companySettingsService.AddPayrollHeadGroupAtGlobal( addAttributeCreation ).subscribe( ( res: any ) => {
  //         this.payRollService.postAllPHG( data ).subscribe( ( res: any ) => {
  //          console.log( res.data.results[0].headGroupDefinitionId );
  //         addAttributeCreation.headMasters = [];
  //         this.alertService.sweetalertMasterSuccess( res.status.message, '' );
  //         // this.getAllPayrollHeadGroup();
  //         // this.hideCopyFrom = true;
  //         // this.GetPHGByIdDisable( res.data.results[0].headGroupDefinitionId );
  //       },
  //         ( error: any ) => {
  //           this.alertService.sweetalertError( error["error"]["status"]["message"] );
  //         } );
  //     }
  //   }

  editSummary() {}
  viewSummary() {}

  abc(i) {
    this.stepperIndex = i;
  }

  previous() {
    this.stepperIndex = this.stepperIndex - 1;
  }

  next() {
    switch (this.stepperIndex) {
      case 1: {
        this.step1Submit();
        break;
      }
      case 2: {
        this.step2Submit();
        break;
      }
      default:
        break;
    }
    this.stepperIndex = this.stepperIndex + 1;
  }

  step1Submit() {
    console.log(this.sdmFormStep1.value);
    let sourceCount = this.sdmFormStep1.get('noOfSourceCount').value;
    for (let i = 0; i < sourceCount; i++) {
      this.sourceArray.push({
        sdmMasterDetailsId: null,
        sdmSourceDerivedFieldMappingId: null,
        isRangeOptionSelected: null,
        sourceTableName: null,
        sourceValue: null,
        isActive: null,
      });
    }
  }

  step2Submit() {
    console.log(this.sourceArray);
  }

  public modalRef: BsModalRef;

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   if (
  //     window.pageYOffset ||
  //     document.documentElement.scrollTop ||
  //     document.body.scrollTop > 100
  //   ) {
  //     this.windowScrolled = true;
  //   } else if (
  //     (this.windowScrolled && window.pageYOffset) ||
  //     document.documentElement.scrollTop ||
  //     document.body.scrollTop < 10
  //   ) {
  //     this.windowScrolled = false;
  //   }
  // }

  // scrollToTop() {
  //   (function smoothscroll() {
  //     let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  //     if (currentScroll > 0) {
  //             window.requestAnimationFrame(smoothscroll);
  //             window.scrollTo(0, currentScroll - (currentScroll / 8));
  //     }
  //   })();
  // }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }
}
