import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './my-Investments.dialogBox.html',
 // styleUrls: [' ']
})
export class ConfirmDialogComponent implements OnInit {
  public currentFileUpload: File;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  public ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public onNoClick(): void {
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
    // this.upload();
}
}
