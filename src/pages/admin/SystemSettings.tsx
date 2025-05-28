
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Settings, Save } from 'lucide-react';
import Header from '@/components/Header';

const SystemSettings = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="admin" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
          <p className="text-gray-600">Configure platform settings and preferences.</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Platform Name</label>
                <Input defaultValue="MarketPlace" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Support Email</label>
                <Input defaultValue="support@marketplace.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Commission Rate (%)</label>
                <Input defaultValue="5" type="number" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Toggles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Enable New Vendor Registration</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span>Require Email Verification</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span>Enable Product Reviews</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span>Maintenance Mode</span>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Minimum Order Amount</label>
                <Input defaultValue="10.00" type="number" step="0.01" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Maximum Order Amount</label>
                <Input defaultValue="10000.00" type="number" step="0.01" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
