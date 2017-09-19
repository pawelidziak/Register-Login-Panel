using System;
using System.Threading.Tasks;
using Infrastructure.Commands.Users;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class UserController : ApiControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Post([FromBody]Register command)
        {
            await _userService.RegisterAsync(Guid.NewGuid(), command.Email, command.Name, command.Password, command.Role);

            return Created("/user", null);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody]Login command)
            => Json(await _userService.LoginAsync(command.Email, command.Password));

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
            => Json(await _userService.GetUserAsync(UserId));
        
        [HttpPut("update/{userId}")]
        [Authorize]
        public async Task<IActionResult> Put(Guid userId, [FromBody]UpdatePersonal command)
        {
            // command.UserId = Guid.NewGuid();
            await _userService.UpdatePersonalAsync(userId, command.Name, command.Email);
            return NoContent(); //204
        }

        [HttpPut("update/password/{userId}")]
        [Authorize]
        public async Task<IActionResult> Put(Guid userId, [FromBody]UpdatePassword command)
        {
            // command.UserId = Guid.NewGuid();
            await _userService.UpdatePasswordAsync(userId, command.OldPassword, command.NewPassword);
            return NoContent(); //204
        }
        [HttpPut("confirm/{userId}")]
        public async Task<IActionResult> Put([FromBody]ActivateUser command)
        {
            // command.UserId = Guid.NewGuid();
            await _userService.ActivateUser(command.UserId);
            return NoContent(); //204
        }
    }
}
