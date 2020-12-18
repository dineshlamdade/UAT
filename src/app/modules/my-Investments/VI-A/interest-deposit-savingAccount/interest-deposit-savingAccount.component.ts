import { filter } from 'rxjs/operators';
import { Component, HostListener, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-interest-deposit-savingAccount',
  templateUrl: './interest-deposit-savingAccount.component.html',
  styleUrls: ['./interest-deposit-savingAccount.component.scss']
})
export class InterestDepositSavingAccountComponent implements OnInit {

  public tabIndex = 0;
  public windowScrolled: boolean;
  public data: any;

  constructor() {}

  ngOnInit(): void {
    const data =[
      {
          "rolePrivilegeMatrixId": 1,
          "applicationRolesId": 2,
          "companyGroupMasterId": 1,
          "globalCompanyMasterId": 1,
          "roleName": "Ordinary User",
          "roleDiscription": "Ordinary Employee",
          "menuId": 4,
          parentMenuId: 1,
          menuDisplayName: "Personal Information",
          "discription": "Employee Personl Info Form",
          "isMenuActive": 1,
          "readAccess": 1,
          "writeAccess": 1,
          "modifyAccess": 1,
          "deleteAccess": 1,
          "isActive": 1,
          "createdBy": "MayurG",
          "createdDateTime": 1607365800000,
          "lastModifiedBy": null,
          "lastModifiedDateTime": null
      },
      {
          "rolePrivilegeMatrixId": 2,
          "applicationRolesId": 2,
          "companyGroupMasterId": 1,
          "globalCompanyMasterId": 1,
          "roleName": "Ordinary User",
          "roleDiscription": "Ordinary Employee",
          "menuId": 6,
          parentMenuId: 1,
          menuDisplayName: "Contact Information",
          "discription": "Employee Contact Information",
          "isMenuActive": 1,
          "readAccess": 1,
          "writeAccess": 1,
          "modifyAccess": 1,
          "deleteAccess": 1,
          "isActive": 1,
          "createdBy": "MayurG",
          "createdDateTime": 1607365800000,
          "lastModifiedBy": null,
          "lastModifiedDateTime": null
      },
      {
          "rolePrivilegeMatrixId": 3,
          "applicationRolesId": 2,
          "companyGroupMasterId": 1,
          "globalCompanyMasterId": 1,
          "roleName": "Ordinary User",
          "roleDiscription": "Ordinary Employee",
          "menuId": 7,
          parentMenuId: 1,
          menuDisplayName: "Identity Information",
          "discription": "Employee Identity Form",
          "isMenuActive": 1,
          "readAccess": 1,
          "writeAccess": 1,
          "modifyAccess": 1,
          "deleteAccess": 1,
          "isActive": 1,
          "createdBy": "MayurG",
          "createdDateTime": 1607365800000,
          "lastModifiedBy": null,
          "lastModifiedDateTime": null
      },
      {
          "rolePrivilegeMatrixId": 4,
          "applicationRolesId": 2,
          "companyGroupMasterId": 1,
          "globalCompanyMasterId": 1,
          "roleName": "Ordinary User",
          "roleDiscription": "Ordinary Employee",
          "menuId": 8,
          parentMenuId: 2,
          menuDisplayName: "Company Registration Details",
          "discription": "Employeement Information\r\n",
          "isMenuActive": 1,
          "readAccess": 1,
          "writeAccess": 0,
          "modifyAccess": 0,
          "deleteAccess": 0,
          "isActive": 1,
          "createdBy": "MayurG",
          "createdDateTime": 1607365800000,
          "lastModifiedBy": null,
          "lastModifiedDateTime": null
      }
  ]
  const menuDetails = [
    // {
    // collapsed: false,
    // icon: 'icon-rocket',
    // name: 'Dashboard',
    // routerlink: '/dashboard',
    // },
    {
    collapsed: true,
    icon: 'icon-credit-card',
    name: 'Investment',
    subDetails: [
      {
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
      }],
    },
    {
      collapsed: true,
      icon: 'icon-rocket',
        name: 'Other Master',
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
  ];
  console.log(data[0].menuDisplayName)
  data.forEach(element => {
    if (element.parentMenuId > 0) {
      menuDetails.forEach(menuDetail => {
        menuDetail.subDetails.forEach( subdetails=> {
          if (element.menuDisplayName === subdetails.name) {
            console.log(subdetails.name)
            
          }
          else{
            console.log(0)
          }
        })
      });
     

    }
  });
  }

  changeTabIndexForRedirect(event: any) {
    this.tabIndex = event.tabIndex;
    this.data = event;
    console.log('data::', this.data);
  }

  changeTabIndex(index: number) {
    if (index !== 2) {
      this.data = undefined;
    }
    this.tabIndex = index;
  }

  public modalRef: BsModalRef;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      let currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }
}
