using Core;
using System.ComponentModel.DataAnnotations.Schema;
namespace Storage.Entities;

/// <summary>
/// Класс для хранения объектов <see cref="Core.ScrinTask"/>
/// </summary>
[Table("ScrinTasks")]
public class EntityScrinTask : IEntity<ScrinTask>
{
    public Guid Id { get; set; }

    public string Description { get; set; }
    
    public bool IsComplete { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }

    public EntityScrinTask(
        Guid id, 
        string description, 
        bool isComplete, 
        DateTimeOffset createdAt,
        DateTimeOffset updatedAt)
    {
        Id = id;
        Description = description;
        IsComplete = isComplete;
        CreatedAt = createdAt;
        UpdatedAt = updatedAt;
    }

    public EntityScrinTask(ScrinTask task)
    {
        Id = task.Id;
        Description = task.Description;
        IsComplete = task.IsComplete;
        CreatedAt = task.CreatedAt;
        UpdatedAt = task.UpdatedAt;
    }

    public ScrinTask GetModel()
        => new(
            id: Id,
            description: Description,
            isComplete: IsComplete,
            createdAt: CreatedAt,
            updatedAt: UpdatedAt);
}
