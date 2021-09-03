import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-angularMaterial',
  templateUrl: './angularMaterial.component.html',
  styleUrls: ['./angularMaterial.component.scss']
})
export class AngularMaterialComponent implements OnInit {
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }


    ngOnInit() {
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
      });
    }
}
