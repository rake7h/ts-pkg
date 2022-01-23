import dedent from 'dedent';

const packageJson = {
    "name": "foo",
    "version": "0.1.0",
    "description": "",
    "keywords": [],
    "author": "",
    "license": "ISC",
    "directories": {
      "lib": "dist",
      "test": "__tests__"
    },
    "files": [
      "dist"
    ],
    "publishConfig": {
      "access": "public"
    },
    "scripts": {
      "test": "echo \"Error: run tests from root\" && exit 0"
    },
}

const index = dedent`
const foo = () => {

};

export default foo;
`

const test = dedent`
import foo from '../src';

describe('foo', () => {
  it('needs tests');
});
`


export {packageJson, index, test}
