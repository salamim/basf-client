import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { UsersService } from './../../services/users.service';
import { AddressService } from './../../services/address.service';
import { AddressModel } from './../../models/address-model';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  formData: FormGroup;
  addresses: AddressModel[] =[];
  editUser: boolean = false;

  constructor(private builder: FormBuilder, private addressService:AddressService) {}

  ngOnInit(): void {
    this.formData = this.builder.group({
      userId: new FormControl(0),
      username: new FormControl('', [Validators.required]),
      address1: new FormControl('', [Validators.required]),
      address2: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required])
    });
  }

  onSubmit(formData): void {
    if (this.editUser){
      this.updateUser(formData);
      this.editUser = false;
    }
    else {
      this.insertUser(formData);
    }

    this.resetForm();
  }

  resetForm() {
    this.formData.setValue({
      userId:0,
      username:'',
      address1:'',
      address2:'',
      city:'',
      state:'',
      zip:''
    })
  }

  showEditUser(userId: number) {
    this.editUser = true;

    let selectedAddress = this.addresses.filter((address)=> {
      return address.userId === userId;
    })

    this.formData.patchValue({
      userId: selectedAddress[0].userId,
      username: selectedAddress[0].username,
      address1: selectedAddress[0].address1,
      address2: selectedAddress[0].address2,
      city: selectedAddress[0].city,
      state: selectedAddress[0].state,
      zip: selectedAddress[0].zip
    })
  }

  insertUser(formData) {
     this.addressService.addAddress(formData).subscribe((addresses)=>{
      this.addresses = addresses;
    });
  }

  updateUser(formData) {
     this.addressService.updateAddress(formData).subscribe((addresses)=>{
      this.addresses = addresses;
    });
  }

  deleteUser(userId: number) {
    this.addressService.deleteAddress(userId).subscribe((addresses)=>{
       this.addresses = addresses;
   });
  }
}
