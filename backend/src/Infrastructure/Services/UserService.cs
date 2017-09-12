using System;
using System.Threading.Tasks;
using AutoMapper;
using Core.Domain;
using Core.Repositories;
using Infrastructure.DTO;
using Infrastructure.Errors;
using Infrastructure.Extensions;

namespace Infrastructure.Services
{
    public class UserService : IUserService
    {

        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IJwtHandler _jwtHandler;

        public UserService(IUserRepository userRepository, IJwtHandler jwtHandler, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _jwtHandler = jwtHandler;
        }

        public async Task<UserDto> GetUserAsync(Guid userId)
        {
            var user = await _userRepository.GetOrFailAsync(userId);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<TokenDto> LoginAsync(string email, string password)
        {
            var user = await _userRepository.GetAsync(email);
            if (user == null)
            {
                throw new LoginFailedException($"Login failed. Invalid credentials.");
            }

            // SPRAWDZANIE HASŁA - PRYMITYWNE
            // powinno być hashowanie, metody zabezpieczające
            if (user.Password != password)
            {
                throw new LoginFailedException($"Login failed. Invalid credentials.");
            }

            var jwt = _jwtHandler.CreateToken(user.Id);

            return new TokenDto
            {
                Token = jwt.Token,
                Expires = jwt.Expires
            };
        }

        public async Task RegisterAsync(Guid userId, string email, string name, string password, string role = "user")
        {
            var user = await _userRepository.GetAsync(email);
            if (user != null)
            {
                throw new UserAlreadyExistException($"User with email: '{email}' already exists.");
            }
            user = new User(userId, role, name, email, password);
            await _userRepository.AddAsync(user);
        }
    }
}