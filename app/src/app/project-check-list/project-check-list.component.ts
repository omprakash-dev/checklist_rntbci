import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TechCheckListService } from '../services/tech-check-list.service';
import { AppTechStacksService } from '../services/app-tech-stacks.service';
import { AppTechStacksCheckListsService } from '../services/app-tech-stacks-check-lists.service';
import { AddAppTechStackComponent } from './add-app-tech-stack/add-app-tech-stack.component';

@Component({
  selector: 'app-project-check-list',
  templateUrl: './project-check-list.component.html',
  styleUrls: ['./project-check-list.component.scss']
})
export class ProjectCheckListComponent implements OnInit {
  appList = [];
  dialogRef: MatDialogRef<any>;
  selectedApp = '';
  addButtonName = 'Add';
  selectedAppList;
  // selectedAppValue;
  techList = ['Angular', 'Typescript', 'Javascript', 'CSS', 'HTML'];
  displayedColumns: string[] = ['check', 'item']; //, 'percentage'
  radioSelected: any;

  accordinIndex;
  pIndex;
  isExpanded = false;

  projectName;
  projectDesc;

  displayCheckList = false;

  selectedTechCheckList;
  selectedTech = [];
  techCheckList = [];
  selectCheckList;

  selectedDos;
  selectedDonts;

  appTechStackcheckList;

  updStatus = false;
  appID;
  techNameID;


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

  constructor(readonly dialog: MatDialog, readonly appTechStacksService: AppTechStacksService,
    readonly techCheckListService: TechCheckListService, readonly appTechStacksCheckListsService: AppTechStacksCheckListsService) { }

  ngOnInit() {
    this.getProjectList();
  }

  getTechCheckList() {
    this.techCheckListService.getTechCheckList().subscribe(data => {
      console.log(data.data);
      this.techCheckList = data.data;
      this.techList = [];
      for (const item of data.data) {
        this.techList.push(item.name);
      }
      if (data.data.length > 0) {
        console.log(data.data[0]);
        if (data.data[0].dos.length > 0) {
          this.filter4Tech(data.data[0].name);
        }
      }

    },
      error => {
        console.log('error', error.message);
      })
  }

  dos = [];
  donts = [];
  filter4Tech(selectItem) {
    this.dos = [];
    this.donts = [];

    this.selectCheckList = this.techCheckList.filter(a => a.name === selectItem);
    // this.dos = this.selectCheckList[0].dos;
    // this.donts = this.selectCheckList[0].donts;
    for (const item of this.selectCheckList[0].dos) {
      this.dos.push({ 'checked': false, 'list': item.list })
    }
    for (const item of this.selectCheckList[0].donts) {
      this.donts.push({ 'checked': false, 'list': item.list })
    }
    // this.dos = this.selectCheckList[0].dos;
    // this.donts = this.selectCheckList[0].donts;
    console.log('this.selectCheckList', this.selectCheckList);
  }

  setCheckedCheckList(selectItem) {
    this.updStatus = false;
    console.log('data', this.appTechStackcheckList);
    console.log('length', this.appTechStackcheckList[0].techStacks.filter(c => c.techName === selectItem).length);
    if (this.appTechStackcheckList[0].techStacks.filter(c => c.techName === selectItem).length > 0) {
      this.updStatus = true;
      this.appID = this.appTechStackcheckList[0]._id;
      this.techNameID = this.appTechStackcheckList[0].techStacks[0]._id;
      for (const item of this.appTechStackcheckList[0].techStacks[0].dos) {
        if (this.dos.filter(v => v.list === item.list).length > 0) {
          this.dos[this.dos.findIndex(v => v.list === item.list)].checked = true;
          this.selectedDos.push({ "list": this.dos[this.dos.findIndex(v => v.list === item.list)].list });
        }
      }
      for (const item of this.appTechStackcheckList[0].techStacks[0].donts) {
        if (this.donts.filter(v => v.list === item.list).length > 0) {
          this.donts[this.donts.findIndex(v => v.list === item.list)].checked = true;
          this.selectedDonts.push({ "list": this.donts[this.donts.findIndex(v => v.list === item.list)].list });
        }
      }
    }
  }

  closeStep(index) {
    if (index === this.accordinIndex) {
      this.isExpanded = !this.isExpanded;
    }
  }

  onChangeDosTechSelected(event) {
    if (event.checked) {
      if (this.selectedDos.filter(x => x.list === event.source.value).length <= 0) {
        this.selectedDos.push({ "list": event.source.value });
      }
    } else {
      if (this.selectedDos.filter(x => x.list === event.source.value).length > 0) {
        this.selectedDos.splice(this.selectedDos.findIndex(x => x.list === event.source.value), 1);
      }
    }
    console.log('event', event);
    console.log('event', this.selectedDos);
  }

