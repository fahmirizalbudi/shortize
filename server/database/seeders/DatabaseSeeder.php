<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

//        User::factory()->create([
//            'name' => 'Test User',
//            'email' => 'test@example.com',
//        ]);

        Role::create([
            'role' => 'admin'
        ]);

        Role::create([
            'role' => 'user'
        ]);

        User::create([
           'name' => 'Administrator',
           'email' => 'admin@example.com',
           'password' => bcrypt('demo'),
           'role_id' => 1
        ]);
    }
}
