# RSA-DES

RSA-DES Encipher for *Principles of Information Security* 2019 Fall @ Fudan University, by [**Zuobai Zhang**](<https://oxer11.github.io/>)

## Introduction

This is the mid-term project for our Information Security course. In this project, I have implemented the DES method using *javascript*. You can visit [this website](<https://oxer11.github.io/DES/>) to use my encipher or you can open the DES.html to run locally. Furthermore, we implement the RSA algorithm to encrypt the key of DES and the new version is on [this website](<https://oxer11.github.io/RSA-DES/>) or open the RSA-DES.html to run locally.

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

------

As for RSA algorithm, you can first click the button '生成密钥对' to generate a pair of primes P and Q as:

**P:** 1110010101110000111101101010011000111111001100010101110001001101

**Q:** 1101101111111101001110011100101100001001111001010011111000101111

**n:**
11000101001010101001011101110000000110101011100010110110000110000010011100110011001001010100100011010100010010111001100000100011

**e:65537**

**d:**
110100000111110010111101001011011111100111010011101000000001100000000110111111010100000110111010001110101010010110001010001001

**key:**
1000100010001000100010001000100010001000100010001000100010001000

**cipher_key(after RSA):**
1011100100100001110001101001011001011000111110110110010111001000011111100110100101001000001000100111111000111100101010110100000




