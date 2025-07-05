<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;

class JSONFormatter
{

    public static function format($code, $message = null, $data = null): JsonResponse {
        return response()->json([
            'code' => $code,
            'message' => $message,
            'data' => $data
        ], $code);
    }

}
