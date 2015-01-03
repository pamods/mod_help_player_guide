define(function() {
  return function(tabs) {
    model.playerGuideModTabs = tabs

    model.playerGuideModId = function(title) {
      return title.replace(/\W/, '_')
    }
    model.playerGuideModHref = function(title) {
      return '#' + model.playerGuideModId(title)
    }
    model.playerGuideModNavigation = function(title) {
      return title.replace(/\W/, '_') + 'navigation'
    }
    model.showTab = function(articles) {
      return articles().length > 0
    }
    model.dump = function(obj) {
      return JSON.stringify(obj)
    }

    var $pills = $('.nav-pills')
    if ($pills.length < 1) {
      $('.section_content_top_bar').append(
        '<div class="tab_cont"><div class="tabs">'+
               '<ul class="nav-pills">'+
                    '<li class="active"><a data-toggle="pill" href="#basics" data-bind="click_sound: \'default\', rollover_sound: \'default\'">Basics</a></li>'+
                '</ul>'+
            '</div>'+
        '</div>')
    }
    var $tabPills = $('<div><!-- ko foreach: playerGuideModTabs -->'+
      '<li><a data-toggle="pill" data-bind="click_sound: \'default\', rollover_sound: \'default\', attr: {href: $root.playerGuideModHref(title)}, visible: articles().length > 0, text: title"></a></li>'+
      '<!-- /ko --></div>')
    ko.applyBindings(model, $tabPills[0])
    $('.nav-pills').append($tabPills.children())

    var $pane = $(
      '<div><!-- ko foreach: playerGuideModTabs -->' +
      $('#basics')[0].outerHTML + 
      '<!-- /ko --></div>'
    )
    $pane.find('#basics')
      .removeAttr('id')
      .attr('data-bind', "attr: {id: $root.playerGuideModId(title)}")
    $pane.find('.active').removeClass('active')
    $pane.find('[name=navigation]')
      .attr('src', '')
      .attr('data-bind', "attr: {name: $root.playerGuideModNavigation(title)}")
    $pane.find('ul').replaceWith('<ul data-bind="foreach: articles"><li><a class="btn_std_ix" target="navigation" data-bind="attr: {target: $root.playerGuideModNavigation($parent.title), href: url}, text: title"></a></li></ul>')
    ko.applyBindings(model, $pane[0])
    $('.tab-content').append($pane.children())
  }
})
