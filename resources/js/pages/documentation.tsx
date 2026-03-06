import { useState, useEffect, useCallback, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Moon, Sun, ArrowLeft, ArrowRight, Search } from 'lucide-react';
import DocSidebar from '@/documentation/doc-sidebar';
import DocContent from '@/documentation/doc-content';
import DocToc from '@/documentation/doc-toc';
import { docGroups, allSections, getSectionById } from '@/documentation/content';
import { useAppearance } from '@/hooks/use-appearance';

const DEFAULT_SECTION = 'introduction';

const DARK = {
    '--doc-bg':          '#0e0f11',
    '--doc-sidebar-bg':  '#0e0f11',
    '--doc-border':      'rgba(255,255,255,0.07)',
    '--doc-text':        '#94a3b8',
    '--doc-heading':     '#e2e8f0',
    '--doc-muted':       '#64748b',
    '--doc-card-bg':     'rgba(255,255,255,0.03)',
    '--doc-code-bg':     '#090a0c',
    '--doc-code-bar':    'rgba(255,255,255,0.03)',
    '--doc-hover-bg':    'rgba(255,255,255,0.04)',
    '--doc-active-bg':   'rgba(59,130,246,0.12)',
    '--doc-active-text': '#60a5fa',
    '--doc-input-bg':    'rgba(255,255,255,0.05)',
    '--doc-badge-bg':    'rgba(255,255,255,0.07)',
    '--doc-badge-color': '#64748b',
    '--doc-table-head':  'rgba(255,255,255,0.04)',
    '--doc-header-bg':   'rgba(14,15,17,0.9)',
    '--doc-dropdown-bg': '#1a1c20',
} as const;

const LIGHT = {
    '--doc-bg':          '#f8fafc',
    '--doc-sidebar-bg':  '#ffffff',
    '--doc-border':      'rgba(0,0,0,0.08)',
    '--doc-text':        '#475569',
    '--doc-heading':     '#0f172a',
    '--doc-muted':       '#94a3b8',
    '--doc-card-bg':     'rgba(0,0,0,0.02)',
    '--doc-code-bg':     '#1e2433',
    '--doc-code-bar':    'rgba(255,255,255,0.04)',
    '--doc-hover-bg':    'rgba(0,0,0,0.04)',
    '--doc-active-bg':   'rgba(59,130,246,0.08)',
    '--doc-active-text': '#2563eb',
    '--doc-input-bg':    'rgba(0,0,0,0.04)',
    '--doc-badge-bg':    'rgba(0,0,0,0.06)',
    '--doc-badge-color': '#64748b',
    '--doc-table-head':  'rgba(0,0,0,0.04)',
    '--doc-header-bg':   'rgba(248,250,252,0.92)',
    '--doc-dropdown-bg': '#ffffff',
} as const;

