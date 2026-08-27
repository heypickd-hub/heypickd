import biryani from "@/assets/food-biryani.jpg";
import burger from "@/assets/food-burger.jpg";
import wrap from "@/assets/food-wrap.jpg";
import shawarma from "@/assets/food-shawarma.jpg";
import friedChicken from "@/assets/food-fried-chicken.jpg";
import fries from "@/assets/food-fries.jpg";
import dosa from "@/assets/food-dosa.jpg";
import parotta from "@/assets/food-parotta.jpg";
import paneer from "@/assets/food-paneer.jpg";
import paneerTikka from "@/assets/food-paneer-tikka.jpg";
import shake from "@/assets/food-shake.jpg";
import dessert from "@/assets/food-dessert.jpg";
import pizza from "@/assets/food-pizza.jpg";
import friedRice from "@/assets/food-friedrice.jpg";
import drinks from "@/assets/food-drinks.jpg";
import grill from "@/assets/food-grill.jpg";

export type FoodType = "veg" | "non-veg";

export type Category =
  | "Biryani & Rice"
  | "Burgers & Wraps"
  | "Crispy & Grill"
  | "Shawarma & Grill"
  | "Dinner Picks"
  | "Veg Picks"
  | "South Indian Dinner"
  | "Drinks & Shakes"
  | "Sweet Cravings"
  | "Combos";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  foodType: FoodType;
  /** INTERNAL — never shown to customers. */
  source: string;
  featured: boolean;
  available: boolean;
  image: string;
  badge?: string;
  keywords: string[];
}

export const categories: { id: Category | "most-pickd"; label: string; emoji: string }[] = [
  { id: "most-pickd", label: "most pickd", emoji: "🔥" },
  { id: "Biryani & Rice", label: "biryani", emoji: "🍚" },
  { id: "Burgers & Wraps", label: "burgers & wraps", emoji: "🍔" },
  { id: "Crispy & Grill", label: "crispy & grill", emoji: "🍗" },
  { id: "Shawarma & Grill", label: "shawarma", emoji: "🌯" },
  { id: "Dinner Picks", label: "dinner picks", emoji: "🍽️" },
  { id: "Combos", label: "combos", emoji: "🍱" },
  { id: "Veg Picks", label: "veg picks", emoji: "🌱" },
  { id: "South Indian Dinner", label: "south indian", emoji: "🥞" },
  { id: "Drinks & Shakes", label: "drinks", emoji: "🥤" },
  { id: "Sweet Cravings", label: "sweet", emoji: "🍰" },
];

