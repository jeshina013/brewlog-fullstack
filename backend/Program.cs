using Microsoft.EntityFrameworkCore;
using backend.data;
using backend.model;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=posts.db"));


var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.UseCors("AllowFrontend");


app.MapGet("/api/posts", async (AppDbContext db) =>
{
    return await db.Posts.ToListAsync();
});

app.MapPost("/api/posts", async (Post post, AppDbContext db) =>
{
  if (string.IsNullOrWhiteSpace(post.Title))
    return Results.BadRequest("Title is required.");

if (string.IsNullOrWhiteSpace(post.Author))
    return Results.BadRequest("Author is required.");

if (string.IsNullOrWhiteSpace(post.Description))
    return Results.BadRequest("Description is required.");


    post.CreatedAt = DateTime.UtcNow;

    db.Posts.Add(post);
    await db.SaveChangesAsync();

    return Results.Created($"/api/posts/{post.Id}", post);
});



app.MapDelete("/api/posts/{id}", async (int id, AppDbContext db) =>
{
    var post = await db.Posts.FindAsync(id);
    if (post is null) return Results.NotFound();

    db.Posts.Remove(post);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapPut("/api/posts/{id}", async (int id, Post updatedPost, AppDbContext db) =>
{
    var post = await db.Posts.FindAsync(id);
    if (post is null) return Results.NotFound();

    if (string.IsNullOrWhiteSpace(updatedPost.Title))
        return Results.BadRequest("Title is required.");

    if (string.IsNullOrWhiteSpace(updatedPost.Author))
        return Results.BadRequest("Author is required.");

    post.Title = updatedPost.Title;
    post.Author = updatedPost.Author;
    post.Description = updatedPost.Description;
    post.ImageUrl = updatedPost.ImageUrl;


    await db.SaveChangesAsync();

    return Results.Ok(post);
});



app.Run();
