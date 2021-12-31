import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ExcelserviceService } from '../../excel_service/excelservice.service';
import { LoanService } from '../loan.service';
import jspdf from 'jspdf';
import * as _html2canvas from "html2canvas";
import { Router } from '@angular/router';
const html2canvas: any = _html2canvas;
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-loan-approval',
  templateUrl: './loan-approval.component.html',
  styleUrls: ['./loan-approval.component.scss']
})
export class LoanApprovalComponent implements OnInit {
  LoanForm: FormGroup;
  public modalRef: BsModalRef;
  excelData: any[];
  summaryData: any=[];
  loandata: any = '';
  searchText:string;
  editflag: boolean = false;
  loanApplicationSummary: any;
  loanAppList = [];
  getTrasactionTypeData: any;
  trasactionType: any;
  userData: any;
  employeeMasterId: any;
  perticularEmpDetails: any;
  selectedEmpId: any;
  empCode: any;
  empFullName: any;
  header: any[];
  customer: any;
  loanApprovalSummary: any;
  trasactionLength: any;
  submittedStatusLength: any;
  sendBackStatusLength: any;
  approvedStatusLength: any;
  totalStatus: any;
  loanNo: any;
  lonType: any;
  getTrasactionTypeDataforSummary: any;
  loanAppNo: any;
  loanApplicationNumberFlag:boolean=true;
  loanAppNoFlag:boolean=false;
  loneTypeForSummary: any;
  loantypenormal:boolean = true;
  loantypeForSummary:boolean = false
  forOtherTrasaction:boolean = false;
  forLoanApplication:boolean = true;
  forOtherTrasaction1:boolean = false;
  forLoanApplication1:boolean = true;
  closedStatusLength: number;
  ListOfDocuments: any;
  public masterfilesArray: File[] = [];
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public urlSafe: SafeResourceUrl;
  fillterobject: any[] = [];
  allTableFlag: boolean = true;
  listOfDocuments :any = [];
  inprocessStatusLength: number;
  getLoanHistoryData: any;
  proofSubmissionId: any;
  getDocumentForViewData: any =[];
  selectedloandata: any = [];
  array: any;
  docLength: any;
  deviationData:any = [];
  loanTrasactionType: any;
  postApproverDetailsData: any;
  approverEmpRoleName: any;
  approverEmpCode: any;
  sequence: any;
  approverName: any;
  loanApplicationId: any;
  selectedAllFlag: boolean ;
  typeOfTrasaction: any;
  noOfInstallmentToReschedule: any;
  propsedEMI: any;
  settlmentDate: any;
  totalAmount: any;
  normalPerticular:boolean = true;
  settlementPerticular:boolean = false;
  hideShowRemark :boolean = false;
  approvalRemark: any;
  index:number;
  selectedIndex: any = -1;
  getscheduleData: any;
  statusForDoc: any;
  docType: any;
  getAllDataForLoanApprovalSummaryLength: any;
  tempdata: any;
  selectedEmpId2: any;
  selectedEmpId3: any;
  userName: any;
  companyId: any;
  cuurentDate = new Date();
  constructor(public formBuilder : FormBuilder,
    private modalService: BsModalService, private loanservice:LoanService,
    private datePipe: DatePipe,private excelservice: ExcelserviceService ,private alertService: AlertServiceService,
    private authService: AuthService, public sanitizer: DomSanitizer,private router: Router,) {
    this.LoanForm = this.formBuilder.group({

        // "searchText": new FormControl(''),

      })
        this.userData = this.authService.getprivileges()
        this.employeeMasterId = this.userData.UserDetails.employeeMasterId; // for login
        this.userName = this.userData.UserDetails.userName;
        this.companyId = this.userData.UserDetails.companyId;
        // console.log(" this.companyId ", this.companyId )
        // console.log(" this.userData ", this.userData )

     }


     ngOnInit(): void {
      // this.trasactionType= 'Loan Application'
      this.getAllDataForLoanApprovalSummary(); // pending
      // this.getTrasactionType();
      // this.getLoanHistory();
      this.postApproverDetails(); //approval details api
      this.getallScheduleData();
        }

