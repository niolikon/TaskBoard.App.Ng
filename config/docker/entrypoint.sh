#!/bin/sh

echo "[entrypoint.sh] Injecting environment variables into Angular..."

envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js

echo "[entrypoint.sh] Done. Starting nginx..."
exec "$@"
