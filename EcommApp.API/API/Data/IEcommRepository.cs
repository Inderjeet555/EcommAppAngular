using API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Data
{
    public interface IEcommRepository
    {
         void Add<T>(T entity) where T: class;
         Task<List<Product>> GetProducts();
         Task<Product> GetProduct(long id);
         Task<bool> SaveToCart(Cart cart);
         Task<int> GetCartCount(int userId);
    }
}