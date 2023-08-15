using System;

namespace WarTime
{
    class Program
    {
        static void Main(string[] args)
        {
            Army command_1 = new Army(5);
            Army command_2 = new Army(5);
            string game_status = "";
            game_status = command_1.Fight(command_2);
            Console.WriteLine(game_status);
        }
    }

    class Player
    {
        byte id;
        double damage;
        double critical_damage_scale;
        double critical_damage_chance;
        double health;

        public Player(
            double damage,
            double critical_damage_scale,
            double critical_damage_chance,
            double health)
        {
            this.id = 0;
            this.damage = damage;
            this.critical_damage_scale = critical_damage_scale;
            this.critical_damage_chance = critical_damage_chance;
            this.health = health;
        }

        public double Health
        {
            set { this.health = health; }
            get => this.health;
        }

        public void Beat(Player enemy)
        {
            Random rnd = new Random();
            float chance = (float)rnd.Next(0, 100) / 100;
            double critical_scale = 1;
            if (chance <= critical_damage_chance)
            {
                critical_scale = this.critical_damage_scale;
            }
            double dmg = damage * critical_scale;
            if (enemy.health <= dmg)
            {
                enemy.health = 0;
            }
            else
            {
                enemy.health -= dmg;
            }
        }
    }

    class Army
    {
        Player[] army;
        int army_size;

        public int ArmySize
        {
            set 
            { 
                this.army_size = army_size;
                this.army = new Player[this.army_size];
                for (int i = 0; i < army_size; i++)
                {
                    this.army[i] = new Player(43, 2, 0.3, 100);
                }
            }

            get => this.army_size;
        }

        public Army(int army_size)
        {
            this.army_size = army_size;
            this.army = new Player[this.army_size];
            for (int i = 0; i < this.army_size; i++)
            {
                this.army[i] = new Player(43, 2, 0.3, 100);
            }
        }

        public double TotalHealth()
        {
            double total_health = 0;
            for (int i = 0; i < this.army_size; i++)
            {
                total_health += this.army[i].Health;
            }
            return total_health;
        }

        public string Fight(Army enemies)
        {
            Random rnd = new Random();
            int enemies_army_size = enemies.ArmySize;
            while (true)
            {
                int i = rnd.Next(0, enemies_army_size);
                int j = rnd.Next(0, this.army_size);
                this.army[i].Beat(enemies.army[j]);
                if (enemies.TotalHealth() == 0.0)
                {
                    Console.WriteLine("Our health: " +
                        this.TotalHealth().ToString() +
                        " enemies health: " +
                        enemies.TotalHealth().ToString());
                    return "Our Team Team Victory!";
                }
                enemies.army[j].Beat(this.army[i]);
                if (this.TotalHealth() == 0.0)
                {
                    Console.WriteLine("Our health: " +
                        this.TotalHealth().ToString() +
                        " enemies health: " +
                        enemies.TotalHealth().ToString());
                    return "Enemies Victory!";
                }
                Console.WriteLine("Our health: " +
                    this.TotalHealth().ToString() +
                    " enemies health: " +
                    enemies.TotalHealth().ToString());
            }
        }
    }
}
