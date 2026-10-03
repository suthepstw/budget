import fs from 'node:fs';
import { randomBytes } from 'node:crypto';
if (!fs.existsSync('.dev.vars')) {
  fs.writeFileSync('.dev.vars', `SETUP_TOKEN="${randomBytes(24).toString('hex')}"\n`);
  console.log('Created .dev.vars with a random local SETUP_TOKEN.');
} else console.log('Kept the existing .dev.vars.');
