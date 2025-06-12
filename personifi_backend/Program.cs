using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using personifi_backend.Classes;
using personifi_backend.Models;
using System.Security.Claims;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

var auth0Domain = builder.Configuration["Auth0:Domain"];
var auth0Audience = builder.Configuration["Auth0:Audience"];
var postgresPassword = builder.Configuration["PostgresPassword"];

if (string.IsNullOrEmpty(auth0Domain))
{
    throw new InvalidOperationException("Auth0:Domain configuration is missing or empty.");
}

if (string.IsNullOrEmpty(auth0Audience))
{
    throw new InvalidOperationException("Auth0:Audience configuration is missing or empty.");
}

if (string.IsNullOrEmpty(postgresPassword))
{
    throw new InvalidOperationException("PostgresPassword configuration is missing or empty.");
}

builder.Services.AddDbContext<PersonifiContext>(options =>
    options.UseNpgsql($"Host=localhost;Database=personifi;Username=postgres;Password={postgresPassword}"));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.Authority = $"https://{auth0Domain}/";
    options.Audience = auth0Audience;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        NameClaimType = ClaimTypes.NameIdentifier
    };
});

builder.Services
  .AddAuthorizationBuilder()
    .AddPolicy("read:balances", policy => policy.Requirements.Add(
        new HasScopeRequirement("read:balances", $"https://{auth0Domain}/")
    ))
    .AddPolicy("transaction:create", policy => policy.Requirements.Add(
        new HasScopeRequirement("transaction:create", $"https://{auth0Domain}/")
    ));

builder.Services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

builder.Services.AddControllers().AddJsonOptions(x =>
{
    x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddHttpLogging(o =>
{
    o.LoggingFields = HttpLoggingFields.All;
    o.RequestBodyLogLimit = 4096;
    o.ResponseBodyLogLimit = 4096;
});

var app = builder.Build();

app.UseHttpLogging();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();