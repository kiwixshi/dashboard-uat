# Dashboard UAT

A scalable desktop application built with Electron and React, designed for UAT (User Acceptance Testing) dashboard functionality.

## 🚀 Features

- **Electron + React**: Modern desktop application architecture
- **TypeScript**: Type-safe development
- **Hot Reload**: Fast development cycle with hot module replacement
- **SQLite Integration**: Local database support for data persistence
- **Chart.js**: Data visualization with React Chart.js 2
- **Modern UI**: Built with React 19 and React Router DOM
- **Cross-Platform**: Builds for Windows, macOS, and Linux

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: >= 14.x
- **npm**: >= 7.x

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/kiwixshi/dashboard-uat.git
cd dashboard-uat
```

2. Install dependencies:
```bash
npm install
```

3. The postinstall script will automatically:
   - Check native dependencies
   - Install Electron app dependencies
   - Build development DLL files

## 🎯 Usage

### Development

Start the application in development mode with hot reload:

```bash
npm start
```

This command will:
- Check if the port is in use
- Build the main process
- Start the renderer process with webpack dev server

### Building

Build the application for production:

```bash
npm run build
```

This creates optimized builds for both the main and renderer processes.

### Packaging

Package the application for distribution:

```bash
npm run package
```

This will:
- Clean the dist directory
- Build the application
- Create distributable packages for your platform
- Output files to `release/build`

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the application in development mode |
| `npm run build` | Build both main and renderer processes |
| `npm run package` | Package the app for distribution |
| `npm run lint` | Lint the codebase |
| `npm run lint:fix` | Lint and auto-fix issues |
| `npm test` | Run tests with Jest |
| `npm run rebuild` | Rebuild native modules (sqlite3) |

## 🏗️ Project Structure

```
dashboard-uat/
├── assets/              # Application assets and resources
├── release/             # Build output directory
│   ├── app/            # Application bundle
│   └── build/          # Distribution files
├── src/                # Source code
│   ├── main/           # Electron main process
│   ├── renderer/       # React renderer process
│   └── preload/        # Preload scripts
├── .erb/               # Electron React Boilerplate configuration
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## 🔑 Key Technologies

- **[Electron](https://www.electronjs.org/)**: ^35.0.2 - Desktop application framework
- **[React](https://reactjs.org/)**: ^19.0.0 - UI library
- **[TypeScript](https://www.typescriptlang.org/)**: ^5.8.2 - Type-safe JavaScript
- **[Webpack](https://webpack.js.org/)**: ^5.98.0 - Module bundler
- **[SQLite3](https://www.npmjs.com/package/sqlite3)**: ^5.1.7 - Local database
- **[Chart.js](https://www.chartjs.org/)**: ^4.5.0 - Data visualization
- **[React Router DOM](https://reactrouter.com/)**: ^7.3.0 - Routing

## 🐛 Debugging

The application includes electron-debug for easier debugging in development mode.

## 📦 Distribution

The build configuration supports creating installers for:

- **Windows**: NSIS installer
- **macOS**: DMG (supports both arm64 and x64)
- **Linux**: AppImage

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.MD](LICENSE.MD) file for details.

## 👤 Author

**Shivani Balaji**
- GitHub: [@kiwixshi](https://github.com/kiwixshi)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 Notes

This project is built on the [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) foundation, providing a solid base for scalable desktop applications.

---

Built with ❤️ using Electron and React
