<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Authors as AuthorsModel;

class AuthorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        AuthorsModel::factory()->count(100)->create();
    }
}
