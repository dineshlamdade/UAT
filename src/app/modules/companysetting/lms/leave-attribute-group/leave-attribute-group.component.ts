import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { LeaveHeadCreationService } from '../leave-head-creation.service';
@Component({
  selector: 'app-leave-attribute-group',
  templateUrl: './leave-attribute-group.component.html',
  styleUrls: ['./leave-attribute-group.component.scss']
})
export class LeaveAttributeGroupComponent implements OnInit {
  disabled = true;
  LeaveAttributeGroupFrom : FormGroup;
  SourceProducts : Array<any> =[];
  constructor( private formBuilder:FormBuilder,private leaveAttributeService : LeaveHeadCreationService) { }

  ngOnInit(): void {
    this.LeaveAttributeGroupFrom = this.formBuilder.group({
      name: new FormControl('',Validators.required),
      description : new FormControl('',Validators.required),
      lmsAttributeNature : new FormControl('')
    }
    )
    this.getAllAttributeCreation();
  }

  getAllAttributeCreation():void{
    this.leaveAttributeService.getAllLeaveAttributeCreation().subscribe((res:any)=>{
      this.SourceProducts = res.data.results[0];
    });
    
  }

}
