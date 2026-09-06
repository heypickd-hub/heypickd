#!/usr/bin/env python3
"""Generate the curated Pickd TypeScript catalogue from the supplier CSV."""

from __future__ import annotations

import csv
import json
import re
import sys
from pathlib import Path


BASE_SELECTED_IDS = (
    list(range(1, 96))
    + list(range(96, 106))
    + [106, 109, 111, 112, 113, 120, 124, 128, 129, 130, 133, 139]
    + [149, 150]
    + [110, 137, 162, 265, 308, 317, 319, 321, 322]
    + [343, 440, 451, 507, 584, 589, 591, 604]
    + [605, 607, 703, 762, 774, 801, 852, 879]
)

# High-demand evening dishes requested for the dinner catalogue. Biryani is
# discovered from the sheet below so new biryani rows are never missed.
DINNER_SELECTED_IDS = (
    # Shawarma
    604, 605, 606, 699, 700, 701, 702, 703, 704, 705, 706, 707,
    # Tandoor and grill
    251, 252, 259, 260, 265, 362, 363, 366, 367, 368, 591, 592, 593, 594,
    # Crispy and broasted
    144, 242, 774, 801, 802, 803, 804, 805, 806, 807, 808, 809,
    810, 811, 812, 813, 814,
)

# Current burger, pizza, fries and falooda catalogue from the supplied PDF menu
# PDF. The matching CSV rows carry Pickd's profitable customer-facing prices.
PDF_MENU_IDS = (
    # Crispy, no-bun and beef burgers
    774, 775, 776, 777, 778, 779, 787, 788, 789, 790, 791, 792,
    # Loaded fries
    815, 816, 817,
    # Medium, large and mini pizzas
    830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841,
    842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853,
    # Fries
    861, 862, 863, 864,
    # Falooda
    886, 887, 888, 889, 890, 891, 892,
)

FEATURED_IDS = {
    1,
    7,
    14,
    20,
    37,
    51,
    55,
    61,
    71,
    82,
    95,
    98,
    109,
    139,
    165,
    188,
    232,
    321,
    507,
    607,
    611,
    617,
    761,
    801,
    853,
    871,
}

PUBLIC_NAMES = {
    # Supplier branding is private; guests only see a descriptive menu name.
    631: "Supreme Veg Biryani Pack",
    510: "Special Biriyani",
    769: "Kids Biryani Pack",
    770: "Supreme Biryani Pack",
    771: "Smart Biryani Pack",
    779: "Pickd Signature Burger",
    817: "Pickd Signature Steak Loaded Fries",
    850: "Pickd Signature Chicken Pizza – M",
    851: "Pickd Signature Chicken Pizza – L",
    892: "Pickd Signature Falooda",
}

PUBLIC_DESCRIPTIONS = {
    774: "Crispy chicken, creamy sauce and fresh toppings in a toasted bun.",
    775: "Crispy chicken with molten cheese, creamy sauce and fresh toppings.",
    776: "Crispy chicken with smoky barbecue sauce and fresh toppings.",
    777: "Crispy chicken with a hot Nashville-style seasoning and sauce.",
    778: "Crispy chicken with a sweet-and-spicy Korean-style glaze.",
    779: "Pickd's fully loaded crispy chicken burger with cheese and a tangy kick.",
    787: "Juicy original crispy chicken served bun-free.",
    788: "Bun-free crispy chicken finished with sweet-and-spicy Korean glaze.",
    789: "Bun-free crispy chicken finished with smoky barbecue sauce.",
    790: "Bun-free crispy chicken with spicy Nashville seasoning.",
    791: "A thin veal patty smashed and seared on the flat-top with cheese.",
    792: "Two smashed beef patties stacked high with melted cheese.",
    815: "Golden fries topped with juicy smashed steak.",
    816: "Crispy fries, tender smashed steak and melted cheese.",
    817: "Loaded fries topped with Pickd's signature seasoned steak.",
    830: "Classic mozzarella cheese pizza.",
    831: "Classic mozzarella cheese pizza.",
    832: "Tomato, onion and green chilli.",
    833: "Tomato, onion and green chilli.",
    834: "Sweet corn and mozzarella cheese.",
    835: "Sweet corn and mozzarella cheese.",
    836: "Paneer tikka, onion, capsicum and jalapeño.",
    837: "Paneer tikka, onion, capsicum and jalapeño.",
    838: "Pepper paneer, onion, tomato, capsicum and red paprika.",
    839: "Pepper paneer, onion, tomato, capsicum and red paprika.",
    840: "Mushroom, jalapeño, olives, capsicum, tomato, onion and baby corn.",
    841: "Mushroom, jalapeño, olives, capsicum, tomato, onion and baby corn.",
    842: "Chicken tikka, onion and green chilli.",
    843: "Chicken tikka, onion and green chilli.",
    844: "Peri peri chicken, mushroom, jalapeño and capsicum.",
    845: "Peri peri chicken, mushroom, jalapeño and capsicum.",
    846: "Barbecue chicken, chicken tikka, onion and capsicum.",
    847: "Barbecue chicken, chicken tikka, onion and capsicum.",
    848: "Peri peri chicken, barbecue chicken, green chilli and olives.",
    849: "Peri peri chicken, barbecue chicken, green chilli and olives.",
    850: "Chicken tikka, peri peri chicken, barbecue chicken, jalapeño, paprika, onion and corn.",
    851: "Chicken tikka, peri peri chicken, barbecue chicken, jalapeño, paprika, onion and corn.",
    852: "A personal-size classic vegetable pizza with mozzarella.",
    853: "A personal-size classic chicken pizza with mozzarella.",
    861: "Golden fries with a satisfying crunchy finish.",
    862: "Golden fries tossed in bold peri peri seasoning.",
    863: "Golden fries loaded with creamy savoury sauces.",
    864: "Golden fries finished with rich melted cheese.",
    886: "A compact chilled falooda with milk, vermicelli, basil seeds and ice cream.",
    887: "Strawberry falooda with milk, vermicelli, basil seeds and ice cream.",
    888: "Mango falooda with milk, vermicelli, basil seeds and ice cream.",
    889: "Kulfi falooda with milk, vermicelli, basil seeds and kulfi.",
    890: "Kesar falooda with saffron milk, vermicelli, basil seeds and ice cream.",
    891: "Rich falooda layered with dried fruits, nuts, milk and ice cream.",
    892: "Pickd's loaded signature falooda with fruit, nuts and ice cream.",
}

