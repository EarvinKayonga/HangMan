@echo off
title Build Web
COLOR 41
echo Build for Web
start C:\Users\PapiMartial\Dev\Ionic\miniProjet\outils\gulp.bat
timeout 1
start C:\Users\PapiMartial\Dev\Ionic\miniProjet\outils\watch.bat
timeout 1
start C:\Users\PapiMartial\Dev\Ionic\miniProjet\outils\serve.bat
exit
