
import React from 'react';
import Header from '@/components/Header';
import TestRunner from '@/components/TestRunner';
import MetaTags from '@/components/SEO/MetaTags';

const TestCenter = () => {
  return (
    <>
      <MetaTags
        title="Test Center"
        description="Automated testing and quality assurance dashboard"
      />
      <div className="min-h-screen bg-gray-50">
        <Header userRole="admin" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Center</h1>
            <p className="text-gray-600">Run automated tests to ensure system quality and reliability.</p>
          </div>

          <TestRunner />
        </div>
      </div>
    </>
  );
};

export default TestCenter;
