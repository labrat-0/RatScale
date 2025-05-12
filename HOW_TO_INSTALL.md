# RatScale - Chrome Extension Installation Guide

RatScale is a powerful tool that helps you create icons for various platforms in multiple sizes. Follow these steps to install and use it.

## Installation Steps

1. Open Google Chrome
2. Type `chrome://extensions` in the address bar and press Enter
3. Enable "Developer mode" using the toggle switch in the top-right corner
4. Click "Load unpacked" button
5. Navigate to and select this folder (containing manifest.json and other files)
6. The RatScale extension should now appear in your extension list

## Using the Extension

1. Click the RatScale icon in your Chrome toolbar
2. The tool will open in a new window
3. Drop an image or click to select one (up to 5MB)
4. Select the target platforms you want to create icons for
5. Click "Download Icon Pack"
6. A ZIP file will be downloaded containing your icons in all the required sizes

## Troubleshooting

If the extension doesn't open:
1. Right-click the extension icon and select "Options" or "Extension options"
2. Check the Chrome console (F12) for any error messages
3. Make sure jszip.min.js is in the root folder
4. Try reloading the extension from the extensions page

## Supported Platforms and Icon Sizes

- Android: 48×48, 72×72, 96×96, 144×144, 192×192, 512×512
- iOS: 40×40, 58×58, 60×60, 80×80, 87×87, 120×120, 180×180, 1024×1024
- Windows: 16×16, 32×32, 44×44, 48×48, 50×50, 150×150, 310×310
- macOS: 16×16, 32×32, 64×64, 128×128, 256×256, 512×512, 1024×1024
- Chrome: 16×16, 32×32, 48×48, 128×128
- Firefox: 16×16, 32×32, 48×48, 64×64, 128×128
- PWA: 48×48, 72×72, 96×96, 144×144, 168×168, 192×192, 512×512

All icon sizes (16 to 1024) are also included in the root folder of the ZIP file. 