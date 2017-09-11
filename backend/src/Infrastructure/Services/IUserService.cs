using System;
using System.Threading.Tasks;
using Infrastructure.DTO;

namespace Infrastructure.Services
{
    public interface IUserService
    {
        Task<UserDto> GetUserAsync(Guid userId);
        Task RegisterAsync(Guid userId, string email, string name, string password, string role = "user");
        Task LoginAsync(string email, string password);
    }
}