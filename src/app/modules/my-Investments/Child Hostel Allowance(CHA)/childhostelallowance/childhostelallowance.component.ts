import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ChildhostelallowanceService } from '../childhostelallowance.service';
import { NumberFormatPipe } from '../../../../core/utility/pipes/NumberFormatPipe';
@Component({
  selector: 'app-childhostelallowance',
  templateUrl: './childhostelallowance.component.html',
  styleUrls: ['./childhostelallowance.component.scss']
})
export class ChildhostelallowanceComponent implements OnInit {

 
 
public summaryGridData: Array<any> = [];
public masterGridData: Array<any> = [];

  public baseTotal : number;
  public arrearTotal :number;
  public total : number;
  public maxEligibilityTotal :number;
  public applicableAllowanceTotal : number;


  familyMemberGroup: any;
  familyMemberName : [];
  //masterGridData: any;

  // public summaryGridData: Array<any> = [];

  // public grandTotalDeclared : number;
  // public grandTotalActual :number;
  // public limit : number;
  // public benefitAvailableDeclared :number;
  // public benefitAvailableActual : number;

  showData = false;
  public modalRef: BsModalRef;
  

  constructor(private modalService: BsModalService, private childhostelallowanceService: ChildhostelallowanceService,
    private numberFormat: NumberFormatPipe,
    ){}
     
 
ngOnInit(): void {

  this.getComputationSummaryPage();
  // this.summaryPage();
  this. getMasterSummary();
  }
   
  // getSummaryInfo

  // summaryPage() {
  //   this.childhostelallowanceService.getSummaryInfo().subscribe((res) => {
  //      this.summaryData = res.data.results;
  //       this.baseTotal = res.data.results[0].baseTotal;
  //       this.arrearTotal = res.data.results[0].arrearTotal;
  //       this.total = res.data.results[0].total;
  //       this.maxEligibilityTotal = res.data.results[0].maxEligibilityTotal;
  //       this.applicableAllowanceTotal = res.data.results[0].applicableAllowanceTotal;
        
  //     });
  //   }

    getComputationSummaryPage() {
   this.childhostelallowanceService.getComputation().subscribe((res) => {
      this.summaryGridData = res.data.results[0].childHostelAllowanceComputationList;
      this.baseTotal = res.data.results[0].baseTotal;
      this.arrearTotal = res.data.results[0].arrearTotal;
      this.total = res.data.results[0].total;
      this.maxEligibilityTotal = res.data.results[0].maxEligibilityTotal;
      this.applicableAllowanceTotal = res.data.results[0].applicableAllowanceTotal;
      
    });
  }

  getMasterSummary() {
    this.childhostelallowanceService.getSummaryTable().subscribe((res) => {
      console.log(res);
      this.masterGridData = res.data.results[0];
      this.masterGridData.forEach((element) => {
        // element.policyStartDate = new Date(element.policyStartDate);
        // element.policyEndDate = new Date(element.policyEndDate);
        // element.fromDate = new Date(element.fromDate);
        // element.toDate = new Date(element.toDate);
      });
       
     });
   }
  showtable(){
    this.showData = !this.showData
    console.log(this.showData);
    // this.getFamilyInfo();
  }

    opencomputationModal(template1: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
        template1,
        Object.assign({}, { class: 'gray modal-xl' }),
      );

    
    }
   //-------------- Family Member List API call ---------------------------
//    getFamilyInfo(){
//    this.childhostelallowanceService.getFamilyInfo().subscribe((res) => {
//      console.log(res);
//     this.familyMemberGroup = res.data.results;
//     res.data.results.forEach((element) => {
//       const obj = {
//         label: element.familyMemberName,
//         value: element.familyMemberName,
//       };
//       this.familyMemberName.push(obj);
//     });
//   });
// }
  
  
  
  //  //----------- Family relationship shown on Policyholder selection ---------------
  //  OnSelectionfamilyMemberGroup() {
  //   const toSelect = this.familyMemberGroup.find(
  //     (c) => c.familyMemberName === this.form.get('hostelstayingchild').value
  //   ),
  //   this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
  //   this.form.get('age').setValue(toSelect.age);
  // }
    
    
   
  
}
