public class User
{
    public string Name { get; private set; }
    public int Score { get; set; }
    public int Id { get; private set; }
    public int Hash { get; private set; }

    public User(int id, string name, int hash)
    {
        Id = id;
        Name = name;
        Hash = hash;
    }
}