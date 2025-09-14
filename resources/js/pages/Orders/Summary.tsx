import { Head, Link } from '@inertiajs/react';

interface Props {
    customer: {
        name: string;
        email: string;
    };
    domains: {
        bring: string[];
        buy: string[];
    };
    order_id: string;
    created_at: string;
}

export default function Summary({ customer, domains, order_id, created_at }: Props) {
    return (
        <>
            <Head title="Order Summary" />
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-green-600 mb-2">Order Created Successfully!</h1>
                            <p className="text-lg text-gray-600">Order ID: {order_id}</p>
                            <p className="text-sm text-gray-500">Created on: {created_at}</p>
                        </div>

                        {/* Customer Information */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Customer Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <p className="text-lg">{customer.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <p className="text-lg">{customer.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Domains Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Domains</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Bring Domains */}
                                <div>
                                    <h3 className="text-lg font-medium mb-3 text-blue-600">Domains to Bring</h3>
                                    {domains.bring.length > 0 ? (
                                        <div className="space-y-2">
                                            {domains.bring.map((domain, index) => (
                                                <div key={index} className="bg-blue-50 p-3 rounded-md border-l-4 border-blue-500">
                                                    <span className="font-medium">{domain}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 italic">No domains to bring</p>
                                    )}
                                </div>

                                {/* Buy Domains */}
                                <div>
                                    <h3 className="text-lg font-medium mb-3 text-green-600">Domains to Buy</h3>
                                    {domains.buy.length > 0 ? (
                                        <div className="space-y-2">
                                            {domains.buy.map((domain, index) => (
                                                <div key={index} className="bg-green-50 p-3 rounded-md border-l-4 border-green-500">
                                                    <span className="font-medium">{domain}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 italic">No domains to buy</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Summary Statistics */}
                        <div className="mb-8 p-4 bg-gray-50 rounded-md">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-2xl font-bold text-blue-600">{domains.bring.length}</p>
                                    <p className="text-sm text-gray-600">Domains to Bring</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-green-600">{domains.buy.length}</p>
                                    <p className="text-sm text-gray-600">Domains to Buy</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">{domains.bring.length + domains.buy.length}</p>
                                    <p className="text-sm text-gray-600">Total Domains</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="text-center">
                            <Link
                                href="/order"
                                className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Create Another Order
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}