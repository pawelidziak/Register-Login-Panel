using System;

namespace Infrastructure.Commands.Users
{
    public class UpdateUser
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}