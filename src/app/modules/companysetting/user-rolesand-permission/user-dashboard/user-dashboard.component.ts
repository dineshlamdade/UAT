import { Component, OnInit, HostListener, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Table } from 'primeng/table';
import { UserDashboardService } from './user-dashboard.service';
import { AlertServiceService } from '../../../../core/services/alert-service.service'
import { AuthService } from 'src/app/modules/auth/auth.service';
import { element } from 'protractor';
import { ExcelserviceService } from '../excel_service/excelservice.service';
import { ElementSchemaRegistry } from '@angular/compiler';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  public summaryGridData: Array<any> = [];
  public summaryGridData2: Array<any> = [];
  userDashBoardForm: FormGroup;
  submitted = false;


  dropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  GroupCompany: any[];
  selectedGroupCompany: string;
  Company: any[];
  selectedCompany: string;

  public modalRef: BsModalRef;
  public windowScrolled: boolean;
  @ViewChild('dt') table: Table;
  // userGroupName: any;
  groupNamesData: any = [];
  userGroupNameList: any;
  userRoleNameList: any = [];
  companyNameList: any = [];
  userGroupList: any = [];
  userRoleData: any = [];
  editFlag: any;
  globalAddRowIndex: number;

  userGroupName: Array<any> = [];
  groupNameList: any;
  summarydata: any;
  totalUsersCount: any = 0;
  activeUserCount: number = 0;
  inactiveUserCount: number = 0;
  lockUserCount: number = 0;
  userGroupNameL: any = 0;
  userRoleName: number = 0;
  row = [];
  employeeCodeList: any;
  employeeNameList: any;
  employeeCode: any;
  userName: any;
  userData: any;
  subId: any;
  companyGroupMasterId: any;
  globalUserMasterId: any;
  globalCompanyMasterId: any;
  userRoleId: any;
  companyName: any;
  roleName: any;
  groupName: any;
  userNameList: any = [];
  companyNameListByUser: any;
  groupNameListByCompany: any;
  userRoleByUserGroup: any;

  numberFormat: any;
  assginUserDetails: any;
  userGroupdList: any;
  userGroupLists: any;
  employeeDataByGroupId: any = [];
  employeeDataById: any = [];
  selectedUsrGroupId: any;
  assignCompanyName: any=[];
  selectedCompanyName: any;
  userGroupData: any[];
  employeeMasterId: any;
  saveAssignData: any = [];
  asignRoleSummary: any;
  loading: boolean = true;

  page: any=1;
  size: any=10;
  selectedUserGroupId: any;
  
  employeeUserDetails: any;
  emailId: any;
  empcheck: any;
  companySelectedIndex: any;
  groupSelectedIndex: any;
  companyGroupName: any;
  saveAssignDatabyEmployee: any=[];
  selectedGroupIndex: any;
  selectedroleindex: any;
  butDisabled: string;
  employeeRoleAssignmentId: any;
  excelData: any[];
  header: any[];
  totalPages: any;
  groupid: any;
  compnyid: any;
  roleid: any;
  userGroupId: any;
  compnayGlobalSelectId: any = null;
  // butDisabled: boolean = true;

  // userDashBoardForm: any;

  constructor(private modalService: BsModalService, private service: UserDashboardService,
    private formBuilder: FormBuilder, private alertService: AlertServiceService,
     private authService: AuthService, private excelservice : ExcelserviceService) {

    this.userData = this.authService.getprivileges()
    console.log("userData::", this.userData);
    this.subId = this.userData.sub

    this.companyGroupMasterId = []
    this.service.employeeRoleAssignmentUser(this.subId).subscribe(res => {
      res.data.results.forEach(element => {
       // this.companyGroupMasterId.push(element.companyGroupMasterId)  //111 1 112
      });
      // alert(this.companyGroupMasterId)
      this.globalCompanyMasterId = res.data.results[0].globalUserMasterId

      this.getSummaryDataByCompany()
     // this.summaryData();

      // this.getAllUserGroup();
      this.getGroupName();
        this.getCompanyUserGroup();
        this.employeeDetailsSummary();
    // this.getCopyFormUserList();

    })

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
  largepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  get f() {
    return this.userDashBoardForm.controls;
  }

  ngOnInit(): void {
   
    
    this.userDashBoardForm = this.formBuilder.group({
      employeeRoleAssignmentId: new FormControl(''),
      globalUserMasterId: new FormControl(''),
      companyGroupMasterId: new FormControl(''),
      globalCompanyMasterId: new FormControl(''),
      userRoleId: new FormControl(''),
      applicationMenusId: new FormControl(''),
      userGroupId: new FormControl(''),
      // companyId: new FormControl(''),
      companyGroupName: new FormControl(''),
      groupName: new FormControl(''),
      companyName: new FormControl(''),
      remark: new FormControl(''),
      rolePrivilegeMatrixId: new FormControl(''),
      isActive: new FormControl(''),
      userName: new FormControl(''),
      roleName: new FormControl(''),



    })
    this.selectedItems = [];
    this.dropdownSettings = {};
    this.dropdownList = [];

    this.loading = false;
   // this.getSummaryDataByCompany()

  }
  // getSummaryDataByCompany(){

  //      this.service.getAllEmployeeRoleAssignment(this.page,this.size).subscribe((res) =>{
  //       this.summarydata = res.data.results[0].content;
  //       console.log(this.summarydata)
  //       this.service.getEmployeeMasterCode().subscribe( res =>{
  //         let empData = res.data.results;
  //         this.summarydata.forEach(element => {
  //                empData.forEach(ele => {
  //                   if(element.employeeMasterId == ele.employeeMasterId){
  //                   element.employeeCode = ele.employeeCode
  //               }
  //             });
  //       })  
  //     });

  //     this.service.employeeRoleAssignmentDashboard(this.subId).subscribe(res =>{
  //       this.totalUsersCount = res.data.results[0].totalUsers
  //       this.activeUserCount = res.data.results[0].activeUsers
  //       this.lockUserCount = res.data.results[0].lockedUsers
  //       this.userGroupNameL =res.data.results[0].userGroups
  //       this.userRoleName = res.data.results[0].userRoles
  //       this.inactiveUserCount = res.data.results[0].deActiveUsers
  //     })
  //      let activeUser = [];
  //       let lockUser = [];
  //       let userGroupNameL = [];
  //       let userRoleName = [];
    
  //       this.summarydata.forEach(element => {
  //         // this.userNameList.push({
  //         //   'userName': element.userName
  //         // })
  //         if (element.userIsActive == true) {
  //           activeUser.push(element)
  //         }
  //         if (element.lockUser == true) {
  //           lockUser.push(element)
  //         }
  //         if (element.userGroupId != '') {
  //           userGroupNameL.push(element)
  //         }
  //         if (element.userRoleId != '') {
  //           userRoleName.push(element)
  //         }
  //       });
      
  //       console.log("summarydata", this.summarydata);
  //     })
    
  // }
  getSummaryDataByCompany(){

    this.service.getAllEmployeeRoleAssignment(this.page,this.size).subscribe((res) =>{
     this.summarydata = res.data.results[0].content;
     console.log(this.summarydata)
     this.service.getEmployeeMasterCode().subscribe( res =>{
       let empData = res.data.results;
       this.summarydata.forEach(element => {
              empData.forEach(ele => {
                 if(element.employeeMasterId == ele.employeeMasterId){
                 element.employeeCode = ele.employeeCode
             }
           });
     })  
   });

   this.totalPages = res.data.results[0].totalElements
  
   this.service.employeeRoleAssignmentDashboard(this.subId).subscribe(res =>{
     this.totalUsersCount = res.data.results[0].totalUsers
     this.activeUserCount = res.data.results[0].activeUsers
     this.lockUserCount = res.data.results[0].lockedUsers
     this.userGroupNameL =res.data.results[0].userGroups
     this.userRoleName = res.data.results[0].userRoles
     this.inactiveUserCount = res.data.results[0].deActiveUsers
   })
    let activeUser = [];
     let lockUser = [];
     let userGroupNameL = [];
     let userRoleName = [];
 
     this.summarydata.forEach(element => {
       // this.userNameList.push({
       //   'userName': element.userName
       // })
       if (element.userIsActive == true) {
         activeUser.push(element)
       }
       if (element.lockUser == true) {
         lockUser.push(element)
       }
       if (element.userGroupId != '') {
         userGroupNameL.push(element)
       }
       if (element.userRoleId != '') {
         userRoleName.push(element)
       }
     });
   
     console.log("summarydata", this.summarydata);
   })
 
}



// paginate(event) {
//     console.log(JSON.stringify(event));
    
//     //event.first: Index of first record being displayed 
//     //event.rows: Number of rows to display in new page 
//     //event.page: Index of the new page 
//     //event.pageCount: Total number of pages 
    
//    let pageIndex = event.first/event.rows + 1 // Index of the new page if event.page not defined.
    
//   this.page = pageIndex;
//   this.size = event.rows;
//   this.getSummaryDataByCompany()
   
//   }

  getGroupName() {
    this.service.employeeRoleAssignmentUser(this.subId).subscribe((res) => {
     this.groupNamesData = res.data.results;
    });
  }

  getCompanyUserGroup(){
    this.service.employeeRoleAssignmentUser(this.subId).subscribe((res) => {
      this.assignCompanyName = res.data.results;
      console.log(this.assignCompanyName)
     });
   }

  getUesrGroupName(comapnyGroupMasterId) {
    this.userGroupData = []
       this.service.getUserGroupName(comapnyGroupMasterId).subscribe((res) => {
        this.userGroupData = res.data.results;
      });
  }

  getUserRole(comapnyGroupMasterId) {
    this.userRoleData = []
    this.service.getByUserRole(comapnyGroupMasterId).subscribe((res)=>{
      this.userRoleNameList = res.data.results;
    })
  }

  // getCopyFormUserList(){
  //   this.service.getAllEmployeeRoleAssignmentByCompanyId(this.companyGroupMasterId).subscribe(res =>{
  //     this.userNameList= res.data.results;
  //   })
  // }

//////////////----------Add Row-----------------

  addTable() {
    let group = ''
    let role = ''
    this.userGroupData.forEach(ele =>{
      if(ele.userGroupId == this.groupName){
         group = ele.groupName
      }
    })
    this.userRoleData.forEach(ele => {
      if(ele.userRoleId==this.roleName){
        role = ele.roleName
      }
    });
    const obj = {

      employeeCode: this.employeeCode,
      employeeMasterId: this.employeeMasterId,
       // employeeRoleAssignmentId:this.employeeRoleAssignmentId,
      userName: this.userName,
      companyName: this.companyName,
      roleName: role,
      groupName: group,
      //globalUserMasterId:this.globalUserMasterId
    };
     this.row.push(obj);

     console.log(JSON.stringify(this.companyGroupMasterId))
       this.saveAssignData.push({
        globalUserMasterId: this.globalUserMasterId,
        // employeeRoleAssignmentId:this.employeeRoleAssignmentId,
        companyGroupMasterId: this.companyGroupMasterId,
        globalCompanyMasterId: this.companyName,
        userRoleId: this.roleName,
    })
    this.groupName=''
    this.companyName=''
    this.roleName=''
    this.editFlag = true;
    // console.log(JSON.stringify(this.saveAssignData))
    
  }

  deleteRows(employeeRoleAssignmentId,i) {
    console.log(employeeRoleAssignmentId);
    if(employeeRoleAssignmentId != undefined ){
      this.service.deleteAssignmentRoleId(employeeRoleAssignmentId).subscribe(() => {
        this.alertService.sweetalertMasterSuccess('employee Role Assignment  Deleted successfully', '');
        this.row.splice(i, 1);
        this.saveAssignData.splice(i,1)
      })
    }
    else{
      this.row.splice(i, 1);
      this.saveAssignData.splice(i,1)
    }
    
   
  }
  deleteSingleRow(x) {
    this.saveAssignDatabyEmployee.splice(x, 1);
    this.saveAssignData.splice(x,1)
  }
  

 
  ////////////-------select------checkBox--Selection-------------

  onSelectAssginData(event: any, row: any ) {
     if(event.checked){
    
    this.groupName = null;
    this.companyName = null;
    this.roleName = null;
    // this.employeeCode = row.employeeCode;
    //  this.userName = row.userName;
     this.globalUserMasterId = row.globalUserMasterId
     this.saveAssignDatabyEmployee.push({
      'employeeCode':row.employeeCode,
      'userName':row.userName,
      'globalUserMasterId':row.globalUserMasterId,
      'employeeRoleAssignmentId':row.employeeRoleAssignmentId,
      'companyName': '',
      'roleName': '',
      'groupName': 'element.groupName'
     })
console.log("Row Data is: "+ JSON.stringify(this.row))
     }else{
      this.saveAssignDatabyEmployee.forEach((element,index) => {
        if(element.globalUserMasterId == row.globalUserMasterId)
        {
          let i = index;
          this.saveAssignDatabyEmployee.splice(i,1)
        }
      });
      this.groupName = "";
      this.companyName = "";
      this.roleName = "";
      this.employeeCode = '';
      this.userName = '';
    }


  }
  resetAssignData(){
      this.row =[]
     this.empcheck = false;
     this.companyGroupName = null;
     this.companyName = "";
     this.groupName="";
     this.roleName = ""
    // this.employeeCode = '';
    //  this.userName = '';
     this.saveAssignData = []    
//  this.saveAssignDatabyEmployee=[]
   
  }

  unCheckUserAsgin(event: any){
     this.row =[]
    this.empcheck = false;
    this.companyGroupName = null;
    this.companyName = "";
    this.groupName="";
    this.roleName = ""
    this.employeeCode = '';
    this.userName = '';
    this.saveAssignData = []    
   this.saveAssignDatabyEmployee=[]
  }

///////-----------saveAssignGroupData--------------------

saveAssignGroupData(formDirective: FormGroupDirective): void {
  this.submitted = true;
  console.log('value', this.row);
  if (this.userDashBoardForm.invalid) {
    return;
  }
  //else {
  const assginUserDetails = this.userDashBoardForm.getRawValue();
   assginUserDetails.globalCompanyMasterId = assginUserDetails.companyName.toString().replace(',', '');
    console.log('Fixed Deposite Data::', this.saveAssignData);
    this.service.addUserRoleWithCompany(this.saveAssignData).subscribe((res) => {
    console.log("before save", res);
    this.alertService.sweetalertMasterSuccess("Assgin User role data save successfully","");
    this.saveAssignData = []
    this.row =[]
  this.empcheck = false;
  this.companyGroupName = null;
  this.companyName = "";
  this.groupName="";
  this.roleName = ""
  this.employeeCode = '';
  this.userName = '';
  this.saveAssignDatabyEmployee=[]
  
   //this.getSummaryDataByCompany() 
 });
}

////------  update userDashbord roles--------

updateUserdashBoradRoles()
{
this.service.updateAssignmentUserRoleWithEmployee(this.saveAssignData).subscribe(res =>
  {
    this.saveAssignData = res.data.results;
  })
}

///////----AssignedGroup--Tab----------------

  AssignedGroup(template1: TemplateRef<any>, eCode, eName) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    let data = {
      "employeeCode": eCode,
      "employeeName": eName,
     }
  } 
