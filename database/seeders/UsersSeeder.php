<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User as UserModel;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $HighestSuperAdmin=UserModel::create([
            'name'=>'Damitha Wijetunga',
            'email'=>'wijetunga.damitha@gmail.com',
            'password'=>Hash::make('Damitha#1@a')
        ]);
        
        $SuperAdmin=UserModel::create([
            'name'=>'Super Admin',
            'email'=>'super_admin@test.com',
            'password'=>Hash::make('SuperAdmin#1@a')
        ]);
        
        $Guest=UserModel::create([
            'name'=>'Guest',
            'email'=>'Guest',
            'password'=>Hash::make('Guest')
        ]);
    }
}
