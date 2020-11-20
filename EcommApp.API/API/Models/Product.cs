using System.Collections.Generic;

namespace API.Models
{
    public class Product
    {
        public long ProductId { get; set; }
        public long ProductPrice { get; set; }
        public string ProductName { get; set; }
        public long UserId { get; set; }
        public string ProdDescription { get; set; }
        public decimal prodWeight { get; set; }
        public ICollection<Order> Orders { get; set; }        
    }    
}