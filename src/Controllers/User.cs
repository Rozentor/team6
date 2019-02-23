public class User
{
    public string Name{get;private set;}
    public int Score{get;set;}
    public int Id {get;private set;}

    public User(int id,string name)
    {
        Id = id;
        Name=name;
    }
}