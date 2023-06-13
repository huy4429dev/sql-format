import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-template-dropdown',
  templateUrl: './template-dropdown.component.html',
  styleUrls: ['./template-dropdown.component.scss']
})
export class TemplateDropdownComponent implements OnInit {
  @Output() onClean = new EventEmitter<boolean>()
  @Output() onSubentity = new EventEmitter<boolean>()
  constructor() { }

  ngOnInit(): void {
  }

}
