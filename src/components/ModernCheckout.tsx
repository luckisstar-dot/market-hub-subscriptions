
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Truck, Shield, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface ModernCheckoutProps {
  onClose: () => void;
  onSuccess: () => void;
}

const ModernCheckout = ({ onClose, onSuccess }: ModernCheckoutProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, total, clearCart } = useCart();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      onSuccess();
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Order Summary */}
          <div className="bg-gray-50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Product #{item.id}</h4>
                    <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${(total * 1.1).toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="h-4 w-4 mr-2" />
                Secure SSL encryption
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="h-4 w-4 mr-2" />
                Free shipping on orders over $50
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Secure Checkout</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input id="zipCode" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" required />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" defaultValue="United States" required />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={paymentMethod === 'card' ? 'default' : 'outline'}
                      className="h-12"
                      onClick={() => setPaymentMethod('card')}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Credit Card
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
                      className="h-12"
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      PayPal
                    </Button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" required />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay $${(total * 1.1).toFixed(2)}`}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernCheckout;
