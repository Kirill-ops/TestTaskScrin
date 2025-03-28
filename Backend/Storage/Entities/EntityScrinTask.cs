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

    public EntityScrinTask(Guid id, string description, bool isComplete)
    {
        Id = id;
        Description = description;
        IsComplete = isComplete;
    }

    public EntityScrinTask(ScrinTask task)
    {
        Id = task.Id;
        Description = task.Description;
        IsComplete = task.IsComplete;
    }

    public ScrinTask GetModel()
        => new(
            id: Id,
            description: Description,
            isComplete: IsComplete);
}
