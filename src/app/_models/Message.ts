export class Message{
    id?:string='';
    senderUsername:string='';
    recipientUsername:string='';
    content:string='';
    dateRead?:string='';
    messageSent?:string='';
    showSeenDate?:boolean=false;
}


export class SenderUser
{
    username:string='';
    unreadMessageCount:number=0;
}