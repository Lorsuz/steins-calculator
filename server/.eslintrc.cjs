module.exports = {
	root: true,
	env: {
		node: true
	},
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'prettier/prettier': ['error', { semi: true }],

		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/explicit-function-return-type': 'error',
		'@typescript-eslint/explicit-module-boundary-types': 'error',

		'arrow-body-style': ['error', 'as-needed'],
		'no-duplicate-imports': ['error', { includeExports: true }],
		eqeqeq: ['error', 'always'],
		'func-name-matching': ['error', 'always']
	},
	ignorePatterns: ['dist', '.eslintrc.cjs']
};