///////////////---------AssignRoleAndUserGroup----------------------

  AssignRoleAndUserGroup(template:TemplateRef<any>,globalUserMasterId)
  {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.editFlag = true;

    // this.employeeCode= summarydata.employeeCode
    // this.userName = summarydata.userName
    // this.emailId = summarydata.emailId
    
   this.service.employeeRoleAssignmentUser(globalUserMasterId).subscribe((res) => {
    this.asignRoleSummary = res.data.results;
      res.data.results.forEach(element => {
        this.employeeCode = element.employeeCode;
        this.userName = element.userName;
        this.emailId = element.emailId;
        
       });
      })
     
  }

  //////////-----------------editRoleUsers----------------

  editRoleUsers(template1:TemplateRef<any>,summarydata,globalUserMasterId) {
    this.butDisabled = "";
    {
      this.modalRef = this.modalService.show(
        template1,
        Object.assign({}, { class: 'gray modal-lg' })
      );

    this.editFlag = true;
   
   this.service.employeeRoleAssignmentUser(globalUserMasterId).subscribe(res =>{
    this.saveAssignDatabyEmployee.push({
      'userName': summarydata.userName,
      'employeeCode':summarydata.employeeCode,
      'globalUserMasterId':globalUserMasterId,
      'employeeRoleAssignmentId':summarydata.employeeRoleAssignmentId
    })

    this.saveAssignDatabyEmployee.forEach(emp => {
      res.data.results.forEach(element => {
        this.row.push({
          employeeCode: emp.employeeCode,
                userName: emp.userName,
                globalUserMasterId : emp.globalUserMasterId,
                employeeRoleAssignmentId:emp.employeeRoleAssignmentId,
                companyName: element.companyGroupMasterId,
                roleName: element.roleName,
                groupName: element.groupName
        })
    
        this.saveAssignData.push({
         
          globalUserMasterId: emp.globalUserMasterId,
          companyGroupMasterId: element.companyGroupMasterId.toString(),
          globalCompanyMasterId: element.globalCompanyMasterId.toString(),
          userRoleId: element.userRoleId.toString(),
      })
      })
    })
     
   })
      }
  }

  /////-----------viewSummary-------------------------
