import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTechComponent } from './add-tech/add-tech.component';
import { TechCheckListService } from '../services/tech-check-list.service';

@Component({
  selector: 'app-display-tech-check-list',
  templateUrl: './display-tech-check-list.component.html',
  styleUrls: ['./display-tech-check-list.component.scss']
})
export class DisplayTechCheckListComponent implements OnInit {

  techList = [];
  radioSelected: any;
  selectCheckList;
  dos;
  donts;
  displayedColumns: string[] = ['item', 'percentage'];

  dialogRef: MatDialogRef<any>;
  techCheckList = [];
  // techCheckList = [{
  //   "tech": "Angular",
  //   "dos": [{ "item": 'Check 1', "percentage": "20" }, { "item": 'Check 2', "percentage": "20" },
  //   { "item": 'Check 3', "percentage": "20" }, { "item": 'Check 4', "percentage": "20" }, { "item": 'Check 5', "percentage": "20" }],
  //   "donts": [{ "item": 'DONT Check 1', "percentage": "20" }, { "item": 'DONT Check 2', "percentage": "20" },
  //   { "item": 'DONT Check 3', "percentage": "20" }, { "item": 'DONT Check 4', "percentage": "20" }, { "item": 'DONT Check 5', "percentage": "20" }]
  // },
  // {
  //   "tech": "Typescript",
  //   "dos": [{ "item": 'TS Check 1', "percentage": "20" }, { "item": 'TS Check 2', "percentage": "20" },
  //   { "item": 'TS Check 3', "percentage": "20" }, { "item": 'TS Check 4', "percentage": "20" }, { "item": 'TS Check 5', "percentage": "20" }],
  //   "donts": [{ "item": 'DONT TS Check 1', "percentage": "20" }, { "item": 'DONT TS Check 2', "percentage": "20" },
  //   { "item": 'DONT TS Check 3', "percentage": "20" }, { "item": 'DONT TS Check 4', "percentage": "20" }, { "item": 'DONT TS Check 5', "percentage": "20" }]
  // },
  // {
  //   "tech": "Javascript",
  //   "dos": [{ "item": 'JS Check 1', "percentage": "20" }, { "item": 'JS Check 2', "percentage": "20" },
  //   { "item": 'JS Check 3', "percentage": "20" }, { "item": 'JS Check 4', "percentage": "20" }, { "item": 'JS Check 5', "percentage": "20" }],
  //   "donts": [{ "item": 'DONT JS Check 1', "percentage": "20" }, { "item": 'DONT JS Check 2', "percentage": "20" },
  //   { "item": 'DONT JS Check 3', "percentage": "20" }, { "item": 'DONT JS Check 4', "percentage": "20" }, { "item": 'DONT JS Check 5', "percentage": "20" }]
  // }]

  constructor(public dialog: MatDialog, readonly techCheckListService: TechCheckListService) { }

  ngOnInit() {
    this.getTechCheckList();
  }

  getTechCheckList() {
    this.techCheckListService.getTechCheckList().subscribe(data => {
      console.log(data.data);
      this.techCheckList = data.data;
      this.techList = [];
      for (const item of data.data) {
        this.techList.push(item.name);
      }
      if (this.selectCheckList) {
        this.filter4Tech(this.selectCheckList[0].name);
      }
    },
      error => {
        console.log('error', error.message);
      })
  }

  filter4Tech(selectItem) {
    this.selectCheckList = this.techCheckList.filter(a => a.name === selectItem);
    this.dos = this.selectCheckList[0].dos;
    this.donts = this.selectCheckList[0].donts;
    console.log(this.selectCheckList);
  }

  openDialog(addStatus: boolean) {
    this.dialogRef = this.dialog.open(AddTechComponent, {
      height: '90%',
      width: '90%'
    });
    this.dialogRef.componentInstance.checkList = this.selectCheckList;
    if (!addStatus) {
      console.log("this.selectCheckList._id", this.selectCheckList[0]._id);
      this.dialogRef.componentInstance.id = this.selectCheckList._id;
    }
    this.dialogRef.componentInstance.addStatus = addStatus;
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
      console.log('addStatus', addStatus);
      if (addStatus === false) {
        this.getTechCheckList();
      } else {
        this.getTechCheckList();
      }
    });
  }

}
