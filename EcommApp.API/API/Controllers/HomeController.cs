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
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{

    [Route("api/[Controller]")]
    [ApiController]
   // [Authorize]
    public class HomeController: ControllerBase
    {
        private  IMapper _mapper; 
        private readonly IEcommRepository _repo;      

        public HomeController(IMapper mapper, IEcommRepository repo)
        {
            this._mapper = mapper;   
            this._repo = repo; 
        }

        [HttpGet("GetProducts")]
        public async Task<IActionResult> GetProducts()
        {
             var products = await _repo.GetProducts();

             if (products == null) 
                    return BadRequest("No products found");

             
            var productsToReturn = _mapper.Map<IEnumerable<ProductsForListDto>>(products);

            return Ok(productsToReturn);
        }
    }
}