        deviation(template: TemplateRef<any>,user) // deviation details pop up
        {
          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg' })
          );
          // console.log("userdata",user)
          this.empCode = user.employeeMaster.employeeCode;
          this.empFullName = user.employeeMaster.fullName;
          this.loanNo = user.loanApplicationNumber;
          this.lonType = user.loanMaster.loanCode;
          this.deviationData = user.deviations;
          // console.log("deviationData",this.deviationData)

        }

        empcodepopup(template1: TemplateRef<any>,user) //emp details pop up
        {
          this.modalRef = this.modalService.show(
            template1,
            Object.assign({}, { class: 'gray modal-lg' })
          );

          this.selectedEmpId = user.employeeMaster.employeeMasterId;
          // console.log("employee user",this.selectedEmpId)
        }

        loanHistoryPopUp(template2: TemplateRef<any>)
        {
          this.modalRef = this.modalService.show(
            template2,
            Object.assign({}, { class: 'gray modal-lg' })
          );
        }

        inProcessStatusPopup(template4: TemplateRef<any>)
        {
          this.modalRef = this.modalService.show(
            template4,
            Object.assign({}, { class: 'gray modal-lg' })
          );
        }

        masterRemarkModal(template2: TemplateRef<any>)
        {
          this.modalRef = this.modalService.show(
            template2,
            Object.assign({}, { class: 'gray modal-lg' })
          );
        }


        loanSchedulePopUp(template7: TemplateRef<any>)
        {
          this.modalRef = this.modalService.show(
            template7,
            Object.assign({}, { class: 'gray modal-lg' })
          );

        }

        getallScheduleData() { // schdule api calling

          this.loanservice.getallScheduleData(363).subscribe(res => {
            this.getscheduleData = res.data.results[0];
          })
        }

        forwardScreenPopUP(template6: TemplateRef<any>){
          this.modalRef = this.modalService.show(
            template6,
            Object.assign({}, { class: 'gray modal-lg' })
          );
        }
        selectTrasactionType(value) // trasaction type change selection
        {
          this.trasactionType = ''
          this.trasactionType = value;
          // this.getTrasactionType();

          if(value == 'All'){
            this.getAllDataForLoanApprovalSummary();
          }else{
          this.getTrasactionType();
        }




        }

        selectedLoan($event,user,index) //checkbox selection for loan approval
        {

          if(user.employeeMaster){
            this.selectedEmpId3 = user.employeeMaster.employeeMasterId;
          }else{
            this.selectedEmpId3 = user.employeeMasterId;
          }

          if($event.checked){
            this.selectedloandata.push(user);
          this.selectedloandata.forEach(element => {
            element.approvalRemark = ''
          });
          this.loanTrasactionType = this.selectedloandata[0].transactionType;
          }else{
            if(this.selectedloandata > 0){
              this.selectedloandata.forEach((element, index) => {
                if(element.loanApplicationId == user.loanApplicationId){
                  let i = index
                  this.selectedloandata.splice(i ,1 )

                }else{
                  this.selectedloandata = [];
                }
              });
            }
          }
            this.selectedIndex = index
            // console.log("index: "+ JSON.stringify(this.getTrasactionTypeDataforSummary[index]))
            this.getTrasactionTypeDataforSummary[index].invalidText = true
            // alert()
            if(user.status == 'Send Back'){
            this.hideShowRemark = true;
            }else{
            this.hideShowRemark = false;

            }

        }

        remarkValidation(value,index,user){


          this.selectedloandata.forEach(element => {
            if(element.loanApplicationId == user.loanApplicationId){
              element.approvalRemark = value
            }
          });

        }
        startApproval(){
          if(this.loanTrasactionType == 'Loan Application'){
          this.router.navigate(['/add-new-loan'])
          localStorage.setItem('selectedLoanForApproval',JSON.stringify(this.selectedloandata))
          }
          else if(this.loanTrasactionType == 'Disbursement' ){
          this.router.navigate(['/loan/disbursement']);
          localStorage.setItem('selectedLoanForApproval',JSON.stringify(this.selectedloandata))
             }
          else if(this.loanTrasactionType == 'Adhoc' ){
          this.router.navigate(['/loan/adhoc']);
          localStorage.setItem('selectedLoanForApproval',JSON.stringify(this.selectedloandata))
             }
          else if(this.loanTrasactionType == 'Reschedule' ){
          this.router.navigate(['/loan/rescheduleRequest']);
          localStorage.setItem('selectedLoanForApproval',JSON.stringify(this.selectedloandata))
             }
          else if(this.loanTrasactionType == 'Settlement' ){
          this.router.navigate(['/loan/settlementRequest']);
          localStorage.setItem('selectedLoanForApproval',JSON.stringify(this.selectedloandata))

             }
        }

