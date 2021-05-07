import { Component, OnInit } from '@angular/core';
import { TemplateRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { ToastrService } from 'ngx-toastr';
import { QueryService } from '../query.service';

export interface user2 {
  srno;
  Query_Number;
  Submissiondate;
  Creators_name;
  Employee_Code;
  Employee_Name;
  Comapny_name;
  Module_name;
  Query_Type;
  SubQuery_Type;
  Subject;
  Priority;
  Escalation_Date;
  Status;

}
@Component({
  selector: 'app-admin-qury-generation',
  templateUrl: './admin-qury-generation.component.html',
  styleUrls: ['./admin-qury-generation.component.scss']
})
export class AdminQuryGenerationComponent implements OnInit {
  queryGenerationForm: FormGroup;
  moduleListData :any;
  getAllQueryGenerationData: any;

  constructor(public formBuilder : FormBuilder ,public queryService :QueryService ,public toster : ToastrService,) {
  this.queryGenerationForm = this.formBuilder.group(
    {
        "queryRequestDTO":[
        {
        "queryGenerationEmpId":new FormControl(0),
        "queryNumber":new FormControl(0),
        "employeeMasterId":new FormControl(0),
        "onBehalfOfEmployee":new FormControl(true),
        "applicationModuleId":new FormControl(1),
        "queryTypeMasterId":new FormControl(1),
        "subQueTypeMasterId":new FormControl(0),
        "queAnsMasterId":new FormControl(1),
        "priority":new FormControl(null),
        "queryDescription":new FormControl('test desc 10'),
        "subject":new FormControl('test sub'),
        "queryRootCause":new FormControl(null),
        "status":new FormControl('submitted'),

        }
        ],



    })
   }

  users: user2[];
  ngOnInit(): void {
    this.users = [
      { srno: '1', Query_Number:'1111',Submissiondate:'John', Creators_name:'AAA',Employee_Code:'AAA ',Employee_Name:'SSS',Comapny_name:'MNS',Module_name:'XYZ',Query_Type:'query',SubQuery_Type:'Sub', Subject:'Sub1',Priority:'high',Escalation_Date:'22-march',Status:'Status1' },
      { srno: '2', Query_Number:'1112',Submissiondate:'ABC', Creators_name:'AAA',Employee_Code:'AAA ',Employee_Name:'SSS',Comapny_name:'MPB',Module_name:'YZX',Query_Type:'query',SubQuery_Type:'Mquery',Subject:'Sub2',Priority:'Low',Escalation_Date:'24-march',Status:'Status1' },
    ];
    this.getModuleName();
    this.GetAllQueryGeneration();
  }
  queryGenerationFormSubmit()
  {
  }

  getModuleName()
{
  this.queryService.getModuleName().subscribe(res => {
    this.moduleListData = res.data.results;
  })
}
GetAllQueryGeneration()
{
this.queryService.GetAllQueryGeneration().subscribe(res =>
  {
    this.getAllQueryGenerationData = res.data.results[0];
    console.log("*********",this.getAllQueryGenerationData);
  })
}
}



