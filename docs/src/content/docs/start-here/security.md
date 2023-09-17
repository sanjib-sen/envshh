---
title: Security
description: Security | envshh.
---

When you [push](/commands/push) or [pull](/commands/pull) your environment, envshh will prompt you for a password of more than 4 characters. This password is used to encrypt (push) or decrypt (pull) your environment variables. This password is not stored anywhere and is only used to encrypt/decrypt your environment variables on the fly.

As envshh does not store / cache your password anywhere (neither your device nor on the remote remository), if you forget the password, you will not be able to decrypt your environment variables. You will have to [push](/commands/push) your environment variables again.

## encrypt

Your environment variables are encrypted using [AES-256-GCM encryption algorithm](https://en.wikipedia.org/wiki/Galois/Counter_Mode).
Which is recommended by many cybersecurity professionals.

### codebase

The code for encryption is mentioned below. This is enhanced and secure version version of [this](https://github.com/luke-park/SecureCompatibleEncryptionExamples) code.

You can change the encryption algorithm by editing the `/src/encryption/lib.ts` file. If you know any better algorithm or policy, please open an issue or pull request.

`/src/encryption/lib.ts`
```ts

import crypto from 'crypto';
import { exitWithError } from '../utils/process.js';

const ALGORITHM_NAME = 'aes-256-gcm';
const ALGORITHM_NONCE_SIZE = 12;
const ALGORITHM_TAG_SIZE = 16;
const ALGORITHM_KEY_SIZE = 32;
const PBKDF2_NAME = 'sha256';
const PBKDF2_SALT_SIZE = 16;
const PBKDF2_ITERATIONS = 32767;

export function encryptString(plaintext: string, password: string) {
  // Generate a 128-bit salt using a CSPRNG.
  const salt = crypto.randomBytes(PBKDF2_SALT_SIZE);

  // Derive a key using PBKDF2.
  const key = crypto.pbkdf2Sync(
    Buffer.from(password, 'utf8'),
    salt,
    PBKDF2_ITERATIONS,
    ALGORITHM_KEY_SIZE,
    PBKDF2_NAME,
  );

  // Encrypt and prepend salt.
  const ciphertextAndNonceAndSalt = Buffer.concat([
    salt,
    encrypt(Buffer.from(plaintext, 'utf8'), key),
  ]);

  // Return as base64 string.
  return ciphertextAndNonceAndSalt.toString('base64');
}

export function decryptString(
  base64CiphertextAndNonceAndSalt: string,
  password: string,
) {
  try {
    // Decode the base64.
    const ciphertextAndNonceAndSalt = Buffer.from(
      base64CiphertextAndNonceAndSalt,
      'base64',
    );

    // Create buffers of salt and ciphertextAndNonce.
    const salt = ciphertextAndNonceAndSalt.subarray(0, PBKDF2_SALT_SIZE);
    const ciphertextAndNonce =
      ciphertextAndNonceAndSalt.subarray(PBKDF2_SALT_SIZE);

    // Derive the key using PBKDF2.
    const key = crypto.pbkdf2Sync(
      Buffer.from(password, 'utf8'),
      salt,
      PBKDF2_ITERATIONS,
      ALGORITHM_KEY_SIZE,
      PBKDF2_NAME,
    );

    // Decrypt and return result.
    return decrypt(ciphertextAndNonce, key).toString('utf8');
  } catch (error) {
    return exitWithError('Wrong Password');
  }
}

function encrypt(plaintext: Buffer, key: Buffer) {
  // Generate a 96-bit nonce using a CSPRNG.
  const nonce = crypto.randomBytes(ALGORITHM_NONCE_SIZE);

  // Create the cipher instance.
  const cipher = crypto.createCipheriv(ALGORITHM_NAME, key, nonce);

  // Encrypt and prepend nonce.
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);

  return Buffer.concat([nonce, ciphertext, cipher.getAuthTag()]);
}

function decrypt(ciphertextAndNonce: Buffer, key: Buffer) {
  // Create buffers of nonce, ciphertext and tag.
  const nonce = ciphertextAndNonce.subarray(0, ALGORITHM_NONCE_SIZE);
  const ciphertext = ciphertextAndNonce.subarray(
    ALGORITHM_NONCE_SIZE,
    ciphertextAndNonce.length - ALGORITHM_TAG_SIZE,
  );
  const tag = ciphertextAndNonce.subarray(
    ciphertext.length + ALGORITHM_NONCE_SIZE,
  );

  // Create the cipher instance.
  const cipher = crypto.createDecipheriv(ALGORITHM_NAME, key, nonce);

  // Decrypt and return result.
  cipher.setAuthTag(tag);
  return Buffer.concat([cipher.update(ciphertext), cipher.final()]);
}

```

So we can safely say that your environment variables are encrypted with a open and strong encryption algorithm.

## The Flow

When you [push](/commands/push) your environment variables, envshh will first encrypt your environment variables on the fly using the password you provided. Then it will push the encrypted environment variables to your remote repository ([localDirector](/core-concepts/instance/#3-local-directory-path) in [offline](/core-concepts/offline) mode).

When you [pull](/commands/pull) your environment variables, envshh will first pull the encrypted environment variables from your remote repository ([localDirector](/core-concepts/instance/#3-local-directory-path) in [offline](/core-concepts/offline) mode). Then it will decrypt the environment variables on the fly using the password you provided. Then it will write the decrypted environment variables to your `.env` file.

