import type { DocSection } from './types';

const suggestedLibraries: DocSection = {
    id: 'suggested-libraries',
    title: 'Suggested Libraries',
    group: 'Reference',
    blocks: [
        {
            type: 'heading',
            level: 1,
            id: 'suggested-libraries',
            text: 'Suggested Libraries',
        },
        {
            type: 'paragraph',
            html: 'This page lists the UI libraries, packages, and tools already used in the project, plus additional recommendations that pair well with the current stack.',
        },

        // ── Already Included ─────────────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'already-installed',
            text: 'Already Installed',
        },
        {
            type: 'paragraph',
            html: 'These packages are installed and ready to use in the project right now:',
        },
        {
            type: 'table',
            headers: ['Package', 'Category', 'Usage'],
            rows: [
                ['shadcn/ui', 'UI Components', 'Copy-paste component library built on Radix UI. Components live in resources/js/components/ui/'],
                ['Radix UI', 'Headless UI', 'Accessible, unstyled primitives (dialog, dropdown, tooltip, etc.) — used by shadcn/ui'],
                ['TailwindCSS v4', 'Styling', 'Utility-first CSS framework — the default styling system'],
                ['Lucide React', 'Icons', 'Beautiful, consistent SVG icon library'],
                ['Headless UI', 'UI Primitives', 'Accessible UI components from the Tailwind team'],
                ['Inertia.js', 'SPA Bridge', 'Connects Laravel controllers to React pages without a separate API'],
                ['Vite 7', 'Build Tool', 'Lightning-fast HMR for frontend development'],
                ['TypeScript 5', 'Language', 'Static typing for the entire frontend'],
                ['class-variance-authority', 'Styling', 'Type-safe variant management for component styles'],
                ['clsx + tailwind-merge', 'Styling', 'Conditional class merging utilities'],
                ['Laravel Fortify', 'Auth', 'Headless authentication for Laravel (login, register, 2FA, etc.)'],
                ['Laravel Wayfinder', 'Routing', 'Auto-generated TypeScript route helpers from PHP routes'],
                ['tw-animate-css', 'Animation', 'Tailwind-compatible CSS animation utilities'],
            ],
        },

        // ── shadcn/ui Deep Dive ───────────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'shadcn-ui',
            text: 'shadcn/ui — Component System',
        },
        {
            type: 'paragraph',
            html: '<strong>shadcn/ui</strong> is not a traditional npm library — it is a collection of copy-paste components built on top of Radix UI and Tailwind. Components are copied into your project and are fully customizable.',
        },
        {
            type: 'callout',
            variant: 'tip',
            title: 'Components Live in Your Codebase',
            html: 'All shadcn components are in <code>resources/js/components/ui/</code>. You own the code — edit them freely without worrying about upstream breaking changes.',
        },
        {
            type: 'heading',
            level: 3,
            id: 'shadcn-add-component',
            text: 'Adding a New Component',
        },
        {
            type: 'code',
            language: 'bash',
            code: `# Add a single component
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add data-table

# Browse all available components
# https://ui.shadcn.com/docs/components`,
        },
        {
            type: 'heading',
            level: 3,
            id: 'shadcn-available',
            text: 'Available Components in Project',
        },
        {
            type: 'table',
            headers: ['Component', 'File', 'Description'],
            rows: [
                ['Button', 'ui/button.tsx', 'Styled button with variants'],
                ['Card', 'ui/card.tsx', 'Content container with header/body/footer'],
                ['Dialog', 'ui/dialog.tsx', 'Modal dialog with overlay'],
                ['Dropdown Menu', 'ui/dropdown-menu.tsx', 'Context/action menus'],
                ['Input', 'ui/input.tsx', 'Text input field'],
                ['Label', 'ui/label.tsx', 'Accessible form label'],
                ['Select', 'ui/select.tsx', 'Accessible select dropdown'],
                ['Separator', 'ui/separator.tsx', 'Visual divider line'],
                ['Tooltip', 'ui/tooltip.tsx', 'Hover tooltip'],
                ['Avatar', 'ui/avatar.tsx', 'User avatar with fallback initials'],
                ['Checkbox', 'ui/checkbox.tsx', 'Styled checkbox input'],
                ['Toggle / Toggle Group', 'ui/toggle.tsx', 'Toggle button and groups'],
                ['Collapsible', 'ui/collapsible.tsx', 'Expand/collapse sections'],
                ['Navigation Menu', 'ui/navigation-menu.tsx', 'Accessible nav with dropdowns'],
            ],
        },

        // ── Recommended to Add ────────────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'recommended-additions',
            text: 'Recommended Additions',
        },
        {
            type: 'paragraph',
            html: 'These packages are <strong>not yet installed</strong> but integrate naturally with the current stack:',
        },
        {
            type: 'heading',
            level: 3,
            id: 'data-tables',
            text: 'Data Tables',
        },
        {
            type: 'table',
            headers: ['Package', 'Install', 'Description'],
            rows: [
                ['TanStack Table v8', 'npm install @tanstack/react-table', 'Headless, highly performant data table engine. Pair with the shadcn DataTable component.'],
                ['shadcn DataTable', 'npx shadcn@latest add data-table', 'Pre-built table UI on top of TanStack Table with sorting, filtering, and pagination.'],
            ],
        },
        {
            type: 'heading',
            level: 3,
            id: 'forms',
            text: 'Forms & Validation',
        },
        {
            type: 'table',
            headers: ['Package', 'Install', 'Description'],
            rows: [
                ['React Hook Form', 'npm install react-hook-form', 'Performant, minimal re-renders form state management.'],
                ['Zod', 'npm install zod', 'TypeScript-first schema validation. Pair with RHF using @hookform/resolvers.'],
                ['@hookform/resolvers', 'npm install @hookform/resolvers', 'Adapter to use Zod (or Yup) schemas with React Hook Form.'],
            ],
        },
        {
            type: 'code',
            language: 'bash',
            code: `npm install react-hook-form zod @hookform/resolvers`,
        },
        {
            type: 'heading',
            level: 3,
            id: 'charts',
            text: 'Charts & Data Visualization',
        },
        {
            type: 'table',
            headers: ['Package', 'Install', 'Description'],
            rows: [
                ['Recharts', 'npm install recharts', 'Composable chart library built on D3. Excellent shadcn/ui integration with shadcn Chart component.'],
                ['shadcn Chart', 'npx shadcn@latest add chart', 'Recharts wrapper with Tailwind theming and tooltips.'],
            ],
        },
        {
            type: 'heading',
            level: 3,
            id: 'dates',
            text: 'Date Handling',
        },
        {
            type: 'table',
            headers: ['Package', 'Install', 'Description'],
            rows: [
                ['date-fns', 'npm install date-fns', 'Lightweight, modular date utility library — the modern alternative to Moment.js.'],
                ['React Day Picker', 'npm install react-day-picker', 'Date/range picker component. Powers the shadcn Calendar component.'],
                ['shadcn Calendar', 'npx shadcn@latest add calendar', 'Date picker built on React Day Picker with full Tailwind styling.'],
            ],
        },
        {
            type: 'heading',
            level: 3,
            id: 'notifications',
            text: 'Notifications & Toasts',
        },
        {
            type: 'table',
            headers: ['Package', 'Install', 'Description'],
            rows: [
                ['Sonner', 'npm install sonner', 'Beautiful, composable toast notifications. Native shadcn/ui integration.'],
                ['shadcn Sonner', 'npx shadcn@latest add sonner', 'Sonner toast component with project theming applied.'],
            ],
        },
        {
            type: 'code',
            language: 'tsx',
            code: `import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

// In your root layout:
<Toaster />

// Anywhere in your app:
toast.success('Record saved successfully!');
toast.error('Something went wrong.');`,
        },
        {
            type: 'heading',
            level: 3,
            id: 'php-backend',
            text: 'PHP / Backend',
        },
        {
            type: 'table',
            headers: ['Package', 'Install', 'Description'],
            rows: [
                ['Spatie Laravel Permission', 'composer require spatie/laravel-permission', 'Roles and permissions management. Assign roles to users, guard routes by role/permission.'],
                ['Spatie Laravel Media Library', 'composer require spatie/laravel-medialibrary', 'Powerful file/media attachment library. Handles conversions, collections, and responsive images.'],
                ['Spatie Laravel Activity Log', 'composer require spatie/laravel-activitylog', 'Automatic model change logging. Great for audit trails.'],
                ['Laravel Telescope', 'composer require laravel/telescope --dev', 'Debug assistant showing requests, queries, jobs, exceptions in a local dashboard.'],
                ['Laravel Horizon', 'composer require laravel/horizon', 'Redis-backed queue monitoring dashboard (replace database queue driver for production scale).'],
            ],
        },

        // ── Dev Tools ─────────────────────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'dev-tools',
            text: 'Developer Tools',
        },
        {
            type: 'table',
            headers: ['Tool', 'Purpose'],
            rows: [
                ['Laravel Pint', 'PHP code style fixer — run: composer run lint'],
                ['ESLint + Prettier', 'JS/TS code linting and formatting — run: npm run lint'],
                ['TypeScript Compiler', 'Type checking without building — run: npm run types:check'],
                ['Laravel Pail', 'Real-time log streaming in the terminal (included in dev script)'],
                ['PHPUnit', 'PHP unit and feature tests — run: php artisan test'],
            ],
        },
        {
            type: 'callout',
            variant: 'tip',
            title: 'Run All Checks',
            html: 'Run <code>composer run ci:check</code> to execute lint, format, type, and test checks all at once — the same pipeline used in CI.',
        },
    ],
};

export default suggestedLibraries;
