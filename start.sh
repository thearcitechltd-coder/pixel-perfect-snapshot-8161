#!/bin/sh
# Start the Node.js server in the background
PORT=3000 node .output/server/index.mjs &

# Start nginx in the foreground
nginx -g 'daemon off;'
