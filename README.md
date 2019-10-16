This repo is to illustrate the difference of following requiring strategies used in Electron App.

1. Directly use `require` API to load files one by one
2. Use Webpack to pack everything in one single file and run (import by `<script>`)
3. Use Rollup to pack everything in one single file (without runtime) and run (import by `<script>`)

The actual code should be fairly simple, it does not have much actual work.

# Steps

Following are the steps to run the tests:

0. run `yarn` to install pre-requirements

1. run `node ./bin/generate.js` to generate a bunch of small JavaScript files.

By default, it generates 100 files. To see the difference, you can also pass in environment variable to enlarge the number. Run:

```bash
TOTAL=10000 node ./bin/generate.js
```

It will generate 10000 files under `src/generated` folder.

2. run `yarn babel` to transform `import` statement in JavaScript files to `require`, so that these files can be used directly in Electron; Then, run `yarn start` to start Electron app and see the performance result.

3. run `yarn webpack` to bundle all files together using Webpack; Then, run `yarn start` to start Electron app and see the performance result.

4. run `yarn rollup` to bundle all files together using Rollup; Then, run `yarn start` to start Electron app and see the performance result.

# Result

As result of the tests, there are significant difference between requiring multiple small files and requiring one single bundled file. Testing from MacBook Pro 2018, i7, it took about 200ms to finish loading via requiring 100 small files; When switch to use bundled file, it took 170ms to load. If increase the number to 1000 files, it took babel version 500ms to load; while it only took 210ms to load when bundle all files together.

Webpack and Rollup show no difference in performance.
