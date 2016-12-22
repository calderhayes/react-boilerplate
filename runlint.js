'use strict';

const Linter = require("tslint").Linter;

const fs = require('fs');
const util = require('util');

const program = Linter.createProgram("tsconfig.json", './');
const files = Linter.getFileNames(program);

const configuration = require('./tslint.json')

const options = {
    formatter: "json"
};


const results = files.map(file => {
    //const fileContents = program.getSourceFile(file).getFullText();
    const fileContents = fs.readFileSync(file, 'utf8');

    const linter = new Linter(options, program);

    linter.lint(file, fileContents, configuration);

    let result = linter.getResult();
    result.file = file;

    return result;
    /*let result = linter.lint();

    if (result.failureCount !== 0) {
    	console.warn(file);

    	result.failures.forEach(f => {
    		console.warn(f);
    	});
    }*/
});

let toFile = process.argv[2] === 'true';
const logFile = './lint-results.log'

if (toFile && fs.existsSync(logFile)) {
  fs.truncateSync(logFile, 0);
}

let write = (val) => {

  if (toFile) {
    fs.writeFileSync(logFile, util.format(val) + "\n", { flag: 'a' });
  }
  else {
    console.warn(val);
  }

};

let skipped = 0;
results.filter(r => r.failureCount !== 0)
	.forEach((r, i) => {

    write("--------------");
    write(r.file);
    r.failures.forEach(f => {

      write(f.failure);
      write(f.ruleName);
      write(f.fix);
      write(f.startPosition.lineAndCharacter);

    });
    write("--------------");
    write("");




		/*if (toFile || i === 0) {


			write(r.file);

			let failures = r.failures.map(f => {
				f.sourceFile.text = '--removed for clarity--';
				f.startLineAndCharacter = f.startPosition.lineAndCharacter;
				f.startLineAndCharacter.line++;
				f.endLineAndCharacter = f.endPosition.lineAndCharacter;
				f.endLineAndCharacter.line++;
				return f;
			});

			write(failures);
		}
		else {
			skipped++;
		}*/

	});

if (skipped > 0) {
	write(skipped.toString() + ' skipped for clarity');
}
