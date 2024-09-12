// Function to find greatest common divisor
function gcd(a, b) {
	while (b !== 0n) {
		[a, b] = [b, a % b];
	}
	return a;
}

// Function to find modular inverse using Extended Euclidean Algorithm
function modInverse(e, phi) {
	let m0 = phi,
		t,
		q;
	let x0 = 0n,
		x1 = 1n;
	if (phi === 1n) return 0n;

	while (e > 1n) {
		// q is quotient
		q = e / phi;
		t = phi;

		// phi is remainder now, process same as Euclid's algo
		phi = e % phi;
		e = t;

		t = x0;
		x0 = x1 - q * x0;
		x1 = t;
	}

	// Make x1 positive
	if (x1 < 0n) {
		x1 += m0;
	}

	return x1;
}

// Function to generate a random prime number (naive implementation)
function generatePrime(bits) {
	const min = Math.pow(2, bits - 1);
	const max = Math.pow(2, bits) - 1;

	while (true) {
		const p = Math.floor(Math.random() * (max - min) + min);
		if (isPrime(p)) return BigInt(p);
	}
}

// Function to check if a number is prime (naive implementation)
function isPrime(num) {
	if (num <= 1) return false;
	if (num <= 3) return true;
	if (num % 2 === 0 || num % 3 === 0) return false;

	let i = 5;
	while (i * i <= num) {
		if (num % i === 0 || num % (i + 2) === 0) return false;
		i += 6;
	}
	return true;
}

// RSA Key Generation
function generateRSAKeys(bits) {
	let start = Date.now();
	//console.log("Generate first Prime");
	// Generate two random prime numbers p and q
	const p = generatePrime(bits / 2);
	// console.log("Generate second Prime");
	const q = generatePrime(bits / 2);

	// Calculate n = p * q
	const n = p * q;

	// Calculate Euler's Totient function φ(n) = (p-1) * (q-1)
	const phi = (p - 1n) * (q - 1n);

	// console.log("generate e");
	// Choose e such that 1 < e < φ(n) and gcd(e, φ(n)) = 1
	let e = BigInt(3);
	while (gcd(e, phi) !== 1n) {
		e += 2n;
	}

	// console.log("calc d");
	// Calculate d as the modular inverse of e mod φ(n)
	const d = modInverse(e, phi);

	return {
		publicKey: { n, e },
		privateKey: { n, d },
		timeTaken: Date.now() - start,
	};
}

// RSA Encryption: Cipher = (message ^ e) mod n
function encrypt(message, publicKey) {
	const { n, e } = publicKey;
	return modPow(BigInt(message), e, n);
}

// RSA Decryption: Message = (cipher ^ d) mod n
function decrypt(cipher, privateKey) {
	const { n, d } = privateKey;
	return modPow(BigInt(cipher), d, n);
}

// Function for modular exponentiation: (base^exp) % mod
function modPow(base, exp, mod) {
	let result = BigInt(1);
	base = base % mod;

	while (exp > 0n) {
		if (exp % 2n === 1n) {
			result = (result * base) % mod;
		}
		exp = exp / 2n;
		base = (base * base) % mod;
	}

	return result;
}

function main(bits = 16) {
	// Example usage
	const { publicKey, privateKey, timeTaken } = generateRSAKeys(bits);
	console.log("Public Key:", publicKey);
	console.log("Private Key:", privateKey);

	const message = 111; // Simple numeric message
	console.log("Message:", message);

	const cipher = encrypt(message, publicKey);
	console.log("Encrypted:", cipher);

	const decryptedMessage = decrypt(cipher, privateKey);
	console.log("Decrypted:", decryptedMessage);

	console.log("Generaton took:", timeTaken, "ms", "\n");
}

module.exports = {
	modPow,
	generateRSAKeys,
	decrypt,
	encrypt,
	main,
};

// const {modPow, generateRSAKeys, decrypt, encrypt, main} = require("./rsa.js");
