import { Component, ComponentRef } from '@angular/core';
import { PartidoModel } from '../partido.model';
import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { Subject } from 'rxjs';
import { PartidosService } from '../partidos.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-partido-modal',
  templateUrl: './partido-modal.component.html',
  styleUrls: ['./partido-modal.component.css']
})
export class PartidoModalComponent implements IModalDialog {
  partido: PartidoModel;
  private closingSubject$: Subject<void>;
  public partidoForm: FormGroup;

  constructor(
    private service: PartidosService,
    private toastr: ToastrService
  ) {
  }


  dialogInit(
    reference: ComponentRef<IModalDialog>,
    options: Partial<IModalDialogOptions<any>>) {
    this.closingSubject$ = options.closeDialogSubject;
    this.partido = options.data;
    this.initForm();
  }

  public save() {
    const action = this.partido.id ? this.service.update(this.partidoForm.value) : this.service.create(this.partidoForm.value);
    const msg = this.partido.id ? 'Partido atualizado com sucesso' : 'Partido adicionado com sucesso';
    action.subscribe((resp: any) => {
      console.log(resp);
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
      this.close();
      this.service.updateList.next(true);
    });
  }

  public close() {
    if (this.closingSubject$) {
      this.closingSubject$.next();
    }
  }

  private initForm() {
    this.partidoForm = new FormGroup({
      'id': new FormControl(this.partido.id),
      'nome': new FormControl(this.partido.nome, [Validators.required]),
      'sigla': new FormControl(this.partido.sigla, [Validators.required, Validators.maxLength(10)]),
      'numero': new FormControl(this.partido.numero, [Validators.required]),
      'fundo': new FormControl(this.partido.fundo),
    });
  }
}

