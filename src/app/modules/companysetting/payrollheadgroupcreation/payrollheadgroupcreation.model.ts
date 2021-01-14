export class SavePHG
{
    headGroupDefinitionId:number;
    headGroupDefinitionName:string;
    attributeGroupName:string;
    description:string;
  //  headMasters:any[];
    countryId:number;
    headMasters:headDetail[];
    removedHeadGroupIdList:any[];
    createdBy:string;
    isActive:boolean;
}

export class headDetail
{    
    headMasterId:number;
}


export class headDetail1
{
    constructor() {
    
      }
    
    headMasterId:number;
}
export class SaveAttributeSelection
{
    attributeGroupDefinitionId:number;
   // id:number;
    name;string;
    description:string;
    //createdBy:string;
    // attributeNature:string;
    // numberOfOption:string;
    attributeMasterIdList:any[];
}
export class UpdateflagCycleCreation {
  mappingGroupRequest:SaveAttributeAssignment[];
 
 }
export class SaveAttributeAssignment
{
  headGroupId:number;
  attributeGroupId:number  
  value:string;
  dependentOn:string;
  fromDate:string;
  toDate:string;
  payrollHeadGroupMappingId:number;
  //createdBy:string;
  //createdBy:string;
  // "createdBy":"nisha",
  //  "createDate":"1990/11/11 00:00:00",
  //  "isActive":"true",
  //  "lastModifiedBy":"nisha",
  //  "lastModifiedDateTime":"1990/11/11 00:00:00"         
}
