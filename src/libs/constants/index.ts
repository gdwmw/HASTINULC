import testimonialsImage1 from "@/public/assets/images/model/Testimonials-2.jpg";
import testimonialsImage2 from "@/public/assets/images/model/Testimonials-3.jpg";
import testimonialsImage3 from "@/public/assets/images/model/Testimonials-4.jpg";
import testimonialsImage4 from "@/public/assets/images/model/Testimonials-5.jpg";
import testimonialsImage5 from "@/public/assets/images/model/Testimonials-6.jpg";

export const NAVIGATION_DATA = [
  { href: "#home", id: 1, label: "Home" },
  { href: "#about", id: 2, label: "About" },
  { href: "#portfolio", id: 3, label: "Portfolio" },
  { href: "#packages", id: 4, label: "Packages" },
  { href: "#contact", id: 5, label: "Contact" },
];

export const TIME_SLOTS_DATA = [
  { id: 1, time: "06:00 - 09:00" },
  { id: 2, time: "10:00 - 13:00" },
  { id: 3, time: "14:00 - 17:00" },
  { id: 4, time: "18:00 - 21:00" },
  { id: 5, time: "22:00 - 01:00" },
  { id: 6, time: "02:00 - 05:00" },
];

export const PACKAGES_DATA = [
  {
    description: [
      { id: 1, text: "Three-time Makeup" },
      { id: 2, text: "Henna" },
      { id: 3, text: "Fake Nails" },
      { id: 4, text: "Softlens" },
      { id: 5, text: "Retouch Session" },
      { id: 6, text: "Transportation" },
    ],
    id: 1,
    price: "3500000",
    title: "WEDDING A",
  },
  {
    description: [
      { id: 1, text: "Two-time Makeup" },
      { id: 2, text: "Henna" },
      { id: 3, text: "Fake Nails" },
      { id: 4, text: "Softlens" },
      { id: 5, text: "Retouch Session" },
      { id: 6, text: "Transportation" },
    ],
    id: 2,
    price: "2500000",
    title: "WEDDING B",
  },
  {
    description: [
      { id: 1, text: "One-time Makeup" },
      { id: 2, text: "Henna" },
      { id: 3, text: "Fake Nails" },
      { id: 4, text: "Softlens" },
      { id: 5, text: "Retouch Session" },
      { id: 6, text: "Transportation" },
    ],
    id: 3,
    price: "1500000",
    title: "WEDDING C",
  },
  {
    description: [
      { id: 1, text: "Softlens" },
      { id: 2, text: "Hijab Installation" },
      { id: 3, text: "Transportation" },
    ],
    id: 4,
    price: "450000",
    title: "PREWEDDING",
  },
  {
    description: [
      { id: 1, text: "Softlens" },
      { id: 2, text: "Hijab Installation" },
      { id: 3, text: "Transportation" },
    ],
    id: 5,
    price: "350000",
    title: "ENGAGEMENT",
  },
  {
    description: [
      { id: 1, text: "Softlens" },
      { id: 2, text: "Hijab Installation" },
      { id: 3, text: "Transportation" },
    ],
    id: 6,
    price: "300000",
    title: "GRADUATION",
  },
  {
    description: [
      { id: 1, text: "Hijab Installation" },
      { id: 2, text: "Transportation" },
    ],
    id: 7,
    price: "200000",
    title: "REGULAR",
  },
];

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    image: testimonialsImage1,
    name: "Sarah Anderson",
    rating: 5,
    role: "BRIDE",
    text: "Amazing makeup service! The results were very natural and long-lasting. Highly professional and punctual.",
  },
  {
    id: 2,
    image: testimonialsImage2,
    name: "Linda Martinez",
    rating: 5,
    role: "MODEL",
    text: "Such a pleasant experience! The makeup turned out exactly as I wanted. Highly recommended!",
  },
  {
    id: 3,
    image: testimonialsImage3,
    name: "Emily Carter",
    rating: 5,
    role: "ACTRESS",
    text: "The makeup was done with great attention to detail and provided a flawless look for every scene. Very satisfying!",
  },
  {
    id: 4,
    image: testimonialsImage4,
    name: "Jessica Lee",
    rating: 5,
    role: "BRIDESMAID",
    text: "Beautiful makeup that perfectly matched the wedding theme. I felt so confident all day long.",
  },
  {
    id: 5,
    image: testimonialsImage5,
    name: "Sophia Wilson",
    rating: 5,
    role: "PHOTOGRAPHER",
    text: "As a photographer, I was amazed by how flawless the makeup looked on camera. Highly recommend this service!",
  },
];

export const SUGGESTIONS_DATA = [
  "Professional Service",
  "Excellent Makeup Skills",
  "Highly Recommended",
  "Friendly and Attentive",
  "On Time and Punctual",
  "Affordable Pricing",
  "Clean & Hygienic Tools",
  "Creative and Trendy Styles",
  "Perfect Color Matching",
  "Long-lasting Makeup",
  "Comfortable Application",
  "Attention to Detail",
  "Customized Look",
  "Patient and Understanding",
  "Skilled Makeup Artist",
];
