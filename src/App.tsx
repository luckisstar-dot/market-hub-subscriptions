
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/AuthContext";
import { UserRoleProvider } from "@/contexts/UserRoleContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import AdminAuth from "./pages/AdminAuth";
import ProductDetail from "./pages/ProductDetail";
import Demo from "./pages/Demo";
import SystemStatus from "./pages/SystemStatus";
import Checkout from "./pages/Checkout";

// Marketplace Pages
import BrowseProducts from "./pages/BrowseProducts";
import VendorDirectory from "./pages/VendorDirectory";
import Categories from "./pages/Categories";
import NewArrivals from "./pages/NewArrivals";
import BestSellers from "./pages/BestSellers";
import SpecialOffers from "./pages/SpecialOffers";

// Vendor Pages
import StartSelling from "./pages/StartSelling";
import VendorRegistration from "./pages/VendorRegistration";
import VendorOnboarding from "./pages/VendorOnboarding";
import VendorSubscriptionPlans from "./pages/VendorSubscriptionPlans";
import BuyerSubscriptionPlans from "./pages/BuyerSubscriptionPlans";

// Dashboard Pages
import VendorDashboard from "./pages/VendorDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Admin Dashboard Pages
import ApproveVendors from "./pages/admin/ApproveVendors";
import Analytics from "./pages/admin/Analytics";
import SystemSettings from "./pages/admin/SystemSettings";
import UserManagement from "./pages/admin/UserManagement";
import ProductReports from "./pages/admin/ProductReports";
import TestCenter from "./pages/admin/TestCenter";
import ContentManagement from "./pages/admin/ContentManagement";

// Vendor Dashboard Pages
import AddProduct from "./pages/vendor/AddProduct";
import VendorAnalytics from "./pages/vendor/VendorAnalytics";
import ManageInventory from "./pages/vendor/ManageInventory";
import Messages from "./pages/vendor/Messages";
import VendorStore from "./pages/vendor/VendorStore";

// Buyer Dashboard Pages
import BuyerBrowseProducts from "./pages/buyer/BrowseProducts";
import ViewWishlist from "./pages/buyer/ViewWishlist";
import TrackOrders from "./pages/buyer/TrackOrders";
import WriteReviews from "./pages/buyer/WriteReviews";

// Support Pages
import HelpCenter from "./pages/HelpCenter";
import ContactUs from "./pages/ContactUs";

// Company Pages
import AboutUs from "./pages/AboutUs";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import Blog from "./pages/Blog";

// Additional Pages
import ShippingInfo from "./pages/ShippingInfo";
import Returns from "./pages/Returns";
import PaymentMethods from "./pages/PaymentMethods";
import Security from "./pages/Security";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <UserRoleProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/demo" element={<Demo />} />
                  <Route path="/system-status" element={<SystemStatus />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/profile" element={<UserProfile />} />
                  
                  {/* Marketplace Routes */}
                  <Route path="/browse-products" element={<BrowseProducts />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/vendor-directory" element={<VendorDirectory />} />
                  <Route path="/vendor-store/:vendorId" element={<VendorStore />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/new-arrivals" element={<NewArrivals />} />
                  <Route path="/best-sellers" element={<BestSellers />} />
                  <Route path="/special-offers" element={<SpecialOffers />} />
                  
                  {/* Vendor Routes */}
                  <Route path="/start-selling" element={<StartSelling />} />
                  <Route path="/vendor-registration" element={<VendorRegistration />} />
                  <Route path="/vendor-onboarding" element={<VendorOnboarding />} />
                  <Route path="/vendor-subscription-plans" element={<VendorSubscriptionPlans />} />
                  <Route path="/buyer-subscription-plans" element={<BuyerSubscriptionPlans />} />
                  
                  {/* Dashboard Routes */}
                  <Route path="/vendor-dashboard" element={<VendorDashboard />} />
                  <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  
                  {/* Admin Dashboard Sub-routes */}
                  <Route path="/admin/approve-vendors" element={<ApproveVendors />} />
                  <Route path="/admin/analytics" element={<Analytics />} />
                  <Route path="/admin/system-settings" element={<SystemSettings />} />
                  <Route path="/admin/user-management" element={<UserManagement />} />
                  <Route path="/admin/product-reports" element={<ProductReports />} />
                  <Route path="/admin/test-center" element={<TestCenter />} />
                  <Route path="/admin/content-management" element={<ContentManagement />} />
                  
                  {/* Vendor Dashboard Sub-routes */}
                  <Route path="/vendor/add-product" element={<AddProduct />} />
                  <Route path="/vendor/analytics" element={<VendorAnalytics />} />
                  <Route path="/vendor/manage-inventory" element={<ManageInventory />} />
                  <Route path="/vendor/messages" element={<Messages />} />
                  
                  {/* Buyer Dashboard Sub-routes */}
                  <Route path="/buyer/browse-products" element={<BuyerBrowseProducts />} />
                  <Route path="/buyer/view-wishlist" element={<ViewWishlist />} />
                  <Route path="/buyer/track-orders" element={<TrackOrders />} />
                  <Route path="/buyer/write-reviews" element={<WriteReviews />} />
                  
                  {/* Support Routes */}
                  <Route path="/help-center" element={<HelpCenter />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  
                  {/* Company Routes */}
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/press" element={<Press />} />
                  <Route path="/blog" element={<Blog />} />
                  
                  {/* Additional Routes */}
                  <Route path="/shipping-info" element={<ShippingInfo />} />
                  <Route path="/returns" element={<Returns />} />
                  <Route path="/payment-methods" element={<PaymentMethods />} />
                  <Route path="/security" element={<Security />} />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </UserRoleProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
