using Core;

namespace WebApplicationForSKRIN.Entities;

public class ScrinTaskFull(ScrinTask task)
{
    public Guid Id { get; } = task.Id;

    public string Description { get; } = task.Description;

    public bool IsComplete { get; } = task.IsComplete;
}
