# Niral-Verse 2K26 🌐

**Niral-Verse 2K26** is a futuristic, immersive web portal designed for the annual tech fest conducted by the **Department of Computer Applications (BCA Sunstone)** at **Hindustan College of Arts & Science**.

This application features a high-fidelity Sci-Fi/Cyberpunk aesthetic, leveraging advanced animations and particle effects to create an engaging user experience for students registering for events.

## ✨ Key Features

- **Cinematic Entrance**: A particle-rich welcome screen with an orchestrated GSAP logo reveal.
- **Command Deck Hero**: A futuristic HUD (Heads-Up Display) interface featuring:
  - Digital Rain background effects.
  - Live Countdown timer to the event date.
  - Holographic glass panels with institution details.
- **Immersive Navigation**: "Warp speed" transition effects accompanied by sound design when navigating between sections.
- **Event Dashboard**:
  - Categorized browsing (Technical vs. Non-Technical).
  - Detailed "Event Protocols" (descriptions, rules, team size).
  - RPG-style "NPC" Event Heads with unique avatars and dialogue.
- **Registration System**:
  - Dynamic forms handling both solo and team-based inputs.
  - Validation for college details and duplicate emails.
- **Cyberpunk UI/UX**:
  - Custom magnetic cursor with lag effects.
  - Film grain overlays.
  - Neon glow typography and glassmorphism design.

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [GSAP (GreenSock Animation Platform)](https://gsap.com/)
- **Visuals**: [tsparticles](https://particles.js.org/) (Digital rain & starfields)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Avatars**: [DiceBear Avatars](https://www.dicebear.com/)
- **Fonts**: Orbitron & Share Tech Mono (Google Fonts)

## 📂 Project Structure

```text
/
├── index.html                  # Entry point, CDN imports, Tailwind Config
├── index.tsx                   # React Root mount
├── App.tsx                     # Main Application Layout
├── metadata.json               # Project metadata
└── components/
    ├── WelcomeScreen.tsx       # Initial intro with logos
    ├── CommandDeckHero.tsx     # Main HUD landing page
    ├── MainContent.tsx         # Logic for switching between views
    ├── ParticlesBackground.tsx # tsparticles configuration
    ├── UIEffects.tsx           # Custom cursor and grain overlay
    ├── data/
    │   └── events.ts           # Event data configuration (modify events here)
    ├── dashboard/
    │   └── DashboardSection.tsx# Main event browsing interface
    ├── events/
    │   ├── EventZone.tsx       # Individual event detail view
    │   └── EventListItem.tsx   # List item component
    ├── modals/
    │   ├── NPCModal.tsx        # Event Head interaction modal
    │   ├── RegistrationFormModal.tsx
    │   └── RegistrationConfirmModal.tsx
    ├── transitions/
    │   ├── ArrivalCutscene.tsx
    │   └── TravelSequence.tsx
    └── ui/
        └── CustomScrollbar.tsx
```

## 🚀 Usage

This project utilizes **ES Modules** via CDN imports (`esm.sh`) defined in the `index.html` import map. This allows the application to run directly in modern browsers without a complex build step, though a local server is required to handle module loading.

### Running Locally

1.  **Clone the repository** (or download the files).
2.  **Serve the directory** using any static file server.
    *   *Using Python:* `python3 -m http.server 8000`
    *   *Using Node:* `npx serve .`
    *   *VS Code:* Use the "Live Server" extension.
3.  Open `http://localhost:8000` in your browser.

## 🎨 Customization

- **Events Data**: To add, remove, or modify events, edit `components/data/events.ts`.
- **Theme Colors**: Defined in `index.html` under the `tailwind.config` script block.
- **Hero Content**: Institution details and countdown logic are located in `components/CommandDeckHero.tsx`.

## 🏆 Credits

**Conducted By:**
Department of Computer Applications (BCA Sunstone)
Hindustan College of Arts & Science, Chennai.

---
*Optimized for Desktop Interfaces*