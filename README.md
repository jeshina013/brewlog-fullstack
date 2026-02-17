# BrewLog -- Full Stack Blog Manager

BrewLog is a full-stack blog management application built using ASP.NET
Core Web API, React, and SQLite.

The application allows users to create, view, update, and delete blog
posts through a clean and intuitive user interface.

------------------------------------------------------------------------

## Tech Stack

### Backend

-   ASP.NET Core Web API (.NET 9)
-   Entity Framework Core
-   SQLite (Relational Database)
-   RESTful API architecture

### Frontend

-   React (Vite)
-   React Router
-   Custom CSS styling
-   Fetch API for HTTP communication

------------------------------------------------------------------------

## Features

-   Full CRUD operations (Create, Read, Update, Delete)
-   Persistent relational database (SQLite)
-   Backend validation
-   Frontend validation
-   Search functionality (Manage page)
-   Dashboard card view with modal detail display
-   Clean UI with responsive layout
-   Structured multi-page navigation

------------------------------------------------------------------------

## Database Model

``` csharp
public class Post
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
    public DateTime CreatedAt { get; set; }
}
```

SQLite database is automatically created using:

``` csharp
db.Database.EnsureCreated();
```

------------------------------------------------------------------------

## API Endpoints

  Method   Endpoint          Description
  -------- ----------------- --------------------
  GET      /api/posts        Retrieve all posts
  POST     /api/posts        Create a new post
  PUT      /api/posts/{id}   Update a post
  DELETE   /api/posts/{id}   Delete a post

------------------------------------------------------------------------

## How to Run

### Backend

cd backend\
dotnet run

API runs at: http://localhost:5262/api/posts

### Frontend

cd frontend\
npm install\
npm run dev

Frontend runs at: http://localhost:5173

------------------------------------------------------------------------

## Architectural Notes

-   SQLite was chosen for lightweight relational storage.
-   Entity Framework Core simplifies database interactions.
-   REST principles are followed for clean API design.
-   Validation is implemented on both frontend and backend.
-   In production, EF Core migrations would replace EnsureCreated().

------------------------------------------------------------------------

Author: Nandini Mungah
