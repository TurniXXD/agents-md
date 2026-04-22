import { fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginImport from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "**/node_modules",
    "**/.next",
    "**/out",
    "**/dist",
    "**/*.snap",
    "**/*.svg",
    "**/*.png",
    "**/*.css",
    "**/hooks/api/*.ts",
    "**/pnpm-lock.yaml",
    "**/package-lock.json",
    "**/yarn.lock"
  ]),
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      prettier,
      "@typescript-eslint": typescriptEslint,
      import: fixupPluginRules(pluginImport),
      "react-hooks": reactHooks
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module"
    },
    rules: {
      "prettier/prettier": "warn",
      "no-use-before-define": "off",
      "import/no-unused-modules": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "warn",
      "no-console": [
        "warn",
        {
          allow: ["warn", "error", "info", "debug"]
        }
      ],
      "no-restricted-imports": [
        "warn",
        {
          patterns: [
            {
              group: ["./*", "../*", "!**/*.module.scss"],
              message: "Use absolute imports instead of relative ones. SCSS modules are allowed."
            }
          ]
        }
      ],
      "arrow-parens": ["error", "always"],
      "object-shorthand": ["warn", "always"],
      "spaced-comment": [
        "warn",
        "always",
        {
          block: {
            balanced: true
          }
        }
      ],
      "multiline-comment-style": ["warn", "bare-block"],
      curly: ["error", "all"],
      "padding-line-between-statements": [
        "warn",
        {
          blankLine: "always",
          prev: "if",
          next: "*"
        }
      ],
      eqeqeq: [
        "error",
        "always",
        {
          null: "ignore"
        }
      ],
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports"
        }
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allow"
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "allow"
        }
      ],
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true
        }
      ],
      "@typescript-eslint/no-empty-interface": "warn",
      "@typescript-eslint/no-explicit-any": "warn"
    }
  },
  {
    files: ["src/hooks/api/**/*"],
    rules: {
      "no-restricted-imports": "off"
    }
  },
  {
    files: ["src/**/index.ts"],
    rules: {
      "no-restricted-imports": "off"
    }
  }
]);
