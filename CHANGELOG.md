# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 0.1.0 (2022-03-06)


### Features

* **acr:** use infra-as-code, assign kubelets pull rights ([d740038](https://github.com/julie-ng/azure-kubernetes-architect/commit/d740038521583bc05eda6c7eb7b46556c34def2e))
* **ci:** add codeql analysis ([657c097](https://github.com/julie-ng/azure-kubernetes-architect/commit/657c097c5018fbeb47cdf61c9b6e1da3a17d9be3))
* **ci-cd:** confirm deployment via build sha ([4a60e9c](https://github.com/julie-ng/azure-kubernetes-architect/commit/4a60e9cd60957b49e3859e47ee311b19c63f9b19))
* **content:** refactor markdown, front matter for beter taxonomy ([ed11689](https://github.com/julie-ng/azure-kubernetes-architect/commit/ed116896346b733a40135fbdfd6bf1f1fd427cb9))
* **deployment:** deploy to user node pool ([de887a6](https://github.com/julie-ng/azure-kubernetes-architect/commit/de887a63261d8f361616e18d4a3a9125774ad67c))
* **design:** colors, layout, navigation ([fdc0f45](https://github.com/julie-ng/azure-kubernetes-architect/commit/fdc0f45b056572a0a004ae6b69c824c5a274482d))
* **detail:** add inputs, headings for better content flow ([ac6ba7f](https://github.com/julie-ng/azure-kubernetes-architect/commit/ac6ba7fc1501917b81977d744eecd2c3c84450c4))
* **error:** add 404 page ([deda976](https://github.com/julie-ng/azure-kubernetes-architect/commit/deda976282f5e50e1d8bdca6183834cc454fe078))
* **factors:** style and link to detail pages ([a3c5876](https://github.com/julie-ng/azure-kubernetes-architect/commit/a3c58760ae299d96f0a27d4bdfbb73f288ca61dc))
* **http-logging:** use express, move nuxt to middleware ([60f3725](https://github.com/julie-ng/azure-kubernetes-architect/commit/60f37250ff997603c9335e9038701c0f60c209b2))
* **infra:** create scoped service principals for namespae ([9a1a68d](https://github.com/julie-ng/azure-kubernetes-architect/commit/9a1a68dcf163ef40d350f62c03376b685211c45d))
* **logging:** add middleware placeholder ([b5fe18b](https://github.com/julie-ng/azure-kubernetes-architect/commit/b5fe18b242a12192aed8ddafa5046f5f19a58515))
* **nav-tabs:** flip between app and guide view for same content ([3d19650](https://github.com/julie-ng/azure-kubernetes-architect/commit/3d196501153552059a6ea26305ec60d1afee740d))
* **navigation:** for all pages, not just app page ([9912eb3](https://github.com/julie-ng/azure-kubernetes-architect/commit/9912eb3b9d11a8d697115302177dae0825580cd7))
* **ops:** spread pods evenly across nodes ([255929b](https://github.com/julie-ng/azure-kubernetes-architect/commit/255929b014a84642c534f27681e76143f80de86d))
* **refactor:** centralize schemas, now testable ([f4e15b9](https://github.com/julie-ng/azure-kubernetes-architect/commit/f4e15b90f369f74027c70b0c1fccdebc64328a64))
* **score:** add print version stylesheet ([9172673](https://github.com/julie-ng/azure-kubernetes-architect/commit/9172673d96e5f9577717e806ea5953f85c28102d))
* **score:** add score breakdown page ([7ab75a3](https://github.com/julie-ng/azure-kubernetes-architect/commit/7ab75a3d7b92f2aec24e4c566d285dba0e0e741c))
* **state:** persist decisions across page (re)loads via sessionStorage ([f5f1916](https://github.com/julie-ng/azure-kubernetes-architect/commit/f5f1916a9a8eb152bc2270f8a1a9ceadeec980ac))
* link only question, load factor content on dedicated page ([7dac615](https://github.com/julie-ng/azure-kubernetes-architect/commit/7dac615230054b7abf38e079314bbab4540d7810))
* **typography:** default to source sans pro ([e8a5344](https://github.com/julie-ng/azure-kubernetes-architect/commit/e8a534402220a8ff6ec5f0570f13fe26fabd27ba))


### Bug Fixes

* **ci:** build needs root permission to create node_modules dir ([89861af](https://github.com/julie-ng/azure-kubernetes-architect/commit/89861af20f9f18736998e4d489f467dc76437923))
* **e2e:** match chromedriver with build agent's version ([9b97112](https://github.com/julie-ng/azure-kubernetes-architect/commit/9b97112f8b71564cc2f810da1d54c05ea39281a4))
* **ingress:** missing annotation, otherwise 404 ([41c922e](https://github.com/julie-ng/azure-kubernetes-architect/commit/41c922e5e024d22474a8241c7cf5a49d342beb57))
* 2 bugs caused by inputValue reactivity on radio input ([f48d0ef](https://github.com/julie-ng/azure-kubernetes-architect/commit/f48d0ef83beae85af6fa73a8fcff3118cc8c1b0e))
* dockerfile ws / node_modules permissions ([50acafa](https://github.com/julie-ng/azure-kubernetes-architect/commit/50acafa6e4afad203e641d2ad13d4a154a00f723))
* **ci:** pipeline syntax ([4592553](https://github.com/julie-ng/azure-kubernetes-architect/commit/45925532112a378c3e09c2c5e103777f74106468))
* **scoreboard:** widths render from persisted state on load ([13affd4](https://github.com/julie-ng/azure-kubernetes-architect/commit/13affd485213bbca07e34641032c548b5b81b195))
* missing tag for ssr and client side dom match ([05de2c4](https://github.com/julie-ng/azure-kubernetes-architect/commit/05de2c4239edf8524c883c71e6b60476c94c5882))
* **state:** create dedicated 'undecided' options per question for reactive model ([bc58621](https://github.com/julie-ng/azure-kubernetes-architect/commit/bc58621f9a8385353c1795512ef57845ed285e9b))
