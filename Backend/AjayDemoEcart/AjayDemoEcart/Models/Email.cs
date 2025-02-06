namespace AjayDemoEcart.Models
{
    public class Email
    {
        public string? RecipientEmail { get; set; }
        public string SenderEmail { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public bool IsHtml { get; set; } = false;
    }
}
