#!/bin/sh

ROOT_DIR=/usr/share/nginx/html

echo "Replacing env constants in JS"
for file in $ROOT_DIR/js/*.js* $ROOT_DIR/index.html $ROOT_DIR/precache-manifest*.js;
do
  echo "Processing $file ...";

  sed -i 's|VUE_APP_API|'${VUE_APP_API}'|g' $file
  sed -i 's|VUE_APP_VER|'${VUE_APP_VER}'|g' $file

done

echo "Starting Nginx"
nginx -g 'daemon off;'