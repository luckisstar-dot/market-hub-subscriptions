
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, Store, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const VendorDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const vendors = [
    {
      id: 1,
      name: 'African Beans Co.',
      location: 'Kenya',
      category: 'Food & Beverages',
      rating: 4.8,
      products: 24,
      verified: true,
      description: 'Premium coffee beans sourced directly from Kenyan highlands.'
    },
    {
      id: 2,
      name: 'Artisan Crafts',
      location: 'Ghana',
      category: 'Handmade Goods',
      rating: 4.9,
      products: 18,
      verified: true,
      description: 'Traditional handcrafted jewelry and accessories.'
    },
    {
      id: 3,
      name: 'Spice Masters',
      location: 'Morocco',
      category: 'Spices & Herbs',
      rating: 4.7,
      products: 32,
      verified: false,
      description: 'Authentic North African spices and seasoning blends.'
    }
  ];

  const handleViewStore = (vendorId: number) => {
    navigate(`/vendor-store/${vendorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Vendor Directory</h1>
          <p className="text-gray-600 mb-6">Discover trusted vendors from around the world</p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search vendors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Store className="h-5 w-5" />
                      {vendor.name}
                      {vendor.verified && (
                        <Badge className="bg-green-100 text-green-800">Verified</Badge>
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{vendor.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{vendor.description}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-1">{vendor.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm ml-1">{vendor.products} products</span>
                  </div>
                </div>

                <Badge variant="outline" className="mb-4">{vendor.category}</Badge>
                
                <Button 
                  className="w-full" 
                  onClick={() => handleViewStore(vendor.id)}
                >
                  View Store
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VendorDirectory;
