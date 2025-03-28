namespace WebApplicationForSKRIN.Entities;

public class ScrinTaskPut(
    string description,
    bool isComplete)
{
    public string Description { get; } = description;

    public bool IsComplete { get; } = isComplete;
}
