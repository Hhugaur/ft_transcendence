#!/bin/bash

node-gyp configure
make -C build
mv build/Release/game.node src
rm -fr build
chmod 777 src/game.node

node src/entry.js