export default function Documentation() {
    const [activeId, setActiveId] = useState<string>(DEFAULT_SECTION);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';
    const theme = isDark ? DARK : LIGHT;

    useEffect(() => {
        const id = window.location.hash.replace('#', '');
        if (id && getSectionById(id)) setActiveId(id);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setSearchFocused(false);
                setSearchQuery('');
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSelect = useCallback((id: string) => {
        setActiveId(id);
        window.history.replaceState(null, '', `#${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setSearchFocused(false);
        setSearchQuery('');
    }, []);

    // Filter sections by search query
    const searchResults = searchQuery.trim()
        ? allSections.filter((s) =>
              s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.group.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : [];

    const activeSection = getSectionById(activeId) ?? allSections[0];
    const currentIdx = allSections.findIndex((s) => s.id === activeId);
    const prevSection = currentIdx > 0 ? allSections[currentIdx - 1] : null;
    const nextSection = currentIdx < allSections.length - 1 ? allSections[currentIdx + 1] : null;

    return (
        <>
            <Head title={`${activeSection.title} — Genuine Solution Docs`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700&display=swap" rel="stylesheet" />
            </Head>

            <div
                style={{
                    ...(theme as Record<string, string>),
                    display: 'flex', flexDirection: 'column', height: '100vh',
                    overflow: 'hidden', background: 'var(--doc-bg)', color: 'var(--doc-text)',
                    fontFamily: 'Inter, ui-sans-serif', transition: 'background 0.2s, color 0.2s',
                }}
            >
                {/* ── TOP BAR ─────────────────────────────────────────── */}
                <header style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 1.25rem', height: '3.5rem', borderBottom: '1px solid var(--doc-border)', backdropFilter: 'blur(8px)', background: 'var(--doc-header-bg)', position: 'relative', zIndex: 40 }}>

                    {/* Logo — text only, no icon */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginRight: '0.5rem', flexShrink: 0 }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--doc-heading)', letterSpacing: '-0.01em' }}>
                            Genuine Solution
                        </span>
                    </Link>

                    {/* Search — centre, functional */}
                    <div ref={searchRef} style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        <div style={{ width: '100%', maxWidth: '30rem', position: 'relative' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '0.75rem', padding: '0.5rem 0.875rem', background: 'var(--doc-input-bg)', border: '1px solid var(--doc-border)', transition: 'border-color 0.15s', borderColor: searchFocused ? '#3b82f6' : undefined }}>
                                <Search style={{ width: '0.875rem', height: '0.875rem', flexShrink: 0, color: 'var(--doc-muted)' }} />
                                <input
                                    type="text"
                                    placeholder="Search documentation..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setSearchFocused(true)}
                                    style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '0.8125rem', color: 'var(--doc-heading)', minWidth: 0 }}
                                />
                                <kbd style={{ borderRadius: '0.375rem', padding: '0.125rem 0.4rem', fontSize: '0.6875rem', background: 'var(--doc-badge-bg)', color: 'var(--doc-badge-color)', flexShrink: 0 }}>
                                    Ctrl K
                                </kbd>
                            </div>

                            {/* Search dropdown */}
                            {searchFocused && searchQuery.trim() && (
                                <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, borderRadius: '0.75rem', background: 'var(--doc-dropdown-bg)', border: '1px solid var(--doc-border)', boxShadow: '0 8px 30px rgba(0,0,0,0.25)', overflow: 'hidden', zIndex: 50 }}>
                                    {searchResults.length === 0 ? (
                                        <p style={{ padding: '0.875rem 1rem', fontSize: '0.8125rem', color: 'var(--doc-muted)', textAlign: 'center' }}>
                                            No results for "<strong>{searchQuery}</strong>"
                                        </p>
                                    ) : (
                                        searchResults.map((section) => (
                                            <button
                                                key={section.id}
                                                onMouseDown={() => handleSelect(section.id)}
                                                style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0.625rem 1rem', border: 'none', background: 'transparent', cursor: 'pointer', borderBottom: '1px solid var(--doc-border)', textAlign: 'left' }}
                                                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--doc-hover-bg)')}
                                                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                            >
                                                <span style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 500 }}>{section.group}</span>
                                                <span style={{ fontSize: '0.875rem', color: 'var(--doc-heading)', fontWeight: 500 }}>{section.title}</span>
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                        <span style={{ borderRadius: '9999px', padding: '0.125rem 0.625rem', fontSize: '0.6875rem', fontWeight: 500, background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}>
                            v1.0
                        </span>
                        <button
                            onClick={() => updateAppearance(isDark ? 'light' : 'dark')}
                            style={{ borderRadius: '0.5rem', padding: '0.375rem', color: 'var(--doc-muted)', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun style={{ width: '1rem', height: '1rem' }} /> : <Moon style={{ width: '1rem', height: '1rem' }} />}
                        </button>
                        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', borderRadius: '0.5rem', padding: '0.375rem 0.875rem', fontSize: '0.75rem', fontWeight: 600, color: 'white', background: '#3b82f6', textDecoration: 'none' }}>
                            Dashboard <ArrowRight style={{ width: '0.75rem', height: '0.75rem' }} />
                        </Link>
                    </div>
                </header>

                {/* ── BODY ─────────────────────────────────────────────── */}
                <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                    <DocSidebar groups={docGroups} activeId={activeId} onSelect={handleSelect} />

                    <main style={{ flex: 1, overflowY: 'auto' }}>
                        <div style={{ margin: '0 auto', width: '100%', maxWidth: '72rem', display: 'flex', gap: '4rem', padding: '3rem' }}>
                            <article style={{ minWidth: 0, flex: 1 }}>
                                <p style={{ marginBottom: '0.5rem', fontSize: '0.8125rem', fontWeight: 600, color: '#3b82f6' }}>
                                    {activeSection.group}
                                </p>

                                <DocContent blocks={activeSection.blocks} />

                                <div style={{ marginTop: '4rem', paddingTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--doc-border)' }}>
                                    {prevSection ? (
                                        <button
                                            onClick={() => handleSelect(prevSection.id)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderRadius: '0.75rem', padding: '0.75rem 1rem', fontSize: '0.875rem', border: '1px solid var(--doc-border)', background: 'var(--doc-card-bg)', cursor: 'pointer', color: 'inherit' }}
                                        >
                                            <ArrowLeft style={{ width: '1rem', height: '1rem', color: 'var(--doc-muted)' }} />
                                            <div style={{ textAlign: 'left' }}>
                                                <p style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--doc-muted)', marginBottom: '2px' }}>Previous</p>
                                                <p style={{ fontWeight: 500, color: 'var(--doc-heading)' }}>{prevSection.title}</p>
                                            </div>
                                        </button>
                                    ) : <div />}

                                    {nextSection && (
                                        <button
                                            onClick={() => handleSelect(nextSection.id)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderRadius: '0.75rem', padding: '0.75rem 1rem', fontSize: '0.875rem', border: '1px solid var(--doc-border)', background: 'var(--doc-card-bg)', cursor: 'pointer', color: 'inherit' }}
                                        >
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--doc-muted)', marginBottom: '2px' }}>Next</p>
                                                <p style={{ fontWeight: 500, color: 'var(--doc-heading)' }}>{nextSection.title}</p>
                                            </div>
                                            <ArrowRight style={{ width: '1rem', height: '1rem', color: 'var(--doc-muted)' }} />
                                        </button>
                                    )}
                                </div>
                            </article>

                            <DocToc blocks={activeSection.blocks} />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
