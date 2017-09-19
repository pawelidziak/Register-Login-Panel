using System;
using System.Threading.Tasks;
using Infrastructure.DTO;

namespace Infrastructure.Services
{
    public interface IUserService
    {
        Task<UserDto> GetUserAsync(Guid userId);
        Task RegisterAsync(Guid userId, string email, string name, string password, string role = "user");
        Task<TokenDto> LoginAsync(string email, string password);
        Task UpdatePersonalAsync(Guid userId, string name, string email);
        Task UpdatePasswordAsync(Guid userId, string oldPassword, string newPassword);
        Task ActivateUser(Guid userid);
    }
}