viewSummary(template1:TemplateRef<any>,summarydata,globalUserMasterId) {
    this.editFlag = false;
    this.butDisabled = "disabled";
   // this.showButtonSaveAndReset = false;
    {
      this.modalRef = this.modalService.show(
        template1,
        Object.assign({}, { class: 'gray modal-lg' })
      );

  //  this.editFlag = true;
  
  //  this.editFlag.disable();

   
    this.service.employeeRoleAssignmentUser(globalUserMasterId).subscribe(res =>{
      this.saveAssignDatabyEmployee.push({
        'userName': summarydata.userName,
        'employeeCode':summarydata.employeeCode,
        'globalUserMasterId':globalUserMasterId
      })
  
      this.saveAssignDatabyEmployee.forEach(emp => {
        res.data.results.forEach(element => {
          this.row.push({
            employeeCode: emp.employeeCode,
                  userName: emp.userName,
                  globalUserMasterId : emp.globalUserMasterId,
                  companyName: element.companyGroupMasterId,
                  roleName: element.roleName,
                  groupName: element.groupName
          })
      
          this.saveAssignData.push({
            globalUserMasterId: emp.globalUserMasterId,
            companyGroupMasterId: element.companyGroupMasterId.toString(),
            globalCompanyMasterId: element.globalCompanyMasterId.toString(),
            userRoleId: element.userRoleId.toString(),
        })
        })
      })
       
     })
      }
  }
  resetForm() {
    this.userDashBoardForm.enable();
    this.userDashBoardForm.reset();
    this.companyNameList = null
    this.userGroupNameList = null
    this.userDashBoardForm.patchValue( {
      userName: '',
     companyGroupName : ''

    } );

  }


 
  /** on selection comapny group name fetched comapny list and group list */
  onSelectCompanyName(companyGroupMasterId) {
    this.companyGroupMasterId = companyGroupMasterId
    this.companyNameList = []
    this.companyName = null
     this.groupNamesData
      .forEach(element => {
        if (companyGroupMasterId == element.companyGroupMasterId) {
          this.companyNameList.push(
            {
              'globalCompanyMasterId': element.globalCompanyMasterId,
              'companyName': element.companyName
            })
        }
      });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'globalCompanyMasterId',
      textField: 'companyName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    }

    this.service.getAllEmployeeRoleAssignmentBycompanyGroupId(companyGroupMasterId).subscribe(res =>{
    this.summarydata = res.data.results;
    this.service.getEmployeeMasterCode().subscribe( res =>{
      let empData = res.data.results;
      this.summarydata.forEach(element => {
          
          empData.forEach(ele => {
            if(element.employeeMasterId == ele.employeeMasterId){
              element.employeeCode = ele.employeeCode
            }
          });
    })  
  });


  
    this.service.countCompanyGroup(this.subId,this.companyGroupMasterId).subscribe(res =>{
      console.log(res.data)
        this.totalUsersCount = res.data.results[0].totalUsers
        this.activeUserCount = res.data.results[0].activeUsers
        this.lockUserCount = res.data.results[0].lockedUsers
        this.userGroupNameL =res.data.results[0].userGroups
        this.userRoleName = res.data.results[0].userRoles
        this.inactiveUserCount = res.data.results[0].deActiveUsers
    })
    
    let activeUser = [];
    let lockUser = [];
    let userGroupNameL = [];
    let userRoleName = [];

    this.summarydata.forEach(element => {
      // this.userNameList.push({
      //   'userName': element.userName
      // })
      if (element.userIsActive == true) {
        activeUser.push(element)
      }
      if (element.lockUser == true) {
        lockUser.push(element)
      }
      if (element.userGroupId != '') {
        userGroupNameL.push(element)
      }
      if (element.userRoleId != '') {
        userRoleName.push(element)
      }
    });
   
    console.log("summaryGridData2", this.summarydata);
  })


    //console.log(this.companyNameList)
    this.service.getUserGroupName(this.companyGroupMasterId).subscribe(res => {
      this.userGroupNameList = res.data.results;
    })
  }

  onItemSelect(item){
  item.globalCompanyMasterId
  
  this.compnayGlobalSelectId = item.globalCompanyMasterId
  //alert(this.compnayGlobalSelectId)
  this.service.getAllEmployeeRoleAssignmentByCompanyId( item.globalCompanyMasterId).subscribe(res =>{
     this.summarydata = res.data.results;
  
    this.service.getEmployeeMasterCode().subscribe( res =>{
      let empData = res.data.results;
      this.summarydata.forEach(element => {
          
          empData.forEach(ele => {
            if(element.employeeMasterId == ele.employeeMasterId){
              element.employeeCode = ele.employeeCode
            }
          });
    })  
  });
  console.log(JSON.stringify(this.summarydata))
  
  this.service.countCompanyGroup(this.subId,this.companyGroupMasterId).subscribe(res =>{
    console.log(res.data)
      this.totalUsersCount = res.data.results[0].totalUsers
      this.activeUserCount = res.data.results[0].activeUsers
      this.lockUserCount = res.data.results[0].lockedUsers
      this.userGroupNameL =res.data.results[0].userGroups
      this.userRoleName = res.data.results[0].userRoles
      this.inactiveUserCount = res.data.results[0].deActiveUsers
  })
    let activeUser = [];
    let lockUser = [];
    let userGroupNameL = [];
    let userRoleName = [];

    this.summarydata.forEach(element => {
      // this.userNameList.push({
      //   'userName': element.userName
      // })
      if (element.userIsActive == true) {
        activeUser.push(element)
      }
      if (element.lockUser == true) {
        lockUser.push(element)
      }
      if (element.userGroupId != '') {
        userGroupNameL.push(element)
      }
      if (element.userRoleId != '') {
        userRoleName.push(element)
      }
    });
  
    console.log("summaryGridData2", this.summarydata);
  })

  }
  


  onSelectedCompanyName(comp,index,data){
    let companyGroupMasterId = comp.split(',')
    this.companyGroupMasterId = companyGroupMasterId[0]
    this.companySelectedIndex = index;
    this.companyName = companyGroupMasterId[1];
    this.userName = data.userName
    this.globalUserMasterId = data.globalUserMasterId
    this.globalCompanyMasterId = companyGroupMasterId[1]
    this.employeeCode = data.employeeCode
   this.getUserRole(companyGroupMasterId[0])
   this.selectedCompanyName = companyGroupMasterId[0]
   this.userGroupData = []
   this.getUesrGroupName(companyGroupMasterId[0])
 }


   onSelectGroupNameSelect(userGroupId,index){

     this.groupSelectedIndex = index;
   this.selectedUserGroupId = userGroupId
}

