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


  onWSMessage(callback:(message:Message)=>void) {

    this.ws.subscribe({
      // retrieve message
      next: (message:Message) =>{
        callback(message);

        this.updateChatList(message);
        
      }
    });
  }

  updateChatList(message:Message){
    this.inboxThread$.pipe(take(1)).subscribe({
      next: list => {
        if(list===null){
          list = new ChatList();
          list.username = this.currentUser.username;
        }
        const recipientUsername = (message.senderUsername===this.currentUser.username?
          message.recipientUsername:message.senderUsername);

        message.messageSent = (message.messageSent?message.messageSent: new Date().toISOString());

        const existingRecipientIndex = list?.recipientUsername.findIndex(recipient => recipient.username === recipientUsername); 

        // update chate list
        if(existingRecipientIndex!==-1 && list){
          list.recipientUsername[existingRecipientIndex].timestamp = message.messageSent;
        }
        else{
          list.recipientUsername.push({ username:recipientUsername, timestamp: message.messageSent });
        }

        // sort chat list
        list.recipientUsername.sort((a,b) => {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });

        // atach updated chatList
        this.inboxThreadSource.next(list);
      }
    })
  }

  // for chat box
  private currentChatDetailsSource: BehaviorSubject<any> = new BehaviorSubject<any>({
    senderName: '',
    receiverName: ''
  });
  public currentChatDetails$ = this.currentChatDetailsSource.asObservable();

  setMessageRequestDetails(details:any){
    this.currentChatDetailsSource.next(details);
    this.getMessages(details.senderName,details.receiverName);
  }


  getChatList(username:string){
    this.http.get<ChatList>(`${this.apiUrl}/chatlist?username=${username}`).subscribe({
      next: res => {
        // sort chat list
        res.recipientUsername.sort((a,b) => {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
        this.inboxThreadSource.next(res);
      },
      error: error => {
        console.log("error while getting chat list ", error);
      }
    })
  }

  getMessages(sender:string, receiver:string, pageNumber:number=1){
    this.http.get<Message[]>(`${this.apiUrl}?senderUsername=${sender}&receiverUsername=${receiver}&pagenumber=${pageNumber}`).subscribe({
      next: messages => {
        this.messageThreadSource.next(messages);
      },
      error: error =>{
        console.log(error);
      }
    })
  }

  getMoreMessageWithScrolling(sender:string, receiver:string, pageNumber:number){
    this.http.get<Message[]>(`${this.apiUrl}?senderUsername=${sender}&receiverUsername=${receiver}&pagenumber=${pageNumber}`).subscribe({
      next: messages => {
        this.messageThread$.pipe(take(1)).subscribe({
          next: threadMessages => {
            if(threadMessages){
              // console.log("after scroll ",[...threadMessages,...messages]);
              this.messageThreadSource.next([...messages,...threadMessages]);
            }
            else{
              this.messageThreadSource.next(messages);
            }
          }
        })
      },
      error: error =>{
        console.log(error);
      }
    })
  }

  sendMessage(message:Message){
    this.updateChatList(message);
    return this.http.post(this.apiUrl,message);
  }

  searchUsers(username:string):Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/searchUsers?username=${username}`);
  }
}
