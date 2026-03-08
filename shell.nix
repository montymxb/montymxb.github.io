let
  # pin to nixos-21.11 for Hugo 0.88.1 (matching the site's original build era)
  pkgs = import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/nixos-21.11.tar.gz") {};
in
pkgs.mkShell {
  buildInputs = [
    pkgs.hugo
  ];
}
