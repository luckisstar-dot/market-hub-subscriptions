
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, Server, UserCheck, AlertTriangle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Security = () => {
  const securityMeasures = [
    {
      icon: Lock,
      title: 'Data Encryption',
      description: 'All data is encrypted in transit and at rest using industry-standard AES-256 encryption',
      status: 'Active'
    },
    {
      icon: Shield,
      title: 'Two-Factor Authentication',
      description: 'Optional 2FA for enhanced account security using SMS or authenticator apps',
      status: 'Available'
    },
    {
      icon: Server,
      title: 'Secure Infrastructure',
      description: 'Hosted on secure cloud infrastructure with 99.9% uptime and DDoS protection',
      status: 'Active'
    },
    {
      icon: UserCheck,
      title: 'Identity Verification',
      description: 'Vendor verification process to ensure legitimate businesses on our platform',
      status: 'Required'
    },
    {
      icon: Eye,
      title: 'Fraud Monitoring',
      description: '24/7 monitoring for suspicious activities and automated fraud prevention',
      status: 'Active'
    },
    {
      icon: AlertTriangle,
      title: 'Security Audits',
      description: 'Regular security audits and penetration testing by third-party security firms',
      status: 'Ongoing'
    }
  ];

  const privacyPrinciples = [
    {
      title: 'Data Minimization',
      description: 'We only collect data that is necessary for providing our services'
    },
    {
      title: 'Transparency',
      description: 'Clear information about what data we collect and how we use it'
    },
    {
      title: 'User Control',
      description: 'You have control over your personal data and can request deletion'
    },
    {
      title: 'Secure Storage',
      description: 'All personal data is stored securely with access controls and encryption'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-marketplace-primary to-marketplace-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Security & Privacy
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Your security and privacy are our top priorities. Learn about our comprehensive security measures.
          </p>
        </div>
      </section>

      {/* Security Measures */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Measures</h2>
            <p className="text-xl text-gray-600">Comprehensive protection for your data and transactions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityMeasures.map((measure, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-marketplace-primary/10 flex items-center justify-center">
                      <measure.icon className="h-6 w-6 text-marketplace-primary" />
                    </div>
                    <Badge variant={measure.status === 'Active' ? 'default' : 'outline'}>
                      {measure.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{measure.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{measure.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Privacy Principles</h2>
            <p className="text-xl text-gray-600">Our commitment to protecting your personal information</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {privacyPrinciples.map((principle, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{principle.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compliance & Certifications</h2>
            <p className="text-xl text-gray-600">We adhere to international security and privacy standards</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="text-center p-8">
                <Shield className="h-12 w-12 mx-auto mb-4 text-marketplace-primary" />
                <h3 className="text-xl font-semibold mb-2">GDPR Compliant</h3>
                <p className="text-gray-600">
                  Full compliance with the General Data Protection Regulation for EU users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="text-center p-8">
                <Lock className="h-12 w-12 mx-auto mb-4 text-marketplace-primary" />
                <h3 className="text-xl font-semibold mb-2">PCI DSS Certified</h3>
                <p className="text-gray-600">
                  Payment Card Industry Data Security Standard certification for secure payments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="text-center p-8">
                <Server className="h-12 w-12 mx-auto mb-4 text-marketplace-primary" />
                <h3 className="text-xl font-semibold mb-2">SOC 2 Type II</h3>
                <p className="text-gray-600">
                  Independently verified security controls and operational effectiveness
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Security Best Practices for Users</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Account Security</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Use strong, unique passwords for your account</li>
                <li>• Enable two-factor authentication when available</li>
                <li>• Regularly review your account activity and settings</li>
                <li>• Log out of shared or public computers</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Safe Shopping</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Verify vendor ratings and reviews before purchasing</li>
                <li>• Use secure payment methods (avoid wire transfers to unknown vendors)</li>
                <li>• Be cautious of deals that seem too good to be true</li>
                <li>• Keep records of your transactions</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Reporting Issues</h3>
              <p className="text-gray-600">
                If you notice any suspicious activity, encounter security issues, or have concerns about 
                your account, please contact our security team immediately at security@oneshopcentrale.com.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Security;
