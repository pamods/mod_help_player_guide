(function() {
  var config = require.s.contexts._.config
  config.waitSeconds = 0
  config.paths.server_mod_player_guide = 'coui://ui/mods/server_mod_player_guide'
})()

require([
  'server_mod_player_guide/info',
  'server_mod_player_guide/tabs',
], function(info, tabs) {
  model.serverModHelpArticles = ko.observableArray([])
  info.articles.subscribe(model.serverModHelpArticles)
  model.serverModHelpArticles(info.articles())

  model.serverModHelpArticleList = ko.computed(function() {
    var articles = model.serverModHelpArticles()
    var list = []
    for (var name in articles) {
      list.push({title: name, url: articles[name]})
    }
    return list
  })

  $('.col_1').css('overflow-y', 'auto')

  tabs(ko.observableArray([{title: "Mods", articles: model.serverModHelpArticleList}]))
})
