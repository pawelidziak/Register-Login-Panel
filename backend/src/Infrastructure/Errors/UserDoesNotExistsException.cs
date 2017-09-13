using System;

namespace Infrastructure.Errors
{
    public class UserDoesNotExistsException : Exception
    {
        public UserDoesNotExistsException()
        {
        }

        public UserDoesNotExistsException(string message)
            : base(message)
        {
        }

        public UserDoesNotExistsException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
