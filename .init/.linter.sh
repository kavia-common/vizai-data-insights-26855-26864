#!/bin/bash
cd /home/kavia/workspace/code-generation/vizai-data-insights-26855-26864/frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

