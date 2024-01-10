import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() popupInfo: any = {
    popupMessage:'',
    popupHeader:'',
    popupClasses:'',
  }
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();

  onCloseClick() {
    this.closePopup.emit();
  }
}
