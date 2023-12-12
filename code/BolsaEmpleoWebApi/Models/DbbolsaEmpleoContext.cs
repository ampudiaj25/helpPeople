using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BolsaEmpleoWebApi.Models;

public partial class DbbolsaEmpleoContext : DbContext
{
    public DbbolsaEmpleoContext()
    {
    }

    public DbbolsaEmpleoContext(DbContextOptions<DbbolsaEmpleoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Ciudadano> Ciudadanos { get; set; }

    public virtual DbSet<TiposDocumento> TiposDocumentos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-T5EA3L8;Database=DBBolsaEmpleo;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Ciudadano>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Ciudadan__3213E83FC4F1ACDB");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Apellidos)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("apellidos");
            entity.Property(e => e.AspiracionSalarial)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("aspiracionSalarial");
            entity.Property(e => e.Cedula)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cedula");
            entity.Property(e => e.CorreoElectronico)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("correoElectronico");
            entity.Property(e => e.FechaNacimiento).HasColumnName("fechaNacimiento");
            entity.Property(e => e.Nombres)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombres");
            entity.Property(e => e.Profesion)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("profesion");
            entity.Property(e => e.TiposDocumento).HasColumnName("tiposDocumento");

            entity.HasOne(d => d.TiposDocumentoNavigation).WithMany(p => p.Ciudadanos)
                .HasForeignKey(d => d.TiposDocumento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Ciudadano__tipos__3C69FB99");
        });

        modelBuilder.Entity<TiposDocumento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TiposDoc__3213E83FB7643AF2");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
