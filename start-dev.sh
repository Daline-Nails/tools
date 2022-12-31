(cd web && npm i && NODE_ENV=development npm run dev) &
WEB=$!

wait $WEB
