$ErrorActionPreference = "Stop"

$env:RUBYOPT = "-r./tools/liquid_taint_compat.rb"
$env:JEKYLL_NO_BUNDLER_REQUIRE = "true"

& "D:\Ruby32-x64\bin\jekyll.bat" serve --livereload --host 127.0.0.1
