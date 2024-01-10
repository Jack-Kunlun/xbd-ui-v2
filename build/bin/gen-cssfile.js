const fs = require("fs");
const path = require("path");
let Components = require("../../components.json");

const themes = ["theme-chalk"];

Components = Object.keys(Components);
const basePath = path.resolve(__dirname, "../../packages/");

function fileExists(filePath) {
	try {
		return fs.statSync(filePath).isFile();
	} catch (err) {
		return false;
	}
}

themes.forEach((theme) => {
	var isSCSS = theme !== "theme-default";
	// eslint-disable-next-line quotes
	var indexContent = isSCSS ? '@import "./base.scss";\n' : '@import "./base.css";\n';

	Components.forEach(function (key) {
		if (["icon", "option", "option-group"].includes(key)) {
			return;
		}

		var fileName = key + (isSCSS ? ".scss" : ".css");

		indexContent += `@import "./${fileName}";\n`;
		var filePath = path.resolve(basePath, theme, "src", fileName);

		if (!fileExists(filePath)) {
			fs.writeFileSync(filePath, "", "utf8");

			// eslint-disable-next-line no-console
			console.log(theme, " 创建遗漏的 ", fileName, " 文件");
		}
	});

	fs.writeFileSync(
		path.resolve(basePath, theme, "src", isSCSS ? "index.scss" : "index.css"),
		indexContent
	);
});
