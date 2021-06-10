import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserRolesPermissionService } from '../user-roles-permission.service';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {
  public form: FormGroup;
  userRoleId: number = 0;
  userGroupId: number = null;
  public modalRef: BsModalRef;
  public companyListResponse = [];
  public summary: Array<any> = [];
  getUserRoleDetailsResponse: any;
  public hideRemarkDiv: boolean;
  public isSaveAndReset: boolean = true;
  public showButtonSaveAndReset: boolean = true;
  public masterGridData: Array<any> = [];
  public userGroupName: Array<any> = [];
  public groupNameList: Array<any> = [];
  public historyArrayData: Array<any> = [];
  public userData: any;
  public employeeMasterId: any;
  public companyGroupMasterId: any = null;
  subId: any;
  companyGroupName: any;
  comapnyGroupNamesData: any[];
  companyGroupMasterIdArray: any[];

  constructor(private modalService: BsModalService,
    private service: UserRolesPermissionService,
    private formBuilder: FormBuilder,
    private alertService: AlertServiceService,
    private authService: AuthService,) {

    this.userData = this.authService.getprivileges()
    console.log("userData::", this.userData);
    //  this.companyGroupMasterId  = this.userData.UserDetails.companyGroupMasterId

    this.subId = this.userData.sub

    this.service.employeeRoleAssignmentUser(this.subId).subscribe(res => {
      // 111 1 112 111 -> 111 1 112
      this.companyGroupMasterIdArray = []
       this.comapnyGroupNamesData = []
      this.service.employeeRoleAssignmentUser(this.subId).subscribe(res => {

        res.data.results.forEach(element => {
          console.log(element.companyGroupMasterId);
           this.companyGroupMasterIdArray.push(element.companyGroupMasterId)
          this.comapnyGroupNamesData.push({
            'companyGroupMasterId': element.companyGroupMasterId,
            'companyGroupName': element.companyGroupName
          })
        });

        console.log(JSON.stringify(this.comapnyGroupNamesData))
        this.onPageLoad();
     
      })

      this.deactivateRemark();


    })
    this.form = this.formBuilder.group({

      userRoleId: new FormControl(0),
      userGroupId: new FormControl(null),
      roleName: new FormControl(null, Validators.required),
      companyGroupMasterId: new FormControl(),
      roleDescription: new FormControl(null, Validators.required),
      default: new FormControl(false),
      active: new FormControl(true),
      remark: new FormControl(null),

    });

  }

  ngOnInit() {
  }



onSelectCompanyName(companyGroupMasterId){
  this.companyGroupMasterId = companyGroupMasterId
  this.groupNameList = []
  this.service.getUserGroupForRoleGroup(companyGroupMasterId).subscribe((res) => {
    this.userGroupName = res.data.results;
    res.data.results.forEach((element) => {
      const obj = {
        label: element.groupName,
        value: element.userGroupId,
      };
      this.groupNameList.push(obj);
    });
    console.log("groupName",this.groupNameList)
  });

  // this.onPageLoad();
  this.form.controls['roleName'].reset();
  this.form.controls['userGroupId'].reset();
  this.form.controls['roleDescription'].reset();
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
    //this.form.value.active=1;
  }

  save() {
    console.log(" save", this.masterGridData)
    
    if (this.isSaveAndReset == false) {
      console.log('in edit');

      this.form.controls['companyGroupMasterId'].setValue(this.companyGroupMasterId)
      const id = this.form.get('userRoleId').value;
      console.log(JSON.stringify(this.form.value));

      this.service.updateUserRollData(this.form.value).subscribe(res => {
        console.log('after save..', res);
        if (res.data.results.length > 0) {
          console.log('data is updated');
          this.alertService.sweetalertMasterSuccess(res.data.messsage,'Updated User Role Details Successfully');
          this.onPageLoad();
          this.isSaveAndReset = true;
          this.showButtonSaveAndReset = true;

        }

      });
      this.form.controls['active'].setValue(true);
     
    }
    else {
      console.log('clcicked on new record save button');
      console.log(JSON.stringify(this.form.value));
      this.service.postUserRollData(this.form.value).subscribe(res => {
        console.log("before save", this.form.value)
        if (res.data.results.length > 0) {
          console.log('data is updated');
          this.alertService.sweetalertMasterSuccess('', res.data.messsage);
          this.onPageLoad();
          this.form.reset();

        }
        else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }

      });
      
    }
  }

 // Summary get Call
onPageLoad(){
  this.masterGridData = [];
  let data = {
    "listCompanyGroupIds":this.companyGroupMasterIdArray
}
console.log(this.companyGroupMasterId);
   this.service.getByCompanyGroupMaster(data).subscribe((res) => {
      this.masterGridData = res.data.results;
       console.log('masterGridData::', this.masterGridData);
      });
}



  // onPageLoad() {
  //   this.masterGridData = [];
  //   //alert("here")
  //   this.service.getByCompanyGroupMaster(this.companyGroupMasterId).subscribe((res) => {
  //     console.log('getuserroledata::', res);
  //     this.getUserRoleDetailsResponse = res.data.results;
  //     let i = 1;
  //     // console.log('company list',this.companyListResponse)
  //     res.data.results.forEach(element => {
  //       let index = this.companyListResponse.findIndex(o => o.userGroupId == element.userGroupId);

  //       const obj = {
  //         SrNo: i++,
  //         userRoleId: element.userRoleId,
  //         userGroupId: parseInt(element.userGroupId),
  //         roleName: element.roleName,
  //         groupName: element.groupName,
  //         roleDescription: element.roleDescription,
  //       };
  //       this.masterGridData.push(obj);

  //     });
  //     //  console.log("mastergrid data::"+this.masterGridData);
  //   });
  // }



  edit(summary, userGroupId: number) {

    this.companyGroupMasterId =summary.companyGroupMasterId;
    this.groupNameList = []
    this.service.getUserGroupForRoleGroup(this.companyGroupMasterId).subscribe((res) => {
      this.userGroupName = res.data.results;
      res.data.results.forEach((element) => {
        const obj = {
          label: element.groupName,
          value: element.userGroupId,
        };
        this.groupNameList.push(obj);
      });
      console.log("groupName",this.groupNameList)
    },(error)=>{console.log(error)},()=>{
      
   //this.onSelectCompanyName(summary.userGroupId);
   console.log("summary::", summary)
   this.userGroupId = userGroupId;
  this.userGroupId=summary.userGroupId
   this.form.patchValue(summary)
   this.isSaveAndReset = false;
   this.showButtonSaveAndReset = true;
   this.form.enable();

    });



  }
  view(summary) {
   
    this.isSaveAndReset = false;
    this.showButtonSaveAndReset = false;
    this.form.reset();
    this.form.controls['active'].setValue(true);
    this.form.patchValue(summary);
     this.form.disable();

  }
  cancelView() {
    this.userRoleId = 0;
    this.isSaveAndReset = true;
    this.form.enable();
    this.form.reset();
    this.showButtonSaveAndReset = true;
    this.form.controls['active'].setValue(true);
  }
 


  // getUserGroupID(groupid) {
  //   this.groupNameList.forEach(ele => {
  //     if (ele.label == groupid) {
  //       this.form.controls['userGroupId'].setValue(parseInt(ele.value))
  //     }
  //   })
  //   console.log("selected: " + JSON.stringify(this.form.value))
  // }

}