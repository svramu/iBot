@echo off
@RD /S /Q "./allure-results"
SET isodate=%date:~10,4%-%date:~7,2%-%date:~4,2%-%time:~0,2%-%time:~3,2%-%time:~6,2%
echo %isodate%
npx playwright test generate.main.spec.ts && npx playwright test main.spec.runEachTest.ts --reporter=line,allure-playwright && npx allure generate ./allure-results --clean -o ./allure-report--%isodate% && npx allure open ./allure-report--%isodate%