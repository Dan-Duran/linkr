<div align="center">
  <img src="images/icon128.png" alt="Linkr Logo" width="80">
  <h1>Linkr URL Manager</h1>
  <p><strong>A sleek, customizable URL manager for your browser</strong></p>
  <div align="center">
  <a href="https://github.com/Dan-Duran/linkr/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Dan-Duran/linkr"></a>
  <a href="https://github.com/Dan-Duran/linkr/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
</div>
  <p>
    <a href="#features">Features</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#customization">Customization</a> •
    <a href="#contributing">Contributing</a> •
    <a href="#license">License</a>
  </p>
</div>

## 🖥️ Screenshot 
![linkr](https://github.com/user-attachments/assets/19ec2cb7-57c4-45b4-abb0-c0e999f2b225)


## 💪 Join me! 
- **👉 Subscribe to my YouTube Channel [GetCyber - YouTube](https://youtube.com/getCyber)**
- **👉 Checkout some more awesome tools at [GetCyber](https://getcyber.me/tools)**
- **👉 Discord Server [GetCyber - Discord](https://discord.gg/YUf3VpDeNH)**

> 
> ### 💝 Support My Work
> 
> [![Sponsor my work](https://img.shields.io/badge/Sponsor_my_work-30363D?style=for-the-badge&logo=GitHub-Sponsors&logoColor=#EA4AAA)](https://github.com/sponsors/Dan-Duran)
>
> <details>
> <summary>Why sponsor?</summary>
> Your sponsorship helps keep my open-source projects alive! From interactive learning tools to security guides, every contribution makes a difference in keeping these resources free and accessible to everyone.
>
> - 🔨 Maintain and improve existing tools
> - 📚 Create new educational content
> - 🌐 Keep resources free and accessible
> - 💡 Dedicate more time to community projects
> </details>
> 

## Overview

Linkr is a lightweight browser extension that helps you organize and access your favorite websites with just one click. It offers a more visual and customizable alternative to traditional bookmarks with a modern, dark-themed interface.

## Features

- **Custom URL Buttons**: Add, edit, and delete URL shortcuts with personalized names
- **Drag-and-Drop Sorting**: Easily reorder your links by dragging them to your preferred position
- **One-Click Access**: Open websites in new tabs with a single click
- **Clean, Dark UI**: Modern purple-themed dark interface that's easy on the eyes
- **Cross-Device Sync**: Your links sync across devices when signed into Chrome
- **Compact Design**: Toggle the input form to maximize space for your links
- **Responsive**: Works well on various screen sizes
- **Keyboard Shortcuts**: Press Enter to quickly add new URLs

## Installation

### From Source (Development)

1. Clone this repository:
   ```bash
   git clone https://github.com/Dan-Duran/linkr.git
   ```

2. Open Chrome/Edge and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top-right corner

4. Click "Load unpacked" and select the Linkr directory

### From Chrome Web Store (Coming Soon)

Simply visit the Chrome Web Store and install Linkr with one click.

## Usage

### Adding URLs

1. Click the purple "+" button in the top-right corner to expand the form
2. Enter a name for your link
3. Enter the complete URL (including https://)
4. Click "Add URL" or press Enter

### Opening Links

- Simply click on any of your created URL buttons to open that site in a new tab

### Organizing Links

- **Reordering**: Drag and drop any link to change its position
- **Editing**: Click the pencil icon to edit a link's name or URL
- **Deleting**: Click the trash icon to remove a link

### Tips & Tricks

- Use the Enter key while in the name or URL field to quickly add a new link
- Always include the protocol (https://) for proper URL validation
- Group related links together by dragging them next to each other

## Customization

While Linkr comes with a sleek purple-themed dark interface, you can modify the CSS files to match your preferred color scheme:

1. Open `popup.css` to change the main interface styling
2. Modify the color values (e.g., `#a938f4`) to your preferred colors
3. Reload the extension to see your changes

## Project Structure

```
linkr/
├── manifest.json       # Extension configuration
├── popup.html          # Main extension interface
├── popup.js            # Core functionality
├── popup.css           # Main UI styling
├── about.html          # Help and about page
├── about.css           # About page styling
├── about.js            # About page js
└── images/             # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Browser Compatibility

Linkr is built on the Manifest V3 specification and is compatible with:

- Google Chrome (version 88+)
- Microsoft Edge (version 88+)
- Other Chromium-based browsers with Manifest V3 support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Font Awesome for the icons
- Google Fonts for Poppins font
- Chrome Extensions API
- Iconfinder
