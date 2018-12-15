import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PartidoModel } from './partido.model';
import { PartidosService } from './partidos.service';
import { Subscription } from 'rxjs';
import { ModalDialogService } from 'ngx-modal-dialog';
import { PartidoModalComponent } from './partido-modal/partido-modal.component';
import { isNullOrUndefined } from 'util';
import { RemoveModalComponent } from './remove-modal/remove-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  partidos: PartidoModel[];
  private sub: Subscription;

  constructor(
    private service: PartidosService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    this.getAll();
    this.service.updateList.subscribe(update => {
      if (!isNullOrUndefined(update) && update) {
        this.getAll();
      }
    });
  }

  create() {
    this.openModal(new PartidoModel());
  }


  public openModal(partido: PartidoModel) {
    const data = Object.assign(new PartidoModel(), partido);
    this.modalService.openDialog(this.viewRef, {
      childComponent: PartidoModalComponent,
      data: data
    });
  }

  private getAll() {
    this.sub = this.service.getAll().subscribe((resp) => {
        this.partidos = resp;
      },
      error1 => console.error(error1),
      () => {
        console.log('success');
      });
  }

  removerPartido(partido: PartidoModel) {
    this.modalService.openDialog(this.viewRef, {
      childComponent: RemoveModalComponent,
      data: {data: partido, service: this.service}
    });
  }
}
