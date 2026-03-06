import type { DocSection } from './types';

const installationMacosDocker: DocSection = {
    id: 'installation-macos-docker',
    title: 'Installation — macOS (Docker)',
    group: 'Getting Started',
    blocks: [
        {
            type: 'heading',
            level: 1,
            id: 'installation-macos-docker',
            text: 'Installation — macOS via Docker',
        },
        {
            type: 'paragraph',
            html: 'This guide uses <strong>Docker</strong> to run Genuine Solution on macOS. Docker bundles PHP, MySQL, and Nginx into containers — no local PHP or database installation required. This is the recommended approach for macOS users.',
        },
        {
            type: 'callout',
            variant: 'tip',
            title: 'Works on Apple Silicon (M1/M2/M3/M4)',
            html: 'The Docker setup fully supports Apple Silicon Macs. Docker Desktop automatically uses the correct ARM64 image layers.',
        },

        // ── Required Apps ──────────────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'macos-required-apps',
            text: 'Required Applications',
        },
        {
            type: 'paragraph',
            html: 'You only need a small set of tools installed on your Mac. Docker handles PHP, MySQL, and Nginx for you inside containers.',
        },
        {
            type: 'app-list',
            apps: [
                {
                    name: 'Docker Desktop for Mac',
                    version: '4.x or later',
                    url: 'https://www.docker.com/products/docker-desktop/',
                    description:
                        'Runs the application containers (PHP, MySQL, Nginx). Choose the correct download for your chip: Apple Silicon (M1/M2/M3/M4) or Intel. Must be running before you start.',
                    required: true,
                },
                {
                    name: 'Git',
                    version: 'Latest',
                    url: 'https://git-scm.com/download/mac',
                    description:
                        'Version control. macOS ships with a Git stub — install the full version via Homebrew: <code>brew install git</code>, or install Xcode Command Line Tools: <code>xcode-select --install</code>.',
                    required: true,
                },
                {
                    name: 'Homebrew',
                    version: 'Latest',
                    url: 'https://brew.sh/',
                    description:
                        'macOS package manager. Used to install Git and other developer tools. Install with: <code>/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</code>',
                    required: false,
                },
                {
                    name: 'Visual Studio Code',
                    version: 'Latest',
                    url: 'https://code.visualstudio.com/',
                    description:
                        'Recommended code editor. Install the Docker, PHP, TypeScript, ESLint, and Tailwind CSS IntelliSense extensions for the best experience.',
                    required: false,
                },
                {
                    name: 'TablePlus',
                    version: 'Latest',
                    url: 'https://tableplus.com/',
                    description:
                        'GUI database client for connecting to the MySQL container. Free tier is sufficient. Connect to <code>127.0.0.1:3306</code> with the credentials from your <code>.env</code> file.',
                    required: false,
                },
                {
                    name: 'iTerm2',
                    version: 'Latest',
                    url: 'https://iterm2.com/',
                    description:
                        'Enhanced terminal for macOS. Optional, but recommended over the default Terminal app for a better developer experience.',
                    required: false,
                },
            ],
        },

        // ── Verify Prerequisites ────────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'macos-verify',
            text: 'Verify Installations',
        },
        {
            type: 'paragraph',
            html: 'Open <strong>Terminal</strong> (or iTerm2) and verify Docker is running:',
        },
        {
            type: 'code',
            language: 'bash',
            code: `docker --version
# Docker version 27.x.x

docker compose version
# Docker Compose version v2.x.x

git --version
# git version 2.x.x`,
        },
        {
            type: 'callout',
            variant: 'warning',
            title: 'Docker Desktop Must Be Running',
            html: 'Open Docker Desktop from your Applications folder before running any <code>docker</code> commands. You should see the whale icon in your menu bar.',
        },

        // ── Installation Steps ──────────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'macos-steps',
            text: 'Installation Steps',
        },
        {
            type: 'step-list',
            steps: [
                {
                    number: 1,
                    title: 'Clone the Repository',
                    html: 'Clone the project to your local machine:',
                    code: {
                        type: 'code',
                        language: 'bash',
                        code: `git clone https://github.com/your-org/genuine-solution.git
cd genuine-solution`,
                    },
                },
                {
                    number: 2,
                    title: 'Copy the Environment File',
                    html: 'Create your local <code>.env</code> from the Docker-ready example template:',
                    code: {
                        type: 'code',
                        language: 'bash',
                        code: `cp .env.example .env`,
                    },
                },
                {
                    number: 3,
                    title: 'Review Environment Variables',
                    html: 'The <code>.env.example</code> is pre-configured for Docker. Verify these Docker-specific settings are present in your <code>.env</code>:',
                    code: {
                        type: 'code',
                        language: 'ini',
                        filename: '.env',
                        code: `APP_URL=http://localhost:8080

DB_CONNECTION=mysql
DB_HOST=db            # ← "db" is the Docker service name, not localhost
DB_PORT=3306
DB_DATABASE=genuine_solution
DB_USERNAME=genuine
DB_PASSWORD=secret

NGINX_PORT=8080       # ← host port the app will be served on`,
                    },
                },
                {
                    number: 4,
                    title: 'Build & Start the Containers',
                    html: 'Build the Docker image and start all services. The first build downloads base images and installs dependencies — expect <strong>3–5 minutes</strong>.',
                    code: {
                        type: 'code',
                        language: 'bash',
                        code: `docker compose up --build`,
                    },
                },
                {
                    number: 5,
                    title: 'Open the Application',
                    html: 'Once you see <code>Ready — starting PHP-FPM</code> in the logs, open the app in your browser:',
                    code: {
                        type: 'code',
                        language: 'bash',
                        code: `open http://localhost:8080`,
                    },
                },
            ],
        },
        {
            type: 'callout',
            variant: 'tip',
            title: 'Background Mode',
            html: 'Run containers in the background with <code>docker compose up -d --build</code>. View logs anytime with <code>docker compose logs -f</code>.',
        },

        // ── Common Commands ─────────────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'macos-commands',
            text: 'Common Docker Commands',
        },
        {
            type: 'table',
            headers: ['Task', 'Command'],
            rows: [
                ['Start containers', 'docker compose up -d'],
                ['Stop containers', 'docker compose down'],
                ['View logs', 'docker compose logs -f'],
                ['Open app shell', 'docker compose exec app bash'],
                ['Run artisan commands', 'docker compose exec app php artisan <cmd>'],
                ['Run migrations', 'docker compose exec app php artisan migrate'],
                ['Clear cache', 'docker compose exec app php artisan optimize:clear'],
                ['Destroy everything (⚠️ deletes DB)', 'docker compose down -v'],
            ],
        },

        // ── Container Architecture ───────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'macos-architecture',
            text: 'Container Architecture',
        },
        {
            type: 'table',
            headers: ['Container', 'Service', 'Purpose', 'Host Port'],
            rows: [
                ['genuine_nginx', 'Nginx 1.27', 'Web server / reverse proxy', '8080'],
                ['genuine_app', 'PHP 8.2-FPM', 'Laravel application runtime', '— (internal)'],
                ['genuine_db', 'MySQL 8.0', 'Relational database', '3306 (internal)'],
            ],
        },
        {
            type: 'callout',
            variant: 'info',
            title: 'Automatic Setup on First Boot',
            html: 'The Docker entrypoint script automatically runs <code>php artisan migrate</code>, creates the storage symlink, and caches config/routes when <code>APP_ENV=production</code> — no manual steps needed.',
        },
    ],
};

export default installationMacosDocker;