allGroupSelect(userGroupId) {
  
  let summary = this.summarydata
  this.summarydata = []
  summary.forEach(element => {
  if(element.userGroupId == this.selectedUserGroupId){
   console.log(element)
   this.summarydata.push(element)  
}

});

this.service.countCompanyGroupAndUserGroupId(this.subId,this.companyGroupMasterId,this.compnayGlobalSelectId,this.selectedUserGroupId).subscribe(res =>{
  console.log(res.data)
    this.totalUsersCount = res.data.results[0].totalUsers
    this.activeUserCount = res.data.results[0].activeUsers
    this.lockUserCount = res.data.results[0].lockedUsers
    this.userGroupNameL =res.data.results[0].userGroups
    this.userRoleName = res.data.results[0].userRoles
    this.inactiveUserCount = res.data.results[0].deActiveUsers
})
let activeUser = [];
let lockUser = [];
let userGroupNameL = [];
let userRoleName = [];

this.summarydata.forEach(element => {
  // this.userNameList.push({
  //   'userName': element.userName
  // })
  if (element.userIsActive == true) {
    activeUser.push(element)
  }
  if (element.lockUser == true) {
    lockUser.push(element)
  }
  if (element.userGroupId != '') {
    userGroupNameL.push(element)
  }
  if (element.userRoleId != '') {
    userRoleName.push(element)
  }
});


}

