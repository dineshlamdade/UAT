export class saveBusinessYear {
    id:number;
    description: string;
    fromDate: string;
    toDate: string;
  }
  export class serviceDetails{
  //  serviceCodeId:number;
    serviceName:string;  

  }

  export class saveCycleDefinition {
    id:number;
    name: string;
    businessYearDefinitionId:number;
    frequencyMasterId: number;
    addDays:number;
    serviceName: any[];
    services:string;
  }

  export class saveCycleCreation {
    id:number;
    businessCycleDefinitionId:number;
    businessYear:number;
  
  }
  export class flagCycleCreation {
    adjustedToNextCycle:boolean;
    businessCycleList:any[];
  
  }
  export class UpdateflagCycleCreation {
    adjustedToNextCycle:boolean;
    businessCycleList:any[];
  
  }

  export class getchapter {
    fromDate: string;  
  }
 
 
 