(cd web && npm i && NODE_ENV=production npm start) &
WEB=$!

wait $WEB
