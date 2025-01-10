namespace AjayDemoEcart.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ProductId { get; set; }
        public string Status { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