getSelectedRoleName(roleid,i){
this.selectedroleindex = i;
this.roleName = roleid
}

  /** On selection on group fetched role list */
  onSelectGroupName(userGroupId: any,i) {
    this.groupName = ''
    this.selectedGroupIndex = i;
    this.groupName = userGroupId
    console.log(this.groupName)
    this.selectedUsrGroupId = userGroupId
    this.userRoleData = []
    this.userRoleNameList.forEach(element => {
   
      if (parseInt(userGroupId) == element.userGroupId) {
        this.userRoleData.push(
          {
            'userRoleId': element.userRoleId,
            'roleName': element.roleName
          })
      }
     

    })
  }

  paginate(event) {
    console.log(JSON.stringify(event));
    
    //event.first: Index of first record being displayed 
    //event.rows: Number of rows to display in new page 
    //event.page: Index of the new page 
    //event.pageCount: Total number of pages 
    
   let pageIndex = event.first/event.rows + 1 // Index of the new page if event.page not defined.
    
  this.page = pageIndex;
  this.size = event.rows;

  this.getSummaryDataByCompany()
   
  }
 
employeeDetailsSummary(){
  this.service.getAllEmployeeRoleAssignment(this.page,this.size).subscribe((res) =>{
    this.employeeUserDetails = res.data.results;
  })
}  


