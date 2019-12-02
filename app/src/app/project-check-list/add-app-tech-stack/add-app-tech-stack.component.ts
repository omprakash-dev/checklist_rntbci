import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TechCheckListService } from '../../services/tech-check-list.service';
import { AppTechStacksService } from '../../services/app-tech-stacks.service';

@Component({
  selector: 'app-add-app-tech-stack',
  templateUrl: './add-app-tech-stack.component.html',
  styleUrls: ['./add-app-tech-stack.component.scss']
})
export class AddAppTechStackComponent implements OnInit {
  @Input() selectedAppList;
  @Input() addStatus;
  addButtonName = 'Add';
  techList;
  selectedTechList = [];
  projectName;

  constructor(readonly dialogRef: MatDialogRef<AddAppTechStackComponent>, readonly techCheckListService: TechCheckListService,
    readonly appTechStacksService: AppTechStacksService) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.getTechCheckList();
  }

  setAppTechListChecked() {
    this.selectedTechList = [];
    console.log(this.selectedAppList, 'lll');
    console.log(this.techList);
    if (!this.addStatus && this.techList.length > 0) {
      this.projectName = this.selectedAppList[0].name;
      for (const item of this.selectedAppList[0].techStacks) {
        console.log(item);
        console.log(this.techList.findIndex(z => z.name == item));
        const index = this.techList.findIndex(z => z.name === item)
        if (index > -1) {
          this.techList[index].checked = true;
          this.selectedTechList.push(this.techList[index].name);
        }
      }
    }
  }

  reset() {
    this.projectName = undefined;
    this.selectedTechList = [];
    this.selectedAppList = [];
    this.addButtonName = 'Add';
    this.addStatus = true;
    this.getTechCheckList();
  }

  onChangeTechSelected(event) {
    if (event.checked) {
      if (this.selectedTechList.filter(a => a === event.source.value).length <= 0) {
        this.selectedTechList.push(event.source.value);
      }
    } else {
      if (this.selectedTechList.filter(a => a === event.source.value).length > 0) {
        this.selectedTechList.splice(this.selectedTechList.findIndex(a => a === event.source.value), 1);
      }
    }
    console.log(this.selectedTechList);
  }

  getTechCheckList() {
    this.techList = [];
    this.techCheckListService.getTechCheckList().subscribe(data => {
      console.log(data.data);
      for (const item of data.data) {
        this.techList.push({ 'name': item.name, 'checked': false });
      }
      if (!this.addStatus) {
        this.setAppTechListChecked();
        this.addButtonName = 'Upd';
      }
    },
      error => {
        console.log('error', error.message);
      })
  }

  addAppTechStacks() {
    if (!this.addStatus) {
      console.log(this.selectedAppList[0]._id, this.selectedAppList, this.techList);
    }

    let body = { 'name': this.projectName, 'techStacks': [] };

    for (const item of this.selectedTechList) {
      body.techStacks.push(item);
    }

    if (this.addStatus) {
      this.appTechStacksService.addAppTechStacks(body).subscribe(data => {
        console.log(data);
      });
    } else {
      this.appTechStacksService.UpdateAppTechStacks(body, this.selectedAppList[0]._id).subscribe(data => {
        console.log(data);
      });
    }
    this.reset();
    console.log(body);
  }

}
