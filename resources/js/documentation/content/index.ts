import type { DocGroup, DocSection } from './types';
import introduction from './introduction';
import installationWindows from './installation-windows';
import installationMacosDocker from './installation-macos-docker';
import architecture from './architecture';
import suggestedLibraries from './suggested-libraries';

export const allSections: DocSection[] = [
    introduction,
    installationWindows,
    installationMacosDocker,
    architecture,
    suggestedLibraries,
];

export const docGroups: DocGroup[] = [
    {
        title: 'Getting Started',
        sections: [introduction, installationWindows, installationMacosDocker],
    },
    {
        title: 'Architecture',
        sections: [architecture],
    },
    {
        title: 'Reference',
        sections: [suggestedLibraries],
    },
];

export function getSectionById(id: string): DocSection | undefined {
    return allSections.find((s) => s.id === id);
}

export type { DocSection, DocGroup };
export type { ContentBlock } from './types';
