import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TostNotificationService } from '../services/tost-notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private toast:TostNotificationService) { }

  ngOnInit(): void {
    // this.toast.showSuccess("Welcome to LIT")
  }

  goToCourse(){
    this.router.navigate(['/courses'])
  }

  goToCourse_trending(tname:string){
    this.router.navigate(['/courseDetails',{name:tname}])
  }

}
