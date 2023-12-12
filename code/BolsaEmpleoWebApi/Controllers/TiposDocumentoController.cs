using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BolsaEmpleoWebApi.Models;

namespace BolsaEmpleoWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiposDocumentoController : ControllerBase
    {
        private readonly DbbolsaEmpleoContext _context;

        public TiposDocumentoController(DbbolsaEmpleoContext context)
        {
            _context = context;
        }

        // GET: api/TiposDocumento
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TiposDocumento>>> GetTiposDocumentos()
        {
            return await _context.TiposDocumentos.ToListAsync();
        }      

    }
}
