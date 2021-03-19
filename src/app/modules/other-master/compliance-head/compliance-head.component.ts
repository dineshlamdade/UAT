import { ComplianceMasterService } from './../compliance-master/compliance-master.service';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ComplianceHeadService } from './compliance-head.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-compliance-head',
  templateUrl: './compliance-head.component.html',
  styleUrls: ['./compliance-head.component.scss'],
})
export class ComplianceHeadComponent implements OnInit {
  countries: Array<any> = [];
  summaryHtmlDataList: Array<any> = [];
  masterGridDataList: Array<any> = [];
  shortNameList: Array<any> = ['PF', 'EPS', 'PT', 'TDS', 'ESIC', 'LWF', 'S&E', 'Factories', 'SA', 'Gratuity', 'BOCW', 'CLRA', 'EE', 'PWD'];
  aplicabilityLevelList: Array<any> = ['Central', 'State', 'City', 'Municipal Corporation', 'Establishment'];
  public form: any = FormGroup;
  showButtonSaveAndReset: boolean = true;
  isSaveAndReset: boolean = true;
  isEditMode: boolean = false;
  invalidWebsite: boolean = false;
  editedComplianceHeadId: number = 0;
  hideRemark = false;
  public modalRef: BsModalRef;
  public invalidComplianceHeadName: boolean = false;

