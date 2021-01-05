import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class MenuListsService {
public menuDetails: Array<any> = [];
public allMenuDetails: Array<any> = [];
public listDetails: any
constructor(
  private router: Router
) {
  this.allMenuDetails = [
    {
    collapsed: false,
    icon: 'icon-rocket',
    name: 'Dashboard',
    routerlink: '/dashboard',
    },
    {
    collapsed: true,
    icon: 'icon-credit-card',
      name: 'PayRoll Master',
      subDetails: [
        {
          collapsed: true,
        icon: 'icon-credit-card',
          name: 'Investments',
          subDetails: [{
            name: '80C',
            routerlink: '/investment/80C-LIC',
          },
          {
            name: 'Chapter-6',
            routerlink: '/otherMaster/companyRegistrationDetails',
          },
          {
            name: 'others',
            routerlink: '/otherMaster/complianceHead',
          }]
        },
        {
          collapsed: true,
        icon: 'icon-credit-card',
          name: 'Reports',
          subDetails: [{
            name: '80C-LIC',
            routerlink: '/investment/80C-LIC',
          },
          {
            name: '80C-PPF',
            routerlink: '/otherMaster/companyRegistrationDetails',
          },
          {
            name: 'Compliance Head',
            routerlink: '/otherMaster/complianceHead',
          }]
        }
      ]
    },
    {
      collapsed: true,
      icon: 'icon-rocket',
        name: 'Company Settings',
        subDetails: [{
          name: 'Company Group Master',
          routerlink: '/otherMaster/companyGroupMaster',
        },
        {
          name: 'Company Registration Details',
          routerlink: '/otherMaster/companyRegistrationDetails',
        },
        {
          name: 'Compliance Head',
          routerlink: '/otherMaster/complianceHead',
        }],
      },
      {
        collapsed: true,
        icon: 'icon-rocket',
          name: 'Employee Master',
          subDetails: [{
            name: 'Personal Information',
            routerlink: '/employee-master/personal-information',
          },
          {
            name: 'Contact Information',
            routerlink: '/otherMaster/companyRegistrationDetails',
          },
          {
            name: 'Identity Information',
            routerlink: '/otherMaster/complianceHead',
          },
          {
            name: 'Employee Information',
            routerlink: '/employee-master/employment-information/employment-summary',
          }],
        },
  ];
   
  this.listDetails = {
  results: [
      {
          "rolePrivilegeMatrixId": 15,
          "applicationUserRoleDetails": {
              "applicationRoleId": 3,
              "companyGroupMasterId": 1,
              "globalCompanyMasterId": 1,
              "roleName": "HR Admin",
              "roleDiscription": "HR Admin",
              "isActive": 1,
              "createdBy": "MayurG",
              "createdDateTime": "08-Dec-2020",
              "lastModifiedBy": null,
              "lastModifiedDateTime": null
          },
          "accessibleMenuDetail": {
              "menuId": 5,
              "mainMenuName": "PayRoll Master",
              "subMenuOrFormName1": "Investments",
              "subMenuOrFormName2": "80C",
              "subMenuOrFormName3": "LIC",
              "subMenuOrFormName4": null,
              "subMenuOrFormName5": null,
              "subMenuOrFormName6": null,
              "subMenuOrFormName7": null,
              "subMenuOrFormName8": null,
              "subMenuOrFormName9": null,
              "subMenuOrFormName10": null,
              "description": "LIC form",
              "isActive": 1,
              "createdBy": "MayurG",
              "createdDateTime": "01-Jan-2020"
          },
          "readAccess": 1,
          "writeAccess": 1,
          "modifyAccess": 1,
          "deleteAccess": 1,
          "isActive": 1,
          "createdBy": "MayurG",
          "createdDateTime": 1577817000000,
          "lastModifiedBy": null,
          "lastModifiedDateTime": null
      },
      {
          "rolePrivilegeMatrixId": 16,
          "applicationUserRoleDetails": {
              "applicationRoleId": 3,
              "companyGroupMasterId": 1,
              "globalCompanyMasterId": 1,
              "roleName": "HR Admin",
              "roleDiscription": "HR Admin",
              "isActive": 1,
              "createdBy": "MayurG",
              "createdDateTime": "08-Dec-2020",
              "lastModifiedBy": null,
              "lastModifiedDateTime": null
          },
          "accessibleMenuDetail": {
              "menuId": 6,
              "mainMenuName": "PayRoll Master",
              "subMenuOrFormName1": "Investments",
              "subMenuOrFormName2": "80C",
              "subMenuOrFormName3": "PPF",
              "subMenuOrFormName4": null,
              "subMenuOrFormName5": null,
              "subMenuOrFormName6": null,
              "subMenuOrFormName7": null,
              "subMenuOrFormName8": null,
              "subMenuOrFormName9": null,
              "subMenuOrFormName10": null,
              "description": "PPF form",
              "isActive": 1,
              "createdBy": "MayurG",
              "createdDateTime": "01-Jan-2020"
          },
          "readAccess": 1,
          "writeAccess": 1,
          "modifyAccess": 0,
          "deleteAccess": 0,
          "isActive": 1,
          "createdBy": "MayurG",
          "createdDateTime": 1577817000000,
          "lastModifiedBy": null,
          "lastModifiedDateTime": null
      },
      {
          "rolePrivilegeMatrixId": 17,
          "applicationUserRoleDetails": {
              "applicationRoleId": 3,
              "companyGroupMasterId": 1,
              "globalCompanyMasterId": 1,
              "roleName": "HR Admin",
              "roleDiscription": "HR Admin",
              "isActive": 1,
              "createdBy": "MayurG",
              "createdDateTime": "08-Dec-2020",
              "lastModifiedBy": null,
              "lastModifiedDateTime": null
          },
          "accessibleMenuDetail": {
              "menuId": 7,
              "mainMenuName": "PayRoll Master",
              "subMenuOrFormName1": "Investments",
              "subMenuOrFormName2": "Chapter-6",
              "subMenuOrFormName3": null,
              "subMenuOrFormName4": null,
              "subMenuOrFormName5": null,
              "subMenuOrFormName6": null,
              "subMenuOrFormName7": null,
              "subMenuOrFormName8": null,
              "subMenuOrFormName9": null,
              "subMenuOrFormName10": null,
              "description": "Chapter-6 form",
              "isActive": 1,
              "createdBy": "MayurG",
              "createdDateTime": "01-Jan-2020"
          },
          "readAccess": 1,
          "writeAccess": 1,
          "modifyAccess": 1,
          "deleteAccess": 0,
          "isActive": 1,
          "createdBy": "MayurG",
          "createdDateTime": 1577817000000,
          "lastModifiedBy": null,
          "lastModifiedDateTime": null
      },
      
      {
          "rolePrivilegeMatrixId": 17,
          "applicationUserRoleDetails": {
              "applicationRoleId": 3,
              "companyGroupMasterId": 1,
              "globalCompanyMasterId": 1,
              "roleName": "HR Admin",
              "roleDiscription": "HR Admin",
              "isActive": 1,
              "createdBy": "MayurG",
              "createdDateTime": "08-Dec-2020",
              "lastModifiedBy": null,
              "lastModifiedDateTime": null
          },
          "accessibleMenuDetail": {
              "menuId": 7,
              "mainMenuName": "PayRoll Master",
              "subMenuOrFormName1": "Investments",
              "subMenuOrFormName2": null,
              "subMenuOrFormName3": null,
              "subMenuOrFormName4": null,
              "subMenuOrFormName5": null,
              "subMenuOrFormName6": null,
              "subMenuOrFormName7": null,
              "subMenuOrFormName8": null,
              "subMenuOrFormName9": null,
              "subMenuOrFormName10": null,
              "description": "Chapter-6 form",
              "isActive": 1,
              "createdBy": "MayurG",
              "createdDateTime": "01-Jan-2020"
          },
          "readAccess": 1,
          "writeAccess": 1,
          "modifyAccess": 1,
          "deleteAccess": 0,
          "isActive": 1,
          "createdBy": "MayurG",
          "createdDateTime": 1577817000000,
          "lastModifiedBy": null,
          "lastModifiedDateTime": null
      },
      {
          "rolePrivilegeMatrixId": 12,
          "applicationUserRoleDetails": {
              "applicationRoleId": 2,
              "companyGroupMasterId": 1,
              "globalCompanyMasterId": 1,
              "roleName": "Ordinary User",
              "roleDiscription": "Ordinary Employee",
              "isActive": 1,
              "createdBy": "MayurG",
              "createdDateTime": "08-Dec-2020",
              "lastModifiedBy": "",
              "lastModifiedDateTime": null
          },
          "accessibleMenuDetail": {
              "menuId": 1,
              "mainMenuName": "Employee Master",
              "subMenuOrFormName1": "Personal Information",
              "subMenuOrFormName2": null,
              "subMenuOrFormName3": null,
              "subMenuOrFormName4": null,
              "subMenuOrFormName5": null,
              "subMenuOrFormName6": null,
              "subMenuOrFormName7": null,
              "subMenuOrFormName8": null,
              "subMenuOrFormName9": null,
              "subMenuOrFormName10": null,
              "description": "Personan Info Form",
              "isActive": 1,
              "createdBy": "MayurG",
              "createdDateTime": "01-Jan-2020"
          },
          "readAccess": 1,
          "writeAccess": 1,
          "modifyAccess": 1,
          "deleteAccess": 1,
          "isActive": 1,
          "createdBy": "MayurG",
          "createdDateTime": 1577903400000,
          "lastModifiedBy": null,
          "lastModifiedDateTime": null
      },
      {
          "rolePrivilegeMatrixId": 12,
          "applicationUserRoleDetails": {
              "applicationRoleId": 2,
              "companyGroupMasterId": 1,
              "globalCompanyMasterId": 1,
              "roleName": "Ordinary User",
              "roleDiscription": "Ordinary Employee",
              "isActive": 1,
              "createdBy": "MayurG",
              "createdDateTime": "08-Dec-2020",
              "lastModifiedBy": "",
              "lastModifiedDateTime": null
          },
          "accessibleMenuDetail": {
              "menuId": 1,
              "mainMenuName": "Employee Master",
              "subMenuOrFormName1": "Contact Information",
              "subMenuOrFormName2": null,
              "subMenuOrFormName3": null,
              "subMenuOrFormName4": null,
              "subMenuOrFormName5": null,
              "subMenuOrFormName6": null,
              "subMenuOrFormName7": null,
              "subMenuOrFormName8": null,
              "subMenuOrFormName9": null,
              "subMenuOrFormName10": null,
              "description": "Personan Info Form",
              "isActive": 1,
              "createdBy": "MayurG",
              "createdDateTime": "01-Jan-2020"
          },
          "readAccess": 1,
          "writeAccess": 1,
          "modifyAccess": 1,
          "deleteAccess": 1,
          "isActive": 1,
          "createdBy": "MayurG",
          "createdDateTime": 1577903400000,
          "lastModifiedBy": null,
          "lastModifiedDateTime": null
      },
      {
          "rolePrivilegeMatrixId": 17,
          "applicationUserRoleDetails": {
              "applicationRoleId": 3,
              "companyGroupMasterId": 1,
              "globalCompanyMasterId": 1,
              "roleName": "HR Admin",
              "roleDiscription": "HR Admin",
              "isActive": 1,
              "createdBy": "MayurG",
              "createdDateTime": "08-Dec-2020",
              "lastModifiedBy": null,
              "lastModifiedDateTime": null
          },
          "accessibleMenuDetail": {
              "menuId": 7,
              "mainMenuName": "Employee Master",
              "subMenuOrFormName1": "Employee Information",
              "subMenuOrFormName2": null,
              "subMenuOrFormName3": null,
              "subMenuOrFormName4": null,
              "subMenuOrFormName5": null,
              "subMenuOrFormName6": null,
              "subMenuOrFormName7": null,
              "subMenuOrFormName8": null,
              "subMenuOrFormName9": null,
              "subMenuOrFormName10": null,
              "description": "Chapter-6 form",
              "isActive": 1,
              "createdBy": "MayurG",
              "createdDateTime": "01-Jan-2020"
          },
          "readAccess": 1,
          "writeAccess": 1,
          "modifyAccess": 1,
          "deleteAccess": 0,
          "isActive": 1,
          "createdBy": "MayurG",
          "createdDateTime": 1577817000000,
          "lastModifiedBy": null,
          "lastModifiedDateTime": null
      }
  ]
}

    
}

getMenuLists(){
  
  for (let a =0; a<this.listDetails.results.length;a++) {
    for (let b=0;b<this.allMenuDetails.length;b++){
      let result = this.listDetails.results[a].accessibleMenuDetail;
      if(this.allMenuDetails[b].name===result.mainMenuName){
        // console.log(result.mainMenuName) payroll;
        for(let c=0; c< this.allMenuDetails[b].subDetails.length; c++){
          if (this.allMenuDetails[b].subDetails[c].name=== result.subMenuOrFormName1){
         // console.log(result.subMenuOrFormName1) investment;
        if (this.allMenuDetails[b].subDetails[c].subDetails){
          for (let d = 0; d< this.allMenuDetails[b].subDetails[c].subDetails.length; d++){
                if (this.allMenuDetails[b].subDetails[c].subDetails[d].name === result.subMenuOrFormName2){
                  // console.log(result.mainMenuName,'--',
                  // result.subMenuOrFormName1,'--',
                  // result.subMenuOrFormName2)
                  if (this.menuDetails.length){
                    // if (this.menuDetails.find(x => x.name == result.mainMenuName)){
                    //   let parent = this.menuDetails.findIndex(x => x.name === result.mainMenuName);
                    //   if(this.menuDetails[parent].subDetails.find(x => x.name == result.subMenuOrFormName1)){
                    //     let child = this.menuDetails[parent].subDetails.findIndex(x => x.name === result.subMenuOrFormName1);
                    //     if(!this.menuDetails[parent].subDetails[child].subDetails.find(x => x.name == result.subMenuOrFormName1)) {
                    //       this.menuDetails[parent].subDetails[child].subDetails.push({
                    //         name: this.allMenuDetails[b].subDetails[c].subDetails[d].name,
                    //         routerlink: this.allMenuDetails[b].subDetails[c].subDetails[d].routerlink
                    //       })
                    //     }
                    //   }
                      
                    // } else{
                    //   this.menuDetails.push({
                    //         collapsed: true,
                    //         icon: this.allMenuDetails[b].icon,
                    //         name: this.allMenuDetails[b].name, //payroll
                    //         subDetails: [{
                    //           collapsed: true,
                    //           name: this.allMenuDetails[b].subDetails[c].name, //investment
                    //           subDetails: [{
                    //             name: this.allMenuDetails[b].subDetails[c].subDetails[d].name,
                    //             routerlink: this.allMenuDetails[b].subDetails[c].subDetails[d].routerlink
                    //           }]
                    //         }]
                    //       })
                    // }
                    for(let i=0; i<this.menuDetails.length;i++){ 
                      if(this.menuDetails[i].name === result.mainMenuName){ //payroll

                        for(let j = 0; j< this.menuDetails[i].subDetails.length;j++){ 
                          if (this.menuDetails[i].subDetails[j].name ===result.subMenuOrFormName1){ //investment
                            if(!this.menuDetails[i].subDetails[j].subDetails.find(x => x.name == result.subMenuOrFormName2)){
                              this.menuDetails[i].subDetails[j].subDetails.push({
                                     name: this.allMenuDetails[b].subDetails[c].subDetails[d].name,
                                     routerlink: this.allMenuDetails[b].subDetails[c].subDetails[d].routerlink
                                   })
                            }
                          }
                        }
                      } 
                      else{
                        this.menuDetails.push({
                          collapsed: true,
                          icon: this.allMenuDetails[b].icon,
                          name: this.allMenuDetails[b].name, //payroll
                          subDetails: [{
                            collapsed: true,
                            name: this.allMenuDetails[b].subDetails[c].name, //investment
                            subDetails: [{
                              name: this.allMenuDetails[b].subDetails[c].subDetails[d].name,
                              routerlink: this.allMenuDetails[b].subDetails[c].subDetails[d].routerlink
                            }]
                          }]
                        })
                      }
                    }
                  } else{
                    this.menuDetails.push({
                      collapsed: true,
                      icon: this.allMenuDetails[b].icon,
                      name: this.allMenuDetails[b].name, //payroll
                      subDetails: [{
                        collapsed: true,
                        name: this.allMenuDetails[b].subDetails[c].name, //investment
                        subDetails: [{
                          name: this.allMenuDetails[b].subDetails[c].subDetails[d].name,
                          routerlink: this.allMenuDetails[b].subDetails[c].subDetails[d].routerlink
                        }]
                      }]
                    })
                    console.log('1st time',this.menuDetails)
                  }
                }
              }
        }
        else
          if (this.menuDetails.length){
              if (!this.menuDetails.find(x => x.name == result.mainMenuName)){
                this.menuDetails.push({
                  collapsed:true,
                  icon: this.allMenuDetails[b].icon,
                  name: this.allMenuDetails[b].name,
                  subDetails: [{
                          name: this.allMenuDetails[b].subDetails[c].name,
                          routerlink: this.allMenuDetails[b].subDetails[c].routerlink,
                    }]
            })
              } else {
                let index = this.menuDetails.findIndex(x => x.name === result.mainMenuName);
                this.menuDetails[index].subDetails.push({
                   name: this.allMenuDetails[b].subDetails[c].name,
                  routerlink: this.allMenuDetails[b].subDetails[c].routerlink,
                })
                // this.menuDetails[i].subDetails.push({
                //   name: this.allMenuDetails[b].subDetails[c].name,
                //   routerlink: this.allMenuDetails[b].subDetails[c].routerlink,
                // })
              }
          
        }
          else{
            this.menuDetails.push({
              collapsed:true,
              icon: this.allMenuDetails[b].name,
              subDetails: [{
                name: this.allMenuDetails[b].subDetails[c].name,
                routerlink: this.allMenuDetails[b].subDetails[c].routerlink,
              }]
            })
          }
          console.log(result.mainMenuName,'--',
                  result.subMenuOrFormName1,'--',
                  result.subMenuOrFormName2)
        
          }
        }
      }
    }
    console.log('end of cycle', a)
  }
  console.log('End Result', this.menuDetails);
  return this.menuDetails;
}

getMenuUrl() {
  let menuURl = [];
  menuURl.unshift('/dashboard')
  for (let a =0; a<this.listDetails.results.length;a++) {
    for (let b=0;b<this.allMenuDetails.length;b++){
      let result = this.listDetails.results[a].accessibleMenuDetail;
      if(this.allMenuDetails[b].name===result.mainMenuName){{
         // console.log(result.mainMenuName) payroll;
         for(let c=0; c< this.allMenuDetails[b].subDetails.length; c++){
          if (this.allMenuDetails[b].subDetails[c].name=== result.subMenuOrFormName1){
         // console.log(result.subMenuOrFormName1) investment;
         if (this.allMenuDetails[b].subDetails[c].subDetails){
          for (let d = 0; d< this.allMenuDetails[b].subDetails[c].subDetails.length; d++){
                if (this.allMenuDetails[b].subDetails[c].subDetails[d].name === result.subMenuOrFormName2){
                menuURl.push(this.allMenuDetails[b].subDetails[c].subDetails[d].routerlink)
                }}
              } else{
                menuURl.push(this.allMenuDetails[b].subDetails[c].routerlink)
              }

        }}
      }}

    }}
    if ((this.router.url).includes(menuURl[6])) {
      console.log('saadasdad')
    }
    else{
     // this.router.navigate(['dashboard']);
    }

    
    console.log(menuURl)
    return menuURl;
}

}
