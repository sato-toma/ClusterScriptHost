import nextPlugin from "eslint-config-next";

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
    ...nextPlugin,
    // ここにカスタムルールを追加できます
];

export default config;
