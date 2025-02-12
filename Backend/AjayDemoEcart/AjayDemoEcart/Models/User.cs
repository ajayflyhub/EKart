﻿using System;
using System.ComponentModel.DataAnnotations;

public class User
{
    [Key]
    public int Id { get; set; }

    public string Username { get; set; }

    public string Email { get; set; }

    public string? PasswordHash { get; set; }

    public string? Address { get; set; }

    public string? PhoneNumber { get; set; }

    public string Role { get; set; }

    public string? ResetToken { get; set; }

    public DateTime? ResetTokenExpires { get; set; }

    public bool IsActive { get; set; } = true; // Default to active

    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Auto-set on creation

    [Required]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow; // Auto-set on creation & update
}
