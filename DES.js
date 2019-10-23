function permutation(a, per) {
    var b = [];
    for (let i = 0; i < per.length; i++) b.push(a[per[i]]);
    return b;
}

function XOR(a, b) {
    if (a.length != b.length) {
        throw 'The lengths of two arrays are not identical!';
    }
    var c = [];
    for (let i = 0; i < a.length; i++) c.push(a[i]^b[i]);
    return c;
}

function bin(x, length) {
    var a = [];
    for (let i = 0; i < length; i++) {
        a.unshift(x&1);
        x /= 2;
    }
    return a;
}

function dec(a) {
    var x = 0;
    for (let i = 0; i < a.length; i++) x = x*2 + a[i];
    return x;
}

const trans = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

function hex(a) {
    var x = "";
    for (let i = 0; i < a.length; i+=4) {
        var y = 8*a[i] + 4*a[i+1] + 2*a[i+2] + a[i+3];
        x = x + trans[y];
    }
    return '0x' + x;
}

const IP = [57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7,
    56, 48, 40, 32, 24, 16, 8,  0, 58, 50, 42, 34, 26, 18, 10, 2,
    60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6];

const inv_IP = [39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30,
    37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28,
    35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26,
    33, 1, 41, 9,  49, 17, 57, 25, 32, 0, 40, 8,  48, 16, 56, 24];

const SBox = [
    [[14, 4,  13, 1,  2,  15, 11, 8,  3,  10, 6,  12, 5,  9,  0,  7],
     [0,  15, 7,  4,  14, 2,  13, 1,  10, 6,  12, 11, 9,  5,  3,  8],
     [4,  1,  14, 8,  13, 6,  2,  11, 15, 12, 9,  7,  3,  10, 5,  0],
     [15, 12, 8,  2,  4,  9,  1,  7,  5,  11, 3,  14, 10, 0,  6, 13]],
    [[15, 1,  8,  14, 6,  11, 3,  4,  9,  7,  2,  13, 12, 0,  5, 10],
     [3,  13, 4,  7,  15, 2,  8,  14, 12, 0,  1,  10, 6,  9,  11, 5],
     [0,  14, 7,  11, 10, 4,  13, 1,  5,  8,  12, 6,  9,  3,  2, 15],
     [13, 8,  10, 1,  3,  15, 4,  2,  11, 6,  7,  12, 0,  5,  14, 9]],
    [[10, 0,  9,  14, 6,  3,  15, 5,  1,  13, 12, 7,  11, 4,  2,  8],
     [13, 7,  0,  9,  3,  4,  6,  10, 2,  8,  5,  14, 12, 11, 15, 1],
     [13, 6,  4,  9,  8,  15, 3,  0,  11, 1,  2,  12, 5,  10, 14, 7],
     [1,  10, 13, 0,  6,  9,  8,  7,  4,  15, 14, 3,  11, 5,  2, 12]],
    [[7,  13, 14, 3,  0,  6,  9,  10, 1,  2,  8,  5,  11, 12, 4, 15],
     [13, 8,  11, 5,  6,  15, 0,  3,  4,  7,  2,  12, 1,  10, 14, 9],
     [10, 6,  9,  0,  12, 11, 7,  13, 15, 1,  3,  14, 5,  2,  8,  4],
     [3,  15, 0,  6,  10, 1,  13, 8,  9,  4,  5,  11, 12, 7,  2, 14]],
    [[2,  12, 4,  1,  7,  10, 11, 6,  8,  5,  3,  15, 13, 0,  14, 9],
     [14, 11, 2,  12, 4,  7,  13, 1,  5,  0,  15, 10, 3,  9,  8,  6],
     [4,  2,  1,  11, 10, 13, 7,  8,  15, 9,  12, 5,  6,  3,  0, 14],
     [11, 8,  12, 7,  1,  14, 2,  13, 6,  15, 0,  9,  10, 4,  5,  3]],
    [[12, 1,  10, 15, 9,  2,  6,  8,  0,  13, 3,  4,  14, 7,  5, 11],
     [10, 15, 4,  2,  7,  12, 9,  5,  6,  1,  13, 14, 0,  11, 3,  8],
     [9,  14, 15, 5,  2,  8,  12, 3,  7,  0,  4,  10, 1,  13, 11, 6],
     [4,  3,  2,  12, 9,  5,  15, 10, 11, 14, 1,  7,  6,  0,  8, 13]],
    [[4,  11, 2,  14, 15, 0,  8,  13, 3,  12, 9,  7,  5,  10, 6,  1],
     [13, 0,  11, 7,  4,  9,  1,  10, 14, 3,  5,  12, 2,  15, 8,  6],
     [1,  4,  11, 13, 12, 3,  7,  14, 10, 15, 6,  8,  0,  5,  9,  2],
     [6,  11, 13, 8,  1,  4,  10, 7,  9,  5,  0,  15, 14, 2,  3, 12]],
    [[13, 2,  8,  4,  6,  15, 11, 1,  10, 9,  3,  14, 5,  0,  12, 7],
     [1,  15, 13, 8,  10, 3,  7,  4,  12, 5,  6,  11, 0,  14, 9,  2],
     [7,  11, 4,  1,  9,  12, 14, 2,  0,  6,  10, 13, 15, 3,  5,  8],
     [2,  1,  14, 7,  4,  10, 8,  13, 15, 12, 9,  0,  3,  5,  6, 11]]
];

