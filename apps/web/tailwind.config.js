const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');
const TailwindConfig = require('../../libs/ui/tailwind.config');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...TailwindConfig,
  content: [
    ...(Array.isArray(TailwindConfig.content) ? TailwindConfig.content : [TailwindConfig.content]),
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
};
