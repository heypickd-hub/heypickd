# Pickd Bites

# BUILD PICKD — MINIMAL GEN-Z HOTEL FOOD MENU WEBSITE

Create a polished, production-ready customer-facing food ordering website for a brand called:

# pickd

Tagline:

**good food, pickd for you.**

Pickd helps hotel guests discover a small curated selection of good food from nearby places and order it directly to their hotel room through WhatsApp.

This is NOT a restaurant directory.

This is NOT a Swiggy/Zomato clone.

The experience should feel:

**curated → simple → fast → friendly → premium**

The customer should feel that Pickd has already done the work of finding good food for them.

---

# CORE CUSTOMER FLOW

The complete experience should be:

**scan QR**

↓

**open Pickd**

↓

**browse curated food**

↓

**add items**

↓

**enter name + room number**

↓

**order through WhatsApp**

No customer account.

No email.

No password.

No online payment.

No address form.

Keep everything extremely simple.

---

# TECH STACK

Use:

* React

* TypeScript

* Vite

* Tailwind CSS

* Lucide Icons

* React Router

* localStorage for cart persistence

Keep dependencies lightweight.

The project must deploy correctly on **Vercel**.

Use clean reusable components and production-quality TypeScript.

---

# VERCEL SUPPORT

The application must work after:

GitHub → Vercel

Build command:

`npm run build`

Output directory:

`dist`

Create a root-level `vercel.json`:

```json

{

  "$schema": "https://openapi.vercel.sh/vercel.json",

  "rewrites": [

    {

      "source": "/(.*)",

      "destination": "/index.html"

    }

  ]

}

```

Do not use functionality that works only inside the AI builder's preview environment.

---

# DESIGN DIRECTION

Pickd should have a **minimal Gen-Z food brand aesthetic**.

Think:

* warm

* cute

* premium

* spacious

* modern

* playful

* clean

Do NOT make it look corporate.

Do NOT create a cluttered marketplace.

Do NOT copy Swiggy or Zomato.

Use lots of negative space.

---

# BRAND COLORS

Use:

### Cream

`#FFF7E8`

Main page background.

### Espresso Brown

`#2B1813`

Main text and dark UI elements.

### Dark Butter Yellow

`#D89A26`

Primary accent.

### Soft Butter

`#F5D98D`

Secondary surfaces.

### Warm White

`#FFFCF7`

Cards.

The official Pickd logo may contain orange.

Do NOT make the entire website orange.

Orange should appear only in:

* logo

* tiny highlights

* badges

* selected states

This will help Pickd look different from Swiggy.

---

# TYPOGRAPHY

Use:

**Manrope**

or

**Plus Jakarta Sans**

Main headings:

bold but rounded.

Body:

clean and readable.

Use lowercase wording for brand personality where appropriate.

Examples:

**hungry?**

**most pickd**

**something quick?**

**sweet cravings**

---

# MOBILE FIRST

Design primarily for:

375px

390px

430px

because hotel customers will scan the QR using their phone.

The desktop website should still look premium.

Do not simply stretch the mobile cards across desktop.

Create thoughtful responsive layouts.

---

# HEADER

Minimal sticky header.

Left:

Pickd logo.

Below/next to it:

**delivering to your stay**

Right:

search icon

cart icon

Cart icon should have quantity badge.

When scrolling, header should become slightly compact.

No huge navigation bar.

---

# HERO

Keep hero compact.

Do not waste the entire phone screen with a massive banner.

Suggested copy:

### hungry?

**we know what's good.**

Supporting text:

A few really good picks, delivered straight to your stay.

Primary CTA:

**explore food**

Secondary:

**call pickd**

Add the Pickd mascot subtly.

Do not make the mascot enormous.

---

# ANNOUNCEMENT

Below hero use a subtle pill:

**room delivery • easy ordering • good food**

Optional status:

🟢 **taking orders now**

Operating hours must be configurable in a simple config file.

---

# SEARCH

Add a search field:

**what are you craving?**

Search should filter the 40 menu items instantly.

Search by:

* name

* category

* keywords

---

# CATEGORY PILLS

Horizontal mobile-scroll categories.

Use:

🔥 Most Pickd

🍚 Biryani

🍔 Burgers & Wraps

🍗 Crispy & Grill

🌯 Shawarma

🍽️ Dinner Picks

🌱 Veg Picks

🥞 South Indian

🥤 Drinks

🍰 Sweet

Don't use too many emojis elsewhere.

---

# HOMEPAGE ORDER

Build the homepage in this sequence:

1. Hero

2. Most Pickd

3. Dinner Under ₹199

