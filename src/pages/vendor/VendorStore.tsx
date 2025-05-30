
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, ShoppingCart, Heart, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const VendorStore = () => {
  const { vendorId } = useParams();

  // Mock vendor data - in a real app, this would be fetched based on vendorId
  const vendor = {
    id: vendorId || '1',
    name: 'African Beans Co.',
    location: 'Kenya',
    description: 'Premium coffee beans sourced directly from Kenyan highlands. We work with local farmers to bring you the finest quality coffee.',
    rating: 4.8,
    totalReviews: 124,
    verified: true,
    joinedDate: 'January 2023',
    responseTime: '2 hours'
  };

  const products = [
    {
      id: 1,
      name: 'Premium Arabica Coffee Beans',
      price: 24.99,
      image: '/placeholder.svg',
      rating: 4.9,
      inStock: true,
      description: 'Single origin Arabica beans from the highlands of Kenya'
    },
    {
      id: 2,
      name: 'Dark Roast Coffee Blend',
      price: 22.99,
      image: '/placeholder.svg',
      rating: 4.7,
      inStock: true,
      description: 'Rich and bold dark roast blend perfect for espresso'
    },
    {
      id: 3,
      name: 'Organic Fair Trade Coffee',
      price: 28.99,
      image: '/placeholder.svg',
      rating: 4.8,
      inStock: false,
      description: 'Certified organic and fair trade coffee beans'
    }
  ];

  const reviews = [
    {
      id: 1,
      customerName: 'John D.',
      rating: 5,
      comment: 'Excellent coffee! Fast shipping and great quality.',
      date: '2024-01-15'
    },
    {
      id: 2,
      customerName: 'Sarah M.',
      rating: 4,
      comment: 'Good quality beans, will order again.',
      date: '2024-01-10'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Vendor Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">LOGO</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold">{vendor.name}</h1>
                  {vendor.verified && (
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-gray-600">{vendor.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{vendor.rating}</span>
                    <span className="text-gray-600 ml-1">({vendor.totalReviews} reviews)</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{vendor.description}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span>Joined: {vendor.joinedDate}</span>
                  <span>Response time: {vendor.responseTime}</span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Button>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Vendor
                </Button>
                <Button variant="outline">Follow Store</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Products */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Products ({products.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">IMG</span>
                      </div>
                      <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-marketplace-primary">
                          ${product.price}
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm">{product.rating}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {product.inStock ? (
                          <Button className="flex-1" size="sm">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        ) : (
                          <Button className="flex-1" size="sm" disabled>
                            Out of Stock
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Store Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Store Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Products</span>
                    <span className="font-medium">{products.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Store Rating</span>
                    <span className="font-medium">{vendor.rating}/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Reviews</span>
                    <span className="font-medium">{vendor.totalReviews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-medium">98%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{review.customerName}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">{review.comment}</p>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VendorStore;
