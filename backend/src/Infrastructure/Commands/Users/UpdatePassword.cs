using System;

namespace Infrastructure.Commands.Users
{
    public class UpdatePassword
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}