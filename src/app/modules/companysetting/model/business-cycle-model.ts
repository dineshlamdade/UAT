export class SaveBusinessYear {
  businessYearDefinitionId: number;
  description: string;
  fromDate: string;
  toDate: string;
  businessYear: string;
  id?: number;
}
export class ServiceDetails {
  serviceName: string;
}

export class SaveCycleDefinition {
  businessCycleDefinitionId?: number;
  businessYearDefinitionId: number;
  frequencyMasterId: number;
  serviceName: any[];
  cycleName: string;
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
  displayName?: string;
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

export class headDetail {
  headMasterId: number;
}

export class UpdateflagCycleCreationPHG {
  mappingGroupRequest: SaveAttributeAssignment[];

}
export class SaveAttributeAssignment {
  headGroupId: number;
  attributeGroupId: number
  value: string;
  dependentOn: string;
  fromDate: string;
  toDate: string;
  payrollHeadGroupMappingId: number;
}

export class HeadDetailPHG {
  headMasterId: number;
}

export class SaveAttributeCreation {
  globalAttributeMasterId: number;
  code: string;
  description: string;
  attributeNature: string;
  numberOfOption: string;
  options: any[];

}

export class SaveAttributeSelection {
  attributeGroupDefinitionId: number;
  name: string;
  description: string;
  attributeMasterIdList: any[];
  removedAttributeGroupIdList: any[];
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

