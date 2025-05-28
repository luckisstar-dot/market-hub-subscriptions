
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, Send } from 'lucide-react';
import Header from '@/components/Header';

const WriteReviews = () => {
  const [ratings, setRatings] = useState<{[key: number]: number}>({});
  const [reviews, setReviews] = useState<{[key: number]: string}>({});

  const eligibleProducts = [
    {
      id: 1,
      name: 'Premium Coffee Beans',
      vendor: 'African Coffee Co.',
      orderDate: '2024-01-15',
      orderId: '#ORD-001',
      price: 24.99,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Handmade Jewelry Set',
      vendor: 'Artisan Crafts',
      orderDate: '2024-01-10',
      orderId: '#ORD-002',
      price: 89.99,
      image: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Organic Spice Mix',
      vendor: 'Spice Masters',
      orderDate: '2024-01-08',
      orderId: '#ORD-003',
      price: 34.50,
      image: '/placeholder.svg'
    }
  ];

  const handleRatingChange = (productId: number, rating: number) => {
    setRatings(prev => ({ ...prev, [productId]: rating }));
  };

  const handleReviewChange = (productId: number, review: string) => {
    setReviews(prev => ({ ...prev, [productId]: review }));
  };

  const handleSubmitReview = (productId: number) => {
    const rating = ratings[productId];
    const review = reviews[productId];
    
    if (!rating) {
      alert('Please select a rating');
      return;
    }

    console.log('Submitting review:', { productId, rating, review });
    // Reset form
    setRatings(prev => ({ ...prev, [productId]: 0 }));
    setReviews(prev => ({ ...prev, [productId]: '' }));
  };

  const StarRating = ({ productId, currentRating }: { productId: number, currentRating: number }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRatingChange(productId, star)}
            className={`focus:outline-none ${
              star <= currentRating ? 'text-yellow-500' : 'text-gray-300'
            }`}
          >
            <Star className="h-6 w-6 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="buyer" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Write Reviews</h1>
          <p className="text-gray-600">Share your experience with products you've purchased.</p>
        </div>

        {/* Review Guidelines */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Review Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Be honest and constructive in your feedback</li>
              <li>• Focus on the product quality, shipping, and overall experience</li>
              <li>• Avoid personal attacks on vendors</li>
              <li>• Include specific details about what you liked or disliked</li>
            </ul>
          </CardContent>
        </Card>

        {/* Products to Review */}
        <div className="space-y-6">
          {eligibleProducts.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle className="text-lg">Review Your Purchase</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-500 text-xs">IMG</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.vendor}</p>
                    <p className="text-sm text-gray-500">Order: {product.orderId}</p>
                    <p className="text-sm text-gray-500">Purchased: {product.orderDate}</p>
                    <Badge variant="outline" className="mt-1">${product.price}</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating *</label>
                    <StarRating productId={product.id} currentRating={ratings[product.id] || 0} />
                    <p className="text-xs text-gray-500 mt-1">
                      {ratings[product.id] ? `${ratings[product.id]} out of 5 stars` : 'Click to rate'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your Review</label>
                    <Textarea
                      value={reviews[product.id] || ''}
                      onChange={(e) => handleReviewChange(product.id, e.target.value)}
                      placeholder="Share your experience with this product..."
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => handleSubmitReview(product.id)}>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {eligibleProducts.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Star className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Products to Review</h3>
                <p className="text-gray-600">
                  You can write reviews for products after they've been delivered.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WriteReviews;
