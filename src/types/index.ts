export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface DetailedFeature {
  title: string;
  icon: string;
  features: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating: number;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
