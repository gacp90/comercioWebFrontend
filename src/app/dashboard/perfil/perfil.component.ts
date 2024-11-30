import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/app/models/user.model';

import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  public user!: User;

  constructor(  private userService: UserService,
                private fb: FormBuilder){
    this.user = userService.user;
    this.updateForm.setValue({
      name: this.user.name || '',
      lastname: this.user.lastname || '',
      cedula: this.user.cedula || '',
      phone: this.user.phone || '',
      address: this.user.address || '',
      city: this.user.city || '',
      department: this.user.department || ''
    })          

  }

  /** ================================================================
   *  UPDATE PROFILE
  ==================================================================== */
  public updateFormSubmitted: boolean = false;
  public updateForm = this.fb.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    cedula: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    department: ['', [Validators.required]]
  })

  update(){

    this.updateFormSubmitted = true;

    if (this.updateForm.invalid) {
      return;
    }

    this.userService.updateUser(this.updateForm.value, this.user._id!)
        .subscribe( ({client}) => {

          this.user.name = client.name;
          this.user.lastname = client.lastname;
          this.user.cedula = client.cedula;
          this.user.phone = client.phone;
          this.user.address = client.address;
          this.user.city = client.city;
          this.user.department = client.department;

          this.userService.user.name = this.user.name;
          this.userService.user.lastname = this.user.lastname;
          this.userService.user.cedula = this.user.cedula;
          this.userService.user.phone = this.user.phone;
          this.userService.user.address = this.user.address;
          this.userService.user.city = this.user.city;
          this.userService.user.department = this.user.department;

          Swal.fire('Estupendo', 'Se ha actualizado el perfil exitosamente!', 'success');
          this.updateFormSubmitted = false;

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

  }

  validate(campo: string): boolean{
    if (this.updateFormSubmitted && this.updateForm.get(campo)?.invalid) {
      return true;
    }else{
      return false;
    }
  }

}
