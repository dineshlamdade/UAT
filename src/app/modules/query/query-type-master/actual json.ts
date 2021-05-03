{
    queryTypeMasterId: new FormControl(''),
    applicationModuleId: new FormControl(''),
    queryTypeCode: new FormControl(''),
    queryTypedescription: new FormControl(''),
    subQuery: new FormControl(''),
    priorityRequired: new FormControl(''),
    replyWorkflowId: new FormControl(''),
    forwardWorkFlowId: new FormControl(''),
    autoCloseTimeforNopriority: new FormControl(''),
    resolutionTimeforNopriority: new FormControl(''),
    active: new FormControl(true),
    listQueryAnsMappingReqDTO: new FormControl([
      {
        queryTypeQueAnsMappingId: new FormControl(''),
        queryTypeMasterId: new FormControl(''),
        queAnsMasterId: new FormControl(''),
        active: new FormControl(true),
      }
    ]),
    listQueryPriorityRequestDTO: new FormControl([
      {
        queTypePriorityMasterId: new FormControl(''),
        queryTypeMasterId: new FormControl(''),
        priorityType: new FormControl(''),
        resolutionTime: new FormControl(''),
        autoClose: new FormControl(''),
        defaultPriority: new FormControl(''),
        active: new FormControl(true),
      }
    ]),
    subQueryRequestDTO: new FormControl([
      {
        subQueTypeMasterId: new FormControl(''),
        queryTypeMasterId: new FormControl(''),
        subQueryTypeCode: new FormControl(''),
        subqueryTypedescription: new FormControl(''),
        active: new FormControl(''),
        listSubQueryQueAnsMapping: [
          {
            subQueryTypeQueAnsMappingId: new FormControl(''),
            subQueryTypeMasterId: new FormControl(''),
            queAnsMasterId: new FormControl(''),
            active: new FormControl(true),
          }
        ]
      },
      {
        subQueTypeMasterId: new FormControl(''),
        queryTypeMasterId: new FormControl(''),
        subQueryTypeCode: new FormControl(''),
        subqueryTypedescription: new FormControl(''),
        active: true,
        listSubQueryQueAnsMapping: [
          {
            subQueryTypeQueAnsMappingId: new FormControl(''),
            subQueryTypeMasterId: new FormControl(''),
            queAnsMasterId: new FormControl(''),
            active: true
          }
        ]
      }
    ])
  }