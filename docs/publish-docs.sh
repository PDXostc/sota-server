#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

# tidy up last run
rm -rf rvi_sota_server

# build latest docs
docker run -v $(pwd):/site advancedtelematic/jekyll-asciidoc

# clone repo
git clone -b gh-pages git@github.com:advancedtelematic/rvi_sota_server.git 

# cp _site to gh-pages branch
cp -r _site/* rvi_sota_server/

# generate json
cd rvi_sota_server/swagger/
docker run -v $(pwd):/site --entrypoint=/bin/bash advancedtelematic/jekyll-asciidoc ./mkjson.sh

# commit and push
git commit -am "doc updates for commit $(git -C ../../ describe --tags)"
git show --numstat
git push origin gh-pages
