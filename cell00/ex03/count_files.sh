#!/bin/bash
find . -maxdepth 1 -mindepth 1 \( -type f -o -type d \) | wc -l
