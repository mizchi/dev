# MDXX SSG

## Features

- Build amdx on next ssg
- Support AMP

## Create your own blog

```bash
# install node and npm
npx degit mizchi/amdx/packages/ssg blog
cd blog
npm install
cp amdxg.config.example amdxg.config
# edit amdxg.config for you

# create new page
npm run new-page
# edit docs/[current-date].mdx

# create new page with slug
npm run new-page foo
# edit docs/foo.mdx

# Preview
npm run dev

# Deploy
npm run build
npm run deploy
```
