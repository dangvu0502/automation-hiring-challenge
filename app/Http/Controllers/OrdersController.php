<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrdersController extends Controller
{
    public function create()
    {
        return Inertia::render('Orders/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'bring_domains' => 'array',
            'bring_domains.*' => ['string', 'regex:/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i'],
            'buy_domains' => 'array',
            'buy_domains.*' => ['string', 'regex:/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i'],
        ], [
            'bring_domains.*.regex' => 'Each domain to bring must be a valid domain format (e.g., example.com).',
            'buy_domains.*.regex' => 'Each domain to buy must be a valid domain format (e.g., example.com).',
        ]);

        // Validate that at least one domain is provided
        $bringDomainsCount = count($validated['bring_domains'] ?? []);
        $buyDomainsCount = count($validated['buy_domains'] ?? []);
        
        if ($bringDomainsCount === 0 && $buyDomainsCount === 0) {
            return back()->withErrors([
                'domains' => 'Please add at least one domain to bring or buy.'
            ])->withInput();
        }

        // Process the order (placeholder for now)
        $orderData = [
            'customer' => [
                'name' => $validated['name'],
                'email' => $validated['email'],
            ],
            'domains' => [
                'bring' => $validated['bring_domains'] ?? [],
                'buy' => $validated['buy_domains'] ?? [],
            ],
            'order_id' => 'ORD-' . strtoupper(uniqid()),
            'created_at' => now()->format('Y-m-d H:i:s'),
        ];

        return Inertia::render('Orders/Summary', $orderData);
    }
}