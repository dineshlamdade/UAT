import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolePrivilegeService } from './role-privilege.service';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { AuthService } from '../../../auth/auth.service';
import { threadId } from 'node:worker_threads';
import { JsonpClientBackend } from '@angular/common/http';


@Component({
   selector: 'app-role-privilege',
   templateUrl: './role-privilege.component.html',
   styleUrls: ['./role-privilege.component.scss']
})
export class RolePrivilegeComponent implements OnInit {

   rolePrivilegeForm: FormGroup;
   submitted = false;

   public modalRef: BsModalRef;
   public windowScrolled: boolean;
   dropdownSettings = {};
   dropdownList = [];
   selectedItems = [];
   ischecked: boolean = false;
   groupNamesData: any;
   userGroupNames: any;
   userGroupNameList: any;
   userRoleNameList: any = [];
   companyNameList: any = [];
   menuAllMasterData: any[];
   menuSummaryData: any;
   editFlag: any;
   isVisible: boolean = false;
   isShown: boolean = true;
   userGroupNamesData: any;
   //userRollNamesData: any;
   userRoleNamesData: any;
   userGroupList: any = [];
   userRoleList: any = [];
   userRoleData: any = [];
   privilegeData: any = [];


   userData: any;
   subId: any;
   public companyGroupMasterId: any = null;


   data: any = []
   SelectedData: any = [];
   isChecked: boolean = false;
   isCheckedRead: boolean = false;
   isCheckedWrite: boolean = false;
   isCheckedModify: boolean = false;
   isCheckedDelete: boolean = false;
   response: any;
   menusData: any;
   globalCompanyMasterId: any = [];
   selectedUsrGroupId: any;
   menuSummary: any;
   rolePrivilegeMatrixId: any;
   viewFlag: boolean = false;
   page: any = 1;
   size: any = 10;
   userRoleId: any = [];
   totalRecords: any;
   companyName: any;
   editMenuSummaryData: any;
   selectedCompanyName: { globalCompanyMasterId: any; companyName: any; }[];
   fieldLevelMenu: any;
   isCheckedReadFields: boolean = false;
   SelectedDataFields: any=[];
   fieldLeveleAccessMatrixId: any=0;
   formFieldId: any = 0;
   fieldAllMasterData: any=[];
   isCheckedWriteFields: boolean = false;
   isCheckedModifyFields: boolean = false;
   isCheckedHideFields: boolean = false;
   fieldLevelData: any;
   applicationMenuId: any = 0;
   parentMenuId: any;
   selectedapplicationMenuId: any;
   selectedSubMenuName: any;
   




   get f() {
      return this.rolePrivilegeForm.controls;
   }

   constructor(private modalService: BsModalService,
      private formBuilder: FormBuilder, private service: RolePrivilegeService,
      private alertService: AlertServiceService, private authService: AuthService,) {


      this.userData = this.authService.getprivileges()
      console.log("userData::", this.userData);
      this.subId = this.userData.sub

      this.service.employeeRoleAssignmentUser(this.subId).subscribe(res => {
         this.companyGroupMasterId = res.data.results.companyGroupMasterId
         this.getRolePrivilegeSummaryByUserRoleId();
         this.getApplicationMenus();
         //this.getRolePrivilegeSummary();
         // this.getAllFieldLevelData();
         

      })
   }

   ngOnInit(): void {
      console.log("condition is false")

      this.getGroupName()
      
      // this.getUserGroupName()
// this.editMenuSummaryData.userGroupId = 0

      this.rolePrivilegeForm = this.formBuilder.group({
         employeeRoleAssignmentId: new FormControl(''),
         globalUserMasterId: new FormControl(''),
         companyGroupMasterId: new FormControl(''),
         globalCompanyMasterId: new FormControl(''),
         userRoleId: new FormControl(''),
         applicationMenusId: new FormControl(''),
         userGroupId: new FormControl(''),
         companyId: new FormControl(''),
         companyGroupName: new FormControl(''),
         companyName: new FormControl(''),
         remark: new FormControl(''),
         readAccess: new FormControl(''),
         writeAccess: new FormControl(''),
         modifyAccess: new FormControl(''),
         deleteAccess: new FormControl(''),
         rolePrivilegeMatrixId: new FormControl(''),
         isActive: new FormControl(''),
         createdBy: new FormControl(''),
         createdDateTime: new FormControl(''),
         lastModifiedBy: new FormControl(''),
         lastModifiedDateTime: new FormControl(''),
         userName: new FormControl(''),
         roleName: new FormControl(''),


      })



   }

   getGroupName() {
      this.service.getEmployeeRoleAssignment(this.subId).subscribe((res) => {

         this.groupNamesData = res.data.results;
         //console.log(JSON.stringify(this.groupNamesData))
      });
   }

   // getUserGroupName() {
   //    this.service.getByCompanyGroupId(this.companyGroupMasterId).subscribe((res) => {
   //       this.userGroupNameList = res.data.results;
   //    });
   // }

   getRoleName() {
      
      this.service.userRoleGetByCompanyGroupMasterId(this.companyGroupMasterId).subscribe((res) => {
         this.userRoleNameList = res.data.results;
      });
   }


   getCompanyName() {
      this.service.getCompanyId(this.companyGroupMasterId).subscribe((res) => {
         this.companyNameList = res.data.results;
      });
   }


   getApplicationMenus() {
      this.menuAllMasterData = [];
      this.menusData = null
      this.service.getApplicationMenusData().subscribe((res) => {
         console.log('menuAllMasterData::', res);
         this.menuAllMasterData = res.data.results;
         this.menusData = res.data.results
         //  let temp = [];
         //  temp.push( this.menuAllMasterData[0]);


      })
      console.log("this.menuAllMasterData: " + this.menuAllMasterData)
   }
   //  getRolePrivilegeSummary(){
   //    this.menuSummaryData = []
   //    this.service.getUserRolePrivilegesByUserRoleId(this.page,this.size).subscribe((res) => {
   //              this.menuSummaryData = res.data.results;
   //    })
   // }


   getRolePrivilegeSummaryByUserRoleId() {
      let roleId = this.rolePrivilegeForm.controls['roleName'].value
      this.menuSummaryData = []
      this.service.getSummaryData(this.page,this.size).subscribe((res) => {


         // let tempdata = res.data.results[0].content;
         // let temp1data = res.data.results[0].content;
         // let summaryd = []

         // tempdata.forEach(temp => {
         //    temp1data.forEach(response => {
         //       if(temp.globalCompanyMasterId == response.globalCompanyMasterId){
         //          summaryd.push(temp)
         //       }
         //    });
         // });

         // console.log(JSON.stringify(summaryd))



  console.log(res);
         let ressultdata = res.data.results;

           ressultdata.forEach(ele => {
            ele.content.forEach(element => {
               this.menuSummaryData.push({
                  'companyName': element.companyName,
                  'roleName': element.userRoleDetail.roleName,
                  'userRoleId': element.userRoleDetail.userRoleId,
                  'userGroupId': element.userRoleDetail.userGroupId,
                  'groupName': element.userRoleDetail.groupName,
                  'rolePrivilegeMatrixId': element.rolePrivilegeMatrixId,
                 // 'fieldLeveleAccessMatrixId': element.fieldLeveleAccessMatrixId,
                  'globalCompanyMasterId': element.globalCompanyMasterId,
                  'companyGroupMasterId': element.userRoleDetail.companyGroupMasterId,
                  'companyGroupName': element.userRoleDetail.companyGroupName,
                  'accessibleMenuDetail': element.accessibleMenuDetail,
                   'readAccess': element.readAccess,
                  'writeAccess': element.writeAccess,
                  'modifyAccess': element.modifyAccess,
                  'deleteAccess': element.deleteAccess,
                  'fieldLevelAccessMatrix': element.fieldLevelAccessMatrix.fieldLeveleAccessMatrixId
               })
            }); 
            });
          
             //this.menuSummaryData = res.data.results.userRoleDetail;

            this.totalRecords = res.data.results[0].totalElements
            // alert(this.totalRecords)
           
         // console.log(JSON.stringify(this.menuSummaryData))

      });
   }


   paginate(event) {
      console.log(JSON.stringify(event));

      let pageIndex = event.first / event.rows + 1 // Index of the new page if event.page not defined.

      this.page = pageIndex;
       this.getRolePrivilegeSummaryByUserRoleId()
   }



   checkUncheckall() {
      if (this.isChecked == true) {
         this.isChecked = false;

         this.SelectedData = []
      }
      else {
         this.isChecked = true;
         this.menusData.forEach((ele: any) => {
            if (ele.childItems != null) {
               ele.childItems.forEach(element => {
                  element.readAccess = false
                  ele.readFlag = false;
                  element.writeAccess = false
                  element.deleteAccess = false
                  element.modifyAccess = false
                  element.allAccess = false
                  ele.allFlag = false
               });
            }
            this.SelectedData.push({
               "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
               "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
               "applicationMenusId": ele.applicationMenuId,
               "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
               "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
               "readAccess": 1,
               "writeAccess": 1,
               "modifyAccess": 1,
               "deleteAccess": 1
            })
         })
      }

      // console.log("Data all is: " + JSON.stringify(this.SelectedData))

   }

   checkUncheckallRead() {
      if (this.isCheckedRead == true) {
         this.isCheckedRead = false;
         this.SelectedData = []
      }
      else {
         this.isCheckedRead = true;
         this.menusData.forEach((ele: any) => {

            if (ele.childItems != null) {
               ele.childItems.forEach(element => {
                  element.readAccess = false
                  ele.readFlag = false;
                  element.writeAccess = false
                  element.deleteAccess = false
                  element.modifyAccess = false
                  element.allAccess = false
                  ele.allFlag = false
               });
            }

            this.SelectedData.push({
               "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
               "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
               "applicationMenusId": ele.applicationMenuId,
               "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
               "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
               "readAccess": 1,
               "writeAccess": 0,
               "modifyAccess": 0,
               "deleteAccess": 0
            })
         })
      }

      console.log("Data Read is: " + JSON.stringify(this.SelectedData))
   }

