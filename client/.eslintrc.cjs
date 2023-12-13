module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier', 'react-refresh'],
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	rules: {
		'prettier/prettier': ['warn', { semi: true }],

		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'react-hooks/rules-of-hooks': 'warn',
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/explicit-function-return-type': 'warn',
		'@typescript-eslint/explicit-module-boundary-types': 'warn',

		'arrow-body-style': ['warn', 'as-needed'],
		'no-duplicate-imports': ['warn', { includeExports: true }],
		eqeqeq: ['warn', 'always'],
		'func-name-matching': ['warn', 'always']
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
};
