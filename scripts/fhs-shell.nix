{ pkgs ? import <nixpkgs> {} }:

pkgs.buildFHSUserEnv {
  name = "chromium-env";
  targetPkgs = pkgs: with pkgs; [
    glib
    nss
    nspr
    atk
    at-spi2-core
    at-spi2-atk
    cups
    libdrm
    libxkbcommon
    xorg.libxcb
    xorg.libXcomposite
    xorg.libXdamage
    xorg.libXfixes
    xorg.libXrandr
    mesa
    alsa-lib
    pango
    cairo
    gtk3
    xorg.libX11
    xorg.libXext
    xorg.libXrender
    xorg.libXtst
    xorg.libXi
    xorg.libXcursor
    xorg.libXScrnSaver
    dbus
    expat
    libffi
    zlib
  ];
  runScript = "bash";
}
