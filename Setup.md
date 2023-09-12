# Setup the project

The steps that are laid out in the file will include setting up the following:

1. Next.JS - This will be used as the main framework for the frontend.
2. TailwindCSS [Optional]- This comes as an option when setting up NextJS
3. Eslint - Also comes with Next.js. Enforces code quality.
4. Prettier - Enforces code format.
5. Husky - Used to run prettier + eslint before commiting the code. Saves time and ensures the code is formatted correctly and follows the correct coding standards.
6. Commitizen + Commitlint (Conventional Commits) - Used to follow the correct method of commiting your code
7. Lintstaged - Gives us the ability to run commands on staged files (ie: files that have not been commited yet)

## Instructions

### 1. Next.js

```shell
npx create-next-app@latest
```

In the options make sure to chose the following

```shell
What is your project named?  [your team name comes here]
Would you like to use TypeScript?  No
Would you like to use ESLint?  Yes
Would you like to use Tailwind CSS?  No / Yes [This is optional]
Would you like to use `src/` directory?  Yes
Would you like to use App Router? (recommended)  No
Would you like to customize the default import alias?  Yes
```

The above steps will take care of steps 1, 2, and 3. Now lets go to the next point.

### 2. Prettier

Prettier is used to enforce a certain coding format. This way everyone codes in the same code style which creates consistency in the project.

```shell
npm install --save-dev prettier
```

Create a new file called `.prettierrc.js` in the root folder and put the following inside of it

```js
module.exports = {
  semi: false,
  singleQuote: false, // Do you want to use double or single quotations?
  trailingComma: 'all',
}
```

Add the following to `package.json` in the script property

```js
    "scripts": {
      ..., // [DONT COPY THIS LINE] Previous scripts
        "format": "prettier --check --ignore-path .gitignore .",
        "format:fix": "prettier --write --ignore-path .gitignore ."
      ..., // [DONT COPY THIS LINE] Next scripts
    }
```

### 3. [Husky](https://typicode.github.io/husky/)

Husky is used to attach commands to git lifecycle hooks. You can use it to lint your commit messages, run tests, lint code

```jsx
npx husky-init && npm install
```

Add the following to `package.json` in the script property

```js
    "scripts": {
      ..., // [DONT COPY THIS LINE] Previous scripts
        "prepare": "husky install",
      ..., // [DONT COPY THIS LINE] Next scripts
    }
```

Go to ``./husky/pre-commit` and replace all the file's content with the following. This will ensure that everytime we try to create a commit that the following commands gets executed and that we get the correct results.

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run format:fix
npx lint-staged
```

Now run `npm run prepare` that we created previously to initialize the new changes we created.

### 4.  [Commitizen](https://github.com/commitizen/cz-cli) + [Commitlint]() [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

Commitizen and Conventional Commits are used to force correct code commit messages in the project. Commitizen is the tool while Conventional commits is the standard while Commitlint is a tool used to enforce that you follow the conventions.

First, install the Commitizen CLI tools:

```js
npm install commitizen -g
```

Next, initialize your project to use the cz-conventional-changelog adapter by typing:

```js
commitizen init cz-conventional-changelog --save-dev --save-exact
```

Finally go to `package.json` and add the following towards the end of the properties. Search for `husky` and add this hooks property

```js
"husky": {
  "hooks": {
    "prepare-commit-msg": "exec < /dev/tty && npx cz --hook || true"
  }
}
```

Now let's add Commitlint!

Install commitlint with

```shel
# Install commitlint cli and conventional config
npm install --save-dev @commitlint/{config-conventional,cli}
# For Windows:
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

Create configuration file with the following command 
```
echo "module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        //   TODO Add Scope Enum Here
        // 'scope-enum': [2, 'always', ['yourscope', 'yourscope']],
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'docs',
                'chore',
                'style',
                'refactor',
                'ci',
                'test',
                'perf',
                'revert',
                'build',
                'vercel',
            ],
        ],
    },
};" > commitlint.config.js
```
Now let's finalize this by adding the precommit message
```
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

### 5. [Lintstaged](https://github.com/okonet/lint-staged)

This enables us to use eslint and prettier when we commit code. This way, we can always make sure that our code is clean once we commit the code.

Run this command

```js
npm install --save-dev lint-staged
```

Finally add this code to the end of `package.json` object

```js
"lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
        "eslint",
        "prettier -w"
    ],
    "src/**/*.{json,css,scss,md}": [
        "prettier -w"
    ]
},
```

### 6. Finalize

You will finally get a new error `` to solve it do the following:

Create a new file called `.babelrc` and add the following inside of it

```js
{
  "presets": ["next/babel"],
  "plugins": []
}
```

Now go to `.eslintrc.json` and add change it to

```js
{
  "extends": ["next/core-web-vitals","next/babel"]
}
```

Now run `npm run dev` your project should be ready.

If everything is running correctly, let's create our first commit using `git cz` then choose `chore` by going down the list and add the scope `project structure` and small short message that explains what you did. Press enter to leave the longer description empty (if you want)