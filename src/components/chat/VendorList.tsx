
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';
import { Vendor } from './types';

interface VendorListProps {
  vendors: Vendor[];
  selectedVendor: string | null;
  onSelectVendor: (vendorId: string) => void;
}

const VendorList = ({ vendors, selectedVendor, onSelectVendor }: VendorListProps) => {
  return (
    <div className="w-1/3 border-r">
      <div className="p-4 border-b">
        <h4 className="font-medium">Conversations</h4>
      </div>
      <div className="overflow-y-auto h-64">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className={`p-3 cursor-pointer hover:bg-gray-50 border-b ${
              selectedVendor === vendor.id ? 'bg-blue-50' : ''
            }`}
            onClick={() => onSelectVendor(vendor.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">{vendor.name}</span>
              </div>
              <Badge 
                variant={vendor.status === 'online' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {vendor.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorList;
