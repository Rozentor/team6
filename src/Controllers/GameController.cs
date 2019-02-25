using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace thegame.Controllers
{
    [Route("api/game")]
    public class GameController : Controller
    {
        [HttpPost]
        [Route("maps")]
        public IActionResult GetMaps([FromBody] User user)
        {
            return Ok(
                DataBase.Maps
                .Select((arr, i) => "Map " + i)
                .ToArray());
        }

        [HttpHead("{mapId}")]
        [HttpGet("{mapId}")]
        public IActionResult GetMaps(int mapId)
        {
            System.Console.WriteLine(mapId);
            if (mapId < 0 || mapId >= DataBase.Maps.Count)
                return NotFound("No maps with id " + mapId);

            return Ok(DataBase.Maps[mapId]);
        }

        [HttpPost]
        [Route("register")]
        public IActionResult AddUser([FromBody]RegisterInfo user)
        {
            if (UsersBase.Contains(user.Name))
                return BadRequest("This name is alraedy registered");

            var id = UsersBase.AddUser(user.Name, user.Password.GetHashCode());

            return Ok(id);
        }

        [HttpPost]
        [Route("authorize")]
        public IActionResult Authorize([FromBody]RegisterInfo info)
        {
            var user = UsersBase.CheckUser(info.Name, info.Password.GetHashCode());
            if (user == null)
                return NotFound("Wrong password or name");

            return Ok(user.Id);
        }

        [HttpPost]
        [Route("GetScore")]
        public IActionResult GetScore([FromBody]User user)
        {
            var realUser = UsersBase.GetUserById(user.Id);
            realUser.Score = user.Score;

            return Ok(UsersBase.GetUsersScores(user.Id));
        }
    }
}