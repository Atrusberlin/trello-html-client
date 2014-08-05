@echo off

REM ensure necessary folder exists

IF NOT exist .\logs (
  echo.create logs directory
  mkdir logs
)
IF NOT exist .\temp (
  echo.create log directory
  mkdir temp
)

REM define environment variable %NGINX_DIR% or replace it with the directory itself

%NGINX_DIR%\nginx.exe -p %CD%

@echo on