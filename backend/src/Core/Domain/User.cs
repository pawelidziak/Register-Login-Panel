using System;
using System.Collections.Generic;

namespace Core.Domain
{
// klasa domenowa reprezentująca użytkownika
    public class User : Entity
    {
        private static List<string> _roles = new List<string>
        {
            "user",
            "admin"
        };
        public string Role { get; protected set; }
        public string Name { get; protected set; }
        public string Email { get; protected set; }
        public string Password { get; protected set; }
        public string Salt { get; protected set; }
        public DateTime CreatedAt { get; protected set; }
        public bool IsActive { get; protected set; }

        protected User() { }

        public User(Guid id, string role, string name, string email, string password, string salt)
        {
            Id = id;
            SetRole(role);
            SetName(name);
            SetEmail(email);
            SetPassword(password);
            CreatedAt = DateTime.UtcNow.ToLocalTime();
            SetSalt(salt);
            SetActive(false);
        }

        public void SetName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentNullException($"User can not have an empty name.");
            }
            Name = name;
        }

        public void SetEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new ArgumentNullException($"User can not have an empty email.");
            }
            Email = email;
        }

        public void SetRole(string role)
        {
            if (string.IsNullOrWhiteSpace(role))
            {
                throw new ArgumentNullException($"User can not have an empty role.");
            }
            role = role.ToLowerInvariant();
            if (!_roles.Contains(role))
            {
                throw new ArgumentException($"User can not have a role: '{role}'.");
            }
            Role = role;
        }

        public void SetPassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                Console.WriteLine("cos1");
                throw new ArgumentNullException($"User can not have an empty password.");
            }
            // dodatkowa validacja dla sily hasla jest w serwisie rejestracji
            Password = password;
        }

        public void SetSalt(string salt)
        {
            if (string.IsNullOrWhiteSpace(salt))
            {
                throw new ArgumentNullException($"User can not have an empty salt.");
            }
            Salt = salt;
        }

        public void SetActive(bool isActive)
        {
            IsActive = isActive;
        }

    }
}