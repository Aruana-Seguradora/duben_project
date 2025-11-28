<?php

namespace App\Filament\Pages;

use App\Filament\Widgets\FormLinkWidget;
//use Filament\Widgets\AccountWidget;
use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    public function getWidgets(): array
    {
        return [
            FormLinkWidget::class,
        ];
    }

    


}
