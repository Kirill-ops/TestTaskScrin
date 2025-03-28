using Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Storage.Storages;
using WebApplicationForSKRIN.Entities;

namespace WebApplicationForSKRIN.Controllers;

[Route("tasks")]
[AllowAnonymous]
public class TasksController(StorageScrinTask storage) : Controller
{
    [HttpPost("")]
    public async Task Create([FromBody] ScrinTaskPost request)
    {
        ArgumentNullException.ThrowIfNull(request);
        ArgumentNullException.ThrowIfNullOrWhiteSpace(request.Description);

        var task = new ScrinTask(request.Description, false);

        await storage.Insert(task);
    }

    [HttpPut("{taskId}")]
    public async Task Update(Guid taskId, [FromBody] ScrinTaskPut request)
    {
        ArgumentNullException.ThrowIfNull(request);
        ArgumentNullException.ThrowIfNullOrWhiteSpace(request.Description);

        var task =await storage.GetById(taskId);

        var updateTask = new ScrinTask(task)
        {
            Description = request.Description,
            IsComplete = request.IsComplete,
        };

        await storage.Update(updateTask);
    }

    [HttpGet("{taskId}")]
    public async Task<ScrinTaskFull> Get(Guid taskId)
    {
        var task = await storage.GetById(taskId);

        return new(task);
    }

    [HttpGet("")]
    public async Task<IReadOnlyList<ScrinTaskFull>> Get([FromQuery] bool? isCompleteFilter = null)
    {
        var tasks = await storage.GetAll(isCompleteFilter);

        return tasks.Select(x => new ScrinTaskFull(x)).ToList();
    }

    [HttpDelete("{taskId}")]
    public async Task Delete(Guid taskId)
    {
        var task = await storage.GetById(taskId);
        
        await storage.Delete(task);
    }
}
