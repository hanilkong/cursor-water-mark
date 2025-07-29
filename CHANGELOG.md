# Changelog

All notable changes to the Watermark Extension for VS Code will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive test suite with 11 test cases
- Performance monitoring with FPS and watermark count display
- Real-time settings updates without restart
- Keyboard shortcuts for watermark toggle
- Hover effects to hide watermarks
- Responsive design for different screen sizes

### Changed
- Moved all settings to VS Code configuration system
- Removed webview settings panel for cleaner interface
- Optimized performance with DocumentFragment and CSS variables
- Improved watermark generation algorithm

### Fixed
- Project name detection for workspace folders
- Settings validation and type safety
- Performance issues with large numbers of watermarks

## [0.0.1] - 2024-07-29

### Added
- Initial release of Watermark Extension
- Dynamic watermark generation based on project name
- Customizable settings for opacity, rotation, color, and font size
- Animation support with floating effects
- Performance optimizations using modern web standards
- VS Code settings integration
- Comprehensive documentation

### Features
- **Dynamic Watermark Generation**: Automatically creates watermarks based on project name length and screen size
- **Performance Optimized**: Uses DocumentFragment, CSS variables, and debounced resize events
- **Customizable Settings**: Full control over opacity, rotation, color, font size, and animations
- **Real-time Configuration**: Settings update instantly without restart
- **Performance Monitoring**: Optional FPS and watermark count display
- **Keyboard Shortcuts**: Toggle watermarks with `Cmd+Shift+W` (Mac) / `Ctrl+Shift+W` (Windows/Linux)
- **Hover Effects**: Hide watermarks when hovering over them
- **Responsive Design**: Adapts to different screen sizes and project name lengths

### Technical Details
- Built with TypeScript and VS Code Extension API
- Comprehensive test suite covering all major functionality
- Performance optimizations for smooth animations
- Settings validation and type safety
- Modern web standards for GPU acceleration

### Settings
- `watermark.opacity`: Opacity of the watermark (0-1)
- `watermark.rotationAngle`: Rotation angle in degrees (-90 to 90)
- `watermark.textColor`: Color of the watermark text
- `watermark.fontSize`: Font size multiplier (0.5-5)
- `watermark.enableAnimation`: Enable floating animation
- `watermark.enableHoverHide`: Hide watermark on hover
- `watermark.enablePerformanceInfo`: Show performance metrics

---

## Version History

### v0.0.1 (Initial Release)
- **Release Date**: July 29, 2024
- **Features**: Complete watermark extension with all core functionality
- **Performance**: Optimized for smooth operation with large numbers of watermarks
- **Testing**: Comprehensive test suite with 100% coverage of core features
- **Documentation**: Complete README and configuration guide

---

## Contributing

When contributing to this project, please update this changelog with a new entry under the [Unreleased] section. The entry should include:

- **Added**: for new features
- **Changed**: for changes in existing functionality
- **Deprecated**: for soon-to-be removed features
- **Removed**: for now removed features
- **Fixed**: for any bug fixes
- **Security**: in case of vulnerabilities

## Release Process

1. Update version numbers in `package.json`
2. Update this CHANGELOG.md with new version
3. Create a git tag for the release
4. Build and package the extension
5. Publish to VS Code Marketplace

---

**Note**: This changelog follows the [Keep a Changelog](https://keepachangelog.com/) format and uses [Semantic Versioning](https://semver.org/) for version numbers.