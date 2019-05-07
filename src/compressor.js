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

const FileSystem = require('fs');
const CompressJS = require('uglify-js');

module.exports = class Compressor {

    static get FileSystem() {
        return FileSystem;
    }

    static get SEMICOLON() {
        return `;`;
    }

    static get DOT() {
        return `.`;
    }

    static get SLASH() {
        return `/`;
    }

    static get UTF8() {
        return `utf8`;
    }

    static get JSON_FILE() {
        return `json`;
    }

    static get Options() {
        return { warnings: `verbose`, toplevel: true };
    }

    constructor() {
        this.filesMapout = new Map();
        this.filesResult = null;
        this.resultsFile = null;
        this.resultsData = null;
        this.rootDirectory = ``;
    }

    setOutputFile(filename) {
        this.resultsFile = filename.toString();
        return this;
    }

    setRootDirectory(directory) {
        this.rootDirectory = directory.toString();
        if (!this.rootDirectory.endsWith(Compressor.SLASH)) {
            this.rootDirectory += Compressor.SLASH;
        }
        return this;
    }

    setInputFiles(files) {
        files.forEach(f => this.keepFile(f));
        return this;
    }

    keepFile(file) {
        this.loadContentFromFile(file);
        if (this.recentError) {
            throw this.recentError;
        } else if (this.recentWarnings) {
            this.log(this.recentWarnings);
        }
        this.filesMapout.set(file, this.recentCode);
        return this;
    }

    loadContentFromFile(filename) {
        if (filename.startsWith(Compressor.SLASH)) {
            filename = filename.substr(Compressor.SLASH.length);
        }
        let filepath = `${this.rootDirectory}${filename}`;
        let fileContent = FileSystem.readFileSync(filepath, Compressor.UTF8);
        this.resultsData = CompressJS.minify(fileContent, Compressor.Options);
    }

    get recentError() {
        return this.resultsData.error;
    }

    get recentWarnings() {
        return this.resultsData.warnings;
    }

    get recentCode() {
        return this.resultsData.code;
    }

    log(...messages) {
        messages.forEach(msg => console.log(`${new Date} - ${msg}`));
        return this;
    }

    dump() {
        this.writeToFile(this.resultsFile, JSON.stringify(this.filesResult));
        return this;
    }

    writeToFile(...args) {
        throw new Error(`Unimplemented method`);
    }

}
