
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Shield, Lock, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PaymentMethods = () => {
  const paymentOptions = [
    {
      category: 'Credit & Debit Cards',
      description: 'All major credit and debit cards accepted',
      methods: ['Visa', 'Mastercard', 'American Express', 'Discover'],
      processingTime: 'Instant',
      fees: 'No additional fees'
    },
    {
      category: 'Digital Wallets',
      description: 'Quick and secure digital payment options',
      methods: ['PayPal', 'Apple Pay', 'Google Pay', 'Samsung Pay'],
      processingTime: 'Instant',
      fees: 'No additional fees'
    },
    {
      category: 'Bank Transfers',
      description: 'Direct bank account payments',
      methods: ['ACH Transfer', 'Wire Transfer', 'Online Banking'],
      processingTime: '1-3 business days',
      fees: 'May apply for wire transfers'
    },
    {
      category: 'Buy Now, Pay Later',
      description: 'Flexible payment plans available',
      methods: ['Klarna', 'Afterpay', 'Affirm', 'Sezzle'],
      processingTime: 'Instant approval',
      fees: 'Interest may apply'
    }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: 'SSL Encryption',
      description: 'All transactions are protected with 256-bit SSL encryption'
    },
    {
      icon: Shield,
      title: 'PCI Compliance',
      description: 'We maintain PCI DSS compliance for secure payment processing'
    },
    {
      icon: CheckCircle,
      title: 'Fraud Protection',
      description: 'Advanced fraud detection and prevention systems'
    },
    {
      icon: CreditCard,
      title: 'Secure Storage',
      description: 'Payment information is securely stored and never shared'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-marketplace-primary to-marketplace-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Payment Methods
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Secure, convenient payment options to make your shopping experience smooth and safe.
          </p>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Accepted Payment Methods</h2>
            <p className="text-xl text-gray-600">Choose from a variety of secure payment options</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {paymentOptions.map((option, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{option.category}</CardTitle>
                  <p className="text-gray-600">{option.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Supported Methods:</h4>
                      <div className="flex flex-wrap gap-2">
                        {option.methods.map((method, methodIndex) => (
                          <Badge key={methodIndex} variant="outline">
                            {method}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span><strong>Processing:</strong> {option.processingTime}</span>
                      <span><strong>Fees:</strong> {option.fees}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Security</h2>
            <p className="text-xl text-gray-600">Your payment information is protected with industry-leading security</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-marketplace-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-marketplace-primary" />
                  </div>
                  <CardTitle className="text-center text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Payment Information</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Currency Support</h3>
              <p className="text-gray-600 mb-2">
                We accept payments in multiple currencies including:
              </p>
              <div className="flex flex-wrap gap-2">
                {['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'].map((currency, index) => (
                  <Badge key={index} variant="outline">{currency}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Payment Processing</h3>
              <p className="text-gray-600">
                All payments are processed securely through our trusted payment partners. We do not store your 
                complete payment information on our servers. Only encrypted payment tokens are retained for 
                future purchases if you choose to save your payment method.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Billing Questions</h3>
              <p className="text-gray-600">
                If you have questions about charges on your account or need assistance with payment issues, 
                please contact our customer support team. We're here to help resolve any payment-related concerns quickly.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Payment Disputes</h3>
              <p className="text-gray-600">
                In case of payment disputes or chargebacks, please contact us first. We're committed to 
                resolving issues fairly and promptly. Our customer service team will work with you to 
                address any concerns before they escalate to formal disputes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaymentMethods;
