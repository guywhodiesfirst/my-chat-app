using API.Models;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    public class ChatHub : Hub
    {
        public async Task JoinChat(UserConnection userConnection)
        {
            await Clients.All
                .SendAsync("ReceiveMessage", "admin", $"{userConnection.Username} has joined");
        }
        
        public async Task JoinChatRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.ChatRoom);
            await Clients.Group(userConnection.ChatRoom).SendAsync("ReceiveMessage", "admin", 
                $"{userConnection.Username} has joined {userConnection.ChatRoom}");
        }
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}