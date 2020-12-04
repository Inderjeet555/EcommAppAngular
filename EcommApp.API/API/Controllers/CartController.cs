using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Dtos;
using API.Data;
using AutoMapper;
using API.Models;

namespace API.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class CartController: ControllerBase
    {
        private  IMapper _mapper; 
        private readonly IEcommRepository _repo; 

        public CartController(IMapper mapper, IEcommRepository repo)
        {
            this._mapper = mapper;
            this._repo = repo;
        }


        [HttpPost("saveToCart")]
        public async Task<IActionResult> saveToCart(CartDto cartDto) 
        {
            if (cartDto == null)
                return BadRequest("Error saving product!");

             var cartTosave = _mapper.Map<Cart>(cartDto);
             await _repo.SaveToCart(cartTosave);

             return Ok();
        
        }

        [HttpGet("GetCartCount/{userId}")]
        public async Task<IActionResult> GetCartCount(int userId) 
        {
            var cartCount = await _repo.GetCartCount(userId);
                return Ok(cartCount);
        }
    }
}