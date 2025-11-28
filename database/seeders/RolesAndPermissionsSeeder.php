<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();
        $permissions = [
            'manager_all_permissions',
            'dashboard.access',
            'user.view',
            'user.create',
            'user.update',
            'user.delete',
            'request.view',
            'request.create',
            'request.update',
            'request.delete',
            'request.approve',
            'request.assign',
        ];


        foreach ($permissions as $permission) {
            Permission::firstOrCreate([ 'name' => $permission ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Roles
        |--------------------------------------------------------------------------
        */

        // Policyholder (Segurado)
        $policyholder = Role::firstOrCreate([ 'name' => 'policyholder' ]);
        $policyholder->givePermissionTo([
            'dashboard.access',
            'request.view',
            'request.create',
        ]);

        // Stipulator (Estipulante)
        $stipulator = Role::firstOrCreate([ 'name' => 'stipulator' ]);
        $stipulator->givePermissionTo([
            'dashboard.access',
            'request.view',
            'request.create',
            'request.update',
        ]);

        // Seller (Vendedor)
        $seller = Role::firstOrCreate([ 'name' => 'seller' ]);
        $seller->givePermissionTo([
            'dashboard.access',
            'request.view',
            'request.create',
            'request.update',
            'request.assign',
        ]);

        // Coordinator (Coordenador)
        $coordinator = Role::firstOrCreate([ 'name' => 'coordinator' ]);
        $coordinator->givePermissionTo([
            'dashboard.access',
            'request.view',
            'request.update',
            'request.approve',
            'request.assign',
        ]);

        // Employee (Colaborador)
        $employee = Role::firstOrCreate([ 'name' => 'employee' ]);
        $employee->givePermissionTo([
            'dashboard.access',
            'request.view',
            'request.update',
        ]);

        // Optional: Admin role for full access
        $admin = Role::firstOrCreate([ 'name' => 'admin' ]);
        $admin->givePermissionTo(Permission::all());
    }


}
