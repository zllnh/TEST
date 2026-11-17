# VANDLZ online store

Static website for MMS 142 Assignment #2 (Group DIVAlopers), built with HTML, CSS, JavaScript and Bootstrap 5.3 from our Figma visual mockups.

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| Contact us | `contact.html` |
| Privacy policy and terms | `privacy-policy.html` |
| Don't Be Late Tee | `dont-be-late-tee.html` |
| Everyday Comfort Tee | `everyday-comfort-tee.html` |
| Do Good Work Tee | `do-good-work-tee.html` |

## Folders

- `css/style.css` - custom styles, linked after the Bootstrap CDN stylesheet
- `js/main.js` - contact form, order form and product gallery
- `images/` - logo, product and page images exported from the Figma file

Bootstrap CSS, Bootstrap JavaScript and Bootstrap Icons are loaded from the jsDelivr CDN.

## How the forms work

Both forms use JavaScript to build a `mailto:` link (subject and body are encoded with `encodeURIComponent`) and open the visitor's email app with the message already written.

- **Contact form** (`contact.html`) sends to `hello@examplewebsite142.com` with the visitor's name, email and message.
- **Order Now** (each product page) sends to `orders@examplewebsite142.com` with the product name, size, quantity, unit price and total.

## Accessibility and inclusive design

- One `h1` per page, headings in order, and `header`, `nav`, `main`, `footer` landmarks
- "Skip to main content" link as the first focusable element
- Visible focus indicator (black outline with a lime halo) on every link, button and field
- Every image has alt text; decorative icons are hidden from screen readers
- Icon-only links and buttons have text names (for example "Open menu", "Contact us")
- Form fields have real labels, required markers, error messages in text, and a live status message
- Text is at least 16px; click and tap targets are at least 44 by 44px
- Brand colours checked for contrast: black on lime, white on purple `#7E3BEC` (5.5:1), lime on black
- State is never shown by colour alone: the selected size is inverted (black fill) and bold, the current page is bold with a side bar, badges are text
- Respects `prefers-reduced-motion`

## Brand kit

- Colours: lime `#C6FF34`, black `#161616`, purple `#7E3BEC`, white `#FFFFFF`
- Fonts: Cossette Texte (headings) and Gulim (body). Gulim is not a web font, so Gothic A1 is loaded as the fallback for devices without it.
- Icons: the brand kit set (menu, search, heart, account, bag) drawn as inline SVG on a 24px grid with a 2px stroke

## Changes from the mockup

- Emails use the addresses required by the brief (`hello@` and `orders@examplewebsite142.com`).
- "Add to cart" confirms the selection and points to "Order Now", because a static site has no cart page.
- Header icons link to real destinations (shirts, our story, contact, new drop) so that no link is dead.
- FAQ and Log in are shown as "coming soon" text, because those pages are not part of this project.
- Policy text column is narrower than the mockup for a comfortable reading width.