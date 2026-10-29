export const WHATSAPP_NUMBER = "254727459772"; // 0727 459 772
export const PHONE_DISPLAY = "0727 459 772";
export const FACEBOOK_URL = "https://www.facebook.com/";
export const INSTAGRAM_URL = "https://www.instagram.com/";

export function whatsappLink(message = "Hello Urbanite Farm Ventures, I'd like to make an enquiry about your farm products.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/bulk-orders", label: "Bulk Orders" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact & FAQs" },
] as const;

export const LOCATION = "Solai, Nakuru County, Kenya";
