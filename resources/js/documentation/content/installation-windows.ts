import type { DocSection } from './types';

const installationWindows: DocSection = {
    id: 'installation-windows',
    title: 'Installation — Windows',
    group: 'Getting Started',
    blocks: [
        {
            type: 'heading',
            level: 1,
            id: 'installation-windows',
            text: 'Installation — Windows',
        },
        {
            type: 'paragraph',
            html: 'This guide walks you through setting up <strong>Genuine Solution</strong> on a Windows machine for local development. You will install PHP, Composer, Node.js, MySQL, and run the application natively.',
        },
        {
            type: 'callout',
            variant: 'info',
            title: 'macOS / Linux Users',
            html: 'If you are on macOS or Linux, consider using the <a href="#installation-macos-docker" class="underline">Docker-based installation</a> instead — it is simpler and fully cross-platform.',
        },

        // ── Required Apps ──────────────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'windows-required-apps',
            text: 'Required Applications',
        },
        {
            type: 'paragraph',
            html: 'Install all of the following before proceeding. Each application must be installed and available in your <code>PATH</code>.',
        },
        {
            type: 'app-list',
            apps: [
                {
                    name: 'PHP 8.2+',
                    version: '8.2 or higher',
                    url: 'https://windows.php.net/download/',
                    description:
                        'The server-side runtime for Laravel. Download the VS16 x64 Thread Safe ZIP, extract to C:\\php, and add to your PATH.',
                    required: true,
                },
                {
                    name: 'Composer',
                    version: '2.x',
                    url: 'https://getcomposer.org/Composer-Setup.exe',
                    description:
                        'PHP dependency manager. Run the Windows installer — it will auto-detect PHP and configure your PATH.',
                    required: true,
                },
                {
                    name: 'Node.js',
                    version: '20 LTS or 22 LTS',
                    url: 'https://nodejs.org/en/download',
                    description:
                        'JavaScript runtime required for building the React/Vite frontend. Download the Windows Installer (.msi).',
                    required: true,
                },
                {
                    name: 'MySQL 8',
                    version: '8.0',
                    url: 'https://dev.mysql.com/downloads/installer/',
                    description:
                        'The relational database. Use the MySQL Installer for Windows, choose "Server only" or "Developer Default". Note your root password during setup.',
                    required: true,
                },
                {
                    name: 'Git',
                    version: 'Latest',
                    url: 'https://git-scm.com/download/win',
                    description:
                        'Version control. Install Git for Windows — it also provides Git Bash, which is useful for running shell scripts.',
                    required: true,
                },
                {
                    name: 'Visual Studio Code',
                    version: 'Latest',
                    url: 'https://code.visualstudio.com/',
                    description:
                        'Recommended code editor with Laravel, PHP, TypeScript, ESLint, and Tailwind extensions.',
                    required: false,
                },
                {
                    name: 'TablePlus / DBeaver',
                    version: 'Latest',
                    url: 'https://tableplus.com/',
                    description:
                        'GUI database client for browsing and querying your MySQL database. TablePlus (free tier) or DBeaver (free, open source) both work well.',
                    required: false,
                },
            ],
        },

        // ── Verify Prerequisites ────────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'windows-verify',
            text: 'Verify Installations',
        },
        {
            type: 'paragraph',
            html: 'Open <strong>PowerShell</strong> or <strong>Command Prompt</strong> and run the following to confirm everything is installed correctly:',
        },
        {
            type: 'code',
            language: 'powershell',
            code: `php --version
# PHP 8.2.x (cli)

composer --version
# Composer version 2.x.x

node --version
# v22.x.x

npm --version
# 10.x.x

mysql --version
# mysql  Ver 8.0.x

git --version
# git version 2.x.x`,
        },

        // ── Database Setup ──────────────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'windows-database',
            text: 'Database Setup',
        },
        {
            type: 'paragraph',
            html: 'Log into MySQL and create a database for the project:',
        },
        {
            type: 'code',
            language: 'sql',
            code: `-- Open MySQL Workbench, TablePlus, or run in your terminal:
mysql -u root -p

-- Inside MySQL prompt:
CREATE DATABASE \`genuine-solution\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'genuine'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON \`genuine-solution\`.* TO 'genuine'@'localhost';
FLUSH PRIVILEGES;
EXIT;`,
        },

        // ── Installation Steps ──────────────────────────────────────
        {
            type: 'heading',
            level: 2,
            id: 'windows-steps',
            text: 'Installation Steps',
        },
        {
            type: 'step-list',
            steps: [
                {
                    number: 1,
                    title: 'Clone the Repository',
                    html: 'Clone the project to your local machine using Git:',
                    code: {
                        type: 'code',
                        language: 'powershell',
                        code: `git clone https://github.com/your-org/genuine-solution.git
cd genuine-solution`,
                    },
                },
                {
                    number: 2,
                    title: 'Copy the Environment File',
                    html: 'Create your local <code>.env</code> file from the example template:',
                    code: {
                        type: 'code',
                        language: 'powershell',
                        code: `copy .env.example .env`,
                    },
                },
                {
                    number: 3,
                    title: 'Configure the Environment',
                    html: 'Open <code>.env</code> in your editor and update the database credentials to match your local MySQL setup:',
                    code: {
                        type: 'code',
                        language: 'ini',
                        filename: '.env',
                        code: `APP_NAME="Genuine Solution"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=genuine-solution
DB_USERNAME=genuine
DB_PASSWORD=your_password`,
                    },
                },
                {
                    number: 4,
                    title: 'Install PHP Dependencies',
                    html: 'Use Composer to install all backend packages:',
                    code: {
                        type: 'code',
                        language: 'powershell',
                        code: `composer install`,
                    },
                },
                {
                    number: 5,
                    title: 'Generate Application Key',
                    html: 'This generates a unique encryption key for your app:',
                    code: {
                        type: 'code',
                        language: 'powershell',
                        code: `php artisan key:generate`,
                    },
                },
                {
                    number: 6,
                    title: 'Run Database Migrations',
                    html: 'Create all the database tables:',
                    code: {
                        type: 'code',
                        language: 'powershell',
                        code: `php artisan migrate`,
                    },
                },
                {
                    number: 7,
                    title: 'Install Node.js Dependencies',
                    html: 'Install the frontend dependencies including React, Vite, and Tailwind:',
                    code: {
                        type: 'code',
                        language: 'powershell',
                        code: `npm install`,
                    },
                },
                {
                    number: 8,
                    title: 'Start the Development Server',
                    html: 'Run all dev processes together — Laravel server, Vite (HMR), and the queue worker:',
                    code: {
                        type: 'code',
                        language: 'powershell',
                        code: `composer run dev`,
                    },
                },
            ],
        },
        {
            type: 'callout',
            variant: 'tip',
            title: 'Access the App',
            html: 'Open <a href="http://localhost:8000" target="_blank" class="underline">http://localhost:8000</a> in your browser. You can register a new account to get started.',
        },
        {
            type: 'heading',
            level: 2,
            id: 'windows-php-extensions',
            text: 'Required PHP Extensions',
        },
        {
            type: 'paragraph',
            html: 'Make sure the following PHP extensions are enabled in your <code>php.ini</code> file (uncomment by removing the leading <code>;</code>):',
        },
        {
            type: 'table',
            headers: ['Extension', 'Purpose'],
            rows: [
                ['pdo_mysql', 'MySQL database connection'],
                ['mbstring', 'Multi-byte string handling'],
                ['openssl', 'Cryptography + HTTPS'],
                ['tokenizer', 'Laravel framework internals'],
                ['xml', 'XML parsing'],
                ['ctype', 'Character type checking'],
                ['fileinfo', 'File MIME detection (uploads)'],
                ['zip', 'Zip archive support'],
                ['gd', 'Image processing'],
                ['bcmath', 'High-precision math'],
                ['intl', 'Internationalisation'],
            ],
        },
        {
            type: 'callout',
            variant: 'warning',
            title: 'php.ini Location',
            html: 'Your <code>php.ini</code> is usually located at <code>C:\\php\\php.ini</code>. After making changes, restart any running PHP processes.',
        },
    ],
};

export default installationWindows;
