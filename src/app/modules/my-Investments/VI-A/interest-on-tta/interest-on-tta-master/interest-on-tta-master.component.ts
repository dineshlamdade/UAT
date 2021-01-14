import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../../file.service';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { InterestOnTtaService } from '../interest-on-tta.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-interest-on-tta-master',
  templateUrl: './interest-on-tta-master.component.html',
  styleUrls: ['./interest-on-tta-master.component.scss']
})
export class InterestOnTtaMasterComponent implements OnInit {

  public modalRef: BsModalRef;
  public submitted = false;
  public pdfSrc =
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  public pdfSrc1 = 'https://www.gstatic.com/webp/gallery/1.jpg';
  public name = 'Set iframe source';
  public urlSafe: SafeResourceUrl;
  public summarynew: any = {};
  public summaryGridData: Array<any> = [];
  public summaryComputationGridDate: any;
  public masterGridData: Array<any> = [];
  public paymentDetailGridData: Array<any> = [];
  public declarationGridData: Array<any> = [];
  public familyMemberGroup: Array<any> = [];

  public familyMemberNameList: Array<any> = [];

  public transactionDetail: Array<any> = [];
  public documentDetailList: Array<any> = [];
  public uploadGridData: Array<any> = [];
  public transactionInstitutionNames: Array<any> = [];
  public editTransactionUpload: Array<any> = [];
  public transactionPolicyList: Array<any> = [];
  public transactionInstitutionListWithPolicies: Array<any> = [];



  public urlArray: Array<any> = [];
  public urlIndex: number;
  public glbalECS: number;
  public Index: number;
  public showUpdateButton: boolean;
  public tabIndex = 0;
  public radioSelected: string;
  public familyRelationSame: boolean;

  public documentRemark: any;

  public masterfilesArray: File[] = [];
  public receiptNumber: number;
  public receiptAmount: string;
  public receiptDate: Date;
  public selectedInstitution: string;
  public policyDuplicate: string;
  public sumDeclared: any;
  public enableCheckboxFlag2: any;
  public greaterDateValidations: boolean;
  public policyMinDate: Date;
  public paymentDetailMinDate: Date;
  public paymentDetailMaxDate: Date;
  public minFormDate: Date;
  public maxFromDate: Date;
  public financialYearStart: Date;
  public employeeJoiningDate: Date;
  public windowScrolled: boolean;
  public addNewRowId: number;
  public declarationTotal: number;
  public declaredAmount: number;
  public actualTotal: number;
  public actualAmount: number;
  public hideRemarkDiv: boolean;
  public hideRemoveRow: boolean;
  public isClear: boolean;
  public isCancel: boolean;
  public financialYear: any;
  public financialYearStartDate: Date;
  public financialYearEndDate: Date;
  public today = new Date();

  public transactionStatustList: any;
  public globalInstitution: String = 'ALL';
  public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL';

  public globalAddRowIndex: number;
  public globalSelectedAmount: string;
  //bank master
  public summaryHtmlDataList = [];
  public showButtonSaveAndReset = true;
  public isActivateButton: number;
  public isEditMode = false;
  public isSaveAndReset = true;
  public form: any = FormGroup;
  public ifscCodeList = [];
  public countryCode = [];
  public stateNameList: Array<any> = [];
  public bankNameLsit: Array<any> = [];

  public bankMasterDetailsResponse: any;
  public selectedState: string;
  public selectedBankName: string;
  public editedRecordIndex:number =0;
  public viewMode:boolean = false;
  public bankIFSC:any;
  public  TotalIFSCcodeList: Array<any> = [];
  public  stateList: Array<any> = [];



  constructor(
    private formBuilder: FormBuilder,
    private myInvestmentsService: MyInvestmentsService,
    private interestOnTtaService: InterestOnTtaService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private fileService: FileService,
    private numberFormat: NumberFormatPipe,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
    @Inject(DOCUMENT) private document: Document,
    public sanitizer: DomSanitizer
  ) {

    this.addNewRowId = 0;
    this.hideRemarkDiv = false;
    this.hideRemoveRow = false;
    this.isClear = false;
    this.isCancel = false;
    this.receiptAmount = this.numberFormat.transform(0);
    this.globalAddRowIndex = 0;
    this.globalSelectedAmount = this.numberFormat.transform(0);
    this.initiateMasterForm();

    this.bankNameLsit = [
      { label: 'Bank of India', value: 'BankofIndia' },
      { label: 'Indian Bank', value: 'IndianBank' },
      { label: 'Bank of Baroda', value: 'BankofBaroda' },
      { label: 'Canara Bank', value: 'CanaraBank' },
    ];
  }

