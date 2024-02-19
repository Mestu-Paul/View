import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/Message';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  providers: [DatePipe]
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild("messageForm") messageForm?: NgForm;

  @ViewChild('scrollChatBox', { static: false }) scrollChatBox?: ElementRef;
  scrollContainer: any;

  initiate: boolean = false;
  recipientUsername: string = '';
  senderUsername: string = "";
  content: string = "";
  pageNumber: number = 1;
  justLoad:boolean = true;

  messages: Message[] = [];

  constructor(private accountService: AccountService, private toastr: ToastrService,
    public messageService: MessageService, private route: ActivatedRoute, public datePipe: DatePipe) {

  }

  ngOnInit(): void {
    if (this.accountService.getCurrentUser() === null) {
      this.toastr.error("You are not permitted");
      return;
    }

    this.senderUsername = this.accountService.getCurrentUser()!.username;

    this.setCurrentChatDetails();
    this.receiveMessage();
  }

  ngAfterViewChecked(): void {
    if(this.initiate && this.justLoad && this.messages.length>0){
      this.scrollContainer = this.scrollChatBox?.nativeElement;
      this.scrollToBottom();
      this.justLoad = false;
    }
  }


  private isScrollerNearToTop() {
  }

  private scrollToTop() {
    this.scrollContainer.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  private isScrollerNearToBottom() {
    const threshold = 150;
    const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
    const height = this.scrollContainer.scrollHeight;
    return position > height - threshold;
  }

  public scrollToBottom() {
    console.log("scroll to bottom");
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  setCurrentChatDetails() {
    this.messageService.currentChatDetails$.subscribe({
      next: details => {
        this.recipientUsername = details.receiverName;
        this.senderUsername = details.senderName;
        if (this.recipientUsername && this.senderUsername) {
          this.initiate = true;
        }
      },
      error: error => {
        console.log(error);
        this.initiate = false;
      }
    });
  }

  sendMessage() {
    const curMessage: Message = {
      senderUsername: this.senderUsername,
      recipientUsername: this.recipientUsername,
      content: this.content
    };

    this.messageService.sendMessage(curMessage).subscribe({
      next: res => {
        this.messages.push(curMessage);
      },
      error: error => {
        console.log(error);
      }
    })
    this.content = '';
    this.scrollToBottom();
  }

  receiveMessage() {
    this.messageService.messageThread$.subscribe({
      next: messages => {
        this.messages = messages;
      }
    });

    

    this.messageService.onWSMessage((message: Message) => {
      if (message.senderUsername === this.recipientUsername) {
        this.messages.push(message);
      }
      else {
        this.toastr.success(`${message.senderUsername} just sent you a message`)
      }
    });
  }

  getMoreMessage() {
    this.pageNumber++;
    this.messageService.getMoreMessageWithScrolling(this.senderUsername, this.recipientUsername, this.pageNumber);
    this.scrollToTop();
  }
}



