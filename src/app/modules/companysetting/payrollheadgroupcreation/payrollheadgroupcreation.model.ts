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


export class headDetail1 {
  constructor() {

  }

  headMasterId: number;
}
export class SaveAttributeSelection {
  attributeGroupDefinitionId: number;
  // id:number;
  name: string;
  description: string;
  //createdBy:string;
  // attributeNature:string;
  // numberOfOption:string;
  attributeMasterIdList: any[];
}
