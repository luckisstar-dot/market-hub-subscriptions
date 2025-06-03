
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface ProductSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

const ProductSearch = ({ 
  onSearch, 
  placeholder = "Search products...", 
  initialValue = "" 
}: ProductSearchProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button type="submit" size="sm">
        Search
      </Button>
    </form>
  );
};

export default ProductSearch;
