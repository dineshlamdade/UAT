export class SaveBusinessYear {
  businessYearDefinitionId: number;
  description: string;
  fromDate: string;
  toDate: string;
  businessYear: string;
  id?: number;
}
export class ServiceDetails {
  // serviceName: string;
}
// serviceName: any[];
export class SaveCycleDefinition {
  businessCycleDefinitionId?: number;
  businessYearDefinitionId: number;
  // frequencyMasterId: number;
  // cycleName: string;
  addDays: number;

  id?: number;
}

export class SaveCycleCreation {
  businessCycleDefinitionId: number;
  businessYear: number;
}

export class FlagCycleCreation {
  adjustedToNextCycle: boolean;
  businessCycleList: any[];
}
export class UpdateflagCycleCreation {
  adjustedToNextCycle: boolean;
  businessCycleList: any[];
  mappingGroupRequest: any;
}

export class SaveHeadCreation {
  id: number;
  shortName: string;
  headNature: string;
  standardName: string;
  description: string;
  category: string;
  type: string;
  displayName: string;
}

export class SavePHG {
  headGroupDefinitionId: number;
  headGroupDefinitionName: string;
  attributeGroupName: string;
  description: string;
  //  headMasters:any[];
  countryId: number;
  headMasters: headDetail[];
  removedHeadGroupIdList: any[];
  createdBy: string;
  isActive: boolean;
}

export class SavePHGGlobal {
  headGroupDefinitionId: number;
  globalHeadGroupDefinitionName: string;
  attributeGroupName: string;
  description: string;
  attributeGroupId : number;
  countryId: number;
  headMasters: headDetail[];
  removedHeadGroupIdList: any[];
  createdBy: string;
  isActive: boolean;
}

export class headDetail {
  headMasterId: number;
}
export class SaveAttributeAssignmentNewAssignment {
  globalPayrollHeadGroupId?: number;
  globalHeadGroupId: number;
  globalAttributeGroupId: number;
  value: string;
  applicable: boolean;
  dependentOn?: string;
  fromDate: string;
  toDate: string;
  payrollHeadGroupAttributeValueMapping: PayrollHeadGroupAttributeValueMapping[];
}
export interface PayrollHeadGroupAttributeValueMapping {
  payrollHeadGroupAttributeValueMappingId?: number;
  value1?: number;
  value2?: number;
  value3?: number;
  value4?: number;
  fromDate?: string;
  toDate?: string;
  attributeMasterId?: number;

}
export class UpdateflagCycleCreationPHG {
  mappingGroupRequest: SaveAttributeAssignment[];

}
export class SaveAttributeAssignment {
  headGroupId: number;
  attributeGroupId: number
  value: string;
  fromDate: string;
  toDate: string;
  payrollHeadGroupMappingId: number;
}

export class HeadDetailPHG {
  headMasterId: number;
}

export class SaveAttributeCreation {
  attributeMasterId: number;
  code: string;
  description: string;
  attributeNature: string;
  numberOfOption: string;
  options: any[];
  removedAttributeGroupIdList?: [];

}

export class SaveAttributeSelection {
  attributeGroupDefinitionId: number;
  name: string;
  description: string;
  attributeMasterIdList: any[];
  removedAttributeGroupIdList: any[];
}

export class SaveLeaveAttributeCreation{
  lmsAttributeMasterId: number;
  code:string;
  //attributeNatureLongForm: string;
  lmsAttributeNature: string;
  numberOfOption: string;
  description: string;
  optionValue: any[];
  lmsAttributeOptionRequestDTOList:[];
  lmsAttributeOptionId : any[];
}

export class SaveLeaveAttributeSelection {
  lmsAttributeGroupDefinitionId: number;
  name: string;
  description: string;
  lmsAttributeList: any[];
  isUsed : boolean;
  isActive: boolean;
  type : string;
  removedAttributeGroupIdList: any[];
  lmsAttributeMasterId : number;
}

// export class UpdateflagCycleCreation {
//   mappingGroupRequest: SaveAttributeAssignment[];

// }
// export class SaveAttributeAssignment {
//   headGroupId: number;
//   attributeGroupId: number;
//   value: string;
//   dependentOn: string;
//   fromDate: string;
//   toDate: string;
//   payrollHeadGroupMappingId: number;
// }

