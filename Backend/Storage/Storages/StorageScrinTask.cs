using Core;
using Microsoft.EntityFrameworkCore;
using Storage.Entities;

namespace Storage.Storages;

/// <summary>
/// Класс для взаимодействия с хранилищем задач
/// </summary>
/// <param name="context"></param>
public class StorageScrinTask(ContextDatabase context)
{
    private readonly ContextDatabase _context = context;

    public async Task Insert(ScrinTask task, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(task);

        await _context.ScrinTasks.AddAsync(new EntityScrinTask(task), cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task Update(ScrinTask task, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(task);

        var currentTask = await _context.ScrinTasks.FirstOrDefaultAsync(x => x.Id == task.Id, cancellationToken)
            ?? throw new ArgumentException("StorageScrinTask.Update: Task Not Found!");

        _context.Entry(currentTask).CurrentValues.SetValues(task);

        await _context.SaveChangesAsync();
    }

    public async Task Delete(ScrinTask task)
    {
        ArgumentNullException.ThrowIfNull(task);

        var removeTask = await _context.ScrinTasks.FirstOrDefaultAsync(x => x.Id == task.Id) 
            ?? throw new ArgumentException("StorageScrinTask.Delete: Task Not Found!");

        _context.ScrinTasks.Remove(removeTask);
        await _context.SaveChangesAsync();
    }

    public async Task<ScrinTask> GetById(Guid id, CancellationToken cancellationToken = default)
    {
        var task = await _context.ScrinTasks.FirstOrDefaultAsync(x => x.Id == id)
            ?? throw new ArgumentException("StorageScrinTask.GetById: Task Not Found!");

        return task.GetModel();
    }

    public async Task<IReadOnlyList<ScrinTask>> GetAll(bool? isCompleteFilter = null, CancellationToken cancellationToken = default)
    {
        var tasks = isCompleteFilter is null
            ? await _context.ScrinTasks.ToListAsync()
            : await _context.ScrinTasks.Where(x => x.IsComplete == isCompleteFilter).ToListAsync();

        return tasks.Select(x => x.GetModel()).ToList();
    }


}
