#!/usr/bin/env nodejs
//
// Copyright 2017 Alexandru Catrina
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
'use strict';

const Events = require('./events');
const InputPath = process.argv[2] || '';
const OutputJson = process.argv[3] || '';

if (InputPath.toString().length === 0) {
    throw new Error(`Doing nothing: missing input param`);
} else if (!OutputJson.toString().endsWith(`.json`)) {
    throw new Error(`Doing nothing: output param not json file`);
}

Events.runAndDump(InputPath, OutputJson);
