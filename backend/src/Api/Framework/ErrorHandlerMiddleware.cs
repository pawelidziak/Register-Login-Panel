using System;
using System.Net;
using System.Threading.Tasks;
using Infrastructure.Errors;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Api.Framework
{
public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                await HandleErrorAsync(context, exception);
            }
        }

        private static Task HandleErrorAsync(HttpContext context, Exception exception)
        {
            var exceptionType = exception.GetType();
            var statusCode = HttpStatusCode.InternalServerError;
            switch (exception)
            {
                case Exception e when exceptionType == typeof(UnauthorizedAccessException):
                    statusCode = HttpStatusCode.Unauthorized;
                    break;

                case Exception e when exceptionType == typeof(ArgumentException):
                    statusCode = HttpStatusCode.BadRequest;
                    break;
                case Exception e when exceptionType == typeof(UserAlreadyExistException):
                    statusCode = HttpStatusCode.Conflict;
                    break;
                case Exception e when exceptionType == typeof(LoginFailedException):
                    statusCode = HttpStatusCode.Unauthorized;
                    break;
            }

            var response = new { message = exception.Message };
            var payload = JsonConvert.SerializeObject(response);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            return context.Response.WriteAsync(payload);

        }
    }
}