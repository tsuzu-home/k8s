#! /bin/bash

for butane in $(find . -name "*.bu"); do
    base=$(basename $butane)

    docker run --rm --interactive \
        --volume ${PWD}:/pwd --workdir /pwd \
        quay.io/coreos/butane:release \
        --pretty --strict "$butane" > "$(dirname $butane)/${base%.*}.ign"
done

