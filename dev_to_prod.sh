#!/bin/bash

sed 's_<!-- GOAT -->_<script data-goatcounter="https://storymachine.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>_' <index-dev.html >index.html
