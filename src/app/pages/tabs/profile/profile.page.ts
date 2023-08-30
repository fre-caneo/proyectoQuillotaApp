import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {} as User

  constructor(
    private firebasSvc: FirebaseService,
    private UtilsSvc: UtilsService
  ) { }



  ngOnInit() {
  }

  ionViewWillEnter() {

    this.getUser()
  }



  getUser() {
    return this.user = this.UtilsSvc.getElementFromLocalStorage('user')
  }

  signOut() {
    this.UtilsSvc.presentAlert({
        header: 'Cerrar Sesión',
        message: '¿Quieres cerrar Sesion?',
        mode: 'ios',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',

          }, {
            text: 'Si, cerrar',
            handler: () => {
              this.firebasSvc.signOut();
            }
          }
        ]
      })


    }
}
