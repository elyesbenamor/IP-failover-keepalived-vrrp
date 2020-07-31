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

