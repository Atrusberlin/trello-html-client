@echo off

REM define environment variable %NGINX_DIR% or replace it with the directory itself

%NGINX_DIR%\nginx.exe -p %CD% -s stop

@echo on