module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-karma');

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
          'dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js': [
            'dist/js/<%= pkg.name %>-<%= pkg.version %>.js'
          ]
        }
      }
    },
    cssmin: {
      css: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          'dist/css/<%= pkg.name %>-<%= pkg.version %>.min.css': [
            'dist/css/<%= pkg.name %>-<%= pkg.version %>.css'
          ]
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
    clean: [
      'dist/css',
      'dist/js'
    ],
    copy: {
      css: {
        src: 'src/css/<%= pkg.name %>.css',
        dest: 'dist/css/<%= pkg.name %>-<%= pkg.version %>.css'
      },
      js: {
        src: 'src/js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'karma']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('test-server', ['karma:server']);
  grunt.registerTask('build', ['jshint', 'karma:unit', 'clean', 'copy', 'uglify', 'cssmin']);
};
