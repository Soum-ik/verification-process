module.exports = {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@tensorflow/tfjs-core': path.resolve(__dirname, 'node_modules/@tensorflow/tfjs-core'),
      },
    },
  };