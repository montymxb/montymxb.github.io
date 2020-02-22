/**
 * shg.js
 *
 * Simple HTML Generator
 *
 * Simple parser of plaintext -> html, which does three things:
 * 1. Allows the declaration & definition of functions, which create HTML blocks with properties.
 * 2. Allow the calling of functions, which impact the following functions or text. Calling non-existent functions reports an error.
 * 3. Text is taken and wrapped according to the current function rules.
 *
 */

(function(window, document) {


	// constructor
	function SimpleHTMLGenerator() {
		// initialize stack
		this.stack 	= [];
		// initialize environment
		this.env	= [];
		// initialize page data collections
		this.data	= [];
		// setup initial data
		this.data[0] = "";
	}


	// prototype body
	SimpleHTMLGenerator.prototype = {

		constructor: SimpleHTMLGenerator,


		/**
		 * add
		 *
		 * Adds a function to the environment by a given name
		 */
		add: function(name, func) {
			if(!func || {}.toString.call(func) !== '[object Function]') {
				throw ReferenceError("Unable to add non-function of name '"+name+"'.");
			}

			this.env[name] = func;
		},


		/**
		 * push
		 *
		 * Pushes an evaluation function by name from the environment onto the stack.
		 * Also passes an object of params, which is added onto the stack as well.
		 * Reports and error and stops parsing if the function doesn't exist
		 */
		push: function(name, params) {
			if(!this.env[name]) {
				throw ReferenceError("Attempted to reference non-existant function '"+name+"'.");
			}

			// push function onto the evaluation stack
			this.stack[this.stack.length] = {
				name:	name,
				func: this.env[name],
				args: params
			};

			// push data frame
			this.data[this.data.length] = "";
		},


		/**
		 * parse
		 *
		 * Parses a line of input using the current function in scope
		 */
		parse: function(line) {
			// get index
			var index = this.stack.length - 1;

			// verify index is valid
			if(index < 0) {
				throw ReferenceError("No function on the stack to evalute with.");
			}

			// add line to this data, unprocessed
			this.data[this.data.length-1] += line;

		},


		/**
		 * pop
		 *
		 * Pops the topmost evaluation function from the stack
		 */
		pop: function() {
			// verify we have something to pop
			if(this.stack.length == 0) {
				throw ReferenceError("Attempted to pop when no function on the stack.");
			}

			// pull out evaluation data & pop
			var evaluator = this.stack[this.stack.length-1];
			this.stack.splice(-1,1);

			// pull out data & pop
			var unprocessedData = this.data[this.data.length-1];
			this.data.splice(-1,1);

			// process data by evaluator, and add to current data
			var processedData = evaluator.func(unprocessedData, evaluator.args);

			// append processed data to current data
			this.data[this.data.length-1]+=processedData;

		},


		/**
		 * getData
		 *
		 * Returns the current data that has been constructed
		 */
		getData: function() {
			// ensure we don't have an incomplete evaluation
			if(this.stack.length != 0) {
				throw ReferenceError("Attempted to generate data with an unclosed scope of '"+this.stack[this.stack.length-1].name+"'");
			}

			// return the corresponding data
			return this.data[0];
		},


		/**
		 * _tokenize
		 *
		 * Tokenizes codified data, and then parses it accordingly
		 */
		_tokenizeAndParse: function(code) {

			// trim padding white space
			code = code.trim();

			// split by line breaks
			arr = code.split("\n");

			// add an extra line-break at the end to pop the final scope
			arr[arr.length] = "";

		 	var len = arr.length;

			// iterate over each line to tokenize
			for(var x = 0; x < len; x++) {
				var line = arr[x].trim();
				var m;

				if(line == "") {
					// pop existing scope
					try {
						this.pop();
					} catch(e) {
						this.error("There is an error on line "+(x+1)+", unable to pop missing scope.");
						return;

					}

				} else if(m = line.match(/^\s*\(\s*([a-zA-Z0-9_]+)\s*\)\s*$/)) {
					// push new scope
					try {
						this.push(m[1], {});
					} catch(e) {
						this.error("There is an error on line "+(x+1)+", unable to handle unknown name of '"+m[0]+"'.");
						return;

					}

				} else {
					// arbitrary input to parse under current scope
					try {
						this.parse(line);
					} catch(e) {
						this.error("There is an error on line "+(x+1)+", missing a scope to parse line '"+line+"' (ex. (para) ).");
						return;

					}

				}
			}

			// if we have 1 extra state, pop it off, to deal with how we trim
			// the string from above
			if(this.stack.length == 1) {
				this.pop();
			}
		},


		/**
		 * translate
		 *
		 * Evaluates coded data, producing html data
		 */
		translate: function(code) {
			// tokenize & parse
			this._tokenizeAndParse(code);
		},


		/**
		 * encode
		 *
		 * Encodes params into an HTML key=value style list
		 */
		encode: function(params) {
			var encoded = [];
			for(var p in params) {
				if(params.hasOwnProperty(p)) {
					encoded[encoded.length] = p+"=\""+params[p]+"\"";
				}
			}
			// join with a space
			return encoded.join(" ");

		},


		/**
		 * error
		 *
		 * Reports an SHG related error
		 */
		error: function(msg) {
			console.error("[SHG] "+msg);
		}


	};


	if(window.SimpleHTMLGenerator) {
		// report error, do not override
		console.error("Unable to add SimpleHTMLGenerator to the window, already exists!");
		console.error("SimpleHTMLGenerator was not added to the window, and may not function as expected.");

	} else {
		// add singular instance to the window
		window.SimpleHTMLGenerator = new SimpleHTMLGenerator();

	}

})(window, document);


// TODO, Now, we have a way to generate page content from this lang
// What we need is a way to convert an existing HTML page into compatible SHG code
// Means normalizing/reading the html
// Parsing the HTML
// Extracting the plaintext into it's own separate form
// Extracting the generated JS into their own functions to be generated
// 1. Gives an SHG code to use
// 2. Gives a JS generation file to use (defs, and all)
