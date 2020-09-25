module.exports = {
  jsxSingleQuote: true,
  quoteProps: 'consistent',
  singleQuote: true,
  useEditorConfig: false,
  arrowParens: 'avoid',
  printWidth: 80,
  svelteSortOrder: 'scripts-markup-styles',
  overrides: [
    {
      files: '*.js',
      options: {
        parser: 'jsdoc-parser',
      },
    },
  ],
};
