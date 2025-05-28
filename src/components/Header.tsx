import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, User, ShoppingCart, Bell, Settings, LogIn, UserPlus, Store, Shield, Menu, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { useAuth } from '@/contexts/AuthContext';
import SearchResults from './SearchResults';
interface HeaderProps {
  userRole?: 'buyer' | 'vendor' | 'admin' | null;
}
const Header = ({
  userRole = null
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse-products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
    }
  };
  const handleSignOut = async () => {
    await signOut();
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
  return <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <Store className="h-8 w-8 text-marketplace-primary mr-3" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-marketplace-primary to-marketplace-secondary bg-clip-text text-transparent">
                  MarketPlace
                </h1>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="gap-5">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Marketplace</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px]">
                      <NavigationMenuLink asChild>
                        <Link to="/browse-products" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Browse Products</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Discover amazing products from vendors worldwide
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/categories" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Categories</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Shop by product categories
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/vendor-directory" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Vendor Directory</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Find trusted vendors and sellers
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/new-arrivals" className="text-sm font-medium transition-colors hover:text-primary">
                    New Arrivals
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/best-sellers" className="text-sm font-medium transition-colors hover:text-primary">
                    Best Sellers
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/special-offers" className="text-sm font-medium transition-colors hover:text-primary">
                    Special Offers
                  </Link>
                </NavigationMenuItem>

                {!user && <NavigationMenuItem>
                    <Link to="/start-selling" className="text-sm font-medium transition-colors hover:text-primary">
                      Start Selling
                    </Link>
                  </NavigationMenuItem>}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input type="text" placeholder="Search products, vendors..." value={searchQuery} onChange={e => {
              setSearchQuery(e.target.value);
              setShowSearchResults(e.target.value.length > 0);
            }} onFocus={() => setShowSearchResults(searchQuery.length > 0)} className="pl-10 pr-4 w-full" />
              {showSearchResults && <SearchResults searchQuery={searchQuery} onClose={() => setShowSearchResults(false)} />}
            </form>
          </div>

          {/* Right Side Navigation */}
          <div className="flex items-center space-x-4">
            {user ? <>
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
                    3
                  </Badge>
                </Button>

                {/* Cart (for buyers) */}
                {userRole === 'buyer' && <Button variant="ghost" size="sm" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
                      2
                    </Badge>
                  </Button>}

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
                    {userRole === 'vendor' && <>
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
                      </>}
                    {userRole === 'admin' && <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/admin-dashboard">
                            <Shield className="mr-2 h-4 w-4" />
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                      </>}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </> : <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin-auth">
                    <Shield className="h-4 w-4 mr-2" />
                    Admin
                  </Link>
                </Button>
              </>}

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/browse-products" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Browse Products
              </Link>
              <Link to="/categories" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Categories
              </Link>
              <Link to="/vendor-directory" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Vendor Directory
              </Link>
              <Link to="/new-arrivals" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                New Arrivals
              </Link>
              <Link to="/best-sellers" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Best Sellers
              </Link>
              <Link to="/special-offers" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Special Offers
              </Link>
              {!user && <Link to="/start-selling" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  Start Selling
                </Link>}
            </div>
          </div>}
      </div>
    </header>;
};
export default Header;