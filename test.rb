def bottom_2_peer(num, s, old_peer)
  num = s == true ? old_peer : num
  head = 0
  peer = num/2
  bottom = num%2
  bottom += peer
  head += peer
  d1 = num/2
  return peer, bottom, head, d1
end
def head_2_peer(num, s, old_peer)
  num = s == true ? old_peer : num
  bottom = 0
  peer = num/4
  head = num%4
  bottom += peer
  head += peer
  d1 = num/4
  return peer, bottom, head, d1
end

def calculate_beer(peer)
  bottom = 0
  head=0
  old_peer = peer
  queue_no_1 = true
  loop do
    peer_tmp, bottom_tmp, head_tmp, haha1 = bottom_2_peer(bottom, queue_no_1, old_peer)
    peer_tmp1, bottom_tmp1, head_tmp1, haha = head_2_peer(head, queue_no_1, old_peer)
    bottom = 0
    head = 0
    peer += peer_tmp
    bottom += bottom_tmp
    head += head_tmp
    peer += peer_tmp1
    bottom += bottom_tmp1
    head += head_tmp1
    queue_no_1 = false
    if bottom < 2 && head < 4 && haha1 == 0 && haha == 0
      puts "一共能喝到 #{peer} 瓶啤酒"
      break
    end
  end
end

calculate_beer(50)
