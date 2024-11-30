import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {

  public user!: User;

  constructor(  private usersService: UserService,
                private fb: FormBuilder){
                  this.user = usersService.user;
                }

  /** =============================================================
   * ACTUALIZAR PERFIL
  =============================================================== */
  public formSubmitted: boolean = false;
  public updateForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    repassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  update(){
    
    this.formSubmitted = true;
    
    if (this.updateForm.invalid) {
      return;
    }

    if (this.updateForm.value.password !== this.updateForm.value.repassword) {
      Swal.fire('Atención', 'Las contraseñas no son iguales', 'warning');
      return;
    }

    this.usersService.updateUser(this.updateForm.value, this.user.cid!)
        .subscribe( ({client}) => {          

          this.formSubmitted = false;

          this.updateForm.reset();

          Swal.fire('Estupendo', 'Se ha actualizado la contraseña exitosamente!', 'success');

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
        });

  }

  /** =============================================================
   * VALIDAR CAMPOS
  =============================================================== */
  validate(campo: string): boolean{
    
    if (this.formSubmitted && this.updateForm.get(campo)?.invalid) {
      return true;  
    }else{
      return false;
    }
    
  }

}
