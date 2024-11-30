import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public user!: User;
  constructor(  private userService: UserService){
    this.user = userService.user;
  }


  /** ================================================================
   *  LOGOUT
  ==================================================================== */
  logout(){ 
    localStorage.removeItem('token');
    window.location.reload();
  }

  /** ================================================================
   *  CLIPBOARD
  ==================================================================== */

  copyToClipboard() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData!.setData('text/plain', (`https://comerciollanero.com/registrarme?referCode=${this.user.referralCode}`));
      e.preventDefault();
      document.removeEventListener('copy', null!);
    });
    document.execCommand('copy');

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Se a copiado el link al portapapeles",
      showConfirmButton: false,
      timer: 1000,
      backdrop: false
    });

  }

}
