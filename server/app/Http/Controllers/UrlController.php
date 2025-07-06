<?php

namespace App\Http\Controllers;

use App\Helpers\JSONFormatter;
use App\Models\Url;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UrlController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $urls = Url::with('user.role')->where('destination_url', 'like', "%$search%")->get();
        return JSONFormatter::format(200, 'Urls retrieved successfully', $urls);
    }

    public function store(Request $request)
    {
        $user_id = $request->user()->id;

        $validator = Validator::make($request->all(), [
            'prefix' => 'required|unique:urls|min:2',
            'destination_url' => 'required|url'
        ]);

        if ($validator->fails()) {
            return JSONFormatter::format(422, 'Validation Failed', $validator->errors());
        }

        $now = now();

        $url = Url::create([
            'prefix' => $request->prefix,
            'destination_url' => $request->destination_url,
            'user_id' => $user_id,
            'created_at' => $now->toDateTimeString(),
            'visitor' => 0,
            'last_visited' => null
        ]);

        return JSONFormatter::format(200, 'Url created successfully', $url);
    }

    public function show(Url $url)
    {
        $url->load('user.role');
        return JSONFormatter::format(200, "Url with id $url->id successfully found", $url);
    }

    public function update(Request $request, Url $url)
    {
        $validator = Validator::make($request->all(), [
            'prefix' => 'required|unique:urls|min:2',
            'destination_url' => 'required|url'
        ]);

        if ($validator->fails()) {
            return JSONFormatter::format(422, 'Validation Failed', $validator->errors());
        }

        $url->update([
            'prefix' => $request->prefix,
            'destination_url' => $request->destination_url
        ]);

        return JSONFormatter::format(200, 'Url updated successfully', $url);
    }

    public function destroy(Url $url)
    {
        $url->delete();
        return JSONFormatter::format(200, 'Url deleted successfully');
    }
}
