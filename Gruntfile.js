module.exports = (grunt) => {
  grunt.initConfig({
    eslint: {
      target: ['index.js', 'lib/**/*.js'],
    },
  });

  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('default', ['eslint']);
};
