import { test} from '@playwright/test'
import { Workbook } from 'exceljs'
import { log } from 'handlebars/runtime'
import { runSheet, getTestCases } from './actions'
import {
  ACTION, ACTION_FORMAT, COMMENT_FORMAT,
  DATA, FILE, humanNowDateTime, LOCATOR, PRINT_FORMAT,
  SHEET, TRACE, TRACE_FORMAT,
} from './consts'
import { logAll, logSheetClose, parseInts, SHEET_TIMER, TOTAL_SUMMARY, TOTAL_TIMER, syncReadFile,syncWriteFile } from './lib'

//global page and context
let page;
let ctx;
const wb = new Workbook()

test.describe('iBot Tests',()=>{
 
  test.beforeAll(async ({browser}) => {
    logAll('Before tests start...')
    TOTAL_TIMER.start()
    logAll('NOW:', humanNowDateTime())
    logAll('FILE:', FILE)
    logAll('SHEET:', SHEET)

    logAll('LOCATOR:', LOCATOR)
    logAll('ACTION:', ACTION)
    logAll('DATA:', DATA)
    logAll('ACTION_FORMAT:', ACTION_FORMAT)
    logAll('PRINT_FORMAT:', PRINT_FORMAT)
    logAll('COMMENT_FORMAT:', COMMENT_FORMAT)

    logAll('TRACE_FORMAT:', TRACE_FORMAT)
    logAll('DEBUG_TRACE:', TRACE)

    
    await wb.xlsx.readFile(FILE!)
    logAll('sheets: ', wb.worksheets.length)
    //if (TRACE) logAll(wb.worksheets.map(w => w.name))
    //Worksheet name and index
    wb.eachSheet((worksheet, sheetId) => {
      logAll(sheetId, worksheet.name);
    })
    ctx = await browser.newContext();
    page = await ctx.newPage();
  });

  test.afterAll(async ({ browser }) => {
    logAll('After Tests')
    logAll('----')
    logAll('TOTAL TIME:', TOTAL_TIMER.end())
    logAll('TOTAL ACTIONS:', TOTAL_SUMMARY.actions)
    logAll('---------- xxxx ----------')
    logAll()
    browser.close;
  })

  test('generate code', async()=>{
    let codeSheet = ''

    wb.eachSheet((worksheet, sheetId) => {
      let codeTestCase = ''
      const sheets = parseInts(SHEET, wb)
      if(sheets.includes(sheetId)){
         const testCaseRows = getTestCases(worksheet,page,ctx)
         if(testCaseRows.size==0) logAll("ERROR: NO TEST CASE FOUND!" );
         for (let i = 0; i < testCaseRows.size; i++) {
              const index = Array.from(testCaseRows.keys())[i];
              const nextIndex = i==(testCaseRows.size-1)? index : Array.from(testCaseRows.keys())[i+1]-1;
              const value = testCaseRows.get(index);
              codeTestCase += (
                `
                test('${worksheet.name}  -- ${String(index).padStart(3, '0')}-${value}', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('${worksheet.name}'), page, ctx, testInfo, ${index}, ${nextIndex})
                })
                            
                `)
         }
    
         codeSheet += (`test.describe('Run Sheet ${worksheet.name}',()=>{
                  logAll()
                  logAll('Running sheet: ${worksheet.name} - ${worksheet.rowCount} row(s)')
                  logAll('---- ---- ---- ----')
                  SHEET_TIMER.start()
                  ${codeTestCase}
                  logSheetClose()
                  logAll() 
                })
                \n`)
                }              
    })
    const mainspec = syncReadFile('./main.spec.template.ts')
    let newmainspec = mainspec.replace('/*{{code}}*/',codeSheet)
    syncWriteFile('./main.spec.runEachTest.ts',newmainspec)
    logAll('main.spec.runEachTest.ts file generated')
  })
})


