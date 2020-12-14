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
  editedRecordIndex:number =0;
  viewMode:boolean = false;



  constructor(private formBuilder: FormBuilder, private bankMasterAtGroupService: BankMasterAtGroupService, private alertService: AlertServiceService) {
    this.form = this.formBuilder.group({
      ifscCode: new FormControl(''),
      bankName: new FormControl({ value: '', disabled: true }),
      branchName: new FormControl({ value: '', disabled: true }),
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
      console.log(res);
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
      });
    });
  }
  onSelectIFSCCode(evt: any) {

    this.bankMasterAtGroupService.getDataFromIFSC(evt).subscribe((res) => {
      console.log(res);
      this.form.patchValue({
        branchName: res.data.results[0].branchName,
        branchAddress: res.data.results[0].address,
        bankName: res.data.results[0].bankName,
      });
    });
  }

  DeleteBankMaster() {
    console.log(this.editedRecordIndex);
    this.bankMasterAtGroupService.deleteCompanyBankMaster(this.editedRecordIndex).subscribe((res) => {
      console.log(res);
      this.alertService.sweetalertMasterSuccess('Bank Master  Deleted Successfully.', '');
      this.isSaveAndReset = true;
      this.showButtonSaveAndReset = true;
      this.refreshHtmlTable();
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
      if (res.data.results.length > 0) {
        this.alertService.sweetalertMasterSuccess('Bank Master Added Successfully.', '');
        this.isSaveAndReset = true;
        this.showButtonSaveAndReset = true;
        this.refreshHtmlTable();
      }
    }, (error: any) => {
      this.alertService.sweetalertError(error.error['status'].messsage);

    });

  }
  onSelectState(evt: any) {
    this.selectedState = evt;
    this.ifscCodeList = [];
    this.bankMasterAtGroupService.getIfscCodeStateWise(evt).subscribe((res) => {
     this.ifscCodeList = res.data.results;
    }   , (error: any) => {
      this.alertService.sweetalertError(error.error['status'].messsage);

    });

  }
  editMaster(i: number,companyBankMasterId:number) {
    this.isEditMode = true;
    this.viewMode = false;
    this.editedRecordIndex = companyBankMasterId;

    console.log(this.bankMasterDetailsResponse[i]);
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

    this.form.get('bankName').disable();
    this.form.get('branchName').disable();
    this.form.get('branchAddress').disable();
   }

  activateBankMaster() { }


}
