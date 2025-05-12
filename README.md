# RatScale by RatLabs

<div align="center">
  
![RatScale Screenshot](https://github.com/labrat-0/RatScale_1.1.0/blob/main/icons/icon_120x120.png)
</div>
<div align="center">
  

# Comming Soon
  [![Chrome Web Store](https://img.shields.io/chrome-web-store/v/RatScale)](https://chrome.google.com/webstore/detail/ratscale-by-ratlabs/coming-soon)
  [![Edge Add-on](https://img.shields.io/badge/Edge%20Add--on-v1.0.0-blue)](https://microsoftedge.microsoft.com/addons/detail/ratscale-by-ratlabs/coming-soon)
</div>

A modern browser extension for developers, designers, and app creators to quickly generate complete icon sets for their applications, extensions, and websites.


## 🚀 Features

- ⚡ **Instant Icon Generation**: Resize images into 14 standard icon sizes from 16×16 to 1024×1024
- 📦 **One-Click Export**: Package all sizes as a ready-to-use ZIP file
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations
- 💻 **Cross-Browser Compatible**: Works on Chrome, Edge, and other Chromium-based browsers

## 📋 Included Icon Sizes

RatScale automatically generates the following icon sizes for comprehensive platform coverage:

- 16×16 - Favicons, browser tabs
- 32×32 - Windows desktop icons
- 48×48 - Application icons
- 64×64 - Windows/macOS dock icons
- 72×72 - Android launcher icons
- 96×96 - Google TV icons
- 128×128 - macOS app icons
- 144×144 - Android/Microsoft Store icons
- 152×152 - iOS/iPad touch icons
- 192×192 - Progressive Web App icons
- 256×256 - Windows high-res icons
- 384×384 - Android splash screens
- 512×512 - Play Store listing icons
- 1024×1024 - App Store submission

## 🔧 Installation

### Chrome Web Store (Recommended)

1. Visit the [Chrome Web Store page](https://chrome.google.com/webstore/detail/ratscale-by-ratlabs/coming-soon)
2. Click "Add to Chrome"
3. The extension icon will appear in your browser toolbar

### Microsoft Edge Add-ons

1. Visit the [Edge Add-on page](https://microsoftedge.microsoft.com/addons/detail/ratscale-by-ratlabs/coming-soon)
2. Click "Get" to install
3. The extension will be available in your browser toolbar

### Manual Installation (Developer Mode)

1. Download or clone this repository:
   ```bash
   git clone https://github.com/labrat-0/RatScale.git
   ```
2. Open your browser's extension management page:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked" and select the downloaded directory
5. The extension icon will appear in your browser toolbar

## 💻 How to Use

1. Click the RatScale icon in your browser toolbar
2. Drag and drop an image onto the interface (or click to select)
3. Click "Download" to process the image
4. Save the ZIP file when prompted
5. Use the generated icons in your project

## ✨ After Processing

After creating your icon pack, you can:

- **Process Another Image**: Start over with a new source image
- **Access ZIP File**: The download contains all icon sizes in PNG format

## 🌐 Browser Compatibility

- Google Chrome (v88+)
- Microsoft Edge (v88+)
- Opera, Brave, Vivaldi, and other Chromium-based browsers

## 🛠️ Development

### Project Structure

```
RatScale/
├── icons/              # Extension icons
├── background.js       # Background service worker
├── full_page.html      # Main extension UI
├── full_page.js        # Core functionality
├── jszip.min.js        # ZIP file creation library
├── manifest.json       # Extension manifest
├── PRIVACY.md          # Privacy policy
└── README.md           # This file
```

### Building and Testing

The extension can be loaded directly in developer mode without a build step. For testing:

1. Make your code changes
2. Navigate to `chrome://extensions` or `edge://extensions`
3. Click the refresh button on the extension card
4. Test the updated functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mick Donahue (labrat)**

- GitHub: [@labrat-0](https://github.com/labrat-0)

## 🙏 Acknowledgments

- [JSZip](https://stuk.github.io/jszip/) - JavaScript library for creating ZIP files
- [Vibe Coding](https://github.com/vibecoding) - For assistance with development
- All the developers who provided feedback and suggestions

## 🔒 Privacy

RatScale respects your privacy. All image processing happens locally in your browser, and no data is sent to external servers. See [PRIVACY.md](PRIVACY.md) for our complete privacy policy.

---

<div align="center">
  <p>Made with ❤️ by labrat</p>
  <a href="https://github.com/labrat-0">
    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="30" height="30" alt="GitHub">
  </a>
</div> 
