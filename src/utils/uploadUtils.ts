
import { supabase } from '@/integrations/supabase/client';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export const uploadProductImage = async (file: File, productId?: string): Promise<UploadResult> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = productId ? `${productId}/${fileName}` : `temp/${fileName}`;

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (error) {
      console.error('Upload error:', error);
      return { success: false, error: error.message };
    }

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(data.path);

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, error: 'Failed to upload image' };
  }
};

export const deleteProductImage = async (imagePath: string): Promise<boolean> => {
  try {
    const { error } = await supabase.storage
      .from('product-images')
      .remove([imagePath]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
};
