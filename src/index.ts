class Base32 {
  private alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  /**
   * Convert a string into an array of ASCII codes
   * @date 5/11/2023 - 3:38:43 PM
   *
   * @private
   * @param {String} string
   * @returns {number[]}
   */
  private stringToASCIIArray(string: String): number[] {
    const arrayOfChars = [...string];
    return arrayOfChars.map((char) => {
      return char.charCodeAt(0);
    });
  }

  /**
   * ASCII array to binary array
   * @date 5/15/2023 - 11:15:39 PM
   *
   * @private
   * @param {number[]} ascii
   * @returns {string[]}
   */
  private asciiArrayToBase2(ascii: number[]): string[] {
    return ascii
      .map((char) => {
        return char.toString(2);
      })
      .map((binary) => {
        return binary.padStart(8, "0");
      });
  }

  private zeroPad(array: string[]): string[] {
    const length = array.length;
    const remainder = length % 5;
    const padding = 5 - remainder;
    if (remainder === 0) {
      return array;
    }
    return array.concat(Array(padding).fill("x".repeat(8)));
  }

  private chunkBinary(binaryNumber: string): string[] {
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

  private binaryArrayToBase32(binary: string[]): string {
    return binary.map((binaryNumber) => {
      if (binaryNumber === "x".repeat(5)) return "=";
      const decimal = parseInt(binaryNumber, 2);
      return this.alphabet.charAt(decimal);
    }).join("");
  }

  private base32ToBinary(base32: string): string[] {
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

  private binaryToASCII(binary: string[]): number[] {
    return binary.map((binaryNumber) => {
      return parseInt(binaryNumber, 2);
    });
  }

  private asciiToString(ascii: number[]): string {
    return ascii.map((charCode) => {
      return String.fromCharCode(charCode);
    }).join("");
  }

  private fiveToEightBit(binary: string[]): string[] {
    const binaryString = binary.join("");
    const chunks = []
    for (let i = 0; i < binaryString.length; i += 8) {
      const chunk = binaryString.slice(i, i + 8);
      if (chunk.length === 8) chunks.push(chunk);
    }
    return chunks;
  }

  public decode(base32: string): string {
    const fiveBitBinary = this.base32ToBinary(base32);
    const eightBitBinary = this.fiveToEightBit(fiveBitBinary);
    const ascii = this.binaryToASCII(eightBitBinary);
    return this.asciiToString(ascii);
  }

  public encode(string: string): string {
    const ascii = this.stringToASCIIArray(string);
    const binary = this.asciiArrayToBase2(ascii);
    const binaryWithPadding = this.zeroPad(binary);
    const binaryChunks = this.chunkBinary(binaryWithPadding.join(""));
    return this.binaryArrayToBase32(binaryChunks);
  }
}

export default Base32;