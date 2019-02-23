using System.Collections.Generic;
using System.Linq;

public static class UsersBase
{
    public static List<User> Users;
    static UsersBase()
    {
        Users = new List<User>();
    }

    public static int AddUser(string name)
    {
        var user = new User(Users.Count,name);

        Users.Add(user);

        return user.Id;
    } 

    public static User GetUserById(int id)
    {
        return Users.FirstOrDefault(user => user.Id == id);
    }

    public static void DeleteUserById(int id)
    {
        var user = Users.FirstOrDefault(u=> u.Id == id);
        if(user == null)
            return;
        Users.Remove(user);
    }
}