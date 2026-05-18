# Ruby 3.2 removed Object#tainted?, but older Liquid versions used by
# legacy Jekyll/GitHub Pages stacks still call it during `{% assign %}`.
# This shim is only for local preview with the separately installed Ruby.
unless Object.method_defined?(:tainted?)
  class Object
    def tainted?
      false
    end
  end
end
