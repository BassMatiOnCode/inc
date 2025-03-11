@rem Copies files from the development folder
@rem upload folder-name\*.* flags = copies all files with confirmation
@rem upload folder-name\file-name flags = copies one file with confirmation
xcopy /s /d /b ..\..\..\webcat\code\%1 %1 %2