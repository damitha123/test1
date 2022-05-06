<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $name=$this->faker->unique()->city;
        $slug= str_replace(' ', '-', strtolower($name));
        
        return [
            'name' => $name,
            'description' => $this->faker->paragraph(),
            'slug' => $slug,
            'url' => $this->faker->url(),
            'price'=>$this->faker->randomDigitNotZero(),
            'date'=>$this->faker->dateTimeBetween('-3 year', '-1 day')
        ];
    }
}
