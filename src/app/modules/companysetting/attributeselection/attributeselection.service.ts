import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SaveAttributeSelection} from './attributeselection.model';
import { Observable } from 'rxjs';


//import { Product } from './product';

@Injectable({
    providedIn: 'root'
  })
  
export class attributeselection {

    // status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

    // productNames: string[] = [
    //     "Bamboo Watch", 
    //     "Black Watch", 
    //     "Blue Band", 
    //     "Blue T-Shirt", 
    //     "Bracelet", 
    //     "Brown Purse", 
    //     "Chakra Bracelet",
    //     "Galaxy Earrings",
    //     "Game Controller",
    //     "Gaming Set",
    //     "Gold Phone Case",
    //     "Green Earbuds",
    //     "Green T-Shirt",
    //     "Grey T-Shirt",
    //     "Headphones",
    //     "Light Green T-Shirt",
    //     "Lime Band",
    //     "Mini Speakers",
    //     "Painted Phone Case",
    //     "Pink Band",
    //     "Pink Purse",
    //     "Purple Band",
    //     "Purple Gemstone Necklace",
    //     "Purple T-Shirt",
    //     "Shoes",
    //     "Sneakers",
    //     "Teal T-Shirt",
    //     "Yellow Earbuds",
    //     "Yoga Mat",
    //     "Yoga Set",
    // ];
    url = 'http://localhost:8084/hrms/v1/';
    constructor(private _HTTP: HttpClient) { }

     // get All AttributeCreation
  getAllAttributeCreation() {
    debugger
    return this._HTTP.get(this.url + 'payrollhead-attribute-master')
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

    //get Attribute Selection By Id
    GetAttributeSelectionById(id: number) {//: Observable<saveBusinessYear | {}> {
        debugger
        return this._HTTP.get(this.url + 'attribute-group/global/' + id)
          .pipe(map((res: any) => {
            return res;
          }));
      }

        
  //update attribute-group by id
  UpdateAttributeGroup(id: number, data: SaveAttributeSelection): Observable<number | {}> {
    debugger
    return this._HTTP.put(this.url + 'attribute-group/updateById/' + id, data)
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


  //add new Attribute Selection
  AddAttributeSelection(data: SaveAttributeSelection): Observable<number | {}> {
    debugger
    return this._HTTP.post(this.url + 'attribute-group', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }


    //delete AttributeSelection
    DeleteAttributeSelection(id: number) {
      return this._HTTP.delete(this.url + 'attribute-group/delete/' + id)
        .pipe(map((res: any) => {
          return res;
        }));
    }

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