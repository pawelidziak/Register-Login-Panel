using System;

namespace Infrastructure.Errors
{
    public class InvalidRequestException: Exception
    {
        public InvalidRequestException()
        {
        }

        public InvalidRequestException(string message)
            : base(message)
        {
        }

        public InvalidRequestException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