   checkUncheckallWrite() {
      if (this.isCheckedWrite == true) {
         this.isCheckedWrite = false;
         this.SelectedData = []
      }
      else {
         this.isCheckedWrite = true;
         this.menusData.forEach((ele: any) => {
            if (ele.childItems != null) {
               ele.childItems.forEach(element => {
                  element.readAccess = false
                  ele.readFlag = false;
                  element.writeAccess = false
                  element.deleteAccess = false
                  element.modifyAccess = false
                  element.allAccess = false
                  ele.allFlag = false
               });
            }
            this.SelectedData.push({
               "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
               "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
               "applicationMenusId": ele.applicationMenuId,
               "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
               "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
               "readAccess": 0,
               "writeAccess": 1,
               "modifyAccess": 0,
               "deleteAccess": 0
            })
         })
      }

      console.log("Data Read is: " + JSON.stringify(this.SelectedData))
   }

   checkUncheckallModify() {
      if (this.isCheckedModify == true) {
         this.isCheckedModify = false;
         this.SelectedData = []
      }
      else {
         this.isCheckedModify = true;
         this.menusData.forEach((ele: any) => {
            if (ele.childItems != null) {
               ele.childItems.forEach(element => {
                  element.readAccess = false
                  ele.readFlag = false;
                  element.writeAccess = false
                  element.deleteAccess = false
                  element.modifyAccess = false
                  element.allAccess = false
                  ele.allFlag = false
               });
            }
            this.SelectedData.push({
               "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
               "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
               "applicationMenusId": ele.applicationMenuId,
               "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
               "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
               "readAccess": 0,
               "writeAccess": 0,
               "modifyAccess": 1,
               "deleteAccess": 0
            })
         })
      }

      console.log("Data Read is: " + JSON.stringify(this.SelectedData))
   }
   checkUncheckallDelete() {
      if (this.isCheckedDelete == true) {
         this.isCheckedDelete = false;
         this.SelectedData = []
      }
      else {
         this.isCheckedDelete = true;
         this.menusData.forEach((ele: any) => {
            if (ele.childItems != null) {
               ele.childItems.forEach(element => {
                  element.readAccess = false
                  ele.readFlag = false;
                  element.writeAccess = false
                  element.deleteAccess = false
                  element.modifyAccess = false
                  element.allAccess = false
                  ele.allFlag = false
               });
            }
            this.SelectedData.push({
               "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
               "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
               "applicationMenusId": ele.applicationMenuId,
               "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
               "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
               "readAccess": 0,
               "writeAccess": 0,
               "modifyAccess": 0,
               "deleteAccess": 1
            })
         })
      }

      console.log("Data Read is: " + JSON.stringify(this.SelectedData))
   }

   checkUncheckAllSelectedMenu(group: any, event: any) {
      if (event.checked) {
         this.menusData.forEach((ele: any) => {
            // ele.readAccess = false
            // ele.readFlag = false;
            // ele.writeAccess = false
            // ele.deleteAccess = false
            // ele.modifyAccess = false
            // ele.allAccess = false
            // ele.allFlag = false
            if (group.applicationMenuId == ele.applicationMenuId) {
               ele.allFlag = true
               this.SelectedData.push({
                  "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                  "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                  "applicationMenusId": ele.applicationMenuId,
                  "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                  "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                  "readAccess": 1,
                  "writeAccess": 1,
                  "modifyAccess": 1,
                  "deleteAccess": 1
               })
            }
         })
      } else {
         this.menusData.forEach((ele: any) => {
            if (group.applicationMenuId == ele.applicationMenuId) {
               ele.allFlag = false
            }
         })
      }

   }

   checkUncheckReadSelectedMenu(group: any, event: any) {
      if (event.checked) {
         this.menusData.forEach((ele: any) => {
            ele.readAccess = false
            ele.readFlag = false;
            ele.writeAccess = false
            ele.deleteAccess = false
            ele.modifyAccess = false
            ele.allAccess = false
            if (group.applicationMenuId == ele.applicationMenuId) {
               ele.readFlag = true
               this.SelectedData.push({
                  "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                  "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                  "applicationMenusId": ele.applicationMenuId,
                  "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                  "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                  "readAccess": 1,
                  "writeAccess": 0,
                  "modifyAccess": 0,
                  "deleteAccess": 0
               })
            }
         })
      } else {
         this.menusData.forEach((ele: any) => {
            if (group.applicationMenuId == ele.applicationMenuId) {
               ele.readFlag = false
            }
         })
      }

   }

   checkUncheckWriteSelectedMenu(group: any, event: any) {
      if (event.checked) {
         this.menusData.forEach((ele: any) => {
            ele.readAccess = false
            ele.readFlag = false;
            ele.writeAccess = false
            ele.deleteAccess = false
            ele.modifyAccess = false
            ele.allAccess = false
            if (group.applicationMenuId == ele.applicationMenuId) {
               ele.writeFlag = true
               this.SelectedData.push({
                  "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                  "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                  "applicationMenusId": ele.applicationMenuId,
                  "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                  "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                  "readAccess": 0,
                  "writeAccess": 1,
                  "modifyAccess": 0,
                  "deleteAccess": 0
               })
            }
         })
      } else {
         this.menusData.forEach((ele: any) => {
            if (group.applicationMenuId == ele.applicationMenuId) {
               ele.writeFlag = false
            }
         })
      }
   }

   checkUncheckModifySelectedMenu(group: any, event: any) {
      if (event.checked) {
         this.menusData.forEach((ele: any) => {
            ele.readAccess = false
            ele.readFlag = false;
            ele.writeAccess = false
            ele.deleteAccess = false
            ele.modifyAccess = false
            ele.allAccess = false
            if (group.applicationMenuId == ele.applicationMenuId) {
               ele.modifyFlag = true
               this.SelectedData.push({
                  "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                  "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                  "applicationMenusId": ele.applicationMenuId,
                  "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                  "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                  "readAccess": 0,
                  "writeAccess": 0,
                  "modifyAccess": 1,
                  "deleteAccess": 0
               })
            }
         })
      } else {
         this.menusData.forEach((ele: any) => {
            if (group.applicationMenuId == ele.applicationMenuId) {
               ele.modifyFlag = false
            }
         })
      }
   }

   checkUncheckDeleteSelectedMenu(group: any, event: any) {
      if (event.checked) {
         this.menusData.forEach((ele: any) => {
            ele.readAccess = false
            ele.readFlag = false;
            ele.writeAccess = false
            ele.deleteAccess = false
            ele.modifyAccess = false
            ele.allAccess = false
            if (group.applicationMenuId == ele.applicationMenuId) {
               ele.deleteFlag = true
               this.SelectedData.push({
                  "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                  "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                  "applicationMenusId": ele.applicationMenuId,
                  "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                  "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                  "readAccess": 0,
                  "writeAccess": 0,
                  "modifyAccess": 0,
                  "deleteAccess": 1
               })
            }
         })
      } else {
         this.menusData.forEach((ele: any) => {
            if (group.applicationMenuId == ele.applicationMenuId) {
               ele.deleteFlag = false
            }
         })
      }
   }


