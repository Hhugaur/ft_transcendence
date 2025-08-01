#!/bin/bash

if [ -f src/game.node ]; then
	node-gyp configure
	make -C build
	mv build/Release/game.node src
	rm -fr build
	chmod 777 src/game.node
fi

node src/entry.js
