#! /bin/bash

set -eux

cd /home/steam/steamcmd

./steamcmd.sh +login anonymous +app_update 2394010 validate +quit || true
cd ~/Steam/steamapps/common/PalServer

cp /config/PalWorldSettings.ini /home/steam/Steam/steamapps/common/PalServer/Pal/Saved/Config/LinuxServer/PalWorldSettings.ini || true

exec ./PalServer.sh -useperfthreads -NoAsyncLoadingThread -UseMultithreadForDS
