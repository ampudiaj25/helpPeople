﻿using System;
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
    public class CiudadanoController : ControllerBase
    {
        private readonly DbbolsaEmpleoContext _context;

        public CiudadanoController(DbbolsaEmpleoContext context)
        {
            _context = context;
        }

        // GET: api/Ciudadano
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ciudadano>>> GetCiudadanos()
        {
            return await _context.Ciudadanos.ToListAsync();
        }

        // PUT: api/Ciudadano/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> PutCiudadano(Ciudadano ciudadano)
        {
            bool result = await _context.Ciudadanos.AnyAsync(e => e.Id == ciudadano.Id);
            if (!result)
            {
                return BadRequest();
            }

            _context.Entry(ciudadano).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok();
        }

        // POST: api/Ciudadano
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ciudadano>> PostCiudadano(Ciudadano ciudadano)
        {
            _context.Ciudadanos.Add(ciudadano);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Ciudadano/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCiudadano(int id)
        {
            var ciudadano = await _context.Ciudadanos.FindAsync(id);
            if (ciudadano == null)
            {
                return NotFound();
            }

            _context.Ciudadanos.Remove(ciudadano);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
