import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {FormBuilder,FormControl,FormGroup,FormGroupDirective,Validators,} from '@angular/forms';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { UserRolesPermissionService } from '../user-roles-permission.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { ExcelserviceService } from '../excel_service/excelservice.service';




@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
    data: string;
  userGroupId = 0;
   public form: FormGroup;
  public assignGroupData: Array<any> = [];
 public modalRef: BsModalRef;
  userGroupName: any;
  userGroupList: any;
  asginUserGroup: any;
  hideRemarkDiv: boolean;
  userGridData: any=[];
  Grplistdata: Array<any> = [];
  public isSaveAndReset: boolean = true;
  public showButtonSaveAndReset: boolean = true;
  userData: any;
  subId: any;
  employeeMasterId: any;
  companyGroupMasterId: any;
  companyMasterData: any[]=[];
  assigndata: any = [];
  selectedAssignData: any[];
  
  selectAllGroupFlag: boolean = false;
  excelData: any[];
  header: any[];
  editflag: boolean = false;
 // userData: unknown;

  constructor(private modalService: BsModalService,
    private service: UserRolesPermissionService,
    private formBuilder: FormBuilder,
    private alertService: AlertServiceService,private authService: AuthService,
    private excelservice : ExcelserviceService) {

      
      this.form = this.formBuilder.group({
        createdBy: new FormControl(''),
        lastModifiedBy: new FormControl(''),
        createdDateTime: new FormControl(''),
        lastModifiedDateTime: new FormControl(''),
        companyGroupMasterId: new FormControl(''),
        globalUserMasterId: new FormControl(''),
        employeeRoleAssignmentId: new FormControl(''),
        userGroupId:new FormControl(''),
        userRoleId:new FormControl(''),
        companyId:new FormControl(''),
        companyName: new FormControl(''),
        companyGroupName: new FormControl(''),
        groupName: new FormControl(null, Validators.required),
        groupDescription: new FormControl(null, Validators.required),
        default:new FormControl(''),
        active: new FormControl(true),
        remark: new FormControl(null),
        employeeMasterId:new FormControl('')
     
      });
      this.userData =   this.authService.getprivileges()
      console.log("userData::",this.userData);
      this.subId = this.userData.sub

      this.companyGroupMasterId = []
      this.service.employeeRoleAssignmentUser(this.subId).subscribe(res =>{
        
        res.data.results.forEach(element => {
          this.companyGroupMasterId.push(element.companyGroupMasterId)
        });
         console.log("companyGroupMasterId",this.companyGroupMasterId)
        this.summaryPage();
      })
      
      this.deactivateRemark(); 
     }

  ngOnInit(): void {
  
 }
 // --------------- Deactivate the Remark -------------------
 deactivateRemark() {
  if (this.form.value.active === false) {
    // this.form.get('remark').enable();
    this.hideRemarkDiv = true;
    this.form.get('remark').setValidators([Validators.required]);
  } else {
    this.form.get('remark').clearValidators();
    this.hideRemarkDiv = false;
    //this.form.get('remark').disable();
    this.form.get('remark').reset();
  }
}

    // Summary get Call
    public summaryPage(): void {
      this.userGridData = [];
      let data = {
        "listCompanyGroupIds":this.companyGroupMasterId
    }
       this.service.postUserroupGetAllDistinctByCompanyGroups(data).subscribe((res) => {
            console.log('userGridData::', res);
            this.userGridData = res.data.results;
           console.log('userGridData::', this.userGridData);
          });
    }

    save() {
      console.log('clcicked on new record save button');
    // if(this.isSaveAndReset){
      const data = {
        "groupName": this.form.controls['groupName'].value,
        "groupDescription":this.form.controls['groupDescription'].value,
        "companyGroupMasterIds": this.companyMasterData,
        "remark": null,
        "active": true,
        "default": this.form.controls['default'].value,
    }
    if(this.companyMasterData.length > 0){
      console.log(JSON.stringify(data));
      this.service.postUserGroupData(data).subscribe(res => {
        console.log("before save", data);
        if(!this.showButtonSaveAndReset){
          this.alertService.sweetalertMasterSuccess("User Group Save Successfully","");
        }
        else{
          this.alertService.sweetalertMasterSuccess("User Group  Updated Successfully","");
        }
       
        this.summaryPage();
        this.form.reset();
        this.form.controls['active'].setValue(true);
        this.isSaveAndReset = true;
        this.showButtonSaveAndReset = true;
      });
    }else{

      this.alertService.sweetalertWarning("Please Assign Group")

    }
      
    }
    
 
editUserGroup(summary){
  this.userGroupId=summary.userGroupId
   this.form.patchValue(summary)
   
   this.isSaveAndReset = false;
    this.showButtonSaveAndReset = true;
   this.editflag = true;
    this.form.enable();
    this.form.get('groupName').disable();
    //this.form.controls['default'].setValue(true);
    // this.form.controls['default'].setValue(summary.default);
    


//this.form.reset();


}

