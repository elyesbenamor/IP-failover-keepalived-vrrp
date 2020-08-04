#!/bin/bash
echo "[TASK 1] Installing keepalived"
sudo apt install libssl-dev build-essential
wget https://www.keepalived.org/software/keepalived-2.0.15.tar.gz
sudo tar xvzf keepalived-2.0.15.tar.gz
cd keepalived-2.0.15
sudo ./configure --prefix=/usr/local
sudo make && sudo make install

echo "[TASK 2] start keepalived service"
#copy the default config in case we want tio use it 
cp \
  keepalived-2.0.15/keepalived/keepalived.service \
  /etc/systemd/system/
ln -s \
  /etc/systemd/system/keepalived.service \
  /etc/systemd/system/multi-user.target.wants/keepalived.service

sudo service keepalived start
sudo service keepalived enable

#assign floating ip to all servers
echo "[TASK 3] assign floating ip to servers"
sudo cat >>/etc/systemd/network/50-default.networkf<<EOF
[Network]
Address={FLOATING_IP}/32
EOF

echo "[TASK 4] restart service"
sudo systemctl restart systemd-networkd

echo "[TASK 5] add configuration"
sudo cat >>/etc/keepalived/keepalived.conf<<EOF
global_defs {
    enable_script_security
    script_user node
}
vrrp_script chk_haproxy {
    script "/usr/bin/pkill -0 haproxy"
    interval 2
    weight 2
}
vrrp_script chk_node {
    script ""
    interval 2
    weight 2
}
vrrp_instance VI_1 {
    interface x
    state MASTER
    priority 101
    virtual_router_id 42
    unicast_src_ip {{ masterserver_ip_address }}
    unicast_peer {
        {{ slave_ip_address }}
    }
    authentication {
        auth_type PASS
        auth_pass *****
    }
    track_script {
        chk_haproxy
        chk_node
    }
    notify_master /etc/keepalived/nodeovh.js
}
EOF