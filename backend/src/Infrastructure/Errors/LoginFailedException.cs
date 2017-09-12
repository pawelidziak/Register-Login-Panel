using System;

namespace Infrastructure.Errors
{
    public class LoginFailedException: Exception
    {
        public LoginFailedException()
        {
        }

        public LoginFailedException(string message)
            : base(message)
        {
        }

        public LoginFailedException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