resetForm(){
  this.form.controls['active'].setValue(true);
     this.form.reset()
    this.form.enable()
    
  }

viewUserGroup(summary){
   this.editflag = false;
   this.userGroupId=summary.userGroupId
   this.isSaveAndReset = false;
    this.showButtonSaveAndReset = false;
    this.form.reset();
    this.form.controls['active'].setValue(true);
    this.form.patchValue(summary);
    this.form.controls['default'].setValue(summary.default);

    this.form.disable();
  }

  cancelView() {
    
      this.isSaveAndReset = true;
      this.showButtonSaveAndReset = true;
      this.form.enable();
      this.form.reset();
   
      this.form.controls['active'].setValue(true);
     }


AssignedGroup(template: TemplateRef<any>,id: number, headname: string) {
this.modalRef = this.modalService.show(
 template,
      Object.assign({}, { class: 'gray modal-lg' })
);

   this.userGroupName=this.form.controls['groupName'].value

    let data = {
      "userGroupName":this.userGroupName,
      // changes for tthe new change by apporrva for the al Company Data
      //this.service.postUserGroupGetAllCompanyGroupsByUserGroup(data).subscribe((res) => {
     //"listCompanyGroupIds":this.companyGroupMasterId  
        }
        
    //this.companyGroupName =  headname;
    this.service.postUserroupGetAllDistinctByCompanyGroups(data).subscribe((res) => {
      console.log("AssignedGroupCompanyData",res);
     // this.assignGroupData = res.data.results;
      res.data.results.forEach((ele) => { this.assignGroupData.push(Object.assign({}, ele)) });

      if(!this.isSaveAndReset){
        this.companyMasterData = []
        this.assignGroupData.forEach(ele =>{
           if(ele.active == true){
            this.companyMasterData.push({
              "userGroupId": ele.userGroupId,
              "companyGroupMasterId":ele.companyGroupMasterId,
              "active": ele.active
            })
           }
          
        })  
      }
    });
  }
  // assignuserGrpData(assigndata){
  //  this.asginUserGroup=[assigndata.companyGroupMasterId];
  // // this.companyMasterData  = []
  //  this.companyGroupMasterId.forEach(element => {
  //    if(element == assigndata.companyGroupMasterId){
  //     this.companyMasterData.push(
  //       {
  //         "userGroupId": this.userGroupId,
  //         "companyGroupMasterId":element,
  //         "active": true
      
  //     })
  //    }
     
  //  });
  //  console.log("selected company data: "+ JSON.stringify(this.companyMasterData))
  // }

