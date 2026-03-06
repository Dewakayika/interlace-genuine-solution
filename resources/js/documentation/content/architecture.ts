import type { DocSection } from './types';

const architecture: DocSection = {
    id: 'architecture',
    title: 'Architecture',
    group: 'Architecture',
    blocks: [
        {
            type: 'heading',
            level: 1,
            id: 'architecture',
            text: 'Architecture',
        },
        {
            type: 'paragraph',
            html: 'Genuine Solution follows the <strong>MVC (Model–View–Controller)</strong> pattern established by Laravel, extended with a React frontend via Inertia.js. This page explains how all the layers fit together.',
        },
        {
            type: 'callout',
            variant: 'info',
            title: 'Server-Side Rendering with Inertia.js',
            html: 'Unlike a traditional REST API + SPA setup, Inertia.js lets the server "drive" the UI. Laravel controllers decide which React component (view) to render and pass typed data as props — no JSON serialization layer needed.',
        },

        // ── Overview diagram ─────────────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'architecture-overview',
            text: 'Request Flow Overview',
        },
        {
            type: 'code',
            language: 'text',
            code: `Browser Request
      │
      ▼
  routes/web.php          ← Defines URL → Controller mapping
      │
      ▼
  HTTP Controller         ← Validates, orchestrates, calls services/models
      │
      ├── Eloquent Model  ← Queries the MySQL database
      │
      └── Inertia::render('PageName', $data)
                │
                ▼
          React Component ← Receives $data as typed props
                │
                ▼
           Browser DOM    ← Rendered HTML with client-side interactivity`,
        },

        // ── Models ───────────────────────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'architecture-models',
            text: 'Models',
        },
        {
            type: 'paragraph',
            html: 'Models live in <code>app/Models/</code> and represent database tables via <strong>Eloquent ORM</strong>. Each model maps to a table and provides a fluent API for querying, creating, updating, and deleting records.',
        },
        {
            type: 'table',
            headers: ['Model', 'Table', 'Description'],
            rows: [
                ['User', 'users', 'Authenticated user accounts with 2FA support'],
                ['Session', 'sessions', 'Active user sessions (DB-backed driver)'],
                ['Job', 'jobs', 'Queued background jobs'],
                ['Cache', 'cache', 'Database cache entries'],
            ],
        },
        {
            type: 'heading',
            level: 3,
            id: 'models-example',
            text: 'Example: Eloquent Model',
        },
        {
            type: 'code',
            language: 'php',
            filename: 'app/Models/User.php',
            code: `<?php

namespace App\\Models;

use Illuminate\\Foundation\\Auth\\User as Authenticatable;

class User extends Authenticatable
{
    // Columns that can be mass-assigned
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    // Columns hidden from JSON serialization
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Type casting
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }
}`,
        },
        {
            type: 'heading',
            level: 3,
            id: 'models-migrations',
            text: 'Migrations',
        },
        {
            type: 'paragraph',
            html: 'Database schema is managed through <strong>migrations</strong> in <code>database/migrations/</code>. Run <code>php artisan migrate</code> to apply pending migrations, or <code>php artisan migrate:fresh --seed</code> to reset and re-seed the database.',
        },
        {
            type: 'code',
            language: 'bash',
            code: `# Apply all pending migrations
php artisan migrate

# Roll back the last migration batch
php artisan migrate:rollback

# Create a new migration
php artisan make:migration create_clients_table`,
        },

        // ── Controllers ───────────────────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'architecture-controllers',
            text: 'Controllers',
        },
        {
            type: 'paragraph',
            html: 'Controllers live in <code>app/Http/Controllers/</code> and handle incoming HTTP requests. They validate input, interact with models, and return Inertia responses (which render React components).',
        },
        {
            type: 'table',
            headers: ['Controller', 'Responsibility'],
            rows: [
                ['Auth/AuthenticatedSessionController', 'Login / logout logic'],
                ['Auth/RegisteredUserController', 'New user registration'],
                ['Auth/PasswordResetLinkController', 'Password reset emails'],
                ['Settings/ProfileController', 'Profile update, account deletion'],
                ['Settings/PasswordController', 'Change password'],
                ['TwoFactorController', '2FA setup, QR codes, recovery codes'],
            ],
        },
        {
            type: 'heading',
            level: 3,
            id: 'controllers-example',
            text: 'Example: Inertia Controller',
        },
        {
            type: 'code',
            language: 'php',
            filename: 'app/Http/Controllers/DashboardController.php',
            code: `<?php

namespace App\\Http\\Controllers;

use Inertia\\Inertia;
use Inertia\\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'totalUsers' => User::count(),
            ],
        ]);
    }
}`,
        },
        {
            type: 'paragraph',
            html: 'The array passed to <code>Inertia::render()</code> becomes the <strong>props</strong> of the React component. TypeScript types in <code>resources/js/types/</code> keep both sides in sync.',
        },

        // ── Views (React) ─────────────────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'architecture-views',
            text: 'Views (React + Inertia)',
        },
        {
            type: 'paragraph',
            html: 'In this stack, "views" are <strong>React components</strong> in <code>resources/js/pages/</code>. Inertia automatically matches the name string from <code>Inertia::render(\'dashboard\')</code> to <code>resources/js/pages/dashboard.tsx</code>.',
        },
        {
            type: 'table',
            headers: ['Page File', 'Route', 'Description'],
            rows: [
                ['pages/welcome.tsx', '/', 'Public landing / marketing page'],
                ['pages/dashboard.tsx', '/dashboard', 'Protected app dashboard'],
                ['pages/documentation.tsx', '/documentation', 'This documentation site'],
                ['pages/auth/login.tsx', '/login', 'Login form'],
                ['pages/auth/register.tsx', '/register', 'Registration form'],
                ['pages/settings/profile.tsx', '/settings/profile', 'Profile settings'],
                ['pages/settings/password.tsx', '/settings/password', 'Password change'],
                ['pages/settings/appearance.tsx', '/settings/appearance', 'Dark/light mode'],
            ],
        },
        {
            type: 'heading',
            level: 3,
            id: 'views-example',
            text: 'Example: Inertia Page Component',
        },
        {
            type: 'code',
            language: 'tsx',
            filename: 'resources/js/pages/dashboard.tsx',
            code: `import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Props come directly from the PHP controller
interface Props {
    stats: {
        totalUsers: number;
    };
}

export default function Dashboard({ stats }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
            <Head title="Dashboard" />
            <div className="p-6">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p>Total users: {stats.totalUsers}</p>
            </div>
        </AppLayout>
    );
}`,
        },

        // ── Route Registration ────────────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'architecture-routes',
            text: 'Routes',
        },
        {
            type: 'paragraph',
            html: 'Routes are defined in <code>routes/web.php</code>. For simple pages, <code>Route::inertia()</code> is a shortcut that renders a component without a dedicated controller:',
        },
        {
            type: 'code',
            language: 'php',
            filename: 'routes/web.php',
            code: `<?php

use Illuminate\\Support\\Facades\\Route;

// Public routes
Route::inertia('/', 'welcome')->name('home');
Route::inertia('documentation', 'documentation')->name('documentation');

// Protected routes (auth + email verified)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('clients', [ClientController::class, 'index'])->name('clients.index');
});

require __DIR__.'/settings.php';`,
        },
        {
            type: 'callout',
            variant: 'tip',
            title: 'Wayfinder — Type-safe Route Helpers',
            html: 'This project uses <strong>Laravel Wayfinder</strong>, which auto-generates TypeScript route helpers from your PHP routes. Import and call them as functions: <code>import { dashboard } from \'@/routes\';</code> then use <code>href={dashboard()}</code> in links.',
        },
    ],
};

export default architecture;