// .......................API.......................................................................

      getEmpMasterDetails(){ // emp details pop up api
        console.log("this.selectedEmpId2",this.selectedEmpId2)
        this.loanservice.getEmpMasterDetails(this.selectedEmpId2).subscribe(
          res=>{
            this.perticularEmpDetails = res.data.results[0][0];
            // console.log(" this.perticularEmpDetails", this.perticularEmpDetails)
          })
      }

      getAllDataForLoanApprovalSummary() //table summary api
      {
      this.loanservice.getAllDataForLoanApprovalSummary().subscribe(res =>
        {
          this.getTrasactionTypeDataforSummary = []
          res.data.results.forEach(element => {
            if(this.userName != 'AjayS'){
            element.loanApplication.forEach(ele => {
              ele.transactionType = 'Loan Application'
              this.getTrasactionTypeDataforSummary.push(ele)
            });
            element.loanSettlement.forEach(ele => {
              ele.transactionType = 'Settlement'
              this.getTrasactionTypeDataforSummary.push(ele)
            });
          }
            element.loanDisbursementPaymentDetails.forEach(ele => {
              ele.transactionType = 'Disbursement'
              this.getTrasactionTypeDataforSummary.push(ele)
            });
            element.adhocPaymentDetails.forEach(ele => {
              ele.transactionType = 'Adhoc'
              this.getTrasactionTypeDataforSummary.push(ele)
            });
            element.loanRescheduleDetails.forEach(ele => {
              ele.transactionType = 'Reschedule'

              this.getTrasactionTypeDataforSummary.push(ele)
            });


// .............................For All Trasaction type count ....................................................
          });
          this.submittedStatusLength = 0;
          this.getTrasactionTypeDataforSummary.forEach(element => {
            let status = element.status
            if(status == 'submitted' || status == 'Submitted'){
            this.submittedStatusLength  = this.submittedStatusLength + 1;
            }
          });
          this.inprocessStatusLength = 0 ;
          this.getTrasactionTypeDataforSummary.forEach(element => {
            let status = element.status
            if(status == 'inprocess' || status == 'InProcess'){
            this.inprocessStatusLength  = this.inprocessStatusLength + 1;
            }
          });

          this.sendBackStatusLength = 0;
          this.getTrasactionTypeDataforSummary.forEach(element => {
            let status = element.status
            if( status == 'Send Back'){
            this.sendBackStatusLength  = this.sendBackStatusLength + 1;
            }
          });

          this.approvedStatusLength = 0;
          this.getTrasactionTypeDataforSummary.forEach(element => {
            let status = element.status
            if(status == 'approved' || status == 'Approved'){
            this.approvedStatusLength  = this.approvedStatusLength + 1;
            }
          });

          this.closedStatusLength = 0;
          this.getTrasactionTypeDataforSummary.forEach(element => {
            let status = element.status
            if(status == 'Closed'){
            this.closedStatusLength  = this.closedStatusLength + 1;
            }
          });
          this.totalStatus =  this.submittedStatusLength + this.sendBackStatusLength + this.approvedStatusLength
           + this.closedStatusLength + this.inprocessStatusLength;

// .............................End For All Trasaction type count ....................................................


          this.getTrasactionTypeDataforSummary.forEach(element => {

            if(element.loanApplicationNumber != null){
              element.loanApplicationNumber = element.loanApplicationNumber
            }else{
              element.loanApplicationNumber = element.applicationNumber;
            }

           // element.transactionType = this.trasactionType;
            if(element.loanMaster != null){
              element.loneTypeForSummary = element.loanMaster.loanCode;
            }else{
              element.loneTypeForSummary = element.loanType
            }

            if(element.employeeMaster != null){
              element.fullName = element.employeeMaster.fullName;
              element.empCode = element.employeeMaster.employeeCode;
            }else{
              element.fullName = element.employeeName
              element.empCode = element.employeeCode
            }
          });

          this.fillterobject = this.getTrasactionTypeDataforSummary
        //  console.log("this.loanApprovalSummary",this.getTrasactionTypeDataforSummary)
        })
      }

      getTrasactionType() // get count for status details
      {
        this.loanservice.getTrasactionType(this.trasactionType).subscribe(res =>
          {
            this.getTrasactionTypeData = res.data.results;
            this.fillterobject = res.data.results[0]
            this.getTrasactionTypeDataforSummary = res.data.results[0];
            this.getTrasactionTypeDataforSummary.forEach(element => {

              if(element.loanApplicationNumber != null){
                element.loanApplicationNumber = element.loanApplicationNumber
              }else{
                element.loanApplicationNumber = element.applicationNumber;
              }

              element.transactionType = this.trasactionType;

              if(element.loanMaster != null){
                element.loneTypeForSummary = element.loanMaster.loanCode;
              }else{
                element.loneTypeForSummary = element.loanType
              }

              if(element.employeeMaster != null){
                element.fullName = element.employeeMaster.fullName;
                element.empCode = element.employeeMaster.employeeCode;
              }else{
                element.fullName = element.employeeName
                element.empCode = element.employeeCode
              }
              // if(element.status)

            });

            this.submittedStatusLength = 0 ;
            this.getTrasactionTypeData[0].forEach(element => {
              let status = element.status
              if(status == 'submitted' || status == 'Submitted'){
              this.submittedStatusLength  = this.submittedStatusLength + 1;
              }
            });

            this.inprocessStatusLength = 0 ;
            this.getTrasactionTypeData[0].forEach(element => {
              let status = element.status
              if(status == 'inprocess' || status == 'InProcess'){
              this.inprocessStatusLength  = this.inprocessStatusLength + 1;
              }
            });

            this.sendBackStatusLength = 0;
            this.getTrasactionTypeData[0].forEach(element => {
              let status = element.status
              if( status == 'Send Back'){
              this.sendBackStatusLength  = this.sendBackStatusLength + 1;
              }
            });

            this.approvedStatusLength = 0;
            this.getTrasactionTypeData[0].forEach(element => {
              let status = element.status
              if(status == 'approved' || status == 'Approved'){
              this.approvedStatusLength  = this.approvedStatusLength + 1;
              }
            });

            this.closedStatusLength = 0;
            this.getTrasactionTypeData[0].forEach(element => {
              let status = element.status
              if(status == 'Closed'){
              this.closedStatusLength  = this.closedStatusLength + 1;
              }
            });
            this.totalStatus =  this.submittedStatusLength + this.sendBackStatusLength + this.approvedStatusLength
             + this.closedStatusLength + this.inprocessStatusLength;

          })
      }

      getLoanHistory(){ //loan history pop up data
        this.loanservice.getLoanHistory(this.selectedEmpId3).subscribe(res =>
          {
            this.getLoanHistoryData = res.data.results[0];
          })
      }

      getDocumentForView(){ //document view api  data
        this.loanservice.getDocumentForView(this.proofSubmissionId).subscribe(res =>
          {
            this.getDocumentForViewData = res.data.results[0];
            this.docLength = this.getDocumentForViewData.length;
            console.log( " this.getDocumentForViewData",this.getDocumentForViewData)
          })
      }

      sendBackRemark(user,index){
        this.selectedIndex = index

        // console.log("index: "+ JSON.stringify(this.getTrasactionTypeDataforSummary[index]))
        this.getTrasactionTypeDataforSummary[index].invalidText = true
        // alert()
        if(user.status == 'Send Back'){
        this.hideShowRemark = true;
        }else{
        this.hideShowRemark = false;

        }
      }

