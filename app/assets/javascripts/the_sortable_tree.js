//= require jquery.ui.sortable
//= require jquery.ui.nestedSortable

function sortable_tree_init(tree_config) {
  function sortable_tree(item_id, parent_id, prev_id, next_id){
      jQuery.ajax({
          type: 'POST',
          dataType: 'html',
          url: tree_config['rebuild_url'],
          data: {
              id: item_id,
              parent_id: parent_id,
              prev_id: prev_id,
              next_id: next_id
          },

          beforeSend: function(xhr){
              $('.nested_set i.handle').hide();
          },
          success: function(data, status, xhr) {
              $('.nested_set i.handle').show();
          },
          error: function(xhr, status, error){
              alert(error);
          }
      });
  }

  $(function(){
      $('ol.sortable').nestedSortable({
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
          toleranceElement: '> div'
      });

      $('ol.sortable').sortable({
          update: function(event, ui){
              parent_id = ui.item.parent().parent().data('id');
              item_id = ui.item.data('id');
              prev_id = ui.item.prev().data('id');
              next_id = ui.item.next().data('id');
              sortable_tree(item_id, parent_id, prev_id, next_id);
          }
      });
  });
}