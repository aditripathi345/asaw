export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  priceStarting: number;
  govFeeNotice: string;
  turnaroundTime: string;
  popular?: boolean;
  documentsNeeded: string[];
  processSteps: string[];
  packages: {
    name: string;
    price: number;
    description: string;
    features: string[];
  }[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  services: ServiceItem[];
}

export interface OrderStatus {
  orderId: string;
  clientName: string;
  companyName: string;
  serviceName: string;
  filingDate: string;
  targetDate: string;
  currentStage: number; // 1 to 4
  assignedExpert: {
    name: string;
    designation: string;
    phone: string;
    email: string;
  };
  stages: {
    title: string;
    desc: string;
    date?: string;
    status: 'completed' | 'current' | 'pending';
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  city: string;
  rating: number;
  serviceUsed: string;
  comment: string;
  date: string;
}

export interface HeadquartersInfo {
  name: string;
  headquarters: string;
  phone: string;
  email: string;
  timing: string;
}
