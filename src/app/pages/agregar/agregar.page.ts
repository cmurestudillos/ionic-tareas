import { Component } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: [],
})
export class AgregarPage{
  lista: Lista;
  nombreItem = '';
  idItem = null;

  constructor( private tareasService: TareasService, private route: ActivatedRoute ) {
    const listaId = this.route.snapshot.paramMap.get('listaId');
    this.lista = this.tareasService.obtenerLista( listaId );
  }

  agregarItem() {
    if ( this.nombreItem.length === 0 ) {
      return;
    }
    if(this.idItem === null){
      const nuevoItem = new ListaItem( this.nombreItem );
      this.lista.items.push( nuevoItem );
    } else {
      this.lista.items[this.idItem].desc = this.nombreItem;
    }

    this.nombreItem = '';
    this.tareasService.guardarStorage();

  }

  cambioCheck( item: ListaItem ) {
    const pendientes = this.lista.items.filter( itemData => !itemData.completado ).length;
    if ( pendientes === 0 ) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }
    this.tareasService.guardarStorage();
  }

  editar(i: number) {
    this.idItem = i;
    this.nombreItem = this.lista.items[i].desc;
  }

  borrar( i: number ) {
    this.lista.items.splice( i, 1 );
    this.tareasService.guardarStorage();
  }
}
