# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.4.1](https://github.com/With-the-Ranks/numbers-client/compare/v1.4.0...v1.4.1) (2026-06-03)


### Bug Fixes

* **package:** rename to switchboard client ([#8](https://github.com/With-the-Ranks/numbers-client/issues/8)) ([8471abb](https://github.com/With-the-Ranks/numbers-client/commit/8471abbf4730d997180f2c621569b11f2815e7e0))

## 1.4.0 (2026-06-03)


### Features

* add routing ([#1](https://github.com/With-the-Ranks/numbers-client/issues/1)) ([d737b0b](https://github.com/With-the-Ranks/numbers-client/commit/d737b0bcb9e6ea4edaea0b4033ee778649cfe3c5))
* crud on sending locations ([50b22ff](https://github.com/With-the-Ranks/numbers-client/commit/50b22ffa86aca7d958f08611f99b626352e21d50))
* expose carrier info for requests ([#39](https://github.com/With-the-Ranks/numbers-client/issues/39)) ([ee468ea](https://github.com/With-the-Ranks/numbers-client/commit/ee468ea0b7e098ba21ecfe527d14258a16170148))
* namespace lookups ([2f71985](https://github.com/With-the-Ranks/numbers-client/commit/2f7198539e7b282330fa35a2c20c8d57f406bf6a))
* **request:** support invalid, voip each page ([ccb32bb](https://github.com/With-the-Ranks/numbers-client/commit/ccb32bbf4d74c0f891900639d37bf51e748937d4))
* sms tests ([fccffec](https://github.com/With-the-Ranks/numbers-client/commit/fccffec1e9faf5e15222d8c9bd3477e27d3bc9f7))
* **sms:** add SmsClient ([eb19ff5](https://github.com/With-the-Ranks/numbers-client/commit/eb19ff54fdc8cf21b41d8ae1a227a0813a1fda96))
* support new numbers endpoints ([ec32e11](https://github.com/With-the-Ranks/numbers-client/commit/ec32e11879c3630f33a39821141aa5855d691b1a))


### Bug Fixes

* add sendBefore arg to sendMessage ([#19](https://github.com/With-the-Ranks/numbers-client/issues/19)) ([f1d0938](https://github.com/With-the-Ranks/numbers-client/commit/f1d0938263ebfb6d8235ef89fe36c62d72a27f65))
* handle null completedAt correctly ([#33](https://github.com/With-the-Ranks/numbers-client/issues/33)) ([281ad52](https://github.com/With-the-Ranks/numbers-client/commit/281ad521167066ba80888e62c5ea2c4bd66daa5f))
* include mediaUrls in query ([35ce676](https://github.com/With-the-Ranks/numbers-client/commit/35ce67645791a2b310ab0432145e120c1f36de33))
* **queries:** update request to use new mutation ([3bf6a9c](https://github.com/With-the-Ranks/numbers-client/commit/3bf6a9c7f466731e122e2c0dcb70741aefbdf900))
* **Request.ts:** make pagination use endCursor ([576800f](https://github.com/With-the-Ranks/numbers-client/commit/576800fb83dbf33e1278c39fa6a0d8289d583e07))
* **routing:** make zip optional ([#6](https://github.com/With-the-Ranks/numbers-client/issues/6)) ([45c15be](https://github.com/With-the-Ranks/numbers-client/commit/45c15be5bcc49a726033004e59a8e65b8c9eb48c))
* **sendBefore:** of type datetime ([c766345](https://github.com/With-the-Ranks/numbers-client/commit/c766345fac361e5d24d0baa54594031c1e8d28b8))
* surface GraphQL errors ([#12](https://github.com/With-the-Ranks/numbers-client/issues/12)) ([9a06b4e](https://github.com/With-the-Ranks/numbers-client/commit/9a06b4e135f8300a9ab46c0b5399afd064ad9895))
* **ts:** use type for multi-element string array ([#26](https://github.com/With-the-Ranks/numbers-client/issues/26)) ([3b47d85](https://github.com/With-the-Ranks/numbers-client/commit/3b47d8533def686c0a4e069d2a81cf00ec427833))
* use arrow function for this binding ([e1f5245](https://github.com/With-the-Ranks/numbers-client/commit/e1f524549d3ce694dcd3bf458db4541a196c3fd3))
* use correct argument name ([0b1e792](https://github.com/With-the-Ranks/numbers-client/commit/0b1e792edb51c4ef19a6b63f1efb71e3d0c3c769))

## [1.3.0](https://github.com/ben-pr-p/numbers-client/compare/v1.2.5...v1.3.0) (2022-05-22)


### Features

* expose carrier info for requests ([#39](https://github.com/ben-pr-p/numbers-client/issues/39)) ([ee468ea](https://github.com/ben-pr-p/numbers-client/commit/ee468ea0b7e098ba21ecfe527d14258a16170148))

### [1.2.5](https://github.com/ben-pr-p/numbers-client/compare/v1.2.4...v1.2.5) (2021-07-08)


### Bug Fixes

* handle null completedAt correctly ([#33](https://github.com/ben-pr-p/numbers-client/issues/33)) ([281ad52](https://github.com/ben-pr-p/numbers-client/commit/281ad521167066ba80888e62c5ea2c4bd66daa5f))
* **ts:** use type for multi-element string array ([#26](https://github.com/ben-pr-p/numbers-client/issues/26)) ([3b47d85](https://github.com/ben-pr-p/numbers-client/commit/3b47d8533def686c0a4e069d2a81cf00ec427833))

### [1.2.4](https://github.com/ben-pr-p/numbers-client/compare/v1.2.3...v1.2.4) (2020-12-18)


### Bug Fixes

* **sendBefore:** of type datetime ([c766345](https://github.com/ben-pr-p/numbers-client/commit/c766345fac361e5d24d0baa54594031c1e8d28b8))

### [1.2.3](https://github.com/ben-pr-p/numbers-client/compare/v1.2.2...v1.2.3) (2020-10-09)


### Bug Fixes

* add sendBefore arg to sendMessage ([#19](https://github.com/ben-pr-p/numbers-client/issues/19)) ([f1d0938](https://github.com/ben-pr-p/numbers-client/commit/f1d0938263ebfb6d8235ef89fe36c62d72a27f65))

<a name="1.0.7"></a>
## [1.0.7](https://github.com/ben-pr-p/numbers-client/compare/v1.0.5...v1.0.7) (2019-07-11)



<a name="1.0.5"></a>
## [1.0.5](https://github.com/ben-pr-p/numbers-client/compare/v1.0.3...v1.0.5) (2019-07-11)



<a name="1.0.3"></a>
## [1.0.3](https://github.com/ben-pr-p/numbers-client/compare/v1.0.2...v1.0.3) (2019-07-11)



<a name="1.0.2"></a>
## 1.0.2 (2019-07-11)
