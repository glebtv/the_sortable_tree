//= require jquery
//= require jquery_ujs
//= require jquery.ui.sortable
//= require jquery.mjs.nestedSortable

function sortable_tree_init(tree_config) {
  function sortable_tree(item_id, parent_id, prev_id, next_id){
      var data = {
              id: item_id,
              parent_id: parent_id,
              prev_id: prev_id,
              next_id: next_id
          };
      $.ajax({
          type: 'POST',
          dataType: 'html',
          url: tree_config['rebuild_url'],
          data: data,
          error: function(xhr, status, error){
              alert(error);
              window.location.reload();
          }
      });
  }

  $(function(){
      $('#' + tree_config['id']).nestedSortable({
          disableNesting: 'no-nest',
          forcePlaceholderSize: true,
          handle: 'i.handle',
          helper: 'clone',
          items: 'li',
          maxLevels: tree_config['max_levels'],
          opacity: .6,
          placeholder: 'placeholder',
          revert: 250,
          tabSize: 25,
          tolerance: 'pointer',
          toleranceElement: '> div',
          update: function(event, ui){
              parent_id = ui.item.parent().parent().data('id');
              item_id = ui.item.data('id');
              prev_id = ui.item.prev().data('id');
              next_id = ui.item.next().data('id');
              sortable_tree(item_id, parent_id, prev_id, next_id);
          }
      });

      function handleMethod(t) {
          var $t = $(t);
          $.ajax({
              url: $t.attr('href'),
              type: 'POST',
              success: function(resp) {
                  if (resp.split("|")[0] == 'false') {
                      $t.add($t.parents('.link').parent().find('a.on')).removeClass('on').addClass('off');
                  } else {
                      $t.add($t.parents('.link').parent().find('a.off')).removeClass('off').addClass('on');
                  }
                  $t.prop('title', resp.split("|")[1])
              },
              error: function() {
                  alert('При обращении к серверу произошла ошибка.');
              }
          });

          return false;
      }

      $('#' + tree_config['id']).on('click', 'a.on', function() {
          return handleMethod(this);
      });
      $('#' + tree_config['id']).on('click', 'a.off', function() {
          return handleMethod(this);
      });
  });
}