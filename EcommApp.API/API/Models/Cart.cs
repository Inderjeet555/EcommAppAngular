namespace API.Models
{
    public class Cart
    {
        public long CartId { get; set; }                
        public long Quantity { get; set; }
        public long ProductId { get; set; }  
        public Product Products { get; set; } 
        public int UsersId { get; set; }
        public User Users { get; set; }
    }
}