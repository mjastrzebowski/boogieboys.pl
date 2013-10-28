module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', '!src/**/*.min.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    
    // Watch for changes and trigger compass, jshint, uglify and livereload
    watch: {
      compass: {
        files: ['src/css/sass/{,**/}*.scss'],
        tasks: ['compass:dev']
      },
      js: {
        files: '<%= jshint.files %>',
        tasks: ['jshint', 'uglify']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'src/index.html',
          'src/css/*.css',
          'src/js/*.js',
          'src/img/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // Compass and scss
    compass: {
      options: {
        config: 'config.rb'
      },
      dev: {
        options: {
          environment: 'development',
          outputStyle: 'expanded'
        }
      },
      dist: {
        options: {
          environment: 'production',
          outputStyle: 'compact'
        }
      }
    },

    // Copy files
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'components/formalize/assets/css/',
            src: '_formalize.scss',
            dest: 'sass/partials/vendor/',
            filter: 'isFile',
            flatten: true
          },
          {
            expand: true,
            cwd: 'components/formalize/assets/images/',
            src: '**',
            dest: 'images/',
            filter: 'isFile',
            flatten: true
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', [
    // 'copy',
    'jshint',
    'uglify',
    'compass:dist',
  ]);

  grunt.registerTask('default', [
    // 'copy',
    'jshint',
    'uglify',
    'compass:dev',
    'watch'
  ]);
};