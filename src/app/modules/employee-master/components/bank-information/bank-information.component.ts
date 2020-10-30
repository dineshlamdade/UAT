import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { BankInformationModel } from './../../dto-models/bank-information.model';
import { Subscription, Subject, Observable, of } from 'rxjs';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';
// import * as wjcGrid from '@grapecity/wijmo.grid';
// import * as wjcCore from '@grapecity/wijmo';
// import * as wjcInput from '@grapecity/wijmo.input';
import { DatePipe } from '@angular/common';
import { BankInformationService } from './../../employee-master-services/bank-information.service';
// import { NotificationsService } from '@src/app/core/services/notifications.service';
import { startWith, map } from 'rxjs/operators';
import { MustMatch } from './password-match.validator';
import { SharedInformationService } from './../../employee-master-services/shared-service/shared-information.service';

@Component({
  selector: 'app-bank-information',
  templateUrl: './bank-information.component.html',
  styleUrls: ['./bank-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BankInformationComponent implements OnInit {

  bankInfoForm: FormGroup;
  GridBankInfoForm: FormGroup;
  BankInformationModel = new BankInformationModel('', '', '', '', '', '', '', '', '')
  BankInformationArray: Array<any> = [];
  shareCountryDataSubcription: Subscription;
  countryList: Array<any> = [];
  filteredCountries: Array<any> = [];
  initiateBankForm: Subscription;
  summaryGridData: Array<any> = [];
  bankSummaryGridData: Array<any> = [];
  employeeMasterId: number;
  IFSCcodeList: Array<any> = [];
  GridIFSCcodeList: Array<any> = [];
  TotalIFSCcodeList: Array<any> = [];
  ht: any;
  flexNew: any;
  editingItem: any;
  viewItem: any;
  private _currentEditItem: any = null;
  restoreSearchTerm: any;
  addButton: boolean = false;
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  never: boolean = false;
  states: Array<any> = [];
  filteredStates: Array<any> = [];
  editstates: Array<any> = [];
  Totalstates: Array<any> = [];
  stateModel: any;
  accountNoMatched: boolean = false;
  employeeBankInfoId: number;
  confirmAccountNumber: any;
  accountNumberCountError: any;
  viewBankForm: boolean = false;
  gridViewAccountNumber: any
  gridEditAccountNumber: any;
  gridEditConfirmAccountNumber: any;
  gridEditIFSC1: any;
  editstateModel: any;
  gridViewIFSC1: any;
  viewstateModel: any;
  maxAccNumber: number;
  countries: Array<any> = [];
  ifscCodeList: Array<any> = [];
  bankNameList: Array<any> = [];
  branchNameList: Array<any> = [];
  branchAddressList: Array<any> = [];
  nameAsPerBankList: Array<any> = [];
  accountNumberList: Array<any> = [];
  stateList: Array<any> = [];
  searchTerm = new Subject<string>();
  autoCompleteControl;
  showOptios: boolean = false;

  constructor(private formBuilder: FormBuilder, private EventEmitterService: EventEmitterService,
    public datepipe: DatePipe, private BankInformationService: BankInformationService,
    private CommonDataService: SharedInformationService) { }

  ngOnInit(): void {

    this.bankInfoForm = this.formBuilder.group({
      country: [''],
      state: [''],
      bankIFSC: [''],
      bankName: [''],
      branchName: [''],
      branchAddress: [''],
      nameAsPerBank: [''],
      accountNumber: [''],
      confirmAccountNo: ['']
    },
      {
        validator: MustMatch('accountNumber', 'confirmAccountNo')
      });
    this.GridBankInfoForm = this.formBuilder.group({
      country: [''],
      state: [''],
      bankIFSC: [''],
      bankName: [''],
      branchName: [''],
      branchAddress: [''],
      nameAsPerBank: [''],
      accountNumber1: [''],
      confirmAccountNo1: [''],
    },
      {
        validator: MustMatch('accountNumber1', 'confirmAccountNo1')
      });

    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);




    this.getBankAccounts();

    this.getStates();

    this.CommonDataService.getLocationInformation().subscribe(res => {

      this.countryList = res.data.results;

      setTimeout(() => {
        this.BankInformationModel.country = 'India';
        this.bankInfoForm.get('country').setValue('India');
      })
    })
    // this.initiateBankForm = this.EventEmitterService.setBankFormInitiate().subscribe(res => {

    // })
    this.shareCountryDataSubcription = this.EventEmitterService.setCountryData().subscribe(res => {
      if (res) {
        this.countryList = res.countryList;
      }
    })

  }

  getBankAccounts() {
    this.BankInformationService.getBankInformation(this.employeeMasterId).subscribe(res => {
      debugger
      this.bankSummaryGridData = res.data.results[0];
      this.employeeBankInfoId = res.data.results[0][0].employeeBankInfoId;
    });
  }


  filterCountry(event) {

    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.countryList.length; i++) {
      let country = this.countryList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }

  filterStates(event) {

    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.states.length; i++) {
      let state = this.states[i];
      if (state.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(state);
      }
    }

    this.filteredStates = filtered;
  }
  getStates() {
    this.BankInformationService.getStates().subscribe(res => {
      this.states = res.data.results;
      this.Totalstates = res.data.results;
      this.editstates = res.data.results;
      this.stateModel = '';
    })
  }

  searchIFSC(searchTerm, bankIFSC) {

    if (searchTerm.query.length < 2) {
      this.IFSCcodeList = []
      this.TotalIFSCcodeList = []
    }
    if (bankIFSC.length < 11) {
      this.BankInformationModel.bankName = '';
      this.BankInformationModel.branchName = '';
      this.BankInformationModel.branchAddress = '';
      this.confirmAccountNumber = '';
      this.BankInformationModel.accountNo = '';
      this.BankInformationModel.nameAsPerBank = '';
    }
    if (searchTerm.query.length == 2) {
      // setTimeout(() => {
      this.BankInformationService.searchIFSC(searchTerm.query, this.stateModel).subscribe(res => {
        this.IFSCcodeList = res.data.results[0];
        this.TotalIFSCcodeList = res.data.results[0];
        if (this.TotalIFSCcodeList.length > 0) {
          this.filterIFSCCodes(searchTerm.query);
        } else {
          this.CommonDataService.sweetalertError('Recordnot found');
          // this.notifyService.showError ('Recordnot found', "Error..!!")
        }
      })
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

  // GridSearchIFSC(searchTerm, bankIFSC) {
  //   if (searchTerm.length < 2) {
  //     this.showOptios = false;
  //     this.GridIFSCcodeList = []
  //     this.TotalIFSCcodeList = []
  //   }
  //   if (bankIFSC.length < 11) {
  //     // this.showOptios = false;
  //     // this.gridEditBankName.text = '';
  //     // this.gridEditBranchName.text = '';
  //     // this.gridEditBranchAddress.text = '';
  //     // this.gridEditAccountNumber = '';
  //     // this.gridEditConfirmAccountNumber = '';
  //     // this.gridEditNameAsPerBank.text = '';

  //   }
  //   if (searchTerm.length == 2) {
  //     // setTimeout(() => {
  //     this.BankInformationService.searchIFSC(searchTerm, this.editstateModel).subscribe(res => {
  //       this.GridIFSCcodeList = res.data.results[0];
  //       this.TotalIFSCcodeList = res.data.results[0];

  //       if (this.TotalIFSCcodeList.length > 0) {
  //         this.filterGridIFSCCodes(searchTerm);
  //         this.showOptios = true;
  //       } else {
  //         this.showOptios = false;
  //         this.CommonDataService.sweetalertError('Record not found');
  //       }
  //     }, (error: any) => {
  //       this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
  //       // this.notifyService.showError(error["error"]["status"]["messsage"], "Error..!!")
  //     })
  //     // }, 1500)
  //   }
  //   this.filterGridIFSCCodes(searchTerm);
  //   if (bankIFSC.length == 11) {
  //     const ifsc = this.TotalIFSCcodeList.filter((item) => {
  //       return item == searchTerm;
  //     });
  //     if (ifsc == searchTerm) {
  //       this.IFSCGridDetails(searchTerm);
  //     }
  //   }
  // }
  filterIFSCCodes(searchTerm) {
    if (searchTerm.length > 2) {
      searchTerm = searchTerm.toLowerCase();
      const ifsc = this.TotalIFSCcodeList.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(searchTerm);
      });
      this.IFSCcodeList = ifsc;
      // this.GridIFSCcodeList = ifsc;
      this.showOptios = true;
    }
  }
  filterGridIFSCCodes(searchTerm) {

    if (searchTerm.length > 2) {
      searchTerm = searchTerm.toLowerCase();
      const ifsc = this.TotalIFSCcodeList.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(searchTerm);
      });
      // this.IFSCcodeList = ifsc;
      this.GridIFSCcodeList = ifsc;
      this.showOptios = true;
    }
  }
  searchStates(searchTerm) {
    this.BankInformationModel.bankName = '';
    this.BankInformationModel.branchName = '';
    this.BankInformationModel.branchAddress = '';
    this.BankInformationModel.bankIFSC = '';
    this.confirmAccountNumber = '';
    this.BankInformationModel.accountNo = '';
    this.BankInformationModel.nameAsPerBank = '';
    this.IFSCcodeList = [];
    // searchTerm = searchTerm.toLowerCase();
    //   const ifsc = this.Totalstates.filter((item) => {
    //     return JSON.stringify(item).toLowerCase().includes(searchTerm);
    //   });
    //   this.states = ifsc;
  }

  getDataFromIFSC(bankIFSC) {
    if (bankIFSC.length < 11) {
      this.BankInformationModel.bankName = '';
      this.BankInformationModel.branchName = '';
      this.BankInformationModel.branchAddress = '';
      this.confirmAccountNumber = '';
      this.BankInformationModel.accountNo = '';
      this.BankInformationModel.nameAsPerBank = '';
    }
    if (bankIFSC.length == 11) {
      this.IFSCDetails(bankIFSC);
    }
    if (bankIFSC) {
      this.gridEditIFSC1 = bankIFSC
      this.IFSCGridDetails(bankIFSC);
    }
  }
  IFSCDetails(bankIFSC) {

    this.BankInformationService.getDataFromIFSC(bankIFSC).subscribe(res => {

      this.maxAccNumber = res.data.results[0].limit
      this.BankInformationModel.bankName = res.data.results[0].bankName;
      this.BankInformationModel.branchName = res.data.results[0].branchName;
      this.BankInformationModel.branchAddress = res.data.results[0].address;
      this.addButton = true;
    });
  }
  IFSCGridDetails(bankIFSC) {
    this.BankInformationService.getDataFromIFSC(bankIFSC).subscribe(res => {
      this.maxAccNumber = res.data.results[0].limit
      // this.gridEditBankName.text = res.data.results[0].bankName;
      // this.gridEditBranchName.text = res.data.results[0].branchName;
      // this.gridEditBranchAddress.text = res.data.results[0].address;
      this.addButton = true;
    });
  }
  clearData() {
    this.BankInformationModel.bankName = '';
    this.BankInformationModel.branchName = '';
    this.BankInformationModel.branchAddress = '';
    this.BankInformationModel.bankIFSC = '';
    this.confirmAccountNumber = '';
    this.BankInformationModel.accountNo = '';
    this.BankInformationModel.nameAsPerBank = '';
  }
  bankInfoSubmit() {

    this.summaryGridData.forEach(data => {
      data.employeeMasterId = this.employeeMasterId;
      delete data.confirmAccountNo;
      if (data.employeeBankInfoId) {
        this.BankInformationService.putBankInfoForm(this.summaryGridData).subscribe(res => {
          // this.summaryGridData = res.data.results;
          this.getBankAccounts();
          this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
          this.summaryGridData = [];
          // this.BankInformationModel.country = '';
          this.BankInformationModel.bankIFSC = '';
          this.BankInformationModel.bankName = '';
          this.BankInformationModel.branchName = '';
          this.BankInformationModel.branchAddress = '';
          this.BankInformationModel.nameAsPerBank = '';
          this.BankInformationModel.accountNo = '';
          this.stateModel = '';
          this.confirmAccountNumber = '';
          this.BankInformationModel.employeeBankInfoId = '';
        })
      } else {
        this.BankInformationService.postBankInfoForm(this.summaryGridData).subscribe(res => {
          // this.summaryGridData = res.data.results;
          this.summaryGridData = [];
          this.getBankAccounts();
          this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
          // this.notifyService.showSuccess(res.status.messsage, "Success..!!")
        })
      }
    })

    // let nonBankInformationArray = this.BankInformationArray.filter(data => {
    //   return !data.employeeBankInfoId;
    // })
    // if (nonBankInformationArray.length > 0) {

    // } else {

    // }
  }
  pushDataToGrid() {
    let data = [];

    this.countries = []; this.branchAddressList = []; this.nameAsPerBankList = [];
    this.ifscCodeList = []; this.accountNumberList = []; this.bankNameList = [];
    this.branchNameList = [];

    this.countries.push(this.BankInformationModel.country);
    this.ifscCodeList.push(this.BankInformationModel.bankIFSC);
    this.bankNameList.push(this.BankInformationModel.bankName);
    this.branchNameList.push(this.BankInformationModel.branchName);
    this.branchAddressList.push(this.BankInformationModel.branchAddress);

    this.nameAsPerBankList.push(this.BankInformationModel.nameAsPerBank);
    this.accountNumberList.push(this.BankInformationModel.accountNo);
    this.stateList.push(this.stateModel);


    for (let i = 0; i < this.countries.length; i++) {
      data.push({
        // id: i,
        country: this.countries[i],
        bankIFSC: this.ifscCodeList[i],
        bankName: this.bankNameList[i],
        branchName: this.branchNameList[i],
        branchAddress: this.branchAddressList[i],
        nameAsPerBank: this.nameAsPerBankList[i],
        accountNo: this.accountNumberList[i],
        state: this.stateList[i]
      });
    }
    // this.BankInformationModel.country = '';
    this.BankInformationModel.bankIFSC = '';
    this.BankInformationModel.bankName = '';
    this.BankInformationModel.branchName = '';
    this.BankInformationModel.branchAddress = '';
    this.BankInformationModel.nameAsPerBank = '';
    this.BankInformationModel.accountNo = '';
    this.stateModel = '';
    this.confirmAccountNumber = '';

    this.summaryGridData = data;
    this.bankInfoSubmit();
    // if (this.summaryGridData.length > 0) {
    //   let newData = data.concat(this.summaryGridData);
    //   this.summaryGridData = newData;
    //   this.addButton = false;
    // } else {
    //   this.summaryGridData = data;
    //   this.addButton = false;
    // }
  }

  editBankGridRow(bank) {
    this.BankInformationModel.country = bank.country;
    this.BankInformationModel.bankIFSC = bank.bankIFSC;
    this.BankInformationModel.bankName = bank.bankName;
    this.BankInformationModel.branchName = bank.branchName;
    this.BankInformationModel.branchAddress = bank.branchAddress;
    this.BankInformationModel.nameAsPerBank = bank.nameAsPerBank;
    this.BankInformationModel.accountNo = bank.accountNo;
    this.BankInformationModel.employeeBankInfoId = bank.employeeBankInfoId

    const temp1 = this.bankInfoForm.get('country');
    temp1.enable();
    const temp2 = this.bankInfoForm.get('state');
    temp2.enable();
    const temp3 = this.bankInfoForm.get('bankIFSC');
    temp3.enable();
    const temp4 = this.bankInfoForm.get('bankName');
    temp4.enable();
    const temp5 = this.bankInfoForm.get('branchName');
    temp5.enable();
    const temp6 = this.bankInfoForm.get('branchAddress');
    temp6.enable();
    const temp7 = this.bankInfoForm.get('nameAsPerBank');
    temp7.enable();
    const temp8 = this.bankInfoForm.get('accountNumber');
    temp8.enable();
    const temp9 = this.bankInfoForm.get('confirmAccountNo');
    temp9.enable();
  }

  viewBankGridRow(bank) {
    this.viewBankForm = true;
    this.BankInformationModel.country = bank.country;
    this.BankInformationModel.bankIFSC = bank.bankIFSC;
    this.BankInformationModel.bankName = bank.bankName;
    this.BankInformationModel.branchName = bank.branchName;
    this.BankInformationModel.branchAddress = bank.branchAddress;
    this.BankInformationModel.nameAsPerBank = bank.nameAsPerBank;
    this.BankInformationModel.accountNo = bank.accountNo;
    this.BankInformationModel.employeeBankInfoId = bank.employeeBankInfoId

    const temp1 = this.bankInfoForm.get('country');
    temp1.disable();
    const temp2 = this.bankInfoForm.get('state');
    temp2.disable();
    const temp3 = this.bankInfoForm.get('bankIFSC');
    temp3.disable();
    const temp4 = this.bankInfoForm.get('bankName');
    temp4.disable();
    const temp5 = this.bankInfoForm.get('branchName');
    temp5.disable();
    const temp6 = this.bankInfoForm.get('branchAddress');
    temp6.disable();
    const temp7 = this.bankInfoForm.get('nameAsPerBank');
    temp7.disable();
    const temp8 = this.bankInfoForm.get('accountNumber');
    temp8.disable();
    const temp9 = this.bankInfoForm.get('confirmAccountNo');
    temp9.disable();
  }

  updateBankGridRow(BankInformationModel) {
    this.summaryGridData.push(BankInformationModel);
    this.bankInfoSubmit();
  }

  closeBankGridRow(BankInformationModel) {
    this.viewBankForm = false;
    // this.BankInformationModel.country = '';
    this.BankInformationModel.bankIFSC = '';
    this.BankInformationModel.bankName = '';
    this.BankInformationModel.branchName = '';
    this.BankInformationModel.branchAddress = '';
    this.BankInformationModel.nameAsPerBank = '';
    this.BankInformationModel.accountNo = '';
    this.stateModel = '';
    this.confirmAccountNumber = '';
    this.BankInformationModel.employeeBankInfoId = '';

    const temp1 = this.bankInfoForm.get('country');
    temp1.enable();
    const temp2 = this.bankInfoForm.get('state');
    temp2.enable();
    const temp3 = this.bankInfoForm.get('bankIFSC');
    temp3.enable();
    const temp4 = this.bankInfoForm.get('bankName');
    temp4.enable();
    const temp5 = this.bankInfoForm.get('branchName');
    temp5.enable();
    const temp6 = this.bankInfoForm.get('branchAddress');
    temp6.enable();
    const temp7 = this.bankInfoForm.get('nameAsPerBank');
    temp7.enable();
    const temp8 = this.bankInfoForm.get('accountNumber');
    temp8.enable();
    const temp9 = this.bankInfoForm.get('confirmAccountNo');
    temp9.enable();
  }
  // public initializeGrid(flex: wjcGrid.FlexGrid) {
  //   this.flexNew = flex;
  //   flex.rows.defaultSize = 40;
  //   // custom formatter to paint buttons and editors
  //   flex.formatItem.addHandler((s: wjcGrid.FlexGrid, e: wjcGrid.FormatItemEventArgs) => {
  //     // this.eNew = e;
  //     // if (e.panel == s.rowHeaders && e.col == 0) {
  //     //     e.cell.innerHTML = '<span class="wj-glyph-pencil"></span>';
  //     // }
  //     if (e.panel == s.cells) {
  //       let col = s.columns[e.col],
  //         item = s.rows[e.row].dataItem;
  //       if (item == this._currentEditItem) {
  //         // create editors and buttons for the item being edited
  //         switch (col.binding) {
  //           case 'bankButtons':
  //             e.cell.innerHTML = document.getElementById('bankBtnViewMode').innerHTML;
  //             e.cell['dataItem'] = item;
  //             break;
  //           case 'country':
  //           case 'bankIFSC':
  //           case 'bankName':
  //           case 'branchName':
  //           case 'branchAddress':
  //           case 'nameAsPerBank':
  //           case 'accountNo':
  //           case 'state':
  //           case 'confirmAccountNo':
  //             e.cell.innerHTML = '<input class="form-control" ' +
  //               'id="' + col.binding + '" ' +
  //               'value="' + s.getCellData(e.row, e.col, true) + '"/>';
  //             break;
  //         }
  //       } else {
  //         // create buttons for items not being edited
  //         switch (col.binding) {
  //           case 'bankButtons':
  //             e.cell.innerHTML = document.getElementById('bankBtnViewMode').innerHTML;
  //             e.cell['dataItem'] = item;
  //             break;
  //         }
  //       }
  //     }
  //   });
  //   // var grid = wijmo.Control.getControl("#gFlexGrid");
  //   // var columns = grid.columns;
  //   // columns[1].visible = false;
  //   // handle button clicks
  //   flex.addEventListener(flex.hostElement, 'click', (e: MouseEvent) => {
  //     let targetBtn: HTMLButtonElement;
  //     if (e.target instanceof HTMLButtonElement) {
  //       targetBtn = e.target;
  //     } else if (e.target instanceof HTMLSpanElement && e.target.classList.contains('glyphicon')) {
  //       targetBtn = e.target.parentElement as HTMLButtonElement;
  //     }
  //     if (targetBtn) {
  //       // get button's data item
  //       let item = wjcCore.closest(targetBtn, '.wj-cell')['dataItem'];
  //       // handle buttons
  //       switch (targetBtn.id) {
  //         // start editing this item
  //         case 'bankBtnEdit':
  //           this._editItem('');
  //           break;
  //         // remove this item from the collection
  //         // case 'btnDelete':
  //         //     (<wjcCore.CollectionView>flex.collectionView).remove(item);
  //         //     this.resetForm();
  //         //     break;
  //         // commit edits
  //         case 'btnOK':
  //           this._commitEdit();
  //           break;
  //         // cancel edits
  //         case 'btnCancel':
  //           this._cancelEdit();
  //           break;
  //         case 'bankBtnPopUp':
  //           this.popupDialog();
  //           break;
  //       }
  //     }

  //     let ht = flex.hitTest(e);
  //     this.ht = ht;

  //     if (ht.target.id == 'bankBtnPopUp') {

  //       this.popupDialog();
  //       // prepare form
  //       this.viewItem = flex.rows[ht.row].dataItem;
  //       this.gridViewCountry.text = this.viewItem.country;
  //       this.viewstateModel = this.viewItem.state;
  //       this.gridViewIFSC1 = this.viewItem.bankIFSC;
  //       this.gridViewBankName.text = this.viewItem.bankName;
  //       this.gridViewBranchName.text = this.viewItem.branchName;
  //       this.gridViewBranchAddress.text = this.viewItem.branchAddress;
  //       this.gridViewNameAsPerBank.text = this.viewItem.nameAsPerBank;
  //       this.gridViewAccountNumber = this.viewItem.accountNo;
  //     }
  //     if (ht.target.id == 'bankBtnEdit') {
  //       this._editItem('');
  //       // prepare form
  //       this.editingItem = flex.rows[ht.row].dataItem;
  //       this.gridEditCountry.text = this.editingItem.country;
  //       this.editstateModel = this.editingItem.state;
  //       this.gridEditIFSC1 = this.editingItem.bankIFSC;
  //       this.gridEditBankName.text = this.editingItem.bankName;
  //       this.gridEditBranchName.text = this.editingItem.branchName;
  //       this.gridEditBranchAddress.text = this.editingItem.branchAddress;
  //       this.gridEditNameAsPerBank.text = this.editingItem.nameAsPerBank;
  //       this.gridEditAccountNumber = this.editingItem.accountNo;
  //       this.gridEditConfirmAccountNumber = this.viewItem.confirmAccountNo;
  //     }
  //   });

  //   // exit edit mode when scrolling the grid or losing focus
  //   flex.scrollPositionChanged.addHandler(this._cancelEdit.bind(this));
  //   flex.lostFocus.addHandler(this._cancelEdit.bind(this));
  // }

  // _editItem(wjhideok) {
  //   this.bankInfoForm.markAsTouched();
  //   this.editcell.show(true, (s: wjcInput.Popup) => {
  //     // s.dialogResult = wjhideok;
  //     if (s.dialogResult == 'wj-hide-ok') {
  //       // commit changes if the user pressed the OK button
  //       (<wjcCore.CollectionView>this.flexNew.collectionView).editItem(this.editingItem);
  //       this.editingItem.country = this.gridEditCountry.text;
  //       this.editingItem.state = this.editstateModel;
  //       this.editingItem.bankIFSC = this.gridEditIFSC1;
  //       this.editingItem.bankName = this.gridEditBankName.text;
  //       this.editingItem.branchName = this.gridEditBranchName.text;
  //       this.editingItem.branchAddress = this.gridEditBranchAddress.text;
  //       this.editingItem.nameAsPerBank = this.gridEditNameAsPerBank.text;
  //       this.editingItem.accountNo = this.gridEditAccountNumber;
  //       this.editingItem.confirmAccountNo = this.gridEditConfirmAccountNumber;

  //       (<wjcCore.CollectionView>this.flexNew.collectionView).commitEdit();
  //     }
  //     // return focus to the grid
  //     this.flexNew.focus();
  //   });
  // }
  // popupDialog() {

  //   this.bankInfoForm.markAsTouched();
  //   this.viewPopUp.show(true, (s: wjcInput.Popup) => {
  //     this.viewItem.country = this.gridViewCountry.text;
  //     this.viewItem.state = this.viewstateModel;
  //     this.gridViewIFSC1 = this.gridViewIfsc.text;
  //     this.viewItem.bankName = this.gridViewBankName.text;
  //     this.viewItem.branchName = this.gridViewBranchName.text;
  //     this.viewItem.branchAddress = this.gridViewBranchAddress.text;
  //     this.viewItem.nameAsPerBank = this.gridViewNameAsPerBank.text;
  //     this.viewItem.accountNo = this.gridViewAccountNumber;
  //     (<wjcCore.CollectionView>this.flexNew.collectionView).commitEdit();

  //     this.flexNew.focus();
  //   });
  // }
  // _commitEdit() {
  //   if (this._currentEditItem) {
  //     this.flex.columns.forEach((col: wjcGrid.Column) => {
  //       let input = <HTMLInputElement>this.flex.hostElement.querySelector('#' + col.binding);
  //       if (input) {
  //         let value = wjcCore.changeType(input.value, col.dataType, col.format);
  //         if (wjcCore.getType(value) == col.dataType) {
  //           this._currentEditItem[col.binding] = value;
  //         }
  //       }
  //     });
  //   }
  //   this._currentEditItem = null;
  //   this.flex.invalidate();
  // }

  // _cancelEdit() {
  //   if (this._currentEditItem) {
  //     this._currentEditItem = null;
  //     this.flex.invalidate();
  //   }
  // }
  resetForm() {
    this.bankInfoForm.reset();
  }
  matchAccountNo(confirmPassword) {
    if (confirmPassword == this.BankInformationModel.accountNo) {
      this.accountNoMatched = true;

      this.BankInformationService.accountNoVerification(confirmPassword, 0).subscribe(res => {
        DelayNode

        this.CommonDataService.sweetalertMasterSuccess(res.status.result, res.status.messsage);
        // this.notifyService.showSuccess(res.status.messsage, res.status.result);
        if (res.status.messsage == 'Account Number  Already Exists ') {
          this.BankInformationModel.accountNo = '';
          this.confirmAccountNumber = '';
        }
      }, (error: any) => {
        this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
        // this.notifyService.showError(error["error"]["status"]["messsage"], "Error..!!");
      })
    } else {
      this.accountNoMatched = false;
    }
  }
  matchGridAccountNo(gridEditConfirmAccountNumber) {
    if (gridEditConfirmAccountNumber == this.gridEditAccountNumber) {
      // this.accountNoMatched = true;

      this.GridBankInfoForm.get('confirmAccountNo1').errors.mustMatch = false;

      // confirmAccountNo1.errors.mustMatch = false;
      this.BankInformationService.accountNoVerification(gridEditConfirmAccountNumber, this.employeeBankInfoId).subscribe(res => {
        this.CommonDataService.sweetalertMasterSuccess(res.status.result, res.status.messsage);
      }, (error: any) => {
        this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
        // this.notifyService.showError(error["error"]["status"]["messsage"], "Error..!!")
      })
    } else {
      this.addButton = false
    }
  }
  validateAccountNo(accountNo) {
    if (this.maxAccNumber) {
      if (accountNo.length < this.maxAccNumber) {
        this.accountNumberCountError = 'Account Number Should be ' + this.maxAccNumber + ' digits';
        // this.accountNumberCountError = 'Please enter' + this.maxAccNumber + 'digits in the account number field';
      } else {
        this.accountNumberCountError = '';
      }
    }
    if (accountNo == 0) {
      this.confirmAccountNumber = '';
      this.gridEditConfirmAccountNumber = ''
    }
  }
  clearFormData() {
    this.BankInformationModel.bankName = '';
    this.BankInformationModel.branchName = '';
    this.BankInformationModel.branchAddress = '';
    this.BankInformationModel.bankIFSC = '';
    this.confirmAccountNumber = '';
    this.BankInformationModel.accountNo = '';
    this.BankInformationModel.nameAsPerBank = '';
    this.BankInformationModel.employeeBankInfoId = '';
    // this.gridEditBankName.text = '';
    // this.gridEditBranchName.text = '';
    // this.gridEditBranchAddress.text = '';
    this.gridEditAccountNumber = '';
    this.gridEditConfirmAccountNumber = '';
    // this.gridEditNameAsPerBank.text = '';
    this.gridEditIFSC1 = '';
  }
}
