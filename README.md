# N-gram Text Generation Model

## Overview

This repository contains a sophisticated N-gram text generation model implemented in JavaScript. The model can handle various N-gram levels (e.g., 2-grams, 3-grams, up to 5-grams) and is designed to generate text based on a given starting phrase. It supports user interactions such as adding sentences to the dataset, changing the N-gram model type, and generating text based on random or user-specified starting phrases.

### Key Features

- **Multi-N-gram Support**: Train and generate text using different N-gram models, including bigrams, trigrams, and 5-grams.
- **Dynamic Dataset Expansion**: Add new sentences to expand the model's knowledge base.
- **User Interaction**: Choose starting phrases, generate text, and explore starting phrases from the dataset.
- **Continuous Generation**: Automatically generate text sentences based on randomly selected starting phrases in a loop.

## Installation

To use the model, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/MegalithOfficial/N-gram-Algorithm.git
cd n-gram-algorithm
npm install
```

## Usage

Run the script using Node.js:

```bash
node index.js
```

### Commands

- **Add a sentence**: Enter a new sentence to add to the model’s dataset.
- **Generate text**: Provide a starting phrase to generate text based on the selected N-gram model.
- **Show starting phrases**: Display the first 10 starting phrases from the dataset.
- **Change N-gram model**: Switch between 2-gram, 3-gram, and other N-gram models.
- **Generate random text**: Automatically generate text sentences based on randomly chosen starting phrases.

## Example Interaction

```
Enter a command:
1. Add a sentence to the model
2. Generate text with a starting phrase
3. Show starting phrases
4. Change n-gram model
Type "exit" to quit.

Enter the starting phrase for text generation: The sun rises in
Generated Text: The sun rises in the east and sets in the west

Enter a command:
1. Add a sentence to the model
2. Generate text with a starting phrase
3. Show starting phrases
4. Change n-gram model
Type "exit" to quit.
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Test your changes.
5. Submit a pull request with a description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
