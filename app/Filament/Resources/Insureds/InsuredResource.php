<?php

namespace App\Filament\Resources\Insureds;

use App\Filament\Resources\Insureds\Pages\CreateInsured;
use App\Filament\Resources\Insureds\Pages\EditInsured;
use App\Filament\Resources\Insureds\Pages\ListInsureds;
use App\Filament\Resources\Insureds\Schemas\InsuredForm;
use App\Filament\Resources\Insureds\Tables\InsuredsTable;
use App\Models\Insured;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class InsuredResource extends Resource
{
    protected static ?string $model = Insured::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return InsuredForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return InsuredsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListInsureds::route('/'),
            'create' => CreateInsured::route('/create'),
            'edit' => EditInsured::route('/{record}/edit'),
        ];
    }

    public static function canViewAny(): bool
    {
//        return auth()->user()?->hasRole('admin') ?? false;
        return false;
    }
}