  onChangeDontsTechSelected(event) {
    console.log('eventsss', this.selectedDonts);
    if (event.checked) {
      if (this.selectedDonts.filter(x => x.list === event.source.value).length <= 0) {
        this.selectedDonts.push({ "list": event.source.value });
      }
    } else {
      if (this.selectedDonts.filter(x => x.list === event.source.value).length > 0) {
        console.log('eventval', event.source.value);
        this.selectedDonts.splice(this.selectedDonts.findIndex(x => x.list === event.source.value), 1);
      }
    }
    console.log('event', event);
    console.log('event', this.selectedDonts);
  }

  update(techSel) {
    console.log(techSel, this.selectedApp);
    if (this.selectedDonts.length === 0 && this.selectedDos.length === 0) {
      alert("select any one option");
    } else {

      if (!this.updStatus) {
        const query = { "name": this.selectedApp, "techStacks": [{ "techName": techSel, "dos": this.selectedDos, "donts": this.selectedDonts }] }
        this.appTechStacksCheckListsService.addAppTechStacksCheckList(query).subscribe(data => {
          console.log(data);
          this.getAppTechStackCheckList();
        })
      } else {
        const query = { "name": this.selectedApp, "techStacks": [{ "techName": techSel, "dos": this.selectedDos, "donts": this.selectedDonts }] }
        this.appTechStacksCheckListsService.UpdateAppTechStacksCheckList(query, this.appID).subscribe(data => {
          console.log(data);
          this.getAppTechStackCheckList();
        })
      }
    }

  }

  setStep(index) {
    this.selectedDos = [];
    this.selectedDonts = [];
    console.log('event', event);
    let techName;
    // this.selectCheckList = [];
    this.accordinIndex = index;
    console.log('this.pIndex === this.accordinIndex', this.pIndex, this.accordinIndex)
    if (this.pIndex === this.accordinIndex) {
      this.isExpanded = !this.isExpanded;
    } else {
      this.isExpanded = true;
    }
    if (this.isExpanded) {
      techName = this.selectedAppList[0].techStacks[index];
      console.log('techName', techName);
      this.filter4Tech(techName)
      this.setCheckedCheckList(techName);
    }
    this.pIndex = this.accordinIndex;
    // alert(this.accordinIndex + ' ' + this.isExpanded);



  }

  onAppChange() {
    this.addButtonName = this.selectedApp ? 'Edit' : 'Add';
    console.log(this.selectedApp, this.appList);
    this.selectedAppList = this.appList.filter(a => a.name === this.selectedApp);
    console.log('selectedAppList', this.selectedAppList);
    this.getTechCheckList();
    this.getAppTechStackCheckList();
    this.isExpanded = false;
    // // for (const item of this.appList) {

    // // }
  }

  getAppTechStackCheckList() {
    this.appTechStacksCheckListsService.getAppTechStacksCheckList().subscribe(data => {
      console.log(data.data);
      this.appTechStackcheckList = data.data;
      console.log("this.appTechStackcheckList", this.appTechStackcheckList);
    })
  }

  getProjectList() {
    this.appTechStacksService.getAppTechStacks().subscribe(a => {
      this.appList = a.data;
      console.log('this.appList', this.selectedApp, this.appList, this.selectedAppList);
      if (this.selectedApp) {
        if (this.appList.filter(a => a.name === this.selectedApp).length > 0) {
          this.selectedAppList = this.appList.filter(a => a.name === this.selectedApp);
        } else { this.selectedApp = undefined; }
      }
      console.log('this.appList', this.appList, this.selectedAppList);
    })
  }

  openDialog() {
    this.selectedAppList = this.appList.filter(a => a.name === this.selectedApp);
    let addStatus: boolean;
    addStatus = this.selectedApp ? false : true;
    this.dialogRef = this.dialog.open(AddAppTechStackComponent, {
      height: '45%',
      width: '50%'
    });
    this.dialogRef.componentInstance.selectedAppList = this.selectedAppList;
    this.dialogRef.componentInstance.addStatus = addStatus;
    // this.dialogRef.componentInstance.appTech = this.selectedApp;
    // if (!addStatus) {
    //   console.log("this.selectCheckList._id", this.selectedApp);
    //   // this.dialogRef.componentInstance.id = this.selectCheckList._id;
    // }
    // this.dialogRef.componentInstance.addStatus = addStatus;
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
      this.getProjectList();
    });
  }

}
