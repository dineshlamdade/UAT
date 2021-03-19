import { Component, HostListener, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolePrivilegeService } from './role-privilege.service';

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

  registerForm: FormGroup;
    submitted = false;

  public modalRef: BsModalRef;
  public windowScrolled: boolean;
  dropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  users1: User1[];
  users2: User2[];
  data: data[];
  groupNamesData: any;
  userGroupNames: any;
  userGroupNameList: any;
  userRoleNameList: any;
  companyNameList: any;
  menuAllMasterData: any[];
  menuSummaryData: any;

  constructor(private modalService: BsModalService,
    private formBuilder: FormBuilder, private service:RolePrivilegeService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      employeeRoleAssignmentId: new FormControl(''),
      globalUserMasterId: new FormControl(''),
      companyGroupMasterId: new FormControl(''),
      globalCompanyMasterId: new FormControl(''),
      userRoleId: new FormControl(''),
      userGroupId: new FormControl(''),
      companyId: new FormControl(''),
      companyGroupName: new FormControl(''),
      companyName: new FormControl(''),
      remark: new FormControl(''),
      isActive: new FormControl(''),
      createdBy: new FormControl(''),
      createdDateTime: new FormControl(''),
      lastModifiedBy: new FormControl(''),
      lastModifiedDateTime: new FormControl(''),
      })
  

    this.users1 = [{ full: 'false', read: 'true',write:'true',modify:'true', delete:'true '},];
    this.users2 = [{ enabledisabled: 'false'},];
    this.data = [ { srno: '1',company:'Abbott', usergrup: 'HR_Admin',userrole:'HR_Operation',userrole1:'HR_Manager' },
      { srno: '2',company:'Abbott', usergrup: 'Account_Admin',userrole:'Account_Operation',userrole1:'' },
      { srno: '3',company:'Abbott', usergrup: 'IT_Admin',userrole:'IT_Operation',userrole1:'' }];

      this.selectedItems = [];
      this.dropdownSettings = { };
       this.dropdownList= [];

//this.onloadSubmit();

 this.getGroupName()
 this.getUserGroupName()
 this.getRoleName()
 this.getCompanyName()
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
        console.log('menuAllMasterData::', res);
       this.menuAllMasterData = res.data.results;
      }) ;
     }

     getRolePrivilegeSummaryByUserRoleId(){
      this.menuSummaryData = []; 
      this.service.getUserRolePrivilegesByUserRoleId().subscribe((res) => {
        console.log('menuSummaryData::', res);
       this.menuSummaryData = res.data.results;
      }) ;
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
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  largepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
}
