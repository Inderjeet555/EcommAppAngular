using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class LoginRegisterDto
    {
        [Required]
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}