4. Biryani & Rice

5. Burgers & Wraps

6. Crispy & Grill

7. South Indian Dinner

8. Veg Picks

9. Drinks & Shakes

10. Sweet Cravings

Do not show all 40 products immediately in one giant list.

Use curated horizontal carousels/compact grids.

Add:

**see all →**

where appropriate.

---

# MOST PICKD

This should contain approximately the first 10 strongest items.

Heading:

### most pickd 🔥

Subtitle:

**the ones we'd start with.**

Use a horizontal swipe carousel on mobile.

---

# PRODUCT CARD DESIGN

Cards must be clean.

Every product card contains:

* food image

* food name

* short description

* food type indicator

* Pickd price

* small category label

* Add button

Example:

**Hyderabadi Chicken Dum Biriyani**

fragrant dum rice layered with flavourful chicken.

**₹260**

`+ add`

Do NOT show restaurant purchase price.

Do NOT show markup.

Do NOT show internal supplier details prominently.

---

# PRODUCT IMAGES

Use tasteful realistic food placeholders if actual images have not yet been uploaded.

Do not use cartoon food imagery.

Food photography should feel:

* warm

* clean

* realistic

* appetising

* not overly glossy

Use consistent image ratios.

Allow images to later be replaced easily through a central product data file.

---

# PRODUCT DETAIL

Clicking a product opens:

desktop → modal / side panel

mobile → bottom sheet or dedicated clean detail view

Show:

image

name

description

price

quantity

special instructions

Add to Pickd

Suggested instruction examples:

**less spicy**

**no onion**

**extra sauce**

Do not promise customisation unless available; label field:

**anything we should know?**

---

# MENU DATA

Store all items in a clean data structure such as:

`src/data/menu.ts`

Each product should contain:

```ts

{

  id,

  name,

  description,

  price,

  category,

  foodType,

  source,

  featured,

  image,

  keywords

}

```

The `source` field is INTERNAL.

Do not display source restaurant on the normal product card.

This will allow Pickd to change suppliers later.

---

# PICKD TOP 40 MENU

Use EXACTLY these launch products and customer-facing prices.

---

## 1 — Hyderabadi Chicken Dum Biriyani

Price:

**₹260**

Category:

Biryani & Rice

Internal source:

Biriyani Zone's

Description:

**fragrant Hyderabadi dum rice layered with flavourful chicken.**

Tags:

Most Pickd • Non-Veg

---

## 2 — Chicken Dum Biryani

Price:

**₹310**

Category:

Biryani & Rice

Internal source:

SS Hyderabad Biryani

Description:

**slow-cooked chicken biryani packed with bold Hyderabadi flavour.**

Tags:

Most Pickd • Non-Veg

---

## 3 — Chicken Biriyani + 3 pcs Chicken 65

Price:

**₹240**

Category:

Combos

Internal source:

Marhaba Biriyani

Description:

**classic chicken biriyani paired with three crispy Chicken 65 pieces.**

Tags:

Most Pickd • Combo

---

## 4 — Chicken Biriyani

Price:

**₹190**

Category:

Biryani & Rice

Internal source:

Marhaba Biriyani

Description:

**a satisfying chicken biriyani made for an easy dinner pick.**

Tags:

Most Pickd • Under ₹199

---

## 5 — Hyderabadi Chicken Biriyani Boneless

Price:

**₹310**

Category:

Biryani & Rice

Internal source:

Biriyani Zone's

Description:

**aromatic Hyderabadi biriyani served with tender boneless chicken.**

Tags:

Most Pickd • Boneless

---

## 6 — Shawarma Roll

Price:

**₹170**

Category:

Shawarma & Grill

Internal source:

SS Hyderabad Biryani

Description:

**juicy shawarma wrapped with creamy sauce and fresh fillings.**

Tags:

Most Pickd

---

## 7 — Shawarma Roll

Price:

**₹120**

Category:

Shawarma & Grill

Internal source:

Marhaba Biriyani

Description:

**a quick, savoury shawarma roll for an easy late-night bite.**

Tags:

Most Pickd • Under ₹199

---

## 8 — Classic Crispy Burger

Price:

**₹269**

Category:

Burgers & Wraps

Internal source:

LOC Square Cafe

Description:

**crispy chicken stacked inside a soft bun with creamy signature sauce.**

Tags:

Most Pickd

---

## 9 — Nashville Burger

Price:

**₹299**

Category:

Burgers & Wraps

Internal source:

LOC Square Cafe

Description:

**crispy chicken with a fiery Nashville-style kick.**

Tags:

Most Pickd • Spicy

