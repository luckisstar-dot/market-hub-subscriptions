
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Award, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutUs = () => {
  const values = [
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting vendors and buyers across continents to create a truly global marketplace.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a supportive ecosystem where every vendor and buyer can thrive together.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Continuously improving our platform with cutting-edge technology and user feedback.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to providing the highest quality experience for all our marketplace participants.'
    }
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', experience: '15+ years in e-commerce' },
    { name: 'Michael Chen', role: 'CTO', experience: '12+ years in tech leadership' },
    { name: 'Emily Rodriguez', role: 'Head of Vendor Relations', experience: '10+ years in business development' },
    { name: 'David Kim', role: 'Head of Operations', experience: '8+ years in marketplace operations' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-marketplace-primary to-marketplace-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About MarketPlace</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            We're on a mission to create the world's most inclusive and innovative multi-vendor marketplace platform.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Mission</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Empowering Global Commerce
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              MarketPlace was founded with the vision of creating a seamless, secure, and scalable platform 
              that enables vendors of all sizes to reach global markets while providing buyers with access 
              to unique, high-quality products from around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 rounded-full bg-marketplace-primary/10 w-16 h-16 flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-marketplace-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">Meet the people driving our mission forward</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gray-200"></div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-marketplace-primary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-marketplace-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">2,500+</div>
              <p className="text-blue-100">Active Vendors</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <p className="text-blue-100">Products Listed</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <p className="text-blue-100">Countries Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <p className="text-blue-100">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
