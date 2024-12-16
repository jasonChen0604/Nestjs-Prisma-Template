pnpm build && pm2 delete ecosystem.config.js && pm2 startOrReload ecosystem.config.js --node-args="--max-old-space-size=4096" --update-env
