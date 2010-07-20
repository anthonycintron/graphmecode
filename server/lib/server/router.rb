module Server
  class Router
    # Move over to a Yaml file or something later
    ACTIONS = {
      'find' => lambda { |data|
        user = User[data['id']]
        user.to_json
      }
    }

    def self.route(action, data={})
      ACTIONS[action].call(data)
    end
  end
end