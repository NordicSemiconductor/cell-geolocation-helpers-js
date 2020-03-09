# Cell Geolocation Helpers

[![GitHub Package Registry version](https://img.shields.io/github/release/bifravst/cell-geolocation-helpers.svg?label=GPR&logo=github)](https://github.com/bifravst/cell-geolocation-helpers/packages/46253)
[![GitHub Actions](https://github.com/bifravst/cell-geolocation-helpers/workflows/Test%20and%20Release/badge.svg)](https://github.com/bifravst/cell-geolocation-helpers/actions)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)
[![ESLint: TypeScript](https://img.shields.io/badge/ESLint-TypeScript-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)

Helper functions for the cell geolocation feature.

## Installation

> Note: This package is hosted on the GitHub package registry and
> [npm needs to be configured](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry#installing-a-package)
> in order to use it.

    echo "@bifravst:registry=https://npm.pkg.github.com" >> .npmrc
    npm i --save-dev @bifravst/cell-geolocation-helpers

## `cellId`

Simple formatter to create identifier strings from cell information. This is
used to unify the way these ids are generated between frontend and backend.

## `cellFromGeolocations`

Calculates a cell geo location based on a list of geo locations:

- the center is the average of all given locations (within a configurable
  percentile)
- the diameter returned is a circle that includes all given locations (within a
  configurable percentile), but at least `minCellDiameterInMeters`.

Check out the live demo on
<https://bifravst.github.io/cell-geolocation-helpers>.
