
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileUp, Store } from 'lucide-react';

const vendorFormSchema = z.object({
  products_description: z.string().min(10, 'Please provide a brief description of your products/services'),
  is_packaged_branded: z.enum(['yes', 'no']),
  is_registered_regulatory: z.enum(['yes', 'no']),
  business_duration: z.enum(['just_starting', '6months_1year', '1_3years', 'over_3years']),
  is_business_registered: z.enum(['yes', 'no']),
  current_selling_channels: z.array(z.string()).min(1, 'Please select at least one option'),
  social_media_link: z.string().optional(),
  has_vendor_experience: z.enum(['yes', 'no']),
  previous_platforms: z.string().optional(),
  has_application_experience: z.enum(['yes', 'no']),
  application_details: z.string().optional(),
  has_international_experience: z.enum(['yes', 'no']),
  ready_for_global: z.enum(['yes', 'no', 'with_guidance']),
  business_goals: z.string().min(20, 'Please describe your business goals'),
  interest_reason: z.string().min(20, 'Please tell us why you\'re interested'),
  support_areas: z.array(z.string()).min(1, 'Please select at least one area'),
  interested_in_training: z.enum(['yes', 'no', 'maybe']),
  instagram_tiktok: z.string().optional(),
  additional_info: z.string().optional(),
});

const VendorRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof vendorFormSchema>>({
    resolver: zodResolver(vendorFormSchema),
    defaultValues: {
      current_selling_channels: [],
      support_areas: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof vendorFormSchema>) => {
    setIsSubmitting(true);
    try {
      // TODO: Submit to Supabase
      console.log('Vendor registration data:', values);
      toast({
        title: "Registration Submitted!",
        description: "Your vendor application has been submitted for review.",
      });
      navigate('/start-selling');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sellingChannels = [
    { id: 'physical_store', label: 'Physical store/shop' },
    { id: 'social_media', label: 'Instagram / Social media' },
    { id: 'whatsapp_dm', label: 'WhatsApp/DM sales' },
    { id: 'personal_website', label: 'Personal website' },
    { id: 'other_platforms', label: 'Other platforms (e.g. Jumia, Etsy)' },
    { id: 'not_online', label: "I don't sell online yet" },
  ];

  const supportAreas = [
    { id: 'branding_packaging', label: 'Branding & Packaging' },
    { id: 'product_photography', label: 'Product Photography' },
    { id: 'logistics', label: 'Logistics (shipping)' },
    { id: 'international_pricing', label: 'Pricing for international markets' },
    { id: 'digital_storefront', label: 'Digital storefront setup' },
    { id: 'listing_seo', label: 'Product listing & SEO' },
    { id: 'funding', label: 'Funding or grants' },
    { id: 'export_regulations', label: 'Export regulations' },
    { id: 'tech_tools', label: 'Tech/e-commerce tools' },
    { id: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Vendor Registration</h1>
          <p className="text-gray-600">Join our marketplace and start selling globally</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Vendor Application Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Products/Services */}
                <FormField
                  control={form.control}
                  name="products_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What product(s) or service(s) do you offer? (Brief description)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe your products or services..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Packaging & Branding */}
                <FormField
                  control={form.control}
                  name="is_packaged_branded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is your product already packaged and branded?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="packaged_yes" />
                            <Label htmlFor="packaged_yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="packaged_no" />
                            <Label htmlFor="packaged_no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Regulatory Registration */}
                <FormField
                  control={form.control}
                  name="is_registered_regulatory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is your product registered with any regulatory body (e.g., NAFDAC, FDA, CFIA)?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="regulatory_yes" />
                            <Label htmlFor="regulatory_yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="regulatory_no" />
                            <Label htmlFor="regulatory_no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Business Duration */}
                <FormField
                  control={form.control}
                  name="business_duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How long have you been in business?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="just_starting" id="just_starting" />
                            <Label htmlFor="just_starting">Just starting out</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="6months_1year" id="6months_1year" />
                            <Label htmlFor="6months_1year">6 months – 1 year</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1_3years" id="1_3years" />
                            <Label htmlFor="1_3years">1–3 years</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="over_3years" id="over_3years" />
                            <Label htmlFor="over_3years">Over 3 years</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Business Registration */}
                <FormField
                  control={form.control}
                  name="is_business_registered"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is your business registered?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="business_yes" />
                            <Label htmlFor="business_yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="business_no" />
                            <Label htmlFor="business_no">No</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Current Selling Channels */}
                <FormField
                  control={form.control}
                  name="current_selling_channels"
                  render={() => (
                    <FormItem>
                      <FormLabel>Where do you currently sell? (Select all that apply)</FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {sellingChannels.map((channel) => (
                          <FormField
                            key={channel.id}
                            control={form.control}
                            name="current_selling_channels"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(channel.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, channel.id])
                                        : field.onChange(field.value?.filter((value) => value !== channel.id))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {channel.label}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Social Media Link */}
                <FormField
                  control={form.control}
                  name="social_media_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link to your social media or online store (if available):</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Vendor Experience */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Your Vendor Journey</h3>
                  
                  <FormField
                    control={form.control}
                    name="has_vendor_experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Have you signed into a vendor platform before?</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="vendor_exp_yes" />
                              <Label htmlFor="vendor_exp_yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="vendor_exp_no" />
                              <Label htmlFor="vendor_exp_no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="previous_platforms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>If yes, which one(s)?</FormLabel>
                        <FormControl>
                          <Input placeholder="List previous platforms..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="has_application_experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Have you submitted a petition or application to sell on a platform before?</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="app_exp_yes" />
                              <Label htmlFor="app_exp_yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="app_exp_no" />
                              <Label htmlFor="app_exp_no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="application_details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>If yes, where or how?</FormLabel>
                        <FormControl>
                          <Input placeholder="Describe your application experience..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="has_international_experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Have you sold or shipped products internationally before?</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="intl_exp_yes" />
                              <Label htmlFor="intl_exp_yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="intl_exp_no" />
                              <Label htmlFor="intl_exp_no">No</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ready_for_global"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Are you ready or willing to sell to global customers?</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="global_yes" />
                              <Label htmlFor="global_yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="global_no" />
                              <Label htmlFor="global_no">No</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="with_guidance" id="global_guidance" />
                              <Label htmlFor="global_guidance">With guidance and support</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Goals and Support */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Why You Do This & Where You Need Support</h3>
                  
                  <FormField
                    control={form.control}
                    name="business_goals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What's your business goal for the next 3–6 months?</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe your business goals..." rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interest_reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Why are you interested in selling through OneShop Centrale?</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us why you're interested..." rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="support_areas"
                    render={() => (
                      <FormItem>
                        <FormLabel>What areas do you currently need help with? (Select all that apply)</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {supportAreas.map((area) => (
                            <FormField
                              key={area.id}
                              control={form.control}
                              name="support_areas"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(area.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, area.id])
                                          : field.onChange(field.value?.filter((value) => value !== area.id))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {area.label}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interested_in_training"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Would you be interested in free or subsidized onboarding/training?</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="training_yes" />
                              <Label htmlFor="training_yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="training_no" />
                              <Label htmlFor="training_no">No</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="maybe" id="training_maybe" />
                              <Label htmlFor="training_maybe">Maybe</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Final Touch */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Final Touch</h3>
                  
                  <div className="space-y-4">
                    <Label>Upload a product image or mini catalogue (optional):</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="instagram_tiktok"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram or TikTok handle (optional):</FormLabel>
                        <FormControl>
                          <Input placeholder="@username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additional_info"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Anything else you'd like us to know?</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Additional information..." rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => navigate('/start-selling')}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default VendorRegistration;
