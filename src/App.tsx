
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

// Marketplace Pages
import BrowseProducts from "./pages/BrowseProducts";
import VendorDirectory from "./pages/VendorDirectory";
import Categories from "./pages/Categories";
import NewArrivals from "./pages/NewArrivals";
import BestSellers from "./pages/BestSellers";
import SpecialOffers from "./pages/SpecialOffers";

// Vendor Pages
import StartSelling from "./pages/StartSelling";
import SubscriptionPlans from "./components/SubscriptionPlans";

// Dashboard Pages
import VendorDashboard from "./pages/VendorDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Support Pages
import HelpCenter from "./pages/HelpCenter";
import ContactUs from "./pages/ContactUs";

// Company Pages
import AboutUs from "./pages/AboutUs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Marketplace Routes */}
              <Route path="/browse-products" element={<BrowseProducts />} />
              <Route path="/vendor-directory" element={<VendorDirectory />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/best-sellers" element={<BestSellers />} />
              <Route path="/special-offers" element={<SpecialOffers />} />
              
              {/* Vendor Routes */}
              <Route path="/start-selling" element={<StartSelling />} />
              <Route path="/subscription-plans" element={<SubscriptionPlans />} />
              
              {/* Dashboard Routes */}
              <Route path="/vendor-dashboard" element={<VendorDashboard />} />
              <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              
              {/* Support Routes */}
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/contact-us" element={<ContactUs />} />
              
              {/* Company Routes */}
              <Route path="/about-us" element={<AboutUs />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
