/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:svelte/recommended',
		'plugin:svelte/prettier',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'prettier',
	],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: { parser: '@typescript-eslint/parser' },
		},
	],
	settings: {
		'import/parsers': {
			'svelte-eslint-parser': ['.svelte'],
			'@typescript-eslint/parser': ['.ts'],
		},
		'import/resolver': {
			typescript: {
        project: ['./.svelte-kit/tsconfig.json'],
			},
			node: true,
		},
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	rules: {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^(_|\\$\\$Props$)',
			},
		],
		'import/order': ['error', {
			alphabetize: {
				order: 'asc',
			},
		}],
		'import/no-unresolved': ['error', {
			ignore: ['^\\$app/.+', '^\\$service-worker$'],
		}],
	},
};