export const menu: Product[] = [
  {
    id: "p1",
    name: "Hyderabadi Chicken Dum Biriyani",
    description: "fragrant Hyderabadi dum rice layered with flavourful chicken.",
    price: 260,
    category: "Biryani & Rice",
    foodType: "non-veg",
    source: "Biriyani Zone's",
    featured: true,
    available: true,
    image: biryani,
    badge: "most pickd",
    keywords: ["biryani", "biriyani", "rice", "chicken", "hyderabadi", "dum"],
  },
  {
    id: "p2",
    name: "Chicken Dum Biryani",
    description: "slow-cooked chicken biryani packed with bold Hyderabadi flavour.",
    price: 310,
    category: "Biryani & Rice",
    foodType: "non-veg",
    source: "SS Hyderabad Biryani",
    featured: true,
    available: true,
    image: biryani,
    badge: "most pickd",
    keywords: ["biryani", "rice", "chicken", "dum", "hyderabad"],
  },
  {
    id: "p3",
    name: "Chicken Biriyani + 3 pcs Chicken 65",
    description: "classic chicken biriyani paired with three crispy Chicken 65 pieces.",
    price: 240,
    category: "Combos",
    foodType: "non-veg",
    source: "Marhaba Biriyani",
    featured: true,
    available: true,
    image: friedChicken,
    badge: "combo",
    keywords: ["biryani", "combo", "chicken 65", "rice", "meal"],
  },
  {
    id: "p4",
    name: "Chicken Biriyani",
    description: "a satisfying chicken biriyani made for an easy dinner pick.",
    price: 190,
    category: "Biryani & Rice",
    foodType: "non-veg",
    source: "Marhaba Biriyani",
    featured: true,
    available: true,
    image: biryani,
    badge: "value pick",
    keywords: ["biryani", "rice", "chicken", "cheap", "dinner"],
  },
  {
    id: "p5",
    name: "Hyderabadi Chicken Biriyani Boneless",
    description: "aromatic Hyderabadi biriyani served with tender boneless chicken.",
    price: 310,
    category: "Biryani & Rice",
    foodType: "non-veg",
    source: "Biriyani Zone's",
    featured: true,
    available: true,
    image: biryani,
    keywords: ["biryani", "boneless", "chicken", "rice", "hyderabadi"],
  },
  {
    id: "p6",
    name: "Shawarma Roll",
    description: "juicy shawarma wrapped with creamy sauce and fresh fillings.",
    price: 170,
    category: "Shawarma & Grill",
    foodType: "non-veg",
    source: "SS Hyderabad Biryani",
    featured: true,
    available: true,
    image: shawarma,
    badge: "classic",
    keywords: ["shawarma", "roll", "wrap", "chicken"],
  },
  {
    id: "p7",
    name: "Shawarma Roll",
    description: "a quick, savoury shawarma roll for an easy late-night bite.",
    price: 120,
    category: "Shawarma & Grill",
    foodType: "non-veg",
    source: "Marhaba Biriyani",
    featured: true,
    available: true,
    image: shawarma,
    badge: "value pick",
    keywords: ["shawarma", "roll", "wrap", "chicken", "late night"],
  },
  {
    id: "p8",
    name: "Classic Crispy Burger",
    description: "crispy chicken stacked inside a soft bun with creamy signature sauce.",
    price: 269,
    category: "Burgers & Wraps",
    foodType: "non-veg",
    source: "LOC Square Cafe",
    featured: true,
    available: true,
    image: burger,
    badge: "most pickd",
    keywords: ["burger", "chicken", "crispy", "fried"],
  },
  {
    id: "p9",
    name: "Nashville Burger",
    description: "crispy chicken with a fiery Nashville-style kick.",
    price: 299,
    category: "Burgers & Wraps",
    foodType: "non-veg",
    source: "LOC Square Cafe",
    featured: true,
    available: true,
    image: burger,
    badge: "spicy",
    keywords: ["burger", "spicy", "nashville", "chicken"],
  },
  {
    id: "p10",
    name: "Classic Crunchy Burger",
    description: "a simple crunchy chicken burger made for quick cravings.",
    price: 114,
    category: "Burgers & Wraps",
    foodType: "non-veg",
    source: "Fruitello Cafe",
    featured: true,
    available: true,
    image: burger,
    badge: "value pick",
    keywords: ["burger", "chicken", "crunchy", "quick"],
  },
  {
    id: "p11",
    name: "Chicken Double Decker Burger",
    description: "a bigger chicken burger stacked for an extra satisfying bite.",
    price: 130,
    category: "Burgers & Wraps",
    foodType: "non-veg",
    source: "Fruitello Cafe",
    featured: false,
    available: true,
    image: burger,
    keywords: ["burger", "double", "chicken", "big"],
  },
  {
    id: "p12",
    name: "Chicko Wrap",
    description: "golden fried chicken wrapped with lettuce, tomato and creamy sauces.",
    price: 189,
    category: "Burgers & Wraps",
    foodType: "non-veg",
    source: "LOC Square Cafe",
    featured: false,
    available: true,
    image: wrap,
    keywords: ["wrap", "chicken", "roll", "fried"],
  },
  {
    id: "p13",
    name: "Crunchy Chicken Wrap",
    description: "crispy chicken rolled into a quick, crunchy and saucy wrap.",
    price: 95,
    category: "Burgers & Wraps",
    foodType: "non-veg",
    source: "Fruitello Cafe",
    featured: false,
    available: true,
    image: wrap,
    badge: "value pick",
    keywords: ["wrap", "chicken", "crunchy", "cheap"],
  },
  {
    id: "p14",
    name: "2 Parotta + ¼ Grill Chicken",
    description: "two flaky parottas paired with a quarter portion of grilled chicken.",
    price: 200,
    category: "Crispy & Grill",
    foodType: "non-veg",
    source: "Marhaba Biriyani",
    featured: false,
    available: true,
    image: grill,
    badge: "dinner combo",
    keywords: ["parotta", "grill", "chicken", "dinner", "combo"],
  },
  {
    id: "p15",
    name: "Chicken Fried Rice + Chilli Chicken",
    description: "chicken fried rice paired with saucy chilli chicken for a complete meal.",
    price: 370,
    category: "Combos",
    foodType: "non-veg",
    source: "SS Hyderabad Biryani",
    featured: false,
    available: true,
    image: friedRice,
    badge: "combo",
    keywords: ["fried rice", "chilli chicken", "combo", "chinese"],
  },
  {
    id: "p16",
    name: "Chicken Noodles + Chicken Manchurian",
    description: "chicken noodles served with bold and saucy chicken Manchurian.",
    price: 370,
    category: "Combos",
    foodType: "non-veg",
    source: "SS Hyderabad Biryani",
    featured: false,
    available: true,
    image: friedRice,
    badge: "combo",
    keywords: ["noodles", "manchurian", "combo", "chinese"],
  },
  {
    id: "p17",
    name: "Chicken 65",
    description: "spiced chicken bites fried until crisp and full of flavour.",
    price: 290,
    category: "Crispy & Grill",
    foodType: "non-veg",
    source: "Biriyani Zone's",
    featured: false,
    available: true,
    image: friedChicken,
    badge: "classic",
    keywords: ["chicken 65", "starter", "fried", "crispy"],
  },
  {
    id: "p18",
    name: "Dragon Chicken",
    description: "bold Indo-Chinese chicken with a spicy, savoury finish.",
    price: 290,
    category: "Dinner Picks",
    foodType: "non-veg",
    source: "Biriyani Zone's",
    featured: false,
    available: true,
    image: friedChicken,
    badge: "spicy",
    keywords: ["dragon", "chicken", "spicy", "chinese"],
  },
  {
    id: "p19",
    name: "Chicken 65",
    description: "a classic spicy fried chicken starter perfect for sharing.",
    price: 310,
    category: "Crispy & Grill",
    foodType: "non-veg",
    source: "SS Hyderabad Biryani",
    featured: false,
    available: true,
    image: friedChicken,
    keywords: ["chicken 65", "starter", "fried", "share"],
  },
  {
    id: "p20",
    name: "Original Chicken Popcorn",
    description: "golden bite-sized crispy chicken that's easy to keep munching.",
    price: 239,
    category: "Crispy & Grill",
    foodType: "non-veg",
    source: "LOC Square Cafe",
    featured: false,
    available: true,
    image: friedChicken,
    badge: "snack",
    keywords: ["popcorn", "chicken", "snack", "crispy"],
  },
  {
    id: "p21",
    name: "Korean Pops",
    description: "crispy chicken pops finished with a sweet-and-spicy Korean-style kick.",
    price: 169,
    category: "Crispy & Grill",
    foodType: "non-veg",
    source: "Fruitello Cafe",
    featured: false,
    available: true,
    image: friedChicken,
    keywords: ["korean", "pops", "chicken", "spicy", "snack"],
  },
  {
    id: "p22",
    name: "Loaded French Fries",
    description: "crispy fries loaded with flavour for an easy side or snack.",
    price: 85,
    category: "Dinner Picks",
    foodType: "veg",
    source: "Fruitello Cafe",
    featured: false,
    available: true,
    image: fries,
    badge: "add-on",
    keywords: ["fries", "snack", "side", "potato", "loaded"],
  },
  {
    id: "p23",
    name: "Peri Peri Fries",
    description: "golden fries tossed with bold peri-peri seasoning.",
    price: 129,
    category: "Dinner Picks",
    foodType: "veg",
    source: "LOC Square Cafe",
    featured: false,
    available: true,
    image: fries,
    badge: "add-on",
    keywords: ["fries", "peri peri", "side", "snack", "potato"],
  },
  {
    id: "p24",
    name: "Masala Dosa",
    description: "crisp dosa folded around a comforting spiced potato filling.",
    price: 105,
    category: "South Indian Dinner",
    foodType: "veg",
    source: "Thanjai Bhavan",
    featured: false,
    available: true,
    image: dosa,
    keywords: ["dosa", "masala", "south indian", "veg", "tiffin"],
  },
  {
    id: "p25",
    name: "Ghee Roast",
    description: "thin, crisp dosa roasted with aromatic ghee.",
    price: 120,
    category: "South Indian Dinner",
    foodType: "veg",
    source: "Thanjai Bhavan",
    featured: false,
    available: true,
    image: dosa,
    keywords: ["ghee roast", "dosa", "south indian", "veg"],
  },
  {
    id: "p26",
    name: "Paneer Masala Dosa",
    description: "crispy dosa with a rich paneer masala filling.",
    price: 150,
    category: "South Indian Dinner",
    foodType: "veg",
    source: "Thanjai Bhavan",
    featured: false,
    available: true,
    image: dosa,
    keywords: ["dosa", "paneer", "south indian", "veg"],
  },
  {
    id: "p27",
    name: "Veg Kothu Parotta",
    description: "chopped flaky parotta tossed hot with vegetables and masala.",
    price: 120,
    category: "South Indian Dinner",
    foodType: "veg",
    source: "Thanjai Bhavan",
    featured: false,
    available: true,
    image: parotta,
    keywords: ["kothu", "parotta", "veg", "south indian"],
  },
  {
    id: "p28",
    name: "Paneer Kothu Parotta",
    description: "flaky chopped parotta tossed with paneer and savoury masala.",
    price: 140,
    category: "South Indian Dinner",
    foodType: "veg",
    source: "Thanjai Bhavan",
    featured: false,
    available: true,
    image: parotta,
    keywords: ["kothu", "parotta", "paneer", "veg", "south indian"],
  },
  {
    id: "p29",
    name: "Veg Fried Rice + Gobi Manchurian",
    description: "vegetable fried rice paired with saucy gobi Manchurian.",
    price: 350,
    category: "Combos",
    foodType: "veg",
    source: "SS Hyderabad Biryani",
    featured: false,
    available: true,
    image: friedRice,
    badge: "veg combo",
    keywords: ["fried rice", "gobi", "manchurian", "veg", "combo"],
  },
  {
    id: "p30",
    name: "Paneer Butter Masala",
    description: "soft paneer simmered in a creamy, buttery tomato gravy.",
    price: 200,
    category: "Veg Picks",
    foodType: "veg",
    source: "Marhaba Biriyani",
    featured: false,
    available: true,
    image: paneer,
    keywords: ["paneer", "butter masala", "veg", "gravy", "curry"],
  },
  {
    id: "p31",
    name: "Paneer Tikka",
    description: "marinated paneer grilled with smoky tandoori flavour.",
    price: 315,
    category: "Veg Picks",
    foodType: "veg",
    source: "Biriyani Zone's",
    featured: false,
    available: true,
    image: paneerTikka,
    badge: "grill",
    keywords: ["paneer", "tikka", "grill", "veg", "tandoori"],
  },
  {
    id: "p32",
    name: "Oreo Shake",
    description: "cold, creamy Oreo goodness blended into an easy dessert shake.",
    price: 75,
    category: "Drinks & Shakes",
    foodType: "veg",
    source: "Fruitello Cafe",
    featured: false,
    available: true,
    image: shake,
    badge: "add-on",
    keywords: ["oreo", "shake", "sweet", "cold", "drink"],
  },
  {
    id: "p33",
    name: "Royal Falooda",
    description: "a rich chilled falooda layered for a sweet finish.",
    price: 140,
    category: "Drinks & Shakes",
    foodType: "veg",
    source: "Fruitello Cafe",
    featured: false,
    available: true,
    image: shake,
    keywords: ["falooda", "sweet", "dessert", "cold", "drink"],
  },
  {
    id: "p34",
    name: "Oreo Milkshake",
    description: "thick and creamy Oreo milkshake made for serious sweet cravings.",
    price: 189,
    category: "Drinks & Shakes",
    foodType: "veg",
    source: "LOC Square Cafe",
    featured: false,
    available: true,
    image: shake,
    keywords: ["oreo", "milkshake", "sweet", "thick", "drink"],
  },
  {
    id: "p35",
    name: "Blueberry Mojito",
    description: "cool blueberry refreshment with a bright, fizzy finish.",
    price: 114,
    category: "Drinks & Shakes",
    foodType: "veg",
    source: "LOC Square Cafe",
    featured: false,
    available: true,
    image: drinks,
    keywords: ["mojito", "blueberry", "drink", "cold", "refreshing"],
  },
  {
    id: "p36",
    name: "Triple Chocolate Waffle",
    description: "warm waffle loaded with layers of rich chocolate flavour.",
    price: 189,
    category: "Sweet Cravings",
    foodType: "veg",
    source: "LOC Square Cafe",
    featured: false,
    available: true,
    image: dessert,
    keywords: ["waffle", "chocolate", "dessert", "sweet"],
  },
  {
    id: "p37",
    name: "Walnut Brownie",
    description: "fudgy chocolate brownie finished with a satisfying walnut crunch.",
    price: 95,
    category: "Sweet Cravings",
    foodType: "veg",
    source: "Premium Cafe",
    featured: false,
    available: true,
    image: dessert,
    badge: "add-on",
    keywords: ["brownie", "walnut", "chocolate", "dessert", "sweet"],
  },
  {
    id: "p38",
    name: "Cold Coffee",
    description: "smooth chilled coffee that's rich, creamy and easy-going.",
    price: 240,
    category: "Drinks & Shakes",
    foodType: "veg",
    source: "Premium Cafe",
    featured: false,
    available: true,
    image: drinks,
    keywords: ["coffee", "cold", "drink", "creamy"],
  },
  {
    id: "p39",
    name: "Chickzza",
    description: "crispy chicken topped pizza-style with melted cheese and creamy sauce.",
    price: 329,
    category: "Dinner Picks",
    foodType: "non-veg",
    source: "LOC Square Cafe",
    featured: false,
    available: true,
    image: pizza,
    badge: "signature",
    keywords: ["pizza", "chicken", "cheese", "chickzza"],
  },
  {
    id: "p40",
    name: "Classic Chicken Mini Pizza",
    description: "a personal-size chicken pizza made for one-person cravings.",
    price: 219,
    category: "Dinner Picks",
    foodType: "non-veg",
    source: "LOC Square Cafe",
    featured: false,
    available: true,
    image: pizza,
    keywords: ["pizza", "mini", "chicken", "quick meal"],
  },
];

