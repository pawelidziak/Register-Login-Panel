using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Domain;
using Core.Repositories;
using Infrastructure.Errors;
using Infrastructure.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Infrastructure.Repositories
{
    public class MongoUserRepository : IUserRepository
    {
        private readonly IMongoDatabase _database;

        private IMongoCollection<User> Users;

        public MongoUserRepository(IOptions<MongoSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            if (client != null)
            {
                _database = client.GetDatabase(settings.Value.Database);
                bool isMongoLive = _database.RunCommandAsync((Command<BsonDocument>)"{ping:1}").Wait(1);
                if(!isMongoLive){
                    throw new DatabaseConnectionException("The database does not work as it should.");
                }

                Users = _database.GetCollection<User>("Users");
            }
                
        }

        public async Task<User> GetAsync(Guid id)
        => await Users.AsQueryable().FirstOrDefaultAsync(x => x.Id == id);

        public async Task<User> GetAsync(string email)
        => await Users.AsQueryable().FirstOrDefaultAsync(x => x.Email == email);

        public async Task<IEnumerable<User>> GetAllAsync()
        => await Users.AsQueryable().ToListAsync();

        public async Task AddAsync(User user)
        => await Users.InsertOneAsync(user);

        public async Task RemoveAsync(Guid id)
        => await Users.DeleteOneAsync(x => x.Id == id);

        public async Task UpdateAsync(User user)
        => await Users.ReplaceOneAsync(x => x.Id == user.Id, user);

        public Task DeleteAsync(User user)
        {
            throw new NotImplementedException();
        }

    }
}