/*eslint-disable */
import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronDown, } from 'lucide-react';
import BackButton from '@/components/Backbutton';
import { useFetchTenantDetails } from '@/services/users/query';
import { useAssignTenantToProperty } from '@/services/property/mutation';
import { useParams, useRouter } from 'next/navigation';

// Reusable Input Component
const FormInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  className = '' 
}:any) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        required={required}
      />
    </div>
  );
};

// Reusable Select Component
const FormSelect = ({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder = 'Select...', 
  required = false 
}:any) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
          required={required}
        >
          <option value="">{placeholder}</option>
          {options.map((option:any, index:string) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

// Reusable Date Input Component
const FormDateInput = ({ 
  label, 
  value, 
  onChange, 
  required = false 
}:any) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required={required}
        />
        {/* <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" /> */}
      </div>
    </div>
  );
};

export default function AttachTenantForm() {
  const [formData, setFormData] = useState({
    tenant_id: '',
    // tenancyType: 'Monthly',
    rental_price: "",
    service_charge: "",
    security_deposit: "",
    lease_start_date: '',
    lease_end_date: '',
    rent_status: 'Paid',
    // permittedUse: ''
  });

    const { data: users, isLoading } = useFetchTenantDetails({});
    const {id} = useParams() as {id:string}

    const router = useRouter()

   const tenantOptions = useMemo(() => {
  if (!users) return [];
  return users.map((user: any) => ({
    value: user.id,
    label: user.tenantName,
  }));
}, [users]);


  const rentStatusOptions = [
    { value: 'active', label: 'Paid' },
    { value: 'inactive', label: 'Pending' },
    // { value: 'Overdue', label: 'Overdue' }
  ];

  const handleInputChange = (field:any, value:string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const assignTenant = useAssignTenantToProperty(id)

const handleSubmit = async (e: any) => {
  e.preventDefault();

  const finalData = {
    ...formData,
    rental_price: Number(formData.rental_price),
    security_deposit: Number(formData.security_deposit),
    service_charge: Number(formData.service_charge),
  };

  try {
    console.log('Form submitted:', finalData);
    await assignTenant.mutateAsync(finalData); // wait for success
    router.push(`/dashboard/view-property/${id}`);
  } catch (error) {
    console.error('Assignment failed:', error);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8 text-[#000] text-[12px]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
      
          <div>
           <BackButton title={" Attach Tenant to Property"} />
            <p className="text-sm text-gray-600 mt-1">
              Assign an existing tenant to a property and fill in their tenancy details.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            {/* Tenant Selection */}
            <div className="grid grid-cols-1 gap-6 md:w-[40%] mb-24">
              <FormSelect
                label="Tenant"
                value={formData.tenant_id}
                onChange={(e:any) => handleInputChange('tenant_id', e.target.value)}
                options={tenantOptions}
                placeholder="Select Tenant"
                required
              />
            </div>

            {/* Tenancy Details - Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-[60%]">
              {/* <FormSelect
                label="Tenancy Type"
                value={formData.tenancyType}
                onChange={(e:any) => handleInputChange('tenancyType', e.target.value)}
                options={tenancyTypeOptions}
                required
              /> */}
              <FormInput
                label="Rental Price"
                type="text"
                value={formData.rental_price}
                onChange={(e:any) => handleInputChange('rental_price', e.target.value)}
                placeholder="500,000"
                required
              />

               <FormSelect
                label="Rent Status"
                value={formData.rent_status}
                onChange={(e:any) => handleInputChange('rent_status', e.target.value)}
                options={rentStatusOptions}
                required
              />
            </div>

            {/* Tenancy Details - Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-[60%]">
              <FormInput
                label="Service Charge"
                type="text"
                value={formData.service_charge}
                onChange={(e:any) => handleInputChange('service_charge', e.target.value)}
                placeholder="500,000"
              />
              <FormInput
                label="Security Deposit"
                type="text"
                value={formData.security_deposit}
                onChange={(e:any) => handleInputChange('security_deposit', e.target.value)}
                placeholder="500,000"
              />
            </div>

            {/* Date Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-[60%]">
              <FormDateInput
                label="Lease start date"
                value={formData.lease_start_date}
                onChange={(e:any) => handleInputChange('lease_start_date', e.target.value)}
                required
              />
              <FormDateInput
                label="Lease end date"
                value={formData.lease_end_date}
                onChange={(e:any) => handleInputChange('lease_end_date', e.target.value)}
                required
              />
            </div>

            {/* Status and Permitted Use */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-[60%]">
              {/* <FormSelect
                label="Rent Status"
                value={formData.rentStatus}
                onChange={(e:any) => handleInputChange('rentStatus', e.target.value)}
                options={rentStatusOptions}
                required
              /> */}
              {/* <FormInput
                label="Permitted Use"
                type="text"
                value={formData.permittedUse}
                onChange={(e:any) => handleInputChange('permittedUse', e.target.value)}
                placeholder="Enter permitted use"
              /> */}
            </div>

            {/* Submit Button */}
            <div className="flex justify-start pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#785DBA] hover:bg-[#ccc] text-white font-medium py-2 px-6 rounded-lg transition-colors "
              >
                Attach Tenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}