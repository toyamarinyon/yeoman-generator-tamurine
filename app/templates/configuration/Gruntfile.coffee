module.exports = (grunt) ->
  grunt.initConfig
    watch:
      options:
        livereload:true
      slim:
        files:
          'views/*.slim'
      css:
        files:
          'assets/css/build/*.css'
        tasks:
          'cssmin'
      compass:
        files:
          'assets/sass/*.sass'
        tasks:
          'compass'
      js:
        files:
          'assets/js/*.js'
      coffee:
        files:
          'assets/coffee/*.coffee'
        tasks:
          'coffee'
    compass:
      dest:
        options:
          config:'./config.rb'
          bundleExec: true
    coffee:
      compile:
        options:
          join: true
        files:
          'assets/js/application.js': ['assets/coffee/require_config.coffee', 'assets/coffee/application.coffee']
    cssmin:
      combine:
        files:
          'assets/css/application.min.css': ['assets/css/build/*.css']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'

  grunt.registerTask 'default', [
    'compass',
    'coffee',
    'watch'
  ]
