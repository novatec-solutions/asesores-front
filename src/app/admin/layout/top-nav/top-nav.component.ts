import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<void>();
  user:string ='';
  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.user = localStorage.getItem('username')
  }

  onLoggedout() {
    localStorage.removeItem('username');
    localStorage.removeItem('userStatus');
    localStorage.removeItem('isLoggedin');
    this.router.navigate(['/login']);
  }

  onGoUp(){
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}
