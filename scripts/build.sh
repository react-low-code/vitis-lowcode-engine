#!/usr/bin/env bash

lerna run build \
  --scope vitis-lowcode-types \
  --scope vitis-lowcode-monaco-editor \
  --scope vitis-lowcode-default-ext \
  --scope vitis-lowcode-renderer \
  --scope vitis-lowcode-simulator-renderer \
  --scope vitis-lowcode-engine \
  --scope vitis-lowcode-code-generator\
  --stream

lerna run build:umd \
  --scope vitis-lowcode-engine \
  --scope vitis-lowcode-simulator-renderer \
  --scope vitis-lowcode-renderer \
  --stream