FOOD_TYPE_OVERRIDES = {
    **{product_id: "non-veg" for product_id in range(774, 780)},
    **{product_id: "non-veg" for product_id in range(787, 793)},
}


def should_remove(row: dict[str, str]) -> bool:
    """Remove the full hot-drinks section plus vada/bonda dishes."""
    name = row["name"].strip().lower()
    return row["category"].strip() == "Hot Beverages" or bool(
        re.search(r"\b(vada|bonda)\b", name)
    )


def replaced_by_pdf_menu(row: dict[str, str]) -> bool:
    """True for old products superseded by the supplied PDF catalogue."""
    return bool(re.search(r"\b(burger|pizza|fries|falooda)\b", row["name"].lower()))


def selected_ids(rows: dict[int, dict[str, str]]) -> list[int]:
    biryani_ids = [
        product_id
        for product_id, row in rows.items()
        if any(
            term in f'{row["name"]} {row["category"]}'.lower()
            for term in ("biryani", "biriyani")
        )
    ]
    requested = [*BASE_SELECTED_IDS, *biryani_ids, *DINNER_SELECTED_IDS, *PDF_MENU_IDS]
    return list(
        dict.fromkeys(
            product_id
            for product_id in requested
            if product_id in rows
            and not should_remove(rows[product_id])
            and (product_id in PDF_MENU_IDS or not replaced_by_pdf_menu(rows[product_id]))
        )
    )


def normalized_category(raw: str, name: str) -> str:
    value = raw.lower()
    item = name.lower()
    if "biriyani" in item or "biryani" in item:
        if "combo" in value or "bucket" in value or "family pack" in value or "smile pack" in item:
            return "Combos"
        return "Biryani & Rice"
    if raw == "Tiffin & Lunch" and item in {
        "mini tiffin",
        "meals",
        "mini meals",
        "special meals (parcel only)",
    }:
        return "Combos"
    if raw == "Idli" or raw in {"Varieties", "Tiffin & Lunch", "Tiffin"}:
        return "Idli & Tiffin"
    if "dosa" in value or "uthappam" in value:
        return "Dosa & Uthappam"
    if "pizza" in item or value in {"veg pizza", "chicken pizza"}:
        return "Pizza"
    if "fries" in item:
        return "Snacks & Sides"
    if "falooda" in item or "falooda" in value:
        return "Drinks & Shakes"
    if "burger" in item or "burger" in value:
        return "Burgers & Wraps"
    if raw in {"Snacks", "Crunchies", "Mini Pizza & Sides"}:
        return "Snacks & Sides"
    if raw in {"Burgers", "Sandwiches", "Wraps", "Burgers & Rolls", "Non-Veg Wraps"}:
        return "Burgers & Wraps"
    if any(word in value for word in ("beverage", "juice", "shake", "falooda", "mocktail")):
        return "Drinks & Shakes"
    if raw == "Hot Beverages":
        return "Drinks & Shakes"
    if raw in {"Waffles", "Desserts"}:
        return "Sweet Cravings"
    if "combo" in value or "bucket" in value or "family pack" in value or "smile pack" in item:
        return "Combos"
    if "biriyani" in value or "biryani" in value:
        return "Biryani & Rice"
    if raw in {"Rice & Noodles", "Non-Veg Fried Rice", "Veg Fried Rice", "Noodles", "Soups"}:
        return "Dinner Picks"
    if "shawarma" in value or "shawarma" in item:
        return "Shawarma & Grill"
    if any(
        term in value
        for term in ("grill", "tandoor", "broasted", "popcorn", "crispy", "lollipop")
    ) or any(
        term in item
        for term in ("grill", "tandoor", "broasted", "popcorn", "crispy", "lollipop")
    ):
        return "Crispy & Grill"
    if "veg" in value or "paneer" in item:
        return "Veg Picks"
    return "Dinner Picks"


