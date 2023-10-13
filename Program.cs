using Microsoft.EntityFrameworkCore;
using WebApplication9;

var builder = WebApplication.CreateBuilder(args);
string? connection = builder.Configuration.GetConnectionString("Connection");
builder.Services.AddDbContext<ApplicationContext>(option => option.UseSqlServer(connection));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api/users", async (ApplicationContext db) => await db.Users.ToListAsync());

app.MapGet("/api/users/{id}", async (String id, ApplicationContext db) =>
{
    User? user = await db.Users.FirstOrDefaultAsync(x => x.Id == id);

    if (user == null) return Results.NotFound(new { message = "Пользователь не найден" });

    return Results.Json(user);
});

app.MapDelete("/api/users/{id}", async (String id, ApplicationContext db) =>
{
    User? user = await db.Users.FirstOrDefaultAsync(x => x.Id == id);

    if (user == null) return Results.NotFound(new { message = "Пользователь не найден" });

    db.Users.Remove(user);
    await db.SaveChangesAsync();
    return Results.Json(user);
});

app.MapPost("/api/users", async (User user, ApplicationContext db) =>
{
    user.Id = Guid.NewGuid().ToString();
    await db.Users.AddAsync(user);
    await db.SaveChangesAsync();
    return user;
});

app.MapPut("/api/users", async (User userData, ApplicationContext db) =>
{
    var user = await db.Users.FirstOrDefaultAsync(u => u.Id == userData.Id);

    if (user == null) return Results.NotFound(new { message = "Пользователь не найден" });

    user.Age = userData.Age;
    user.Name = userData.Name;
    await db.SaveChangesAsync();
    return Results.Json(user);
});

app.Run();