---

## 10 — Classic Crunchy Burger

Price:

**₹114**

Category:

Burgers & Wraps

Internal source:

Fruitello Cafe

Description:

**a simple crunchy chicken burger made for quick cravings.**

Tags:

Most Pickd • Under ₹199

---

## 11 — Chicken Double Decker Burger

Price:

**₹130**

Category:

Burgers & Wraps

Internal source:

Fruitello Cafe

Description:

**a bigger chicken burger stacked for an extra satisfying bite.**

Tags:

Under ₹199

---

## 12 — Chicko Wrap

Price:

**₹189**

Category:

Burgers & Wraps

Internal source:

LOC Square Cafe

Description:

**golden fried chicken wrapped with lettuce, tomato and creamy sauces.**

Tags:

Under ₹199

---

## 13 — Crunchy Chicken Wrap

Price:

**₹95**

Category:

Burgers & Wraps

Internal source:

Fruitello Cafe

Description:

**crispy chicken rolled into a quick, crunchy and saucy wrap.**

Tags:

Value Pick

---

## 14 — 2 Parotta + ¼ Grill Chicken

Price:

**₹200**

Category:

Crispy & Grill

Internal source:

Marhaba Biriyani

Description:

**two flaky parottas paired with a quarter portion of grilled chicken.**

Tags:

Dinner Combo

---

## 15 — Chicken Fried Rice + Chilli Chicken

Price:

**₹370**

Category:

Combos

Internal source:

SS Hyderabad Biryani

Description:

**chicken fried rice paired with saucy chilli chicken for a complete meal.**

Tags:

Combo

---

## 16 — Chicken Noodles + Chicken Manchurian

Price:

**₹370**

Category:

Combos

Internal source:

SS Hyderabad Biryani

Description:

**chicken noodles served with bold and saucy chicken Manchurian.**

Tags:

Combo

---

## 17 — Chicken 65

Price:

**₹290**

Category:

Crispy & Grill

Internal source:

Biriyani Zone's

Description:

**spiced chicken bites fried until crisp and full of flavour.**

Tags:

Non-Veg

---

## 18 — Dragon Chicken

Price:

**₹290**

Category:

Dinner Picks

Internal source:

Biriyani Zone's

Description:

**bold Indo-Chinese chicken with a spicy, savoury finish.**

Tags:

Spicy

---

## 19 — Chicken 65

Price:

**₹310**

Category:

Crispy & Grill

Internal source:

SS Hyderabad Biryani

Description:

**a classic spicy fried chicken starter perfect for sharing.**

Tags:

Non-Veg

---

## 20 — Original Chicken Popcorn

Price:

**₹239**

Category:

Crispy & Grill

Internal source:

LOC Square Cafe

Description:

**golden bite-sized crispy chicken that's easy to keep munching.**

Tags:

Snack

---

## 21 — Korean Pops

Price:

**₹169**

Category:

Crispy & Grill

Internal source:

Fruitello Cafe

Description:

**crispy chicken pops finished with a sweet-and-spicy Korean-style kick.**

Tags:

Under ₹199

---

## 22 — Loaded French Fries

Price:

**₹85**

Category:

Dinner Picks

Internal source:

Fruitello Cafe

Description:

**crispy fries loaded with flavour for an easy side or snack.**

Tags:

Add-on

---

## 23 — Peri Peri Fries

Price:

**₹129**

Category:

Dinner Picks

Internal source:

LOC Square Cafe

Description:

**golden fries tossed with bold peri-peri seasoning.**

Tags:

Under ₹199

---

## 24 — Masala Dosa

Price:

**₹105**

Category:

South Indian Dinner

Internal source:

Thanjai Bhavan

Description:

**crisp dosa folded around a comforting spiced potato filling.**

Tags:

Veg • Under ₹199

---

## 25 — Ghee Roast

Price:

**₹120**

Category:

South Indian Dinner

Internal source:

Thanjai Bhavan

Description:

**thin, crisp dosa roasted with aromatic ghee.**

Tags:

Veg • Under ₹199

---

## 26 — Paneer Masala Dosa

Price:

**₹150**

Category:

South Indian Dinner

Internal source:

Thanjai Bhavan

Description:

**crispy dosa with a rich paneer masala filling.**

Tags:

Veg • Under ₹199

---

## 27 — Veg Kothu Parotta

Price:

**₹120**

Category:

South Indian Dinner

Internal source:

Thanjai Bhavan

Description:

**chopped flaky parotta tossed hot with vegetables and masala.**

Tags:

Veg • Under ₹199

---

## 28 — Paneer Kothu Parotta

