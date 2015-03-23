var prompt = require('prompt')
prompt.start()

var modPath = '../../server_mods/com.wondible.pa.mod_help_player_guide.server/'
var stream = 'stable'
var media = require('./lib/path').media(stream)
console.log(media)

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    copy: {
      mod: {
        files: [
          {
            src: [
              'modinfo.json',
              'LICENSE.txt',
              'README.md',
              'CHANGELOG.md',
              'com.wondible.*/**',
              'ui/**',
              'pa/**'],
            dest: modPath,
          },
        ],
      },
      modinfo: {
        files: [
          {
            src: ['modinfo.json'],
            dest: modPath,
          },
        ],
        options: {
          process: function(content, srcpath) {
            var info = JSON.parse(content)
            info.date = require('dateformat')(new Date(), 'yyyy/mm/dd')
            info.identifier = info.identifier.replace('client', 'server')
            info.context = 'server'
            delete(info.priority)
            console.log(info.identifier, info.version, info.date)
            return JSON.stringify(info, null, 2)
          }
        }
      },
    },
    clean: [modPath],
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['copy']);

};

