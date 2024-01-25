#! /bin/bash

echo "$AWS_ROLE_ARN"
aws s3 ls s3://palworld

aws configure export-credentials --format env > /root/.aws/.env
