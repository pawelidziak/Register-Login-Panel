using System;

namespace Infrastructure.Errors
{
    public class EmptyDataException: Exception
    {
        public EmptyDataException()
        {
        }

        public EmptyDataException(string message)
            : base(message)
        {
        }

        public EmptyDataException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