def vendor_code(product_id: int) -> str:
    if product_id <= 229:
        return "vendor-a"
    if product_id <= 433:
        return "vendor-b"
    if product_id <= 506:
        return "vendor-c"
    if product_id <= 621:
        return "vendor-d"
    if product_id <= 773:
        return "vendor-e"
    return "vendor-f"


def badge(category: str, featured: bool, price: int) -> str | None:
    if featured:
        return "most pickd"
    if category == "Combos":
        return "complete combo"
    if price <= 149:
        return "value pick"
    if category == "Crispy & Grill":
        return "protein pick"
    if category == "Sweet Cravings":
        return "sweet finish"
    return None


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: generate_catalogue.py SOURCE.csv OUTPUT.ts")

    source = Path(sys.argv[1])
    output = Path(sys.argv[2])
    with source.open(encoding="utf-8-sig", newline="") as handle:
        rows = {int(row["id"]): row for row in csv.DictReader(handle)}

    product_ids = selected_ids(rows)
    missing = [
        product_id
        for product_id in (*DINNER_SELECTED_IDS, *PDF_MENU_IDS)
        if product_id not in rows
    ]
    if missing:
        raise SystemExit(f"missing product ids: {missing}")

    records: list[str] = []
    for product_id in product_ids:
        row = rows[product_id]
        name = PUBLIC_NAMES.get(product_id, row["name"].strip())
        category = normalized_category(row["category"], name)
        food_type = FOOD_TYPE_OVERRIDES.get(
            product_id, "veg" if row["food_type"] == "veg" else "non-veg"
        )
        price = int(float(row["pickd_price"]))
        featured = product_id in FEATURED_IDS
        item_badge = badge(category, featured, price)
        keywords = sorted(
            {
                name.lower(),
                row["category"].lower(),
                category.lower(),
                "hotel food",
                "south indian" if category in {"Idli & Tiffin", "Dosa & Uthappam"} else "",
                "meal for one" if category in {"Idli & Tiffin", "Dosa & Uthappam", "Dinner Picks"} else "",
                "sharing" if category == "Combos" and price >= 399 else "",
            }
            - {""}
        )
        description = PUBLIC_DESCRIPTIONS.get(product_id, row["description"].strip())
        if product_id in PUBLIC_NAMES and product_id not in PUBLIC_DESCRIPTIONS:
            description = f"A satisfying {name.lower()} for an easy hotel meal."
        record = {
            "id": f"catalogue-{product_id}",
            "catalogueId": str(product_id),
            "name": name,
            "description": description,
            "price": price,
            "category": category,
            "foodType": food_type,
            "source": vendor_code(product_id),
            "featured": featured,
            "available": True,
            "image": f"/products/{product_id}.webp",
            "badge": item_badge,
            "keywords": keywords,
        }
        fields = ", ".join(
            f"{key}: {json.dumps(value, ensure_ascii=False)}"
            for key, value in record.items()
            if value is not None
        )
        fields = fields.replace(": true", ": true").replace(": false", ": false")
        records.append(f"  {{ {fields} }},")

    contents = "\n".join(
        [
            'import type { Product } from "./menu";',
            "",
            "/** Generated from the curated supplier catalogue. Do not expose source codes to guests. */",
            "// prettier-ignore",
            "export const catalogue: Product[] = [",
            *records,
            "];",
            "",
        ]
    )
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(contents, encoding="utf-8")
    print(f"generated {len(records)} products at {output}")


if __name__ == "__main__":
    main()
