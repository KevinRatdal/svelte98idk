#!/usr/bin/env zsh
fnm use 21;
pm2 start npm --name "svelte 2048" -- run preview
