import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {FormBuilder,FormControl,FormGroup,FormGroupDirective,Validators,} from '@angular/forms';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { UserRolesPermissionService } from '../user-roles-permission.service';
export interface userGridData {
  srno;
  groupName;
  groupDescription;

}
export interface assigndata {
  companyGroupCode;
  shortName;
  companyGroupName;

}
export interface Grplistdata {
  groupName;
}

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
  userGroupId = null;
  userGridData: userGridData[];
  assigndata:assigndata[];
  Grplistdata:Grplistdata[];
  public form: FormGroup;
  public assignGroupData: Array<any> = [];

  public modalRef: BsModalRef;
  userGroupName: any;
  userGroupList: any;

  constructor(private modalService: BsModalService,
    private service: UserRolesPermissionService,
    private formBuilder: FormBuilder,
    private alertService: AlertServiceService,) {
      this.form = this.formBuilder.group({
        companyGroupMasterId: new FormControl(''),
        userGroupId:new FormControl(''),
        groupName: new FormControl(null, Validators.required),
        groupDescription: new FormControl(null, Validators.required),
        default:new FormControl(''),
        isActive: new FormControl(1),
        remark: new FormControl(null),
     
      });
     }

  ngOnInit(): void {
    this.userGridData = [
      { srno: '1', groupName: 'System Admin',groupDescription:'System Admin Desc' },
      { srno: '2', groupName: 'DB Admin',groupDescription:'DB Admin Desc' },
      { srno: '3', groupName: 'Paysquare Admin',groupDescription:'Paysquare Admin Desc' },
      { srno: '4', groupName: 'App_Admin',groupDescription:'App_Admin Desc' },
    ];
    this.assigndata = [
      { companyGroupCode: '854332', shortName: 'Eaton',companyGroupName:'Eaton Pvt Ltd' },
      { companyGroupCode: '223434', shortName: 'TCS',companyGroupName:'Tata' },
      { companyGroupCode: '654564', shortName: 'Abbott',companyGroupName:'Abbott Pvt ltd' },
      { companyGroupCode: '675876', shortName: 'Schindler',companyGroupName:'Schindler Pvt ltd' },
    ];
    this.Grplistdata=[{groupName:'Paysquare1'},
    {groupName:'Paysquare2'},
    {groupName:'Paysquare3'},
    {groupName:'Paysquare4'},
    {groupName:'Paysquare5'},
    {groupName:'Paysquare6'},
    {groupName:'Paysquare7'},
    {groupName:'Paysquare8'},
    {groupName:'Paysquare9'}]



 this.summaryPage();

 }
    // Summary get Call
    public summaryPage(): void {
      this.userGridData = [];
       this.service.getAllUserGroupData().subscribe((res) => {
            console.log('userGridData::', res);
            this.userGridData = res.data.results;
           console.log('userGridData::', this.userGridData);
          });
    }

    save() {
      console.log('clcicked on new record save button');
      let companyId = [];
      // companyId.push(Number(this.form.get('companyGroupMasterIds').value))
      // const data = {

      //         userGroupId: this.form.get('userGroupId').value,
      //         groupName: this.form.get('groupName').value,
      //         groupDescription:this.form.get('groupDescription').value,
      //          companyGroupMasterIds: companyId,
      //         default:this.form.get('default').value,
      //         isActive:this.form.get('isActive').value,
      //         remark:this.form.get('remark').value,

      //         userGroupId: 6085,
      //         groupName: "IT Support",
      //         groupDescription:"IT Support",
      //          companyGroupMasterIds: 12,
      //         default:true,
      //         isActive:true,
      //         remark:null,
              
      // }

      const data = {
        "groupName": this.form.controls['groupName'].value,
        "groupDescription":this.form.controls['groupDescription'].value,
        "companyGroupMasterIds": [
            {
                "userGroupId": this.userGroupId,
                "companyGroupMasterId": 12,
                "active": true
            },
            // {
            //     "userGroupId": 6086,
            //     "companyGroupMasterId": 14,
            //     "active": true
            // }
        ],
        "remark": null,
        "active": true,
        "default": false
    }
      console.log(JSON.stringify(data));
      this.service.postUserGroupData(data).subscribe(res => {
        console.log("before save", data);
        this.alertService.sweetalertMasterSuccess("User Group data save successfully","");
        this.summaryPage();
        this.form.reset();
      });
    }
    
 
  editUserGroup(summary){
this.form.controls['groupName'].setValue(summary.groupName),
this.form.controls['groupDescription'].setValue(summary.groupDescription)


this.userGroupId=summary.userGroupId
this.form.enable()

  }

  resetForm(){
    
    this.form.reset()
    this.form.enable()
  }

  viewUserGroup(summary){
    this.form.controls['groupName'].setValue(summary.groupName),
this.form.controls['groupDescription'].setValue(summary.groupDescription)


this.userGroupId=summary.userGroupId
this.form.disable()
  }


  AssignedGroup(template: TemplateRef<any>,id: number, headname: string) {

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );

    this.userGroupName=this.form.controls['groupName'].value

    let data = {
      "userGroupName":"IT Support",
      "listCompanyGroupIds":[12]
      }
    
    //this.companyGroupName =  headname;
    this.service.postUserGroupGetAllCompanyGroupsByUserGroup(data).subscribe((res) => {
      console.log("AssignedGroupCompanyData",res);
      this.assignGroupData = res.data.results;
    });
  }

  Grouplist(template2: TemplateRef<any>,gName) {
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-md' })
    );
    this.userGroupList=gName
    let data={
      "userGroupName":"IT Support",
      "listCompanyGroupIds":[12]
      }
    this.service.postUserGroupGetAssignedCompanyGroupsByUserGroupName(data).subscribe((res) => {
      console.log("AssignedGroupCompanyNamePopUp",res);
      this.Grplistdata = res.data.results;
    });
  }
}
