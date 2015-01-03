(function() {
  var config = require.s.contexts._.config
  config.waitSeconds = 0
  config.paths.mod_help_player_guide = 'coui://ui/mods/mod_help_player_guide'
})()

require([
  'mod_help_player_guide/info',
  'mod_help_player_guide/tabs',
], function(info, tabs) {
  $('.col_1').css('overflow-y', 'auto')

  var articleList = function(articles) {
    var list = []
    for (var name in articles) {
      list.push({title: name, url: articles[name]})
    }
    return list
  }

  var serverModHelpArticleTabs = [
    {
      title: 'Client Mods',
      articles: ko.computed(function() {
        return articleList(info.articles.client())
      })
    },
    {
      title: 'Server Mods',
      articles: ko.computed(function() {
        return articleList(info.articles.server())
      })
    }
  ]

  tabs(serverModHelpArticleTabs)
})
