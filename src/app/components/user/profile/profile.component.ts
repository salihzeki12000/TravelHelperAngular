import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './../../../services/user.service'
import { User } from './../../../models/user'
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { WriteReferenceModalComponent } from './../reuse/write-reference-modal/write-reference-modal.component'
import { SendMessageModalComponent } from '../reuse/send-message-modal/send-message-modal.component';
import { SendRequestModalComponent } from '../reuse/send-request-modal/send-request-modal.component';
import { SendReportModalComponent } from '../reuse/send-report-modal/send-report-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', './../../../app.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild(WriteReferenceModalComponent) writeReferenceModal: WriteReferenceModalComponent;
  @ViewChild(SendMessageModalComponent) sendMessageModal: SendMessageModalComponent;
  @ViewChild(SendRequestModalComponent) sendRequestModal: SendRequestModalComponent;
  @ViewChild(SendReportModalComponent) sendReportModal: SendReportModalComponent;
  isUser: boolean;
  isFriend: boolean;
  user: any = {};
  isdrop;
  constructor(public router: Router, public service: UserService, public activatedRoute: ActivatedRoute, private toast: ToastrService) { }
  ngOnInit() {

    this.isUser = this.service.getisUser();
    let temp = this.activatedRoute.snapshot.data.users;
    if (!this.isUser)
      this.isFriend=this.activatedRoute.snapshot.data.isFriend.isFriend;
    if (temp.err == '404')
      this.router.navigate(['/Users/' + temp.id]);
    else {
      this.user = temp;
    }
  }
  sendFriendRequest() {
    this.isdrop = false;
    let body = {
      message: ""
    }
    this.service.sendFriendRequest(body, this.user.id).subscribe(
      res => {
        if (res.status == 200) {
          this.toast.success("You had sent a friend request ");
        } else {
          this.toast.error("Fail")
        }

      }
    )
  }

}
