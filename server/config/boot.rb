$LOAD_PATH.unshift File.dirname(__FILE__) + '/../lib'

require 'rubygems'
require 'sequel'
require 'yajl'

ROOT_DIR = File.join(File.dirname(__FILE__), '..')

# load Sequel
DB = Sequel.sqlite(File.join(ROOT_DIR, 'db/ws.db'))

# load models

Dir[File.join(ROOT_DIR, 'app', 'models', '**', '*.rb')].each { |file| require file }