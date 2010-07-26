module Server; end

Dir[File.join(File.dirname(__FILE__), 'server', '**', '*.rb')].each { |file| require file }