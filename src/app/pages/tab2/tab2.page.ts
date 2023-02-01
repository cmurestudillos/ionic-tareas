import { Component } from '@angular/core';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: []
})
export class Tab2Page {
  constructor( public tareasService: TareasService ) {}
}
