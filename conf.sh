#!/bin/bash
echo "[TASK 1] add configuration"

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