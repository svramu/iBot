import { test } from '@playwright/test'
import { Workbook } from 'exceljs'
import { runSheet, runSheetById } from './actions'
import {
  ACTION, ACTION_FORMAT, COMMENT_FORMAT,
  DATA, FILE, humanNowDateTime, LOCATOR, PRINT_FORMAT,
  SHEET, TRACE, TRACE_FORMAT,
} from './consts'
import { logAll, logSheetClose, parseInts, SHEET_TIMER, TOTAL_SUMMARY, TOTAL_TIMER } from './lib'

test.describe('iBot Tests', async () => {

  const wb = new Workbook()

  test.beforeAll(async () => {
    logAll('Start tests');
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
  })
  
  test.afterAll(async () => {
    console.log('Finish tests');
    logAll()
    logAll('----')
    logAll('TOTAL TIME:', TOTAL_TIMER.end())
    logAll('TOTAL ACTIONS:', TOTAL_SUMMARY.actions)
    logAll('---------- xxxx ----------')
    logAll()
  });

  test('Init Tests', () => {
    logAll('Init Tests');
  });

  const sheets = parseInts(SHEET, wb)
  logAll(sheets)

  for (const sn of sheets) {
    SHEET_TIMER.start()
    //await runSheetById(wb, sn, page, context)
    test('Run Sheet '+sn, async ({ page, context }) => {
      await runSheetById(wb, sn, page, context);
    });
    logSheetClose()
    logAll()
  }
});