  constructor(private modalService: BsModalService, private complianceHeadService: ComplianceHeadService, private formBuilder: FormBuilder,
    private alertService: AlertServiceService) {
    this.form = this.formBuilder.group({
      complianceHeadName: new FormControl(null, Validators.required),
      shortName: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      aplicabilityLevel: new FormControl('', Validators.required),
      authorityHandling: new FormControl(null, Validators.required),
      website: new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),

      // website: new FormControl('', [Validators.required, Validators.pattern('/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/')]),
      remark: new FormControl({ value: '', disabled: true }),
      complianceActive: new FormControl({ value: true, disabled: true }),
    });
  }

  ngOnInit(): void {

    this.complianceHeadService.getLocationInformationOrCountryList().subscribe(res => {
      this.countries = res.data.results;
    });
    this.refreshHtmlTableData();
  }
  save() {
    if (this.editedComplianceHeadId > 0) {
      console.log('in edit mode');


      const data = this.form.getRawValue();
      data.complianceHeadId = this.editedComplianceHeadId;
      data.createdBy = 'PaysquareGlobal';
      data.isActive = 1;
      console.log(JSON.stringify(data));
      this.complianceHeadService.putComplianceHead(data).subscribe(res => {
        console.log(res);
        if (res.data.results.length > 0) {
          this.alertService.sweetalertMasterSuccess('Compliance Head Updated Successfully.', '');
          this.form.reset();
          this.refreshHtmlTableData();
          this.saveFormValidation();
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        // this.alertService.sweetalertError(error["error"]["status"]["messsage"]);
        //   this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

      });

    } else {
      const data = this.form.getRawValue();
      this.complianceHeadService.postComplianceHead(data).subscribe(res => {
        console.log(res);
        if (res.data.results.length > 0) {
          this.alertService.sweetalertMasterSuccess('Compliance Head Saved Successfully.', '');
          this.form.reset();
          this.refreshHtmlTableData();
          this.saveFormValidation();
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }

      }, (error: any) => {
        // this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

      });

    }

  }
  cancelView(i: number) {
    this.editedComplianceHeadId = 0;
    this.isEditMode = false;
    this.isSaveAndReset = true;
    this.showButtonSaveAndReset = true;
    this.form.enable();
    this.form.reset();
    this.showButtonSaveAndReset = true;
    this.saveFormValidation();
    this.form.get('remark').disable();
    this.form.get('complianceActive').setValue(true);
    this.form.get('complianceActive').disable();
    this.hideRemark = false;
  }
  viewMaster(i: number) {
    this.editedComplianceHeadId = 0;
    window.scrollTo(0, 0);
    this.showButtonSaveAndReset = false;
    this.form.reset();
    this.form.patchValue(this.masterGridDataList[i]);
    this.form.disable();
  }
  onSelectShortName(evt: any) { }
  onSelectApplicabilityLevel(evt: any) { }

  refreshHtmlTableData() {
    this.summaryHtmlDataList = [];
    this.masterGridDataList = [];
    this.complianceHeadService.getComplianceHeadDetails().subscribe(res => {
      console.log(res);
      this.masterGridDataList = res.data.results;
      let i = 1;
      console.log(res.data.results);
      res.data.results.forEach(element => {
        const obj = {
          SrNo: i++,
          complianceHeadName: element.complianceHeadName,
          shortName: element.shortName,
          country: element.country,
          aplicabilityLevel: element.aplicabilityLevel,
          authorityHandling: element.authorityHandling,
          complianceActive: element.complianceActive,
          remark: element.remark,
          isActive: element.isActive,
          website: element.website,
          complianceHeadId: element.complianceHeadId,
        };
        this.summaryHtmlDataList.push(obj);
      });
    });
  }
  saveFormValidation() {
    this.form.patchValue({
      shortName: '',
      country: '',
      aplicabilityLevel: '',
    });
    this.isEditMode = false;
    this.isSaveAndReset = true;
    this.showButtonSaveAndReset = true;
    this.editedComplianceHeadId = 0;
  }
  editMaster(i: number, complianceHeadId: number) {
    this.editedComplianceHeadId = complianceHeadId
    window.scrollTo(0, 0);
    this.isEditMode = true;
    this.isSaveAndReset = false;
    this.showButtonSaveAndReset = true;
    this.form.enable();
    this.form.reset();
    this.form.patchValue(this.summaryHtmlDataList[i]);
  }
  deactiveActiveCheckBox() { }
  onChangeWebsiteName(evt: string) {
    var text = evt.split('.');
    // let index = evt.indexOf('.');
    // console.log(index);

    // let index1 = evt.lastIndexOf('.');
    // console.log(index1);
    // if only one dot is present

    let s = evt.lastIndexOf('.') - evt.indexOf('.');
    console.log(s);
    // if tow dot presnt and without space
    if (evt.indexOf('.') == evt.lastIndexOf('.') || s == 1) {
      this.invalidWebsite = true;
    } else {
      this.invalidWebsite = false;

    }

    // if (text.length >= 3) {
    //   this.invalidWebsite = true;

    // } else {
    //   this.invalidWebsite = false;

    // }
    // for (let i = 0; i < text.length; i++) {
    //   if (text.length >= 3) {
    //     if (text[i].length == 0) {
    //       this.invalidWebsite = true;
    //       break;
    //     }

    //   } else {
    //     this.invalidWebsite = true;
    //     break;

    //   }
    // }
    // if (text.length >= 3) {
    //   this.invalidWebsite = false;
    // } else {
    //   this.invalidWebsite = true;
    // }
    // console.log(text.length);
  }

  deactivateRemark() {
    console.log('in deactive remakr');

    if (this.form.get('complianceActive').value === false) {
      this.form.get('remark').enable();
      this.hideRemark = true;
      this.form.controls['remark'].setValidators(Validators.required);
      this.form.controls['remark'].updateValueAndValidity();
    } else {
      this.hideRemark = false;

      // this.form.get('remark').disable();
      // this.form.controls['remark'].clearValidator();

      this.form.controls["remark"].clearValidators();
      this.form.controls["remark"].updateValueAndValidity();
      // this.form.get('remark').reset();
    }
  }
  ConfirmationDialog(confirmdialog: TemplateRef<any>, id: number) {
    this.editedComplianceHeadId = id;

    this.modalRef = this.modalService.show(
      confirmdialog,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  clickedOnYes() {
    console.log('yes');
    this.deleteComplianceHead(this.editedComplianceHeadId);
  }
  deleteComplianceHead(id: number) {

    this.complianceHeadService.deleteComplianceHead(id).subscribe((res) => {
      console.log(res);
      this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
      this.refreshHtmlTableData();
    }, (error: any) => {
      this.alertService.sweetalertError(error.error.status.messsage);
    }, () => { });
  }
  isShortNameContainsOnlySpecialCharacter() {
    this.invalidComplianceHeadName = false
    var splChars = "*|,\":<>[]{}`\!';^()@&$#%1234567890";
    for (var i = 0; i < this.form.get('complianceHeadName').value.length; i++) {
      if (splChars.indexOf(this.form.get('complianceHeadName').value.charAt(i)) != -1) {
        //alert("Illegal characters detected!");
        this.invalidComplianceHeadName = true;
      } else {
        this.invalidComplianceHeadName = false;
        break;
      }
    }
    if (this.invalidComplianceHeadName == true) {
      this.form.get('complianceHeadName').status = 'INVALID';
    }
  }
}
