import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './declarationEditUpload.html'
 // styleUrls: [' ']
})
export class ConfirmDialogComponent implements OnInit {
  currentFileUpload: File;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onUpload(event) {
    console.log(event);
    if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.currentFileUpload = file;
    }
    console.log(this.currentFileUpload);
    // for(let file of event.files) {
    //     this.uploadedFiles.push(file);

    // }
    // this.SuccessMessage();
    //this.upload();
}
}
