module.exports = function(grunt) {

  grunt.initConfig({

    cssmin: {
      combine: {
        files: {
          "public/stylesheets/application.min.css":
          [
          "bower_components/bootstrap/docs/assets/css/bootstrap.css",
          "bower_components/bootstrap/docs/assets/css/bootstrap-responsive.css",
          "assets/stylesheets/application.css"
          ]
        }
      }
    },

    watch: {
      options: {
        // livereload: true,
      },
      css: {
        files: ["assets/stylesheets/application.css"],
        tasks: ["cssmin"],
      },
    },

    bgShell: {
      gitAdd: {
        cmd: "git add public/images/ -A"
      },
      gitCommit: {
        cmd: 'git commit -m "grunt deploy, task imagemin"'
      },
      gitPush: {
        cmd: 'git push'
      }
    },

    imagemin: {
      dynamic: {
        files: [
          {
            expand: true,
            cwd: "public/images/",
            src: ["*.{png,jpg,jpeg,gif,ico}"],
            dest: "public/images/"
          },
          {
            expand: true,
            cwd: "public/images/team/",
            src: ["*.{png,jpg,jpeg,gif}"],
            dest: "public/images/team/"
          },
          {
            expand: true,
            cwd: "public/images/speakers/",
            src: ["*.{png,jpg,jpeg,gif}"],
            dest: "public/images/speakers/"
          }
        ]
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-bg-shell");

  grunt.registerTask("deploy", ["cssmin", "imagemin", "bgShell"]);
  grunt.registerTask("default", ["watch"]);
};
