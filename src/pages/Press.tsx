
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Download, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Press = () => {
  const pressReleases = [
    {
      title: 'OneShop Centrale Raises $50M Series B to Expand Global Marketplace',
      date: 'March 15, 2024',
      excerpt: 'Funding will accelerate international expansion and enhance vendor support services.',
      category: 'Funding'
    },
    {
      title: 'Platform Reaches 10,000 Active Vendors Milestone',
      date: 'February 28, 2024',
      excerpt: 'OneShop Centrale celebrates significant growth in vendor adoption and marketplace diversity.',
      category: 'Milestone'
    },
    {
      title: 'New AI-Powered Product Discovery Features Launched',
      date: 'January 20, 2024',
      excerpt: 'Enhanced search and recommendation algorithms improve buyer experience and vendor sales.',
      category: 'Product'
    },
    {
      title: 'Partnership with Global Logistics Leader Announced',
      date: 'December 10, 2023',
      excerpt: 'Strategic partnership enables faster shipping and expanded delivery options for marketplace users.',
      category: 'Partnership'
    }
  ];

  const mediaKit = [
    { name: 'Company Logo Pack', type: 'ZIP', size: '2.3 MB' },
    { name: 'Brand Guidelines', type: 'PDF', size: '1.8 MB' },
    { name: 'Executive Photos', type: 'ZIP', size: '5.1 MB' },
    { name: 'Product Screenshots', type: 'ZIP', size: '12.4 MB' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-marketplace-primary to-marketplace-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Press & Media
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Latest news, press releases, and media resources from OneShop Centrale.
          </p>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Press Releases</h2>
            <p className="text-xl text-gray-600">Stay updated with our latest announcements and milestones</p>
          </div>

          <div className="space-y-8">
            {pressReleases.map((release, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{release.category}</Badge>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {release.date}
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2">{release.title}</CardTitle>
                      <p className="text-gray-600">{release.excerpt}</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-4">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read More
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Media Kit</h2>
            <p className="text-xl text-gray-600">Download our media resources for press coverage</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaKit.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-marketplace-primary/10 flex items-center justify-center">
                    <Download className="h-6 w-6 text-marketplace-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.type} • {item.size}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Media Inquiries</h2>
          <p className="text-xl text-gray-600 mb-8">
            For press inquiries, interviews, or additional information, please contact our media team.
          </p>
          <div className="space-y-2">
            <p className="text-lg">
              <strong>Email:</strong> press@oneshopcentrale.com
            </p>
            <p className="text-lg">
              <strong>Phone:</strong> +1 (555) 123-PRESS
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Press;
