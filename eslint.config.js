import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import pluginVue from "eslint-plugin-vue";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

// Config armada a mano en vez de @vue/eslint-config-typescript: ese paquete trae fast-glob -> braces,
// que tiene una vulnerabilidad sin versión corregida. El resultado es el mismo.
export default defineConfig(
    globalIgnores(["dist", "node_modules", "public"]),
    {
        files: ["**/*.{js,ts,vue}"],
        languageOptions: {
            globals: globals.browser,
        },
    },
    js.configs.recommended,
    tseslint.configs.recommended,
    pluginVue.configs["flat/recommended"],
    {
        // Preparado para migrar a TypeScript de a poco: el <script> de los .vue puede ser JS o lang="ts"
        files: ["**/*.vue"],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
            },
        },
    },
    {
        rules: {
            // Mismas reglas de imports que el back: los tipos se importan con `import type`
            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/no-import-type-side-effects": "error",
            // Los componentes tienen nombres de una palabra en español (Products, Promos...): renombrarlos no aporta
            "vue/multi-word-component-names": "off",
            // Props opcionales sin default son válidas; con la migración a TS las va a describir el tipo
            "vue/require-default-prop": "off",
        },
    },
    {
        files: ["*.config.js"],
        languageOptions: {
            globals: globals.node,
        },
    },
    // Va al final: corre Prettier como regla de ESLint y apaga las reglas de estilo que chocan con él
    prettierRecommended,
);
