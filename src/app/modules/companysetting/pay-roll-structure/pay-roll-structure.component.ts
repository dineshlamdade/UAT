import { CompanySettingModule } from './../companysetting.module';
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
  public currentStep = 'step1';
  public listOfPHG: Array<any> = [];
  public allGroupListGetEDList: Array<any> = [];
  public allGroupListGetAttributeList: Array<any> = [];
  public disabled = true;
  public saveEDListFromPHGList: Array<any> = [];
  public saveAttListFromPHGList: Array<any> = [];
  public selectedUser: Array<any> = [];
  public selectedUserAttGroup: Array<any> = [];
  public GroupMasterCode: Array<any> = [];
  public headGroupDefinitions: Array<any> = [];
  public targetProductsIdsList: Array<any> = [];

  public headMastersIds: Array<any> = [];
  public allGroupList: Array<any> = [];
  public listOfAssignEDHeadsList: Array<any> = [];
  public listOfAttGroups: Array<any> = [];
  public listOfAttGroupList: Array<any> = [];
  public AssignAttributeList: Array<any> = [];

  public targetProductsAttGroupList: Array<any> = [];
  public targetProductsAttributeList: Array<any> = [];

  public allGroupListByPostTime: Array<any> = [];
  public targetProductsListBeforeSave: Array<any> = [];
  public targetProductsEDListBeforeSave: Array<any> = [];
  public allGroupAndDescriptionList: Array<any> = [];
  public targetProductsED: Array<any> = [];
  public targetProductsAttGroup: Array<any> = [];
  public targetProducts: Array<any> = [];
  public HighlightRight: any;
  public isVisible: boolean = false;
  // public isVisible: boolean = false;
  public selectedUser2AttGroup: Array<any> = [];
  public  selectedUser2: Array<any> = [];
  public  selectedUserAttribute: Array<any> = [];
  public  selectedUser2Attribute: Array<any> = [];
  public saveAttGroupListFromPHGList : Array<any> = [];
  public showSaveButton : boolean = false;
  public userHasSelectedMandatoryFieldOnly = false;


  public selectedheadName: Array<any> = [];
  public headGroupDefinitionId: number;
  // public allGroupAndDescriptionList : groupList[];

  //  public allGroupList: groupList[];

  selectedCities: groupList[];

  users1: User1[];
  users2: User2[];
  users3: User3[];

  sdmFormStep1: FormGroup;
  pHGForm: FormGroup;
  formED : FormGroup;
  aTTGroupForm : FormGroup;
  formAttribute : FormGroup;


  summaryGridData: Array<any> = [];
  sourceArray: Array<any> = [];
  sourceCountArray: Array<number> = [1, 2, 3, 4, 5];
  sourcePeriodArrayList: ['Asd', 'Asd', 'Asd', 'Asd', 'Asd'];
  public windowScrolled: boolean;
  HighlightRow: number;
  groupDescription: any;
  getGroupDiscription: any;
  constructor(
    private formBuilder: FormBuilder,
    private payRollService: PayRollService,
    private alertService: AlertServiceService
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

    this.formED = this.formBuilder.group({
      // standardName : new FormControl(''),
      headMasterId : new FormControl(''),
      companyGroupCode : new FormControl(''),
      // companyGroupNameED : new FormControl(''),
    })


    this.aTTGroupForm = this.formBuilder.group({
      // standardName : new FormControl(''),
      attributeMasterId : new FormControl(''),
      companyGroupCode : new FormControl(''),
      companyGroupNameAttGroup : new FormControl(''),

    })

    this.formAttribute = this.formBuilder.group({
      // companyGroupName : new FormControl(''),
      attributeMasterId : new FormControl(''),
      companyGroupCode : new FormControl(''),
      companyGroupNameAttribute : new FormControl(''),

    })





    // this.users1 = [{ code: '1', standardname: 'grp', nature: 'earning' }];
    this.users2 = [{ code: '1', description: 'grp' }];

    this.users3 = [{ code: '1', description: 'grp', nature: 'earning' }];
  }
  //Get Group Drop Down List for PHG
    getGroupList() {
    this.payRollService.getAllGroupId().subscribe((res) => {
      this.allGroupList = res.data.results;
      res.data.results.forEach((element) => {
        const obj = {
          name: element.companyGroupCode,
          code: element.companyGroupCode,
          inactive: true
        };
        this.allGroupAndDescriptionList.push(obj);
      });
    });
  }


  // tslint:disable-next-line: typedef
  OnChangeSelectionGroup() {
    let companyCode = this.pHGForm.get('companyGroupCode').value;
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
      this.listOfPHG = res.data.results;
      this.ChangeStepper(1);
    });
  }

  //Select Row in left table of PHG
  RowSelected(u: any, ind: number) {
    this.HighlightRow = ind;

    let temp = this.listOfPHG;
    this.listOfPHG = new Array();
    let index = this.selectedUser.findIndex(
      (o) => o.headGroupDefinitionId == u.headGroupDefinitionId
    );
    let isContain = this.selectedUser.some(
      (o) => o.headGroupDefinitionId == u.headGroupDefinitionId
    );
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
      this.showSaveButton = true;
    });

    var v = this.selectedUser;

    this.selectedUser.forEach((element) => {
      var index = this.listOfPHG.indexOf(element);
      this.selectedUser = [];
      if (index > -1) {
        this.listOfPHG.splice(index, 1);
      }
    });

    this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every( o => o.disabled == true );
    if ( this.userHasSelectedMandatoryFieldOnly ) {
      this.pHGForm.setErrors( { 'invalid': true } );

    } else {
      console.log( 'in else block' );
      this.pHGForm.setErrors( null );

    }

  }

  getIndex(id) {
  //   this.listOfPHG.forEach((element) => {
  //     if (element.headGroupDefinitionId > 88)  {
  // //     //return element.headGroupDefinitionId;
  // //     return this.listOfPHG.findIndex(element.headGroupDefinitionId);
  //     }
  }

  //Data send from right to left table
  righttablePusg(): void {
    this.selectedUser2.forEach((element) => {
      element.isHighlight = false;
      element.isHighlightright = false;
      let arrayIndex = this.getIndex(element.headGroupDefinitionId);
      // let index = this.listOfPHG.findIndex(element.headGroupDefinitionId);
      // let newIndex = arrayIndex - 1;
      // this.listOfPHG.splice((index - 1), 0, 'wednesday');
      // this.listOfPHG.findIndex(this.getIndex)
      this.listOfPHG.push(element);
    });

    // this.listOfPHG.forEach((element) => {
    //    if (element.headGroupDefinitionId > )
    // });

    // this.listOfPHG.findIndex(element.)   // Returns 3

    var v = this.selectedUser;

    this.selectedUser2.forEach((element) => {
      var index = this.targetProducts.indexOf(element);
      this.selectedUser2 = [];
      if (index > -1) {
        this.targetProducts.splice(index, 1);
      }
    });

    this.userHasSelectedMandatoryFieldOnly = this.targetProducts.every( o => o.disabled == true );
    if ( this.userHasSelectedMandatoryFieldOnly ) {
      this.pHGForm.setErrors( { 'invalid': true } );

    } else {
      console.log( 'in else block' );
      this.pHGForm.setErrors( null );
    }
  }

  //select PHG
  doubleClickOnLeftTable(evt: any) {}
  doubleClickOnRightTable(evt: any) {}

