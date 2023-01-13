echo "Running Test Case Generation..."  
rm -rf allure-results
isodate=$(date '+%Y-%m-%d-%H-%M-%S')
npx playwright test generate.main.spec.ts
echo "Running Test Cases..."
npx playwright test main.spec.runEachTest.ts --reporter=line,allure-playwright 
echo "Generating Report..."
npx allure generate ./allure-results --clean -o ./allure-report--$isodate && npx allure open ./allure-report--$isodate
#To clean all the allure-report folder 
#rm -Rf allure-report*