onSelectAssginCompanyGroupName(companyGroupMasterId){
  this.companyGroupMasterId = companyGroupMasterId
  this.companyNameList = []
  this.companyName = null
  this.groupNamesData
    .forEach(element => {
      if (companyGroupMasterId == element.companyGroupMasterId) {
        this.companyNameList.push(
          {
            'globalCompanyMasterId': element.globalCompanyMasterId,
            'companyName': element.companyName
          })
      }
    });

  this.dropdownSettings = {
    singleSelection: false,
    idField: 'globalCompanyMasterId',
    textField: 'companyName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true
  }  

  
  this.service.getAllEmployeeRoleAssignmentBycompanyGroupId(companyGroupMasterId).subscribe(res =>{
    this.userNameList = []
    res.data.results.forEach(element => {
      // && element.roleName != 'left Employee'
      if(element.roleName != 'Live Employee' ){
          this.userNameList.push(element)
      }
    });
  })

  this.service.getUserGroupName(this.companyGroupMasterId).subscribe(res => {
    this.userGroupNameList = res.data.results;
  })
}
onItemSelectCompanyName(item){
  item.globalCompanyMasterId
  this.compnayGlobalSelectId = item.globalCompanyMasterId
  alert(this.compnayGlobalSelectId)
  this.service.getAllEmployeeRoleAssignmentByCompanyId( item.globalCompanyMasterId).subscribe(res =>{
     this.userNameList = []
     res.data.results.forEach(element => {
       console.log(element.roleName)
      //  && element.roleName != 'left Employee'
      if(element.roleName != 'Live Employee'){
        console.log(element.roleName)
          this.userNameList.push(element)
      }
    })

     console.log(this.userNameList)
  })
}
onSelectAssginUserGroup(userGroupId){
  this.selectedUserGroupId = userGroupId
}
filterUserName(){
  let summary = this.userNameList
  this.userNameList = []
  summary.forEach(element => {
  if(element.userGroupId == this.selectedUserGroupId){
  console.log(element)
   this.userNameList.push(element)  
}

});
}

