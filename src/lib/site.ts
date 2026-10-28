export const WHATSAPP_NUMBER = "254727459772"; // 0727 459 772
export const PHONE_DISPLAY = "0727 459 772";
export const FACEBOOK_URL = "https://www.facebook.com/";
export const INSTAGRAM_URL = "https://www.instagram.com/";

export function whatsappLink(message = "Hello Urbanite Farm Ventures, I'd like to make an enquiry about your farm products.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#products", label: "Products" },
  { href: "#bulk", label: "Bulk Orders" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];
