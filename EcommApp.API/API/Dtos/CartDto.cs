namespace API.Dtos
{
    public class CartDto
    {
        public long CartId { get; set; }                
        public long Quantity { get; set; }
        public long ProductId { get; set; }        
        public int UsersId { get; set; }        
    }
}