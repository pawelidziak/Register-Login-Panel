using System;
using System.Threading.Tasks;
using Core.Domain;
using Core.Repositories;

namespace Infrastructure.Extensions
{
    public static class RepositoryExtensions
    {
        public static async Task<User> GetOrFailAsync(this IUserRepository repository, Guid id)
        {
            var user = await repository.GetAsync(id);
            if (user == null)
            {
                throw new Exception($"User with id: '{id}' does not exists.");
            }

            return user;
        }
    }
}