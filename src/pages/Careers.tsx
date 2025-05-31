
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Briefcase } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Careers = () => {
  const openPositions = [
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'We are looking for a senior frontend developer to join our team and help build the future of e-commerce.',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'E-commerce experience preferred']
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Lead product strategy for our marketplace platform and drive user engagement initiatives.',
      requirements: ['3+ years product management', 'Marketplace experience', 'Data-driven mindset']
    },
    {
      title: 'UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Create intuitive and engaging user experiences for our multi-vendor marketplace.',
      requirements: ['Strong portfolio', 'Figma expertise', 'User research experience']
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help our vendors succeed and grow their businesses on our platform.',
      requirements: ['Customer-facing experience', 'E-commerce knowledge', 'Excellent communication skills']
    }
  ];

  const benefits = [
    'Competitive salary and equity',
    'Health, dental, and vision insurance',
    'Flexible work arrangements',
    'Professional development budget',
    'Unlimited PTO',
    'Modern office spaces'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-marketplace-primary to-marketplace-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Help us build the future of marketplace commerce and create opportunities for vendors worldwide.
          </p>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">Join us in revolutionizing the marketplace experience</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {openPositions.map((position, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <CardTitle className="text-xl">{position.title}</CardTitle>
                      <Badge variant="outline" className="mt-2">{position.department}</Badge>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div className="flex items-center mb-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {position.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {position.type}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{position.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full">Apply Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join Us?</h2>
            <p className="text-xl text-gray-600">We offer competitive benefits and a great work environment</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-marketplace-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-marketplace-primary" />
                </div>
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
