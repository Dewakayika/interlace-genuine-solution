import type { ElementType } from 'react';
import { useState } from 'react';
import type { ContentBlock, HeadingBlock, StepItem, AppItem } from './content/types';
import { ExternalLink, CheckCircle, Circle, AlertCircle, Info, Lightbulb, AlertTriangle, Copy } from 'lucide-react';

// Code blocks intentionally stay dark in both themes (same as VS Code / GitHub).
const CODE_BG  = '#0d1117';
const CODE_BAR = 'rgba(255,255,255,0.04)';
const CODE_BORDER = 'rgba(255,255,255,0.08)';

// ── Copy button ──────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <button
            onClick={() => {
                navigator.clipboard.writeText(text).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                });
            }}
            style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                borderRadius: '0.5rem', padding: '0.25rem 0.625rem',
                fontSize: '0.6875rem', border: `1px solid ${CODE_BORDER}`,
                background: 'rgba(255,255,255,0.06)',
                color: copied ? '#34d399' : '#64748b',
                cursor: 'pointer', transition: 'color 0.15s',
            }}
        >
            <Copy style={{ width: '0.75rem', height: '0.75rem' }} />
            {copied ? 'Copied!' : 'Copy'}
        </button>
    );
}

// ── Syntax highlighter (token-based, no dependency) ───────────────────
function highlight(code: string, lang: string): string {
    const esc = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    if (['text'].includes(lang)) return esc;

    if (['bash', 'powershell', 'shell'].includes(lang)) {
        return esc
            .replace(/(#.*)$/gm, '<span style="color:#475569">$1</span>')
            .replace(/\b(php|composer|npm|npx|git|docker|mysql|node|cp|copy|open)\b/g, '<span style="color:#f59e0b">$1</span>')
            .replace(/"([^"]*)"|'([^']*)'/g, '<span style="color:#34d399">"$1$2"</span>');
    }

    if (['sql', 'ini'].includes(lang)) {
        return esc
            .replace(/(#.*)|(--.*)/gm, '<span style="color:#475569">$1$2</span>')
            .replace(/\b(CREATE|DATABASE|USE|GRANT|FLUSH|EXIT|SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|TABLE|CHARACTER|COLLATE|WITH|ALL|PRIVILEGES|IDENTIFIED|ON|TO|BY)\b/g, '<span style="color:#60a5fa">$1</span>')
            .replace(/"([^"]*)"|'([^']*)'/g, '<span style="color:#34d399">"$1$2"</span>');
    }

    return esc
        .replace(/(\/\/.*$|#.*$|\/\*[\s\S]*?\*\/)/gm, '<span style="color:#475569">$1</span>')
        .replace(/\b(import|export|from|const|let|var|function|return|default|interface|type|class|extends|implements|new|async|await|if|else|for|while|use|namespace|public|protected|private|static|require|echo|include)\b/g, '<span style="color:#818cf8">$1</span>')
        .replace(/\b(string|number|boolean|void|any|never|unknown|Record|Array|Promise|React|Response|Inertia)\b/g, '<span style="color:#60a5fa">$1</span>')
        .replace(/"([^"]*)"|'([^']*)'/g, '<span style="color:#34d399">"$1$2"</span>')
        .replace(/\b(true|false|null|undefined)\b/g, '<span style="color:#f59e0b">$1</span>');
}

// ── Block renderers ──────────────────────────────────────────────────

function renderHeading(block: HeadingBlock) {
    const styles: Record<number, React.CSSProperties> = {
        1: { fontSize: '1.875rem', fontWeight: 700, margin: '0 0 1rem', color: 'var(--doc-heading)' },
        2: { fontSize: '1.25rem',  fontWeight: 600, margin: '2.5rem 0 0.75rem', paddingTop: '2rem', borderTop: '1px solid var(--doc-border)', color: 'var(--doc-heading)' },
        3: { fontSize: '1rem',    fontWeight: 600, margin: '2rem 0 0.5rem', color: 'var(--doc-heading)' },
        4: { fontSize: '0.9rem',  fontWeight: 600, margin: '1.5rem 0 0.5rem', color: 'var(--doc-heading)' },
    };
    const Tag: ElementType = `h${block.level}` as ElementType;
    return (
        <Tag key={block.id} id={block.id} style={{ ...styles[block.level], scrollMarginTop: '6rem' }}>
            <a href={`#${block.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{block.text}</a>
        </Tag>
    );
}

function renderCallout(block: Extract<ContentBlock, { type: 'callout' }>) {
    const variants = {
        info:    { bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.2)',  icon: <Info style={{ width:'1rem', height:'1rem', color:'#60a5fa', flexShrink:0, marginTop:'2px' }} />,           title: '#93c5fd', text: '#60a5fa' },
        tip:     { bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)',  icon: <Lightbulb style={{ width:'1rem', height:'1rem', color:'#34d399', flexShrink:0, marginTop:'2px' }} />,       title: '#6ee7b7', text: '#34d399' },
        warning: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)',  icon: <AlertTriangle style={{ width:'1rem', height:'1rem', color:'#f59e0b', flexShrink:0, marginTop:'2px' }} />,  title: '#fcd34d', text: '#f59e0b' },
        danger:  { bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.2)',   icon: <AlertCircle style={{ width:'1rem', height:'1rem', color:'#f87171', flexShrink:0, marginTop:'2px' }} />,    title: '#fca5a5', text: '#f87171' },
    };
    const v = variants[block.variant];
    return (
        <div style={{ background: v.bg, border: `1px solid ${v.border}`, borderRadius: '0.75rem', padding: '1rem', margin: '1.5rem 0', display: 'flex', gap: '0.75rem' }}>
            {v.icon}
            <div>
                {block.title && <p style={{ color: v.title, fontWeight: 600, fontSize: '0.8125rem', marginBottom: '0.375rem' }}>{block.title}</p>}
                <div
                    style={{ color: v.text, fontSize: '0.8125rem', lineHeight: 1.7, opacity: 0.95 }}
                    className="[&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded [&_code]:px-1 [&_code]:font-mono [&_code]:text-xs"
                    dangerouslySetInnerHTML={{ __html: block.html }}
                />
            </div>
        </div>
    );
}

function renderCode(block: Extract<ContentBlock, { type: 'code' }>) {
    return (
        <div style={{ background: CODE_BG, border: `1px solid ${CODE_BORDER}`, borderRadius: '0.75rem', margin: '1.25rem 0', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 1rem', borderBottom: `1px solid ${CODE_BORDER}`, background: CODE_BAR }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {block.filename ? (
                        <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#64748b' }}>{block.filename}</span>
                    ) : (
                        <>
                            <span style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', background: '#ef4444', opacity: 0.7, display: 'inline-block' }} />
                            <span style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', background: '#f59e0b', opacity: 0.7, display: 'inline-block' }} />
                            <span style={{ width: '0.6rem', height: '0.6rem', borderRadius: '50%', background: '#22c55e', opacity: 0.7, display: 'inline-block' }} />
                            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#475569', marginLeft: '0.375rem' }}>{block.language}</span>
                        </>
                    )}
                </div>
                <CopyButton text={block.code} />
            </div>
            <pre style={{ overflowX: 'auto', padding: '1.25rem', margin: 0 }}>
                <code
                    style={{ fontFamily: "'Fira Code','Cascadia Code',monospace", fontSize: '0.8125rem', lineHeight: 1.7, color: '#cbd5e1' }}
                    dangerouslySetInnerHTML={{ __html: highlight(block.code, block.language) }}
                />
            </pre>
        </div>
    );
}

function renderStepList(block: Extract<ContentBlock, { type: 'step-list' }>) {
    return (
        <div style={{ margin: '1.5rem 0' }}>
            {block.steps.map((step: StepItem, idx: number) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', paddingBottom: '2rem', position: 'relative' }}>
                    {idx < block.steps.length - 1 && (
                        <div style={{ position: 'absolute', left: '1.125rem', top: '2.5rem', bottom: 0, width: '1px', background: 'var(--doc-border)' }} />
                    )}
                    <div style={{ flexShrink: 0, width: '2.25rem', height: '2.25rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6', fontWeight: 700, fontSize: '0.8125rem' }}>
                        {step.number}
                    </div>
                    <div style={{ flex: 1, paddingTop: '0.25rem' }}>
                        <p style={{ color: 'var(--doc-heading)', fontWeight: 600, marginBottom: '0.5rem' }}>{step.title}</p>
                        <div
                            style={{ color: 'var(--doc-text)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '0.75rem' }}
                            className="[&_code]:rounded [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs"
                            dangerouslySetInnerHTML={{ __html: step.html }}
                        />
                        {step.code && renderCode(step.code)}
                    </div>
                </div>
            ))}
        </div>
    );
}

function renderAppList(block: Extract<ContentBlock, { type: 'app-list' }>) {
    return (
        <div style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {block.apps.map((app: AppItem, idx: number) => (
                <div key={idx} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start', padding: '0.875rem 1rem', borderRadius: '0.75rem', background: 'var(--doc-card-bg)', border: '1px solid var(--doc-border)' }}>
                    <div style={{ marginTop: '2px' }}>
                        {app.required
                            ? <CheckCircle style={{ width: '1rem', height: '1rem', color: '#34d399' }} />
                            : <Circle style={{ width: '1rem', height: '1rem', color: 'var(--doc-muted)' }} />
                        }
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                            <a href={app.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#3b82f6', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                                {app.name} <ExternalLink style={{ width: '0.75rem', height: '0.75rem', opacity: 0.7 }} />
                            </a>
                            {app.version && (
                                <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', padding: '1px 6px', borderRadius: '9999px', background: 'var(--doc-badge-bg)', color: 'var(--doc-muted)' }}>
                                    v{app.version}
                                </span>
                            )}
                            <span style={{ fontSize: '0.7rem', fontWeight: 500, padding: '1px 8px', borderRadius: '9999px', background: app.required ? 'rgba(52,211,153,0.1)' : 'var(--doc-badge-bg)', color: app.required ? '#34d399' : 'var(--doc-muted)', border: `1px solid ${app.required ? 'rgba(52,211,153,0.25)' : 'var(--doc-border)'}` }}>
                                {app.required ? 'Required' : 'Optional'}
                            </span>
                        </div>
                        <p
                            style={{ color: 'var(--doc-text)', fontSize: '0.8125rem', lineHeight: 1.6 }}
                            className="[&_code]:rounded [&_code]:px-1 [&_code]:font-mono [&_code]:text-xs"
                            dangerouslySetInnerHTML={{ __html: app.description }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

function renderTable(block: Extract<ContentBlock, { type: 'table' }>) {
    return (
        <div style={{ margin: '1.5rem 0', borderRadius: '0.75rem', border: '1px solid var(--doc-border)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                <thead>
                    <tr style={{ background: 'var(--doc-table-head)', borderBottom: '1px solid var(--doc-border)' }}>
                        {block.headers.map((h, i) => (
                            <th key={i} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--doc-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {block.rows.map((row, ri) => (
                        <tr key={ri} style={{ borderBottom: ri < block.rows.length - 1 ? '1px solid var(--doc-border)' : 'none' }}>
                            {row.map((cell, ci) => (
                                <td
                                    key={ci}
                                    style={{ padding: '0.75rem 1rem', color: 'var(--doc-text)' }}
                                    className="[&_code]:rounded [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs"
                                    dangerouslySetInnerHTML={{ __html: cell }}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ── Main ──────────────────────────────────────────────────────────────
export default function DocContent({ blocks }: { blocks: ContentBlock[] }) {
    return (
        <div>
            {blocks.map((block, idx) => {
                switch (block.type) {
                    case 'heading':
                        return <div key={idx}>{renderHeading(block)}</div>;
                    case 'paragraph':
                        return (
                            <p
                                key={idx}
                                style={{ color: 'var(--doc-text)', lineHeight: 1.8, margin: '1rem 0', fontSize: '0.9375rem' }}
                                className="[&_a]:text-blue-500 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-blue-400 [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8em] [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:space-y-1.5 [&_li]:leading-relaxed [&_strong]:font-semibold"
                                dangerouslySetInnerHTML={{ __html: block.html }}
                            />
                        );
                    case 'code':
                        return <div key={idx}>{renderCode(block)}</div>;
                    case 'callout':
                        return <div key={idx}>{renderCallout(block)}</div>;
                    case 'step-list':
                        return <div key={idx}>{renderStepList(block)}</div>;
                    case 'app-list':
                        return <div key={idx}>{renderAppList(block)}</div>;
                    case 'table':
                        return <div key={idx}>{renderTable(block)}</div>;
                    case 'divider':
                        return <hr key={idx} style={{ margin: '2.5rem 0', border: 'none', borderTop: '1px solid var(--doc-border)' }} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
}