onSelectCopyFrom(globalUserMasterId){
  this.row =[]
  this.editFlag = true;
  // this.saveAssignDatabyEmployee = []
this.service.employeeRoleAssignmentUser(globalUserMasterId).subscribe(res =>{
  //console.log(JSON.stringify(res.data.results))
  // this.saveAssignDatabyEmployee.forEach(emp => {
  //   res.data.results.forEach((element,index) => {
  //     this.service.getUserGroupName(element.companyGroupMasterId).subscribe((res) => {
  //       this.userGroupData = res.data.results;
  //       this.service.getByUserRole(element.companyGroupMasterId).subscribe((res)=>{
  //         this.userRoleNameList = res.data.results;
  //         this.userRoleNameList.forEach(element => {
   
  //           if (parseInt(element.userGroupId) == element.userGroupId) {
  //             this.userRoleData.push(
  //               {
  //                 'userRoleId': element.userRoleId,
  //                 'roleName': element.roleName
  //               })
    
                
  //           }
           
      
  //         })
  //         this.saveAssignDatabyEmployee.push({
  //           employeeCode: emp.employeeCode,
  //           userName: emp.userName,
  //           globalUserMasterId : emp.globalUserMasterId,
  //           companyName: element.companyGroupMasterId,
  //           roleName: element.userRoleId,
  //           groupName: element.userGroupId
  //           });
  //       })
  //     });
     

      
  //   });
  // });
  this.saveAssignDatabyEmployee.forEach(emp => {
  res.data.results.forEach(element => {
    this.row.push({
      employeeCode: emp.employeeCode,
            userName: emp.userName,
            globalUserMasterId : emp.globalUserMasterId,
            companyName: element.companyGroupMasterId,
            roleName: element.roleName,
            groupName: element.groupName
    })

    this.saveAssignData.push({
      globalUserMasterId: emp.globalUserMasterId,
      companyGroupMasterId: element.companyGroupMasterId.toString(),
      globalCompanyMasterId: element.globalCompanyMasterId.toString(),
      userRoleId: element.userRoleId.toString(),
  })
  })
})

  
  
})
}

