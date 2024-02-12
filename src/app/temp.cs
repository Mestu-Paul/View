// WebSocketHandler.cs
using System;
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

public abstract class WebSocketHandler
{
    protected ConcurrentDictionary<string, WebSocket> _sockets = new ConcurrentDictionary<string, WebSocket>();

    public async Task HandleWebSocketConnection(WebSocket webSocket, string userId)
    {
        try
        {
            _sockets.TryAdd(userId, webSocket);
            await Receive(webSocket, userId);
        }
        catch (WebSocketException)
        {
            // Remove the WebSocket connection if an error occurs or the connection is closed
            _sockets.TryRemove(userId, out _);
        }
    }

    private async Task Receive(WebSocket webSocket, string userId)
    {
        byte[] buffer = new byte[1024 * 4];
        while (webSocket.State == WebSocketState.Open)
        {
            WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            if (result.MessageType == WebSocketMessageType.Text)
            {
                string message = System.Text.Encoding.UTF8.GetString(buffer, 0, result.Count);
                await RouteMessage(message, userId);
            }
        }
    }

    protected abstract Task RouteMessage(string message, string userId);
}

// ChatWebSocketHandler.cs
using System.Threading.Tasks;

public class ChatWebSocketHandler : WebSocketHandler
{
    protected override async Task RouteMessage(string message, string userId)
    {
        // Parse the message and determine the recipient
        // For example, if the message is in JSON format: { "sender": "alice", "receiver": "bob", "content": "Hello, Bob!" }
        // You would parse it and extract the "receiver" field

        // Assuming you have a method to map user IDs to WebSocket connections
        // Replace this with your logic for mapping user IDs to WebSocket connections
        string recipientId = GetRecipientId(message);

        if (_sockets.TryGetValue(recipientId, out WebSocket recipientSocket))
        {
            // Send the message to the recipient
            await recipientSocket.SendAsync(new ArraySegment<byte>(System.Text.Encoding.UTF8.GetBytes(message)), WebSocketMessageType.Text, true, CancellationToken.None);
        }
    }

    private string GetRecipientId(string message)
    {
        // Parse the message and extract the recipient ID
        // Replace this with your logic to extract the recipient ID from the message
        return "bob"; // Example: Return the recipient ID "bob"
    }
}

// WebSocketMiddleware.cs
using Microsoft.AspNetCore.Http;
using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

public class WebSocketMiddleware
{
    private readonly RequestDelegate _next;
    private readonly WebSocketHandler _webSocketHandler;

    public WebSocketMiddleware(RequestDelegate next, WebSocketHandler webSocketHandler)
    {
        _next = next;
        _webSocketHandler = webSocketHandler;
    }

    public async Task Invoke(HttpContext context)
    {
        if (context.WebSockets.IsWebSocketRequest)
        {
            // Get the user ID from the context (e.g., authenticated user ID)
            string userId = context.Request.Query["userId"]; // Assuming user ID is passed in query string

            WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync();
            await _webSocketHandler.HandleWebSocketConnection(webSocket, userId);
        }
        else
        {
            // Handle non-WebSocket requests
            await _next(context);
        }
    }
}

// Startup.cs
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<WebSocketHandler, ChatWebSocketHandler>();
    }

    public void Configure(IApplicationBuilder app)
    {
        app.UseWebSockets();
        app.UseMiddleware<WebSocketMiddleware>();
    }
}
