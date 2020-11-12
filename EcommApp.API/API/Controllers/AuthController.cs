using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Dtos;
using API.Data;
using AutoMapper;
using API.Models;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;

namespace API.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class AuthController: ControllerBase
    {

      private readonly IAuthRepository _repo;
      private readonly IMapper _mapper;
      private readonly IConfiguration _iconfig;
      public AuthController(IAuthRepository repo, IMapper mapper, IConfiguration config)
      {
          this._repo = repo;
          this._mapper = mapper;
          this._iconfig = config;
      }

      [HttpGet]
      public IActionResult Get() 
      {            
        return Ok("Test");
      }


        
        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserRegisterDto userRegisterDto) 
        {        
          userRegisterDto.Username = userRegisterDto.Username.ToLower();

            if (await _repo.IsUserExists(userRegisterDto.Username))
                  return BadRequest("User already exists!");
                    

            var userToCreate = _mapper.Map<User>(userRegisterDto);
            var createdUser = await _repo.Register(userToCreate, userRegisterDto.Password);
                    
                    
            return Ok("Okay");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginRegisterDto loginRegisterDto) 
        {
            var userFromRepo = await _repo.Login(loginRegisterDto.UserName, loginRegisterDto.Password);

              if (userFromRepo == null)
                  return Unauthorized();

              var claims = new [] 
              {
                  new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                  new Claim(ClaimTypes.Name, userFromRepo.Username)
              };

              var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_iconfig.GetSection("AppSettings:Token").Value));
              var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

               var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var user = _mapper.Map<UserForListDto>(userFromRepo);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });

              
        }

    }
}