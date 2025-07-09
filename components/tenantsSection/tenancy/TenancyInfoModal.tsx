/* eslint-disable */

type TenancyInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedProperty?: any;
  onChange: (value: any) => void;
  options: any[];
};

const TenancyInfoModal: React.FC<TenancyInfoModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedProperty,
  onChange,
  options,
}) => {
  if (!isOpen) return null;

  return (

      <div className="px-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">View Tenancy Info</h2>
          {/* <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">
            &times;
          </button> */}
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Select a property to view tenancy details
        </p>

        {/* Dropdown */}
        <select
          value={selectedProperty?.property_name || ""}
          onChange={(e) => {
            const selected = options.find(
              (prop: any) => prop.property_name === e.target.value
            );
            if (selected) onChange(selected);
          }}
          className="w-full border border-gray-300 rounded-md p-2 text-gray-700 mb-6 focus:ring-2 focus:ring-[#785DBA] focus:outline-none"
        >
          <option value="" disabled>Select property</option>
          {options?.map((property: any) => (
            <option key={property.property_name} value={property.property_name}>
              {property.property_name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-[#785DBA] text-white hover:bg-[#674bb8] transition"
          >
            Confirm
          </button>
        </div>
      </div>
  );
};


export default TenancyInfoModal