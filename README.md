# Watermark Extension for VS Code

A customizable VS Code extension that adds diagonal watermarks showing your current project's name in the background of your editor. Perfect for distinguishing multiple open workspaces or adding a visual project marker, inspired by watermark patterns like Naver's marketplace style.

## ✨ Features

- **Dynamic Watermark Generation**: Automatically creates watermarks based on project name length and screen size
- **Performance Optimized**: Uses DocumentFragment, CSS variables, and debounced resize events
- **Customizable Settings**: Full control over opacity, rotation, color, font size, and animations
- **Real-time Configuration**: Settings update instantly without restart
- **Performance Monitoring**: Optional FPS and watermark count display
- **Keyboard Shortcuts**: Toggle watermarks with `Cmd+Shift+W` (Mac) / `Ctrl+Shift+W` (Windows/Linux)
- **Hover Effects**: Hide watermarks when hovering over them
- **Responsive Design**: Adapts to different screen sizes and project name lengths

## 🚀 Installation

### From Source
1. Clone this repository
2. Install dependencies: `pnpm install`
3. Compile the extension: `pnpm run compile`
4. Press `F5` in VS Code to run the extension in development mode

### Building for Distribution
```bash
pnpm run package
```

## ⚙️ Configuration

All settings can be configured through VS Code's settings panel (`Cmd+,` / `Ctrl+,`) or directly in `settings.json`.

### Available Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `watermark.opacity` | number | 0.6 | Opacity of the watermark (0-1) |
| `watermark.rotationAngle` | number | -45 | Rotation angle in degrees (-90 to 90) |
| `watermark.textColor` | string | "rgba(100, 100, 100, 0.08)" | Color of the watermark text |
| `watermark.fontSize` | number | 2 | Font size multiplier (0.5-5) |
| `watermark.enableAnimation` | boolean | true | Enable floating animation |
| `watermark.enableHoverHide` | boolean | true | Hide watermark on hover |
| `watermark.enablePerformanceInfo` | boolean | false | Show performance metrics |

### Example Settings

```json
{
  "watermark.opacity": 0.8,
  "watermark.rotationAngle": -30,
  "watermark.textColor": "rgba(0, 0, 255, 0.1)",
  "watermark.fontSize": 1.5,
  "watermark.enableAnimation": true,
  "watermark.enableHoverHide": true,
  "watermark.enablePerformanceInfo": true
}
```

## 🎯 Usage

### Basic Usage
1. Open a workspace in VS Code
2. The extension automatically activates and displays watermarks
3. Use `Cmd+Shift+W` (Mac) or `Ctrl+Shift+W` (Windows/Linux) to toggle watermarks

### Advanced Features

#### Performance Monitoring
Enable performance monitoring to see real-time FPS and watermark count:
```json
{
  "watermark.enablePerformanceInfo": true
}
```

#### Custom Colors
Set custom watermark colors:
```json
{
  "watermark.textColor": "rgba(255, 0, 0, 0.1)"  // Red watermarks
}
```

#### Animation Control
Disable animations for better performance:
```json
{
  "watermark.enableAnimation": false
}
```

## 🔧 Development

### Project Structure
```
watermark/
├── src/
│   ├── extension.ts          # Main extension logic
│   └── test/
│       └── extension.test.ts # Comprehensive test suite
├── package.json              # Extension manifest
├── tsconfig.json            # TypeScript configuration
└── README.md               # This file
```

### Key Components

#### Watermark Generation Algorithm
- **Dynamic Spacing**: Calculates optimal spacing based on text length and font size
- **Grid Pattern**: Distributes watermarks in a grid with random offsets
- **Responsive Layout**: Adapts to screen size changes

#### Performance Optimizations
- **DocumentFragment**: Batch DOM operations for better performance
- **CSS Variables**: Efficient style updates without element iteration
- **Debounced Resize**: Prevents excessive recalculations on window resize
- **GPU Acceleration**: Uses `will-change` for smooth animations

#### Settings Integration
- **Real-time Updates**: Settings changes apply immediately
- **Type Safety**: Full TypeScript support for all settings
- **Validation**: Range validation for numeric settings

### Testing

Run the comprehensive test suite:
```bash
pnpm test
```

Tests cover:
- ✅ Watermark spacing calculations
- ✅ Count calculations for different screen sizes
- ✅ Settings validation
- ✅ Project name processing
- ✅ Performance optimizations
- ✅ Animation configurations
- ✅ Event handlers
- ✅ Debounce functions
- ✅ FPS measurements
- ✅ Position calculations
- ✅ Settings updates

## 🎨 Customization Examples

### Minimal Watermarks
```json
{
  "watermark.opacity": 0.3,
  "watermark.fontSize": 1,
  "watermark.enableAnimation": false
}
```

### Bold Watermarks
```json
{
  "watermark.opacity": 0.9,
  "watermark.fontSize": 3,
  "watermark.textColor": "rgba(0, 0, 0, 0.15)"
}
```

### Colorful Watermarks
```json
{
  "watermark.textColor": "rgba(255, 0, 255, 0.1)",
  "watermark.rotationAngle": 15
}
```

## 🐛 Troubleshooting

### Watermarks Not Showing
1. Check if the extension is activated
2. Verify workspace folder is open
3. Try toggling with `Cmd+Shift+W`

### Performance Issues
1. Disable animations: `"watermark.enableAnimation": false`
2. Reduce font size: `"watermark.fontSize": 1`
3. Lower opacity: `"watermark.opacity": 0.3`

### Settings Not Applying
1. Check VS Code settings panel
2. Restart VS Code
3. Verify JSON syntax in settings.json

## 📝 Changelog

### v0.0.1
- Initial release
- Dynamic watermark generation
- Performance optimizations
- Comprehensive test suite
- VS Code settings integration
- Real-time configuration updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by watermark patterns from Naver's marketplace
- Built with VS Code Extension API
- Performance optimizations based on modern web standards
- Test suite using vscode-test framework

---

**Made with ❤️ for the VS Code community**
