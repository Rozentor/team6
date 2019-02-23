using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace thegame.Controllers
{
    [Route("api/game")]
    public class GameController : Controller
    {
        [HttpGet("score")]
        public IActionResult Score()
        {
            
            return Ok(50);
        }

        [HttpGet("maps")]
        public IActionResult GetMaps()
        {
            return Ok(DataBase.Maps.Select((arr, i) => "Map " + i).ToArray());
        }
        [HttpHead("{mapId}")]
        [HttpGet("{mapid}")]
        public IActionResult GetMaps(int mapId)
        {
            if (mapId < 0 || mapId >= DataBase.Maps.Count)
                return NotFound();

            return Ok(DataBase.Maps[mapId]);
        }

        [HttpPost]
        public IActionResult ScoreState([FromBody] int[,] mapState)
        {
            if (mapState == null || mapState.GetLength(0) != 9 || mapState.GetLength(1) != 9)
                return BadRequest();
            for (var y = 0; y < 9; y++)
            {
                for (var x = 0; x < 9; x++)
                {
                    if (mapState[x, y] == 3)
                        return Ok(false);
                }
            }
            return Ok(true);
        }
    }
}
