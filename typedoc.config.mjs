/** @type {Partial<import('typedoc').TypeDocOptions>} */
const config = {
  entryPoints: ["./src/index.tsx"],
  projectDocuments: ["README.md", "most-used-modules.md"],
  out: "./docs",
  tsconfig: "./tsconfig.json",
  excludeInternal: true,
  excludePrivate: true,
  excludeExternals: true,
  excludePrivateClassFields: true,
  categorizeByGroup: true,
  validation: {
    invalidLink: true,
    notDocumented: true,
    notExported: true,
    unusedMergeModuleWith: true,
  },
  includeVersion: true,
  searchInComments: true,
  searchInDocuments: true,
  favicon: "./assets/favicon.ico",
  treatValidationWarningsAsErrors: true,
  useFirstParagraphOfCommentAsSummary: true,
  cascadedModifierTags: ["@beta"],
  jsDocCompatibility: {
    inheritDocTag: true,
  },
  preservedTypeAnnotationTags: ["@fires"],
  // transformTags: true,
  requiredToBeDocumented: [
    // "Project",
    // "Module",
    // "Namespace",
    "Enum",
    "EnumMember",
    "Variable",
    "Function",
    "Class",
    "Interface",
    "Constructor",
    "Property",
    "Method",
    // Implicitly set if function/method is set (this means you can't require docs on methods, but not functions)
    // This exists because methods/functions can have multiple signatures due to overloads, and TypeDoc puts comment
    // data on the signature. This might be improved someday, so you probably shouldn't set this directly.
    "CallSignature",
    // Index signature { [k: string]: string } "properties"
    "IndexSignature",
    // Equivalent to Constructor due to the same implementation detail as CallSignature
    "ConstructorSignature",
    "Parameter",
    // Used for object literal types. You probably should set TypeAlias instead, which refers to types created with `type X =`.
    // This only really exists because of an implementation detail.
    // "TypeLiteral", // Commented out to avoid warnings on inline function types like () => void
    "TypeParameter",
    "Accessor", // shorthand for GetSignature + SetSignature
    "GetSignature",
    "SetSignature",
    "TypeAlias",
    // TypeDoc creates reference reflections if a symbol is exported from a package with multiple names. Most projects
    // won't have any of these, and they just render as a link to the canonical name.
    "Reference",
  ],
  navigation: {
    includeCategories: false,
    includeGroups: false,
    compactFolders: false,
    excludeReferences: false,
    includeFolders: false,
  },
  visibilityFilters: {
    protected: true,
    private: true,
    inherited: true,
    external: true,
    "@alpha": true,
    "@beta": true,
  },
  sort: [
    "documents-first",
    "kind",
    "visibility",
    "required-first",
    "enum-value-ascending",
    "alphabetical-ignoring-documents",
    "external-last",
  ],
  externalSymbolLinkMappings: {
    // used by `class Foo extends Component {}`
    "@types/react": {
      Component: "https://react.dev/reference/react/Component",
      // used if no other names match
      "*": "https://react.dev/",
    },
    // used by {@link react!Component}
    react: {
      Component: "https://react.dev/reference/react/Component",
    },
  },
  readme: "./README.md",
  plugin: ["typedoc-plugin-coverage", "typedoc-plugin-mermaid"],
};

export default config;
