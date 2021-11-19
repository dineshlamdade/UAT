import { Component, OnInit, TemplateRef, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { BankMasterAtGroupService } from './bank-master-at-group.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ExcelserviceService } from './../../../core/services/excelservice.service';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-bank-master-at-group',
  templateUrl: './bank-master-at-group.component.html',
  styleUrls: ['./bank-master-at-group.component.scss'],
})
export class BankMasterAtGroupComponent implements OnInit {
  public summaryHtmlDataList = [];
  public modalRef: BsModalRef;
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
  public editedRecordIndex: number = 0;
  public viewMode: boolean = false;
  public bankIFSC: any;
  public TotalIFSCcodeList: Array<any> = [];
  countries: Array<any> = [];
  public BankInformationModel: string = '';
  maxAccNumber: number;
  companyBankMasterId: number;
  isIfscCodeValid: boolean = false;

  header: any[];
  excelData: any[];

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private bankMasterAtGroupService: BankMasterAtGroupService,
     private alertService: AlertServiceService,private excelservice: ExcelserviceService) {
    this.form = this.formBuilder.group({
      ifscCode: new FormControl('', Validators.required),
      bankName: new FormControl({ value: '', disabled: true }),
      branchName: new FormControl({ value: '', disabled: true }),
      branchAddress: new FormControl({ value: '', disabled: true }),
      // state: new FormControl(''),
      country: new FormControl({ value: '', disabled: true }),
    });

  }

  public ngOnInit(): void {
    this.bankMasterAtGroupService.getLocationInformationOrCountryList().subscribe(res => {
      this.countries = res.data.results;
    }, (error) => {

    }, () => {
      this.form.get('country').setValue('India');
    });
    // this.bankMasterAtGroupService.getStates().subscribe((res) => {
    //   this.stateList = res.data.results;
    // });
    this.refreshHtmlTable();

  }
  refreshHtmlTable() {
    this.summaryHtmlDataList = [];
    this.bankMasterDetailsResponse = {};
    this.bankMasterAtGroupService.getBankMasterDetails().subscribe((res) => {
      console.log('getBankMasterDetails', res);
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
        console.log(this.summaryHtmlDataList);
      });
    });
  }
  getDataFromIFSC(bankIFSC) {
    this.isIfscCodeValid = false;
    if (bankIFSC.length < 11) {
      // this.BankInformationModel.bankName = '';
      // this.BankInformationModel.branchName = '';
      // this.BankInformationModel.branchAddress = '';
      // this.confirmAccountNumber = '';
      // this.BankInformationModel.accountNo = '';
      // this.BankInformationModel.nameAsPerBank = '';
      this.form.patchValue({
        bankName: '',
        branchName: '',
        branchAddress: '',

      })

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
    if (bankIFSC.length == 11) {
      this.bankMasterAtGroupService.getDataFromIFSC(bankIFSC).subscribe(res => {

        console.log(res);
        this.form.patchValue({
          branchName: res.data.results[0].branchName,
          branchAddress: res.data.results[0].address,
          bankName: res.data.results[0].bankName,
        });
        if (this.form.get('bankName').value.length > 0) {
          this.isIfscCodeValid = true;
        }


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





  getDataFromIFSC1(bankIFSC) {

    if (bankIFSC.length < 11) {
      this.form.patchValue({
        bankName: '',
        branchName: '',
        branchAddress: '',

      })

    }
    if (bankIFSC.length == 11) {
      this.IFSCDetails(bankIFSC);
    }
  }
  IFSCDetails1(bankIFSC) {

    this.bankMasterAtGroupService.getDataFromIFSC(bankIFSC).subscribe(res => {

      this.maxAccNumber = res.data.results[0].limit
      if (this.maxAccNumber == 0) {
        this.maxAccNumber = null;
      }

      this.form.patchValue({
        bankName: res.data.results[0].bankName,
        branchName: res.data.results[0].branchName,
        branchAddress: res.data.results[0].address,

      })


    });
  }




  DeleteBankMaster(companyBankMasterId: number) {
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
      //change bug 12
      branchAddress: this.form.get('branchAddress').value,

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

        this.alertService.sweetalertWarning(res.status.messsage);

        //  this.alertService.sweetalertError(error.error['status'].messsage);
        // this.alertService.sweetalertError(error.error['status'].messsage);
        // this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
      }
    }, (error: any) => {
      console.log(error);
      // this.alertService.sweetalertMasterSuccess('[error']['status']['messsage']);
      this.alertService.sweetalertError(error.error['status'].messsage);
      // this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

    });

  }
  onSelectState(evt: any) {
    this.selectedState = evt;
    this.bankIFSC = '';
    // this.ifscCodeList = [];
    // this.bankMasterAtGroupService.getIfscCodeStateWise(evt).subscribe((res) => {
    //  this.ifscCodeList = res.data.results;
    // }   , (error: any) => {
    //   this.alertService.sweetalertError(error.error['status'].messsage);

    // });

  }
  editMaster(i: number, companyBankMasterId: number) {
    window.scrollTo(0, 0);
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
    this.form.get('branchName').disable();
    this.form.get('branchAddress').disable();
    this.form.get('country').disable();

  }
  viewMaster(i: number) {
    window.scrollTo(0, 0);
    this.viewMode = true;
    this.isEditMode = true;
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
    this.form.get('country').disable();
    this.form.get('country').setValue('India');
    this.form.get('bankName').disable();

  }

  activateBankMaster() { }
  searchIFSC(searchTerm, bankIFSC) {
    this.form.patchValue({
      branchName: '',
      branchAddress: '',
      bankName: '',
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
  ConfirmationDialog(confirmdialog: TemplateRef<any>, companyBankMasterId: number) {
    this.companyBankMasterId = companyBankMasterId;

    this.modalRef = this.modalService.show(
      confirmdialog,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  clickedOnYes() {
    this.DeleteBankMaster(this.companyBankMasterId);
  }
  exportAsXLSX(): void {
    this.excelData = [];
    this.header = []
    this.header =["IFSC","Bank Name","Branch Name","Branch Address"];
    this.excelData=[];
    
    if(this.summaryHtmlDataList.length>0){
    this.summaryHtmlDataList.forEach(element => {
      let obj = {
        "IFSC":element.ifscCode,
        "Bank Name":element.bankName,
        "Branch Name": element.branchName,
        "Branch address":element.branchAddress,
       
      
      }
      this.excelData.push(obj)
    });
    console.log('this.excelData::', this.excelData);
  }
   
    this.excelservice.exportAsExcelFile(this.excelData, 'Bank Master At Group','Bank Master At Group',this.header);
  
  }

  //Sort
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;
  
        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
  
        return (event.order * result);
    });
  
}
}