//Save PHG

  savePHG() {
    this.allGroupListGetEDList = this.pHGForm.get('companyGroupCode').value;
    this.allGroupListGetAttributeList = this.pHGForm.get('companyGroupCode').value;
    const selectedCompanyGroupCodes = this.pHGForm.get('companyGroupCode').value;
    this.getGroupDiscription = this.pHGForm.get('companyGroupName').value;
    console.log("getGroupDiscription",this.getGroupDiscription);

    if(selectedCompanyGroupCodes.length > 0){
    selectedCompanyGroupCodes.forEach((element) => {
      this.allGroupListByPostTime.push(element.code);
    });
  }else {
    this.alertService.sweetalertWarning("Please select Group code");
    return false;
  }

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

        if(res){
        if(res.data.results.length >= 1) {
            this.targetProducts = res.data.results;
            console.log("targetProductsED",this.targetProductsED);
            this.alertService.sweetalertMasterSuccess( 'PHG saved Successfully to group', '' );
            this.ChangeStepper(2);
            this.goToNextStep('step2');
          // Get  Saved PHG
          this.getEDHeadsAfterSavePHG();

            // this.goToNextStep('step2');
          }
          // else {
          //   this.alertService.sweetalertWarning("Please select PHG");
          // }
        }
        else {
          this.alertService.sweetalertError(
            'Something went wrong. Please try again.'
          );
        }
      },
      // ( error: any ) => {
      //   this.alertService.sweetalertError( error["error"]["status"]["message"] );
      // }
       );
      // );
      // this.pHGForm.reset();
      }

        //Reset PHG form
        resetPHGForm(){
          this.targetProducts = [];
          this.listOfPHG = [];
          this.selectedUser2 = [];
          this.selectedUser = [];
           this.pHGForm.reset();
           this.getListOfAllPHG();
           this.getGroupList();
        }


    /// Step 2 TS code

  //Get All PHG API

  getEDHeadsAfterSavePHG(){
    const data = {
      headGroupDefinitions : this.targetProductsListBeforeSave
     }
     console.log("getGroupDiscription",this.getGroupDiscription);
    this.payRollService.getSavedPHGInED(data).subscribe((res: any) => {
      this.targetProductsED = res.data.results;
      console.log("targetProductsED", this.targetProductsED);
      });

      this.getListOfAllEDHeads();

  }
  //Left side table get all recored
  getListOfAllEDHeads() {
    this.payRollService.getAllEDHeadsGroup().subscribe((res) => {
      let abc =  this. groupDescription
      this.listOfAssignEDHeadsList = res.data.results;

      this.removeDuplicateCodes();
    });
  }

  removeDuplicateCodes(){
    console.log("listOfAssignEDHeadsList", this.listOfAssignEDHeadsList);

    for (let i = 0; i < this.targetProductsED.length; i++) {
      const tempTargetProductsED = this.targetProductsED;
      // find the matched array element on left side array
      let matchedElement = this.listOfAssignEDHeadsList.find(function(item) {
        if (item.headMasterId == tempTargetProductsED[i].headMasterId) {
          return item;
        }
      });
      // remove matched element from left side array
      var index = this.listOfAssignEDHeadsList.indexOf(matchedElement);
      if (index !== -1) {
        this.listOfAssignEDHeadsList.splice(index, 1);
      }
    }
    console.log("listOfAssignEDHeadsList", this.listOfAssignEDHeadsList);
  }



  //Select Row in left table of PHG
  RowSelectedED(u: any, ind: number) {
    this.HighlightRow = ind;
    let temp = this.listOfAssignEDHeadsList;
    this.listOfAssignEDHeadsList = new Array();
    let index = this.selectedUser.findIndex(
      (o) => o.headMasterId == u.headMasterId
    );
    let isContain = this.selectedUser.some(
      (o) => o.headMasterId == u.headMasterId
    );
    if (isContain == true) {
      this.selectedUser.splice(index, 1);
    } else {
      this.selectedUser.push(u);
    }

    this.listOfAssignEDHeadsList = temp;

    this.listOfAssignEDHeadsList.forEach((element, i) => {
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
  RowSelectedtargetProductsED(u: any, i: number): void {
    if (u.disabled == true) {
    } else {
      this.HighlightRight = i;
      let indexOfTargetProd = this.targetProductsED.findIndex(
        (o) => o.headMasterId == u.headMasterId
      );
      let index = this.selectedUser2.findIndex(
        (o) => o.headMasterId == u.headMasterId
      );
      let isContain = this.selectedUser2.some(
        (o) => o.headMasterId == u.headMasterId
      );
      if (isContain == true) {
        this.targetProductsED[indexOfTargetProd].isHighlightright = false;
        this.selectedUser2.splice(index, 1);
        this.selectedheadName.splice(index, 1);
      } else {
        this.targetProductsED[indexOfTargetProd].isHighlightright = true;
        this.selectedUser2.push(u);
        this.selectedheadName.push(u);
      }
    }
  }

  //Data send from left to right table
  lefttablePusgED(): void {
    this.selectedUser.forEach((element) => {
      element.isHighlight = false;
      element.isHighlightright = false;
      this.targetProductsED.push(element);
    });

    var v = this.selectedUser;

    this.selectedUser.forEach((element) => {
      var index = this.listOfAssignEDHeadsList.indexOf(element);
      this.selectedUser = [];
      if (index > -1) {
        this.listOfAssignEDHeadsList.splice(index, 1);
      }
    });
  }

  //Data send from right to left table
  righttablePusgED(): void {
    this.selectedUser2.forEach((element) => {
      element.isHighlight = false;
      element.isHighlightright = false;
      this.listOfAssignEDHeadsList.push(element);
    });
    var v = this.selectedUser;

    this.selectedUser2.forEach((element) => {
      var index = this.targetProductsED.indexOf(element);
      this.selectedUser2 = [];
      if (index > -1) {
        this.targetProductsED.splice(index, 1);
      }
    });
  }

  //select PHG
  doubleClickOnLeftTableED(evt: any) {}
  doubleClickOnRightTableED(evt: any) {}

//Save ED

  saveED() {

    const groupDescriptionstep2 = this.getGroupDiscription;
    const selectedCompanyGroupCodes = this.allGroupListGetEDList;
    selectedCompanyGroupCodes.forEach((element) => {
      this.saveEDListFromPHGList.push(element.code);
    });


    //   console.log("allGroupList",this.allGroupList);
      this.targetProductsED.forEach((element) => {
        this.targetProductsEDListBeforeSave.push(element.headMasterId);
      });


       const data = {
        headMastersIds : this.targetProductsEDListBeforeSave,
        groupCode : this.saveEDListFromPHGList,
        // groupCode : this.pHGForm.get('companyGroupCode').value,
        // groupDescription : this.formED.get('companyGroupNameED').value,
        groupDescription : groupDescriptionstep2,

        headGroupDefinitions : this.targetProductsListBeforeSave,
       }


    this.payRollService.postAllAssignEDHeads(data).subscribe(
      (res: any) => {
        if(res){
          if(res.data.results.length > 0) {
            this.targetProductsED = res.data.results;
            console.log("res.data.results",res.data.results)
            this.alertService.sweetalertMasterSuccess( res.status.message, 'Heads assigned to group successfully' );
            this.ChangeStepper(3)
            this.goToNextStep('step3');
            this.getAttHeadsAfterSaveEDGroups();
          } else {
            this.alertService.sweetalertMasterSuccess( res.status.message, 'Heads assigned to group successfully' );
            this.ChangeStepper(3)
            this.goToNextStep('step3');
            this.getAttHeadsAfterSaveEDGroups();
            // this.alertService.sweetalertWarning(res.status.messsage);
          }
        }else {
          this.alertService.sweetalertError(
            'Something went wrong. Please try again.'
          );
        }
      });
      this.formED.reset();
      }

      ////- Step 3 ----Attribute Assign Group ------------------////

      getAttHeadsAfterSaveEDGroups(){
        const data = {
          headGroupDefinitions : this.targetProductsListBeforeSave
         }

        this.payRollService.getSavedEDInAtt(data).subscribe((res: any) => {
          this.targetProductsAttGroupList = res.data.results;
          console.log("targetProductsAttGroupList", this.targetProductsAttGroupList);
          });

          this.getListOfAllAttGroups();

      }
      getListOfAllAttGroups() {
        this.payRollService.getAttHeads().subscribe((res) => {
          let abc =  this. groupDescription
          this.listOfAttGroupList = res.data.results;
          console.log("listOfAttGroupList",this.listOfAttGroupList);
          this.removeDuplicateCodesAttHeads();
        });

      }

      removeDuplicateCodesAttHeads(){

        for (let i = 0; i < this.targetProductsAttGroupList.length; i++) {
          const tempTargetproductAttGroup = this.targetProductsAttGroupList;
          // find the matched array element on left side array
          let matchedElement = this.listOfAttGroupList.find(function(item) {
            if (item.id == tempTargetproductAttGroup[i].id) {
              return item;
            }
          });
          // remove matched element from left side array
          var index = this.listOfAttGroupList.indexOf(matchedElement);
          if (index !== -1) {
            this.listOfAttGroupList.splice(index, 1);
          }
        }
        console.log("listOfAttGroupList", this.listOfAttGroupList);
      }



      //Select Row in left table of PHG
      RowSelectedAttGroup(u: any, ind: number) {
        this.HighlightRow = ind;
        let temp = this.listOfAttGroupList;
        this.listOfAttGroupList = new Array();
        let index = this.selectedUserAttGroup.findIndex(
          (o) => o.id == u.id
        );
        let isContain = this.selectedUserAttGroup.some(
          (o) => o.id == u.id
        );
        if (isContain == true) {
          this.selectedUserAttGroup.splice(index, 1);
        } else {
          this.selectedUserAttGroup.push(u);
        }

        this.listOfAttGroupList = temp;

        this.listOfAttGroupList.forEach((element, i) => {
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
      RowSelectedtargetProductsAttGroup(u: any, i: number): void {
        if (u.disabled == true) {
        } else {
          this.HighlightRight = i;
          let indexOfTargetProd = this.targetProductsAttGroupList.findIndex(
            (o) => o.id == u.id
          );
          let index = this.selectedUser2AttGroup.findIndex(
            (o) => o.id == u.id
          );
          let isContain = this.selectedUser2AttGroup.some(
            (o) => o.id == u.id
          );
          if (isContain == true) {
            this.targetProductsAttGroupList[indexOfTargetProd].isHighlightright = false;
            this.selectedUser2AttGroup.splice(index, 1);
            this.selectedheadName.splice(index, 1);
          } else {
            this.targetProductsAttGroupList[indexOfTargetProd].isHighlightright = true;
            this.selectedUser2AttGroup.push(u);
            this.selectedheadName.push(u);
          }
        }
      }

      //Data send from left to right table
      lefttablePusgAttGroup(): void {
        this.selectedUserAttGroup.forEach((element) => {
          element.isHighlight = false;
          element.isHighlightright = false;
          this.targetProductsAttGroupList.push(element);
        });

        var v = this.selectedUserAttGroup;

        this.selectedUserAttGroup.forEach((element) => {
          var index = this.listOfAttGroupList.indexOf(element);
          this.selectedUserAttGroup = [];
          if (index > -1) {
            this.listOfAttGroupList.splice(index, 1);
          }
        });
      }

      //Data send from right to left table
      righttablePusgAttGroup(): void {
        this.selectedUser2AttGroup.forEach((element) => {
          element.isHighlight = false;
          element.isHighlightright = false;
          this.listOfAttGroupList.push(element);
        });
        var v = this.selectedUserAttGroup;

        this.selectedUser2AttGroup.forEach((element) => {
          var index = this.targetProductsAttGroupList.indexOf(element);
          this.selectedUser2AttGroup = [];
          if (index > -1) {
            this.targetProductsAttGroupList.splice(index, 1);
          }
        });
      }

      //select PHG
      doubleClickOnLeftTableAttGroup(evt: any) {}
      doubleClickOnRightTableAttGroup(evt: any) {}

    //Save Att Group

    saveAttGroup() {
      const groupDescriptionstep3 =  this.getGroupDiscription;

        const selectedCompanyGroupCodes = this.allGroupListGetAttributeList;
        selectedCompanyGroupCodes.forEach((element) => {
          this.saveAttGroupListFromPHGList.push(element.code);
        });



        //   console.log("allGroupList",this.allGroupList);
          this.targetProductsAttGroupList.forEach((element) => {
            this.targetProductsEDListBeforeSave.push(element.id);
          });


          // AttGroup Post API data commint bye K
           const data = {
            attributeGroupIds : this.targetProductsEDListBeforeSave,
            groupCode : this.saveAttGroupListFromPHGList,
            // groupCode : this.pHGForm.get('companyGroupCode').value,
            groupDescription : groupDescriptionstep3,
            headGroupDefinitions : this.targetProductsListBeforeSave,
           }


        this.payRollService.postAttGroup(data).subscribe(
          (res: any) => {
            if(res){

              if(res.data.results.length > 0) {
                this.targetProductsAttGroupList = res.data.results;
                this.alertService.sweetalertMasterSuccess( 'Attribute Group assigned to group successfully', '' );
              }else {
                this.alertService.sweetalertMasterSuccess( 'Attribute Group assigned to group successfully', '' );
                this.ChangeStepper(4);
                this.goToNextStep('step4');
                this.getAttributeHeadsAfterSavePHG();
                // this.alertService.sweetalertWarning(res.status.messsage);
              }
            }else {
              this.alertService.sweetalertError(
                'Something went wrong. Please try again.'
              );
            }
          });
          this.aTTGroupForm.reset();
          }


// Step 4 Assign Attribute TS code


getAttributeHeadsAfterSavePHG(){
  const data = {
    headGroupDefinitions : this.targetProductsListBeforeSave
   }

  this.payRollService.getSavedAttributeHeads(data).subscribe((res: any) => {
    this.targetProductsAttributeList = res.data.results;
    console.log("targetProductsAttributeList", this.targetProductsAttributeList);
    });

    this.getListOfAllAttributeHeads();

}
getListOfAllAttributeHeads() {
  this.payRollService.getAllAttributeList().subscribe((res) => {
    let abc =  this. groupDescription
    this.AssignAttributeList = res.data.results;
    this.removeDuplicateCodesAttribute();
  });
}

removeDuplicateCodesAttribute(){

  for (let i = 0; i < this.targetProductsAttributeList.length; i++) {
    const targetProductsAttList = this.targetProductsAttributeList;
    // find the matched array element on left side array
    let matchedElement = this.AssignAttributeList.find(function(item) {
      if (item.attributeMasterId == targetProductsAttList[i].attributeMasterId) {
        return item;
      }
    });
    // remove matched element from left side array
    var index = this.AssignAttributeList.indexOf(matchedElement);
    if (index !== -1) {
      this.AssignAttributeList.splice(index, 1);
    }
  }
  console.log("AssignAttributeList", this.AssignAttributeList);
}



//Select Row in left table of PHG
RowSelectedAttribute(u: any, ind: number) {
  this.HighlightRow = ind;
  let temp = this.AssignAttributeList;
  this.AssignAttributeList = new Array();
  let index = this.selectedUserAttribute.findIndex(
    (o) => o.attributeMasterId == u.attributeMasterId
  );
  let isContain = this.selectedUserAttribute.some(
    (o) => o.attributeMasterId == u.attributeMasterId
  );
  if (isContain == true) {
    this.selectedUserAttribute.splice(index, 1);
  } else {
    this.selectedUserAttribute.push(u);
  }

  this.AssignAttributeList = temp;

  this.AssignAttributeList.forEach((element, i) => {
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
RowSelectedtargetProductsAttribute(u: any, i: number): void {
  if (u.disabled == true) {
  } else {
    this.HighlightRight = i;
    let indexOfTargetProd = this.targetProductsAttributeList.findIndex(
      (o) => o.attributeMasterId == u.attributeMasterId
    );
    let index = this.selectedUser2Attribute.findIndex(
      (o) => o.attributeMasterId == u.attributeMasterId
    );
    let isContain = this.selectedUser2Attribute.some(
      (o) => o.attributeMasterId == u.attributeMasterId
    );
    if (isContain == true) {
      this.targetProductsAttributeList[indexOfTargetProd].isHighlightright = false;
      this.selectedUser2Attribute.splice(index, 1);
      this.selectedheadName.splice(index, 1);
    } else {
      this.targetProductsAttributeList[indexOfTargetProd].isHighlightright = true;
      this.selectedUser2Attribute.push(u);
      this.selectedheadName.push(u);
    }
  }
}

//Data send from left to right table
lefttablePusgAttribute(): void {
  this.selectedUserAttribute.forEach((element) => {
    element.isHighlight = false;
    element.isHighlightright = false;
    this.targetProductsAttributeList.push(element);
  });

  var v = this.selectedUserAttribute;

  this.selectedUserAttribute.forEach((element) => {
    var index = this.AssignAttributeList.indexOf(element);
    this.selectedUserAttribute = [];
    if (index > -1) {
      this.AssignAttributeList.splice(index, 1);
    }
  });
}

//Data send from right to left table
righttablePusgAttribute(): void {
  this.selectedUser2Attribute.forEach((element) => {
    element.isHighlight = false;
    element.isHighlightright = false;
    this.AssignAttributeList.push(element);
  });
  var v = this.selectedUserAttribute;

  this.selectedUser2Attribute.forEach((element) => {
    var index = this.targetProductsAttributeList.indexOf(element);
    this.selectedUser2Attribute = [];
    if (index > -1) {
      this.targetProductsAttributeList.splice(index, 1);
    }
  });
}

//select PHG
// doubleClickOnLeftTableED(evt: any) {}
// doubleClickOnRightTableED(evt: any) {}

//Save Att ribute form
saveAttribute() {

  const groupDiscription4 = this.getGroupDiscription
  const selectedCompanyGroupCodes = this.allGroupListGetAttributeList;
  selectedCompanyGroupCodes.forEach((element) => {
    this.saveAttListFromPHGList.push(element.code);
  });

  //   console.log("allGroupList",this.allGroupList);
    this.targetProductsAttributeList.forEach((element) => {
      this.targetProductsIdsList.push(element.attributeMasterId);
    });

      const data = {
      attributeMasterIds : this.targetProductsIdsList,
      groupCode : this.saveAttListFromPHGList,
      // groupCode : this.pHGForm.get('companyGroupCode').value,
      groupDescription : groupDiscription4,
      headGroupDefinitions : this.targetProductsListBeforeSave,
     }


  this.payRollService.postAttribute(data).subscribe(
    (res: any) => {
      if(res){
        // this.goToNextStep('step3');
        if(res.data.results.length > 0) {
          this.targetProductsAttributeList = res.data.results;
          // this.refreshHtmlTable();
          this.alertService.sweetalertMasterSuccess( res.status.message, 'Attributes assigned to group successfully' );
          // this.ChangeStepper(3)
          // this.goToNextStep('step3');
          // this.getAttHeadsAfterSaveEDGroups();
        } else {
          this.alertService.sweetalertMasterSuccess( res.status.message, 'Attributes assigned to group successfully' );
          // this.alertService.sweetalertWarning(res.status.messsage);
        }
      }else {
        this.alertService.sweetalertError(
          'Something went wrong. Please try again.'
        );
      }
    });
    this.formAttribute.reset();
    }



  editSummary() {}
  viewSummary() {}

  ChangeStepper(i) {
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

  goToPreviousStep(previousStep: string) {
    this.currentStep = previousStep;
  }

  goToNextStep(nextStep: string) {
    this.currentStep = nextStep;
  }
}
