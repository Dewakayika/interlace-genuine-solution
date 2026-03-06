import type { DocSection } from './types';

const introduction: DocSection = {
    id: 'introduction',
    title: 'Introduction',
    group: 'Getting Started',
    blocks: [
        {
            type: 'heading',
            level: 1,
            id: 'introduction',
            text: 'Introduction',
        },
        {
            type: 'paragraph',
            html: '<strong>Genuine Solution</strong> is a full-stack web application built for Interlace Studies. It combines the robustness of <strong>Laravel 12</strong> on the backend with the reactivity of <strong>React 19</strong> on the frontend, bridged seamlessly by <strong>Inertia.js</strong>. The result is a modern, single-page-app experience without the complexity of a separate API layer.',
        },
        {
            type: 'callout',
            variant: 'info',
            title: 'What is Inertia.js?',
            html: 'Inertia.js is the glue between Laravel and React. It lets you write classic server-side routes and controllers in Laravel, while rendering React components on the client — no REST API or GraphQL required.',
        },
        {
            type: 'heading',
            level: 2,
            id: 'tech-stack',
            text: 'Technology Stack',
        },
        {
            type: 'table',
            headers: ['Layer', 'Technology', 'Version'],
            rows: [
                ['Backend Framework', 'Laravel', '12.x'],
                ['Frontend Framework', 'React', '19.x'],
                ['SPA Bridge', 'Inertia.js', '2.x'],
                ['Language', 'TypeScript', '5.x'],
                ['Styling', 'TailwindCSS', '4.x'],
                ['UI Components', 'shadcn/ui + Radix UI', 'Latest'],
                ['Build Tool', 'Vite', '7.x'],
                ['Database', 'MySQL', '8.x'],
                ['Auth', 'Laravel Fortify', '1.x'],
                ['PHP', 'PHP', '8.2+'],
            ],
        },
        {
            type: 'heading',
            level: 2,
            id: 'key-features',
            text: 'Key Features',
        },
        {
            type: 'paragraph',
            html: 'Genuine Solution ships with the following features out of the box:',
        },
        {
            type: 'paragraph',
            html: `<ul class="list-disc list-inside space-y-2 ml-2">
  <li><strong>Authentication</strong> — Register, login, email verification, password reset via Fortify</li>
  <li><strong>Two-Factor Authentication (2FA)</strong> — TOTP-based 2FA with QR code setup and recovery codes</li>
  <li><strong>Dashboard</strong> — Protected admin area accessible after login</li>
  <li><strong>Profile Settings</strong> — Update profile info, change password, manage 2FA</li>
  <li><strong>Client Applications</strong> — Full CRUD for managing client applications with activities, notes, and documents</li>
  <li><strong>Document Uploads</strong> — File upload with storage management per record</li>
  <li><strong>Dark Mode</strong> — System-aware dark/light mode toggle</li>
  <li><strong>Queue Support</strong> — Database-backed job queue for async processing</li>
  <li><strong>Docker Ready</strong> — Run on any OS with a single <code>docker compose up</code></li>
</ul>`,
        },
        {
            type: 'heading',
            level: 2,
            id: 'project-structure-overview',
            text: 'Project Structure Overview',
        },
        {
            type: 'code',
            language: 'bash',
            code: `genuine-solution/
├── app/                    # PHP application layer
│   ├── Http/Controllers/   # Request handlers
│   ├── Models/             # Eloquent models
│   └── Providers/          # Service providers
├── database/
│   ├── migrations/         # DB schema changes
│   ├── factories/          # Model factories
│   └── seeders/            # Seed data
├── resources/
│   ├── css/                # Global styles
│   └── js/                 # React + TypeScript frontend
│       ├── components/     # Reusable UI components
│       ├── documentation/  # 📖 This documentation
│       ├── layouts/        # Page layout wrappers
│       ├── pages/          # Inertia page components
│       └── types/          # TypeScript type definitions
├── routes/
│   ├── web.php             # Web routes
│   └── settings.php        # Settings routes
├── docker/                 # Docker config files
├── Dockerfile
├── docker-compose.yml
└── .env.example`,
        },
        {
            type: 'heading',
            level: 2,
            id: 'next-steps',
            text: 'Next Steps',
        },
        {
            type: 'paragraph',
            html: 'Choose your operating system to get started:',
        },
        {
            type: 'paragraph',
            html: `<ul class="space-y-2 ml-2">
  <li>🪟 <strong>Windows users</strong> — Follow the <a href="#installation-windows" class="text-emerald-600 dark:text-emerald-400 underline underline-offset-2 hover:text-emerald-500">Windows Installation</a> guide for a native local setup.</li>
  <li>🍎 <strong>macOS users</strong> — Follow the <a href="#installation-macos-docker" class="text-emerald-600 dark:text-emerald-400 underline underline-offset-2 hover:text-emerald-500">macOS Installation via Docker</a> guide for the recommended container-based setup.</li>
</ul>`,
        },
    ],
};

export default introduction;
