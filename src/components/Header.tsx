
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  User, 
  ShoppingCart, 
  Bell, 
  Settings,
  LogIn,
  UserPlus,
  Store,
  Shield
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  userRole?: 'buyer' | 'vendor' | 'admin' | null;
}

const Header = ({ userRole = null }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case 'vendor':
        return <Store className="h-4 w-4" />;
      case 'admin':
        return <Shield className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadge = () => {
    switch (userRole) {
      case 'vendor':
        return <Badge variant="secondary" className="ml-2">Vendor</Badge>;
      case 'admin':
        return <Badge variant="destructive" className="ml-2">Admin</Badge>;
      default:
        return null;
    }
  };

  const getDashboardLink = () => {
    switch (userRole) {
      case 'vendor':
        return '/vendor-dashboard';
      case 'admin':
        return '/admin-dashboard';
      case 'buyer':
        return '/buyer-dashboard';
      default:
        return '/';
    }
  };

  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-marketplace-primary to-marketplace-secondary bg-clip-text text-transparent">
                  MarketPlace
                </h1>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search products, vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full"
              />
            </form>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {userRole ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
                    3
                  </Badge>
                </Button>

                {/* Cart (for buyers) */}
                {userRole === 'buyer' && (
                  <Button variant="ghost" size="sm" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
                      2
                    </Badge>
                  </Button>
                )}

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center">
                      {getRoleIcon()}
                      <span className="ml-2 hidden sm:block">Profile</span>
                      {getRoleBadge()}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link to={getDashboardLink()}>
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    {userRole === 'vendor' && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Store className="mr-2 h-4 w-4" />
                          My Store
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/subscription-plans">
                            <span className="mr-2 h-4 w-4">💎</span>
                            Subscription
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    {userRole === 'admin' && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/admin-dashboard">
                            <Shield className="mr-2 h-4 w-4" />
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
