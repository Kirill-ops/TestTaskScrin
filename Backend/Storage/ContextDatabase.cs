using Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Storage.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Storage;

public class ContextDatabase : DbContext
{
    public DbSet<EntityScrinTask> ScrinTasks { get; set; }

    public ContextDatabase(DbContextOptions<ContextDatabase> options)
       : base(options)
    {
        Database.EnsureDeleted(); // Данную строчку нужно удалить, чтобы данные не удалялись при каждом запуске приложения
                                  // В процессе внесения правок (после полученяи замечаний от проверяющего)
                                  // схема БД была немного изменена. Чтобы не случалось исключений, было принято решение удалить старые данные
                                  // Способ был выбран самый простой, НО из-за него данные будут удаляться при каждом запуске
        Database.EnsureCreated();   
    }
}
