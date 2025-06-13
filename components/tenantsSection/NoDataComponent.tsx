
/* eslint-disable */
import React from 'react';
import { FileText, Folder, Image, Users, Calendar, Mail, Database } from 'lucide-react';

 const NoDataAvailable = ({ 
  title = "No Documents Available Yet.",
  subtitle = "Once Your Lease And ID Have Been Added",
  description = "By Your Landlord Or Property Manager,",
  footer = "They'll Show Up Here.",
  icon = "document",
//   iconSize = 64,
  className = ""
}) => {
  const iconComponents = {
    document: FileText,
    folder: Folder,
    image: Image,
    users: Users,
    calendar: Calendar,
    mail: Mail,
    database: Database
  } as any

//   const IconComponent = iconComponents[icon] || FileText;

  return (
    <div className={`flex flex-col items-center justify-center min-h-[400px] px-8 py-12 text-center ${className}`}>
      {/* <div className="mb-8">
        <IconComponent 
          size={iconSize} 
          className="text-gray-300 mx-auto" 
          strokeWidth={1}
        />
      </div> */}
      
      <div className="max-w-md mx-auto space-y-2">
        <h2 className="text-2xl font-medium text-gray-800 mb-4">
          {title}
        </h2>
        
        <div className="text-gray-600 space-y-1">
          <p className="text-lg leading-relaxed">{subtitle}</p>
          <p className="text-lg leading-relaxed">{description}</p>
          <p className="text-lg leading-relaxed">{footer}</p>
        </div>
      </div>
    </div>
  );
};
export default  NoDataAvailable