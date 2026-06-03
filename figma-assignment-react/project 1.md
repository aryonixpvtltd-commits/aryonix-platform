# Figma Assignment React App

Pixel-focused React/Vite implementation of the provided Figma assignment.

## Step 1: Figma Analysis

The public Figma embed exposed a narrow thumbnail preview of the design. The visible layout is a modern studio/consultancy landing page with:

- Compact header and logo.
- Large centered editorial hero headline.
- Decorative organic shapes in coral and purple.
- People/avatar proof row.
- Content section with large circular team photography.
- Secondary growth/case-study block.
- Services section headed by "What we can offer you!".
- Customer testimonial section.
- Mint newsletter subscription band and multi-column footer.

Because the Figma API requires an authenticated token, final image exports should be swapped in from Figma for exact production parity.

## Step 2: Reusable Components

- `Header` and `Footer` for shared layout.
- `Button` for link and button variants.
- `SectionHeading` for repeated section title blocks.
- `AvatarStack` for people proof.
- `ServiceCard` for the service grid.
- `TestimonialCard` for review cards.

## Step 3: Folder Structure

```txt
src/
├── assets/
│   ├── figma-thumbnail.png
│   ├── people.js
│   └── services.js
├── components/
│   ├── AvatarStack.jsx
│   ├── Button.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── SectionHeading.jsx
│   ├── ServiceCard.jsx
│   └── TestimonialCard.jsx
├── sections/
│   ├── AboutSection.jsx
│   ├── Hero.jsx
│   ├── NewsletterSection.jsx
│   ├── ProofStrip.jsx
│   ├── ServicesSection.jsx
│   └── TestimonialsSection.jsx
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

## Step 4: React Code

The application is split into functional components and section-level modules. Data for avatars, testimonials, and services lives in `src/assets/` so components stay reusable and easy to update.

## Step 5: CSS Code

All styling is in `src/styles/global.css` using:

- CSS variables for color, typography, radius, container width, and shadows.
- Responsive `clamp()` typography and spacing.
- Flexbox and CSS Grid layout.
- Media queries for mobile, tablet, desktop, and large screens.
- Accessible focus states and smooth hover transitions.

## Asset Placement Instructions

Export production images from Figma and place them in `src/assets/`:

- Hero/team avatars: replace the `src` values in `src/assets/people.js`.
- Main circular team photo: replace the image URL in `src/sections/AboutSection.jsx`.
- Case-study photo: replace the image URL in `src/sections/AboutSection.jsx`.
- Any decorative raster assets: place them in `src/assets/` and import them into the relevant section.

Recommended export settings:

- Photos: `.webp`, 2x scale, compressed.
- Icons and simple marks: SVG when available.
- Keep alt text meaningful when replacing images.

## Step 6: Run the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

## Accessibility and Performance

- Semantic landmarks: `header`, `nav`, `main`, `section`, `footer`.
- Accessible links, buttons, labels, and alt text.
- Lazy loading for below-the-fold images.
- Reusable data-driven components to avoid duplicated markup.
- Remote images are requested with constrained widths and quality parameters. For final submission, export optimized local assets from Figma.
