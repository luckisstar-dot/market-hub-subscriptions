
export const generateProductSchema = (product: any) => ({
  "@context": "https://schema.org/",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: product.images?.[0],
  sku: product.id,
  offers: {
    "@type": "Offer",
    price: product.price,
    priceCurrency: "USD",
    availability: product.stock_quantity > 0 
      ? "https://schema.org/InStock" 
      : "https://schema.org/OutOfStock",
  },
  brand: {
    "@type": "Brand",
    name: product.vendors?.business_name || "MarketPlace",
  },
  category: product.categories?.name,
});

export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MarketPlace",
  url: window.location.origin,
  logo: `${window.location.origin}/placeholder.svg`,
  sameAs: [
    // Add social media URLs here
  ],
});
