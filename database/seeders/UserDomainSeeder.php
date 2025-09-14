<?php

namespace Database\Seeders;

use App\Models\UserDomain;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserDomainSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserDomain::create([
            'name' => 'ycombinator.com',
            'redirect_url' => 'https://www.ycombinator.com/',
            'mx' => [
                ['prio' => 20, 'value' => 'alt2.aspmx.l.google.com'],
                ['prio' => 30, 'value' => 'aspmx4.googlemail.com'],
                ['prio' => 10, 'value' => 'aspmx.l.google.com'],
                ['prio' => 20, 'value' => 'alt1.aspmx.l.google.com'],
            ]
        ]);
    }
}