   /** single menu checked uncheked full */
   checkeUncheckSingleMenuAll(submenu, event) {
      console.log("single full submeu: " + JSON.stringify(submenu))
      if (event.checked) {
         this.menusData.forEach((ele: any) => {
            //console.log(ele.childItems)
            if (ele.childItems != null) {
               ele.childItems.forEach(element => {
                  if (element.applicationMenuId == submenu.applicationMenuId) {
                     // console.log("element.allFlag: "+ element.allFlag)
                     element.allFlag = true
                     this.SelectedData.push({
                        "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                        "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                        "applicationMenusId": element.applicationMenuId,
                        "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                        "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                        "readAccess": 1,
                        "modifyAccess": 1,
                        "deleteAccess": 1,
                        "writeAccess": 1
                     })
                  }

                  if (element.childItems != null) {
                     element.childItems.forEach(subchild => {
                        if (subchild.applicationMenuId == submenu.applicationMenuId) {
                           console.log("element.allFlag: " + JSON.stringify(subchild))
                           subchild.allFlag = true
                           this.SelectedData.push({
                              "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                              "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                              "applicationMenusId": ele.applicationMenuId,
                              "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                              "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                              "readAccess": 1,
                              "modifyAccess": 1,
                              "deleteAccess": 1,
                              "writeAccess": 1
                           })
                        }
                     });
                  }
               });
            }
         })
      } else {
         this.menusData.forEach((ele: any) => {
            if (ele.childItems != null) {
               ele.childItems.forEach(element => {
                  if (element.applicationMenuId == submenu.applicationMenuId) {

                     element.allFlag = false
                  }
                  if (element.childItems != null) {
                     element.childItems.forEach(subchild => {
                        if (subchild.applicationMenuId == submenu.applicationMenuId) {
                           subchild.allFlag = false
                        }
                     })
                  }
               })
            }
         })
      }
   } 
   /** single menu checked uncheked read */
   checkeUncheckSingleMenuRead(submenu, event) {
            if(event.checked) {
            
               
                if(this.SelectedData.length > 0){
                  this.SelectedData.forEach((privillegedata,index) => {
                     if(privillegedata.applicationMenusId == submenu.applicationMenusId ){
                        let ind = index;
                        this.SelectedData.splice(ind,1,{
                           "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                           "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                           "applicationMenusId": submenu.applicationMenuId,
                           "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                           "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                           "readAccess": 1,
                           "writeAccess": privillegedata.writeAccess,
                           "modifyAccess": privillegedata.modifyAccess,
                           "deleteAccess": privillegedata.deleteAccess
                        })
                     }else{
                        this.SelectedData.push({
                           "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                           "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                           "applicationMenusId": submenu.applicationMenuId,
                           "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                           "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                           "readAccess": 1,
                           "writeAccess": 0,
                           "modifyAccess": 0,
                           "deleteAccess": 0
                        }) 
                     }
                  })
                  //  element.allFlag = true
                 
                }else{
                  this.SelectedData.push({
                     "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                     "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                     "applicationMenusId": submenu.applicationMenuId,
                     "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                     "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                     "readAccess": 1,
                     "writeAccess": 0,
                     "modifyAccess": 0,
                     "deleteAccess": 0
                  }) 
                }
                this.menusData.forEach((ele: any,index) => {
                  if (ele.applicationMenuId == submenu.parentMenuId) {

                     if (ele.childItems != null) {
                        ele.childItems.forEach(element => {
                           if (element.applicationMenuId == submenu.applicationMenuId) {
                              element.readFlag = true
                              element.readAccess = true
                           }
                        })
                     }
                  } 
            });


         } else {
            this.menusData.forEach((ele: any) => {
               if (ele.applicationMenuId == submenu.parentMenuId) {
                  this.SelectedData.forEach((item, index) => {
                     if (item.menuId == submenu.parentMenuId) {
                        let ind = index;
                        this.SelectedData.splice(ind, 1, {
                           "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                           "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                           "applicationMenusId": submenu.applicationMenuId,
                           "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                           "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                           "readAccess": 0,
                           "modifyAccess": ele.modifyAccess,
                           "deleteAccess": ele.deleteAccess,
                           "writeAccess": ele.writeAccess
                        })
                     }
                  });

               }
               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     if (element.applicationMenuId == submenu.applicationMenuId) {
                        element.readFlag = false
                        element.readAccess = false
                     }
                  })
               }
            })
         }

         console.log("read single value: " + JSON.stringify(this.SelectedData))
      }

      /** single menu checked uncheked write */
      checkeUncheckSingleMenuWrite(submenu, event) {
         console.log(JSON.stringify(submenu))
         if (event.checked) {
           
              // debugger
            if(this.SelectedData.length > 0){
               this.SelectedData.forEach((privillegedata,index) => {
                  if(privillegedata.applicationMenusId == submenu.applicationMenuId ){
                     let ind = index;
                     this.SelectedData.splice(ind,1,{
                        "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                        "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                        "applicationMenusId": submenu.applicationMenuId,
                        "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                        "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                        "readAccess": privillegedata.readAccess,
                        "writeAccess": 1,
                        "modifyAccess": privillegedata.modifyAccess,
                        "deleteAccess": privillegedata.deleteAccess
                     })
                  }else{
                     let index = this.SelectedData.length -1
                     if(this.SelectedData[length].applicationMenusId == submenu.applicationMenuId ){return;}
                  //    else{this.SelectedData.push({
                  //       "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                  //       "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                  //       "applicationMenusId": submenu.applicationMenuId,
                  //       "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                  //       "readAccess":0,
                  //       "writeAccess": 1,
                  //       "modifyAccess": 0,
                  //       "deleteAccess": 0
                  //    }) 
                  // }
                  }
               })
               //  element.allFlag = true
              
             }else{
               this.SelectedData.push({
                  "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                  "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                  "applicationMenusId": submenu.applicationMenuId,
                  "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                  "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                  "readAccess": 0,
                  "writeAccess": 1,
                  "modifyAccess": 0,
                  "deleteAccess": 0
               }) 
             }
             this.menusData.forEach((ele: any,index) => {
               if (ele.applicationMenuId == submenu.parentMenuId) {
               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     if (element.applicationMenuId == submenu.applicationMenuId) {
                        element.writeFlag = true
                        element.writeAccess = true
                     }
                  })
               }
            }
            });


         } else {
            this.menusData.forEach((ele: any) => {

               if (ele.applicationMenuId == submenu.parentMenuId) {
                  this.SelectedData.forEach((item, index) => {
                     if (item.menuId == submenu.parentMenuId) {
                        let ind = index;
                        this.SelectedData.splice(ind, 1, {
                           "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                           "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                           "applicationMenusId": submenu.applicationMenuId,
                           "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                           "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                           "readAccess": ele.readAccess,
                           "modifyAccess": ele.modifyAccess,
                           "deleteAccess": ele.deleteAccess,
                           "writeAccess": 0
                        })
                     }
                  });

               }

               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     if (element.applicationMenuId == submenu.applicationMenuId) {
                        element.writeFlag = false
                        element.writeAccess = false
                     }
                  })
               }
            })

         }

         console.log("writeaccess data: "+ JSON.stringify(this.SelectedData))
      }
      /** single menu checked uncheked modify */
      checkeUncheckSingleMenuModify(submenu, event) {
         console.log(JSON.stringify(submenu))
         if (event.checked) {
           
              // debugger
            if(this.SelectedData.length > 0){
               this.SelectedData.forEach((privillegedata,index) => {
                  if(privillegedata.applicationMenusId == submenu.applicationMenuId ){
                     let ind = index;
                     this.SelectedData.splice(ind,1,{
                        "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                        "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                        "applicationMenusId": submenu.applicationMenuId,
                        "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                        "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                        "readAccess": privillegedata.readAccess,
                        "writeAccess":privillegedata.writeAccess,
                        "modifyAccess": 1,
                        "deleteAccess": privillegedata.deleteAccess
                     })
                  }else{
                     let index = this.SelectedData.length -1
                     if(this.SelectedData[length].applicationMenusId == submenu.applicationMenuId ){return;}
                  //    else{this.SelectedData.push({
                  //       "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                  //       "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                  //       "applicationMenusId": submenu.applicationMenuId,
                  //       "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                  //       "readAccess":0,
                  //       "writeAccess": 1,
                  //       "modifyAccess": 0,
                  //       "deleteAccess": 0
                  //    }) 
                  // }
                  }
               })
               //  element.allFlag = true
              
             }else{
               this.SelectedData.push({
                  "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                  "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                  "applicationMenusId": submenu.applicationMenuId,
                  "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                  "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                  "readAccess": 0,
                  "writeAccess": 0,
                  "modifyAccess": 1,
                  "deleteAccess": 0
               }) 
             }
             this.menusData.forEach((ele: any,index) => {
               if (ele.applicationMenuId == submenu.parentMenuId) {
               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     if (element.applicationMenuId == submenu.applicationMenuId) {
                        element.modifyFlag = true
                        element.modifyAccess = true
                     }
                  })
               }
            }
            });


         } else {
            this.menusData.forEach((ele: any) => {

               if (ele.applicationMenuId == submenu.parentMenuId) {
                  this.SelectedData.forEach((item, index) => {
                     if (item.menuId == submenu.parentMenuId) {
                        let ind = index;
                        this.SelectedData.splice(ind, 1, {
                           "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                           "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                           "applicationMenusId": submenu.applicationMenuId,
                           "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                           "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                           "readAccess": ele.readAccess,
                           "modifyAccess": 0,
                           "deleteAccess": ele.deleteAccess,
                           "writeAccess": ele.writeAccess
                        })
                     }
                  });

               }

               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     if (element.applicationMenuId == submenu.applicationMenuId) {
                        element.modifyFlag = false
                        element.modifyAccess = false
                     }
                  })
               }
            })

         }

         console.log("modifyAccess data: "+ JSON.stringify(this.SelectedData))
      }

      checkeUncheckSingleMenuDelete(submenu, event) {
         console.log(JSON.stringify(submenu))
         if (event.checked) {
           
              // debugger
            if(this.SelectedData.length > 0){
               this.SelectedData.forEach((privillegedata,index) => {
                  if(privillegedata.applicationMenusId == submenu.applicationMenuId ){
                     let ind = index;
                     this.SelectedData.splice(ind,1,{
                        "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                        "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                        "applicationMenusId": submenu.applicationMenuId,
                        "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                        "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                        "readAccess": privillegedata.readAccess,
                        "writeAccess": privillegedata.writeAccess,
                        "modifyAccess": privillegedata.modifyAccess,
                        "deleteAccess": 1
                     })
                  }else{
                     let index = this.SelectedData.length -1
                     if(this.SelectedData[length].applicationMenusId == submenu.applicationMenuId ){return;}
                  //    else{this.SelectedData.push({
                  //       "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                  //       "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                  //       "applicationMenusId": submenu.applicationMenuId,
                  //       "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                  //       "readAccess":0,
                  //       "writeAccess": 1,
                  //       "modifyAccess": 0,
                  //       "deleteAccess": 0
                  //    }) 
                  // }
                  }
               })
               //  element.allFlag = true
              
             }else{
               this.SelectedData.push({
                  "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                  "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                  "applicationMenusId": submenu.applicationMenuId,
                  "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                  "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                  "readAccess": 0,
                  "writeAccess": 0,
                  "modifyAccess": 0,
                  "deleteAccess": 1
               }) 
             }
             this.menusData.forEach((ele: any,index) => {
               if (ele.applicationMenuId == submenu.parentMenuId) {
               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     if (element.applicationMenuId == submenu.applicationMenuId) {
                        element.deleteFlag = true
                        element.deleteAccess = true
                     }
                  })
               }
            }
            });


         } else {
            this.menusData.forEach((ele: any) => {

               if (ele.applicationMenuId == submenu.parentMenuId) {
                  this.SelectedData.forEach((item, index) => {
                     if (item.menuId == submenu.parentMenuId) {
                        let ind = index;
                        this.SelectedData.splice(ind, 1, {
                           "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                           "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                           "applicationMenusId": submenu.applicationMenuId,
                           "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
                           "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                           "readAccess": ele.readAccess,
                           "modifyAccess": ele.modifyAccess,
                           "deleteAccess": 0,
                           "writeAccess": ele.writeAccess
                        })
                     }
                  });

               }

               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     if (element.applicationMenuId == submenu.applicationMenuId) {
                        element.deleteFlag = false
                        element.deleteAccess = false
                     }
                  })
               }
            })

         }

         console.log("writeaccess data: "+ JSON.stringify(this.SelectedData))
      }




      onSubmit() {
        //debugger
         this.privilegeData = this.SelectedData
         console.log("before: " + JSON.stringify(this.privilegeData))
         if (!this.editFlag) {
            this.service.addUserRolePrivilege(this.privilegeData).subscribe(res => {
               this.alertService.sweetalertMasterSuccess("Role Privilege data saved successfully", "");
               this.rolePrivilegeForm.reset();
               this.getApplicationMenus();
              this.getRolePrivilegeSummaryByUserRoleId();
               this.editFlag = false
               this.isVisible = false;
               this.isShown = true;
               this.SelectedData = []
               this.privilegeData = []
               this.menusData.forEach(element => {
                  element.modifyFlag = false
                  element.writeFlag = false
                  element.readFlag = false
                  element.allFlag = false
                  element.deleteFlag = false

               });
            })
         } else {
            //this.updateRolePrivilege();
            console.log("update data is: " + JSON.stringify(this.privilegeData))
         this.service.updateUserRolePrivilege(this.privilegeData).subscribe(res => {
            this.alertService.sweetalertMasterSuccess("Role Privilege data updated successfully", "");

            this.rolePrivilegeForm.reset();
            this.editFlag = false
            this.isVisible = false;
            this.isShown = true;
            this.SelectedData = []
            this.privilegeData = []
            //this.menusData = []
            // setTimeout(() => {
            //   this.getApplicationMenus();
            // }, 500);
           // 
         //    this.menusData.forEach(element => {
         //       element.modifyFlag = false
         //       element.writeFlag = false
         //       element.readFlag = false
         //       element.allFlag = false
         //       element.deleteFlag = false

         //    });
         this.menusData.forEach((ele: any) => {
            if (ele.applicationMenuId == this.editMenuSummaryData.accessibleMenuDetail.applicationMenuId) {
               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     
                     if (ele.applicationMenuId == element.parentMenuId) {
                        if (this.editMenuSummaryData.readAccess == 1) {
                           element.readAccess = false
                           ele.readFlag = false;
                           this.isCheckedRead = false
                        }
                        if (this.editMenuSummaryData.writeAccess == 1) {
                           element.writeAccess = false
                           // ele.writeFlag = false;
                           // this.isCheckedWrite = false
                        }
                        if (this.editMenuSummaryData.deleteAccess == 1) {
                           element.deleteAccess = false
                           // ele.deleteFlag = false;
                           // this.isCheckedDelete = false
                        }
                        if (this.editMenuSummaryData.modifyAccess == 1) {
                           element.modifyAccess = false
                           // ele.modifyFlag = false;
                           // this.isCheckeModify = false
                        }
                        if (this.editMenuSummaryData.readAccess == 1 && this.editMenuSummaryData.writeAccess == 1 && this.editMenuSummaryData.deleteAccess == 1 && this.editMenuSummaryData.modifyAccess == 1) {
                           element.allAccess = false
                           ele.allFlag = false
                           //this.isChecked = false;
                        }
                     } 
                   
                     if(element.childItems != null){
                        element.childItems.forEach(element => {
                        if (ele.applicationMenuId == element.parentMenuId) {
                           if (this.editMenuSummaryData.readAccess == 1) {
                              element.readAccess = false
                              ele.readFlag = false;
                              this.isCheckedRead = false
                           }
                           if (this.editMenuSummaryData.writeAccess == 1) {
                              element.writeAccess = false
                              // ele.writeFlag = false;
                              // this.isCheckedWrite = false
                           }
                           if (this.editMenuSummaryData.deleteAccess == 1) {
                              element.deleteAccess = false
                              // ele.deleteFlag = false;
                              // this.isCheckedDelete = false
                           }
                           if (this.editMenuSummaryData.modifyAccess == 1) {
                              element.modifyAccess = false
                              // ele.modifyFlag = false;
                              // this.isCheckeModify = false
                           }
                           if (this.editMenuSummaryData.readAccess == 1 && this.editMenuSummaryData.writeAccess == 1 && this.editMenuSummaryData.deleteAccess == 1 && this.editMenuSummaryData.modifyAccess == 1) {
                              element.allAccess = false
                              ele.allFlag = false
                              //this.isChecked = false;
                           }
                        } 
                     }) 
        
                     }
                     else {
                        element.readAccess = false
                        ele.readFlag = false;
                        element.writeAccess = false
                        element.deleteAccess = false
                        element.modifyAccess = false
                        element.allAccess = false
                        ele.allFlag = false
        
                     }
                  });
               } else {
                  if (ele.applicationMenuId == this.editMenuSummaryData.accessibleMenuDetail.applicationMenuId) {
                     if (this.editMenuSummaryData.readAccess == 1) {
                        ele.readAccess = false
                     }
                     if (this.editMenuSummaryData.writeAccess == 1) {
                        ele.writeAccess = false
                     }
                     if (this.editMenuSummaryData.deleteAccess == 1) {
                        ele.deleteAccess = false
                     }
                     if (this.editMenuSummaryData.modifyAccess == 1) {
                        ele.modifyAccess = false
                     }
                     if (this.editMenuSummaryData.readAccess == 1 && this.editMenuSummaryData.writeAccess == 1 && this.editMenuSummaryData.deleteAccess == 1 && this.editMenuSummaryData.modifyAccess == 1) {
                        ele.allAccess = false
                        ele.allFlag = false
                        //this.isChecked = false;
                     }
                  }
               }
            } else {
               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     if (this.editMenuSummaryData.accessibleMenuDetail.applicationMenuId == element.applicationMenuId) {
                        if (this.editMenuSummaryData.readAccess == 1) {
                           element.readAccess = false
        
                        }
                        if (this.editMenuSummaryData.writeAccess == 1) {
                           element.writeAccess = false
                           // ele.writeFlag = false;
                           // this.isCheckedWrite = false
                        }
                        if (this.editMenuSummaryData.deleteAccess == 1) {
                           element.deleteAccess = false
                           // ele.deleteFlag = false;
                           // this.isCheckedDelete = false
                        }
                        if (this.editMenuSummaryData.modifyAccess == 1) {
                           element.modifyAccess = false
                           // ele.modifyFlag = false;
                           // this.isCheckeModify = false
                        }
                        if (this.editMenuSummaryData.readAccess == 1 && this.editMenuSummaryData.writeAccess == 1 && this.editMenuSummaryData.deleteAccess == 1 && this.editMenuSummaryData.modifyAccess == 1) {
                           element.allAccess = false
                           ele.allFlag = false
                           //this.isChecked = false;
                        }
                     } else {
                        element.readAccess = false
                        ele.readFlag = false;
                        element.writeAccess = false
                        element.deleteAccess = false
                        element.modifyAccess = false
                        element.allAccess = false
                        ele.allFlag = false
        
                     }
                  });
               } else {
                  if (ele.applicationMenuId == this.editMenuSummaryData.accessibleMenuDetail.applicationMenuId) {
                     if (this.editMenuSummaryData.readAccess == 1) {
                        ele.readAccess = false
                     }
                     if (this.editMenuSummaryData.writeAccess == 1) {
                        ele.writeAccess = false
                     }
                     if (this.editMenuSummaryData.deleteAccess == 1) {
                        ele.deleteAccess = false
                     }
                     if (this.editMenuSummaryData.modifyAccess == 1) {
                        ele.modifyAccess = false
                     }
                     if (this.editMenuSummaryData.readAccess == 1 && this.editMenuSummaryData.writeAccess == 1 && this.editMenuSummaryData.deleteAccess == 1 && this.editMenuSummaryData.modifyAccess == 1) {
                        ele.allAccess = false
                        ele.allFlag = false
                        //this.isChecked = false;
                     }
                  }
               }
            }
        
        
         });
          }
         )
         }
      }

      updateRolePrivilege() {
         
      }

      editMenuSummary(menuSummary) {
         // console.log(menuSummary)
         this.editFlag = true;
         this.viewFlag = false
         this.isVisible = true;
         this.isShown = false;
         //console.log("menuSummay::", menuSummary)
         //debugger
          this.editMenuSummaryData = menuSummary
         this.onSelectCompanyName(menuSummary.companyGroupMasterId)
         
         this.userGroupNameList = null;
         
         
         this.userRoleData = []
         // console.log("edit user role list: "+ JSON.stringify(this.userRoleNameList))
         this.service.userRoleGetByCompanyGroupMasterId(this.companyGroupMasterId).subscribe((res) => {
            this.userRoleNameList = res.data.results;
            this.userRoleNameList.forEach(element => {
           
               if (menuSummary.userGroupId == element.userGroupId) {
                  this.userRoleData.push(
                     {
                        'userRoleId': element.userRoleId,
                        'roleName': element.roleName
                     })
               }
            });
            this.rolePrivilegeForm.controls['roleName'].setValue(menuSummary.userRoleId)
         });
         
         //this.rolePrivilegeForm.reset();
         this.rolePrivilegeMatrixId = this.editMenuSummaryData.rolePrivilegeMatrixId
         this.fieldLeveleAccessMatrixId = this.editMenuSummaryData.fieldLeveleAccessMatrixId
         this.rolePrivilegeForm.enable();
         this.rolePrivilegeForm.controls['companyGroupName'].setValue(menuSummary.companyGroupMasterId)

         let com = [{
            'globalCompanyMasterId': this.editMenuSummaryData.globalCompanyMasterId,
            'companyName': this.editMenuSummaryData.companyName
         }]
       
         console.log("company details 2: "+ JSON.stringify(com))
         this.selectedCompanyName = com
         setTimeout(() => {
            this.rolePrivilegeForm.controls['companyName'].setValue(this.selectedCompanyName) 
         }, 1000);
         

         this.SelectedData = []
         
         this.globalCompanyMasterId = this.editMenuSummaryData.globalCompanyMasterId
      console.log(JSON.stringify(this.editMenuSummaryData))
         this.menusData.forEach((ele: any) => {
            if (ele.applicationMenuId == menuSummary.accessibleMenuDetail.applicationMenuId) {
               //  element.allFlag = true
               console.log("menu id: "+ ele.applicationMenuId)
               this.SelectedData.push({
               
                  "rolePrivilegeMatrixId":this.editMenuSummaryData.rolePrivilegeMatrixId,
                  "userRoleId": parseInt(this.editMenuSummaryData.userRoleId),
                  "applicationMenusId": ele.applicationMenuId,
                  "fieldLeveleAccessMatrixId":this.editMenuSummaryData.fieldLeveleAccessMatrixId,
                  "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                  "readAccess": menuSummary.readAccess,
                  "modifyAccess": menuSummary.modifyAccess,
                  "deleteAccess": menuSummary.deleteAccess,
                  "writeAccess": menuSummary.writeAccess
               })
               console.log(JSON.stringify(this.SelectedData))
            }
            if(ele.childItems != null){
               ele.childItems.forEach(child => {
                  if (child.applicationMenuId == menuSummary.accessibleMenuDetail.applicationMenuId) {
                     //  element.allFlag = true
                     console.log("childmenu id: "+ ele.applicationMenuId)
                     this.SelectedData.push({
                     
                        "rolePrivilegeMatrixId":this.editMenuSummaryData.rolePrivilegeMatrixId,
                        "userRoleId": parseInt(this.editMenuSummaryData.userRoleId),
                        "applicationMenusId": child.applicationMenuId,
                        "fieldLeveleAccessMatrixId":this.editMenuSummaryData.fieldLeveleAccessMatrixId,
                        "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                        "readAccess": menuSummary.readAccess,
                        "modifyAccess": menuSummary.modifyAccess,
                        "deleteAccess": menuSummary.deleteAccess,
                        "writeAccess": menuSummary.writeAccess
                     })
                     console.log(JSON.stringify(this.SelectedData))
                  }

                  if(child.childItems != null){
                     child.childItems.forEach(subchild => {
                        if (subchild.applicationMenuId == menuSummary.accessibleMenuDetail.applicationMenuId) {
                           //  element.allFlag = true
                           console.log("childmenu id: "+ ele.applicationMenuId)
                           this.SelectedData.push({
                           
                              "rolePrivilegeMatrixId":this.editMenuSummaryData.rolePrivilegeMatrixId,
                              "userRoleId": parseInt(this.editMenuSummaryData.userRoleId),
                              "applicationMenusId": subchild.applicationMenuId,
                              "fieldLeveleAccessMatrixId":this.editMenuSummaryData.fieldLeveleAccessMatrixId,
                              "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                              "readAccess": menuSummary.readAccess,
                              "modifyAccess": menuSummary.modifyAccess,
                              "deleteAccess": menuSummary.deleteAccess,
                              "writeAccess": menuSummary.writeAccess
                           })
                           console.log(JSON.stringify(this.SelectedData))
                        }
                     })  
                  }
               });
            }
            

         });

         this.menusData.forEach((ele: any) => {
            if (ele.applicationMenuId == menuSummary.accessibleMenuDetail.applicationMenuId) {
               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     
                     if (ele.applicationMenuId == element.parentMenuId) {
                        if (menuSummary.readAccess == 1) {
                           element.readAccess = true
                           ele.readFlag = true;
                           this.isCheckedRead = true
                        }
                        if (menuSummary.writeAccess == 1) {
                           element.writeAccess = true
                           // ele.writeFlag = true;
                           // this.isCheckedWrite = true
                        }
                        if (menuSummary.deleteAccess == 1) {
                           element.deleteAccess = true
                           // ele.deleteFlag = true;
                           // this.isCheckedDelete = true
                        }
                        if (menuSummary.modifyAccess == 1) {
                           element.modifyAccess = true
                           // ele.modifyFlag = true;
                           // this.isCheckeModify = true
                        }
                        if (menuSummary.readAccess == 1 && menuSummary.writeAccess == 1 && menuSummary.deleteAccess == 1 && menuSummary.modifyAccess == 1) {
                           element.allAccess = true
                           ele.allFlag = true
                           //this.isChecked = true;
                        }
                     } 
                   
                     if(element.childItems != null){
                        element.childItems.forEach(element => {
                        if (ele.applicationMenuId == element.parentMenuId) {
                           if (menuSummary.readAccess == 1) {
                              element.readAccess = true
                              ele.readFlag = true;
                              this.isCheckedRead = true
                           }
                           if (menuSummary.writeAccess == 1) {
                              element.writeAccess = true
                              // ele.writeFlag = true;
                              // this.isCheckedWrite = true
                           }
                           if (menuSummary.deleteAccess == 1) {
                              element.deleteAccess = true
                              // ele.deleteFlag = true;
                              // this.isCheckedDelete = true
                           }
                           if (menuSummary.modifyAccess == 1) {
                              element.modifyAccess = true
                              // ele.modifyFlag = true;
                              // this.isCheckeModify = true
                           }
                           if (menuSummary.readAccess == 1 && menuSummary.writeAccess == 1 && menuSummary.deleteAccess == 1 && menuSummary.modifyAccess == 1) {
                              element.allAccess = true
                              ele.allFlag = true
                              element.allFlag = true
                              //this.isChecked = true;
                           }
                        } 
                     }) 

                     }
                     else {
                        element.readAccess = false
                        ele.readFlag = false;
                        element.writeAccess = false
                        element.deleteAccess = false
                        element.modifyAccess = false
                        element.allAccess = false
                        ele.allFlag = false

                     }
                  });
               } else {
                  if (ele.applicationMenuId == menuSummary.accessibleMenuDetail.applicationMenuId) {
                     if (menuSummary.readAccess == 1) {
                        ele.readAccess = true
                     }
                     if (menuSummary.writeAccess == 1) {
                        ele.writeAccess = true
                     }
                     if (menuSummary.deleteAccess == 1) {
                        ele.deleteAccess = true
                     }
                     if (menuSummary.modifyAccess == 1) {
                        ele.modifyAccess = true
                     }
                     if (menuSummary.readAccess == 1 && menuSummary.writeAccess == 1 && menuSummary.deleteAccess == 1 && menuSummary.modifyAccess == 1) {
                        ele.allAccess = true
                        ele.allFlag = true
                        //this.isChecked = true;
                     }
                  }
               }
            } else {
               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     if (menuSummary.accessibleMenuDetail.applicationMenuId == element.applicationMenuId) {
                        if (menuSummary.readAccess == 1) {
                           element.readAccess = true

                        }
                        if (menuSummary.writeAccess == 1) {
                           element.writeAccess = true
                           // ele.writeFlag = true;
                           // this.isCheckedWrite = true
                        }
                        if (menuSummary.deleteAccess == 1) {
                           element.deleteAccess = true
                           // ele.deleteFlag = true;
                           // this.isCheckedDelete = true
                        }
                        if (menuSummary.modifyAccess == 1) {
                           element.modifyAccess = true
                           // ele.modifyFlag = true;
                           // this.isCheckeModify = true
                        }
                        if (menuSummary.readAccess == 1 && menuSummary.writeAccess == 1 && menuSummary.deleteAccess == 1 && menuSummary.modifyAccess == 1) {
                           element.allAccess = true
                           ele.allFlag = true
                           element.allFlag = true
                           //this.isChecked = true;
                        }
                     } else {
                        element.readAccess = false
                        ele.readFlag = false;
                        element.writeAccess = false
                        element.deleteAccess = false
                        element.modifyAccess = false
                        element.allAccess = false
                        ele.allFlag = false

                     }
                  });
               } else {
                  if (ele.applicationMenuId == menuSummary.accessibleMenuDetail.applicationMenuId) {
                     if (menuSummary.readAccess == 1) {
                        ele.readAccess = true
                     }
                     if (menuSummary.writeAccess == 1) {
                        ele.writeAccess = true
                     }
                     if (menuSummary.deleteAccess == 1) {
                        ele.deleteAccess = true
                     }
                     if (menuSummary.modifyAccess == 1) {
                        ele.modifyAccess = true
                     }
                     if (menuSummary.readAccess == 1 && menuSummary.writeAccess == 1 && menuSummary.deleteAccess == 1 && menuSummary.modifyAccess == 1) {
                        ele.allAccess = true
                        ele.allFlag = true
                        //this.isChecked = true;
                     }
                  }
               }
            }


         });

         this.fieldAllMasterData.forEach(element => {
            if (element.formFieldId == menuSummary.fieldLevelAccessMatrix.formFieldId) {
               element.readAccess = true;
               element.writeAccess = true;
               element.modifyAccess = true;
               element.hide = true;
            }  
         });
      }

      viewMenuSummary(menuSummary) {
         this.editFlag = false;
         this.viewFlag = true;
         this.isVisible = false;
         this.isShown = false;




           this.onSelectCompanyName(menuSummary.companyGroupMasterId)

         this.rolePrivilegeForm.reset();

         this.rolePrivilegeForm.enable();
         this.rolePrivilegeForm.controls['companyGroupName'].setValue(menuSummary.companyGroupMasterId)

         let com = [{
            'globalCompanyMasterId': menuSummary.globalCompanyMasterId,
            'companyName': menuSummary.companyName
         }]
         this.rolePrivilegeForm.controls['companyName'].setValue(com)

         this.rolePrivilegeForm.controls['userName'].setValue(menuSummary.userGroupId)
         this.rolePrivilegeForm.controls['roleName'].setValue(menuSummary.userRoleId)

         this.menusData.forEach((ele: any) => {
            if (ele.applicationMenuId == menuSummary.accessibleMenuDetail.applicationMenuId) {
               //  element.allFlag = true
               this.SelectedData.push({
                  "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
                  "menuId": ele.applicationMenuId,
                  "readAccess": menuSummary.readAccess,
                  "modifyAccess": menuSummary.modifyAccess,
                  "deleteAccess": menuSummary.deleteAccess,
                  "writeAccess": menuSummary.writeAccess
               })
            }

         });

         this.menusData.forEach((ele: any) => {
            if (ele.applicationMenuId == menuSummary.accessibleMenuDetail.applicationMenuId) {
               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     if (ele.applicationMenuId == element.parentMenuId) {
                        if (menuSummary.readAccess == 1) {
                           element.readAccess = true
                           ele.readFlag = true;
                           this.isCheckedRead = true
                        }
                        if (menuSummary.writeAccess == 1) {
                           element.writeAccess = true
                           // ele.writeFlag = true;
                           // this.isCheckedWrite = true
                        }
                        if (menuSummary.deleteAccess == 1) {
                           element.deleteAccess = true
                           // ele.deleteFlag = true;
                           // this.isCheckedDelete = true
                        }
                        if (menuSummary.modifyAccess == 1) {
                           element.modifyAccess = true
                           // ele.modifyFlag = true;
                           // this.isCheckeModify = true
                        }
                        if (menuSummary.readAccess == 1 && menuSummary.writeAccess == 1 && menuSummary.deleteAccess == 1 && menuSummary.modifyAccess == 1) {
                           element.allAccess = true
                           ele.allFlag = true
                           //this.isChecked = true;
                        }
                     } else {
                        element.readAccess = false
                        ele.readFlag = false;
                        element.writeAccess = false
                        element.deleteAccess = false
                        element.modifyAccess = false
                        element.allAccess = false
                        ele.allFlag = false

                     }
                  });
               } else {
                  if (ele.applicationMenuId == menuSummary.accessibleMenuDetail.applicationMenuId) {
                     if (menuSummary.readAccess == 1) {
                        ele.readAccess = true
                     }
                     if (menuSummary.writeAccess == 1) {
                        ele.writeAccess = true
                     }
                     if (menuSummary.deleteAccess == 1) {
                        ele.deleteAccess = true
                     }
                     if (menuSummary.modifyAccess == 1) {
                        ele.modifyAccess = true
                     }
                     if (menuSummary.readAccess == 1 && menuSummary.writeAccess == 1 && menuSummary.deleteAccess == 1 && menuSummary.modifyAccess == 1) {
                        ele.allAccess = true
                        ele.allFlag = true
                        //this.isChecked = true;
                     }
                  }
               }
            } else {
               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     if (menuSummary.accessibleMenuDetail.applicationMenuId == element.applicationMenuId) {
                        if (menuSummary.readAccess == 1) {
                           element.readAccess = true

                        }
                        if (menuSummary.writeAccess == 1) {
                           element.writeAccess = true
                           // ele.writeFlag = true;
                           // this.isCheckedWrite = true
                        }
                        if (menuSummary.deleteAccess == 1) {
                           element.deleteAccess = true
                           // ele.deleteFlag = true;
                           // this.isCheckedDelete = true
                        }
                        if (menuSummary.modifyAccess == 1) {
                           element.modifyAccess = true
                           // ele.modifyFlag = true;
                           // this.isCheckeModify = true
                        }
                        if (menuSummary.readAccess == 1 && menuSummary.writeAccess == 1 && menuSummary.deleteAccess == 1 && menuSummary.modifyAccess == 1) {
                           element.allAccess = true
                           ele.allFlag = true
                           //this.isChecked = true;
                        }
                     } else {
                        element.readAccess = false
                        ele.readFlag = false;
                        element.writeAccess = false
                        element.deleteAccess = false
                        element.modifyAccess = false
                        element.allAccess = false
                        ele.allFlag = false

                     }
                  });
               } else {
                  if (ele.applicationMenuId == menuSummary.accessibleMenuDetail.applicationMenuId) {
                     if (menuSummary.readAccess == 1) {
                        ele.readAccess = true
                     }
                     if (menuSummary.writeAccess == 1) {
                        ele.writeAccess = true
                     }
                     if (menuSummary.deleteAccess == 1) {
                        ele.deleteAccess = true
                     }
                     if (menuSummary.modifyAccess == 1) {
                        ele.modifyAccess = true
                     }
                     if (menuSummary.readAccess == 1 && menuSummary.writeAccess == 1 && menuSummary.deleteAccess == 1 && menuSummary.modifyAccess == 1) {
                        ele.allAccess = true
                        ele.allFlag = true
                        //this.isChecked = true;
                     }
                  }
               }
            }


         });




         // this.rolePrivilegeForm.patchValue(menuSummary);
         this.rolePrivilegeForm.reset();
         this.rolePrivilegeForm.disable();
      }
      reset() {
         this.rolePrivilegeForm.enable();
         this.rolePrivilegeForm.reset();
      }
      cancel(){
         this.reset();
         this.isShown = true;
         this.isVisible = false;
         this.menusData.forEach((ele: any) => {
            if (ele.applicationMenuId == this.editMenuSummaryData.accessibleMenuDetail.applicationMenuId) {
               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     
                     if (ele.applicationMenuId == element.parentMenuId) {
                        if (this.editMenuSummaryData.readAccess == 1) {
                           element.readAccess = false
                           ele.readFlag = false;
                           this.isCheckedRead = false
                        }
                        if (this.editMenuSummaryData.writeAccess == 1) {
                           element.writeAccess = false
                           // ele.writeFlag = false;
                           // this.isCheckedWrite = false
                        }
                        if (this.editMenuSummaryData.deleteAccess == 1) {
                           element.deleteAccess = false
                           // ele.deleteFlag = false;
                           // this.isCheckedDelete = false
                        }
                        if (this.editMenuSummaryData.modifyAccess == 1) {
                           element.modifyAccess = false
                           // ele.modifyFlag = false;
                           // this.isCheckeModify = false
                        }
                        if (this.editMenuSummaryData.readAccess == 1 && this.editMenuSummaryData.writeAccess == 1 && this.editMenuSummaryData.deleteAccess == 1 && this.editMenuSummaryData.modifyAccess == 1) {
                           element.allAccess = false
                           ele.allFlag = false
                           //this.isChecked = false;
                        }
                     } 
                   
                     if(element.childItems != null){
                        element.childItems.forEach(element => {
                        if (ele.applicationMenuId == element.parentMenuId) {
                           if (this.editMenuSummaryData.readAccess == 1) {
                              element.readAccess = false
                              ele.readFlag = false;
                              this.isCheckedRead = false
                           }
                           if (this.editMenuSummaryData.writeAccess == 1) {
                              element.writeAccess = false
                              // ele.writeFlag = false;
                              // this.isCheckedWrite = false
                           }
                           if (this.editMenuSummaryData.deleteAccess == 1) {
                              element.deleteAccess = false
                              // ele.deleteFlag = false;
                              // this.isCheckedDelete = false
                           }
                           if (this.editMenuSummaryData.modifyAccess == 1) {
                              element.modifyAccess = false
                              // ele.modifyFlag = false;
                              // this.isCheckeModify = false
                           }
                           if (this.editMenuSummaryData.readAccess == 1 && this.editMenuSummaryData.writeAccess == 1 && this.editMenuSummaryData.deleteAccess == 1 && this.editMenuSummaryData.modifyAccess == 1) {
                              element.allAccess = false
                              ele.allFlag = false
                              //this.isChecked = false;
                           }
                        } 
                     }) 
        
                     }
                     else {
                        element.readAccess = false
                        ele.readFlag = false;
                        element.writeAccess = false
                        element.deleteAccess = false
                        element.modifyAccess = false
                        element.allAccess = false
                        ele.allFlag = false
        
                     }
                  });
               } else {
                  if (ele.applicationMenuId == this.editMenuSummaryData.accessibleMenuDetail.applicationMenuId) {
                     if (this.editMenuSummaryData.readAccess == 1) {
                        ele.readAccess = false
                     }
                     if (this.editMenuSummaryData.writeAccess == 1) {
                        ele.writeAccess = false
                     }
                     if (this.editMenuSummaryData.deleteAccess == 1) {
                        ele.deleteAccess = false
                     }
                     if (this.editMenuSummaryData.modifyAccess == 1) {
                        ele.modifyAccess = false
                     }
                     if (this.editMenuSummaryData.readAccess == 1 && this.editMenuSummaryData.writeAccess == 1 && this.editMenuSummaryData.deleteAccess == 1 && this.editMenuSummaryData.modifyAccess == 1) {
                        ele.allAccess = false
                        ele.allFlag = false
                        //this.isChecked = false;
                     }
                  }
               }
            } else {
               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     if (this.editMenuSummaryData.accessibleMenuDetail.applicationMenuId == element.applicationMenuId) {
                        if (this.editMenuSummaryData.readAccess == 1) {
                           element.readAccess = false
        
                        }
                        if (this.editMenuSummaryData.writeAccess == 1) {
                           element.writeAccess = false
                           // ele.writeFlag = false;
                           // this.isCheckedWrite = false
                        }
                        if (this.editMenuSummaryData.deleteAccess == 1) {
                           element.deleteAccess = false
                           // ele.deleteFlag = false;
                           // this.isCheckedDelete = false
                        }
                        if (this.editMenuSummaryData.modifyAccess == 1) {
                           element.modifyAccess = false
                           // ele.modifyFlag = false;
                           // this.isCheckeModify = false
                        }
                        if (this.editMenuSummaryData.readAccess == 1 && this.editMenuSummaryData.writeAccess == 1 && this.editMenuSummaryData.deleteAccess == 1 && this.editMenuSummaryData.modifyAccess == 1) {
                           element.allAccess = false
                           ele.allFlag = false
                           //this.isChecked = false;
                        }
                     } else {
                        element.readAccess = false
                        ele.readFlag = false;
                        element.writeAccess = false
                        element.deleteAccess = false
                        element.modifyAccess = false
                        element.allAccess = false
                        ele.allFlag = false
        
                     }
                  });
               } else {
                  if (ele.applicationMenuId == this.editMenuSummaryData.accessibleMenuDetail.applicationMenuId) {
                     if (this.editMenuSummaryData.readAccess == 1) {
                        ele.readAccess = false
                     }
                     if (this.editMenuSummaryData.writeAccess == 1) {
                        ele.writeAccess = false
                     }
                     if (this.editMenuSummaryData.deleteAccess == 1) {
                        ele.deleteAccess = false
                     }
                     if (this.editMenuSummaryData.modifyAccess == 1) {
                        ele.modifyAccess = false
                     }
                     if (this.editMenuSummaryData.readAccess == 1 && this.editMenuSummaryData.writeAccess == 1 && this.editMenuSummaryData.deleteAccess == 1 && this.editMenuSummaryData.modifyAccess == 1) {
                        ele.allAccess = false
                        ele.allFlag = false
                        //this.isChecked = false;
                     }
                  }
               }
            }
        
        
         });
      }

      @HostListener('window:scroll', [])
      onWindowScroll() {
         if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
         } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop ||
            document.body.scrollTop < 10) {
            this.windowScrolled = false;
         }
      }

      scrollToTop() {
         (function smoothscroll() {
            let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
               window.requestAnimationFrame(smoothscroll);
               window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
         })();
      }

      onItemSelect(item: any) {
         console.log("Items is: " + JSON.stringify(item));

         this.globalCompanyMasterId.push(item.globalCompanyMasterId)
      }

      /** on selection comapny group name fetched comapny list and group list */
      onSelectCompanyName(companyGroupMasterId) {
        //debugger
         //console.log(companyGroupMasterId)
         this.companyGroupMasterId = companyGroupMasterId
         this.getRoleName()
         this.companyNameList = []
         this.companyName = null
         //  console.log( JSON.stringify(this.groupNamesData))
         this.groupNamesData
            .forEach(element => {
               //console.log(element)
               if (companyGroupMasterId == element.companyGroupMasterId) {
                  this.companyNameList.push(
                     {
                        'globalCompanyMasterId': element.globalCompanyMasterId,
                        'companyName': element.companyName
                     })
               }
            });
            
      console.log("1:  " + JSON.stringify(this.companyNameList))
         this.dropdownSettings = {
            singleSelection: false,
            idField: 'globalCompanyMasterId',
            textField: 'companyName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 2,
            allowSearchFilter: true
         }
         

         //console.log(this.companyNameList)
         this.service.getByCompanyGroupId(this.companyGroupMasterId).subscribe(res => {
            this.userGroupNameList = res.data.results;
            if(this.editFlag == true){
               this.rolePrivilegeForm.controls['userName'].setValue(this.editMenuSummaryData.userGroupId)
            }
         })
      }

      /** On selection on group fetched role list */
      onSelectGroupName(userGroupId: any) {
         this.selectedUsrGroupId = userGroupId
         this.userRoleData = []
         this.userRoleNameList.forEach(element => {
           
            if (userGroupId == element.userGroupId) {
               this.userRoleData.push(
                  {
                     'userRoleId': element.userRoleId,
                     'roleName': element.roleName
                  })
            }
         });

         console.log(this.userRoleData)

      }


      getSelectedRole() {
         this.getApplicationMenus();
         // this.getRolePrivilegeSummaryByUserRoleId();
      }

