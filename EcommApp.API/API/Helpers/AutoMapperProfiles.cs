using API.Helpers;
using API.Models;
using AutoMapper;
using API.Dtos;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserRegisterDto, User>();
            CreateMap<User, UserForListDto>();
            CreateMap<Product, ProductsForListDto>();
            CreateMap<CartDto, Cart>();
            //     .ForMember(p => p.Orders, opt => opt.Ignore());
           // CreateMap<>
        }
    }
}