"use strict";

/**
 * @license
 * Copyright SOAJS All Rights Reserved.
 *
 * Use of this source code is governed by an Apache license that can be
 * found in the LICENSE file at the root of this repository
 */

require('newrelic')

const bunyan = require('bunyan');
let _log = null;
const lib = require('soajs.core.libs');
const { format } = require('winston');
const { combine, json } = format;
const newrelicFormatter = require('@newrelic/winston-enricher');

/* Logger Component
 *
 * {
 *  "name": "",
 *  "stream": process.stdout - path_to_file,
 *  "src": true,
 *  "level": ["debug","trace","info","error", "warn", "fatal"],
 *  "streams":[
 *    {
 *      "level": ["debug","trace","info","error", "warn", "fatal"],
 *      "stream": process.stdout - path_to_file
 *    }
 *    ...
 *  ]
 * }
 *
 * REF: https://www.npmjs.com/package/bunyan
 */
module.exports = {
	"getLogger": function (name, config) {
		if (!_log) {
			let configClone = lib.utils.cloneObj(config);
			configClone.name = name;
			
			if (config.formatter && Object.keys(config.formatter).length > 0) {
				const bformat = require('bunyan-format');
				let formatOut = bformat(config.formatter);
				configClone.stream = formatOut;
				delete configClone.formatter;
			}

			let jsonLogWithNewRelic = combine(
				json(),
				newrelicFormatter()
			);

			const logObj = jsonLogWithNewRelic.transform(configClone);

			console.log("getLogger >> ", logObj)
			
			_log = new bunyan.createLogger(logObj);
		}
		return _log;
	},
	
	"getLog": function () {
		if (_log) {
			return _log;
		}
		return null;
	}
};