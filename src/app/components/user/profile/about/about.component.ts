import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../../services/user.service'
import { User } from './../../../../models/user'
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css', './../../../../app.component.css']
})
export class AboutComponent implements OnInit {
  isUser:boolean;
  user: any = {};
  constructor(public router: Router, public service: UserService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.service.getUser().subscribe(
      res=>{
        this.user=res;
      }
    );
    this.isUser=this.service.getisUser();
  }

}
