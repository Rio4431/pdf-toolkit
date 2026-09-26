# PDF Toolkit

A static browser-based PDF utility suite that combines four tools into one website with button-based navigation.

## Tools

- JPEG to PDF
- Crop PDF
- OCR PDF
- Split PDF

## Language Switching

The site provides a compact `日本語 / English` two-button language switch in the shared header.

- The language setting applies to all four tools.
- Labels, buttons, help text, status messages, placeholders, and dropdown options are switched together.
- Dynamically generated messages are translated as they appear.
- The selected language is stored in `localStorage` and restored on the next visit.
- The tool pages receive the active language from the top-level site when they are loaded.

## Structure

```text
pdf-tool-suite/
├─ index.html
├─ assets/
│  └─ i18n.js
├─ tools/
│  ├─ jpeg-to-pdf.html
│  ├─ crop-pdf.html
│  ├─ ocr-pdf.html
│  └─ split-pdf.html
└─ README.md
```

The top-level `index.html` provides the shared navigation and language switch. Each tool remains isolated in its own iframe so that its CSS, JavaScript, element IDs, and PDF-processing libraries do not conflict with the other tools.

Tool pages are loaded lazily when selected. Once loaded, they remain mounted while switching tabs so in-progress state is preserved during the current browser session.

## Hosting

The site is static and can be hosted with GitHub Pages using the repository root as the publishing source.

## External Libraries

The individual tools load browser libraries from public CDNs, including libraries such as jsPDF, PDF.js, pdf-lib, JSZip, Fontkit, and Tesseract.js depending on the selected tool. An internet connection is therefore required for those CDN-hosted dependencies.

## License

No open-source license is included.

Source code is publicly available for portfolio and review purposes. No license for reuse, modification, or redistribution is granted.