/////----------FieldLavel------------------

 // ---------get All FieldLevel-------

 getAllFieldLevelData(){
   this.fieldLevelMenu = null;
   this.fieldAllMasterData = []
    this.service.getFieldById(this.selectedapplicationMenuId).subscribe(res =>{
      console.log('fieldAllMasterData::', res);
       
      this.fieldLevelMenu = res.data.results[0];
       this.fieldAllMasterData = res.data.results[0];
      // this.fieldLevelMenu.forEach(ele =>{
      //   this.fieldAllMasterData.push(ele[0])

      // })
      // console.log("this.fieldAllMasterData: " + this.fieldAllMasterData)
    })
    
 }
  

 saveFieldLevelData(){

   // {
   //    let data = {
         
   //          "fieldLeveleAccessMatrixId": 0,
   //          "rolePrivilegeMatrixId": 132,
   //          "formFieldId": 142,
   //          "hide": 0,
   //          "readAccess": true,
   //          "writeAccess": true,
   //          "modifyAccess": true,
   //          "isActive": true
             
   //    } 
   //    this.service.addFields(data).subscribe((res) => {
   //      console.log("AssignedGroupSave:::",res);
   //      this.fieldAllMasterData = res.data.results;
   //    });
   //  }

   this.fieldLevelData = this.SelectedDataFields
   console.log("before: " + JSON.stringify(this.fieldLevelData))
   if (!this.editFlag) {
   this.service.addFields(this.fieldLevelData).subscribe(res =>{
      this.alertService.sweetalertMasterSuccess("Field Level Privilege data saved successfully", "");
      this.SelectedDataFields = []
      this.fieldLevelData = []
      this.fieldAllMasterData.forEach(element => {
         element.modifyFlag = false
         element.writeFlag = false
         element.readFlag = false
         element.allFlag = false
         element.hideFlag = false

      });

   })
}

  }


