import { ModalComponent } from './../modal/modal.component';
import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// import { ModalComponent } from '../nav/nav.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  bsModalRef: BsModalRef;

constructor(private modalService: BsModalService) { }


openModalWithComponent() {
  const initialState = {
    list: [

    ],
    title: 'Login'
  };
  this.bsModalRef = this.modalService.show(ModalComponent , {class: 'modal-dialog-centered' , initialState});
  this.bsModalRef.content.closeBtnName = 'Login';
}

}
