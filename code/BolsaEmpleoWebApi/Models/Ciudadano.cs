using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BolsaEmpleoWebApi.Models;

public partial class Ciudadano
{
    public int Id { get; set; }

    public int TiposDocumento { get; set; }

    public string Cedula { get; set; } = null!;

    public string Nombres { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public DateOnly FechaNacimiento { get; set; }

    public string Profesion { get; set; } = null!;

    public decimal? AspiracionSalarial { get; set; }

    public string? CorreoElectronico { get; set; }
    [JsonIgnore]
    public virtual TiposDocumento? TiposDocumentoNavigation { get; set; }
}
