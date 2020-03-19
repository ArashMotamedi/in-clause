Add-Type -A 'System.IO.Compression.FileSystem';
[IO.Compression.ZipFile]::CreateFromDirectory('build', 'build.zip');
Move-Item build.zip build
explorer /select,"build\build.zip";