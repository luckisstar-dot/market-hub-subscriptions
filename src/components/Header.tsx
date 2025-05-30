import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Search, Menu, X, Heart, Package, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import NotificationDropdown from './NotificationDropdown';

interface HeaderProps {
  userRole?: 'admin' | 'vendor' | 'buyer';
}

const Header = ({ userRole }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getDashboardRoute = () => {
    switch (userRole) {
      case 'admin':
        return '/admin-dashboard';
      case 'vendor':
        return '/vendor-dashboard';
      case 'buyer':
        return '/buyer-dashboard';
      default:
        return '/';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-marketplace-primary">OneShop</span>
            <span className="text-2xl font-light text-marketplace-secondary ml-1">Centrale</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/browse-products" className="text-gray-700 hover:text-marketplace-primary transition-colors">
              Browse Products
            </Link>
            <Link to="/vendor-directory" className="text-gray-700 hover:text-marketplace-primary transition-colors">
              Vendors
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-marketplace-primary transition-colors">
              Categories
            </Link>
            <Link to="/start-selling" className="text-gray-700 hover:text-marketplace-primary transition-colors">
              Start Selling
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
            </Button>

            {user ? (
              <>
                {/* Notifications */}
                <NotificationDropdown />

                {/* Wishlist */}
                {(userRole === 'buyer' || !userRole) && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/buyer/view-wishlist">
                      <Heart className="h-5 w-5" />
                    </Link>
                  </Button>
                )}

                {/* Shopping Cart */}
                {(userRole === 'buyer' || !userRole) && (
                  <Button variant="ghost" size="sm" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-marketplace-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                )}

                {/* Orders/Inventory */}
                {userRole === 'vendor' && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/vendor/manage-inventory">
                      <Package className="h-5 w-5" />
                    </Link>
                  </Button>
                )}

                {/* User Menu */}
                <div className="relative group">
                  <Button variant="ghost" size="sm">
                    <User className="h-5 w-5" />
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      to={getDashboardRoute()}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/browse-products"
                className="text-gray-700 hover:text-marketplace-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Products
              </Link>
              <Link
                to="/vendor-directory"
                className="text-gray-700 hover:text-marketplace-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Vendors
              </Link>
              <Link
                to="/categories"
                className="text-gray-700 hover:text-marketplace-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/start-selling"
                className="text-gray-700 hover:text-marketplace-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Start Selling
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
