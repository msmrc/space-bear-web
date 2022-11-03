import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-in-progress-modal',
  templateUrl: 'in-progress-modal.component.html',
  styleUrls: ['./in-progress-modal.component.scss']
})
export class InProgressModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InProgressModalComponent>) { }

  ngOnInit() {
  }

  public close(): void {
    this.dialogRef.close();
  }
}
