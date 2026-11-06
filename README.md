## mixmatch

Yet another mixin.

## Installation

```sh
npm config set @fulcrumapp:registry https://npm.pkg.github.com
npm install @fulcrumapp/mixmatch
```

Authenticate to GitHub Packages with a token that has access to the package and
the `read:packages` scope. The scoped package is distinct from the existing
`mixmatch` package on npmjs.org. Consumers migrating to it must update their
imports and registry configuration; releases here no longer update npmjs.org.

## Example

```js
import Mixin from '@fulcrumapp/mixmatch';

class HasHeight extends Mixin {
  get height() {
    return 72;
  }

  heightAsMeters() {
    return this.height * 0.0254;
  }
}

class Person {
  constructor(name) {
    this.name = name;
  }
}

HasHeight.includeInto(Person);

const me = new Person('me');

console.log(me.height);
console.log(me.heightAsMeters());
```

## CI and releases

Pull requests, merge queue entries, and pushes to `main` run the build, lint,
tests, and packed-package checks. External fork runs require approval under
GitHub's repository approval policy.

After successful `main` validation, the release GitHub App creates a signed
version-only commit on `main` and its matching stable `vX.Y.Z` tag. Creating
the tag triggers a separate workflow that builds and publishes the matching
package version to GitHub Packages and creates GitHub Release notes. Do not
manually change the version in `package.json`.

The publisher disables install and pack lifecycle scripts, and explicitly runs
the clean build before packaging. To recover a failed release, rerun the
failed workflow: the tag and release commit are verified, and an existing
package is accepted only when its integrity matches. A rerun uses the workflow
and release code at the tag; changes merged later do not alter that run.
