# Public Assets

This directory contains static files that will be served directly.

## Structure

- `logo.png` or `logo.svg` - Company logo
- `uploads/` - User-uploaded images (projects, etc.)
- Add any other static assets here (favicon, images, etc.)

## Usage in components

```tsx
import Image from 'next/image'

<Image src="/logo.png" alt="Logo" width={200} height={60} />
```

Or simply:
```html
<img src="/logo.png" alt="Logo" />
```
