(function() {
  $('.col_1').css('overflow-y', 'auto')

  var addArticle = function(title, url) {
    $('.section_controls ul').append('<li><a class="btn_std_ix" href="'+url+'"target="navigation">'+title+'</a></li>')
  }
  addArticle("Player Guide Ex", "coui://ui/mods/player_guide_ex/article/player_guide_ex.html")

  var registerMods = function(mods) {
    mods.forEach(function(mod) {
      var attrs = Object.keys(mod).map(function(key) {
        return [key, encodeURIComponent(mod[key])].join('=')
      })
      addArticle(mod.display_name, "coui://ui/mods/player_guide_ex/article/mod.html?" + attrs.join('&'))
    })
  }

  api.mods.getMountedMods('server', registerMods)
  api.mods.getMountedMods('client', registerMods)
})()
