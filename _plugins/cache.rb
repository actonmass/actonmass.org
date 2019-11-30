module Cache
  class Generator < Jekyll::Generator
    def generate(site)
      cache = {}

      legislator_by_id = {}
      for legislator in site.collections['legislators'].docs do
        id = legislator.id.delete_prefix("/legislators/")
        legislator_by_id[id] = legislator
      end
      cache['legislator_by_id'] = legislator_by_id

      district_by_id = {}
      for district in site.collections['districts'].docs do
        id = district.id.delete_prefix("/districts/")
        district_by_id[id] = district
      end
      cache['district_by_id'] = district_by_id

      site.data['cache'] = cache
    end
  end
end
