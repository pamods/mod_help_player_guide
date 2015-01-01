(function() {
  var config = require.s.contexts._.config
  config.waitSeconds = 0
  config.paths.server_mod_player_guide = 'coui://ui/mods/server_mod_player_guide'

  model.serverModHelpArticles = ko.observableArray([])
  model.serverModHelpArticleList = ko.computed(function() {
    var articles = model.serverModHelpArticles()
    var list = []
    for (var name in articles) {
      list.push({title: name, url: articles[name]})
    }
    return list
  })

  $('.col_1').css('overflow-y', 'auto')
  $('.section_controls ul').append('<!-- ko foreach: serverModHelpArticleList --><li><a class="btn_std_ix" target="navigation" data-bind="attr: {href: url}, text: title"></a></li><!-- /ko -->')
})()

require([
  'server_mod_player_guide/info'
], function(info) {
  info.articles.subscribe(model.serverModHelpArticles)
  model.serverModHelpArticles(info.articles())
})
