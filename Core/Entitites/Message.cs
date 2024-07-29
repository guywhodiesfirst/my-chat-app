namespace Core.Entitites
{
    public class Message
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string ChatRoomName { get; set; }
        public string MessageText { get; set; }
        public DateTime Timestamp { get; set; }
    }
}