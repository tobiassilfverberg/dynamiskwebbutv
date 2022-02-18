const debug = require("debug");
const express = require("express");
const app = express();

// logger
// logger:1
// logger:2

const testLogger = debug("logger");
const testLogger1 = debug("logger:1");
const testLogger2 = debug("logger:2");

testLogger("Detta är min testlogger");
testLogger1("Detta är min testlogger1");
testLogger2("Detta är min testlogger2");

const log = debug("log");
const person = { name: "Tobias", email: "tobias@mejl.nu" };
log(person);
