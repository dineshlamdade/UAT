import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output, ElementRef } from '@angular/core';
import { ReimbursementMasterService } from '../reimbursement-master.service';


@Component({
  selector: 'app-remb-summary',
  templateUrl: './remb-summary.component.html',
  styleUrls: ['./remb-summary.component.scss']
})
export class RembSummaryComponent implements OnInit {
private templateList:Array<any> = [];
private headtypelist:Array<any> = [];
private tabIndex = 0;
@Input() policyNo: string;
@Output() policyNumber = new EventEmitter<any>();

  constructor(public service: ReimbursementMasterService) { }

  ngOnInit(): void {
    this.getAllTemplateList();
    this.getReimbursementHeadType();
  }

// Get all summary list
  getAllTemplateList(){
    this.service.getAllTemplateList().subscribe((res)=>{
      console.log("res master", res);
      this.templateList = res.data.results;
    })
  }

  
  getReimbursementHeadType() {
    console.log("ssss");
    this.service.getReimbursementHeadType().subscribe((res) => {
      console.log("res master", res);
      this.headtypelist = res.data.results;
      console.log("this.headtypelist", this.headtypelist);
    })
  }


  // summaryViewById(rembSettingId:number, mode:string){
  //   this.tabIndex = 1;
  //   const data = {
  //     rembSettingId : 1,
  //     canEdit: (mode == 'edit' ? true : false)
  //   };
  //   this.rembSettingId = rembSettingId;
  //    this.rembsettingid.emit(data);
  //   console.log("summry view", rembSettingId, mode);
  // }

  summaryViewById(policyNo: string) {
    this.tabIndex = 1;
    const policyNumber = {
      policyNo : policyNo,
      tabIndex : this.tabIndex,
    };
    this.policyNumber.emit(policyNumber);
  }

  

}
