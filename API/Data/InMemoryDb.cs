using System.Collections.Concurrent;
using API.Models;

namespace API.Data
{
    public class InMemoryDb
    {
        private readonly ConcurrentDictionary<string, UserConnection> _connections;
        public ConcurrentDictionary<string, UserConnection> Connections => _connections;
    }
}