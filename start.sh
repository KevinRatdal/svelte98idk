#!/usr/bin/env zsh
fnm use 22;
pm2 start npm --name "svelte 2048" -- run host