/// ---- field level checkUncheckCheckbox---------------------
  //////-------checkUncheckallReadFields()----------
  checkUncheckallReadFields(){
   if (this.isCheckedReadFields == true) {
      this.isCheckedReadFields = false;
      this.SelectedDataFields = []
   }
   else {
      this.isCheckedReadFields = true;
      this.fieldAllMasterData.forEach((ele: any) => {

         if (ele.formFieldDetails != null) {
            ele.formFieldDetails.forEach(element => {
               element.readAccess = false
               ele.readFlag = false;
               element.writeAccess = false
               element.hide = false
               element.modifyAccess = false
               element.allAccess = false
               ele.allFlag = false
            });
         }

         this.SelectedDataFields.push({
           // "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
            "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
            "formFieldId": this.formFieldId,
             "hide":0,
            "readAccess": true,
            "writeAccess": false,
            "modifyAccess": false,
            "isActive": true
             })
      })
   }

   console.log("FieldsData Read is: " + JSON.stringify(this.SelectedDataFields))
  }

  //////-------checkUncheckallWriteFields()----------
  checkUncheckallWriteFields(){
   if (this.isCheckedWriteFields == true) {
      this.isCheckedWriteFields = false;
      this.SelectedDataFields = []
   }
   else {
      this.isCheckedWriteFields = true;
      this.fieldAllMasterData.forEach((ele: any) => {
 
         if (ele.formFieldDetails != null) {
            ele.formFieldDetails.forEach(element => {
               element.readAccess = false
               ele.readFlag = false;
               element.writeAccess = false
               element.hide = false
               element.modifyAccess = false
               element.allAccess = false
               ele.allFlag = false
            });
         }

         this.SelectedDataFields.push({
           // "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
            "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
            "formFieldId": this.formFieldId,
           "hide":0,
            "readAccess": false,
            "writeAccess": true,
            "modifyAccess": false,
            "isActive": true
            
         })
      })
   }

   console.log("FieldsData Read is: " + JSON.stringify(this.SelectedDataFields))
  }
