//import { error } from '@angular/compiler/src/util';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { id } from 'date-fns/locale';
import { combineLatest } from 'rxjs';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { BankMasterAtGroupService } from './bank-master-at-group.service';

@Component({
  selector: 'app-bank-master-at-group',
  templateUrl: './bank-master-at-group.component.html',
  styleUrls: ['./bank-master-at-group.component.scss'],
})
export class BankMasterAtGroupComponent implements OnInit {
  public summaryHtmlDataList = [];
  public showButtonSaveAndReset = true;
  public isActivateButton: number;
  public isEditMode = false;
  public isSaveAndReset = true;
  public form: any = FormGroup;
  public ifscCodeList = [];
  public countryCode = [];
  public stateList = [];

  public bankMasterDetailsResponse: any;
  public selectedState: string;
  public selectedBankName: string;
  public editedRecordIndex:number =0;
  public viewMode:boolean = false;
  public bankIFSC:any;
  public  TotalIFSCcodeList: Array<any> = [];



  constructor(private formBuilder: FormBuilder, private bankMasterAtGroupService: BankMasterAtGroupService, private alertService: AlertServiceService) {
    this.form = this.formBuilder.group({
      ifscCode: new FormControl(''),
      bankName: new FormControl('', Validators.required),
      branchName: new FormControl({ value: '', disabled: true },Validators.required),
      branchAddress: new FormControl({ value: '', disabled: true }),
      state: new FormControl(''),
    });

  }

  public ngOnInit(): void {
    this.bankMasterAtGroupService.getStates().subscribe((res) => {
      this.stateList = res.data.results;
    });
    this.refreshHtmlTable();

  }
  refreshHtmlTable(){
    this.summaryHtmlDataList = [];
    this.bankMasterDetailsResponse={};
    this.bankMasterAtGroupService.getBankMasterDetails().subscribe((res) => {
      console.log('getBankMasterDetails',res);
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
  getDataFromIFSC(bankIFSC) {
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
    this.bankMasterAtGroupService.getDataFromIFSC(bankIFSC).subscribe(res => {

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
    this.bankMasterAtGroupService.getDataFromIFSC(evt).subscribe((res) => {
      console.log(res);
      this.form.patchValue({
        branchName: res.data.results[0].branchName,
        branchAddress: res.data.results[0].address,
        bankName: res.data.results[0].bankName,
      });
    });
  }
  }

  DeleteBankMaster(i: number,companyBankMasterId:number) {
    console.log(this.editedRecordIndex);
    this.bankMasterAtGroupService.deleteCompanyBankMaster(companyBankMasterId).subscribe((res) => {
      console.log(res);

        this.alertService.sweetalertMasterSuccess('Bank Master  Deleted Successfully.', '');
        this.isSaveAndReset = true;
        this.showButtonSaveAndReset = true;
        this.refreshHtmlTable();


      //  else {
      //     this.alertService.sweetalertError(error.error['status'].messsage);
      // }

    }, (error: any) => {
      this.alertService.sweetalertError(error.error['status'].messsage);
    }, () => {
    });

  }
  saveBankMaster() {

    const saveData = ({
      ifscCode: this.form.get('ifscCode').value,
      bankName: this.form.get('bankName').value,
      branchName: this.form.get('branchName').value,

    });
    console.log(JSON.stringify(saveData));

    this.bankMasterAtGroupService.postBankMaster(saveData).subscribe((res) => {
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
    // this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
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
    // this.bankMasterAtGroupService.getIfscCodeStateWise(evt).subscribe((res) => {
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
      this.bankMasterAtGroupService.searchIFSC(searchTerm.query, this.form.get('state').value).subscribe(res => {
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
