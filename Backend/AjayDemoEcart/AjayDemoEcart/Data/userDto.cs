using AjayDemoEcart.Models;

public class UserDto
{
    public string Email { get; set; }
    public string Role { get; set; }
    public string Username { get; set; }
    public int Id { get; set; }
    public string PhoneNumber { get; set; }
    public string Address { get; set; }
    public IEnumerable<Address> Addresses { get; set; }
    public IEnumerable<Order> Orders { get; set; }
}


public class AddressDto
{
    public int Id { get; set; }
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
}

public class OrderDto
{
    public int OrderId { get; set; }
    public string ProductName { get; set; }
    public int Quantity { get; set; }
    public DateTime OrderDate { get; set; }
}