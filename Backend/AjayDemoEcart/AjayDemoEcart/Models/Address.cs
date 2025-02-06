using System.ComponentModel.DataAnnotations;

namespace AjayDemoEcart.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