  public ngOnInit(): void {
    this.interestOnTtaService.getStateInfoList().subscribe((res) => {
      this.stateList = res.data.results;
    });
    this.refreshHtmlTable();

  }

    // initiate Reactive Master Form
    initiateMasterForm() {
      this.form = this.formBuilder.group({
        // familyMemberName: new FormControl(null, Validators.required),
        // relationship: new FormControl({value: null, disabled: true },Validators.required),

        // familyMemberInfoId: new FormControl(null, Validators.required),
        // ifscCode: new FormControl(null, Validators.required),
        // state:  new FormControl(null, Validators.required),
        // bankName: new FormControl(null,Validators.required),
        // branchName: new FormControl({value: null, disabled: true },Validators.required),
        // bankAddress: new FormControl({value: null, disabled: true },Validators.required),
        // accountNumber: new FormControl(null, Validators.required),

        savingBankMasterId: new FormControl(null),
        ifscCode: new FormControl(''),
        bankName: new FormControl('', Validators.required),
        branchName: new FormControl({ value: '', disabled: true },Validators.required),
        branchAddress: new FormControl({ value: '', disabled: true }),
        state: new FormControl(''),
        accountNumber: new FormControl(null, Validators.required),
      });
    }

  refreshHtmlTable(){
    this.summaryHtmlDataList = [];
    this.bankMasterDetailsResponse={};
    this.interestOnTtaService.get80TTAMaster().subscribe((res) => {
      console.log('getTTA Master',res);
      this.bankMasterDetailsResponse = res.data.results;

      let i = 1;
      res.data.results.forEach((element) => {
        const obj = {
          SrNo: i++,
          bankName: element.bankName,
          branchName: element.branchName,
          companyBankMasterId: element.companyBankMasterId,
          ifscCode: element.ifscCode,
          isActive: element.isActive,
        };
        this.summaryHtmlDataList.push(obj);
        console.log( this.summaryHtmlDataList);
      });
    });
  }
  getIFSCCodeList(bankIFSC) {
    if (bankIFSC.length < 11) {
      // this.BankInformationModel.bankName = '';
      // this.BankInformationModel.branchName = '';
      // this.BankInformationModel.branchAddress = '';
      // this.confirmAccountNumber = '';
      // this.BankInformationModel.accountNo = '';
      // this.BankInformationModel.nameAsPerBank = '';
    }
    if (bankIFSC.length == 11) {
      this.IFSCDetails(bankIFSC);
    }
    if (bankIFSC) {
      // this.gridEditIFSC1 = bankIFSC
      // this.IFSCGridDetails(bankIFSC);
    }
  }
  IFSCDetails(bankIFSC) {
    if(bankIFSC.length == 11) {
    this.interestOnTtaService.getIFSCCodeList(bankIFSC).subscribe(res => {

      console.log(res);
      this.form.patchValue({
        branchName: res.data.results[0].branchName,
        branchAddress: res.data.results[0].address,
        bankName: res.data.results[0].bankName,
      });

    });
  }
  }
  onSelectIFSCCode(evt: any) {
    if (evt.length == 11) {

    console.log('evt::==', evt);
    this.interestOnTtaService.getIFSCCodeList(evt).subscribe((res) => {
      console.log(res);
      this.form.patchValue({
        branchName: res.data.results[0].branchName,
        branchAddress: res.data.results[0].address,
        bankName: res.data.results[0].bankName,
      });
    });
  }
  }

  // DeleteBankMaster(i: number,companyBankMasterId:number) {
  //   console.log(this.editedRecordIndex);
  //   this.interestOnTtaService.deleteCompanyBankMaster(companyBankMasterId).subscribe((res) => {
  //     console.log(res);

  //       this.alertService.sweetalertMasterSuccess('Bank Master  Deleted Successfully.', '');
  //       this.isSaveAndReset = true;
  //       this.showButtonSaveAndReset = true;
  //       this.refreshHtmlTable();


  //     //  else {
  //     //     this.alertService.sweetalertError(error.error['status'].messsage);
  //     // }

  //   },
  //   (error: any) => {
  //     this.alertService.sweetalertError(error.error['status'].messsage);
  //   }, () => {
  //   });

  // }

