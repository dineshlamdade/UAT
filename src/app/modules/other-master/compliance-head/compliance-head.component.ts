import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ComplianceHeadService } from './compliance-head.service';

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
  aplicabilityLevelList: Array<any> = ['Central', 'State', 'City', 'Municipal', 'Corporation', 'Establishment'];
  public form: any = FormGroup;
  showButtonSaveAndReset: boolean = true;

  constructor(private complianceHeadService: ComplianceHeadService, private formBuilder: FormBuilder,
              private alertService: AlertServiceService) {
    this.form = this.formBuilder.group({
      complianceHeadName: new FormControl(null, Validators.required),
      shortName: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      aplicabilityLevel: new FormControl(null, Validators.required),
      authorityHandling: new FormControl(null, Validators.required),
      website: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {

    this.complianceHeadService.getLocationInformationOrCountryList().subscribe(res => {
      this.countries = res.data.results;
    });
    this.refreshHtmlTableData();
  }
  save() {
    const data = this.form.getRawValue();
    this.complianceHeadService.postComplianceHead(data).subscribe(res => {
      console.log(res);
      if (res.data.results.length > 0) {
        this.alertService.sweetalertMasterSuccess('Compliance Head Saved Successfully.', '');
        this.form.reset();
        this.refreshHtmlTableData();
      } else {
        this.alertService.sweetalertWarning(res.status.messsage);
      }

    }, (error: any) => {
      this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

    });
  }
  cancelView(i: number) {
    this.form.enable();
    this.form.reset();
    this.showButtonSaveAndReset = true;
  }
  viewMaster(i: number) {
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
      console.log(res.data.results); res.data.results.forEach(element => {
        const obj = {
          SrNo: i++,
          complianceHeadName: element.complianceHeadName,
          shortName: element.shortName,
          country: element.country,
          aplicabilityLevel: element.aplicabilityLevel,
          authorityHandling: element.authorityHandling,
        };
        this.summaryHtmlDataList.push(obj);
      });
    });
  }
}
