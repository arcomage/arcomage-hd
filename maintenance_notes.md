# Maintenance Notes

## Dependency Update

* `@material-ui/core` uses the latest `5.0.0-beta.x`, instead of `4.x`
* `rxjs` uses the latest `6.x`, instead of `7.x`
  * `redux-observable` uses the latest `1.x`, instead of `2.x`

## App Version Update

* Use yarn v1 instead of v2
* `husky` and `commitlint` execute `yarn test` and lint the commit message before every commit
* If a new version is decided to be released, do these:
  * Commit all changes
  * `yarn version`, enter new version number. It'll automatically add a new version and tag, push, and deploy