Price:

**₹140**

Category:

South Indian Dinner

Internal source:

Thanjai Bhavan

Description:

**flaky chopped parotta tossed with paneer and savoury masala.**

Tags:

Veg • Under ₹199

---

## 29 — Veg Fried Rice + Gobi Manchurian

Price:

**₹350**

Category:

Combos

Internal source:

SS Hyderabad Biryani

Description:

**vegetable fried rice paired with saucy gobi Manchurian.**

Tags:

Veg Combo

---

## 30 — Paneer Butter Masala

Price:

**₹200**

Category:

Veg Picks

Internal source:

Marhaba Biriyani

Description:

**soft paneer simmered in a creamy, buttery tomato gravy.**

Tags:

Veg

---

## 31 — Paneer Tikka

Price:

**₹315**

Category:

Veg Picks

Internal source:

Biriyani Zone's

Description:

**marinated paneer grilled with smoky tandoori flavour.**

Tags:

Veg • Grill

---

## 32 — Oreo Shake

Price:

**₹75**

Category:

Drinks & Shakes

Internal source:

Fruitello Cafe

Description:

**cold, creamy Oreo goodness blended into an easy dessert shake.**

Tags:

Sweet • Add-on

---

## 33 — Royal Falooda

Price:

**₹140**

Category:

Drinks & Shakes

Internal source:

Fruitello Cafe

Description:

**a rich chilled falooda layered for a sweet finish.**

Tags:

Sweet

---

## 34 — Oreo Milkshake

Price:

**₹189**

Category:

Drinks & Shakes

Internal source:

LOC Square Cafe

Description:

**thick and creamy Oreo milkshake made for serious sweet cravings.**

Tags:

Sweet • Under ₹199

---

## 35 — Blueberry Mojito

Price:

**₹114**

Category:

Drinks & Shakes

Internal source:

LOC Square Cafe

Description:

**cool blueberry refreshment with a bright, fizzy finish.**

Tags:

Refreshing

---

## 36 — Triple Chocolate Waffle

Price:

**₹189**

Category:

Sweet Cravings

Internal source:

LOC Square Cafe

Description:

**warm waffle loaded with layers of rich chocolate flavour.**

Tags:

Dessert

---

## 37 — Walnut Brownie

Price:

**₹95**

Category:

Sweet Cravings

Internal source:

Premium Cafe

Description:

**fudgy chocolate brownie finished with a satisfying walnut crunch.**

Tags:

Dessert

---

## 38 — Cold Coffee

Price:

**₹240**

Category:

Drinks & Shakes

Internal source:

Premium Cafe

Description:

**smooth chilled coffee that's rich, creamy and easy-going.**

Tags:

Coffee

---

## 39 — Chickzza

Price:

**₹329**

Category:

Dinner Picks

Internal source:

LOC Square Cafe

Description:

**crispy chicken topped pizza-style with melted cheese and creamy sauce.**

Tags:

Signature

---

## 40 — Classic Chicken Mini Pizza

Price:

**₹219**

Category:

Dinner Picks

Internal source:

LOC Square Cafe

Description:

**a personal-size chicken pizza made for one-person cravings.**

Tags:

Quick Meal

---

# DUPLICATE PRODUCT HANDLING

There are products with similar names from different suppliers.

For example:

Chicken 65

and

Shawarma Roll.

Keep their unique IDs and source restaurants internally.

On the website, they may be distinguished subtly later using labels such as:

**classic**

**spicy**

**value pick**

Do not display ugly labels such as:

"Hotel 5 Chicken 65"

unless explicitly requested.

---

# CART

Create a sticky mobile cart bar once a product is added.

Example:

**2 items • ₹380**

**view pickd →**

The cart page/bottom sheet should contain:

item name

quantity

unit price

line price

remove

special note

subtotal

---

# MINIMUM ORDER

Set minimum food order:

# ₹199

If cart is under ₹199:

Show:

**₹54 away from your pickd**

with a progress bar.

Recommend inexpensive:

fries

drinks

desserts

to increase basket value.

---

# SMART UPSELL

When user adds biryani:

suggest:

Chicken 65

Mojito

Oreo Shake

When user adds burger:

suggest:

fries

shake

mojito

When user adds dosa:

suggest:

Paneer Kothu Parotta only if appropriate, otherwise don't force irrelevant upsells.

Keep upselling subtle.

Heading:

### goes well with 👀

---

# CHECKOUT

No payment gateway.

Checkout asks only:

### your name

### room number

Optional:

### anything we should know?

Hotel/branch should be read from the URL or config.

Example URL:

