namespace AjayDemoEcart.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public List<int> ProductIds { get; set; }  // List of Product IDs
        public string Status { get; set; }
        public DateTime OrderDate { get; set; }
        public string OrderNumber { get; set; }
        public decimal Price { get; set; }  // This is the total price
        public string ShippingAddress { get; set; }
        public string BillingAddress { get; set; }
        public string ContactNumber { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Taxes { get; set; }
        public decimal TotalPrice { get; set; }  // Price with taxes included
        public int Quantity { get; set; }

        //public List<Product>? Products { get; set; }
    }
}
