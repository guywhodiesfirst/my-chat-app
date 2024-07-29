using API.Data;
using API.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(opt => 
{
    opt.AddPolicy("ReactApplication", builder => 
    {
        builder.WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});
builder.Services.AddSignalR().AddAzureSignalR(options => 
{
    options.ConnectionString = builder.Configuration["AzureSignalRConnectionString"];
});

builder.Services.AddSingleton<InMemoryDb>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();
app.MapHub<ChatHub>("chatHub");
app.MapFallbackToController("Index", "Fallback"); // Looks for action "Index" in FallbackController
app.UseCors("ReactApplication");

app.Run();