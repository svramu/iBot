import { test } from '@playwright/test'
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
  logAll('***************Before iBot Tests...')
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
  // logAll('sheets: ', wb.worksheets.length)
  // //if (TRACE) logAll(wb.worksheets.map(w => w.name))
  // //Worksheet name and index
  // wb.eachSheet((worksheet, sheetId) => {
  //   logAll(sheetId, worksheet.name);
  // })
  ctx = await browser.newContext();
  page = await ctx.newPage();
});

test.afterAll(async ({ browser }) => {
  logAll('*****************After iBot Tests...')
  logAll('----')
  logAll('TOTAL TIME:', TOTAL_TIMER.end())
  logAll('TOTAL ACTIONS:', TOTAL_SUMMARY.actions)
  logAll('---------- xxxx ----------')
  logAll()
  browser.close;
})
//SHEET_TIMER.start()
test.describe('Run Sheet if_endif',()=>{
                  logAll()
                  logAll('Running sheet: if_endif - 45 row(s)')
                  logAll('---- ---- ---- ----')
                  SHEET_TIMER.start()
                  
                  // test('Running sheet--if_endif--', async()=>{
                  //   await runSheet(wb.getWorksheet('if_endif'), page, ctx)
                  // })
                  
                  
                test('if_endif  => url-4', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,4,4)
                })
                            
                
                test('if_endif  => title-5', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,5,5)
                })
                            
                
                test('if_endif  => assert-6', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,6,6)
                })
                            
                
                test('if_endif  => if-7', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,7,9)
                })
                            
                
                test('if_endif  => if-10', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,10,12)
                })
                            
                
                test('if_endif  => print-13', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,13,16)
                })
                            
                
                test('if_endif  => url-17', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,17,17)
                })
                            
                
                test('if_endif  => title-18', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,18,18)
                })
                            
                
                test('if_endif  => click-19', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,19,19)
                })
                            
                
                test('if_endif  => assert-20', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,20,20)
                })
                            
                
                test('if_endif  => if-21', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,21,23)
                })
                            
                
                test('if_endif  => if-24', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,24,28)
                })
                            
                
                test('if_endif  => print-29', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,29,29)
                })
                            
                
                test('if_endif  => print-30', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,30,32)
                })
                            
                
                test('if_endif  => url-33', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,33,33)
                })
                            
                
                test('if_endif  => title-34', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,34,34)
                })
                            
                
                test('if_endif  => assert-35', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,35,35)
                })
                            
                
                test('if_endif  => if-36', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,36,38)
                })
                            
                
                test('if_endif  => if-39', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,39,43)
                })
                            
                
                test('if_endif  => print-44', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,44,44)
                })
                            
                
                test('if_endif  => print-45', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,45,NaN)
                })
                            
                
                test('if_endif  => undefined-undefined', async()=>{
                  await runSheet(wb.getWorksheet('if_endif'), page, ctx,undefined,NaN)
                })
                            
                
                  logSheetClose()
                  logAll() 
                })
                

//logSheetClose()
})
