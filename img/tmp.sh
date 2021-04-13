#!/bin/bash

for f in *.webp; do
    length=${#f}
    endindex=$(expr $length - 5)
    dwebp $f -o ${f:0:$endindex}.png
done
