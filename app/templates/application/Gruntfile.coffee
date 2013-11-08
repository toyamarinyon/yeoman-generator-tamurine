module.exports = (grunt) ->
  grunt.initConfig
    watch:
      options:
        livereload:true
      slim:
        files:
          'templates/views/*.slim'
      sass:
        files:
          'templates/assets/sass/*.sass'
      coffee:
        files:
          'templates/assets/sass/*.coffee'
  
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.registerTask 'default', ['watch']
