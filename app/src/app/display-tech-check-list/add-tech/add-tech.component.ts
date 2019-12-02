import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastyService } from 'ng2-toasty';

import { TechCheckList } from '../../models/techCheckList';
import { TechCheckListService } from '../../services/tech-check-list.service';
import { unescapeIdentifier } from '@angular/compiler';

@Component({
  selector: 'app-add-tech',
  templateUrl: './add-tech.component.html',
  styleUrls: ['./add-tech.component.scss']
})
export class AddTechComponent implements OnInit {

  @Input() checkList: TechCheckList;
  @Input() addStatus: boolean;
  @Input() id: string;
  techName;
  techDesc;
  dos;
  donts;
  desc;
  percen;
  dosOrdonts;

  dosDonts = ['Dos', 'Donts'];
  displayedColumns: string[] = ['delete', 'item']; //, 'percentage'

  reset() {
    this.checkList = undefined;
    this.addStatus = true;
    this.id = undefined;
    this.techName = undefined;
    this.techDesc = undefined;
    this.dos = undefined;
    this.donts = undefined;
  }

  constructor(public dialogRef: MatDialogRef<AddTechComponent>, readonly toastyService: ToastyService,
    readonly techCheckListService: TechCheckListService) {
    dialogRef.disableClose = true;
  }

  delete(event, item) {
    if (event === 'dos') {
      console.log('event', event, item);
      if (this.checkList[0].dos.length > 1) {
        console.log('a', item);
        this.techCheckListService.deleteTechCheckList(this.id, item._id, 'dos').subscribe(a => {
          this.getTechCheckList();
          this.toastyMessage(a);
          console.log('a', a);
        })
      } else {
        // this.toastyService.warning('Select any one item in the list');
      }
    } else if (event === 'donts') {
      console.log('event', event, item);
      if (this.checkList[0].donts.length > 1) {
        console.log('a', item);
        this.techCheckListService.deleteTechCheckList(this.id, item._id, 'donts').subscribe(a => {
          this.getTechCheckList();
          this.toastyMessage(a);
          console.log('a', a);
        })
      } else {
        // this.toastyService.warning('Select any ccone item in the list');
      }
    }
  }

  ngOnInit() {
    // this.addStatus = true;
    if (!this.addStatus) {
      this.techName = this.checkList[0].name;
      this.techDesc = this.checkList[0].desc;
      this.id = this.checkList[0]._id;
      this.dos = this.checkList[0].dos;
      this.donts = this.checkList[0].donts;
      console.log("this.addStatus", this.techName);
      console.log("this.addStatus", this.dos);
      console.log("this.checkList", this.donts);
    }
  }

  getTechCheckList() {
    this.techCheckListService.getTechCheckListById(this.id).subscribe(data => {
      this.checkList = data.data;
      this.techName = data.data[0].name;
      this.techDesc = data.data[0].desc;
      this.id = data.data[0]._id;
      this.dos = data.data[0].dos;
      this.donts = data.data[0].donts;
      console.log('data', data.data[0].name);
      console.log('data', data.data[0]);
    },
      error => {
        console.log('error', error.message);
      })
  }

  toastyMessage(val) {
    if (val.status === 1) {
      this.toastyService.success(val.message);
    } else {
      this.toastyService.error(val.message);
    }
  }

  add() {
    if (this.addStatus && !this.dos) {
      this.dos = [];
      this.donts = [];
      if (this.dosOrdonts === "Dos") {
        this.dos.push({ "list": this.desc, "percentage": this.percen })
      } else {
        this.donts.push({ "list": this.desc, "percentage": this.percen })
      }
      this.checkList = { "name": this.techName, "desc": this.techDesc, "dos": this.dos, "donts": this.donts }
      this.techCheckListService.addTechCheckList(this.checkList).subscribe(a => {
        this.addStatus = false;
        console.log(a);
        this.id = a.id;
        this.toastyMessage(a);
        this.getTechCheckList();
        this.dosOrdonts = '';
        this.desc = '';
      })
    } else {
      if (this.dosOrdonts === "Dos") {
        this.dos.push({ "list": this.desc, "percentage": this.percen })
      } else {
        this.donts.push({ "list": this.desc, "percentage": this.percen })
      }
      this.checkList = { "name": this.techName, "desc": this.techDesc, "dos": this.dos, "donts": this.donts }
      this.techCheckListService.updateTechCheckList(this.checkList, this.id).subscribe(a => {
        console.log(a);
        this.toastyMessage(a);
        this.getTechCheckList();
        this.dosOrdonts = '';
        this.desc = '';
      })
    }
  }

}
