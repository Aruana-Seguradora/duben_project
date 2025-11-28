<x-filament-widgets::widget class="fi-form-link-widget">
    <x-filament::section>
        <x-filament::button
            color="primary"
            :icon="\Filament\Support\Icons\Heroicon::DocumentText"
            labeled-from="sm"
            tag="a"
            :href="$this->getFormUrl()"
        >
            Formulário único
        </x-filament::button>
    </x-filament::section>
</x-filament-widgets::widget>

<!-- <x-filament-widgets::widget class="fi-form-link-widget">
    <x-filament::section>
        <x-filament::button
            color="primary"
            :icon="\Filament\Support\Icons\Heroicon::DocumentText"
            labeled-from="sm"
            tag="a"
            :href="$this->getFormUrl()"
        >
            Acessar Formulário
        </x-filament::button>
    </x-filament::section>
</x-filament-widgets::widget>


GRANDÃO
<x-filament-widgets::widget>
    <x-filament::card>
        <div class="flex items-center justify-start p-4">
            <a
                href="{{ $this->getFormUrl() }}"
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
            >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Acessar Formulário
            </a>
        </div>
    </x-filament::card>
</x-filament-widgets::widget> -->
