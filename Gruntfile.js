module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
         dir : {
            src : 'stylesheets',
            dist : 'dist'
        },
        pkg: grunt.file.readJSON('package.json'),

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
    grunt.loadNpmTasks('bootcamp');

    grunt.registerTask('test', ['sass', 'bootcamp']);
    grunt.registerTask('dev', ['test', 'watch']);
    //grunt.registerTask('build', ['test', 'concat']);
}

