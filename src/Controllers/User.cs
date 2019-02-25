using System.Collections.Generic;

public class User
{
    public string Name { get; private set; }
    public int Id { get; private set; }
    public int Hash { get; private set; }

    private Dictionary<int, int> Scores;

    public User(int id, string name, int hash)
    {
        Id = id;
        Name = name;
        Hash = hash;
        Scores = new Dictionary<int, int>();
    }

    public void SetScore(int mapId,int score)
    {
        if(Scores.TryGetValue(mapId,out var oldScore))
        {
            if(oldScore < score)
                Scores[mapId] = score;
        }
        else
            Scores[mapId] = score;
    }

    public int GetScoreFor(int mapId)
    {
        if(Scores.TryGetValue(mapId,out var score))
            return score;
        return -1;
    }
}