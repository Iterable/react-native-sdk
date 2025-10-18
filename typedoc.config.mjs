/** @type {Partial<import('typedoc').TypeDocOptions>} */
/** @type { import('typedoc').TypeDocOptionMap & import('typedoc-umlclass').Config } */
const config = {
  entryPoints: ['./src/index.tsx'],
  projectDocuments: ['README.md', 'most-used-modules.md', 'another-md.md'],
  out: './docs-gen',
  tsconfig: './tsconfig.json',
  excludeInternal: true,
  excludePrivate: true,
  excludeExternals: false,
  excludePrivateClassFields: true,
  categorizeByGroup: true,
  excludeProtected: true,
  validation: {
    notExported: true,
    invalidLink: true,
    rewrittenLink: true,
    notDocumented: true,
    unusedMergeModuleWith: true,
  },
  entryPointStrategy: 'expand',
  includeVersion: true,
  searchInComments: true,
  searchInDocuments: true,
  treatValidationWarningsAsErrors: true,
  useFirstParagraphOfCommentAsSummary: true,
  disableSources: false,
  cascadedModifierTags: ['@beta'],
  theme: 'typedoc-github-theme',
  router: 'structure',
  customFooterHtml: '<p>Copyright <strong>Iterable</strong> 2025</p>',
  customFooterHtmlDisableWrapper: true,
  markdownLinkExternal: true,
  hideGenerator: true,
  // groupReferencesByType: true,
  sortEntryPoints: true,
  sidebarLinks: {
    Iterable: 'https://app.iterable.com/',
    Support:
      'https://support.iterable.com/hc/en-us/articles/360045714072-Overview-of-Iterable-s-React-Native-SDK',
    Installation:
      'https://support.iterable.com/hc/en-us/articles/360045714132-Installing-Iterable-s-React-Native-SDK',
  },
  headings: {
    readme: true,
    document: false,
  },
  groupOrder: [
    'Documents',
    'React Components',
    'Classes',
    'Enums',
    'Interfaces',
    'Types',
    'Functions',
    'Variables',
    'Constants',
    '*',
  ],
  categoryOrder: ['Documents', 'React Components', '*'],
  // jsDocCompatibility: {
  //   inheritDocTag: true,
  // },
  preservedTypeAnnotationTags: ['@fires', '@license'],
  // transformTags: true,
  requiredToBeDocumented: [
    // "Project",
    // "Module",
    // "Namespace",
    'Enum',
    'EnumMember',
    'Variable',
    'Function',
    'Class',
    'Interface',
    'Constructor',
    'Property',
    'Method',
    // Implicitly set if function/method is set (this means you can't require docs on methods, but not functions)
    // This exists because methods/functions can have multiple signatures due to overloads, and TypeDoc puts comment
    // data on the signature. This might be improved someday, so you probably shouldn't set this directly.
    'CallSignature',
    // Index signature { [k: string]: string } "properties"
    'IndexSignature',
    // Equivalent to Constructor due to the same implementation detail as CallSignature
    'ConstructorSignature',
    // "Parameter", // Commented out - React component props don't need individual parameter docs when the type is documented
    // Used for object literal types. You probably should set TypeAlias instead, which refers to types created with `type X =`.
    // This only really exists because of an implementation detail.
    // "TypeLiteral", // Commented out to avoid warnings on inline function types like () => void
    'TypeParameter',
    'Accessor', // shorthand for GetSignature + SetSignature
    'GetSignature',
    'SetSignature',
    'TypeAlias',
    // TypeDoc creates reference reflections if a symbol is exported from a package with multiple names. Most projects
    // won't have any of these, and they just render as a link to the canonical name.
    'Reference',
  ],
  navigation: {
    includeCategories: false,
    includeGroups: true,
    compactFolders: false,
    excludeReferences: false,
    includeFolders: true,
  },
  alwaysCreateEntryPointModule: false,
  navigationLinks: {
    Github: 'https://github.com/Iterable/react-native-sdk',
    Changelog:
      'https://github.com/Iterable/react-native-sdk/blob/master/CHANGELOG.md',
  },
  searchCategoryBoosts: {
    'React Components': 1.5,
  },
  searchGroupBoosts: {
    'React Components': 1.5,
  },
  visibilityFilters: {
    'protected': false,
    'private': false,
    'inherited': true,
    'external': true,
    '@alpha': true,
    '@beta': true,
  },
  sort: [
    'documents-first',
    'kind',
    'visibility',
    'required-first',
    'enum-value-ascending',
    'alphabetical-ignoring-documents',
    'external-last',
  ],
  highlightLanguages: [
    'bash',
    'console',
    'css',
    'html',
    'javascript',
    'json',
    'jsonc',
    'json5',
    'tsx',
    'typescript',
    'ruby',
  ],
  externalSymbolLinkMappings: {
    // used by `class Foo extends Component {}`
    '@types/react': {
      'Component': 'https://react.dev/reference/react/Component',
      // used if no other names match
      'FunctionComponent':
        'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/mdx/types.d.ts',
      '*': 'https://react.dev/',
    },
    // used by {@link react!Component}
    'react': {
      Component: 'https://react.dev/reference/react/Component',
      FunctionComponent:
        'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/mdx/types.d.ts',
    },
  },
  readme: './README.md',
  customJs: './expand-nav.js',
  plugin: [
    'typedoc-plugin-coverage',
    'typedoc-plugin-mermaid',
    'typedoc-plugin-inline-sources',
    'typedoc-plugin-dt-links',
    // 'typedoc-plugin-localization',
    'typedoc-plugin-emojify',
    '@reside-ic/typedoc-plugin-copy-doc',
    'typedoc-github-theme',
    // 'typedoc-material-theme',
    // '@droppedcode/typedoc-plugin-relative-includes',
  ],
};

export default config;
