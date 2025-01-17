using API.Data;
using API.Models;
using Core.Data;
using Core.Entitites;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs
{
    public class ChatHub : Hub
    {
        private readonly DataContext _dataContext;
        private readonly InMemoryDb _inMemoryDb;
        public ChatHub(InMemoryDb inMemoryDb, DataContext dataContext)
        {
            _inMemoryDb = inMemoryDb;
            _dataContext = dataContext;
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
            await Clients.Group(userConnection.ChatRoom)
                .SendAsync("JoinChatRoom", "admin", 
                $"{userConnection.Username} has joined {userConnection.ChatRoom}");
        }
        public async Task LeaveChatRoom()
        {
            if(_inMemoryDb.Connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, userConnection.ChatRoom);
                _inMemoryDb.Connections.Remove(Context.ConnectionId, out _);
                await Clients.Group(userConnection.ChatRoom)
                    .SendAsync("LeaveChatRoom", "admin", $"{userConnection.Username} has left {userConnection.ChatRoom}");
            }
        }
        public async Task SendMessage(string message)
        {
            if(_inMemoryDb.Connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.ChatRoom)
                                .SendAsync("ReceiveSpecificMessage", userConnection.Username, message);
                
                var newMessage = new Message
                {
                    Id = Guid.NewGuid(),
                    Username = userConnection.Username,
                    ChatRoomName = userConnection.ChatRoom,
                    MessageText = message,
                    Timestamp = DateTime.Now
                };
                await _dataContext.Messages.AddAsync(newMessage);
                await _dataContext.SaveChangesAsync();
            }
        }
    }
}