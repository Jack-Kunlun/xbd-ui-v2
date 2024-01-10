// var fs = require("fs");
var path = require("path");
var nodeExternals = require("webpack-node-externals");
var Components = require("../components.json");

// var utilsList = fs.readdirSync(path.resolve(__dirname, "../src/utils"));
// var mixinsList = fs.readdirSync(path.resolve(__dirname, "../src/mixins"));
// var transitionList = fs.readdirSync(path.resolve(__dirname, "../src/transitions"));
var externals = {};

Object.keys(Components).forEach(function (key) {
	externals[`xbd-ui-v2/packages/${key}`] = `xbd-ui-v2/lib/${key}`;
});

// externals["xbd-ui-v2/src/locale"] = "xbd-ui-v2/lib/locale";
// utilsList.forEach(function (file) {
// 	file = path.basename(file, ".js");
// 	externals[`xbd-ui-v2/src/utils/${file}`] = `xbd-ui-v2/lib/utils/${file}`;
// });
// mixinsList.forEach(function (file) {
// 	file = path.basename(file, ".js");
// 	externals[`xbd-ui-v2/src/mixins/${file}`] = `xbd-ui-v2/lib/mixins/${file}`;
// });
// transitionList.forEach(function (file) {
// 	file = path.basename(file, ".js");
// 	externals[`xbd-ui-v2/src/transitions/${file}`] = `xbd-ui-v2/lib/transitions/${file}`;
// });

externals = [
	Object.assign(
		{
			vue: "vue",
		},
		externals
	),
	nodeExternals(),
];

exports.externals = externals;

exports.alias = {
	main: path.resolve(__dirname, "../src"),
	packages: path.resolve(__dirname, "../packages"),
	"xbd-ui-v2": path.resolve(__dirname, "../"),
	// examples: path.resolve(__dirname, "../examples"),
};

exports.vue = {
	root: "Vue",
	commonjs: "vue",
	commonjs2: "vue",
	amd: "vue",
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js|utils\/lodash\.js/;
