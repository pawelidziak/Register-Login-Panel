using System;

namespace Infrastructure.Errors
{
    public class PasswordMismatchException: Exception
    {
        public PasswordMismatchException()
        {
        }

        public PasswordMismatchException(string message)
            : base(message)
        {
        }

        public PasswordMismatchException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}