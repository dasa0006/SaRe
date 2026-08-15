/** One standard service section — the uniform treatment below the WebDevelopmentLead hero. */
export interface StandardService {
  /** Stable id used to pick the service's icon, e.g. "modernising". */
  id: string;
  /** Small label above the heading. */
  eyebrow: string;
  /** Main headline. */
  heading: string;
  /** Problem-first supporting paragraph. */
  problem: string;
  /** Feature bullets. */
  features: string[];
  /** Starting-price indicator, e.g. "12,000 DKK". */
  price: string;
}

/** The four standard service sections on the Services page. */
export interface StandardServicesProps {
  /** Additional CSS class names. */
  className?: string;
  /** The standard services, in display order: modernising, responsiveness, language, excel. */
  items: StandardService[];
  /** Small label above each price, e.g. "Starting from". */
  priceNote: string;
}