// ......................................on tile click chg the table .......................................
submittedClick(){
this.getTrasactionTypeDataforSummary = []
// this.allTableFlag = false
// console.log(JSON.stringify(this.fillterobject))
 this.fillterobject.forEach(element => {
  if(element.status == "Submitted" || element.status == "submitted")
    {
      // element.invalidText = false
    this.getTrasactionTypeDataforSummary.push(element)
    // console.log("element",element)
    }
 });
}

inProcessClick()
{
  this.getTrasactionTypeDataforSummary = []
  // this.allTableFlag = false
   this.fillterobject.forEach(element => {
    if(element.status == "inprocess" || element.status == "InProcess" )
      {
        // element.invalidText = false
      this.getTrasactionTypeDataforSummary.push(element)
      // console.log("element",element)
      }
   });
}

sendBackClick(){
  this.getTrasactionTypeDataforSummary = []
  // this.allTableFlag = false
   this.fillterobject.forEach(element => {
    if(element.status == "Send Back")
      {
        // element.invalidText = false
      this.getTrasactionTypeDataforSummary.push(element)
      // console.log("element",element)
      }
   });
}

approvedClick(){
  this.getTrasactionTypeDataforSummary = []
// this.allTableFlag = false
  this.fillterobject.forEach(element => {
   if(element.status == "approved" || element.status == "Approved" )
     {
      // element.invalidText = false
      this.getTrasactionTypeDataforSummary.push(element)
    //  console.log("element",element)
     }
  });
}

