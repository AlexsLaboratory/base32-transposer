class Base32 {
  static alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

  /**
   * Converts a string into an array of ASCII codes.
   * @date 5/11/2023 - 3:38:43 PM
   *
   * @static
   * @param {String} string The input string that needs to be converted to an array of ASCII codes.
   * @returns {number[]} An array of numbers representing the ASCII values of each character in the input string.
   */
  static stringToASCIIArray(string: String): number[] {
    const arrayOfChars = [...string];
    return arrayOfChars.map((char) => {
      return char.charCodeAt(0);
    });
  }

  /**
   * Converts an array of ASCII codes to an array of binary strings with a fixed length of 8
   * characters.
   * @date 5/15/2023 - 11:15:39 PM
   *
   * @static
   * @param {number[]} ascii An array of numbers representing ASCII values of
   * characters.
   * @returns {string[]} An array of strings, where each string represents
   * the binary representation of an ASCII character in the input array. The binary strings are padded
   * with leading zeros to ensure that each string has a length of 8 characters.
   */
  static asciiArrayToBase2(ascii: number[]): string[] {
    return ascii
      .map((char) => {
        return char.toString(2);
      })
      .map((binary) => {
        return binary.padStart(8, "0");
      });
  }

  /**
   * Pads an array with "x" strings of length 8 to make its length a multiple of 5.
   * @date 5/19/2023 - 10:35:14 AM
   *
   * @static
   * @param {string[]} array An array of strings that needs to be zero-padded.
   * @returns {string[]} If the remainder is 0, the original array is returned. Otherwise, a new array is returned
   * that is the concatenation of the original array and an array of length `padding` filled with strings
   * of 8 "x" characters.
   */
  static zeroPad(array: string[]): string[] {
    const length = array.length;
    const remainder = length % 5;
    const padding = 5 - remainder;
    if (remainder === 0) {
      return array;
    }
    return array.concat(Array(padding).fill("x".repeat(8)));
  }

  /**
   * Takes a binary number as input, splits it into chunks of 5 digits, replaces any "x"
   * with "0" if there is also a "0" or "1" in the chunk, and returns an array of the resulting chunks.
   * @date 5/19/2023 - 10:46:24 AM
   *
   * @static
   * @param {string} binaryNumber A string representing a binary number.
   * @returns {string[]} An array of strings, where each string represents a chunk of 5 binary digits from the input
   * binaryNumber string. The chunks are obtained by iterating over the input string and slicing it into
   * substrings of length 5. If a chunk contains the character "x" and either "0" or "1", the "x" is
   * replaced with "0".
   */
  static chunkBinary(binaryNumber: string): string[] {
    const numbers = [...binaryNumber.toString()];
    const chunks = [];
    for (let i = 0; i < numbers.length; i += 5) {
      let chunk = numbers.slice(i, i + 5).join("");
      if (chunk.indexOf("x") !== -1 && (chunk.indexOf("0") !== -1 || chunk.indexOf("1") !== -1)) {
        chunk = chunk.replaceAll("x", "0");
      }
      chunks.push(chunk);
    }
    return chunks;
  }


  /**
   * Converts a binary array to a base32 string using a specific alphabet.
   * @date 5/19/2023 - 6:28:58 PM
   *
   * @static
   * @param {string[]} binary An array of strings, where each string represents a binary number.
   * @returns {string} A string that represents the base32 encoding of the input binary array.
   */
  static binaryArrayToBase32(binary: string[]): string {
    return binary.map((binaryNumber) => {
      if (binaryNumber === "x".repeat(5)) return "=";
      const decimal = parseInt(binaryNumber, 2);
      return this.alphabet.charAt(decimal);
    }).join("");
  }


  /**
   * Converts a base32 string to a binary string array.
   * @date 5/19/2023 - 5:01:33 PM
   *
   * @static
   * @param {string} base32 A string representing a value encoded in base32 format.
   * @returns {string[]} An array of strings. Each string represents the
   * binary value of a character in the input `base32` string, with padding to ensure that each binary
   * value is 5 digits long. The function first removes any `=` characters from the input string, then
   * maps each remaining character to its binary representation using the `alphabet`
   */
  static base32ToBinary(base32: string): string[] {
    return base32.split("")
      .filter((char) => {
        return char !== "=";
      })
      .map((char) => {
        if (char === "=") return "";
        const index = this.alphabet.indexOf(char);
        return index.toString(2).padStart(5, "0");
      });
  }

  /**
   * Converts an array of binary numbers to an array of corresponding ASCII values.
   * @date 5/19/2023 - 6:26:41 PM
   *
   * @static
   * @param {string[]} binary The parameter "binary" is an array of strings representing binary
   * numbers.
   * @returns {number[]} An array of numbers, which are the decimal representations of the binary numbers passed as
   * strings in the input array.
   */
  static binaryToASCII(binary: string[]): number[] {
    return binary.map((binaryNumber) => {
      return parseInt(binaryNumber, 2);
    });
  }

  /**
   * Converts an array of ASCII codes into a string.
   * @date 5/19/2023 - 6:48:40 PM
   *
   * @static
   * @param {number[]} ascii The parameter `ascii` is an array of numbers representing ASCII character

   * @returns {string} A string that is created by mapping over an array of ASCII character codes and converting
   * each code to its corresponding character using the `String.fromCharCode()` method, and then joining
   * all the characters together into a single string using the `join()` method.
   */
  static asciiToString(ascii: number[]): string {
    return ascii.map((charCode) => {
      return String.fromCharCode(charCode);
    }).join("");
  }

  /**
   * Converts an array of binary strings into an array of 8-bit binary strings.
   * @date 5/19/2023 - 7:03:45 PM
   *
   * @static
   * @param {string[]} binary An array of strings, where each string
   * represents a binary number. The function `fiveToEightBit` takes this array and converts each binary
   * number from 5-bit to 8-bit format by adding leading zeros. The function returns an array of strings,
   * where each string
   * @returns {string[]} Each string represents a chunk of 8 bits from the input binary array.
   */
  static fiveToEightBit(binary: string[]): string[] {
    const binaryString = binary.join("");
    const chunks = []
    for (let i = 0; i < binaryString.length; i += 8) {
      const chunk = binaryString.slice(i, i + 8);
      if (chunk.length === 8) chunks.push(chunk);
    }
    return chunks;
  }

  /**
   * The function converts a buffer to an array of binary strings.
   * @date 5/20/2023 - 6:38:36 PM
   *
   * @static
   * @param {Buffer} buffer Is a `Buffer` object, which is a Node.js built-in
   * class that provides a way to work with binary data. It represents a chunk of memory allocated
   * outside of the V8 JavaScript engine, which can be used to store raw binary data.
   * 
   * @returns {string[]} Array of binary strings, where each string represents the binary value of a byte in the
   * input buffer. The `reduce` method is used to iterate over each byte in the buffer and convert it to
   * a binary string using the `toString(2)` method. The `padStart` method is used to ensure that each
   * binary string is 8 bits long.
   */
  static bufferToBinaryArray(buffer: Buffer): string[] {
    return buffer.reduce((acc, val) => {
      return acc.concat(val.toString(2).padStart(8, "0"));
    }, [] as string[]);
  }

  /**
   * Decodes a given base32 string into its corresponding ASCII string.
   * @date 5/19/2023 - 7:23:58 PM
   *
   * @static
   * @param {string} base32 The input string in base32 format that needs to be decoded.
   * @returns {string} A decoded string.
   */
  static decode(base32: string): string {
    const fiveBitBinary = this.base32ToBinary(base32);
    const eightBitBinary = this.fiveToEightBit(fiveBitBinary);
    const ascii = this.binaryToASCII(eightBitBinary);
    return this.asciiToString(ascii);
  }

  /**
   * Encodes a given string into base32 format.
   * @date 5/19/2023 - 7:23:42 PM
   *
   * @static
   * @param {string | Buffer} data The input string that needs to be encoded.
   * @returns {string} A string that represents the input string encoded in
   * base32 format.
   */
  static encode(data: string | Buffer): string {
    const isBuffer = Buffer.isBuffer(data);
    let binaryWithPadding: string[] = [];
    if (typeof data === "string") {
      const ascii = this.stringToASCIIArray(data);
      const binary = this.asciiArrayToBase2(ascii);
      binaryWithPadding = this.zeroPad(binary);
    } else if (isBuffer) {
      binaryWithPadding = this.zeroPad(this.bufferToBinaryArray(data));
    }
    const binaryChunks = this.chunkBinary(binaryWithPadding.join(""));
    return this.binaryArrayToBase32(binaryChunks);
  }
}

const encode = Base32.encode;
const decode = Base32.decode;

export { Base32 as default, encode, decode };