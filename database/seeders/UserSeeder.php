<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ADMIN
        $adminUser = User::firstOrCreate(
            [ 'email' => 'admin@example.com' ],
            [
                'name' => 'Administrator',
                'password' => bcrypt('12345678'),
                'email_verified_at' => now(),
            ]
        );
        $adminUser->assignRole('admin');


        // POLICYHOLDER
        $policyholder = User::firstOrCreate(
            [ 'email' => 'policyholder@example.com' ],
            [
                'name' => 'Policyholder User',
                'password' => bcrypt('12345678'),
                'email_verified_at' => now(),
            ]
        );
        $policyholder->assignRole('policyholder');


        // STIPULATOR
        $stipulator = User::firstOrCreate(
            [ 'email' => 'stipulator@example.com' ],
            [
                'name' => 'Stipulator User',
                'password' => bcrypt('12345678'),
                'email_verified_at' => now(),
            ]
        );
        $stipulator->assignRole('stipulator');


        // SELLER
        $seller = User::firstOrCreate(
            [ 'email' => 'seller@example.com' ],
            [
                'name' => 'Seller User',
                'password' => bcrypt('12345678'),
                'email_verified_at' => now(),
            ]
        );
        $seller->assignRole('seller');


        // COORDINATOR
        $coordinator = User::firstOrCreate(
            [ 'email' => 'coordinator@example.com' ],
            [
                'name' => 'Coordinator User',
                'password' => bcrypt('12345678'),
                'email_verified_at' => now(),
            ]
        );
        $coordinator->assignRole('coordinator');


        // EMPLOYEE
        $employee = User::firstOrCreate(
            [ 'email' => 'employee@example.com' ],
            [
                'name' => 'Employee User',
                'password' => bcrypt('12345678'),
                'email_verified_at' => now(),
            ]
        );
        $employee->assignRole('employee');

    }
}
