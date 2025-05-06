export interface PropertyFilter {
    search?:string;
    name?: string;
    location?: string;
    property_status?: string;
    owner_id?: string;
    start_date?: string;
    end_date?: string;
    size?: number;
    page?: number;
  }
  
  export interface UserFilter {
    search?:string;
    first_name?: string;
    last_name?: string;
    email?: string;
    creator_id?: string;
    phone_number?: string;
    role?: string;
    start_date?: string;
    end_date?: string;
    size?: number;
    page?: number;
  }
  