import { test, TestInfo } from '@playwright/test'
import { Workbook } from 'exceljs'
import { runSheet } from './actions'
import {
  ACTION, ACTION_FORMAT, COMMENT_FORMAT,
  DATA, FILE, humanNowDateTime, LOCATOR, PRINT_FORMAT,
  SHEET, TRACE, TRACE_FORMAT,
} from './consts'
import { logAll, logSheetClose, parseInts, SHEET_TIMER, TOTAL_SUMMARY, TOTAL_TIMER } from './lib'

test('check all', async ({ page, context }, testInfo) => {

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

  const wb = new Workbook()
  await wb.xlsx.readFile(FILE!)
  logAll('sheets: ', wb.worksheets.length)
  //if (TRACE) logAll(wb.worksheets.map(w => w.name))
  //Worksheet name and index
  wb.eachSheet((worksheet, sheetId) => {
    logAll(sheetId, worksheet.name);
  })

  const sheets = parseInts(SHEET, wb)
  logAll(sheets)

  for (const sn of sheets) {
    const sheet = wb.getWorksheet(sn) //ISSUE! sometimes.
    logAll()
    logAll('Running sheet:', sn, sheet.name, `- ${sheet.rowCount} row(s)`)
    logAll('---- ---- ---- ----')
    SHEET_TIMER.start()
    await runSheet(sheet, page, context, testInfo, 0, 0)
    logSheetClose()
    logAll()
  }

  logAll()
  logAll('----')
  logAll('TOTAL TIME:', TOTAL_TIMER.end())
  logAll('TOTAL ACTIONS:', TOTAL_SUMMARY.actions)
  logAll('---------- xxxx ----------')
  logAll()

})

