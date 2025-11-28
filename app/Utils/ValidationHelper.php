<?php

namespace App\Utils;

use Illuminate\Support\Facades\Validator;

class ValidationHelper
{
    /**
     * Validate CPF.
     */
    public static function validateCpf(string $cpf): array
    {
        $cpf = preg_replace('/[^0-9]/', '', $cpf);

        if (strlen($cpf) != 11) {
            return ['valid' => false, 'message' => 'CPF must have 11 digits'];
        }

        if (preg_match('/(\d)\1{10}/', $cpf)) {
            return ['valid' => false, 'message' => 'Invalid CPF'];
        }

        for ($t = 9; $t < 11; $t++) {
            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $cpf[$c] * (($t + 1) - $c);
            }
            $d = ((10 * $d) % 11) % 10;
            if ($cpf[$c] != $d) {
                return ['valid' => false, 'message' => 'Invalid CPF'];
            }
        }

        return ['valid' => true, 'message' => 'Valid CPF', 'formatted' => self::formatCpf($cpf)];
    }

    /**
     * Validate CNPJ.
     */
    public static function validateCnpj(string $cnpj): array
    {
        $cnpj = preg_replace('/[^0-9]/', '', $cnpj);

        if (strlen($cnpj) != 14) {
            return ['valid' => false, 'message' => 'CNPJ must have 14 digits'];
        }

        if (preg_match('/(\d)\1{13}/', $cnpj)) {
            return ['valid' => false, 'message' => 'Invalid CNPJ'];
        }

        $length = strlen($cnpj) - 2;
        $numbers = substr($cnpj, 0, $length);
        $digits = substr($cnpj, $length);
        $sum = 0;
        $pos = $length - 7;

        for ($i = $length; $i >= 1; $i--) {
            $sum += $numbers[$length - $i] * $pos--;
            if ($pos < 2) {
                $pos = 9;
            }
        }

        $result = $sum % 11 < 2 ? 0 : 11 - $sum % 11;
        if ($result != $digits[0]) {
            return ['valid' => false, 'message' => 'Invalid CNPJ'];
        }

        $length = $length + 1;
        $numbers = substr($cnpj, 0, $length);
        $sum = 0;
        $pos = $length - 7;

        for ($i = $length; $i >= 1; $i--) {
            $sum += $numbers[$length - $i] * $pos--;
            if ($pos < 2) {
                $pos = 9;
            }
        }

        $result = $sum % 11 < 2 ? 0 : 11 - $sum % 11;
        if ($result != $digits[1]) {
            return ['valid' => false, 'message' => 'Invalid CNPJ'];
        }

        return ['valid' => true, 'message' => 'Valid CNPJ', 'formatted' => self::formatCnpj($cnpj)];
    }

    /**
     * Validate Brazilian license plate.
     */
    public static function validatePlate(string $plate): array
    {
        $plate = strtoupper(str_replace([' ', '-'], '', $plate));

        // Old format: ABC1234 (3 letters + 4 numbers)
        // New format: ABC1D23 (3 letters + 1 number + 1 letter + 2 numbers)
        $oldFormat = '/^[A-Z]{3}[0-9]{4}$/';
        $newFormat = '/^[A-Z]{3}[0-9][A-Z][0-9]{2}$/';

        if (preg_match($oldFormat, $plate) || preg_match($newFormat, $plate)) {
            return ['valid' => true, 'message' => 'Valid plate', 'formatted' => self::formatPlate($plate)];
        }

        return ['valid' => false, 'message' => 'Invalid plate format'];
    }

    /**
     * Validate email.
     */
    public static function validateEmail(string $email): array
    {
        $validator = Validator::make(['email' => $email], [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return ['valid' => false, 'message' => 'Invalid email format'];
        }

        return ['valid' => true, 'message' => 'Valid email'];
    }

    /**
     * Validate phone.
     */
    public static function validatePhone(string $phone): array
    {
        $phone = preg_replace('/[^0-9]/', '', $phone);

        // Brazilian phone: 10 or 11 digits (with or without area code)
        if (strlen($phone) >= 10 && strlen($phone) <= 11) {
            return ['valid' => true, 'message' => 'Valid phone', 'formatted' => self::formatPhone($phone)];
        }

        return ['valid' => false, 'message' => 'Invalid phone format'];
    }

    /**
     * Format CPF.
     */
    public static function formatCpf(string $cpf): string
    {
        return preg_replace('/(\d{3})(\d{3})(\d{3})(\d{2})/', '$1.$2.$3-$4', $cpf);
    }

    /**
     * Format CNPJ.
     */
    public static function formatCnpj(string $cnpj): string
    {
        return preg_replace('/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/', '$1.$2.$3/$4-$5', $cnpj);
    }

    /**
     * Format plate.
     */
    public static function formatPlate(string $plate): string
    {
        if (strlen($plate) == 7) {
            if (preg_match('/^[A-Z]{3}[0-9][A-Z][0-9]{2}$/', $plate)) {
                // New format: ABC1D23
                return substr($plate, 0, 3) . '-' . substr($plate, 3);
            } else {
                // Old format: ABC1234
                return substr($plate, 0, 3) . '-' . substr($plate, 3);
            }
        }

        return $plate;
    }

    /**
     * Format phone.
     */
    public static function formatPhone(string $phone): string
    {
        if (strlen($phone) == 11) {
            return '(' . substr($phone, 0, 2) . ') ' . substr($phone, 2, 5) . '-' . substr($phone, 7);
        } elseif (strlen($phone) == 10) {
            return '(' . substr($phone, 0, 2) . ') ' . substr($phone, 2, 4) . '-' . substr($phone, 6);
        }

        return $phone;
    }
}

