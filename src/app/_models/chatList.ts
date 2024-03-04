export class Recipient
{
    username:string = '';
    timestamp:string = '';
}
export class ChatList
{
    username:string = '';
    recipientUsername:Recipient[] = [];
}