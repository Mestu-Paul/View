import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../_models/Message';
import { ChatList } from '../_models/chatList';
import { webSocket } from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  apiUrl="https://localhost:7250/api/messages";
  
  constructor(private http:HttpClient) { 
    const socket = webSocket("ws://localhost:7250/ws/message");
    socket.subscribe({
      next: res => {
        console.log(res)
      },
      error: er => {
        console.log(er);
      }
    }
    );
  }


  public messageRequestDetails: BehaviorSubject<any> = new BehaviorSubject<any>({
    senderName: '',
    receiverName: ''
  });

  setMessageRequestDetails(details:any){
    this.messageRequestDetails.next(details);
  }

  getChatList(username:string):Observable<ChatList>{
    return this.http.get<ChatList>(`${this.apiUrl}/chatlist?username=${username}`);
  }

  getMessages(sender:string, receiver:string, pageNumber:number=1):Observable<Message[]>{
    return this.http.get<Message[]>(`${this.apiUrl}?senderUsername=${sender}&receiverUsername=${receiver}&pagenumber=${pageNumber}`);
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
}