// /* When clicked on checkedbox summary page/
// assignuserGrpData(event, assigndata) {
//     this.asginUserGroup=[assigndata.companyGroupMasterId];
// 		if (event.checked) {
// 			this.companyMasterData.push(assigndata)
// 		} else {
// 			if (this.companyMasterData.length > 0) {
// 				this.companyMasterData.forEach((element, index) => {
// 					if (element.companyGroupMasterId == assigndata.companyGroupMasterId) {
// 						let ind = index;
// 						this.companyMasterData.splice(ind, 1);
// 					}
// 				});
// 			} else {
// 				this.companyMasterData = []
// 			}
// 		}
// 		 console.log("selectedEmpData:", JSON.stringify(this.companyMasterData))
// 	}

  assignuserGrpData(assigndata,event){
    // console.log("assigndata : "+ JSON.stringify(assigndata))
    if(event.checked){
      this.asginUserGroup=[assigndata.companyGroupMasterId];
      // this.companyMasterData  = []
       this.companyGroupMasterId.forEach(element => {
         if(element == assigndata.companyGroupMasterId){
          this.companyMasterData.push(
            {
              "userGroupId": this.userGroupId,
              "companyGroupMasterId":element,
              "active": true
          
          })
         }
         
       });
       
    }else{
      if(this.companyMasterData.length > 0){
        this.companyMasterData.forEach((element,index) => {
         if(element.companyGroupMasterId == assigndata.companyGroupMasterId){
           let ind = index;
           this.companyMasterData.splice(ind,1)
         }
        })
      }else{
        this.companyMasterData = []
      }
     
    }
   

   console.log("selected company data: "+ JSON.stringify(this.companyMasterData))
  }
  resetAssignGroup(){
    this.companyMasterData = []
  }

  
  // selectAll(event) {
  //   console.log("selectAlll",this.selectedAllFlag)
	// 	this.companyMasterData = [];
	// 	 if (event.checked){
      
	// 		this.selectedAllFlag = true;
  //     console.log("notselectAlll",this.selectedAllFlag)
	// 		 this.assignGroupData.forEach(element =>{
  //      // element.active =  true;
  //       this.companyMasterData.push(
  //         {
  //           "userGroupId": this.userGroupId,
  //           "companyGroupMasterId":element,
  //           "active": true
  //          })
        

  //     })
  //    }
  //    else{
  //     this.selectedAllFlag = false;
  //     console.log("notselectAlll",this.selectedAllFlag)
	// 		this.companyMasterData = []
  //    }
    
	// 	// } else {
	// 	// 	this.selectedAllFlag = false;
	// 	// 	this.companyMasterData = []
	// 	// }
	// 	 console.log("selectedALLLLLLEmpData:", this.companyMasterData)
	// }
  selectAll(event){
    // assignGroupData
    if(event.checked){
      
      this.assignGroupData.forEach((element,index)=>{
        this.asginUserGroup=[element.companyGroupMasterId];
        this.companyMasterData.push(
          {
            "userGroupId": this.userGroupId,
            "companyGroupMasterId":element.companyGroupMasterId,
            "active": true
        
        })
      })

      this.selectAllGroupFlag = true;
    }
    else{
      this.companyMasterData = []
      this.asginUserGroup = []
      this.selectAllGroupFlag = false;
    } 

    console.log("selected all company data: "+ JSON.stringify(this.companyMasterData))
  }

  saveAssignGroupData(){
    {
      let data = {
        "userGroupName": this.userGroupName,
      "listCompanyGroupIds":this.asginUserGroup
      } 
      this.service.postUserGroupGetAllCompanyGroupsByUserGroup(data).subscribe((res) => {
        console.log("AssignedGroupSave:::",res);
        this.assignGroupData = res.data.results;
      });
    }
  }

  Grouplist(template2: TemplateRef<any>,gName) {
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-md' })
    );
    this.userGroupList=gName
    let data={
      "userGroupName":gName,
      "listCompanyGroupIds":this.companyGroupMasterId
      }
    this.service.postUserGroupGetAssignedCompanyGroupsByUserGroupName(data).subscribe((res) => {
      console.log("AssignedGroupCompanyNamePopUp",res);
      this.Grplistdata = res.data.results;
    });
  }
  exportApprovalSummaryAsExcel(): void {
    this.excelData = [];
    this.header = []
    this.header =["Company Group Name"];
    this.excelData = [];
    if(this.Grplistdata.length>0){
   
     this.Grplistdata.forEach((element) => {
      let obj = {
        'Company Group Name': element.companyGroupName,
       
      };
      this.excelData.push(obj);
    });
     
    }
    this.excelservice.exportAsExcelFile(this.excelData, 'User-Group-Summary', 'User-Group-Summary' ,this.header);
  
  }
  exportApprovalAllSummaryAsExcel(){
    this.excelData = [];
    this.header = []
    this.header =["Group Name","Group Description"];
    this.excelData = [];
    if(this.userGridData.length>0){
   
     this.userGridData.forEach((element) => {
      let obj = {
        'Group Name': element.groupName,
        'Group Description' : element.groupDescription
       
      };
      this.excelData.push(obj);
    });
     
    }
    this.excelservice.exportAsExcelFile(this.excelData, 'All-Summary-UserGroup', 'All-Summary-UserGroup' ,this.header); 
  }
  exportApprovalSummaryAssignGroupAsExcel(){
    this.excelData = [];
    this.header = []
    this.header =["Company Group Code","Short Name","Company Group Name"];
    this.excelData = [];
    if(this.assignGroupData.length>0){
   
     this.assignGroupData.forEach((element) => {
      let obj = {
        'Company Group Code': element.companyGroupCode,
        'Short Name' : element.shortName,
        'Company Group Name': element.companyGroupName
       
      };
      this.excelData.push(obj);
    });
     
    }
    this.excelservice.exportAsExcelFile(this.excelData, 'Summary-Assign-Group', 'Summary-Assign-Group' ,this.header);  
  }
}










// assignuserGrpData(assigndata,event){
//   this.asginUserGroup=[assigndata.companyGroupMasterId];
//  // this.companyMasterData  = []
//  if(event.checked){
//    this.companyGroupMasterId.forEach((element,index) => {
//     if(element == assigndata.companyGroupMasterId){
//      this.companyMasterData.push(
//        {
//          "userGroupId": this.userGroupId,
//          "companyGroupMasterId":element,
//          "active": true
     
//      })
//     }  
//   });
//  }else{
//    this.companyMasterData.forEach((ele,index) =>{
//       if(ele.companyGroupMasterId == assigndata.companyGroupMasterId){
//          let ind = index;
//          this.companyMasterData.splice(ind,1)
//       }
//    })
//  }
  

//   console.log("selected company data: "+ JSON.stringify(this.companyMasterData))
//  }


