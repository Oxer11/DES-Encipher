'use strict'
//var BigInt = require("./BigInt.js");

setMaxDigits(128 * 2 / 16);

// var bigZero = BigInt.biFromNumber(0);
// var bigOne = BigInt.biFromNumber(1);
var bigTwo = biFromNumber(2);
var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
    31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97];

function GetRandomNum(Min, Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return Math.ceil(Min + Math.round(Rand * Range));
}

function RandBigInt(a) {
    var result = new BigInt();
    a = biSubtract(a, bigTwo);
    var n = biHighIndex(a);
    for (let i = 0; i < n; i++) {
        result.digits[i] = GetRandomNum(0, BigInt.biRadix-1);
    }
    result.digits[n] = GetRandomNum(0, a.digits[n]);
    result = biAdd(result, bigTwo);
    return result;
}

function is_prime(n) {
    for (let i = 0; i < primes.length; i++) {
        let p = biFromNumber(primes[i]);
        if (biCompare(n, p) == 0) return true;
        let a = biModulo(n, p);
        if (biCompare(a, bigZero) == 0) return false;
    }
    var n1 = biSubtract(n, bigOne);
    var m = biDivideModulo(n1, bigTwo), m1 = biCopy(n1);
    var k = 0;
    while (biCompare(m[1], bigZero) == 0) {
        k++;
        m1 = biCopy(m[0]);
        m = biDivideModulo(m[0], bigTwo);
    }
    m = m1;
    var a, b;
    for (let iter = 0; iter < 100; iter++) {
        a = RandBigInt(n1);
        b = biPowMod(a, m, n);
        if (biCompare(b, bigOne) == 0) continue;
        for (let i = 1; i <= k; i++) {
            if (biCompare(b, n1) == 0) break;
            else b = biMultiplyMod(b, b, n);
        }
        if (biCompare(b, n1) != 0) return false;
    }
    return true;
}

function RandBigIntByBits(nbits) {
    var s = "1";
    for (let i = 1; i < nbits-1; i++) {
        s += GetRandomNum(0, 1) == 0 ? "0" : "1";
    }
    return biFromString(s + "1", 2);
}

function generate_P(nbits) {
    var P = RandBigIntByBits(nbits);
    while (is_prime(P) == false) {
        P = RandBigIntByBits(nbits);
    }
    return P;
}

function gcd(p, q) {
    if (biCompare(q, bigZero) == 0) return p;
    else return gcd(q, biModulo(p, q));
}

function ex_gcd(p, q) {
    if (biCompare(q, bigZero) == 0) return [bigOne, bigZero];
    else
    {
        var m = biDivideModulo(p, q);
        var t = ex_gcd(q, m[1]);
        return [t[1], biSubtract(t[0], biMultiply(m[0], t[1]))];
    }
}

function inv(p, n) {
    var result = ex_gcd(p, n)[0];
    if (biCompare(result, 0) == -1)
        result = biAdd(biModulo(result, n), n);
    return result;
}

var e = biFromNumber(65537);

function generate_PQ(nbits) {
    var P = generate_P(nbits >> 1);
    var Q = generate_P(nbits - (nbits >> 1));
    var n = biMultiply(P, Q);
    var n1 = biMultiply(biSubtract(P, bigOne), biSubtract(Q, bigOne));
    if (biNumBits(n) != nbits) return false;
    if (biCompare(gcd(n1, e), bigOne) != 0) return false;
    var d = inv(e, n1);
    return [P, Q, n, d];
}

function encrypt(plaintext, n) {
    return biPowMod(plaintext, e, n);
}

function decrypt(ciphertext, d, p, q, n) {
    var m1 = biPowMod(biModulo(ciphertext, p), biModulo(d, biSubtract(p, bigOne)), p);
    var m2 = biPowMod(biModulo(ciphertext, q), biModulo(d, biSubtract(q, bigOne)), q);
    return biModulo(biAdd(biMultiplyMod(q, biMultiplyMod(m1, inv(q, p), n), n),
        biMultiplyMod(p, biMultiplyMod(m2, inv(p, q), n), n)), n);
}