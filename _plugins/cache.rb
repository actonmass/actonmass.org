module Cache
  class Generator < Jekyll::Generator

    def generate_cache(site)
      cache = {}
      for collection in ["legislators", "districts", "committees", "bill_events"] do
        item_by_id = {}
        for item in site.collections[collection].docs do
          id = item.id.delete_prefix("/#{collection}/")
          item_by_id[id] = item
        end
        cache["#{collection}_by_id"] = item_by_id
      end
      site.data["cache"] = cache
    end

    def generate_legislator_committees(site)
      cache = site.data["cache"]
      for legislator in site.collections["legislators"].docs do
        legislator.data["committees"] = []
      end
      legislators = cache["legislators_by_id"]
      for committee in site.collections["committees"].docs do
        title = committee["title"]
        for chamber in  ["house","senate"] do
          if [chamber, "joint"].include? committee["chamber"] then
            chair = legislators[committee["#{chamber}_chair"]]
            chair.data["committees"].push({"role" => "Chair", "title" => title, "priority" => 1})
            vice_chair = legislators[committee["#{chamber}_vice_chair"]]
            vice_chair.data["committees"].push({"role" => "Vice-chair", "title" => title, "priority" => 2})
            for member_id in committee["#{chamber}_members"] do
              member = legislators[member_id]
              member.data["committees"].push({"role" => "Member", "title" => title, "priority" => 3})
            end
          end
        end
      end
    end

    def generate_legislator_votes(site)
      cache = site.data["cache"]
      for legislator in site.collections["legislators"].docs do
        legislator.data["votes"] = []
      end
      legislators = cache["legislators_by_id"]
      for bill_event in site.collections["bill_events"].docs do
        votes = bill_event.data["votes"]
        if (votes == nil) then
          next
        end
        votes.each do |leg_id, vote|
          leg = legislators[leg_id]
          if (leg == nil) then
            next  # Ignore legislators that are not in our DB
          end
          if bill_event.data["progressive_vote"] then
            is_progressive_vote = vote
          else
            is_progressive_vote = (vote.is_a? String) ? vote : !vote
          end
          vote_description = bill_event.data["vote_descriptions"][vote]
          leg.data["votes"].push({
            "is_progressive" => is_progressive_vote,
            "description" => vote_description,
            "date" => bill_event.data["date"],
            "priority" => bill_event.data["prority"],
          })
        end
      end
    end

    def generate_legislator_cosponsored_bills(site)
      cache = site.data["cache"]
      for legislator in site.collections["legislators"].docs do
        legislator.data["cosponsored_bills"] = []
      end
      legislators = cache["legislators_by_id"]
      for bill in site.collections["bills"].docs do
        co_sponsors = bill.data["co_sponsors"]
        for leg_id in co_sponsors do
          leg = legislators[leg_id]
          leg.data["cosponsored_bills"].push(bill.id)
        end
      end
    end

    def generate(site)
      generate_cache(site)
      generate_legislator_committees(site)
      generate_legislator_votes(site)
      generate_legislator_cosponsored_bills(site)

      warn site.data["cache"]["legislators_by_id"]["liz-miranda"]["cosponsored_bills"]
    end
  end
end
