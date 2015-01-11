define(function() {
  var articles = {
    client: ko.observable({}),
    server: ko.observable({}),
  }
  var addArticles = function(topics, context) {
    articles[context](_.extend(articles[context](), topics))
  }
  var specs = ko.observable({})
  var addSpec = function(identifier, s) {
    specs()[identifier] = s
    specs(specs())
  }
  var defaultArticle = function(mod) {
    var attrs = Object.keys(mod).map(function(key) {
      return [key, encodeURIComponent(mod[key])].join('=')
    })
    var article = {}
    article[mod.display_name] = "coui://ui/mods/mod_help_player_guide/article/mod.html?" + attrs.join('&')
    return article
  }

  var record = function(mod) {
    return function(data) {
      //console.log(data)
      try {
        var ext = JSON.parse(data)
        if (ext) {
          addSpec(mod.identifier, ext)
          if (ext.articles) {
            addArticles(ext.articles, mod.context)
          } else {
            console.log('no help articles found in', this.url)
            addArticles(defaultArticle(mod), mod.context)
          }
        } else {
          console.warn('did not parse', this.url)
          addArticles(defaultArticle(mod), mod.context)
        }
      } catch(e) {
        console.error('json parsing error in file', this.url, e.message)
        addArticles(defaultArticle(mod), mod.context)
      }
    }
  }
  var failure = function(mod) {
    return function() {
      //console.log('no help found for', this.url)
      addArticles(defaultArticle(mod), mod.context)
    }
  }
  var loadModHelp = function(mod) {
    var url = 'coui://'+mod.identifier+'/mod_help.json'
    $.ajax({
      url: url,
      success: record(mod),
      error: failure(mod)
    });
  }

  var mounted = function(mods) {
    mods.forEach(loadModHelp)
  }

  api.mods.getMountedMods('client', mounted)
  api.mods.getMountedMods('server', mounted)

  if (handlers.mount_mod_file_data) {
    var base_mount_mod_file_data = handlers.mount_mod_file_data
    handlers.mount_mod_file_data = function() {
      base_mount_mod_file_data.apply(this, arguments)
      api.mods.getMountedMods('server', mounted)
    }
  }

  return {
    specs: specs,
    articles: articles,
  }
})
