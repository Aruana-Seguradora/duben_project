<?php

namespace App\Providers\Filament\Responses;

use App\Models\User;
use Filament\Auth\Http\Responses\Contracts\LoginResponse;

class CustomLoginResponse implements LoginResponse
{
    public function toResponse($request)
    {
        /** @var User $user */
        $user = auth()->user();

        $role = $user->getRole();

        // Admin vai para o painel Filament
        if ($role === 'admin') {
            return redirect('/');
        }

        // Todos os outros roles vão para o formulário
        return redirect()->route('duben.form');
    }
}
