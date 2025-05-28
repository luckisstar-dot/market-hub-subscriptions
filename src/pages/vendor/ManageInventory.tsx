
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Edit, Trash2, Plus, Search, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';

const ManageInventory = () => {
  const products = [
    {
      id: 1,
      name: 'Premium Coffee Beans',
      sku: 'PCB-001',
      price: 24.99,
      stock: 45,
      status: 'active',
      lowStockThreshold: 10
    },
    {
      id: 2,
      name: 'Organic Spice Set',
      sku: 'OSS-002',
      price: 34.50,
      stock: 5,
      status: 'active',
      lowStockThreshold: 10
    },
    {
      id: 3,
      name: 'Herbal Tea Collection',
      sku: 'HTC-003',
      price: 45.00,
      stock: 0,
      status: 'out_of_stock',
      lowStockThreshold: 5
    },
    {
      id: 4,
      name: 'Handmade Jewelry',
      sku: 'HMJ-004',
      price: 89.99,
      stock: 23,
      status: 'active',
      lowStockThreshold: 15
    }
  ];

  const getStockStatus = (stock: number, threshold: number) => {
    if (stock === 0) return { status: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (stock <= threshold) return { status: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="vendor" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Inventory</h1>
          <p className="text-gray-600">Track and manage your product inventory.</p>
        </div>

        {/* Action Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input className="pl-10" placeholder="Search products..." />
                </div>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Product Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((product) => {
                const stockStatus = getStockStatus(product.stock, product.lowStockThreshold);
                return (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                        <p className="text-sm font-medium text-marketplace-primary">${product.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{product.stock}</p>
                        <p className="text-sm text-gray-600">units</p>
                      </div>

                      <Badge className={stockStatus.color}>
                        {stockStatus.status}
                      </Badge>

                      {product.stock <= product.lowStockThreshold && product.stock > 0 && (
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      )}

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">Low Stock Items</h3>
                <p className="text-3xl font-bold text-yellow-600">2</p>
                <p className="text-sm text-gray-600">Need restocking</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">Out of Stock</h3>
                <p className="text-3xl font-bold text-red-600">1</p>
                <p className="text-sm text-gray-600">Unavailable</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium">Total Products</h3>
                <p className="text-3xl font-bold text-blue-600">4</p>
                <p className="text-sm text-gray-600">In catalog</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManageInventory;
