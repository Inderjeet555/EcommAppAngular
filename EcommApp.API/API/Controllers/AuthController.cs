using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Dtos;

namespace API.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class AuthController: ControllerBase
    {
        
        [HttpGet("{id}", Name = "Register")]
        public IActionResult Register(UserRegisterDto userRegisterDto) 
        {            
          return Ok(id);
        }

    }
}