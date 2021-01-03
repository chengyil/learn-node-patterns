#!/usr/bin/env node

const ticker = require('./src/ticker/ticker');

ticker(500, (err) => console.log('Done', err))
    .on('error', (err) => console.log('error'))
    .on('tick', () => console.log('tick'));
