using System;
using System.Threading.Tasks;
using Core.Repositories;
using Infrastructure.DTO;

namespace Infrastructure.Services
{
    public class UserService : IUserService
    {

        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public Task<UserDto> GetUserAsync(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task LoginAsync(string email, string password)
        {
            throw new NotImplementedException();
        }

        public Task RegisterAsync(Guid userId, string email, string name, string password, string role = "user")
        {
            throw new NotImplementedException();
        }
    }