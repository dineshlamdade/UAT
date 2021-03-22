

export class saveBusinessYear {
  businessYearDefinitionId: number;
  description: string;
  fromDate: string;
  toDate: string;
  businessYear: string;
  id?: number;
}
export class serviceDetails {
  serviceName: string;
}

export class saveCycleDefinition {
  businessCycleDefinitionId?: number;
  businessYearDefinitionId: number;
  frequencyMasterId: number;
  serviceName: any[];
  cycleName: string;
  addDays: number;

  id?: number;
}

export class saveCycleCreation {
  businessCycleDefinitionId: number;
  businessYear: number;
}

export class flagCycleCreation {
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
  category?: string;
  type?: string;
  displayName?: string;
  statutory: boolean;
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


export class SaveAttributeSelection {
  attributeGroupDefinitionId: number;
  // id:number;
  name; string;
  description: string;
  //createdBy:string;
  // attributeNature:string;
  // numberOfOption:string;
  attributeMasterIdList: any[];
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
  //createdBy:string;
  //createdBy:string;
  // "createdBy":"nisha",
  //  "createDate":"1990/11/11 00:00:00",
  //  "isActive":"true",
  //  "lastModifiedBy":"nisha",
  //  "lastModifiedDateTime":"1990/11/11 00:00:00"
}

export class headDetailPHG {
  headMasterId: number;
}


