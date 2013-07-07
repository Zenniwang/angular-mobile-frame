module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-conventional-changelog');

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),
    banner: [
      '/*!',
      ' * <%= pkg.title %> - v<%= pkg.version %>',
      ' *',
      ' * <%= grunt.template.today("yyyy-mm-dd") %>',
      ' *',
      ' * <%= pkg.description %>',
      ' *',
      ' * <%= pkg.homepage %>',
      ' *',
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;',
      ' * Licensed <%= pkg.license %>',
      '**/'
    ].join('\n') + '\n',
    watch: {
      scripts: {
        files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        tasks: ['jshint', 'karma:unit']
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        eqeqeq: true,
        globals: {
          angular: true
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      src: {
        files: {
          'dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js': 'src/js/<%= pkg.name %>.js'
        }
      }
    },
    cssmin: {
      css: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          'dist/css/<%= pkg.name %>-<%= pkg.version %>.css': ['src/**/*.css']
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      server: {
        configFile: 'karma.conf.js',
        singleRun: false
      }
    },
    changelog: {
      options: {
        dest: 'CHANGELOG.md'
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'karma']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('test-server', ['karma:server']);
  grunt.registerTask('build', ['jshint', 'karma:unit', 'uglify', 'cssmin']);
};
