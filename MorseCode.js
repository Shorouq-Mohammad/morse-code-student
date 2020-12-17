const BSTree = require('./BinarySearch')
const alphabet = require('./alphabet')

class ScoreTree extends BSTree {
    constructor(value, score) {
        super(value)
        this.score = score
    }
    insertNode(key, score) { //this function inserts a letter into the morse code tree - this should run once in the beginning
        if (!this.value) {
            this.value = key
            this.score = score
        }
        else if (score > this.score && this.rightChild) {
            this.rightChild.insertNode(key, score)
        }
        else if(score <= this.score && this.leftChild) {
            this.leftChild.insertNode(key, score)
        }
        else if (score <= this.score) {
            this.leftChild = new ScoreTree(key, score)
        }
        else {
            this.rightChild = new ScoreTree(key, score)
        }
    }
    findLetter (score, node = this) {
        // this method should record the path to a given letter
        if(node.score === score){
            return ''
        }else if(score > node.score){
            return '-' + this.findLetter(score, node.rightChild)
        }else{
            return '.' + this.findLetter(score, node.leftChild)
        }
    }
    translateWord(word) {
        //this method should translate a given word from text to Morse Code
        word = word.toUpperCase()
        let code = ''
        for(let ch of word){
            if(ch === ' '){
                code += '/'
            }else{
                code += this.findLetter(alphabet[ch])+ ' '
            }
        }
        console.log(code);
        return code
    }
    translateMorse(morse) {
        // this function should translate a given code from Morse to English
        let result = ''
        const characters = morse.split(' ')
        for(let chara of characters){
            result += this.findLetterFromMorse(chara)
        }
        console.log(result);
        return result
    }
    findLetterFromMorse(chara, node =this){
        if(chara.length === 0){
            return node.value
        }else if(chara.charAt(0) === '.'){
            chara = chara.substring(1)
            return this.findLetterFromMorse(chara, node.leftChild)
        }else if(chara.charAt(0) === '-'){
            chara = chara.substring(1)
            return this.findLetterFromMorse(chara, node.rightChild)
        }else if(chara.charAt(0) === '/'){
            return ' '
        }
    }
}
//initializing the MorseCode tree
const morseCode = new ScoreTree("TOP", 50)
Object.keys(alphabet).forEach(l => {
    morseCode.insertNode(l, alphabet[l])
})

morseCode.translateWord("welcome") // should print .-- . .-.. -.-. --- -- . 
morseCode.translateWord("elevation is cool") // should print . .-.. . ...- .- - .. --- -. /.. ... /-.-. --- --- .-.. 
morseCode.translateMorse(".... --- ....")
morseCode.translateMorse("-. .. -.-. . / .--- --- -... / --- -. / - .... . / .-.. . ... ... --- -.")
