import { Component, Input, ViewChild } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: [],
})
export class ListasComponent {
  @ViewChild( IonList ) lista: IonList;
  @Input() terminada = true;

  constructor( public tareasService: TareasService,
               private router: Router,
               private alertCtrl: AlertController ) { }


  listaSeleccionada( lista: Lista ) {
    if ( this.terminada ) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }

  borrarLista( lista: Lista ) {
    this.tareasService.borrarLista( lista );
  }

  async editarLista( lista: Lista ) {
    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btn-cancelar',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          cssClass: 'btn-confirmar',
          handler: ( data ) => {
            if ( data.titulo.length === 0 ) {
              return;
            }

            lista.titulo = data.titulo;
            this.tareasService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();
  }

}
