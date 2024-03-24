#!/usr/bin/env zsh
fnm use 21;
PATH=5174 pm2 start node --name "svelte 2048" -- build
