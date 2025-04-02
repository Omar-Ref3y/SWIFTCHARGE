# SwiftCharge Landing Page

A modern, high-converting landing page for SwiftCharge - a compact and fast portable charger.

## Features

- Responsive design that works on all devices
- Modern dark theme with neon blue accents
- Interactive elements with smooth animations
- Complete sections including hero, features, testimonials, FAQ, and footer
- Mobile-friendly navigation

## Getting Started

1. Clone this repository to your local machine
2. Replace placeholder images:
   - Add product images to the `images` folder:
     - `swiftcharge-product.png` - Main product image for the hero section
     - `swiftcharge-detail.png` - Product detail image for the specs section
3. Customize content in the `index.html` file to match your specific product details
4. Modify styles in `css/styles.css` if needed
5. Deploy to your web hosting provider

## File Structure

```
- index.html       // Main HTML file with all page content
- css/
  - styles.css     // Stylesheet with all styling rules
- js/
  - main.js        // JavaScript for interactive elements
- images/          // Directory for product images
  - swiftcharge-product.png  // Main product image
  - swiftcharge-detail.png   // Detail product image
```

## Customization Guide

### Changing Colors

To modify the color scheme, edit the CSS variables at the top of the `styles.css` file:

```css
:root {
    --dark-bg: #0a0a14;  /* Main background color */
    --dark-surface: #1a1a2e;  /* Surface/card background color */
    --neon-blue: #00e5ff;  /* Primary accent color */
    --neon-blue-glow: rgba(0, 229, 255, 0.5);  /* Glow effect color */
    /* More color variables... */
}
```

### Adding New Sections

1. Create a new section in the `index.html` file following the pattern of existing sections
2. Add appropriate styling in the `styles.css` file
3. If needed, add JavaScript functionality in `main.js`

## Browser Compatibility

The landing page is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License. # SWIFTCHARGE
