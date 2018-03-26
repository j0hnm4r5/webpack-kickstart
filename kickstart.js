const inquirer = require("inquirer");
const fs = require("fs");
const rimraf = require("rimraf");
const ncp = require("ncp").ncp;

const packageJson = require("./package.json");

inquirer
	.prompt([
		{
			type: "input",
			name: "projectName",
			message: "What's the name of your project?",
			default: "awesome-project",
		},
		{
			type: "input",
			name: "projectAuthor",
			message: "Who's the author?",
			default: "John Doe <john@doe.com>",
		},
		{
			type: "list",
			name: "serverType",
			message: "What type of server would you like?",
			choices: ["webpack-dev-server", "express"],
		},
	])
	.then(answers => {
		const { projectName, projectAuthor, serverType } = answers;

		// update the package.json
		console.log("Updating package.json");
		packageJson.name = projectName; // reset the name
		packageJson.author = projectAuthor; // reset the author
		packageJson.description = ""; // reset the description
		packageJson.repository = ""; // reset the repository

		// for each dependency that is needed for this kickstart
		console.log("Removing unused dependencies");
		packageJson.kickstartDependencies.forEach(dependency => {
			delete packageJson.devDependencies[dependency]; // remove it from the devDependencies
		});
		delete packageJson.kickstartDependencies; // delete the entire kickstartDependencies object

		// delete this script
		console.log("Removing unused scripts");
		delete packageJson.scripts.kickstart; // delete the script from the package.json
		// delete the actual node script
		fs.unlink("./kickstart.js", err => {
			if (err) throw err;
		});

		// depending on the server type picked
		switch (serverType) {
			case "webpack-dev-server":
				console.log("Setting webpack-dev-server mode");

				// add the start script
				console.log("Adding server start scripts");
				packageJson.scripts["start"] = "webpack-dev-server"; // add the start script to the package.json

				// for each dependency that is needed for express
				console.log("Removing more unused dependencies");
				packageJson.expressDependencies.forEach(dependency => {
					delete packageJson.devDependencies[dependency]; // remove it from the devDependencies
				});
				delete packageJson.expressDependencies; // delete the entire expressDependencies object

				console.log("Copying template files");
				// copy the contents of the template folder
				ncp("./.templates/webpack-dev-server/.", "./", err => {
					if (err) throw err;
				});
				break;

			case "express":
				console.log("Setting Express server mode");

				// add the start script
				console.log("Adding server start scripts");
				packageJson.scripts["start"] = "node server.js"; // add the start script to the package.json

				// for each dependency that is needed for express
				console.log("Removing more unused dependencies");
				packageJson.serverDependencies.forEach(dependency => {
					delete packageJson.devDependencies[dependency]; // remove it from the devDependencies
				});
				delete packageJson.serverDependencies; // delete the entire serverDependencies object

				console.log("Copying template files");
				// copy the contents of the template folder
				ncp("./.templates/express/.", "./", err => {
					if (err) throw err;
				});

				break;
		}

		// overwrite the old package.json with the new one
		console.log("Saving settings");
		fs.writeFile(
			"./package.json",
			JSON.stringify(packageJson, null, 4),
			err => {
				if (err) throw err;
			}
		);

		// delete the templates folder
		console.log("Deleting the Templates folder");
		rimraf("./.templates", err => {
			if (err) throw err;
		});

		console.log("All done!");
	});
