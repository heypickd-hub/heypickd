import chips from "@/assets/snack-chips.jpg";
import chocolate from "@/assets/snack-chocolate.jpg";
import soda from "@/assets/snack-soda.jpg";
import biscuits from "@/assets/snack-biscuits.jpg";
import water from "@/assets/snack-water.jpg";
import comboImg from "@/assets/snack-combo.jpg";

export type SnackKind = "crunch" | "sweet" | "drink" | "extra";

export interface SnackItem {
  id: string;
  name: string;
  price: number;
  kind: SnackKind;
  image: string;
}

/** Central snack catalogue — update prices here only. */
export const snackItems: SnackItem[] = [
  { id: "s-lays", name: "Lay's", price: 30, kind: "crunch", image: chips },
  { id: "s-bingo", name: "Bingo", price: 30, kind: "crunch", image: chips },
  { id: "s-kurkure", name: "Kurkure", price: 20, kind: "crunch", image: chips },

  { id: "s-dairymilk", name: "Dairy Milk", price: 30, kind: "sweet", image: chocolate },
  { id: "s-kitkat", name: "KitKat", price: 30, kind: "sweet", image: chocolate },
  { id: "s-5star", name: "5 Star", price: 20, kind: "sweet", image: chocolate },
  { id: "s-oreo", name: "Oreo", price: 20, kind: "sweet", image: biscuits },

  { id: "s-coke", name: "Coca-Cola", price: 40, kind: "drink", image: soda },
  { id: "s-sprite", name: "Sprite", price: 40, kind: "drink", image: soda },
  { id: "s-fanta", name: "Fanta", price: 40, kind: "drink", image: soda },
  { id: "s-water", name: "Water", price: 20, kind: "drink", image: water },

  { id: "x-chips", name: "extra chips", price: 30, kind: "extra", image: chips },
  { id: "x-chocolate", name: "extra chocolate", price: 30, kind: "extra", image: chocolate },
  { id: "x-drink", name: "extra drink", price: 40, kind: "extra", image: soda },
  { id: "x-biscuits", name: "biscuits", price: 20, kind: "extra", image: biscuits },
  { id: "x-cookies", name: "cookies", price: 30, kind: "extra", image: biscuits },
  { id: "x-water", name: "water", price: 20, kind: "extra", image: water },
];

export const snacksByKind = (kind: SnackKind) =>
  snackItems.filter((s) => s.kind === kind);

export const getSnack = (id: string) => snackItems.find((s) => s.id === id);

export interface ComboPreset {
  id: string;
  name: string;
  parts: string[];
  price: number;
  image: string;
  badge?: string;
}

/** Ready-made snack combos. */
export const comboPresets: ComboPreset[] = [
  {
    id: "c-mini-munch",
    name: "mini munch",
    parts: ["Lay's", "Dairy Milk", "Coke"],
    price: 99,
    image: comboImg,
  },
  {
    id: "c-movie-mood",
    name: "movie mood",
    parts: ["Bingo", "Lay's", "2 chocolates", "Coke"],
    price: 149,
    image: comboImg,
    badge: "most pickd",
  },
  {
    id: "c-late-night",
    name: "late night fix",
    parts: ["2 chips", "Oreo", "Dairy Milk", "Coke"],
    price: 179,
    image: comboImg,
  },
  {
    id: "c-room-chill",
    name: "room chill combo",
    parts: ["Lay's", "Bingo", "KitKat", "Coke", "water"],
    price: 199,
    image: comboImg,
  },
  {
    id: "c-sweet-salty",
    name: "sweet & salty",
    parts: ["Lay's", "Dairy Milk", "KitKat", "Coke"],
    price: 159,
    image: comboImg,
  },
  {
    id: "c-share-pack",
    name: "share pack",
    parts: ["2 Lay's", "2 Bingo", "2 chocolates", "2 Coke"],
    price: 299,
    image: comboImg,
    badge: "for two",
  },
];
