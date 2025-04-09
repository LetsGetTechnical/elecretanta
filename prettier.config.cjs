/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  plugins: [
    // Automatically sorts tailwind classes to avoid specificity issues
    "prettier-plugin-tailwindcss", // MUST COME LAST
  ],
};

export default config;
