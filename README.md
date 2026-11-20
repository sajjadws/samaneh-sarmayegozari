npm run build-miz
npm run build-module

node --env-file=.env --experimental-strip-types prisma/seed.js
node --env-file=.env --import=tsx prisma/seed.js

git rm --cached public/css/miz.min.css
git rm --cached public/css/style.min.css
git rm -r --cached .
