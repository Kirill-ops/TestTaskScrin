
namespace Core;

/// <summary>
/// Класс описывающий задачу
/// </summary>
public class ScrinTask
{
    /// <summary>
    /// уникальный ID задачи в системе
    /// </summary>
    public Guid Id { get; }

    /// <summary>
    /// Описание задачи
    /// </summary>
    public string Description { get; init; }

    /// <summary>
    /// Признак того, что задача выполнена, true - да, иначе false
    /// </summary>
    public bool IsComplete { get; init; }

    /// <summary>
    ///  Дата создания задачи
    /// </summary>
    public DateTimeOffset CreatedAt { get; }

    /// <summary>
    /// Дата обновления задачи
    /// </summary>
    public DateTimeOffset UpdatedAt { get; }

    /// <summary>
    /// Создание новой задачи с уникальным ID
    /// </summary>
    /// <param name="description">Описание задачи</param>
    /// <param name="isComplete">Признак того, что задача выполнена</param>
    public ScrinTask(string description, bool isComplete)
    {
        Id = Guid.NewGuid();
        Description = description;
        IsComplete = isComplete; // Можно, конечно, сделать так, что у всех новых задач этот признак будет false,
                                 // но оставим возможность, устанавливать завершенность задачи на этапе создания, более верхним сервисам 
        CreatedAt = UpdatedAt = DateTimeOffset.Now;
    }

    /// <summary>
    /// Полный конструктор
    /// </summary>
    /// <param name="id">ID задачи в системе</param>
    /// <param name="description">Описание задачи</param>
    /// <param name="isComplete">Признак того, что задача выполнена</param>
    public ScrinTask(
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

    /// <summary>
    /// Конструктор копирования
    /// </summary>
    /// <param name="task">Копируемая задача</param>
    public ScrinTask(ScrinTask task)
    {
        Id = task.Id;
        Description = task.Description;
        IsComplete = task.IsComplete;
        CreatedAt = task.CreatedAt;
        UpdatedAt = task.UpdatedAt;
    }
}
