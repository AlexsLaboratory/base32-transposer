import { test, expect, describe } from '@jest/globals';
import { stringToASCIIArray, asciiArrayToBase2, zeroPad, chunkBinary, binaryArrayToBase32, base32ToBinary, fiveToEightBit, binaryToASCII, asciiToString, bufferToBinaryArray, encode, decode } from '../lib/index';

describe('base32 module', () => {
    test('convert string to array of ascii characters', () => {
        const input = 'hello world';
        const output = stringToASCIIArray(input);
        expect(output).toEqual([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]);
    });

    test('convert array of ascii characters to binary', () => {
        const input = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100];
        const output = asciiArrayToBase2(input);
        expect(output).toEqual([
            '01101000',
            '01100101',
            '01101100',
            '01101100',
            '01101111',
            '00100000',
            '01110111',
            '01101111',
            '01110010',
            '01101100',
            '01100100'
        ]);
    });

    test('pad binary with x', () => {
        const acii = stringToASCIIArray('Cat');
        const binary = asciiArrayToBase2(acii);
        const output = zeroPad(binary);
        expect(output).toEqual([
            '01000011',
            '01100001',
            '01110100',
            'xxxxxxxx',
            'xxxxxxxx'
        ]);
    });

    test('chunk binary into 5 bit chunks', () => {
        const acii = stringToASCIIArray('Cat');
        const binary = asciiArrayToBase2(acii);
        const padded = zeroPad(binary);
        const output = chunkBinary(padded.join(''));
        expect(output).toEqual([
            '01000',
            '01101',
            '10000',
            '10111',
            '01000',
            'xxxxx',
            'xxxxx',
            'xxxxx'
        ]);
    });

    test('convert binary array to base32', () => {
        const inputArray = [
            '01000',
            '01101',
            '10000',
            '10111',
            '01000',
            'xxxxx',
            'xxxxx',
            'xxxxx'
        ];
        const output = binaryArrayToBase32(inputArray);
        expect(output).toEqual('INQXI===');
    });

    test('base32 encoded string to binary array', () => {
        const input = 'INQXI===';
        const output = base32ToBinary(input);
        expect(output).toEqual([
            '01000',
            '01101',
            '10000',
            '10111',
            '01000'
        ]);
    });

    test('convert 5bit to 8bit', () => {
        const input = [
            '01000',
            '01101',
            '10000',
            '10111',
            '01000'
        ];
        const output = fiveToEightBit(input);
        expect(output).toEqual([
            '01000011',
            '01100001',
            '01110100'
        ]);
    });

    test('convert binary array to ascii array', () => {
        const input = [
            '01000011',
            '01100001',
            '01110100'
        ];
        const output = binaryToASCII(input);
        expect(output).toEqual([
            67,
            97,
            116
        ]);
    });

    test('convert ascii array to string', () => {
        const input = [
            67,
            97,
            116
        ];
        const output = asciiToString(input);
        expect(output).toEqual('Cat');
    });

    test('buffer to binary array wiht padding', () => {
        const input = Buffer.from('Cat');
        const output = bufferToBinaryArray(input);
        expect(output).toEqual([
            '01000011',
            '01100001',
            '01110100',
        ]);
    });

    test('encode string to base32', () => {
        const input = 'Cat';
        const output = encode(input);
        expect(output).toEqual('INQXI===');
    });

    test('encode buffer to base32', () => {
        const input = Buffer.from('Cat');
        const output = encode(input);
        expect(output).toEqual('INQXI===');
    });

    test('decode base32 to string', () => {
        const input = 'INQXI===';
        const output = decode(input);
        expect(output).toEqual('Cat');
    });
});
