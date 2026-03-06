export type BlockType =
    | 'heading'
    | 'paragraph'
    | 'code'
    | 'callout'
    | 'step-list'
    | 'app-list'
    | 'table'
    | 'divider';

export interface HeadingBlock {
    type: 'heading';
    level: 1 | 2 | 3 | 4;
    text: string;
    id: string;
}

export interface ParagraphBlock {
    type: 'paragraph';
    html: string;
}

export interface CodeBlock {
    type: 'code';
    language: string;
    code: string;
    filename?: string;
}

export interface CalloutBlock {
    type: 'callout';
    variant: 'info' | 'warning' | 'tip' | 'danger';
    title?: string;
    html: string;
}

export interface StepItem {
    number: number;
    title: string;
    html: string;
    code?: CodeBlock;
}

export interface StepListBlock {
    type: 'step-list';
    steps: StepItem[];
}

export interface AppItem {
    name: string;
    version?: string;
    url: string;
    description: string;
    required: boolean;
}

export interface AppListBlock {
    type: 'app-list';
    apps: AppItem[];
}

export interface TableBlock {
    type: 'table';
    headers: string[];
    rows: string[][];
}

export interface DividerBlock {
    type: 'divider';
}

export type ContentBlock =
    | HeadingBlock
    | ParagraphBlock
    | CodeBlock
    | CalloutBlock
    | StepListBlock
    | AppListBlock
    | TableBlock
    | DividerBlock;

export interface DocSection {
    id: string;
    title: string;
    group: string;
    blocks: ContentBlock[];
}

export interface DocGroup {
    title: string;
    sections: DocSection[];
}
