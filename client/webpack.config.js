

const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /@fullcalendar[\\/].*\.css$/,
        use: ['null-loader'],
      },
      {
        test: /\.scss$/,
        loader: 'postcss-loader',
        include: path.resolve(__dirname, 'src/modules/project/'),
        options: {
          postcssOptions: {
            ident: 'postcss',
            syntax: 'postcss-scss',
            plugins: ['postcss-import', 'tailwindcss', 'autoprefixer'],
          },
        },
      },
    ],
  },
}
