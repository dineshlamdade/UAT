import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SavePHG,SaveAttributeSelection,SaveAttributeAssignment,UpdateflagCycleCreation} from './payrollheadgroupcreation.model';
import { Observable } from 'rxjs';


//import { Product } from './product';

@Injectable({
    providedIn: 'root'
  })  
export class payrollheadgroupcreation {

    url = 'http://localhost:8084/hrms/v1/';
    constructor(private _HTTP: HttpClient) { }

     // get All PayrollHeadGroup
  getAllPayrollHeadGroup() {
    debugger
    return this._HTTP.get(this.url + 'headGroup')
      .pipe(map((res: any) => {
        return res;
      }));
  }

   // get All Attribute Selection
   getAllAttributeSelection() {
    debugger
    return this._HTTP.get(this.url + 'attribute-group')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  
    //delete Payroll Head Group
    DeletePayrollHeadGroup(id: number) {
      return this._HTTP.delete(this.url + 'headGroup/delete/' + id)
        .pipe(map((res: any) => {
          return res;
        }));
    }

     // get All HeadCreation
  getAllHeadCreation() {
    debugger
    return this._HTTP.get(this.url + 'payrollhead-master')
      .pipe(map((res: any) => {
        return res;
      }));
  }

    //add new PHG
    AddPayrollHeadGroup(data: SavePHG): Observable<number | {}> {
      debugger
      return this._HTTP.post(this.url + 'headGroup', data)
        .pipe(map((res: any) => {
          return res;
        }));
    }

      //get Attribute Selection By Id
      GetPHGById(id: number) {//: Observable<saveBusinessYear | {}> {
        debugger
        return this._HTTP.get(this.url + 'headGroup/getPHGById/' + id)
          .pipe(map((res: any) => {
            return res;
          }));
      }

       
  //update BusinessYear
  UpdatePHGById(id: number, data: SavePHG): Observable<number | {}> {
    debugger
    return this._HTTP.put(this.url + 'headGroup/updateById/' + id, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

    //get Head table list on slection of copy form dropdown 
    GetHeadListByPHGname(PHGname: string) {//: Observable<saveBusinessYear | {}> {
      debugger
      return this._HTTP.get(this.url + 'headGroup/getPHGByName/' + PHGname)
        .pipe(map((res: any) => {
          return res;
        }));
    }

    
      //get GetAttribute OptionList ByGroup
      GetAttributeOptionListByGroup(groupname: string) {//: Observable<saveBusinessYear | {}> {
        debugger
        return this._HTTP.get(this.url + 'attribute-group/getGroupByName/' + groupname)
          .pipe(map((res: any) => {
            return res;
          }));
      }

        //add attribute assignment
    AddAttributeAssignment(data: UpdateflagCycleCreation): Observable<number | {}> {
      debugger
      return this._HTTP.post(this.url + 'payrollhead-attribute-mapping', data)
        .pipe(map((res: any) => {
          return res;
        }));
    }

       //Get AttributeOptionList By HeadGroupId
       GetAttributeOptionListByHeadGroupId(HeadGroupId: number) {//: Observable<saveBusinessYear | {}> {
        debugger
        return this._HTTP.get(this.url + 'payrollhead-attribute-mapping/getAttributeMasterListByHeadGroupId/' + HeadGroupId)
          .pipe(map((res: any) => {
            return res;
          }));
      }

         //Get AttributeOptionList By HeadGroupId
         GetAttributeOptionListByHeadGroupIdGetById(HeadGroupId: number) {//: Observable<saveBusinessYear | {}> {
          debugger
          return this._HTTP.get(this.url + 'payrollhead-attribute-mapping/getByHeadGroupId/' + HeadGroupId)
            .pipe(map((res: any) => {
              return res;
            }));
        }

           // get formula for formula master
  getFromulaForFormulaMaster() {
    debugger
    return this._HTTP.get(this.url + 'formula-master')
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getSDMFormula() {
    debugger
    return this._HTTP.get(this.url + 'companySDMForm')
      .pipe(map((res: any) => {
        return res;
      }));
  }

   //update attribute list by id 
   UpdateattributeListById(data: UpdateflagCycleCreation): Observable<number | {}> {
    debugger
    return this._HTTP.put(this.url + 'payrollhead-attribute-mapping', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
          // //add attribute assignment
          // AddAttributeAssignment(data: SaveAttributeAssignment): Observable<number | {}> {
          //   debugger
          //   return this._HTTP.post(this.url + 'payrollhead-attribute-mapping', data)
          //     .pipe(map((res: any) => {
          //       return res;
          //     }));
          // }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
 


 

    // getProductsSmall() {
    //     return this.http.get<any>('assets/products-small.json')
    //     .toPromise()
    //     .then(res => <Product[]>res.data)
    //     .then(data => { return data; });
    // }

    // getProducts() {
    //     return this.http.get<any>('assets/products.json')
    //     .toPromise()
    //     .then(res => <Product[]>res.data)
    //     .then(data => { return data; });
    // }

    // getProductsWithOrdersSmall() {
    //     return this.http.get<any>('assets/products-orders-small.json')
    //     .toPromise()
    //     .then(res => <Product[]>res.data)
    //     .then(data => { return data; });
    // }

//     generatePrduct(): Product {
//         const product: Product =  {
//             id: this.generateId(),
//             name: this.generateName(),
//             description: "Product Description",
//             price: this.generatePrice(),
//             quantity: this.generateQuantity(),
//             category: "Product Category",
//             inventoryStatus: this.generateStatus(),
//             rating: this.generateRating()
//         };

//         product.image = product.name.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
//         return product;
//     }

//     generateId() {
//         let text = "";
//         let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
//         for (var i = 0; i < 5; i++) {
//             text += possible.charAt(Math.floor(Math.random() * possible.length));
//         }
        
//         return text;
//     }

//     generateName() {
//         return this.productNames[Math.floor(Math.random() * Math.floor(30))];
//     }

//     generatePrice() {
//         return Math.floor(Math.random() * Math.floor(299)+1);
//     }

//     generateQuantity() {
//         return Math.floor(Math.random() * Math.floor(75)+1);
//     }

//     generateStatus() {
//         return this.status[Math.floor(Math.random() * Math.floor(3))];
//     }

//     generateRating() {
//         return Math.floor(Math.random() * Math.floor(5)+1);
//     }
}

export interface Product {
    // id?:string;
     code:string;
     attributeNature:string;
     description:string;
     // price?:number;
     // quantity?:number;
     // inventoryStatus?:string;
     // category?:string;
     // image?:string;
     // rating?:number;
   }