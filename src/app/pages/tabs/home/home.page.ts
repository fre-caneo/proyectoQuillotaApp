import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';

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
        {name: 'Actividad 2', completed: false},
        {name: 'Actividad 3', completed: false},
      ]
    },
    {
      id: '3',
      title: 'Primera Peticion',
      description: 'Primera Peticion del municipio',
      items : [
        {name: 'Actividad 1', completed: true},
        {name: 'Actividad 2', completed: false},
        {name: 'Actividad 3', completed: false},
      ]
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
