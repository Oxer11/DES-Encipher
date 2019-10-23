# DES-Encipher

DES Encipher for *The Principle of Information Security* 2019 Fall @ Fudan University, by [**Zuobai Zhang**](<https://oxer11.github.io/>)

## Introduction

This is the mid-term project for our Information Security course. In this project, I have implemented the DES method using *javascript*. You can visit [this website](<https://oxer11.github.io/DES/>) to use my encipher or you can open the main.html to run locally.

## Example
As an illustrative instance, you can apply the DES algorithm on the following test case:

**plaintext:** 0000 0001 0010 0011 0100 0101 0110 0111 1000 1001 1010 1011 1100 1101 1110 1111

**key:** 00010011 00110100 01010111 01111001 10011011 10111100 11011111 11110001

**initial vector IV:** 0000000000000000000000000000000000000000000000000000000000000000

Then, you will get the answer:

**ciphertext:** 0101010010101100110000000011110001001011000110000111010001001001

**encrypted initial vector IV:**
1110000111000011101101011100111010101101001110110001000101100101

After that, you can click the button '检验DES' to check the correctness of the DES algorithm.