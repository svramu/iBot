@echo off
@RD /S /Q "./allure-results"
npx playwright test generate.main.spec.ts && npx playwright test main.spec.new.ts --reporter=line,allure-playwright && npx allure generate ./allure-results --clean &&npx allure open ./allure-report