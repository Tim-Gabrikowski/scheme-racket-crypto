// Function to find greatest common divisor
function gcd(a, b) {
	while (b !== 0) {
		[a, b] = [b, a % b];
	}
	return a;
}

// Function to find modular inverse using Extended Euclidean Algorithm
function modInverse(e, phi) {
	let m0 = phi,
		t,
		q;
	let x0 = 0,
		x1 = 1;
	if (phi === 1) return 0;

	while (e > 1) {
		// q is quotient
		q = Math.floor(e / phi);
		t = phi;

		// phi is remainder now, process same as Euclid's algo
		phi = e % phi;
		e = t;

		t = x0;
		x0 = x1 - q * x0;
		x1 = t;
	}

	// Make x1 positive
	if (x1 < 0) {
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
		if (isPrime(p)) return p;
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
	console.log("Generate Primes");
	// Generate two random prime numbers p and q
	const p = generatePrime(bits / 2);
	console.log("p", p);
	const q = generatePrime(bits / 2);
	console.log("q", q);

	// Calculate n = p * q
	const n = p * q;

	// Calculate Euler's Totient function φ(n) = (p-1) * (q-1)
	const phi = (p - 1) * (q - 1);

	console.log("generate e");
	// Choose e such that 1 < e < φ(n) and gcd(e, φ(n)) = 1
	let e = 3;
	while (gcd(e, phi) !== 1) {
		e += 2;
	}
	console.log("e", e);

	console.log("calc d");
	// Calculate d as the modular inverse of e mod φ(n)
	const d = modInverse(e, phi);

	console.log("d", d);

	return {
		publicKey: { n, e },
		privateKey: { n, d },
	};
}

// RSA Encryption: Cipher = (message ^ e) mod n
function encrypt(message, publicKey) {
	const { n, e } = publicKey;
	return modPow(message, e, n);
}

// RSA Decryption: Message = (cipher ^ d) mod n
function decrypt(cipher, privateKey) {
	const { n, d } = privateKey;
	return modPow(cipher, d, n);
}

// Function for modular exponentiation: (base^exp) % mod
function modPow(base, exp, mod) {
	let result = 1;
	base = base % mod;

	while (exp > 0) {
		if (exp % 2 === 1) {
			result = (result * base) % mod;
		}
		exp = Math.floor(exp / 2);
		base = (base * base) % mod;
	}

	return result;
}

// Example usage
const { publicKey, privateKey } = generateRSAKeys(64);
console.log("Public Key:", publicKey);
console.log("Private Key:", privateKey);

const message = 42; // Simple numeric message
const cipher = encrypt(message, publicKey);
console.log("Encrypted:", cipher);

const decryptedMessage = decrypt(cipher, privateKey);
console.log("Decrypted:", decryptedMessage);
