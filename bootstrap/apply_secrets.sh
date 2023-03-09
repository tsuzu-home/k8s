#! /bin/bash

set -eux

kubectl create secret generic -n kube-system op-credentials --from-literal=1password-credentials.json=$(op document get  --vault Kubernetes "Tsuzu's Kubernetes Credentials File")
kubectl create secret generic -n kube-system onepassword-connect-token-kubernetes --from-literal=token=$(op item get --vault Kubernetes "Tsuzu's Kubernetes Access Token: infra-cluster" --field 認証情報)
