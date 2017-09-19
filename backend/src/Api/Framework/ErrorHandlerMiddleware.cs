using System;
using System.Net;
using System.Text;
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
            var error = "";
            switch (exception)
            {
                case Exception e when exceptionType == typeof(ArgumentException):
                    statusCode = HttpStatusCode.BadRequest; // 400
                    error = "ImproperArgument";
                    break;
                case Exception e when exceptionType == typeof(ArgumentNullException):
                    statusCode = HttpStatusCode.BadRequest; // 400
                    error = "ArgumentNull";
                    break;
                case Exception e when exceptionType == typeof(UserDoesNotExistsException):
                    statusCode = HttpStatusCode.BadRequest; // 400
                    error = "UserNotFound";
                    break;
                case Exception e when exceptionType == typeof(InvalidRequestException):
                    statusCode = HttpStatusCode.BadRequest; // 400
                    error = "InvalidRequest";
                    break;
                case Exception e when exceptionType == typeof(UnauthorizedAccessException):
                    statusCode = HttpStatusCode.Unauthorized; // 401
                    error = "Unauthorized";
                    break;
                case Exception e when exceptionType == typeof(LoginFailedException):
                    statusCode = HttpStatusCode.Unauthorized; // 401
                    error = "LoginFailed";
                    break;
                case Exception e when exceptionType == typeof(InActiveUserException):
                    statusCode = HttpStatusCode.Unauthorized; // 401
                    error = "InActiveUser";
                    break;
                case Exception e when exceptionType == typeof(UserAlreadyExistException):
                    statusCode = HttpStatusCode.Conflict; // 409
                    error = "UserAlreadyExist";
                    break;
                case Exception e when exceptionType == typeof(PasswordMismatchException):
                    statusCode = HttpStatusCode.Conflict; // 409
                    error = "PasswordMismatch";
                    break;
                case Exception e when exceptionType == typeof(DatabaseConnectionException):
                    statusCode = HttpStatusCode.InternalServerError; // 409
                    error = "DatabaseConnection";
                    break;
            }

            var response = new { message = exception.Message, error = error };
            var payload = JsonConvert.SerializeObject(response);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;
            return context.Response.WriteAsync(payload);
        }
    }
}