const E = [31, 0, 1, 2, 3, 4, 3, 4, 5, 6, 7, 8, 7, 8, 9, 10,
    11, 12, 11, 12, 13, 14, 15, 16, 15, 16, 17, 18, 19, 20, 19, 20,
    21, 22, 23, 24, 23, 24, 25, 26, 27, 28, 27, 28, 29, 30, 31, 0];

const P = [15, 6, 19, 20, 28, 11, 27, 16,  0, 14, 22, 25,  4, 17, 30,  9,
            1, 7, 23, 13, 31, 26,  2,  8, 18, 12, 29,  5, 21, 10,  3, 24];

const IPC = [56,48,	40,	32,	24,	16,	 8,	 0,	57,	49,	41,	33,	25,	17,	 9,	 1,
    58,	50,	42,	34,	26,	18,	10,	 2,	59,	51,	43,	35,	62,	54,	46,	38,
    30,	22,	14,	 6,	61,	53,	45,	37,	29,	21,	13,	 5,	60,	52,	44,	36,
    28,	20,	12,	 4,	27,	19,	11,	 3];

const PC = [13,	16,	10,	23,	 0,	 4,	 2,	27,	14,	 5,	20,	 9,	22,	18,	11,	 3,
    25,	 7,	15,	 6,	26,	19,	12,	 1,	40,	51,	30,	36,	46,	54,	29,	39,
    50,	44,	32,	47,	43,	48,	38,	55,	33,	52,	45,	41,	49,	35,	28,	31];

const LS = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

function shift_left(a, shift) {
    if (shift > a.length) {
        throw 'Shift bits is more than original length!';
    }
    var b = [];
    for (let i = shift; i < a.length; i++) b.push(a[i]);
    for (let i = 0; i < shift; i++) b.push(a[i]);
    return b;
}

const iter = 8;

function key_generator(key) {
    if (key.length != 64) {
        throw 'Key length is not equal to 64!';
    }
    keys = [];
    key = permutation(key, IPC);
    for (let i = 0; i < iter; i++) {
        key = shift_left(key.slice(0, 28), LS[i]).concat(shift_left(key.slice(28, 56), LS[i]));
        keys.push(permutation(key, PC));
    }
    return keys;
}

function F(a, key) {
    a = permutation(a, E);
    a = XOR(a, key);
    var b = [];
    for (let i = 0; i < 8; i++) {
        var c = a.slice(i*6, (i+1)*6);
        b = b.concat(bin(SBox[i][dec([c[0],c[5]])][dec([c[1],c[2],c[3],c[4]])], 4));
    }
    b = permutation(b, P);
    return b;
}

function DES(a, keys) {
    a = permutation(a, IP);
    var L = a.slice(0, 32);
    var R = a.slice(32, 64);
    for (let i = 0; i < iter; i++) {
        var new_L = R;
        var new_R = XOR(L, F(R, keys[i]));
        L = new_L;
        R = new_R;
    }
    var b = R.concat(L);
    b = permutation(b, inv_IP);
    return b;
}

/*
// Test DES
    var plaintext = bin(123, 64), key = bin(123, 64);
    console.log(hex(key));
    keys = key_generator(key);
    console.log(hex(plaintext));
    var ciphertext = DES(plaintext, keys);
    console.log(hex(ciphertext));
    plaintext = DES(ciphertext, keys.reverse());
    console.log(hex(plaintext));
*/

function CBC(plaintext, IV, keys, is_decode) {
    var ciphertext = [];
    var lst_cipher = IV;
    for (let i = 0; i < plaintext.length; i += 64)
    {
        if (is_decode)
        {
            var cur_text = plaintext.slice(i, i + 64);
            ciphertext = ciphertext.concat(XOR(DES(cur_text, keys), lst_cipher));
            lst_cipher = cur_text;
        }
        else
        {
            var cur_text = XOR(plaintext.slice(i, i + 64), lst_cipher);
            lst_cipher = DES(cur_text, keys);
            ciphertext = ciphertext.concat(lst_cipher);
        }
    }
    return ciphertext;
}

function toarray(str){
    var a = new Array();
    for(var i = 0; i < str.length; i++)
        a[i] = str[i] - '0';
    return a;
}

function check(str, name, check_length) {
    if (str == "")
    {
        alert(name + "不能为空!");
        return false;
    }
    for (let i = 0; i < str.length; i++)
        if (str[i] != '0' && str[i] != '1')
        {
            alert(name + "应为01字符串！");
            return false;
        }
    if (check_length && str.length != 64)
    {
        alert(name + "长度应为64！");
        return false;
    }
    return true;
}

