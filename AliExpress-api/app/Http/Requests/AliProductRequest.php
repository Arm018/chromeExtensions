<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AliProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'productId' => 'required',
            'productType' => 'required',
            'collection' => 'nullable|string',
            'quantity' => 'required|integer',
            'description' => 'required|string',
            'price' => 'required',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'price' => preg_replace('/[^0-9.]/', '', $this->price),
        ]);
    }
}
