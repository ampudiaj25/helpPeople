using System;
using System.Collections.Generic;

namespace BolsaEmpleoWebApi.Models;

public partial class TiposDocumento
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Ciudadano> Ciudadanos { get; set; } = new List<Ciudadano>();
}
