<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\Widget;

class FormLinkWidget extends Widget
{
    protected string $view = 'filament.widgets.form-link-widget';
    
    protected int | string | array $columnSpan = 1;

    public function getFormUrl(): string
    {
        /** @var User $user */
        $user = auth()->user();
        
        if (!$user) {
            return route('duben.form');
        }

        $role = $user->getRole();
        
        // Mapear roles para tipoSolicitante
        $tipoSolicitanteMap = [
            'admin' => 'colaborador',
            'employee' => 'colaborador',
            'seller' => 'colaborador',
            'coordinator' => 'colaborador',
            'stipulator' => 'estipulante',
            'policyholder' => 'segurado',
        ];

        $tipoSolicitante = $tipoSolicitanteMap[$role] ?? 'colaborador';

        return route('duben.form', ['tipoSolicitante' => $tipoSolicitante]);
    }
}
