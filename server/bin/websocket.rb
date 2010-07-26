#!/usr/bin/env ruby

require 'config/boot'
require 'em-websocket'
require 'evented_redis'
require 'server'

EventMachine::WebSocket.start(:host => '0.0.0.0', :port => '6789', :debug => true) do |ws|
  ws.onopen do
    puts "working"
    @redis = EventedRedis.connect
=begin
    @redis.subscribe('test') do |type, channel, message|
      puts "#{type} #{channel} #{message}"
      ws.send "#{message}"
    end
=end
  end

  ws.onmessage do |msg|
    puts "Received: #{msg}"
    request = Server::Request.parse(msg)
    puts "Data: #{request}"
    ws.send(request.route)
  end

  ws.onclose do
    @redis.unsubscribe('test')
    @redis.disconnect
    puts "Closed"
  end
end