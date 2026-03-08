# Uphouseworks

Personal website and blog built with [Hugo](https://gohugo.io/) (v0.88.1).

## Prerequisites

- [Nix](https://nixos.org/download/) package manager

Alternatively, install [Hugo v0.88.1 extended](https://github.com/gohugoio/hugo/releases/tag/v0.88.1) manually, but generally it would be better to use the nix managed version.

## Setup

With Nix installed, the pinned Hugo version is provided automatically:

```sh
nix-shell
```

If you have [direnv](https://direnv.net/) installed, the environment loads automatically when you `cd` into the project directory:

```sh
direnv allow
```

## Development

Start the local dev server:

```sh
hugo server
```

For viewing drafts run `hugo server -D`.

The site will be available at `http://localhost:1313/`.

## Build

Generate the static site into the `docs/` directory:

```sh
hugo -d docs
```
