using System;

namespace Infrastructure.Errors
{
    public class InActiveUserException: Exception
    {
        public InActiveUserException()
        {
        }

        public InActiveUserException(string message)
            : base(message)
        {
        }

        public InActiveUserException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
