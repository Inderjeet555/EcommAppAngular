using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class UserRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage =  "You must specify password")]
        public string Password { get; set; }
        
        [Required]
        public string Gender { get; set; }
        
        public string KnownAs { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }
        
        public string City { get; set; }        
        public string Country { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        public UserRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }

}