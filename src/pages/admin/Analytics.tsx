
import React from 'react';
import Header from '@/components/Header';
import AdminAnalytics from '@/components/AdminAnalytics';
import MetaTags from '@/components/SEO/MetaTags';

const Analytics = () => {
  return (
    <>
      <MetaTags
        title="Analytics Dashboard"
        description="Comprehensive analytics and insights for marketplace performance"
      />
      <div className="min-h-screen bg-gray-50">
        <Header userRole="admin" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Comprehensive insights into marketplace performance and user behavior.</p>
          </div>

          <AdminAnalytics />
        </div>
      </div>
    </>
  );
};

export default Analytics;
