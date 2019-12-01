module Cache
  class Generator < Jekyll::Generator
    def generate(site)
      cache = {}
      for collection in ['legislators', 'districts', 'committees'] do
        item_by_id = {}
        for item in site.collections[collection].docs do
          id = item.id.delete_prefix("/#{collection}/")
          item_by_id[id] = item
        end
        cache["#{collection}_by_id"] = item_by_id
      end
      site.data['cache'] = cache
    end
  end
end
