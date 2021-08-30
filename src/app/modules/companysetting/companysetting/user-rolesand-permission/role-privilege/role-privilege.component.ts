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
        console.log('menuAllMasterData::', res);
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
