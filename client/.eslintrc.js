module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@mui/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', '@mui', 'react-hooks'],
    rules: {
        'react/prop-types': 'off', // You can disable prop-types if you're using TypeScript or don't want to use prop-types.
        'react/react-in-jsx-scope': 'off', // This rule is not needed with React 17+
        'no-unused-vars': 'warn', // Or "error" depending on your preference
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        '@mui/imports-style': 'error', // Ensure Material-UI imports are styled
    },
    settings: {
        react: {
            version: 'detect', // Automatically detect the React version
        },
    },
};