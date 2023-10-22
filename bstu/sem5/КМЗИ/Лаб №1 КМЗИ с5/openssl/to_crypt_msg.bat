@echo off
if "%1" == "" (
    echo Usage: encrypt.bat [key]
    exit /b 1
)

set key=%1
set inputFile=msg.txt

:: Encrypt the file and overwrite the original
openssl rc4 -in %inputFile% -out %inputFile% -pass pass:%key%

:: Display the result in the console
type %inputFile%
echo.
echo File encrypted and saved successfully!