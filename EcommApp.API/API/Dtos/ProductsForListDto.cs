namespace API.Dtos
{
    public class ProductsForListDto
    {
        public long ProductId { get; set; }
        public long ProductPrice { get; set; }
        public string ProdImage { get; set; }
        public string ProductName { get; set; }
        public long UserId { get; set; }
        public string ProdDescription { get; set; }
        public decimal prodWeight { get; set; }
    }
}