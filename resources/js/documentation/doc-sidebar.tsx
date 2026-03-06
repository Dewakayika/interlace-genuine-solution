import { useMemo } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight, Home } from 'lucide-react';
import type { DocGroup, DocSection } from './content/types';

interface DocSidebarProps {
    groups: DocGroup[];
    activeId: string;
    onSelect: (id: string) => void;
}

export default function DocSidebar({ groups, activeId, onSelect }: DocSidebarProps) {
    return (
        <aside
            style={{
                width: '260px',
                flexShrink: 0,
                borderRight: '1px solid var(--doc-border)',
                background: 'var(--doc-sidebar-bg)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden',
                transition: 'background 0.2s',
            }}
        >
            {/* Header — text only, no icon */}
            <div style={{ padding: '1.125rem 1.25rem', borderBottom: '1px solid var(--doc-border)' }}>
                <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--doc-heading)', lineHeight: 1.2 }}>
                    Genuine Solution
                </p>
                <p style={{ fontSize: '0.6875rem', color: 'var(--doc-muted)', marginTop: '2px' }}>
                    Documentation v1.0
                </p>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, overflowY: 'auto', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Back to app */}
                <Link
                    href="/"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '0.75rem', padding: '0.5rem 0.75rem', fontSize: '0.75rem', color: 'var(--doc-muted)', textDecoration: 'none', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--doc-hover-bg)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                    <Home style={{ width: '0.875rem', height: '0.875rem' }} />
                    Back to Application
                </Link>

                {groups.map((group) => (
                    <div key={group.title}>
                        <p style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--doc-muted)', marginBottom: '0.375rem', padding: '0 0.75rem' }}>
                            {group.title}
                        </p>
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1px' }}>
                            {group.sections.map((section: DocSection) => {
                                const isActive = activeId === section.id;
                                return (
                                    <li key={section.id}>
                                        <button
                                            onClick={() => onSelect(section.id)}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                borderRadius: '0.6rem',
                                                padding: '0.4375rem 0.75rem',
                                                textAlign: 'left',
                                                fontSize: '0.875rem',
                                                background: isActive ? 'var(--doc-active-bg)' : 'transparent',
                                                color: isActive ? 'var(--doc-active-text)' : 'var(--doc-text)',
                                                fontWeight: isActive ? 600 : 400,
                                                border: 'none',
                                                cursor: 'pointer',
                                                transition: 'background 0.15s, color 0.15s',
                                            }}
                                            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--doc-hover-bg)'; }}
                                            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                                        >
                                            <span>{section.title}</span>
                                            {isActive && <ChevronRight style={{ width: '0.875rem', height: '0.875rem', color: 'var(--doc-active-text)' }} />}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--doc-border)' }}>
                <p style={{ fontSize: '0.625rem', color: 'var(--doc-muted)' }}>© {new Date().getFullYear()} Interlace Studies</p>
            </div>
        </aside>
    );
}
