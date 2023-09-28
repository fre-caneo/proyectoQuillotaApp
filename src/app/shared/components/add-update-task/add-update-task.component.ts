import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Item, Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss'],
})
export class AddUpdateTaskComponent  implements OnInit {

  @Input() task: Task;
  user = {} as User

  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('',[Validators.required, Validators.minLength(4)]),
    description: new FormControl('',[Validators.required, Validators.minLength(4)]),
    items: new FormControl([],[Validators.required, Validators.minLength(1)])

  })

  constructor(
    private firebasSvc: FirebaseService,
    private UtilsSvc: UtilsService
  ) { }

  ngOnInit() {

    this.user = this.UtilsSvc.getElementFromLocalStorage('user')

    if(this.task){
      this.form.setValue(this.task);
      this.form.updateValueAndValidity()
    }
  }

  // ======== Crear o Actualizar Tarea =======
  submit() {

    if (this.form.valid) {

      if (this.task) {
        this.updateTask()
      } else {

        this.createTask();
      }
    }

  }
 // =========== Crear Tarea ===========
  createTask() {
    let path = `users/${this.user.uid}`;

    this.UtilsSvc.presentLoading();
    delete this.form.value.id;

    this.firebasSvc.addToSubcollection(path, 'tasks', this.form.value).then(res => {

      this.UtilsSvc.dismissModal({ success: true });

      this.UtilsSvc.presentToast({
        message: 'Sugerencia creada exitosamente',
        color: 'success',
        icon: 'checkmark-circle-outline',
        duration: 1500
      })

      this.UtilsSvc.dimissLoading()
    }, error => {

      this.UtilsSvc.presentToast({
        message: error,
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 5000
      })

      this.UtilsSvc.dimissLoading()

    })
  }

  // =========== Editar Tarea ==========
  updateTask() {
    let path = `users/${this.user.uid}/tasks/${this.task.id}`;

    this.UtilsSvc.presentLoading();
    delete this.form.value.id;

    this.firebasSvc.updateDocument(path, this.form.value).then(res => {

      this.UtilsSvc.dismissModal({ success: true });

      this.UtilsSvc.presentToast({
        message: 'Tarea actualizada exitosamente',
        color: 'success',
        icon: 'checkmark-circle-outline',
        duration: 1500
      })

      this.UtilsSvc.dimissLoading()
    }, error => {

      this.UtilsSvc.presentToast({
        message: error,
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 5000
      })

      this.UtilsSvc.dimissLoading()

    })
  }

  getPercentage(){
    return this.UtilsSvc.getpercentage(this.form.value as Task)

  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {

    this.form.value.items = ev.detail.complete(this.form.value.items);
    this.form.updateValueAndValidity();
   
    
  }
  
  removeItem(index:number){
    this.form.value.items.splice(index,1);
    this.form.controls.items.updateValueAndValidity();

  }

  createItem(){
    this.UtilsSvc.presentAlert({
      header: 'Soluciones a realizar',
      backdropDismiss: false,
      inputs:[
        {
          name: 'name',
          type: 'textarea',
          placeholder: 'Escribe algo...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        }, {
          text: 'Agregar',
          handler: (res) => {
           

            let item: Item = {name:  res.name, completed: false};
            this.form.value.items.push(item);
            this.form.controls.items.updateValueAndValidity();
          }
        }
      ]
    })
  }

}
