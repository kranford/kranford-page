/* jshint node: true */

module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
            ' * Kranford home page v<%= pkg.version %> by Paweł Cesar Sanjuan Szklarz @PSanjuanSzklarz \n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> Kranford\n' +
            ' * Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
            ' */\n\n',
        less: {
            bootstrap_dev: {
                files: {
                    'app/styles/app.css': 'app/less/bootstrap.less'
                },
                options: {
                    dumpLineNumbers: "all"
                }
            },
            theme_dev: {
                files: {
                    'app/styles/app-theme.css': 'app/less/theme.less'
                },
                options: {
                    dumpLineNumbers: "all"
                }
            },
            bootstrap: {
                options: {
                    cleancss: true,
                    compress: true
                },
                files: {
                    'dist/styles/app.min.css': 'app/less/bootstrap.less'
                }
            },
            theme: {
                options: {
                    cleancss: true,
                    compress: true
                },
                files: {
                    'dist/styles/app-theme.min.css': 'app/less/theme.less'
                }
            }
        },
        clean: {
            dist: ['dist']
        },
        copy: {
            html: {
                src: ["app/appBin.html"],
                dest: 'dist/index.html'
            },
            fonts: {
                expand: true,
                flatten: true,
                src: ["app/scripts/vendor/bootstrap/fonts/*"],
                dest: 'dist/fonts/'
            },
            assets: {
                files: [
                    {expand: true, cwd: 'app/assets/', src: ['**'], dest: 'dist/assets/'},
                    {expand: true, cwd: 'content/', src: ['**'], dest: 'dist/'}
                ]
            },
            fonts_dev: {
                expand: true,
                flatten: true,
                src: ["app/scripts/vendor/bootstrap/fonts/*"],
                dest: 'app/fonts/'
            }
        },
        watch: {
            less: {
                files: 'app/less/*.less',
                tasks: ['less:bootstrap_dev', 'less:theme_dev'],
                options: {
                    livereload: true
                }
            },
            content: {
                files: 'app/scripts/**/*',
                tasks: [],
                options: {
                    livereload: true
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "app/scripts",
                    name: "main",
                    out: 'dist/app_bin.js',
                    include: ["requireLib"],
                    paths: {
                        requireLib: 'vendor/requirejs/require'
                    },
                    mainConfigFile: 'app/scripts/main.js',
                    optimize: "uglify2",
                    throwWhen: {
                        optimize: true
                    },
                    has: {
                        consoleDebug: false,
                        fakeBackend: true
                    },
                    uglify2: {
                        output: {
                            beautify: false
                        },
                        compress: {
                            sequences: false,
                            dead_code: true,
                            unused: true,
                            global_defs: {
                                DEBUG: false
                            }
                        },
                        warnings: true,
                        mangle: true
                    },
                    generateSourceMaps: false,
                    preserveLicenseComments: true
                }
            }
        },
        sed: {
            version: {
                path: ['dist/index.html'],
                pattern: '{{ version_data }}',
                replacement: '<%= pkg.version %>',
                recursive: false
            }
        },
        connect: {
            devserver: {
                options: {
                    port: 8001,
                    hostname: '*',
                    base: ['app', 'content'],
                    livereload: true
                }
            },
            binserver: {
                options: {
                    port: 8001,
                    hostname: '*',
                    base: 'dist'
                }
            }
        }
    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-sed');
    grunt.loadNpmTasks('grunt-contrib-less');


    // CSS distribution task.
    grunt.registerTask('dist-css', ['less:bootstrap', 'less:theme']);
    grunt.registerTask('dist-js', ['requirejs']);

    // content distribution task.
    grunt.registerTask('dist-content', ['copy']);
    grunt.registerTask('dist-sed', ['sed']);

    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'dist-css', 'dist-content', 'dist-js', 'dist-sed']);

    // Default task.
    grunt.registerTask('default', [ 'clean', 'dist']);


    grunt.registerTask('dev_watch_mode', [ 'watch']);


    grunt.registerTask('dev', [ 'copy:fonts_dev', 'connect:devserver', 'less:bootstrap_dev', 'less:theme_dev', 'dev_watch_mode']);
    grunt.registerTask('bin', [ 'dist', 'connect:binserver:keepalive']);


};
