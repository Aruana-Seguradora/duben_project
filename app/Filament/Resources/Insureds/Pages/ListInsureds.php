<?php

namespace App\Filament\Resources\Insureds\Pages;

use App\Filament\Resources\Insureds\InsuredResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListInsureds extends ListRecords
{
    protected static string $resource = InsuredResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
