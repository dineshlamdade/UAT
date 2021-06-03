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
         console.log(JSON.stringify(this.groupNamesData)
         )
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
                  'globalCompanyMasterId': element.globalCompanyMasterId,
                  'companyGroupMasterId': element.userRoleDetail.companyGroupMasterId,
                  'companyGroupName': element.userRoleDetail.companyGroupName,
                  'accessibleMenuDetail': element.accessibleMenuDetail,

                  'readAccess': element.readAccess,
                  'writeAccess': element.writeAccess,
                  'modifyAccess': element.modifyAccess,
                  'deleteAccess': element.deleteAccess
               })
            }); 
            });
          
             //this.menuSummaryData = res.data.results.userRoleDetail;

            this.totalRecords = res.data.results[0].totalElements
           
          console.log(JSON.stringify(this.menuSummaryData))

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
               "rolePrivilegeMatrixId":0,
               "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
               "applicationMenusId": ele.applicationMenuId,
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
               "rolePrivilegeMatrixId":0,
               "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
               "applicationMenusId": ele.applicationMenuId,
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
               "rolePrivilegeMatrixId":0,
               "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
               "applicationMenusId": ele.applicationMenuId,
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
               "rolePrivilegeMatrixId":0,
               "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
               "applicationMenusId": ele.applicationMenuId,
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
               "rolePrivilegeMatrixId":0,
               "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
               "applicationMenusId": ele.applicationMenuId,
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
                  "rolePrivilegeMatrixId":0,
                  "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                  "applicationMenusId": ele.applicationMenuId,
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
                  "rolePrivilegeMatrixId":0,
                  "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                  "applicationMenusId": ele.applicationMenuId,
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
                  "rolePrivilegeMatrixId":0,
                  "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                  "applicationMenusId": ele.applicationMenuId,
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
                  "rolePrivilegeMatrixId":0,
                  "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                  "applicationMenusId": ele.applicationMenuId,
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
                  "rolePrivilegeMatrixId":0,
                  "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                  "applicationMenusId": ele.applicationMenuId,
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
      if (event.checked) {
         this.menusData.forEach((ele: any) => {
            //console.log(ele.childItems)
            if (ele.childItems != null) {
               ele.childItems.forEach(element => {
                  if (element.applicationMenuId == submenu.applicationMenuId) {
                     // console.log("element.allFlag: "+ element.allFlag)
                     element.allFlag = true
                     this.SelectedData.push({
                        "rolePrivilegeMatrixId":0,
                        "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                        "applicationMenusId": ele.applicationMenuId,
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
                              "rolePrivilegeMatrixId":0,
                              "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                              "applicationMenusId": ele.applicationMenuId,
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
            this.menusData.forEach((ele: any) => {

               if (ele.applicationMenuId == submenu.parentMenuId) {

                  //  element.allFlag = true
                  this.SelectedData.push({
                     "rolePrivilegeMatrixId":0,
                     "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                     "applicationMenusId": submenu.applicationMenuId,
                     "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                     "readAccess": 1,
                     "writeAccess": 0,
                     "modifyAccess": 0,
                     "deleteAccess": 0
                  })
               }

               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     if (element.applicationMenuId == submenu.applicationMenuId) {
                        element.readFlag = true
                        element.readAccess = true
                     }
                  })
               }
            });


         } else {
            this.menusData.forEach((ele: any) => {
               if (ele.applicationMenuId == submenu.parentMenuId) {
                  this.SelectedData.forEach((item, index) => {
                     if (item.menuId == submenu.parentMenuId) {
                        let ind = index;
                        this.SelectedData.splice(ind, 1, {
                           "rolePrivilegeMatrixId":0,
                           "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                           "applicationMenusId": submenu.applicationMenuId,
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
         if (event.checked) {
            this.menusData.forEach((ele: any) => {

               if (ele.applicationMenuId == submenu.parentMenuId) {

                  //  element.allFlag = true
                  this.SelectedData.push({
                     "rolePrivilegeMatrixId":0,
                     "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                     "applicationMenusId": submenu.applicationMenuId,
                     "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                     "readAccess": 0,
                     "modifyAccess": 0,
                     "deleteAccess": 0,
                     "writeAccess": 1
                  })
               }
               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     if (element.applicationMenuId == submenu.applicationMenuId) {
                        element.writeFlag = true
                        element.writeAccess = true
                     }
                  })
               }
            });


         } else {
            this.menusData.forEach((ele: any) => {

               if (ele.applicationMenuId == submenu.parentMenuId) {
                  this.SelectedData.forEach((item, index) => {
                     if (item.menuId == submenu.parentMenuId) {
                        let ind = index;
                        this.SelectedData.splice(ind, 1, {
                           "rolePrivilegeMatrixId":0,
                           "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                           "applicationMenusId": submenu.applicationMenuId,
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
      }
      /** single menu checked uncheked modify */
      checkeUncheckSingleMenuModify(submenu, event) {
         if (event.checked) {
            this.menusData.forEach((ele: any) => {

               if (ele.applicationMenuId == submenu.parentMenuId) {

                  //  element.allFlag = true
                  this.SelectedData.push({
                     "rolePrivilegeMatrixId":0,
                     "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                     "applicationMenusId": submenu.applicationMenuId,
                     "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                     "readAccess": 0,
                     "modifyAccess": 1,
                     "deleteAccess": 0,
                     "writeAccess": 0
                  })
               }
               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     if (element.applicationMenuId == submenu.applicationMenuId) {
                        element.modifyFlag = true
                        element.modifyAccess = true
                     }
                  })
               }
            });

         } else {
            this.menusData.forEach((ele: any) => {
               if (ele.applicationMenuId == submenu.parentMenuId) {
                  this.SelectedData.forEach((item, index) => {
                     if (item.menuId == submenu.parentMenuId) {
                        let ind = index;
                        this.SelectedData.splice(ind, 1, {
                           "rolePrivilegeMatrixId":0,
                           "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                           "applicationMenusId": submenu.applicationMenuId,
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
      }

      checkeUncheckSingleMenuDelete(submenu, event) {
         if (event.checked) {
            this.menusData.forEach((ele: any) => {

               if (ele.applicationMenuId == submenu.parentMenuId) {

                  //  element.allFlag = true
                  this.SelectedData.push({
                     "rolePrivilegeMatrixId":0,
                     "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                     "applicationMenusId": submenu.applicationMenuId,
                     "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
                     "readAccess": 0,
                     "modifyAccess": 0,
                     "deleteAccess": 1,
                     "writeAccess": 0
                  })
               }
               if (ele.childItems != null) {
                  ele.childItems.forEach(element => {
                     if (element.applicationMenuId == submenu.applicationMenuId) {
                        element.deleteFlag = true
                        element.deleteAccess = true
                     }
                  })
               }
            });

         } else {
            this.menusData.forEach((ele: any) => {
               if (ele.applicationMenuId == submenu.parentMenuId) {
                  this.SelectedData.forEach((item, index) => {
                     if (item.menuId == submenu.parentMenuId) {
                        let ind = index;
                        this.SelectedData.splice(ind, 1, {
                           "rolePrivilegeMatrixId":0,
                           "userRoleId": parseInt(this.rolePrivilegeForm.controls['roleName'].value),
                           "applicationMenusId": submenu.applicationMenuId,
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

         this.rolePrivilegeForm.enable();
         this.rolePrivilegeForm.controls['companyGroupName'].setValue(menuSummary.companyGroupMasterId)

         let com = [{
            'globalCompanyMasterId': this.editMenuSummaryData.globalCompanyMasterId,
            'companyName': this.editMenuSummaryData.companyName
         }]
         console.log("company details: "+ JSON.stringify(com))
         this.selectedCompanyName = com
         this.rolePrivilegeForm.controls['companyName'].setValue(this.selectedCompanyName)

         
         
         this.globalCompanyMasterId = this.editMenuSummaryData.globalCompanyMasterId
       //console.log(JSON.stringify(this.editMenuSummaryData))
         this.menusData.forEach((ele: any) => {
            if (ele.applicationMenuId == menuSummary.accessibleMenuDetail.applicationMenuId) {
               //  element.allFlag = true
               this.SelectedData.push({
                  "rolePrivilegeMatrixId":this.editMenuSummaryData.rolePrivilegeMatrixId,
                  "userRoleId": parseInt(this.editMenuSummaryData.userRoleId),
                  "applicationMenusId": ele.applicationMenuId,
                  "globalCompanyMasterId": parseInt(this.globalCompanyMasterId.toString()),
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
                  "rolePrivilegeMatrixId":0,
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
            
      //console.log(this.companyNameList)
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

      largepopup(template: TemplateRef<any>) {
         this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-xl' })
         );
      }
}