`/h/branch-1`

---

# WHATSAPP BUTTON

Large final CTA:

### order on WhatsApp

Use WhatsApp green only for the WhatsApp icon/button.

Do NOT use WhatsApp green anywhere else.

Generate a prefilled message like:

```text

hey Pickd 👋

I'd like to order:

2 × Chicken Biriyani — ₹380

1 × Peri Peri Fries — ₹129

1 × Blueberry Mojito — ₹114

total: ₹623

name: Chris

room: 204

hotel: Branch 1

notes: less spicy please

```

Use:

`https://wa.me/`

Correctly URL encode everything.

Phone number must be configurable in:

`src/config.ts`

---

# CALL PICKD

Provide small secondary option:

**prefer calling?**

`call pickd`

Use:

`tel:`

---

# ORDER SUCCESS EXPERIENCE

Because WhatsApp handles the actual order, do NOT fake a confirmed order screen.

Once WhatsApp opens, the website may display:

**almost there.**

Send the message in WhatsApp to place your Pickd.

---

# FOOTER

Extremely minimal.

Pickd logo

**good food, pickd for you.**

Instagram

WhatsApp

Call

Small text:

**menu availability may vary.**

No huge footer.

---

# MENU AVAILABILITY

Create product availability flags.

Each product should support:

`available: true/false`

When false:

show:

**sold out for now**

Disable add button.

---

# OPEN / CLOSED STATUS

In configuration support:

```ts

openingTime

closingTime

ordersPaused

```

If unavailable:

Show subtle banner:

### we're taking a break.

**ordering opens again soon.**

Do not allow WhatsApp checkout while paused.

---

# ANIMATIONS

Use subtle motion.

Examples:

card hover

button press

cart slide-up

small fade/slide section entry

product image zoom on hover

Do NOT add:

large parallax

heavy 3D

constant mascot animation

overly flashy transitions

The site should feel smooth, not gimmicky.

---

# LOADING STATES

Use food-card skeletons.

Do not use giant loading spinners.

---

# EMPTY CART

Use Pickd personality:

### nothing pickd yet.

**find something good ↓**

---

# SEARCH EMPTY STATE

### couldn't find that one.

**try another craving.**

---

# PRODUCT BADGES

Use badges very selectively.

Examples:

🔥 most pickd

🌶 spicy

🌱 veg

✨ signature

Do not cover every card with badges.

---

# VEG / NON-VEG

Use standard Indian visual indicators.

Green indicator:

Veg

Brown/red indicator:

Non-Veg

Keep them small.

---

# DESKTOP DESIGN

On desktop:

max content width approximately:

1200–1280px.

Use 3–4 product cards per row depending on width.

Hero becomes a balanced two-column composition.

Do not create enormous empty areas.

---

# SEO

Page title:

**Pickd — good food, pickd for you**

Description:

**Curated food, snacks and drinks delivered straight to your hotel stay.**

Add:

Open Graph metadata

favicon

theme colour

---

# PERFORMANCE

This website must be fast.

Use:

lazy-loaded images

WebP/AVIF when possible

responsive images

code splitting where useful

small dependency footprint

Avoid enormous animation libraries.

---

# IMPORTANT UX RULE

Do not make customers choose from all seven restaurants.

The restaurant/source belongs in internal product data.

Pickd is the customer-facing brand.

Customer should primarily choose:

**what they want to eat**

not:

**where to order it from**

---

# VISUAL PERSONALITY

The site should feel like:

a cute modern food startup

*

a clean boutique café menu

*

a simple mobile ordering experience.

Avoid generic marketplace templates.

Avoid giant red discount banners.

Avoid constant percentage-off promotions.

Avoid bright orange everywhere.

Avoid excessive icons.

Avoid excessive shadows.

Avoid excessive rounded cards.

---

# FINAL QA

Before completing the project test:

* all 40 products exist

* all 40 prices match this prompt exactly

* product descriptions display correctly

* categories work

* search works

* Most Pickd works

* under ₹199 filtering works

* veg filtering works

* add to cart works

* quantity works

* cart persists after refresh

* ₹199 minimum order works

* WhatsApp message contains correct products

* totals calculate correctly

* name works

* room number works

* call button works

* sold-out state works

* closed state works

* mobile UI is polished

* desktop UI is polished

* no restaurant cost appears publicly

* source restaurant is not prominently shown

* Vercel build succeeds

* refreshing internal routes does not return 404

* no console errors

The final result must feel like a **real Pickd launch website**, not a generic food menu template.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://heypickd.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cca8cfc2-ad8d-44bf-a937-03e2fdc05414).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
