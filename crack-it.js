const { createInterface } = require("readline")
const rl = createInterface({ input: process.stdin, output: process.stdout })

// Create cheap to hash dummy passwords
function generateCombinations(onPassword) {
    const charCodeRange = [65, 66]; // A to B
    const passwordLength = 12;

    function generatePasswordRecursive(currentPassword = '', depth = 0) {
        if (depth === passwordLength - 1) {
            for (let charCode = 32; charCode <= 126; charCode++) {
                const finalPassword = currentPassword + String.fromCharCode(charCode);
                onPassword(finalPassword);
            }
            return;
        }

        for (let charCode = charCodeRange[0]; charCode <= charCodeRange[1]; charCode++) {
            const nextPassword = currentPassword + String.fromCharCode(charCode);
            generatePasswordRecursive(nextPassword, depth + 1);
        }
    }

    generatePasswordRecursive()
}

// Calculate the Worksheet password hash
function calculateHash(text) {
    const asciiCharCodes = Array.from(text, char => char.charCodeAt(0)) // Get ASCII char codes
    const shiftedValues = asciiCharCodes.map((val, i) => val << (i + 1 % 16)) // Shift & rotate
    const resultXOR = shiftedValues.reduce((acc, val) => acc ^ val) // Xor them all
    const lengthXOR = resultXOR ^ text.length // Xor result with length
    const finalResult = lengthXOR ^ 0xCE4b // Magic constant
    return finalResult.toString(16)
}

// Main function
function crackThis(hash) {
    // Check hash length
    if (hash.length !== 4) {
        console.error("Invalid hash provided.")
        process.exit(0)
    }
    const crackThis = hash.toLowerCase()

    // Generate possible colliding password guesses and check the hashes
    generateCombinations((collidingGuess) => {
        const possibleCollision = calculateHash(collidingGuess)
        if (possibleCollision === crackThis) {
            console.log("A possible working password is:\n" + collidingGuess)
            process.exit(0)
        }
    })
    
    // No results if we made it here
    console.log("No working passwords found :(")
    process.exit(1)
}

// Crack hash from argument
if (process.argv[2] !== undefined) {
    crackThis(process.argv[2].trim())
}

// Get Hash from STDIN
rl.question("Input the Excel Worksheet hash to crack\n> ", (hashToCrack) => crackThis(hashToCrack))