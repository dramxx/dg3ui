/**
 * Script to run after npm install
 *
 */
'use strict';
var gentlyCopy = require('gently-copy');

var filesToCopy = './node_modules/@projectstorm/react-diagramsCore/dist/*';
var targetPath = './node_modules/@projectstorm/';

gentlyCopy(filesToCopy, targetPath);
