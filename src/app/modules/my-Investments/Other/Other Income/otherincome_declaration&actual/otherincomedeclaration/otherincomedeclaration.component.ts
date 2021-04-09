import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otherincomedeclaration',
  templateUrl: './otherincomedeclaration.component.html',
  styleUrls: ['./otherincomedeclaration.component.scss']
})
export class OtherincomedeclarationComponent implements OnInit {
  row = [];
  constructor() { }

  ngOnInit(): void {
  }
  addTable() {
    const obj = {
      Description: '',
      Amount: '',
      Remark: ''
    }
    this.row.push(obj)
  }

  deleteRow(x){
    this.row.splice(x, 1 );
  }


}
