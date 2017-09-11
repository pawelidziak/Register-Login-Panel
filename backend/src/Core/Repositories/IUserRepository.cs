using System;
using System.Threading.Tasks;
using Core.Domain;

namespace Core.Repositories
{
    // Interfejs repozytorium dla użytkownika (asynchroniczny)
    public interface IUserRepository
    {
        Task<User> GetAsync(Guid id); 
        Task<User> GetAsync(string email);
        Task AddAsync(User user);
        Task UpdateAsync(User user);
        Task DeleteAsync(User user);         
    }
}