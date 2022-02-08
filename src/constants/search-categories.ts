export enum SearchCategory {
    npm, github, None
};

export const categoryOptions = [
    { value: SearchCategory.npm, label: 'NPM packages' },
    { value: SearchCategory.github, label: 'Github repos' },
];