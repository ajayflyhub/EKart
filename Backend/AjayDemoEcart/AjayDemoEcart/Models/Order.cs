using System.ComponentModel.DataAnnotations.Schema;

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
        public string ShippingAddress { get; set; }
        public string BillingAddress { get; set; }
        public string ContactNumber { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Subtotal { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Taxes { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }
        public int Quantity { get; set; }

        //public List<Product>? Products { get; set; }
    }
}
