using API.Data;
using API.Models;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    public class ChatHub : Hub
    {
        private readonly InMemoryDb _inMemoryDb;
        public ChatHub(InMemoryDb inMemoryDb)
        {
            _inMemoryDb = inMemoryDb;
        }
        public async Task JoinChat(UserConnection userConnection)
        {
            await Clients.All
                .SendAsync("ReceiveMessage", "admin", $"{userConnection.Username} has joined");
        }
        
        public async Task JoinChatRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.ChatRoom);
            _inMemoryDb.Connections[Context.ConnectionId] = userConnection;
            await Clients.Group(userConnection.ChatRoom).SendAsync("JoinChatRoom", "admin", 
                $"{userConnection.Username} has joined {userConnection.ChatRoom}");
        }
        public async Task SendMessage(string message)
        {
            if(_inMemoryDb.Connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.ChatRoom)
                                .SendAsync("ReceiveSpecificMessage", userConnection.Username, message);
                
            }
        }
    }
}