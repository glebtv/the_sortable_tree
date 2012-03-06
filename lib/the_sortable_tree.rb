# So, ERB and SLIM fans want to make gem became independent of HAML
# Ok, let it be. But you will convert view partials youself
# require "haml"

require "the_sortable_tree/engine"
require "the_sortable_tree/version"

module TheSortableTree
  # include TheSortableTree::Scopes
  module Scopes
    def self.included(base)
      if defined?(Mongoid)
        base.class_eval do
          scope :nested_set,          order_by(:lft => :asc)
          scope :reversed_nested_set, order_by(:lft => :desc)
        end
      else
        base.class_eval do
          scope :nested_set, order('lft ASC')
          scope :reversed_nested_set, order('lft DESC')
        end
      end
    end
  end
end
