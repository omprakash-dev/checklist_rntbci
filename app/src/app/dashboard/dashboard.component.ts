import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = '';
  type = 'ColumnChart';
  data = [
    ["Angular", 80],
    ["Typescript", 60],
    ["Javascript", 75],
    ["HTML", 90],
    ["CSS", 80]
  ];
  columnNames = ['Dos', 'Percentage'];
  options = { legend: { position: 'none' } };
  width = 400;
  height = 400;

  constructor() { }

  ngOnInit() {
  }

}
