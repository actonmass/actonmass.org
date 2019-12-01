module Cache
  class Generator < Jekyll::Generator
    def generate(site)
      cache = {}

      for collection in ["legislators", "districts", "committees"] do
        item_by_id = {}
        for item in site.collections[collection].docs do
          id = item.id.delete_prefix("/#{collection}/")
          item_by_id[id] = item
        end
        cache["#{collection}_by_id"] = item_by_id
      end

      for legislator in site.collections["legislators"].docs do
        legislator.data["committees"] = []
      end
      legislators = cache["legislators_by_id"]
      for committee in site.collections["committees"].docs do
        title = committee["title"]
        for chamber in  ["house","senate"] do
          if [chamber, "joint"].include? committee["chamber"] then
            chair = legislators[committee["#{chamber}_chair"]]
            chair.data["committees"].push({"role" => "Chair", "title" => title})
            vice_chair = legislators[committee["#{chamber}_vice_chair"]]
            vice_chair.data["committees"].push({"role" => "Vice-chair", "title" => title})
            for member_id in committee["#{chamber}_members"] do
              member = legislators[member_id]
              member.data["committees"].push({"role" => "Member", "title" => title})
            end
          end
        end
      end
      site.data["cache"] = cache
    end
  end
end
