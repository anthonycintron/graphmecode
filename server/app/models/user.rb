class User < Sequel::Model

  def to_json
    data = { 'id' => self.id, 'public_key' => self.public_key }
    Yajl::Encoder.encode(data)
  end
end