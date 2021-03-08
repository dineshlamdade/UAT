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
  userRoleId:number =0;
  userGroupId:number =0;
  public modalRef: BsModalRef;
  public companyListResponse = [];
  public summary: Array<any> = [];
  getUserRoleDetailsResponse:any;
  public hideRemarkDiv: boolean;
  public isSaveAndReset: boolean = true;
  public showButtonSaveAndReset: boolean = true;
  public masterGridData: Array<any> = [];
  public userGroupName: Array<any> = [];
  public groupNameList: Array<any> = [];
  public historyArrayData: Array<any> = [];

  constructor(private modalService: BsModalService, 
    private service: UserRolesPermissionService,
    private formBuilder: FormBuilder,
    private alertService: AlertServiceService,
    private authService: AuthService,){
    this.form = this.formBuilder.group({
      userRoleId: new FormControl(''),
      userGroupId:new FormControl(''),
      roleName: new FormControl(null, Validators.required),
      groupName: new FormControl(null, Validators.required),
      roleDescription: new FormControl(null, Validators.required),
      default:new FormControl(1),
     isActive: new FormControl(1),
     remark: new FormControl(null),
   
    });
   }

  ngOnInit() {

    //  const temp = this.authService.getprivileges();
    // console.log("auth data ...",temp);


//-------------- Family Member List API call ---------------------------
this.service.getUserGroupForRoleGroup().subscribe((res) => {
  this.userGroupName = res.data.results;
  res.data.results.forEach((element) => {
    const obj = {
      label: element.groupName,
      value: element.userGroupId,
    };
    this.groupNameList.push(obj);
  });
});
  

this.onPageLoad();
this.deactivateRemark();
}
   
 // --------------- Deactivate the Remark -------------------
 deactivateRemark() {
  // if (this.form.value.isActive === false) {
  //   // this.form.get('remark').enable();
  //   this.hideRemarkDiv = true;
  //   this.form.get('remark').setValidators([Validators.required]);
  // } else {
  //   this.form.get('remark').clearValidators();
  //   this.hideRemarkDiv = false;
  //   //this.form.get('remark').disable();
  //   this.form.get('remark').reset();
  // }
}
  
save() {
  console.log(" save", this.masterGridData)
    if (this.userRoleId > 0) {
      console.log('in edit');
      let companyId = [];
     
      
          const data = {
            userRoleId: this.userRoleId,
            userGroupId: this.userGroupId,
             roleName: this.form.get('roleName').value,
             groupName:this.form.get('groupName').value,
             roleDescription: this.form.get('roleDescription').value,
             isActive:this.form.get('isActive').value,
             remark:this.form.get('remark').value,
          };
         const id = this.form.get('userRoleId').value;
         console.log(JSON.stringify(data));
         this.service.updateUserRollData(this.userRoleId, data).subscribe(res => {
         console.log('after save..', res);
         if (res.data.results.length > 0) {
          console.log('data is updated');
         this.alertService.sweetalertMasterSuccess(res.data.messsage, '');
          this.isSaveAndReset = true;
          this.showButtonSaveAndReset = true;
         } 
       this.form.reset();
       this.onPageLoad();
      }, );
    }
    else {
      console.log('clcicked on new record save button');
      let companyId = [];
      // companyId.push(Number(this.form.get('arraylistCompanyIds').value))
      const data = {

        userRoleId: this.userRoleId,
        userGroupId: this.userGroupId,
         roleName: this.form.get('roleName').value,
         groupName:this.form.get('groupName').value,
         roleDescription: this.form.get('roleDescription').value,
        //  default:this.form.get('default').value,
         isActive:this.form.get('isActive').value,
         remark:this.form.get('remark').value,
             };
             console.log(JSON.stringify(data));
             this.service.postUserRollData(data).subscribe(res => {
              console.log("before save", data)
               if (res.data.results.length > 0) {
                  console.log('data is updated');
                 this.alertService.sweetalertMasterSuccess(res.data.messsage, '');
                 this.form.reset();
         
          }
          else {
            this.alertService.sweetalertWarning(res.status.messsage);
          }
          this.onPageLoad();
          this.form.reset();
         },
         
         );
    }
  }


  onPageLoad() {
   this.masterGridData = [];
      this.service.getByCompanyGroupMaster().subscribe((res) => {
            console.log('getuserroledata::', res);
            this.getUserRoleDetailsResponse = res.data.results;
            let i =1;
            // console.log('company list',this.companyListResponse)
            res.data.results.forEach(element => {
             let index = this.companyListResponse.findIndex(o=>o.userGroupId ==element.userGroupId );

              const obj = {
                SrNo: i++,
                userRoleId:  element.userRoleId ,
                userGroupId: element.userGroupId,
                roleName: element.roleName,
                groupName: element.groupName,
                roleDescription: element.roleDescription,
              };
            this.masterGridData.push(obj);
          
      }) ;
   
    });
  }
  


  edit(rowIndex: number, userRoleId:number) {
   this.userRoleId = userRoleId;
    console.log(rowIndex);
    // companyId
    console.log(this.getUserRoleDetailsResponse[rowIndex]);
    this.isSaveAndReset = false;
    this.showButtonSaveAndReset = true;
    this.form.enable();
    this.form.reset();
    this.form.patchValue(this.getUserRoleDetailsResponse[rowIndex]);
   
    this.form.patchValue({
     

    })
  
  }
  view(rowIndex: number) {
   this.isSaveAndReset = false;
   this.showButtonSaveAndReset = false;
    this.form.reset();
  
    console.log(rowIndex);
    // companyId
    console.log(this.getUserRoleDetailsResponse[rowIndex]);
    this.isSaveAndReset = false;
    this.showButtonSaveAndReset = false;
    this.form.enable();
    this.form.reset();
    this.form.patchValue(this.getUserRoleDetailsResponse[rowIndex]);
    this.form.patchValue({
     

    })
    this.form.disable();
  }
  cancelView() {
  this.userRoleId =0;
    this.isSaveAndReset = true;
    this.showButtonSaveAndReset = true;
    this.form.enable();
    this.form.reset();
    this.showButtonSaveAndReset = true;
   

  }
  // public viewHistory(template1: TemplateRef<any>, id: number, headname: string): void {
  //   this.modalRef = this.modalService.show(
  //     template1,
  //     Object.assign({}, { class: 'gray modal-md' }),
  //   );
  //   const roleId = this.form.get('userRoleId').value;
  //  this.groupName =  headname;
  //   this.service.getByCompanyGroupMaster().subscribe((res) => {
  //     console.log(res);
  //     this.historyArrayData = res.data.results;
  //   });

  // }
 

}