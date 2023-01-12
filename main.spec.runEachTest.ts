import { test, TestInfo } from '@playwright/test'
import { Workbook } from 'exceljs'
import { runSheet } from './actions'
import {
  ACTION, ACTION_FORMAT, COMMENT_FORMAT,
  DATA, FILE, humanNowDateTime, LOCATOR, PRINT_FORMAT,
  SHEET, TRACE, TRACE_FORMAT,
} from './consts'
import { logAll, logSheetClose, parseInts, SHEET_TIMER, TOTAL_SUMMARY, TOTAL_TIMER } from './lib'
let page;
let ctx;

test.describe('iBot Tests',()=>{
  const wb = new Workbook()

test.beforeAll(async ({browser}) => {
  logAll('Before iBot Tests...')
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
  //Init the context and page for all the test cases
  ctx = await browser.newContext();
  page = await ctx.newPage();
});

test.afterAll(async ({ browser }) => {
  logAll('After iBot Tests...')
  logAll('----')
  logAll('TOTAL TIME:', TOTAL_TIMER.end())
  logAll('TOTAL ACTIONS:', TOTAL_SUMMARY.actions)
  logAll('---------- xxxx ----------')
  logAll()
  browser.close;
})
//Placeholder for the generated code 
test.describe('Run Sheet basics',()=>{
                  logAll()
                  logAll('Running sheet: basics - 37 row(s)')
                  logAll('---- ---- ---- ----')
                  SHEET_TIMER.start()
                  
                test('basics  => 003-url', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 3, 3)
                })
                            
                
                test('basics  => 004-title', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 4, 4)
                })
                            
                
                test('basics  => 005-title:exact', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 5, 5)
                })
                            
                
                test('basics  => 006-assert', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 6, 6)
                })
                            
                
                test('basics  => 007-assert:exact', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 7, 7)
                })
                            
                
                test('basics  => 008-assert', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 8, 8)
                })
                            
                
                test('basics  => 009-assert:exact', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 9, 9)
                })
                            
                
                test('basics  => 010-assert:exact', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 10, 10)
                })
                            
                
                test('basics  => 011-click', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 11, 11)
                })
                            
                
                test('basics  => 012-print', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 12, 13)
                })
                            
                
                test('basics  => 014-assert', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 14, 14)
                })
                            
                
                test('basics  => 015-assert', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 15, 15)
                })
                            
                
                test('basics  => 016-exists:not', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 16, 16)
                })
                            
                
                test('basics  => 017-click', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 17, 17)
                })
                            
                
                test('basics  => 018-assert', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 18, 18)
                })
                            
                
                test('basics  => 019-click', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 19, 19)
                })
                            
                
                test('basics  => 020-exists:not', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 20, 20)
                })
                            
                
                test('basics  => 021-print', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 21, 22)
                })
                            
                
                test('basics  => 023-url', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 23, 23)
                })
                            
                
                test('basics  => 024-screenshot', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 24, 24)
                })
                            
                
                test('basics  => 025-title', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 25, 25)
                })
                            
                
                test('basics  => 026-keys', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 26, 26)
                })
                            
                
                test('basics  => 027-keys', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 27, 27)
                })
                            
                
                test('basics  => 028-assert:value:exact', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 28, 28)
                })
                            
                
                test('basics  => 029-assert:value', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 29, 29)
                })
                            
                
                test('basics  => 030-sleep', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 30, 30)
                })
                            
                
                  logSheetClose()
                  logAll() 
                })
                
test.describe('Run Sheet if_endif',()=>{
                  logAll()
                  logAll('Running sheet: if_endif - 45 row(s)')
                  logAll('---- ---- ---- ----')
                  SHEET_TIMER.start()
                  
                test('basics  => 003-url', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 3, 3)
                })
                            
                
                test('basics  => 004-title', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 4, 4)
                })
                            
                
                test('basics  => 005-title:exact', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 5, 5)
                })
                            
                
                test('basics  => 006-assert', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 6, 6)
                })
                            
                
                test('basics  => 007-assert:exact', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 7, 7)
                })
                            
                
                test('basics  => 008-assert', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 8, 8)
                })
                            
                
                test('basics  => 009-assert:exact', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 9, 9)
                })
                            
                
                test('basics  => 010-assert:exact', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 10, 10)
                })
                            
                
                test('basics  => 011-click', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 11, 11)
                })
                            
                
                test('basics  => 012-print', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 12, 13)
                })
                            
                
                test('basics  => 014-assert', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 14, 14)
                })
                            
                
                test('basics  => 015-assert', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 15, 15)
                })
                            
                
                test('basics  => 016-exists:not', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 16, 16)
                })
                            
                
                test('basics  => 017-click', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 17, 17)
                })
                            
                
                test('basics  => 018-assert', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 18, 18)
                })
                            
                
                test('basics  => 019-click', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 19, 19)
                })
                            
                
                test('basics  => 020-exists:not', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 20, 20)
                })
                            
                
                test('basics  => 021-print', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 21, 22)
                })
                            
                
                test('basics  => 023-url', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 23, 23)
                })
                            
                
                test('basics  => 024-screenshot', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 24, 24)
                })
                            
                
                test('basics  => 025-title', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 25, 25)
                })
                            
                
                test('basics  => 026-keys', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 26, 26)
                })
                            
                
                test('basics  => 027-keys', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 27, 27)
                })
                            
                
                test('basics  => 028-assert:value:exact', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 28, 28)
                })
                            
                
                test('basics  => 029-assert:value', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 29, 29)
                })
                            
                
                test('basics  => 030-sleep', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('basics'), page, ctx, testInfo, 30, 30)
                })
                            
                
                test('if_endif  => 004-url', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 4, 4)
                })
                            
                
                test('if_endif  => 005-title', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 5, 5)
                })
                            
                
                test('if_endif  => 006-assert', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 6, 6)
                })
                            
                
                test('if_endif  => 007-if', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 7, 9)
                })
                            
                
                test('if_endif  => 010-if', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 10, 12)
                })
                            
                
                test('if_endif  => 013-print', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 13, 16)
                })
                            
                
                test('if_endif  => 017-url', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 17, 17)
                })
                            
                
                test('if_endif  => 018-title', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 18, 18)
                })
                            
                
                test('if_endif  => 019-click', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 19, 19)
                })
                            
                
                test('if_endif  => 020-assert', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 20, 20)
                })
                            
                
                test('if_endif  => 021-if', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 21, 23)
                })
                            
                
                test('if_endif  => 024-if', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 24, 28)
                })
                            
                
                test('if_endif  => 029-print', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 29, 29)
                })
                            
                
                test('if_endif  => 030-print', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 30, 32)
                })
                            
                
                test('if_endif  => 033-url', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 33, 33)
                })
                            
                
                test('if_endif  => 034-title', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 34, 34)
                })
                            
                
                test('if_endif  => 035-assert', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 35, 35)
                })
                            
                
                test('if_endif  => 036-if', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 36, 38)
                })
                            
                
                test('if_endif  => 039-if', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 39, 43)
                })
                            
                
                test('if_endif  => 044-print', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 44, 44)
                })
                            
                
                test('if_endif  => 045-print', async({}, testInfo)=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx, testInfo, 45, 45)
                })
                            
                
                  logSheetClose()
                  logAll() 
                })
                

})
