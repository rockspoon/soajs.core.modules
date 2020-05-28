"use strict";

/**
 * @license
 * Copyright SOAJS All Rights Reserved.
 *
 * Use of this source code is governed by an Apache license that can be
 * found in the LICENSE file at the root of this repository
 */

const os = require('os');

module.exports = {
	transport: { //default mail mtp configuration
		default: {
			"type": "direct",
			"options": {
				"name": os.hostname(),
				"debug": true
			}
		}
	},
	schema: {
		transport: {
			"type": "object",
			"required": false,
			"properties": {
				"type": {"type": "string", required: true},
				"options": {"type": "object", required: true}
			}
		},
		mailOptions: {
			"type": "object",
			"required": false,
			"properties": {
				from: {'type': 'string', required: true},
				to: {'type': 'string', required: true},
				subject: {'type': 'string', required: true},
				html: {'type': 'string', required: false},
				text: {'type': 'string', required: true}
			}
		}
	}
};