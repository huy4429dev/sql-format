import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-user',
  styleUrls: ['./user.component.scss'],
  template: ''
})
export class UserComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Manager User");
  }
  ngOnInit() { }
}

