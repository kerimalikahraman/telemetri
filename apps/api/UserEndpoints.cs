using Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace Api;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/users");

        // GET all users
        group.MapGet("/", async (AppDbContext db) =>
        {
            var users = await db.Users
                .Select(u => new { u.Id, u.Username, u.Role, u.IsDefaultPassword })
                .ToListAsync();
            return Results.Ok(users);
        });

        // POST create user
        group.MapPost("/", async (CreateUserRequest req, AppDbContext db) =>
        {
            if (string.IsNullOrWhiteSpace(req.Username) || string.IsNullOrWhiteSpace(req.Password))
                return Results.BadRequest(new { error = "Kullanıcı adı ve şifre gereklidir." });

            if (await db.Users.AnyAsync(u => u.Username == req.Username))
                return Results.BadRequest(new { error = "Bu kullanıcı adı zaten alınmış." });

            var validRoles = new[] { "Admin", "Elektrik", "Mekanik", "Organizasyon" };
            var role = validRoles.Contains(req.Role) ? req.Role : "Mekanik";

            var newUser = new User
            {
                Username = req.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password),
                IsDefaultPassword = true,
                Role = role
            };

            db.Users.Add(newUser);
            await db.SaveChangesAsync();

            return Results.Created($"/api/users/{newUser.Id}", new { newUser.Id, newUser.Username, newUser.Role });
        });

        // DELETE user
        group.MapDelete("/{id}", async (int id, AppDbContext db) =>
        {
            var user = await db.Users.FindAsync(id);
            if (user == null)
                return Results.NotFound(new { error = "Kullanıcı bulunamadı." });

            // Prevent deleting the last admin or specific user if needed, but for now simple delete
            if (user.Username == "admin") 
                 return Results.BadRequest(new { error = "'admin' kullanıcısı silinemez." });

            db.Users.Remove(user);
            await db.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}

public record CreateUserRequest(string Username, string Password, string Role = "Mekanik");