closedClick()
{
  this.getTrasactionTypeDataforSummary = []
  // this.allTableFlag = false
   this.fillterobject.forEach(element => {
    if(element.status == "Closed")
      {
        // element.invalidText = false
      this.getTrasactionTypeDataforSummary.push(element)
      // console.log("element",element)
      }
   });
}
totalClick(){
  //this.fillterobject = []
  this.allTableFlag = true;
  console.log("this.trasactionType",this.trasactionType)
  if(this.trasactionType == undefined){
  this.getAllDataForLoanApprovalSummary() //table summary api
  }else{
    this.getTrasactionType();

  }
}

      editLoanApprovalForm(user) // loan approval page edit
      {
        localStorage.clear();

        if(this.trasactionType == 'Loan Application' ){
          localStorage.setItem('EditLoanApprovalData',JSON.stringify(user))
          this.router.navigate(['/loan/add-new-loan']);
          }
       else if(this.trasactionType == 'Disbursement' ){
         localStorage.setItem('EditLoanApprovalData',JSON.stringify(user))
         this.router.navigate(['/loan/disbursement']);
          }
       else if(this.trasactionType == 'Adhoc' ){
          localStorage.setItem('EditLoanApprovalData',JSON.stringify(user))
          this.router.navigate(['/loan/adhoc']);
          }
       else if(this.trasactionType == 'Reschedule' ){
          localStorage.setItem('EditLoanApprovalData',JSON.stringify(user))
          this.router.navigate(['/loan/rescheduleRequest']);
          }
        else if(this.trasactionType == 'Settlement' ){
          localStorage.setItem('EditLoanApprovalData',JSON.stringify(user))
          this.router.navigate(['/loan/settlementRequest']);
          }
        this.editflag = true;
      }

      viewLoanApprovalForm(user) // loan approval page view
      {
        localStorage.clear();
        if(this.trasactionType == 'Loan Application' ){
          localStorage.setItem('ViweLoanApprovalData',JSON.stringify(user))
          this.router.navigate(['/loan/add-new-loan']);
          }
       else if(this.trasactionType == 'Disbursement' ){
         localStorage.setItem('ViweLoanApprovalData',JSON.stringify(user))
         this.router.navigate(['/loan/disbursement']);
          }
       else if(this.trasactionType == 'Adhoc' ){
          localStorage.setItem('ViweLoanApprovalData',JSON.stringify(user))
          this.router.navigate(['/loan/adhoc']);
          }
       else if(this.trasactionType == 'Reschedule' ){
          localStorage.setItem('ViweLoanApprovalData',JSON.stringify(user))
          this.router.navigate(['/loan/rescheduleRequest']);
          }
        else if(this.trasactionType == 'Settlement' ){
          localStorage.setItem('ViweLoanApprovalData',JSON.stringify(user))
          this.router.navigate(['/loan/settlementRequest']);
          }
        this.editflag = false;
      }


 // .......................................Excel and PDF Code.................................................
             exportAsXLSX(): void {
              this.excelData = [];
              this.header = []
              this.header =["loan Application Number","Create DateTime","Employee Code","Full Name","Payroll Area",
             "loan Type", "Trasaction Type", "Approved Amount","Status",]
              this.loanApprovalSummary.forEach(element => {
                let obj = {
                  "loan Application Number":element.loanApplicationNumber,
                  "Create DateTime":element.createDateTime,
                  "Employee Code": element.employeeMaster.employeeCode,
                  "Full Name": element.employeeMaster.fullName,
                  "Payroll Area": element.payrollArea,
                  "loan Type": element.loanMaster.loanCode,
                  "Trasaction Type": element.Type,
                  "Approved Amount": element.approvedAmount,
                  // "loan Amnt":element.loanAmnt,
                  "Status": element.status,

                }
                this.excelData.push(obj)
              });
              this.excelservice.exportAsExcelFile(this.excelData, 'Loan Summary','Loan Summary',this.header);

            }

