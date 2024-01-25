#! /bin/sh

set -eu

source /root/.aws/.env

restic -r s3:http://10.24.0.60:31571/palworld init || true
restic -r s3:http://10.24.0.60:31571/palworld --verbose backup /mnt/source/steamapps/common/PalServer/Pal/Saved/SaveGames