exportApprovalAllSummaryAsExcel(){
  this.excelData = [];
  this.header = []
  this.header =["employeeCode","userName","emailId","mobileNumber","userIsActive"];
  this.excelData = [];
  if(this.summarydata.length>0){
 
   this.summarydata.forEach((element) => {
    let obj = {
      companyGroupCode: element.companyGroupCode,
      userName : element.userName,
      emailId: element.emailId,
      mobileNumber : element.mobileNumber,
      userIsActive : element.userIsActive

     
    };
    this.excelData.push(obj);
  });
   
  }
  this.excelservice.exportAsExcelFile(this.excelData, 'Summary-Data', 'Summary-Data' ,this.header);  
}
exportApprovalSummaryAssignGroupAsExcel(){
  this.excelData = [];
  this.header = []
  this.header =["companyGroupCode","companyGroupName","companyCode","companyName","groupName","roleName"];
  this.excelData = [];
  if(this.asignRoleSummary.length>0){
 
   this.asignRoleSummary.forEach((element) => {
    let obj = {
      companyGroupCode: element.companyGroupCode,
      companyGroupName : element.companyGroupName,
      companyCode: element.companyCode,
      companyName : element.companyName,
      groupName : element.groupName,
      roleName : element.roleName


     
    };
    this.excelData.push(obj);
  });
   
  }
  this.excelservice.exportAsExcelFile(this.excelData, 'Summary-Assign-Group', 'Summary-Assign-Group' ,this.header);
}

}