//  ........................................doc view................................................................

        public document(template3: TemplateRef<any>, user) {
          this.ListOfDocuments = document;
          this.urlIndex = 0;
            this.proofSubmissionId = user.proofSubmissionId;
            // console.log("user",user)
            // console.log("user.proofSubmissionId",user.proofSubmissionId)

            this.listOfDocuments = user.loanMaster.document;

            this.empCode = user.employeeMaster.employeeCode;
            this.empFullName = user.employeeMaster.fullName;
            this.loanNo = user.loanApplicationNumber;
            this.lonType = user.loanMaster.loanCode;
            this.statusForDoc  = user.status;
            this.docType = user.loanMaster.document[0].docType;

            console.log("user",user)
            console.log(" this.docType ", this.docType )

          this.modalRef = this.modalService.show(
            template3,
            Object.assign({}, { class: 'gray modal-xl' })
          );
        }

        photoURL(urlSafe) {
          return this.sanitizer.bypassSecurityTrustResourceUrl(urlSafe);
        }

        // Previous Doc Viewer
        public previousDocViewer() { //not yet used
          this.urlIndex = this.urlIndex - 1;
          this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.ListOfDocuments.documents[this.urlIndex].blobURI
          );
        }

        // Next Doc Viewer
        public nextDocViewer() { //not yet used
        this.urlIndex = this.urlIndex + 1;
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.ListOfDocuments.documents[this.urlIndex].blobURI
        );
        }
// ..................................forward screen pop up ...............................................

roleChange(value)
{
  this.postApproverDetailsData.forEach(element => {
    if(element.approverId == value)
    {
      this.approverEmpRoleName = element.approverEmpRole;
    }
  });
}

postApproverDetails() //approval details api
{
  let data =
  {
    // this.employeeMasterId -1
    // this.approvalWorkFlowIdd
    "employeeMasterId":1 ,
    "flag":"ApproversInfo",
    "workflowMasterHeaderId":20
  }
  this.loanservice.postApproverDetails(data).subscribe(res =>
    {
      this.postApproverDetailsData = res.data.results[0];
    this.postApproverDetailsData.forEach(element => {
    this.approverEmpCode = element.approverEmpCode;
    this.sequence = element.sequence;
    this.approverName = element.approverName;
    // console.log(" this.approverEmpCode", this.approverEmpCode);

    });

    })
}

postLoanApproval(value) //approval btn api
{
  let tempArray = [];
  let falg = false;
  this.selectedloandata.forEach(element => {
    // console.log("element",element)
    this.typeOfTrasaction = element.transactionType
    // if(element.approvalRemark != ''){
      // falg = true;
      tempArray.push({
        "action": "Done",
        "actionDate": "2021-11-25T11:34:28.400Z", //current date
        "active": true,
        "approverCode":element.approverEmpCode,
        "approverLevel": 'this.sequence',
        "approverName": element.approverName,
        "createDateTime": "2021-11-25T11:34:28.400Z",
        "createdBy": "string",
        "lastModifiedBy": "string",
        "lastModifiedDateTime": "2021-11-25T11:34:28.400Z",
        "loanApproverDetailId": 0,
        "loanApplicationId":element.loanApplicationId,
        "loanRescheduleRequestDetailsId": 0,
        "approvalRemark":element.approvalRemark,
        "status": value
      })
    // }else{
    //   this.alertService.sweetalertWarning('Please Enter Remark !!!')
    //   falg = false
    // }

  });

      console.log("this.postApproverDetailsData",JSON.stringify(tempArray));

      if(this.selectedloandata.length == tempArray.length){
        // alert()
      this.loanservice.postMultipleEmpSelectionForLoanApproval(tempArray).subscribe(res =>
          {
                this.alertService.sweetalertMasterSuccess(this.typeOfTrasaction +' ' +value+ ' Successfully!!', '' );
                this.router.navigate(['/loan/loan-approval']);
          })
      }
}
loanRemark(){
  let data = {
    "active": true,
    "createDateTime": "2021-12-28T06:07:46.546Z",
    "createdBy": "string",
    "date": "2021-12-28T06:07:46.546Z",
    "lastModifiedBy": "string",
    "lastModifiedDateTime": "2021-12-28T06:07:46.546Z",
    "loanApplicationId": 1,
    "loanDisbursementPaymentDetailsId": 0,
    "adhocPaymentDetailsId": 0,
    "loanRemarkDetailsId": 0,
    "loanRescheduleRequestDetailsId": 0,
    "loanSettlementPaymentDetailsId": 0,
    "remark": "Done"
  }
  this.loanservice.loanRemark(data).subscribe(res =>
    {
      this.alertService.sweetalertMasterSuccess("Remark add successfully",'');
    })
}
 }


