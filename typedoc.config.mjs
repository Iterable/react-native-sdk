/** @type {Partial<import('typedoc').TypeDocOptions>} */
const config = {
  entryPoints: ['./src/index.tsx'],
  out: './docs',
  tsconfig: './tsconfig.json',
  excludeInternal: true,
  validation: {
    invalidLink: true,
    notDocumented: false, // TODO: Change to true
    notExported: true,
  },
  includeVersion: true,
  searchInComments: true,
  searchInDocuments: true,
  navigation: {
    includeCategories: false,
    includeGroups: false,
    compactFolders: false,
    excludeReferences: false,
    includeFolders: false,
  },
  externalSymbolLinkMappings: {
    // used by `class Foo extends Component {}`
    '@types/react': {
      'Component': 'https://react.dev/reference/react/Component',
      // used if no other names match
      '*': 'https://react.dev/',
    },
    // used by {@link react!Component}
    'react': {
      Component: 'https://react.dev/reference/react/Component',
    },
  },
  readme: './README.md',
  plugin: ['typedoc-plugin-coverage'],
};

export default config;
