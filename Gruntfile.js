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
            delete(info.scenes)
            delete(info.priority)
            console.log(info.identifier, info.version, info.date)
            return JSON.stringify(info, null, 2)
          }
        }
      },
      new_game: {
        files: [
          {
            expand: true,
            cwd: media,
            src: [
              'ui/main/game/new_game/new_game.js'
            ],
            dest: modPath,
          },
        ],
        options: {
          process: function(contents, path) {
            return contents.replace('// inject per scene mods', 'if (!scene_mod_list["new_game"] || scene_mod_list["new_game"].indexOf("coui://ui/mods/mod_help_player_guide/new_game.js") == -1) loadMods(["coui://ui/mods/mod_help_player_guide/new_game.js"])')
          }
        }
      },
      guide: {
        files: [
          {
            expand: true,
            cwd: media,
            src: [
              'ui/main/game/guide/guide.js'
            ],
            dest: modPath,
          },
        ],
        options: {
          process: function(contents, path) {
            return contents.replace('// inject per scene mods', 'if (!scene_mod_list["guide"] || scene_mod_list["guide"].indexOf("coui://ui/mods/mod_help_player_guide/guide.js") == -1) loadMods(["coui://ui/mods/mod_help_player_guide/guide.js"])')
          }
        }
      }
    },
    clean: ['ui/main', modPath],
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['copy']);

};

