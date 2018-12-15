import { Component, ComponentRef } from '@angular/core';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { PartidosService } from '../partidos.service';
import { Subject } from 'rxjs';
import { PartidoModel } from '../partido.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-remove-modal',
  templateUrl: './remove-modal.component.html',
  styleUrls: ['./remove-modal.component.css']
})
export class RemoveModalComponent implements IModalDialog {
  public object: PartidoModel;
  public closingSubject$: Subject<void>;
  private service;

  constructor(
    private toastr: ToastrService
  ) {
  }

  dialogInit(
    reference: ComponentRef<IModalDialog>,
    options: Partial<IModalDialogOptions<any>>) {
    this.closingSubject$ = options.closeDialogSubject;
    this.object = options.data.data;
    this.service = options.data.service;
  }

  public close() {
    if (this.closingSubject$) {
      this.closingSubject$.next();
    }
  }

  public confirm() {
    this.service.delete(this.object.id).subscribe((resp: any) => {
      this.toastr.success(resp.message);
    }, (errorResponse: HttpErrorResponse) => {
      console.error(errorResponse);
      let message: string;
      if (!errorResponse.error) {
        message = 'Não foi possível adicionar o processo.';
      } else {
        message = '';
        errorResponse.error.errors.forEach((err, ind, arr) => {
          message += `${err}`;
          if ((ind + 1) !== arr.length) {
            message += '<br>';
          }
        });
      }
      this.toastr.error(message, 'Erro(s) ao salvar o processo:', {
        enableHtml: true
      });
    }, () => {
      this.service.updateList.next(true);
      this.close();
    });
  }

}
