import { Injectable } from '@angular/core';
import { AddressModel } from './../models/address-model';
import { of, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  userAddresses: AddressModel[] = new Array();

  constructor() { }

   addAddress(formData): Observable<AddressModel[]> {
     formData.userId = this.userAddresses.length+1;
     let newAddresses = [...this.userAddresses];
     newAddresses.push(formData);

     this.userAddresses = newAddresses;
     return of(this.userAddresses);
  }

  getAddresses(): Observable<AddressModel[]> {
    return of(this.userAddresses);
  }

  updateAddress(formData): Observable<AddressModel[]> {
    let updatedAddresses = this.userAddresses.map((userAddress)=>{
      if (userAddress.userId === formData.userId) {
        return formData;
      }
      else {
        return userAddress;
      }
    })

    return of(updatedAddresses);
  }

  deleteAddress(userId:number):Observable<AddressModel[]> {
    let updatedAddresses = this.userAddresses.filter((userAddress)=>{
      return userAddress.userId !==userId;
    })
    return of(updatedAddresses);
  }
}
