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

const Compressor = require('./compressor');

module.exports = class Events extends Compressor {

    static runAndDump(eventsInput, eventsOutput) {
        let $ = new Events();
        $.setRootDirectory(eventsInput).parseFiles();
        $.setOutputFile(eventsOutput);
        return $.dump();
    }

    parseFiles() {
        let files = Compressor.FileSystem.readdirSync(this.rootDirectory);
        this.setInputFiles(files);
        this.filesResult = this.prepareProperties();
        return this;
    }

    prepareProperties() {
        let properties = new Object();
        for (let [filename, content] of this.filesMapout) {
            let [property, action, type] = filename.split(Compressor.DOT);
            if (!properties.hasOwnProperty(property)) {
                properties[property] = {};
            } else if (typeof properties[property] != `object`) {
                throw new Error(`Unexpected property datatype`);
            } else if (Object.keys(properties[property]).length > 2) {
                throw new Error(`Unexpected number of actions for property`);
            }
            if (properties[property].hasOwnProperty(action)) {
                throw new Error(`Unexpected multiple actions on same property`);
            }
            if (content.endsWith(Compressor.SEMICOLON)) {
                content = content.slice(0, -1);
            }
            if (type == Compressor.JSON_FILE) {
                content = JSON.parse(content);
            }
            properties[property][action] = content;
        }
        return properties;
    }

    writeToFile(file, data) {
        Compressor.FileSystem.writeFileSync(file, data);
    }

}