export const getProduct = (id: string) => menu.find((p) => p.id === id);

export const byCategory = (category: Category) =>
  menu.filter((p) => p.category === category);

export const mostPickd = menu.filter((p) => p.featured);

export const underBudget = (max: number) => menu.filter((p) => p.price <= max);

export function searchMenu(query: string, items: Product[] = menu) {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((p) =>
    [p.name, p.description, p.category, ...p.keywords]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

/** Subtle, category-aware upsells. Returns [] when nothing fits. */
export function upsellsFor(items: Product[]): Product[] {
  const ids = new Set(items.map((p) => p.id));
  const picks = new Set<string>();
  for (const item of items) {
    if (item.category === "Biryani & Rice" || item.category === "Combos") {
      ["p17", "p35", "p32"].forEach((id) => picks.add(id));
    }
    if (item.category === "Burgers & Wraps") {
      ["p23", "p34", "p35"].forEach((id) => picks.add(id));
    }
    if (item.category === "South Indian Dinner") {
      ["p28", "p38"].forEach((id) => picks.add(id));
    }
    if (item.category === "Crispy & Grill" || item.category === "Dinner Picks") {
      ["p22", "p35"].forEach((id) => picks.add(id));
    }
  }
  return [...picks]
    .filter((id) => !ids.has(id))
    .map((id) => getProduct(id))
    .filter((p): p is Product => Boolean(p) && p!.available)
    .slice(0, 4);
}
