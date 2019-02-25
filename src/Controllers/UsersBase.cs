using System.Collections.Generic;
using System.Linq;

public static class UsersBase
{
    private static List<User> Users;
    static UsersBase()
    {
        Users = new List<User>();
    }

    public static int AddUser(string name, int hash)
    {
        var user = new User(Users.Count, name, hash);

        Users.Add(user);

        return user.Id;
    }

    public static string[] GetUsersScores(int idOfUser, int mapId)
    {
        var user = GetUserById(idOfUser);

        var users = UsersBase
                .Users
                .Where(u => u.GetScoreFor(mapId) > -1)
                .OrderByDescending(u => u.GetScoreFor(mapId))
                .ToArray();
        var scores = new string[10];
        for (var i = 0; i < 10 && i < users.Length; i++)
        {
            scores[i] = $"{users[i].Name} : {users[i].GetScoreFor(mapId)}";
            if (users[i] == user)
                scores[i] = "[YOU]" + scores[i];
        }
        for (var i = users.Length; i < 10; i++)
            scores[i] = $"- : 0";
        return scores;
    }

    public static User GetUserById(int id)
    {
        return Users.FirstOrDefault(user => user.Id == id);
    }

    public static User CheckUser(string name, int hash)
    {
        return Users.FirstOrDefault(user => user.Name == name && user.Hash == hash);
    }

    public static void DeleteUserById(int id)
    {
        var user = Users.FirstOrDefault(u => u.Id == id);
        if (user == null)
            return;
        Users.Remove(user);
    }

    public static bool Contains(string userName)
    {
        return Users.Exists(u => u.Name == userName);
    }
}