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
/*{{code}}*/
})