//////-------checkUncheckallModifyFields()----------
  checkUncheckallModifyFields(){
   if (this.isCheckedModifyFields == true) {
      this.isCheckedModifyFields = false;
      this.SelectedDataFields = []
   }
   else {
      this.isCheckedModifyFields = true;
      this.fieldAllMasterData.forEach((ele: any) => {
 
         if (ele.formFieldDetails != null) {
            ele.formFieldDetails.forEach(element => {
               element.readAccess = false
               ele.readFlag = false;
               element.writeAccess = false
               element.hide = false
               element.modifyAccess = false
               element.allAccess = false
               ele.allFlag = false
            });
         }

         this.SelectedDataFields.push({
           // "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
               "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
               "formFieldId": this.formFieldId,
           "hide":0,
            "readAccess": false,
            "writeAccess": false,
            "modifyAccess": true,
            "isActive": true
            
         })
      })
   }

   console.log("FieldsData Read is: " + JSON.stringify(this.SelectedDataFields))
  }
  //////-------checkUncheckallModifyFields()----------
  checkUncheckallHideFields(){
   if (this.isCheckedHideFields == true) {
      this.isCheckedHideFields = false;
      this.SelectedDataFields = []
   }
   else {
      this.isCheckedHideFields = true;
      this.fieldAllMasterData.forEach((ele: any) => {
 
         if (ele.formFieldDetails != null) {
            ele.formFieldDetails.forEach(element => {
               element.readAccess = false
               ele.readFlag = false;
               element.writeAccess = false
               element.hide = false
               element.modifyAccess = false
               element.allAccess = false
               ele.allFlag = false
            });
         }

         this.SelectedDataFields.push({
           // "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
            "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
            "formFieldId": this.formFieldId,
           "hide":0,
            "readAccess": false,
            "writeAccess": false,
            "modifyAccess": false,
            "isActive": true
            
         })
      })
   }

   console.log("FieldsData Read is: " + JSON.stringify(this.SelectedDataFields))
  }


  /** single Fields checked uncheked read */

  checkeUncheckSingleReadFields(fieldmenu,event){
console.log(fieldmenu);
//console.log(event);
   if(event.checked) {
            console.log(this.SelectedDataFields);
               
      if(this.SelectedDataFields.length > 0){
        this.SelectedDataFields.forEach((fieldLevelPrivilegeData,index) => {

           if(fieldLevelPrivilegeData.applicationMenusId == fieldmenu.applicationMenusId ){
              let ind = index;
              this.SelectedDataFields.splice(ind,1,{
              // "rolePrivilegeMatrixId":fieldLevelPrivilegeData.rolePrivilegeMatrixId,
               "fieldLeveleAccessMatrixId":fieldLevelPrivilegeData.fieldLeveleAccessMatrixId,
               "formFieldId": fieldmenu.formFieldId,
               "hide":0,
               "readAccess": true,
               "writeAccess": false,
               "modifyAccess": false,
               "isActive": true
              })
           }else{
              this.SelectedDataFields.push({
              // "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
               "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
               "formFieldId": fieldmenu.formFieldId,
               "hide":0,
               "readAccess": true,
               "writeAccess": false,
               "modifyAccess": false,
               "isActive": true
              }) 
           }
        })
        //  element.allFlag = true
       
      }else{
        this.SelectedDataFields.push({
        // "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
         "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
         "formFieldId": fieldmenu.formFieldId,
         "hide":0,
         "readAccess": true,
         "writeAccess": false,
         "modifyAccess": false,
         "isActive": true
        }) 
      }
      this.fieldAllMasterData.forEach((ele: any,index) => {
        if (ele.applicationMenuId == fieldmenu.parentMenuId) {

           if (ele.childItems != null) {
              ele.childItems.forEach(element => {
                 if (element.applicationMenuId == fieldmenu.applicationMenuId) {
                    element.readFlag = true
                    element.readAccess = true
                 }
              })
           }
        } 
  });


} else {
  this.fieldAllMasterData.forEach((ele: any) => {
     if (ele.applicationMenuId == fieldmenu.parentMenuId) {
        this.SelectedDataFields.forEach((item, index) => {
           if (item.menuId == fieldmenu.parentMenuId) {
              let ind = index;
              this.SelectedData.splice(ind, 1, {
              // "rolePrivilegeMatrixId":fieldmenu.rolePrivilegeMatrixId,
               "fieldLeveleAccessMatrixId":fieldmenu.fieldLeveleAccessMatrixId,
               "formFieldId": fieldmenu.formFieldId,
               "hide":ele.hide,
               "readAccess": true,
               "writeAccess": ele.modifyAccess,
               "modifyAccess": ele.modifyAccess,
               "isActive": true
              })
           }
        });

     }
     if (ele.childItems != null) {
        ele.childItems.forEach(element => {
           if (element.applicationMenuId == fieldmenu.applicationMenuId) {
              element.readFlag = false
              element.readAccess = false
           }
        })
     }
  })
}

console.log("read single value: " + JSON.stringify(this.SelectedDataFields))

  }


  /** single Fields checked uncheked read */
  checkeUncheckSingleWriteFields(fieldmenu,event){

   if(event.checked) {
             
                
      if(this.SelectedDataFields.length > 0){
        this.SelectedDataFields.forEach((fieldLevelPrivilegeData,index) => {
           if(fieldLevelPrivilegeData.applicationMenusId == fieldmenu.applicationMenusId ){
              let ind = index;
              this.SelectedDataFields.splice(ind,1,{
             //  "rolePrivilegeMatrixId":fieldLevelPrivilegeData.rolePrivilegeMatrixId,
               "fieldLeveleAccessMatrixId":fieldLevelPrivilegeData.fieldLeveleAccessMatrixId,
               "formFieldId": fieldmenu.formFieldId,
               "hide":0,
               "readAccess": false,
               "writeAccess": true,
               "modifyAccess": false,
               "isActive": true
              })
           }else{
              this.SelectedDataFields.push({
              // "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
               "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
               "formFieldId": fieldmenu.formFieldId,
               "hide":0,
               "readAccess": false,
               "writeAccess": true,
               "modifyAccess": false,
               "isActive": true
              }) 
           }
        })
        //  element.allFlag = true
       
      }else{
        this.SelectedDataFields.push({
        // "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
         "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
         "formFieldId": fieldmenu.formFieldId,
         "hide":0,
         "readAccess": false,
         "writeAccess": true,
         "modifyAccess": false,
         "isActive": true
        }) 
      }
      this.fieldAllMasterData.forEach((ele: any,index) => {
        if (ele.applicationMenuId == fieldmenu.parentMenuId) {

           if (ele.childItems != null) {
              ele.childItems.forEach(element => {
                 if (element.applicationMenuId == fieldmenu.applicationMenuId) {
                    element.writeFlag = true
                    element.writeAccess = true
                 }
              })
           }
        } 
  });


} else {
  this.fieldAllMasterData.forEach((ele: any) => {
     if (ele.applicationMenuId == fieldmenu.parentMenuId) {
        this.SelectedDataFields.forEach((item, index) => {
           if (item.menuId == fieldmenu.parentMenuId) {
              let ind = index;
              this.SelectedData.splice(ind, 1, {
             //  "rolePrivilegeMatrixId":fieldmenu.rolePrivilegeMatrixId,
               "fieldLeveleAccessMatrixId":fieldmenu.fieldLeveleAccessMatrixId,
               "formFieldId": fieldmenu.formFieldId,
               "hide":ele.hide,
               "readAccess": ele.readAccess,
               "writeAccess": true,
               "modifyAccess": ele.modifyAccess,
               "isActive": true
              })
           }
        });

     }
     if (ele.childItems != null) {
        ele.childItems.forEach(element => {
           if (element.applicationMenuId == fieldmenu.applicationMenuId) {
              element.writeFlag = false
              element.writeAccess = false
           }
        })
     }
  })
}
     
  }

  checkeUncheckSingleModifyFields(fieldmenu,event){
   if(event.checked) {
             
                
      if(this.SelectedDataFields.length > 0){
        this.SelectedDataFields.forEach((fieldLevelPrivilegeData,index) => {
           if(fieldLevelPrivilegeData.applicationMenusId == fieldmenu.applicationMenusId ){
              let ind = index;
              this.SelectedDataFields.splice(ind,1,{
              // "rolePrivilegeMatrixId":fieldLevelPrivilegeData.rolePrivilegeMatrixId,
               "fieldLeveleAccessMatrixId":fieldLevelPrivilegeData.fieldLeveleAccessMatrixId,
               "formFieldId": fieldmenu.formFieldId,
               "hide":0,
               "readAccess": false,
               "writeAccess": false,
               "modifyAccess": true,
               "isActive": true
              })
           }else{
              this.SelectedDataFields.push({
             //  "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
               "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
               "formFieldId": fieldmenu.formFieldId,
               "hide":0,
               "readAccess": false,
               "writeAccess": false,
               "modifyAccess": true,
               "isActive": true
              }) 
           }
        })
        //  element.allFlag = true
       
      }else{
        this.SelectedDataFields.push({
        // "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
         "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
         "formFieldId": fieldmenu.formFieldId,
         "hide":0,
         "readAccess": false,
         "writeAccess": false,
         "modifyAccess": true,
         "isActive": true
        }) 
      }
      this.fieldAllMasterData.forEach((ele: any,index) => {
        if (ele.applicationMenuId == fieldmenu.parentMenuId) {

           if (ele.childItems != null) {
              ele.childItems.forEach(element => {
                 if (element.applicationMenuId == fieldmenu.applicationMenuId) {
                    element.modifyFlag = true
                    element.modifyAccess = true
                 }
              })
           }
        } 
  });


} else {
  this.fieldAllMasterData.forEach((ele: any) => {
     if (ele.applicationMenuId == fieldmenu.parentMenuId) {
        this.SelectedDataFields.forEach((item, index) => {
           if (item.menuId == fieldmenu.parentMenuId) {
              let ind = index;
              this.SelectedData.splice(ind, 1, {
             //  "rolePrivilegeMatrixId":fieldmenu.rolePrivilegeMatrixId,
               "fieldLeveleAccessMatrixId":fieldmenu.fieldLeveleAccessMatrixId,
               "formFieldId": fieldmenu.formFieldId,
               "hide":ele.hide,
               "readAccess": ele.readAccess,
               "writeAccess": ele.writeAccess,
               "modifyAccess": true,
               "isActive": true
              })
           }
        });

     }
     if (ele.childItems != null) {
        ele.childItems.forEach(element => {
           if (element.applicationMenuId == fieldmenu.applicationMenuId) {
              element.modifyFlag = false
              element.modifyAccess = false
           }
        })
     }
  })
}
     
  }

  checkeUncheckSingleHideFields(fieldmenu,event){
   if(event.checked) {
             
                
      if(this.SelectedDataFields.length > 0){
        this.SelectedDataFields.forEach((fieldLevelPrivilegeData,index) => {
           if(fieldLevelPrivilegeData.applicationMenusId == fieldmenu.applicationMenusId ){
              let ind = index;
              this.SelectedDataFields.splice(ind,1,{
             //  "rolePrivilegeMatrixId":fieldLevelPrivilegeData.rolePrivilegeMatrixId,
               "fieldLeveleAccessMatrixId":fieldLevelPrivilegeData.fieldLeveleAccessMatrixId,
               "formFieldId": fieldmenu.formFieldId,
               "hide":0,
               "readAccess": false,
               "writeAccess": false,
               "modifyAccess": false,
               "isActive": true
              })
           }else{
              this.SelectedDataFields.push({
             //  "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
               "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
               "formFieldId": fieldmenu.formFieldId,
               "hide":0,
               "readAccess": false,
               "writeAccess": false,
               "modifyAccess": false,
               "isActive": true
              }) 
           }
        })
        //  element.allFlag = true
       
      }else{
        this.SelectedDataFields.push({
        // "rolePrivilegeMatrixId":this.rolePrivilegeMatrixId,
         "fieldLeveleAccessMatrixId":this.fieldLeveleAccessMatrixId,
         "formFieldId": fieldmenu.formFieldId,
         "hide":0,
         "readAccess": false,
         "writeAccess": false,
         "modifyAccess": false,
         "isActive": true
        }) 
      }
      this.fieldAllMasterData.forEach((ele: any,index) => {
        if (ele.applicationMenuId == fieldmenu.parentMenuId) {

           if (ele.childItems != null) {
              ele.childItems.forEach(element => {
                 if (element.applicationMenuId == fieldmenu.applicationMenuId) {
                    element.hideFlag = true
                    element.hideAccess = true
                 }
              })
           }
        } 
  });


} else {
  this.fieldAllMasterData.forEach((ele: any) => {
     if (ele.applicationMenuId == fieldmenu.parentMenuId) {
        this.SelectedDataFields.forEach((item, index) => {
           if (item.menuId == fieldmenu.parentMenuId) {
              let ind = index;
              this.SelectedData.splice(ind, 1, {
             //  "rolePrivilegeMatrixId":fieldmenu.rolePrivilegeMatrixId,
               "fieldLeveleAccessMatrixId":fieldmenu.fieldLeveleAccessMatrixId,
               "formFieldId": fieldmenu.formFieldId,
               "hide":ele.hide,
               "readAccess": ele.readAccess,
               "writeAccess": ele.writeAccess,
               "modifyAccess": ele.modifyAccess,
               "isActive": true
              })
           }
        });

     }
     if (ele.childItems != null) {
        ele.childItems.forEach(element => {
           if (element.applicationMenuId == fieldmenu.applicationMenuId) {
              element.hideFlag = false
              element.hideAccess = false
           }
        })
     }
  })
}
      
  }
  
onSelectFieldLevel(template1:TemplateRef<any>, menu)
    {
       this.modalRef = this.modalService.show(
        template1,
        Object.assign({}, { class: 'gray modal-lg' })
           );
console.log(menu);
         this.selectedapplicationMenuId = menu.applicationMenuId
         this.selectedSubMenuName = menu.menuName
         //this.fieldLeveleAccessMatrixId = menu.fieldLeveleAccessMatrixId
       //  this.rolePrivilegeMatrixId = menu.rolePrivilegeMatrixId
         console.log(this.rolePrivilegeMatrixId);
         this.getAllFieldLevelData()
    }
      

      largepopup(template: TemplateRef<any>) {
         this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-xl' })
            );
      }
}
