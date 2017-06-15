'use strict';

global.Boom = require('boom');
global._ = require('lodash');
global.logger = require('winston');
global.config = require('./config')(logger);
