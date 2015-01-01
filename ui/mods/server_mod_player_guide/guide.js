(function() {
  $('.col_1').css('overflow-y', 'auto')

  var addArticle = function(title, url) {
    $('.section_controls ul').append('<li><a class="btn_std_ix" href="'+url+'"target="navigation">'+title+'</a></li>')
  }

  var registerMods = function(mods) {
    mods.forEach(function(mod) {
      var attrs = Object.keys(mod).map(function(key) {
        return [key, encodeURIComponent(mod[key])].join('=')
      })
      addArticle(mod.display_name, "coui://ui/mods/server_mod_player_guide/article/mod.html?" + attrs.join('&'))
    })
  }

  api.mods.getMountedMods('server', registerMods)
  api.mods.getMountedMods('client', registerMods)
})()
