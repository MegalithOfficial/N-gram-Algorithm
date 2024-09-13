const readline = require('readline');

const a = require("./dataset.js");



class NGramModel {

   constructor(n) {

      this.n = n;

      this.ngrams = new Map();

      this.wordCount = new Map();

      this.vocabularySize = 0;

   }



   train(text) {

      const tokens = this.tokenize(text);

      tokens.forEach(word => this.updateWordCount(word));

      this.vocabularySize = Object.keys(this.wordCount).length;



      for (let i = 0; i <= tokens.length - this.n; i++) {

         const key = tokens.slice(i, i + this.n - 1).join(' ');

         const value = tokens[i + this.n - 1];



         if (!this.ngrams[key]) {

            this.ngrams[key] = {};

         }



         if (!this.ngrams[key][value]) {

            this.ngrams[key][value] = 0;

         }

         this.ngrams[key][value]++;

      }

   }



   tokenize(text) {

      return text.toLowerCase()

         .replace(/[^a-z\s]/g, '') 

         .split(/\s+/)

         .filter(Boolean); 

   }



   updateWordCount(word) {

      if (!this.wordCount[word]) {

         this.wordCount[word] = 0;

      }

      this.wordCount[word]++;

   }



   generate(start, maxLength = 1000) {

      const tokens = this.tokenize(start);

      let currentKey = tokens.slice(-this.n + 1).join(' ');



      while (currentKey && !this.ngrams[currentKey] && tokens.length > 0) {

         tokens.pop();

         currentKey = tokens.slice(-this.n + 1).join(' ');

      }



      if (!this.ngrams[currentKey]) {

         console.log("Starting phrase is not found in the model.");

         return start; 

      }



      let result = tokens;



      for (let i = 0; i < maxLength; i++) {

         const possibleWords = this.ngrams[currentKey];

         if (!possibleWords) break;



         const nextWord = this.getWeightedChoice(possibleWords);

         result.push(nextWord);



         currentKey = `${currentKey.split(' ').slice(1).join(' ')} ${nextWord}`;

      }



      return result.join(' ');

   }



   getWeightedChoice(wordCounts) {

      const words = Object.keys(wordCounts);

      const totalWeight = words.reduce((sum, word) => sum + wordCounts[word] + 1, 0); 

      const rand = Math.random() * totalWeight;



      let cumulativeWeight = 0;

      for (let i = 0; i < words.length; i++) {

         cumulativeWeight += wordCounts[words[i]] + 1; 

         if (rand < cumulativeWeight) {

            return words[i];

         }

      }

      return words[0]; // Fallback

   }



   addUserText(text) {

      this.train(text);

      console.log("Text added to model and model trained with new data.");

   }



   showStartingPhrases(count = 10) {

      const keys = Object.keys(this.ngrams).slice(0, count);

      console.log("First", count, "starting phrases in the model:");

      keys.forEach((key, index) => console.log((index + 1) + ": " + key));

   }



   getRandomStartPhrases(count) {

      const keys = Object.keys(this.ngrams);

      const randomKeys = [];

      for (let i = 0; i < count; i++) {

         if (keys.length === 0) break;

         const randomIndex = Math.floor(Math.random() * keys.length);

         randomKeys.push(keys[randomIndex]);

         keys.splice(randomIndex, 1); // Remove the chosen key to avoid duplicates

      }

      return randomKeys;

   }

}



// Initialize model with initial dataset

let model = new NGramModel(4);

a.forEach(text => model.train(text));



// Set up command-line interface

const rl = readline.createInterface({

   input: process.stdin,

   output: process.stdout

});



const prompt = () => {

   console.log('Enter a command:');

   console.log('1. Add a sentence to the model');

   console.log('2. Generate text with a starting phrase');

   console.log('3. Show starting phrases');

   console.log('4. Change n-gram model');

   console.log('Type "exit" to quit.');



   rl.question('Your choice: ', (command) => {

      console.clear();

      if (command.trim().toLowerCase() === 'exit') {

         rl.close();

         return;

      }

      console.clear();

      

      switch (command.trim()) {

         case '1':

            rl.question('Enter the sentence to add to the model: ', (sentence) => {

               model.addUserText(sentence);

               prompt();

            });

            break;



         case '2':

            rl.question('Enter the starting phrase for text generation: ', (startPhrase) => {

               const generatedText = model.generate(startPhrase, 100);

               console.log(`Generated Text: ${generatedText}`);

               prompt();

            });

            break;



         case '3':

            model.showStartingPhrases(10); // Show the first 10 starting phrases

            prompt();

            break;



         case '4':

            rl.question('Enter the new n-gram size (e.g., 2, 3, 5): ', (n) => {

               const nValue = parseInt(n, 10);

               if (isNaN(nValue) || nValue < 2) {

                  console.log("Invalid n-gram size. Please enter a number greater than or equal to 2.");

               } else {

                  // Create a new model with the selected n-gram size

                  model = new NGramModel(nValue);

                  a.forEach(text => model.train(text)); // Re-train the model with the existing dataset

                  console.log(`N-gram model updated to ${nValue}-grams.`);

               }

               prompt();

            });

            break;



         default:

            console.log('Invalid command. Please enter "1", "2", "3", or "4".');

            prompt();

            break;

      }

   });

};



console.log("Welcome to the N-Gram Model CLI!");

prompt();
