import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { OtherincomeService } from '../../otherincome.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';

@Component({
  selector: 'app-otherincomedeclaration',
  templateUrl: './otherincomedeclaration.component.html',
  styleUrls: ['./otherincomedeclaration.component.scss']
})
export class OtherincomedeclarationComponent implements OnInit {
  row = [];
  otherIncomeData: any;
  otherIncomeTotal: any;
  otherIncomeId: any;
  discription: any;
  amount: any;
  remark: any;
  public taxSavingNabardForm: FormGroup;
  constructor(private otherincomeService: OtherincomeService) {
  }

  ngOnInit(): void {
    this.getotherincome();
  }

  addTable() {
    const obj = {
      OtherIncomeid: '',
      Descriptions: '',
      Amounts: '',
      Remarks: ''
    }
    this.row.push(obj);
  }

  deleteRow(x){
    this.row.splice(x, 1 );
  }

  getotherincome() {
    this.otherincomeService.getOtherIncome().subscribe((res) => {
      console.log(res);
      if (!res.data.results[0].otherIncomeDetail) {
        return;
      }
      this.otherIncomeData = res.data.results[0].otherIncomeDetail;
      this.otherIncomeTotal = res.data.results[0].total;
      console.log(res.data.results[0].total);

    });
  }

  //------------- Post Add Transaction Page Data API call -------------------
  public saveTransaction() {
    const data = [{
      amount: this.amount.toString().replace('"', ''),
      description: this.discription,
      otherIncomeId: this.otherIncomeId,
      remark: this.remark,
    }];
    this.otherincomeService.postOtherIncome(data).subscribe((res) => {
      if (!res.data.results[0].otherIncomeDetail) {
        return;
      }
      if (res.data.results[0].otherIncomeDetail) {
        this.otherIncomeId = '';
        this.discription = '';
        this.amount = '';
        this.remark = '';
        this.getotherincome();
      }
    });
    this.row = [];
  }

}
