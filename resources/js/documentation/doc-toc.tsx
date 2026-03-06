import { useMemo, useEffect, useState } from 'react';
import { AlignLeft } from 'lucide-react';
import type { ContentBlock, HeadingBlock } from './content/types';

interface TocEntry { id: string; text: string; level: number; }

export default function DocToc({ blocks }: { blocks: ContentBlock[] }) {
    const [activeId, setActiveId] = useState('');

    const entries: TocEntry[] = useMemo(
        () =>
            blocks
                .filter((b): b is HeadingBlock => b.type === 'heading' && b.level >= 2)
                .map((b) => ({ id: b.id, text: b.text, level: b.level })),
        [blocks],
    );

    useEffect(() => {
        if (!entries.length) return;
        const observer = new IntersectionObserver(
            (obs) => {
                for (const entry of obs) {
                    if (entry.isIntersecting) { setActiveId(entry.target.id); break; }
                }
            },
            { rootMargin: '-10% 0px -80% 0px' },
        );
        entries.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [entries]);

    if (!entries.length) return null;

    return (
        <aside style={{ width: '13rem', flexShrink: 0 }}>
            <nav style={{ position: 'sticky', top: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <AlignLeft style={{ width: '0.875rem', height: '0.875rem', color: 'var(--doc-muted)' }} />
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--doc-muted)' }}>On this page</p>
                </div>

                {entries.map((entry) => {
                    const isActive = activeId === entry.id;
                    const indent = entry.level === 3 ? '0.75rem' : entry.level === 4 ? '1.5rem' : '0';
                    return (
                        <a
                            key={entry.id}
                            href={`#${entry.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(entry.id)?.scrollIntoView({ behavior: 'smooth' });
                                setActiveId(entry.id);
                            }}
                            style={{
                                display: 'block',
                                borderRadius: '0.5rem',
                                padding: '0.375rem 0.75rem',
                                paddingLeft: `calc(0.75rem + ${indent})`,
                                fontSize: '0.75rem',
                                lineHeight: 1.5,
                                textDecoration: 'none',
                                color: isActive ? '#3b82f6' : 'var(--doc-muted)',
                                borderLeft: isActive ? '2px solid #3b82f6' : '2px solid transparent',
                                fontWeight: isActive ? 600 : 400,
                                transition: 'color 0.15s',
                            }}
                        >
                            {entry.text}
                        </a>
                    );
                })}
            </nav>
        </aside>
    );
}
