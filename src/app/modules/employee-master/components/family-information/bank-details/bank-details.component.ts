import { Component, OnInit, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { BankInformationService } from './../../../employee-master-services/bank-information.service';
// import { NotificationsService } from '@src/app/core/services/notifications.service';
import { FamilyInformationService } from './../../../employee-master-services/family-information.service';
import { MatTableDataSource } from '@angular/material/table';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';


export interface BankElement {
  familyMemberInfoId: any;
  familyMemberName: any;
  bankIFSC: any
  state: any;
  bankName: any;
  branchName: any;
  branchAddress: any;
  accountNumber: any;
  accountHolderName: any;
}


@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent implements OnInit {

  displayedColumns: string[] = ['familyMemberName', 'state', 'bankIFSC', 'bankName', 'branchName', 'branchAddress', 'accountNumber', 'accountHolderName'];
  // bankDataSource = this.core.list$;
  controls: FormArray;
  states: Array<any> = [];
  editstates: Array<any> = [];
  Totalstates: Array<any> = [];
  toGroups: any;
  IFSCcodeList: Array<any> = [];
  AllIFSCcodeList: Array<any> = [];
  GridIFSCcodeList: Array<any> = [];
  TotalIFSCcodeList: Array<any> = [];
  familyMemberList: Array<any> = [];
  extractedInfoID: Array<any> = [];
  BankDetailsList: Array<any> = [];
  bankIFSC: any;
  stateModel: any;
  currenBank: any;
  maxAccNumber: number;
  accountNumberCountError: any;
  employeeMasterId: number;
  BankDataSource: MatTableDataSource<any>;
  BankAccountDataSource: Array<any> = [];
  filteredStates: Array<any> = [];
  accountNo: boolean;


  constructor(private FamilyInformationService: FamilyInformationService,
    private BankInformationService: BankInformationService,
    private CommonDataService: SharedInformationService) {

  }

  ngOnInit() {
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);
    this.getStates()
    // this.toGroups = this.core.list$.value.map(entity => {
    //   return new FormGroup({
    //     familyMemberName: new FormControl(entity.familyMemberName, Validators.required),
    //     state: new FormControl(entity.state, Validators.required),
    //     bankIFSC: new FormControl(entity.bankIFSC, Validators.required),
    //     bankName: new FormControl(entity.bankName, Validators.required),
    //     branchName: new FormControl(entity.branchName, Validators.required),
    //     branchAddress: new FormControl(entity.branchAddress, Validators.required),
    //     accountNumber: new FormControl(entity.accountNumber, Validators.required),
    //     accountHolderName: new FormControl(entity.accountHolderName, Validators.required)
    //   }, { updateOn: "blur" });
    // });
    // this.controls = new FormArray(this.toGroups);
    if (this.BankAccountDataSource.length == 0) {
      this.FamilyInformationService.getFamilyMemberInfo(this.employeeMasterId).subscribe(res => {

        this.familyMemberList = res.data.results[0];
        // const TABLE_DATA1: BankElement[] = this.familyMemberList;
        // this.BankDataSource = new MatTableDataSource(TABLE_DATA1);

        this.FamilyInformationService.getBankDetailsInfo(this.employeeMasterId).subscribe(res => {


          this.BankDetailsList = res.data.results[0];
          // const TABLE_DATA1: BankElement[] = this.familyMemberList;
          // this.BankDataSource = new MatTableDataSource(TABLE_DATA1);

          const newNomination = [];
          this.familyMemberList.filter(element => {
            newNomination.push(element.familyMemberInfoId);
          })
          const newNomination1 = []
          res.data.results[0].filter(element => {
            newNomination1.push(element.familyMemberInfoId);
          })
          // let extractedInfoID = [];
          this.extractedInfoID = this.differenceOf2Arrays(newNomination, newNomination1);

          if (this.extractedInfoID.length > 0) {
            this.BankDetailsList.filter(element => {
              this.familyMemberList.find((element1) => {
                if (element.familyMemberInfoId == element1.familyMemberInfoId) {
                  const index = this.familyMemberList.findIndex(x => x.familyMemberInfoId == element.familyMemberInfoId);
                  // this.familyMemberList.push(element1);
                  this.familyMemberList[index] = element;
                  this.BankAccountDataSource = this.familyMemberList
                  // const TABLE_DATA: BankElement[] = this.BankDetailsList;
                  // return this.BankDataSource = new MatTableDataSource(TABLE_DATA);
                }
              });
            })
          } else {
            this.BankAccountDataSource = this.BankDetailsList
            // const TABLE_DATA: BankElement[] = this.BankDetailsList;
            // return this.BankDataSource = new MatTableDataSource(TABLE_DATA);
          }
        })
        if (this.extractedInfoID.length == 0 && this.BankDetailsList.length == 0) {
          this.BankAccountDataSource = this.familyMemberList
          // const TABLE_DATA: BankElement[] = this.familyMemberList;
          // this.BankDataSource = new MatTableDataSource(TABLE_DATA);
        }
      })
    }


  }
  saveBankDetails(BankAccountDataSource) {

    BankAccountDataSource.forEach(element => {
      delete element.accountNumberCountError;
    });

    this.FamilyInformationService.postBankDetailsInfoForm(BankAccountDataSource).subscribe(res => {

      this.BankAccountDataSource = res.data.results[0];
      // const TABLE_DATA1: BankElement[] = res.data.results[0];
      // this.BankDataSource = new MatTableDataSource(TABLE_DATA1);
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
  }

  searchIFSC(searchTerm, bankIFSC, stateModel, bank: any) {

    this.currenBank = bank;
    if (searchTerm.query.length < 2) {
      this.AllIFSCcodeList = []
      this.IFSCcodeList = []
      this.TotalIFSCcodeList = []
    }
    if (bankIFSC.length < 11) {
      bank.bankName = '';
      bank.branchName = '';
      bank.branchAddress = '';
      bank.accountNumber = '';
      bank.accountHolderName = '';
    }
    if (searchTerm.query.length == 2) {
      // setTimeout(() => {
      this.BankInformationService.searchIFSC(searchTerm.query, stateModel).subscribe(res => {
        this.AllIFSCcodeList = res.data.results[0];
        this.IFSCcodeList = res.data.results[0];
        this.TotalIFSCcodeList = res.data.results[0];
        if (this.TotalIFSCcodeList.length > 0) {
          this.filterIFSCCodes(searchTerm.query, bank);
        } else {
          this.CommonDataService.sweetalertError('Record not found');
        }
      })
      // }, 1500)
    }
    this.filterIFSCCodes(searchTerm.query, bank);

    if (bankIFSC.length == 11) {
      const ifsc = this.TotalIFSCcodeList.filter((item) => {
        return item == searchTerm.query;
      });
      if (ifsc == searchTerm.query) {
        this.IFSCDetails(searchTerm.query, bank);
      }
    }
  }

  differenceOf2Arrays(array1, array2) {
    // 
    var temp = [];

    for (var i in array1) {
      if (array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
    }
    for (i in array2) {
      if (array1.indexOf(array2[i]) === -1) temp.push(array2[i]);
    }
    return temp.sort((a, b) => a - b);
  }

  getDataFromIFSC(bankIFSC, bank) {

    if (bankIFSC.length < 11) {
      bank.bankName = '';
      bank.branchName = '';
      bank.branchAddress = '';
      bank = '';
      bank.accountNo = '';
      bank.nameAsPerBank = '';
    }
    if (bankIFSC.length == 11) {
      this.IFSCDetails(bankIFSC, bank);
    }
  }


  IFSCDetails(bankIFSC, bank: any) {

    this.currenBank = bank;
    if (bankIFSC) {
      bank.bankName = '';
      bank.branchName = '';
      bank.branchAddress = '';
      bank.accountNumber = '';
      bank.accountHolderName = '';
    }

    this.BankInformationService.getDataFromIFSC(bankIFSC).subscribe(res => {

      this.maxAccNumber = res.data.results[0].limit
      if (this.maxAccNumber == 0) {
        this.maxAccNumber = null;
      }
      bank.bankName = res.data.results[0].bankName;
      bank.branchName = res.data.results[0].branchName;
      bank.branchAddress = res.data.results[0].address;
      this.AllIFSCcodeList = [];
      // this.addButton = true;
    });
  }

  filterIFSCCodes(searchTerm, bank: any) {
    if (searchTerm.length > 2) {
      searchTerm = searchTerm.toLowerCase();
      const ifsc = this.TotalIFSCcodeList.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(searchTerm);
      });
      this.AllIFSCcodeList = ifsc;
      // this.showOptios = true;
    }
  }
  getStates() {
    this.BankInformationService.getStates().subscribe(res => {
      this.states = res.data.results;
      this.Totalstates = res.data.results;
      this.editstates = res.data.results;
    })
  }

  validateAccountNo(accountNumber, bank) {

    if (this.maxAccNumber) {
      if (accountNumber.length < this.maxAccNumber) {
        bank.accountNumberCountError = 'Account Number Should be ' + this.maxAccNumber + ' digits';
        this.accountNumberCountError = 'Account Number Should be ' + this.maxAccNumber + ' digits';
      } else {
        this.accountNumberCountError = '';
        bank.accountNumberCountError = null;
      }
    }
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

  filterIFSCCode(event) {

    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.IFSCcodeList.length; i++) {
      let dispensary = this.IFSCcodeList[i];
      if (dispensary.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(dispensary);
      }
    }
    this.AllIFSCcodeList = filtered;
  }

  keyPress(event: any) {

    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  hideAccountNo(accountNo) {
    debugger
    if (accountNo == true) {
      setTimeout(() => {
        this.accountNo = false;
      }, 2000)
    }
  }
}
