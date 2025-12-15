using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "KR_App Orchestrator", Version = "v1" });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/health", () =>
{
    return Results.Ok(new
    {
        status = "ok",
        service = "orchestrator",
        time = DateTime.UtcNow
    });
});

app.MapGet("/containers", () =>
{
    // Şimdilik mock veri. Bunu ileride Docker API'den çekersin.
    var containers = new[]
    {
        new { id = "1", name = "telemetry-service", status = "running", image = "kr/telemetry:latest" },
        new { id = "2", name = "accounting-service", status = "stopped", image = "kr/accounting:latest" },
        new { id = "3", name = "workshop-service", status = "running", image = "kr/workshop:latest" },
    };

    return Results.Ok(containers);
});

app.Run();
