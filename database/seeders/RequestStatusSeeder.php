<?php

namespace Database\Seeders;

use App\Models\RequestStatus;
use Illuminate\Database\Seeder;

class RequestStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            [
                'key' => 'pending',
                'name' => 'Pendente',
            ],
            [
                'key' => 'in_progress',
                'name' => 'Em Andamento',
            ],
            [
                'key' => 'under_review',
                'name' => 'Em Análise',
            ],
            [
                'key' => 'approved',
                'name' => 'Aprovado',
            ],
            [
                'key' => 'rejected',
                'name' => 'Rejeitado',
            ],
            [
                'key' => 'completed',
                'name' => 'Concluído',
            ],
            [
                'key' => 'cancelled',
                'name' => 'Cancelado',
            ],
        ];

        foreach ($statuses as $status) {
            RequestStatus::firstOrCreate(
                ['key' => $status['key']],
                $status
            );
        }
    }
}
