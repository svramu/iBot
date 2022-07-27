import { test } from '@playwright/test'
import { Workbook } from 'exceljs'
import { runSheet } from './actions'
import {
  ACTION, ACTION_FORMAT, COMMENT_FORMAT,
  DATA, FILE, LOCATOR, PRINT_FORMAT,
  SHEET, TRACE, TRACE_FORMAT,
} from './consts'
import { logAll, parseInts } from './lib'

test('check all', async ({ page, context }) => {

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
  if (TRACE) logAll(wb.worksheets.map(w => w.name))

  const sheets = parseInts(SHEET, wb)
  logAll(sheets)

  for (const sn of sheets) {
    const sheet = wb.getWorksheet(sn) //ISSUE! sometimes.
    logAll()
    logAll('Runnning sheet:', sn, sheet.name, `- ${sheet.rowCount} row(s)`)
    logAll('---- ---- ---- ----')
    await runSheet(sheet, page, context)
  }

  logAll()
  logAll('---------- xxxx ----------')
  logAll()

})

