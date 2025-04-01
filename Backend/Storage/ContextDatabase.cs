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
        Database.EnsureCreated();   
    }
}
