# Pocket Universe Division: Idle

_A big picture game about the small things._

An idle clicker game where you extract Data Shards from the Pocket Universe Division's computational resources. Build your extraction empire through strategic upgrades and boosts.

## 🎮 Game Features

- **Manual Extraction**: Click to extract Data Shards manually
- **Auto Extraction**: Build passive income with Coins Per Second (CPS) upgrades
- **Progressive Upgrades**: Unlock increasingly powerful extraction capabilities
- **Boost System**: Temporarily accelerate your progress with strategic boosts
- **Persistent Progress**: Your progress is automatically saved to localStorage
- **Dark/Light Theme**: Toggle between themes for your preferred experience
- **Responsive Design**: Play on desktop or mobile devices

## 🎯 How to Play

1. **Start Clicking**: Use the manual clicker in the Equipment section to extract Data Shards
2. **Upgrade Your Clicker**: Purchase click upgrades to increase your manual extraction rate
3. **Build Passive Income**: Invest in CPS upgrades for automatic Data Shard generation
4. **Strategic Boosts**: Use boosts to temporarily accelerate your progress during key moments
5. **Manage Resources**: Balance your spending between immediate upgrades and long-term investments

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```sh
git clone https://github.com/Kashinoga/pud-idle.git
cd pud-idle
```

2. Install dependencies:

```sh
npm install
```

3. Start the development server:

```sh
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run check` - Run TypeScript and Svelte checks
- `npm run format` - Format code with Prettier
- `npm run lint` - Check code formatting

### Project Structure

```
src/
├── app.css          # Global styles
├── app.d.ts         # TypeScript declarations
├── app.html         # Main HTML template
├── lib/
│   ├── components/  # Reusable Svelte components
│   ├── stores/      # Svelte stores (if any)
│   └── assets/      # Static assets
└── routes/
    ├── +layout.svelte   # App layout
    ├── +page.svelte     # Main game page
    └── inventory/       # Inventory view
```

### Technologies Used

- **Svelte 5** - Reactive UI framework with runes
- **SvelteKit** - Full-stack framework for Svelte
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server

## 🎨 Customization

The game uses a custom CSS framework with dark/light theme support. Theme colors and styles can be modified in `src/lib/global.css`.

## 📱 Deployment

This project is configured for deployment to Cloudflare Pages:

1. Build the project:

```sh
npm run build
```

2. The `build/` directory contains the production-ready files

The project is currently deployed at: coming soon...

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [SvelteKit](https://svelte.dev/docs/kit)
- Inspired by idle/incremental game mechanics
- Icons from various open-source collections

---

**Enjoy extracting Data Shards from the Pocket Universe!** 🗃️✨
