export type FoodType = "veg" | "non-veg";

export type Category =
  | "Idli & Tiffin"
  | "Dosa & Uthappam"
  | "Biryani & Rice"
  | "Burgers & Wraps"
  | "Pizza"
  | "Crispy & Grill"
  | "Shawarma & Grill"
  | "Dinner Picks"
  | "Veg Picks"
  | "Drinks & Shakes"
  | "Sweet Cravings"
  | "Combos"
  | "Snacks & Sides";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  foodType: FoodType;
  /** Private fulfilment code. Never display this value to guests. */
  source: string;
  catalogueId?: string;
  featured: boolean;
  available: boolean;
  image: string;
  badge?: string;
  keywords: string[];
}

export const categories: { id: Category | "most-pickd"; label: string; emoji: string }[] = [
  { id: "most-pickd", label: "most pickd", emoji: "🔥" },
  { id: "Idli & Tiffin", label: "idli & tiffin", emoji: "🍽️" },
  { id: "Dosa & Uthappam", label: "dosa & uthappam", emoji: "🥞" },
  { id: "Biryani & Rice", label: "biryani", emoji: "🍚" },
  { id: "Combos", label: "meal combos", emoji: "🍱" },
  { id: "Dinner Picks", label: "rice & noodles", emoji: "🍜" },
  { id: "Crispy & Grill", label: "crispy & grill", emoji: "🍗" },
  { id: "Shawarma & Grill", label: "shawarma", emoji: "🌯" },
  { id: "Burgers & Wraps", label: "quick bites", emoji: "🍔" },
  { id: "Pizza", label: "pizza", emoji: "🍕" },
  { id: "Veg Picks", label: "veg picks", emoji: "🌱" },
  { id: "Snacks & Sides", label: "snacks & sides", emoji: "🍟" },
  { id: "Drinks & Shakes", label: "drinks", emoji: "🥤" },
  { id: "Sweet Cravings", label: "desserts", emoji: "🍰" },
];

import { catalogue } from "./catalogue.generated";
import snackBiscuits from "@/assets/snack-biscuits.jpg";
import snackChips from "@/assets/snack-chips.jpg";
import snackChocolate from "@/assets/snack-chocolate.jpg";
import snackCombo from "@/assets/snack-combo.jpg";
import snackSoda from "@/assets/snack-soda.jpg";
import snackWater from "@/assets/snack-water.jpg";
import { isProductOrderable } from "@/lib/product-availability";

const stayEssentials: Product[] = [
  {
    id: "stay-chips",
    name: "chips assortment",
    description: "a crunchy packet for room-time snacking.",
    price: 30,
    category: "Snacks & Sides",
    foodType: "veg",
    source: "vendor-essentials",
    featured: false,
    available: true,
    image: snackChips,
    badge: "room essential",
    keywords: ["chips", "snack", "room essential"],
  },
  {
    id: "stay-chocolate",
    name: "chocolate bar",
    description: "a quick chocolate fix for after your meal.",
    price: 30,
    category: "Sweet Cravings",
    foodType: "veg",
    source: "vendor-essentials",
    featured: false,
    available: true,
    image: snackChocolate,
    badge: "sweet add-on",
    keywords: ["chocolate", "dessert", "sweet"],
  },
  {
    id: "stay-biscuits",
    name: "oreo biscuits",
    description: "easy biscuits for a quick room-time snack.",
    price: 20,
    category: "Snacks & Sides",
    foodType: "veg",
    source: "vendor-essentials",
    featured: false,
    available: true,
    image: snackBiscuits,
    badge: "room essential",
    keywords: ["biscuits", "oreo", "snack"],
  },
  {
    id: "stay-soft-drink",
    name: "assorted soft drink",
    description: "a chilled soft drink to pair with your meal.",
    price: 40,
    category: "Drinks & Shakes",
    foodType: "veg",
    source: "vendor-essentials",
    featured: false,
    available: true,
    image: snackSoda,
    badge: "easy add-on",
    keywords: ["cold drink", "soda", "soft drink"],
  },
  {
    id: "stay-water",
    name: "mineral water",
    description: "a sealed bottle of drinking water for your room.",
    price: 20,
    category: "Drinks & Shakes",
    foodType: "veg",
    source: "vendor-essentials",
    featured: false,
    available: true,
    image: snackWater,
    badge: "room essential",
    keywords: ["mineral water", "water", "room essential"],
  },
  {
    id: "stay-snack-box",
    name: "room snack box",
    description: "chips, chocolate and a cold drink in one easy box.",
    price: 99,
    category: "Combos",
    foodType: "veg",
    source: "vendor-essentials",
    featured: true,
    available: true,
    image: snackCombo,
    badge: "complete combo",
    keywords: ["combo", "snack box", "room essential"],
  },
];

export const menu: Product[] = [...catalogue, ...stayEssentials];

export const getProduct = (id: string) => menu.find((product) => product.id === id);

export const byCategory = (category: Category) =>
  menu.filter((product) => product.category === category);

export const mostPickd = menu.filter((product) => product.featured);

export const underBudget = (max: number) => menu.filter((product) => product.price <= max);

export function searchMenu(query: string, items: Product[] = menu) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;
  return items.filter((product) =>
    [product.name, product.description, product.category, ...product.keywords]
      .join(" ")
      .toLowerCase()
      .includes(normalized),
  );
}

const isDrink = (product: Product) =>
  product.category === "Drinks & Shakes" ||
  product.keywords.some((keyword) =>
    ["drink", "water", "juice", "soda", "coffee", "milkshake"].some((term) =>
      keyword.includes(term),
    ),
  );

/** Small, relevant add-ons for the cart. Private vendor codes are never shown. */
export function upsellsFor(items: Product[], now = new Date()): Product[] {
  const cartIds = new Set(items.map((item) => item.id));
  const wantsSweet = items.some((item) => item.category !== "Sweet Cravings");
  const candidateCategories: Category[] = wantsSweet
    ? ["Drinks & Shakes", "Snacks & Sides", "Sweet Cravings"]
    : ["Drinks & Shakes", "Snacks & Sides"];

  return menu
    .filter(
      (product) =>
        isProductOrderable(product, now) &&
        !cartIds.has(product.id) &&
        candidateCategories.includes(product.category),
    )
    .sort((a, b) => {
      const categoryDelta =
        candidateCategories.indexOf(a.category) - candidateCategories.indexOf(b.category);
      if (categoryDelta !== 0) return categoryDelta;
      return a.price - b.price;
    })
    .slice(0, 4);
}

/** One-tap drink suggestions for the final confirmation step. */
export function checkoutDrinkUpsells(items: Product[], now = new Date()): Product[] {
  const cartIds = new Set(items.map((item) => item.id));
  const mealSources = new Set(items.filter((item) => !isDrink(item)).map((item) => item.source));

  return menu
    .filter(
      (product) => isProductOrderable(product, now) && isDrink(product) && !cartIds.has(product.id),
    )
    .map((product) => {
      const name = product.name.toLowerCase();
      const sourceMatch = mealSources.has(product.source) ? 100 : 0;
      const easyPairing = name.includes("buttermilk")
        ? 45
        : name.includes("lime soda") || name.includes("lemon")
          ? 35
          : name.includes("juice") || name.includes("lassi")
            ? 25
            : name.includes("shake") || name.includes("coffee")
              ? 15
              : 0;
      return { product, score: sourceMatch + easyPairing };
    })
    .sort((a, b) => b.score - a.score || a.product.price - b.product.price)
    .slice(0, 3)
    .map(({ product }) => product);
}
