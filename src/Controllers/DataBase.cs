using System.Collections.Generic;

public static class DataBase
{
    public static List<int[,]> Maps;
    static DataBase()
    {
        var map0 = new[,]
        {
            {2,2,2,2,2,2,2,2,2},
            {2,2,2,2,0,3,2,2,2},
            {2,4,0,0,0,0,0,3,2},
            {2,2,2,2,2,0,0,0,2},
            {2,3,0,3,2,0,1,1,2},
            {2,1,0,1,2,3,1,0,2},
            {2,0,1,0,2,0,0,0,2},
            {2,0,0,0,0,0,0,3,2},
            {2,2,2,2,2,2,2,2,2}
        };

        var map1 = new[,]
        {
            {2,2,2,2,2,2,2,2,2},
            {2,4,0,0,0,0,0,0,2},
            {2,0,1,0,0,0,0,0,2},
            {2,0,1,0,0,0,0,0,2},
            {2,0,3,2,0,0,1,0,2},
            {2,0,3,2,0,1,3,0,2},
            {2,0,0,2,0,0,3,0,2},
            {2,0,0,0,0,1,3,0,2},
            {2,2,2,2,2,2,2,2,2}
        };

        var map2 = new[,]
        {
            {2,2,2,2,2,2,2,2,2},
            {2,4,2,0,0,0,0,0,2},
            {2,0,2,0,2,2,2,0,2},
            {2,0,0,0,2,0,0,0,2},
            {2,2,2,2,2,3,1,0,2},
            {2,0,0,0,0,0,0,1,2},
            {2,3,1,1,0,2,2,3,2},
            {2,0,3,0,0,0,1,3,2},
            {2,2,2,2,2,2,2,2,2}
        };
		
		var map3 = new[,]
        {
            {2,2,2,2,2,2,2,2,2,2,2,2,2,2,2},
            {2,3,0,3,0,0,0,0,2,2,2,0,0,0,2},
            {2,0,2,0,2,0,0,0,2,3,0,0,0,0,2},
            {2,3,0,1,0,0,0,0,2,2,2,0,0,3,2},
            {2,0,0,0,2,2,0,1,0,2,0,1,0,0,2},
			{2,0,0,0,2,0,0,0,0,2,0,0,0,1,2},
            {2,0,0,1,2,0,3,1,3,0,0,0,0,0,2},
            {2,0,2,0,2,0,1,4,1,0,0,0,2,0,2},
            {2,0,2,0,0,0,3,1,3,0,0,0,2,0,2},
			{2,0,0,0,0,0,0,0,0,0,0,0,2,0,2},
			{2,0,1,2,2,0,0,2,2,2,2,2,2,0,2},
			{2,0,3,1,0,0,0,1,0,0,0,0,0,3,2},
			{2,2,2,2,2,0,0,0,0,0,2,2,2,2,2},
			{2,3,0,0,0,0,1,0,0,0,0,3,0,0,2},
			{2,2,2,2,2,2,2,2,2,2,2,2,2,2,2}
        };
		
		var map4 = new[,]
		{
			{2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2},
			{2,2,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,2,2},
			{2,0,2,0,0,3,1,3,1,3,1,3,1,0,1,3,1,3,1,3,1,3,0,0,2,0,2},
			{2,0,0,0,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,0,0,0,2},
			{2,0,0,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,0,0,2},
			{2,2,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,2,2},
			{2,0,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,0,2},
			{2,0,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,0,2},
			{2,0,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,0,2},
			{2,0,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,0,2},
			{2,0,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,0,2},
			{2,0,3,1,3,1,3,1,3,1,3,0,0,0,0,0,3,1,3,1,3,1,3,1,3,0,2},
			{2,0,1,3,1,3,1,3,1,3,1,0,0,1,0,0,1,3,1,3,1,3,1,3,1,0,2},
			{2,2,0,1,3,1,3,1,3,1,3,0,1,4,1,0,3,1,3,1,3,1,3,1,0,2,2},
			{2,0,1,3,1,3,1,3,1,3,1,0,0,1,0,0,1,3,1,3,1,3,1,3,1,0,2},
			{2,0,3,1,3,1,3,1,3,1,3,0,0,0,0,0,3,1,3,1,3,1,3,1,3,0,2},
			{2,0,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,0,2},
			{2,0,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,0,2},
			{2,0,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,0,2},
			{2,0,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,0,2},
			{2,0,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,0,2},
			{2,2,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,2,2},
			{2,0,0,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,0,0,2},
			{2,0,0,0,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,0,0,0,2},
			{2,0,2,0,0,3,1,3,1,3,1,3,1,0,1,3,1,3,1,3,1,3,0,0,2,0,2},
			{2,2,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,2,2},
			{2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2}
		};

        Maps = new List<int[,]> { map0, map1, map2, map3, map4 };
    }
}