<?php

namespace App\Filament\Resources\Insureds\Pages;

use App\Filament\Resources\Insureds\InsuredResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditInsured extends EditRecord
{
    protected static string $resource = InsuredResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
