import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-pagination',
  templateUrl: './menu-pagination.component.html',
  styleUrls: ['./menu-pagination.component.scss']
})
export class MenuPaginationComponent implements OnInit {
  @Output() onOk = new EventEmitter<number>()
  @Input() model: any = null;

  public items = [
    10,
    20,
    50,
    100
  ];

  public itemSelected = 10;
  constructor() { }

  ngOnInit(): void {
  }

  selectItem(item: number) {
    this.itemSelected = item;
    this.onOk.emit(item);
  }
}
