import { Component, HostListener, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolePrivilegeService } from './role-privilege.service';
import { AlertServiceService } from '../../../../core/services/alert-service.service';

export interface User1 {
  full; read; write; modify; delete;
}
export interface User2 {
 enabledisabled
}
export interface data {
  srno; company ; usergrup; userrole; userrole1;
}
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
  
  data: data[];
  groupNamesData: any;
  userGroupNames: any;
  userGroupNameList: any;
  userRoleNameList: any;
  companyNameList: any = [];
  menuAllMasterData: any[];
  menuSummaryData: any;
  editFlag: any;
  userGroupNamesData: any;
  userRollNamesData: any;
  userRoleNamesData: any;
  userGroupList: any =[];
  userRoleList:any =[];
  userRoleData: any=[];
  privilegeData: any = [];

  get f(){
    return this.rolePrivilegeForm.controls;
  }

  constructor(private modalService: BsModalService,
    private formBuilder: FormBuilder, private service:RolePrivilegeService, private alertService: AlertServiceService, ) { }

  ngOnInit(): void {
    this.rolePrivilegeForm = this.formBuilder.group({
      employeeRoleAssignmentId: new FormControl(''),
      globalUserMasterId: new FormControl(''),
       companyGroupMasterId: new FormControl(''),
      globalCompanyMasterId: new FormControl(''),
      userRoleId: new FormControl(''),
      applicationMenusId:new FormControl(''),
      userGroupId: new FormControl(''),
      companyId: new FormControl(''),
      companyGroupName: new FormControl(''),
      companyName: new FormControl(''),
      remark: new FormControl(''),
      readAccess: new FormControl(''),
      writeAccess: new FormControl(''),
      modifyAccess: new FormControl(''),
      deleteAccess: new FormControl(''),
      rolePrivilegeMatrixId:new FormControl(''),
      isActive: new FormControl(''),
      createdBy: new FormControl(''),
      createdDateTime: new FormControl(''),
      lastModifiedBy: new FormControl(''),
      lastModifiedDateTime: new FormControl(''),
      })
  
      this.selectedItems = [];
      this.dropdownSettings = { };
       this.dropdownList= [];

//this.onloadSubmit();

 this.getGroupName()
 this.getUserGroupName()
this.getRoleName()
//  this.getCompanyName()
 this.getApplicationMenus()
 this.getRolePrivilegeSummaryByUserRoleId()


     }

     getGroupName(){
      this.service.getEmployeeRoleAssignment().subscribe((res) => {
        // res.data.results.forEach(element => {
        //   this.dropdownList.push({ id:element.globalUserMasterId , label: element.companyGroupName })
        // });
     this.groupNamesData = res.data.results;

        this.dropdownSettings ={
        singleSelection: false,  
        idField: 'globalUserMasterId', 
        textField: 'companyGroupName',  
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',  
        itemsShowLimit: 2,  
        allowSearchFilter: true  
        }
        
     });
     }
     getUserGroupName(){
       
      this.service.getByCompanyGroupId().subscribe((res) => {
      this.userGroupNameList = res.data.results;
      }) ;
     }

     getRoleName(){
       
      this.service.userRoleGetByCompanyGroupMasterId().subscribe((res) => {
      this.userRoleNameList = res.data.results;
      }) ;
     }


     getCompanyName(){
       
      this.service.getCompanyId().subscribe((res) => {
       this.companyNameList = res.data.results;
      }) ;
     }

     getApplicationMenus(){
      this.menuAllMasterData = []; 
      this.service.getApplicationMenusData().subscribe((res) => {
        res = {
          "data": {
            "results": [
              {
                "applicationMenuId": 1,
                "parentMenuId": 0,
                "menuName": "Employee Master",
                "menuDescription": "Employee Master",
                "isActive": true,
                "createdBy": "MayurG",
                "createdDateTime": "01-Jan-2020",
                "lastModifiedBy": null,
                "lastModifiedDateTime": null,
                "childItems": [
                  {
                    "applicationMenuId": 5,
                    "parentMenuId": 1,
                    "menuName": "Employee Summary",
                    "menuDescription": "Employee Summary",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  },
                  {
                    "applicationMenuId": 6,
                    "parentMenuId": 1,
                    "menuName": "Personal Informatio",
                    "menuDescription": "Personal Information",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  },
                  {
                    "applicationMenuId": 7,
                    "parentMenuId": 1,
                    "menuName": "Employment Information",
                    "menuDescription": "Employment Information",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  },
                  {
                    "applicationMenuId": 8,
                    "parentMenuId": 1,
                    "menuName": "Contact Information",
                    "menuDescription": "Contact Information",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  },
                  {
                    "applicationMenuId": 9,
                    "parentMenuId": 1,
                    "menuName": "Bank Information",
                    "menuDescription": "Bank Information",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  },
                  {
                    "applicationMenuId": 10,
                    "parentMenuId": 1,
                    "menuName": "Payroll Information",
                    "menuDescription": "Payroll Information",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  },
                  {
                    "applicationMenuId": 11,
                    "parentMenuId": 1,
                    "menuName": "Job Information",
                    "menuDescription": "Job Information",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  },
                  {
                    "applicationMenuId": 12,
                    "parentMenuId": 1,
                    "menuName": "Identity Information",
                    "menuDescription": "Identity Information",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  },
                  {
                    "applicationMenuId": 13,
                    "parentMenuId": 1,
                    "menuName": "Compliance Information",
                    "menuDescription": "Compliance Information",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  },
                  {
                    "applicationMenuId": 14,
                    "parentMenuId": 1,
                    "menuName": "Previous Employment Information",
                    "menuDescription": "Previous Employment Information",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  },
                  {
                    "applicationMenuId": 16,
                    "parentMenuId": 1,
                    "menuName": "Family Information",
                    "menuDescription": "Family Information",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  },
                  {
                    "applicationMenuId": 17,
                    "parentMenuId": 1,
                    "menuName": "Education & Skill Information",
                    "menuDescription": "Education & Skill Information",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  }
                ]
              },
              {
                "applicationMenuId": 2,
                "parentMenuId": 0,
                "menuName": "Report",
                "menuDescription": "Report",
                "isActive": true,
                "createdBy": "MayurG",
                "createdDateTime": "01-Jan-2020",
                "lastModifiedBy": null,
                "lastModifiedDateTime": null,
                "childItems": [
                  {
                    "applicationMenuId": 62,
                    "parentMenuId": 2,
                    "menuName": "Tax Sheet",
                    "menuDescription": "Tax Sheet",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  },
                  {
                    "applicationMenuId": 63,
                    "parentMenuId": 2,
                    "menuName": "Payslip",
                    "menuDescription": "Payslip",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  }
                ]
              },
              {
                "applicationMenuId": 3,
                "parentMenuId": 0,
                "menuName": "Query",
                "menuDescription": "Query",
                "isActive": true,
                "createdBy": "MayurG",
                "createdDateTime": "01-Jan-2020",
                "lastModifiedBy": null,
                "lastModifiedDateTime": null,
                "childItems": null
              },
              {
                "applicationMenuId": 4,
                "parentMenuId": 0,
                "menuName": "Investment",
                "menuDescription": "Inverstment",
                "isActive": true,
                "createdBy": "MayurG",
                "createdDateTime": "01-Jan-2020",
                "lastModifiedBy": null,
                "lastModifiedDateTime": null,
                "childItems": [
                  {
                    "applicationMenuId": 19,
                    "parentMenuId": 4,
                    "menuName": "Previous Employer",
                    "menuDescription": "Previous Employer",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  },
                  {
                    "applicationMenuId": 20,
                    "parentMenuId": 4,
                    "menuName": "House Rent",
                    "menuDescription": "House Rent",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  },
                  {
                    "applicationMenuId": 21,
                    "parentMenuId": 4,
                    "menuName": "Housing Loan",
                    "menuDescription": "Housing Loan",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  },
                  {
                    "applicationMenuId": 22,
                    "parentMenuId": 4,
                    "menuName": "80- C",
                    "menuDescription": "80- C",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": [
                      {
                        "applicationMenuId": 23,
                        "parentMenuId": 22,
                        "menuName": "Provident Fund",
                        "menuDescription": "Provident Fund",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 24,
                        "parentMenuId": 22,
                        "menuName": "Voluntary Provident Fund",
                        "menuDescription": "Voluntary Provident Fund",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 25,
                        "parentMenuId": 22,
                        "menuName": "Employee's National Pension Scheme 80CCD(1)",
                        "menuDescription": "Employee's National Pension Scheme 80CCD(1)",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 26,
                        "parentMenuId": 22,
                        "menuName": "Pension Plan",
                        "menuDescription": "Pension Plan",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 27,
                        "parentMenuId": 22,
                        "menuName": "Housing Loan - Principal Repayment",
                        "menuDescription": "Housing Loan - Principal Repayment",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 28,
                        "parentMenuId": 22,
                        "menuName": "Life Insurance Premium",
                        "menuDescription": "Life Insurance Premium",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 29,
                        "parentMenuId": 22,
                        "menuName": "ational Saving Certificate",
                        "menuDescription": "National Saving Certificate",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 30,
                        "parentMenuId": 22,
                        "menuName": "ational Saving Certificate Accrued Interest",
                        "menuDescription": "National Saving Certificate Accrued Interest",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 31,
                        "parentMenuId": 22,
                        "menuName": "Public Provident Fund",
                        "menuDescription": "Public Provident Fund",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 32,
                        "parentMenuId": 22,
                        "menuName": "Unit Linked Insurance Plan",
                        "menuDescription": "Unit Linked Insurance Plan",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 33,
                        "parentMenuId": 22,
                        "menuName": "Mutual Fund",
                        "menuDescription": "Mutual Fund",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 34,
                        "parentMenuId": 22,
                        "menuName": "Tuition Fees",
                        "menuDescription": "Tuition Fees",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 35,
                        "parentMenuId": 22,
                        "menuName": "Tax Saving Shares / NABARD and Other Bonds",
                        "menuDescription": "Tax Saving Shares / NABARD and Other Bonds",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 36,
                        "parentMenuId": 22,
                        "menuName": "Fixed Deposits More Than 5 Yrs",
                        "menuDescription": "Fixed Deposits More Than 5 Yrs",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 37,
                        "parentMenuId": 22,
                        "menuName": "Housing - Stamp Duty & Registration",
                        "menuDescription": "Housing - Stamp Duty & Registration",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 38,
                        "parentMenuId": 22,
                        "menuName": "Post Office Time Deposit Scheme (Term Deposit)",
                        "menuDescription": "Post Office Time Deposit Scheme (Term Deposit)",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 44,
                        "parentMenuId": 22,
                        "menuName": "Post Office Time Deposit Scheme (Recurring Deposit)",
                        "menuDescription": "Post Office Time Deposit Scheme (Recurring Deposit)",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 45,
                        "parentMenuId": 22,
                        "menuName": "Senior Citizen Saving Scheme",
                        "menuDescription": "Senior Citizen Saving Scheme",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 46,
                        "parentMenuId": 22,
                        "menuName": "Sukanya Samriddhi Scheme",
                        "menuDescription": "Sukanya Samriddhi Scheme",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      }
                    ],
                    "possibleAccessRights": {}
                  },
                  {
                    "applicationMenuId": 47,
                    "parentMenuId": 4,
                    "menuName": "Chapter VI-A",
                    "menuDescription": "Chapter VI-A",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": [
                      {
                        "applicationMenuId": 48,
                        "parentMenuId": 47,
                        "menuName": "PS Master",
                        "menuDescription": "NPS Master",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 49,
                        "parentMenuId": 47,
                        "menuName": "Handicapped Dependent U/s 80-DD",
                        "menuDescription": "Handicapped Dependent U/s 80-DD",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 50,
                        "parentMenuId": 47,
                        "menuName": "Treatment of Specified Diseases (80-DDB)",
                        "menuDescription": "Treatment of Specified Diseases (80-DDB)",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 51,
                        "parentMenuId": 47,
                        "menuName": "Interest on Educational Loan (80-E)",
                        "menuDescription": "Interest on Educational Loan (80-E)",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 52,
                        "parentMenuId": 47,
                        "menuName": "Interest on loan for purchase of Electric Vehicle (80EEB)",
                        "menuDescription": "Interest on loan for purchase of Electric Vehicle (80EEB)",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 53,
                        "parentMenuId": 47,
                        "menuName": "Donations (80-G)",
                        "menuDescription": "Donations (80-G)",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 54,
                        "parentMenuId": 47,
                        "menuName": "Deduction in respect of certain Donations for Scientfic Research or Rural Development (80-GGA)",
                        "menuDescription": "Deduction in respect of certain Donations for Scientfic Research or Rural Development (80-GGA)",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 55,
                        "parentMenuId": 47,
                        "menuName": "Deduction in respect of contributions given to Political Parties (80-GGC)",
                        "menuDescription": "Deduction in respect of contributions given to Political Parties (80-GGC)",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 56,
                        "parentMenuId": 47,
                        "menuName": "House Rental (80-GG)",
                        "menuDescription": "House Rental (80-GG)",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 57,
                        "parentMenuId": 47,
                        "menuName": "Interest on deposit in Saving account (80TTA) & 80TTB",
                        "menuDescription": "Interest on deposit in Saving account (80TTA) & 80TTB",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 58,
                        "parentMenuId": 47,
                        "menuName": "Physically Handicapped (80-U)",
                        "menuDescription": "Physically Handicapped (80-U)",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      },
                      {
                        "applicationMenuId": 59,
                        "parentMenuId": 47,
                        "menuName": "Mediclaim Premium U/s 80-D",
                        "menuDescription": "Mediclaim Premium U/s 80-D",
                        "isActive": true,
                        "createdBy": "MayurG",
                        "createdDateTime": "01-Jan-2020",
                        "lastModifiedBy": null,
                        "lastModifiedDateTime": null,
                        "childItems": null,
                        "possibleAccessRights": {
                          "readAccess": null,
                          "modifyAccess": null,
                          "deleteAccess": null,
                          "writeAccess": null
                        }
                      }
                    ],
                    "possibleAccessRights": {}
                  },
                  {
                    "applicationMenuId": 60,
                    "parentMenuId": 4,
                    "menuName": "Other",
                    "menuDescription": "Other",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  },
                  {
                    "applicationMenuId": 61,
                    "parentMenuId": 4,
                    "menuName": "Other Income",
                    "menuDescription": "Other Income",
                    "isActive": true,
                    "createdBy": "MayurG",
                    "createdDateTime": "01-Jan-2020",
                    "lastModifiedBy": null,
                    "lastModifiedDateTime": null,
                    "childItems": null,
                    "possibleAccessRights": {
                      "readAccess": null,
                      "modifyAccess": null,
                      "deleteAccess": null,
                      "writeAccess": null
                    }
                  }
                ]
              },
              {
                "applicationMenuId": 64,
                "parentMenuId": 0,
                "menuName": "Polling",
                "menuDescription": "Polling",
                "isActive": true,
                "createdBy": "MayurG",
                "createdDateTime": "01-Jan-2020",
                "lastModifiedBy": null,
                "lastModifiedDateTime": null,
                "childItems": null
              }
            ]
          },
          "meta": {
            "timestamp": 1619153777903,
            "path": "",
            "user": ""
          },
          "status": {
            "code": "200",
            "result": "Success",
            "message": "Application Menu details found successfully"
          }
        }

       this.menuAllMasterData = res.data.results;
       
       let temp = [];
       temp.push( this.menuAllMasterData[0]);

      //  this.menuAllMasterData.forEach(element =>
      //   {
      //     temp.forEach(ele =>{
      //       if(ele.mainMenuName == element.mainMenuName){
      //         element.subMenuList.push({
      //           'menuName': element.subMenuOrFormName1
      //         })
      //       }
      //     })
      //   })
     })

     console.log("this.menuAllMasterData: "+ this.menuAllMasterData)
    }

     getRolePrivilegeSummaryByUserRoleId(){
      this.menuSummaryData = []; 
      this.service.getUserRolePrivilegesByUserRoleId().subscribe((res) => {
        console.log('menuSummaryData::', res);
       this.menuSummaryData = res.data.results;
      }) ;
     }

     onSubmit(){
      if(!this.editFlag){
        console.log(JSON.stringify(this.rolePrivilegeForm.value));
        this.service.addUserRolePrivilege(this.rolePrivilegeForm.value).subscribe(res =>
          {
            this.alertService.sweetalertMasterSuccess("User Group data save successfully","");
          })
      }else{
        this.updateRolePrivilege();
      }
     }

     updateRolePrivilege(){
      this.service.updateUserRolePrivilege(this.rolePrivilegeForm.value).subscribe(res =>
        {
          this.alertService.sweetalertMasterSuccess("User Group data save successfully","");
        }
        )
     }

     editMenuSummary(menuSummary)
     {
       this.editFlag = true;
       this.rolePrivilegeForm.enable();
       this.rolePrivilegeForm.patchValue(menuSummary);
     }
     viewMenuSummary(menuSummary)
     {
       this.editFlag = false;
      this.rolePrivilegeForm.patchValue(menuSummary);
      this.rolePrivilegeForm.disable();
     }
     reset(){
       this.rolePrivilegeForm.enable();
       this.rolePrivilegeForm.reset();
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
    // console.log(item);
    this.groupNamesData.forEach(element => {
      // console.log(element)
      if(item.globalUserMasterId == element.globalUserMasterId){
        this.companyNameList.push(
          {
            'companyId': element.companyId,
            'companyName': element.companyName
          })
      }
    });

    console.log(this.companyNameList)
  }


  onSelectAll(items: any) {
    console.log(items);
    items.forEach(element => {
      this.userGroupNameList.forEach(ele => {
        if(element.globalUserMasterId == ele.globalUserMasterId){
          this.companyNameList.push({
            'companyId': element.companyId,
            'companyName': element.companyName
          })
        }
      });
    });

  }

  onSelectCompanyName(companyId:any){
    console.log(companyId);
    let userGroupId : any;
    this.groupNamesData.forEach(element => {
      if(element.companyId == companyId){
        userGroupId = element.userGroupId
      }
    });

    this.userGroupNameList.forEach(element => {
     
      if(userGroupId == element.userGroupId){
        this.userGroupList.push(
          {
            'userGroupId': element.userGroupId,
            'groupName': element.groupName
          })
      }
    });
    console.log(this.groupNamesData)
    console.log(this.userGroupNameList)
  }

  onSelectGroupName(userGroupId:any){
    console.log(userGroupId);
    let userRoleId : any;
    this.groupNamesData.forEach(element => {
      if(element.userGroupId == userGroupId){
        userRoleId = element.userRoleId
      }
    });
    this.userRoleNameList.forEach(element => {
      // console.log(element)
      if(userGroupId == element.userGroupId){
        this.userRoleData.push(
          {
            'userRoleId': element.userRoleId,
            'roleName': element.roleName
          })
      }
    });
    console.log(this.groupNamesData)
    console.log(this.userRoleData)
  }


  onSelectAllReadCheckBox(event,menuData,accessName){
    // debugger
      if(event.checked){
       
        if(this.privilegeData.length > 0){
          
          this.privilegeData.forEach((element,index) => {
            if(menuData.menuId == element.applicationMenusId){
              let ind = index;
                this.privilegeData.splice(ind,1,{
                  "userRoleId":1,
                  "applicationMenusId":menuData.menuId,
                  "globalCompanyMasterId":1,
                  "readAccess": 1,
                  "writeAccess":0,
                  "modifyAccess":0,
                  "deleteAccess":0
        
              })
              }else{
                this.privilegeData.push({
                  "userRoleId":1,
                  "applicationMenusId":menuData.menuId,
                  "globalCompanyMasterId":1,
                  "readAccess": 1,
                  "writeAccess":0,
                  "modifyAccess":0,
                  "deleteAccess":0
        
              })
              }
            
            });
            
          }
          else{
            this.privilegeData.push({
              "userRoleId":1,
              "applicationMenusId":menuData.menuId,
              "globalCompanyMasterId":1,
              "readAccess": 1,
              "writeAccess":0,
              "modifyAccess":0,
              "deleteAccess":0
    
          })
          }
        }

        console.log("privilegeData::",this.privilegeData)
  }

  onSelectAllWriteCheckBox(event,menuData,accessName){
    if(event.checked){
      if(this.privilegeData.length > 0){
          
        this.privilegeData.forEach((element,index) => {
          if(menuData.menuId == element.applicationMenusId){
            let ind = index;
            this.privilegeData.splice(ind,1,{
              "userRoleId":1,
              "applicationMenusId":menuData.menuId,
              "globalCompanyMasterId":1,
              "readAccess": element.readAccess,
              "writeAccess":1,
              "modifyAccess":0,
              "deleteAccess":0
    
          })
          }
          
          else{
            this.privilegeData.push({
              "userRoleId":1,
              "applicationMenusId":menuData.menuId,
              "globalCompanyMasterId":1,
              "readAccess": element.readAccess,
              "writeAccess":1,
              "modifyAccess":0,
              "deleteAccess":0
    
          })
          }
        
        });   
      }
    }

  }

  onSelectAllModifyCheckBox(event,menuData,accessName){
    if(event.checked){
      if(this.privilegeData.length > 0){
          
        this.privilegeData.forEach((element,index) => {
          if(menuData.menuId == element.applicationMenusId){
            let ind = index;
            this.privilegeData.splice(ind,1,{
              "userRoleId":1,
              "applicationMenusId":menuData.menuId,
              "globalCompanyMasterId":1,
              "readAccess": element.readAccess,
              "writeAccess":element.writeAccess,
              "modifyAccess":1,
              "deleteAccess":0
    
          })
          }else{
            this.privilegeData.push({
              "userRoleId":1,
              "applicationMenusId":menuData.menuId,
              "globalCompanyMasterId":1,
              "readAccess": element.readAccess,
              "writeAccess":element.writeAccess,
              "modifyAccess":0,
              "deleteAccess":0
    
          })
          }
        
        });   
      }
    }else{
      this.privilegeData.push({
        "userRoleId":1,
        "applicationMenusId":menuData.menuId,
        "globalCompanyMasterId":1,
        "readAccess": 0,
        "writeAccess":0,
        "modifyAccess":1,
        "deleteAccess":0

    })
    }

  } 

  onSelectAllDeleteCheckBox(event,menuData,accessName){
    if(event.checked){
      if(this.privilegeData.length > 0){
          
        this.privilegeData.forEach((element,index) => {
          if(menuData.menuId == element.applicationMenusId){
            let ind = index;
            this.privilegeData.splice(ind,1,{
              "userRoleId":1,
              "applicationMenusId":menuData.menuId,
              "globalCompanyMasterId":1,
              "readAccess": element.readAccess,
              "writeAccess":element.writeAccess,
              "modifyAccess":element.modifyAccess,
              "deleteAccess":1
    
          })
          }else{
            this.privilegeData.push({
              "userRoleId":1,
              "applicationMenusId":menuData.menuId,
              "globalCompanyMasterId":1,
              "readAccess": element.readAccess,
              "writeAccess":element.writeAccess,
              "modifyAccess":element.modifyAccess,
              "deleteAccess":1
    
          })
          }
        
        });   
      }
    }else{
      this.privilegeData.push({
        "userRoleId":1,
        "applicationMenusId":menuData.menuId,
        "globalCompanyMasterId":1,
        "readAccess": 0,
        "writeAccess":0,
        "modifyAccess":1,
        "deleteAccess":1

    })
   
    }
    console.log("privilegeData::",this.privilegeData)

  } 


  largepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
}
