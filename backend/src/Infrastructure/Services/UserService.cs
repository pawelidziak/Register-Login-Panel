using System;
using System.Threading.Tasks;
using AutoMapper;
using Core.Domain;
using Core.Repositories;
using Infrastructure.DTO;
using Infrastructure.Errors;
using Infrastructure.Extensions;
using Infrastructure.Services.Encrypter;

namespace Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IJwtHandler _jwtHandler;
        private readonly IEncrypter _encrypter;

        public UserService(IUserRepository userRepository, IJwtHandler jwtHandler, IMapper mapper, IEncrypter encrypter)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _jwtHandler = jwtHandler;
            _encrypter = encrypter;
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
                throw new LoginFailedException($"Login failed. Invalid credentials. 1");
            }

            var hash = _encrypter.GetHash(password, user.Salt);
            if (user.Password != hash)
            {
                throw new LoginFailedException($"Login failed. Invalid credentials. 2");
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

            var salt = _encrypter.GetSalt(password);
            var hash = _encrypter.GetHash(password, salt);

            user = new User(userId, role, name, email, hash, salt);
            await _userRepository.AddAsync(user);
        }

        public async Task UpdatePersonalAsync(Guid userId, string name, string email)
        {
            var user = await _userRepository.GetAsync(userId);
            if (user == null)
            {
                throw new Exception($"User with id: '{userId}' does not exists.");
            }
            var loggedEmail = user.Email;
            var userWithInputEmail = await _userRepository.GetAsync(email);
            if (userWithInputEmail != null && userWithInputEmail.Email != loggedEmail) 
            {
                throw new UserAlreadyExistException($"User with email: '{email}' already exists.");
            }
            if (string.IsNullOrWhiteSpace(email)) 
            {
                throw new InvalidRequestException($"Email cannot be empty.");
            }
            if (string.IsNullOrWhiteSpace(name)) 
            {
                throw new InvalidRequestException($"Name cannot be empty.");
            }

            user.SetName(name);            
            user.SetEmail(email);
            await _userRepository.UpdateAsync(user);
        }

        public async Task UpdatePasswordAsync(Guid userId, string oldPassword, string newPassword)
        {
            var user = await _userRepository.GetAsync(userId);

            if (user == null)
            {
                throw new Exception($"User with id: '{userId}' does not exists.");
            }

            var oldHash = _encrypter.GetHash(oldPassword, user.Salt);
            // sprawdzenie, czy stare hasło się zgadza
            if (user.Password != oldHash)
            {
                throw new InvalidRequestException($"Old passwords does not match.");
            }
            
            // sprawdzenie, czy hasła nie są jednakowe
            var newHash = _encrypter.GetHash(newPassword, user.Salt);
            if (oldHash == newHash)
            {
                throw new InvalidRequestException($"New passwords is the same as old.");
            }

            // stworzenie nowego zahashowanego hasla na bazie nowej soli
            var newSalt = _encrypter.GetSalt(newPassword);
            newHash = _encrypter.GetHash(newPassword, newSalt);

            user.SetPassword(newHash);
            user.SetSalt(newSalt);
            await _userRepository.UpdateAsync(user);
        }

    }
}