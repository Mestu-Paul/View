import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Message } from '../_models/Message';
import { ChatList } from '../_models/chatList';
import {  WebSocketSubject } from 'rxjs/webSocket';
import { AccountService } from './account.service';
import { User } from '../_models/User';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  apiUrl="https://localhost:7250/api/messages";
  wsUrl = "wss://localhost:7250/ws";

  private ws: WebSocketSubject<any>;
  currentUser:any;

  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  private inboxThreadSource = new BehaviorSubject<ChatList>(new ChatList());
  inboxThread$ = this.inboxThreadSource.asObservable();
  
  constructor(private http:HttpClient, private accountService:AccountService) { 

    this.currentUser = accountService.getCurrentUser();

    if(this.currentUser!==null)
      this.ws = new WebSocketSubject(this.wsUrl+`?token=${this.currentUser.username}`);
    else 
      this.ws = new WebSocketSubject(this.wsUrl);
  }

  onWSMessage(callback:(message:any)=>void) {

    this.ws.subscribe({
      // retrieve message
      next: (message) =>{
        console.log("upcomming message ", message);
        callback(message);

        // update chat list
        this.inboxThread$.pipe(take(1)).subscribe({
          next: list => {
            const existingRecipientIndex = list.recipientUsername.findIndex(recipient => recipient.username === message.recipientname);
            if(existingRecipientIndex!==-1){
              list.recipientUsername[existingRecipientIndex].timestamp = new Date().toISOString();
            }
            else{
              list.recipientUsername.push({ username:message.recipientname, timestamp: new Date().toISOString() });
            }
            this.inboxThreadSource.next(list);
          }
        })
      },

      error: error =>{
        console.log("error getting message from WS ",error);
      }
    });
  }


  // for chat box
  private messageRequestDetailsSource: BehaviorSubject<any> = new BehaviorSubject<any>({
    senderName: '',
    receiverName: ''
  });
  public messageRequestDetails$ = this.messageRequestDetailsSource.asObservable();

  setMessageRequestDetails(details:any){
    this.messageRequestDetailsSource.next(details);
    this.getMessages(details.senderName,details.receiverName);
  }


  getChatList(username:string){
    this.http.get<ChatList>(`${this.apiUrl}/chatlist?username=${username}`).subscribe({
      next: res => {
        this.inboxThreadSource.next(res);
      },
      error: error => {
        console.log("error while getting chat list ", error);
      }
    })
  }

  getMessages(sender:string, receiver:string, pageNumber:number=1){
    console.log("Getting message");
    this.http.get<Message[]>(`${this.apiUrl}?senderUsername=${sender}&receiverUsername=${receiver}&pagenumber=${pageNumber}`).subscribe({
      next: messages => {
        this.messageThreadSource.next(messages);
      },
      error: error =>{
        console.log(error);
      }
    })
  }

  sendMessage(message:Message){
    const object = 
      {
        "senderUsername": message.senderUsername,
        "recipientname": message.recipientname,
        "content": message.content
      }
    return this.http.post(this.apiUrl,object);
  }

  searchUsers(username:string):Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/searchUsers?username=${username}`);
  }
}
