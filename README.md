# Modern Portfolio - Soufiano Dev

A modern, responsive portfolio website showcasing my work as a Java & Kotlin Developer. Built with HTML, TailwindCSS, and GSAP animations.

## Overview

This portfolio website features:
- Animated hero section with floating tech icons
- About me section
- Projects showcase
- Certificates display
- Multi-language support
- Contact form
- Social media links
- Modern glassmorphism design
- Smooth animations

## Features

### Visual Design
- Modern glassmorphism effects
- Responsive design for all screen sizes
- Animated background with tech stack icons
- Neon text effects
- Custom scrollbar styling

### Functionality
- Multi-language support (English, French, Spanish, Arabic)
- Contact form with validation
- Smooth scroll behavior
- Dynamic certificate display
- Animated transitions
- Social media integration

### Technical Features
- CSS animations and transitions
- GSAP animations
- TailwindCSS utility classes
- Font Awesome icons
- Custom toast notifications
- Responsive images
- Blur effects

## Supported Languages

The portfolio supports **four languages**:
1. **English** (Default)
2. **Français** (French)
3. **Español** (Spanish)
4. **العربية** (Arabic)

### How It Works
- The language selector is located in the top-left corner of the hero section.
- Clicking the globe icon opens a dropdown menu with the available languages.
- Selecting a language dynamically translates the content of the portfolio using JavaScript.
- The selected language is stored in the browser's local storage for persistence across sessions.

### Translation Implementation
- Text elements in the HTML are tagged with `data-translate` attributes.
- A JavaScript file (`Translate.js`) handles the language switching logic.
- Translations are stored in a JSON-like structure within the script.

### Example
```html
<h1 data-translate="heroTitle">Hi, I'm <span class="text-purple-400">Soufiano</span></h1>
<p data-translate="heroSubtitle">Java & Kotlin Developer | From Morocco</p>