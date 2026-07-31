import type {
  TrustSignalsProps,
  TrustSignalClient,
} from "./TrustSignals.types";

const mockClients: TrustSignalClient[] = [
  { name: "Nordlys", descriptor: "Lighting studio, Aarhus" },
  { name: "Brolin & Co", descriptor: "Chartered accountants" },
  { name: "Fjord & Flod", descriptor: "Outdoor gear retailer" },
  { name: "Kvisten", descriptor: "Independent bakery" },
  { name: "Møller Design", descriptor: "Product design agency" },
  { name: "Østergaard", descriptor: "Renewables consultancy" },
];

export const mockTrustSignalsProps: TrustSignalsProps = {
  heading: "Trusted by",
  clients: mockClients,
  surface: "white",
};

/** Text-only mode is the default — no logo required. */
export const mockTrustSignalsTextOnly: TrustSignalsProps =
  mockTrustSignalsProps;

/** Build a simple inline SVG logo placeholder, matching Hero's mock pattern. */
function logoPlaceholder(name: string) {
  return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 32'%3E%3Crect fill='%23e2e8f0' width='96' height='32' rx='4'/%3E%3Ctext x='48' y='21' font-family='sans-serif' font-size='12' font-weight='600' fill='%23475569' text-anchor='middle'%3E${name}%3C/text%3E%3C/svg%3E`;
}

/** Mixed mode — a few clients provide logos, the rest fall back to wordmarks. */
export const mockTrustSignalsWithLogos: TrustSignalsProps = {
  ...mockTrustSignalsProps,
  clients: mockClients.map((client, index) =>
    index < 3 ? { ...client, logoUrl: logoPlaceholder(client.name) } : client
  ),
};

/** Same block rendered across every Section surface. */
export const mockTrustSignalsSurfaces: TrustSignalsProps[] = [
  { ...mockTrustSignalsProps, surface: "white" },
  { ...mockTrustSignalsProps, surface: "subtle" },
  { ...mockTrustSignalsProps, surface: "dark" },
  { ...mockTrustSignalsProps, surface: "accent" },
];
