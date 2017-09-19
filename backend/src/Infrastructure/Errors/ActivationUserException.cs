using System;

namespace Infrastructure.Errors
{
    public class ActivationUserException: Exception
    {
        public ActivationUserException()
        {
        }

        public ActivationUserException(string message)
            : base(message)
        {
        }

        public ActivationUserException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
