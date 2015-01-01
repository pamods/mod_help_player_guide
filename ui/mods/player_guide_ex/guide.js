(function() {
  var addArticle = function(title, url) {
    $('.section_controls ul').append('<li><a class="btn_std_ix" href="'+url+'"target="navigation">'+title+'</a></li>')
  }
  addArticle("Player Guide Ex", "coui://ui/mods/player_guide_ex/article/player_guide_ex.html")
})()
