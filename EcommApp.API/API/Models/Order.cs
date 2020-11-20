using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Order
    {
        public long OrderId { get; set; }                
        public long Quantity { get; set; }
        public decimal Amount { get; set; }  

        [ForeignKey("User")]
        public int  UsersId { get; set; }
        public User Users { get; set; } 

        [ForeignKey("Product")]
        public long ProductId { get; set; }  
        public Product Products { get; set; }              
    }
}