  saveBankMaster() {

    const data = ({
      ifscCode: this.form.get('ifscCode').value,
      bankName: this.form.get('bankName').value,
      branchName: this.form.get('branchName').value,

    });
    console.log(JSON.stringify(data));

    this.interestOnTtaService.uploadMultiple80TTAMasterFiles(this.masterfilesArray, data).subscribe((res) => {
      console.log(res);
      if (res.data.results.length !== 0) {
        this.alertService.sweetalertMasterSuccess('Bank Master Added Successfully.', '');
        this.isSaveAndReset = true;
        this.form.reset();
        this.showButtonSaveAndReset = true;
        this.refreshHtmlTable();
      } else {
      //  this.alertService.sweetalertError(error.error['status'].messsage);
     // this.alertService.sweetalertError(error.error['status'].messsage);
     this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
      }
    }, (error: any) => {
      //this.alertService.sweetalertError(error.error['status'].messsage);
      this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

    });

  }
  onSelectState(evt: any) {
    this.selectedState = evt;
   this.bankIFSC ='';
    // this.ifscCodeList = [];
    // this.interestOnTtaService.getIfscCodeStateWise(evt).subscribe((res) => {
    //  this.ifscCodeList = res.data.results;
    // }   , (error: any) => {
    //   this.alertService.sweetalertError(error.error['status'].messsage);

    // });

  }
  editMaster(i: number,companyBankMasterId:number) {
    this.isEditMode = true;
    this.viewMode = false;
    this.editedRecordIndex = companyBankMasterId;
    this.form.patchValue(this.bankMasterDetailsResponse[i]);
    this.ifscCodeList.push(this.bankMasterDetailsResponse[i].ifscCode);
      this.form.patchValue({
        branchName: this.summaryHtmlDataList[i].branchName,
        branchAddress: this.summaryHtmlDataList[i].branchAddress,
        bankName: this.summaryHtmlDataList[i].bankName,
      });
    }
  viewMaster(i: number) {
    this.viewMode = true;
    this.isEditMode =true;
    console.log(this.bankMasterDetailsResponse[i]);
    this.form.patchValue(this.bankMasterDetailsResponse[i]);
    this.ifscCodeList.push(this.bankMasterDetailsResponse[i].ifscCode);
      this.form.patchValue({
        branchName: this.summaryHtmlDataList[i].branchName,
        branchAddress: this.summaryHtmlDataList[i].branchAddress,
        bankName: this.summaryHtmlDataList[i].bankName,
      });
      this.form.disable();
   }
  cancelView() {
    this.form.reset();
    this.ifscCodeList = [];
    this.isEditMode = false;
    this.isSaveAndReset = true;
    this.showButtonSaveAndReset = true;
    this.editedRecordIndex = 0;
    this.form.enable();
    this.form.get('branchName').disable();
    this.form.get('branchAddress').disable();
   }

  activateBankMaster() { }
  searchIFSC(searchTerm, bankIFSC) {
    this.form.patchValue({
      branchName:'',
      branchAddress: '',
      bankName:'',
    });

    if (searchTerm.query.length < 11) {
      this.ifscCodeList = []

    }
    if (bankIFSC.length < 11) {
      // this.BankInformationModel.bankName = '';
      // this.BankInformationModel.branchName = '';
      // this.BankInformationModel.branchAddress = '';
      // this.confirmAccountNumber = '';
      // this.BankInformationModel.accountNo = '';
      // this.BankInformationModel.nameAsPerBank = '';
    }
    if (searchTerm.query.length == 2) {
      // setTimeout(() => {
      this.interestOnTtaService.searchIFSC(searchTerm.query, this.form.get('state').value).subscribe(res => {
        console.log(res);
        this.ifscCodeList = res.data.results[0];
        this.TotalIFSCcodeList = res.data.results[0];
        if (this.ifscCodeList.length > 0) {
          this.filterIFSCCodes(searchTerm.query);
        } else {
         // this.alertService.sweetalertError('Record Not Found');
          // this.notifyService.showError ('Recordnot found', "Error..!!")
        }
      });
      // }, 1500)
    }
    this.filterIFSCCodes(searchTerm.query);

    if (bankIFSC.length == 11) {
      const ifsc = this.TotalIFSCcodeList.filter((item) => {
        return item == searchTerm.query;
      });
      if (ifsc == searchTerm.query) {
         this.IFSCDetails(searchTerm.query);
      }
    }
  }


  filterIFSCCodes(searchTerm) {
    if (searchTerm.length > 2) {
      searchTerm = searchTerm.toLowerCase();
      const ifsc = this.TotalIFSCcodeList.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(searchTerm);
      });
      this.ifscCodeList = ifsc;
      // this.GridIFSCcodeList = ifsc;
      // this.showOptios = true;
    }
  }
}
