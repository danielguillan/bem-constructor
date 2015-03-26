module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
         dir : {
            src : 'stylesheets',
            dist : 'dist'
        },
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                banner: '/*! <%= pkg.name %> - version : <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },

            dist: {
                src: [

                    // Defaults
                    '<%= dir.src %>/_defaults.scss',

                    // Logger
                    '<%= dir.src %>/logger/_global.scss',
                    '<%= dir.src %>/logger/_context-logger.scss',
                    '<%= dir.src %>/logger/_block-logger.scss',
                    '<%= dir.src %>/logger/_element-logger.scss',
                    '<%= dir.src %>/logger/_modifier-logger.scss',
                    '<%= dir.src %>/logger/_scope-logger.scss',

                    // Error checks
                    '<%= dir.src %>/_error-checks.scss',

                    // Constructors
                    '<%= dir.src %>/_block.scss',
                    '<%= dir.src %>/_element.scss',
                    '<%= dir.src %>/_modifier.scss',
                    '<%= dir.src %>/_modifies-element.scss',
                    '<%= dir.src %>/_scope.scss',
                    '<%= dir.src %>/_theme.scss',
                    '<%= dir.src %>/_state.scss',
                    '<%= dir.src %>/_hack.scss',
                ],
                dest: '<%= dir.dist %>/_<%= pkg.name %>.scss',
            },
        },

        bump: {
            options: {
                files: ['package.json', 'bower.json', 'lib/bem-constructor.rb', 'dist/_bem-constructor.scss'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Bump version %VERSION%',
                commitFiles: ['package.json', 'bower.json', 'lib/bem-constructor.rb', 'dist/_bem-constructor.scss'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                prereleaseName: 'pre',
                regExp: new RegExp('([\'|\"]?[version|VERSION][\'|\"]?[ ]*[:|=][ ]*[\'|\"]?)(\\d+\\.\\d+\\.\\d+(-\\.\\d+)?(-\\d+)?)[\\d||A-a|.|-]*([\'|\"]?)', 'i')
            }
        },

        bootcamp: {
            test: {
                files: {
                    src: ['./tmp/results.css']
                }
            }
        },

        sass: {
            tests: {
                options: {
                    compass: false,
                    loadPath: ['./node_modules/bootcamp/dist', 'stylesheets']
                },
                files: {
                    './tmp/results.css': 'test/tests.scss'
                }
            }
        },

        watch: {
            dist: {
                files: [
                    'test/**/*.scss',
                    './<%= dir.src %>/**/*.scss'
                ],
                tasks: ['sass', 'bootcamp']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('bootcamp');

    grunt.registerTask('test', ['sass', 'bootcamp']);
    grunt.registerTask('dev', ['test', 'watch']);
    grunt.registerTask('build', ['test', 'concat']);

    var versionBump = grunt.option('versionBump') || 'minor';
    grunt.registerTask('release', ['build', 'bump-only:' + versionBump, 'bump-commit']);
}

