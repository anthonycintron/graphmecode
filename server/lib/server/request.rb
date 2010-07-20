require 'rubygems'
require 'yajl'

module Server
  class Request
    attr_reader :data

    def self.parse(data)
      new(data)
    end

    def initialize(data)
      @data = Yajl::Parser.parse(data)
      @action = @data['action'] or raise RequestError, 'no action specified'
    end

    def route
      Router.route(@action, @data)
    end

  private
    class RequestError < RuntimeError; end
  end
end