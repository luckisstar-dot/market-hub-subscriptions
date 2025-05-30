
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';

interface PlanData {
  userType: 'buyer' | 'vendor';
  planName: string;
  price: string;
  redirectUrl: string;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [planData, setPlanData] = useState<PlanData | null>(null);

  useEffect(() => {
    // Get plan data from navigation state or sessionStorage
    const data = location.state || JSON.parse(sessionStorage.getItem('selectedPlan') || '{}');
    if (!data.planName) {
      navigate('/subscription-plans');
      return;
    }
    setPlanData(data);
  }, [location, navigate]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // After successful payment, redirect to registration
      if (planData?.userType === 'buyer') {
        navigate(planData.redirectUrl + '&plan=paid');
      } else {
        navigate('/vendor-registration?plan=paid');
      }
    }, 2000);
  };

  if (!planData) {
    return null;
  }

  const price = parseFloat(planData.price.replace('$', ''));
  const tax = price * 0.1;
  const total = price + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Subscription</h1>
            <p className="text-gray-600">Secure payment for your {planData.planName} plan</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{planData.planName}</h3>
                    <Badge variant="outline">
                      {planData.userType === 'buyer' ? 'Buyer Plan' : 'Vendor Plan'}
                    </Badge>
                  </div>
                  <span className="font-semibold">{planData.price}/month</span>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center text-sm text-blue-700">
                    <Shield className="h-4 w-4 mr-2" />
                    14-day free trial included
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Payment Information</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/subscription-plans')}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Payment Method</Label>
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
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
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

                  {/* Billing Address */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Billing Address</Label>
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
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg font-semibold"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Subscribe for $${total.toFixed(2)}`}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By subscribing, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
