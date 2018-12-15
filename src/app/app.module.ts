import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PartidoModalComponent } from './partido-modal/partido-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RemoveModalComponent } from './remove-modal/remove-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PartidoModalComponent,
    RemoveModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule,
    ModalDialogModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    PartidoModalComponent,
    RemoveModalComponent
  ]
})
export class AppModule {
}
