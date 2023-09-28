import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateTaskComponent } from 'src/app/shared/components/add-update-task/add-update-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tasks: Task[] = [
    {
      id: '1',
      title: 'Primera Queja',
      description: 'Primera queja del municipio',
      items : [
        {name: 'Actividad 1', completed: true},
        {name: 'Actividad 2', completed: false},
        {name: 'Actividad 3', completed: false},

      ]
    },
    {
      id: '2',
      title: 'Primera Sugerencia del municipio',
      description: 'Primera sugerencia del municipio',
      items : [
        {name: 'Actividad 1', completed: true},
        {name: 'Actividad 2', completed: true},
        {name: 'Actividad 3', completed: true},
      ]
    },
    {
      id: '3',
      title: 'Primera Peticion',
      description: 'Primera Peticion del municipio',
      items : [
        {name: 'Actividad 1', completed: true},
        {name: 'Actividad 2', completed: true},
        {name: 'Actividad 3', completed: false},
      ]
    },
  ]

  constructor(
    private firebasSvc: FirebaseService,
    private UtilsSvc: UtilsService

  ) { }

  ngOnInit() {
    this.addOrUpdateTask(this.tasks[0])
  }

  getPercentage(task: Task){
    return this.UtilsSvc.getpercentage(task)

  }

  addOrUpdateTask(task?: Task){
    this.UtilsSvc.presentModal({
      component: AddUpdateTaskComponent,
      componentProps : {task},
      cssClass : ''
    })
  }

}
