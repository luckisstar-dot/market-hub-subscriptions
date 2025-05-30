
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Crown, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaywallProps {
  feature: string;
  requiredPlan: 'Basic' | 'Growth' | 'Pro' | 'Premium';
  currentPlan?: string;
  description?: string;
  children?: React.ReactNode;
}

const Paywall = ({ feature, requiredPlan, currentPlan, description, children }: PaywallProps) => {
  const navigate = useNavigate();

  const planDetails = {
    Basic: { 
      icon: Star, 
      color: 'bg-gray-100 text-gray-800', 
      price: '$0',
      features: ['5 products', 'Basic listing', 'Community access']
    },
    Growth: { 
      icon: Star, 
      color: 'bg-blue-100 text-blue-800', 
      price: '$9.99-19.99',
      features: ['20 products', 'SEO optimization', 'Template replies', 'Performance reports']
    },
    Pro: { 
      icon: Crown, 
      color: 'bg-purple-100 text-purple-800', 
      price: '$21.99-39.99',
      features: ['Unlimited products', 'Full messaging', 'Featured placement', 'Priority support']
    },
    Premium: { 
      icon: Crown, 
      color: 'bg-yellow-100 text-yellow-800', 
      price: '$99.99-149.99',
      features: ['All Pro features', 'Account manager', 'Analytics dashboard', 'Exclusive training']
    }
  };

  const hasAccess = () => {
    if (!currentPlan) return false;
    
    const planHierarchy = ['Basic', 'Growth', 'Pro', 'Premium'];
    const currentIndex = planHierarchy.indexOf(currentPlan);
    const requiredIndex = planHierarchy.indexOf(requiredPlan);
    
    return currentIndex >= requiredIndex;
  };

  if (hasAccess()) {
    return <>{children}</>;
  }

  const PlanIcon = planDetails[requiredPlan].icon;

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50"></div>
      <CardHeader className="relative text-center">
        <div className="mx-auto mb-4 p-3 rounded-full bg-marketplace-primary/10 w-16 h-16 flex items-center justify-center">
          <Lock className="h-8 w-8 text-marketplace-primary" />
        </div>
        <CardTitle className="text-xl mb-2">Premium Feature</CardTitle>
        <Badge className={planDetails[requiredPlan].color}>
          <PlanIcon className="h-3 w-3 mr-1" />
          {requiredPlan} Plan Required
        </Badge>
      </CardHeader>
      
      <CardContent className="relative text-center space-y-4">
        <h3 className="text-lg font-semibold">{feature}</h3>
        <p className="text-gray-600">
          {description || `This feature is available for ${requiredPlan} plan subscribers and above.`}
        </p>
        
        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-semibold mb-2">{requiredPlan} Plan - {planDetails[requiredPlan].price}/month</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {planDetails[requiredPlan].features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <div className="h-1.5 w-1.5 bg-marketplace-primary rounded-full mr-2"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full" 
            onClick={() => navigate('/subscription-plans')}
          >
            <Crown className="h-4 w-4 mr-2" />
            Upgrade to {requiredPlan}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => navigate('/subscription-plans')}
          >
            View All Plans
          </Button>
        </div>

        {currentPlan && (
          <p className="text-xs text-gray-500">
            Current plan: {currentPlan}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default Paywall;
