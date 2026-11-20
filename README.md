npm run build-miz
npm run build-module

node --env-file=.env --experimental-strip-types prisma/seed.js
node --env-file=.env --import=tsx prisma/seed.js

<!-- Arabpour -->
1:
login admin
http://localhost:3000/admin/login
