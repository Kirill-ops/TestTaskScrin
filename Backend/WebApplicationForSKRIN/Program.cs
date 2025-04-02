
using Microsoft.EntityFrameworkCore;
using Storage;
using Storage.Storages;
using WebApplicationForSKRIN.Middlewares;

namespace WebApplicationForSKRIN;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();

        string connection = "Server=(localdb)\\mssqllocaldb;Database=DatabaseWebApplicationForSKRIN;Trusted_Connection=True;";
        builder.Services.AddDbContext<ContextDatabase>(options => options.UseSqlServer(connection));

        // Сервисы взаимодействия с бд
        builder.Services.AddScoped<StorageScrinTask>();

        var app = builder.Build();

        app.UseMiddleware<ExceptionMiddleware>();

        // TODO 9: Разрещены все CORS
        app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true).AllowCredentials());

        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}
