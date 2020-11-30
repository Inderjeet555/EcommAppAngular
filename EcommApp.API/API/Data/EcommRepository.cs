using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;
using API.Models;

namespace API.Data
{
    public class EcommRepository : IEcommRepository
    {
        private readonly DataContext _context;

        public EcommRepository(DataContext context)
        {
            this._context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        
        public async Task<Product> GetProduct(long id)
        {
            return await _context.Products.Where(x => x.ProductId == id).FirstOrDefaultAsync();
        }

        public async  Task<List<Product>> GetProducts()
        {            
            var products = await _context.Products.ToListAsync();
                return products;
        }        
    }
}