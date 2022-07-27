import { test } from '@playwright/test'
import { Workbook } from 'exceljs'
import { runSheet } from './actions'
import {
  ACTION, ACTION_FORMAT, COMMENT_FORMAT,
  DATA, FILE, LOCATOR, PRINT_FORMAT,
  SHEET, TRACE, TRACE_FORMAT,
} from './consts'
import { parseInts } from './lib'

test('check all', async ({ page, context }) => {

  console.log('FILE:', FILE)
  console.log('SHEET:', SHEET)

  console.log('LOCATOR:', LOCATOR)
  console.log('ACTION:', ACTION)
  console.log('DATA:', DATA)
  console.log('ACTION_FORMAT:', ACTION_FORMAT)
  console.log('PRINT_FORMAT:', PRINT_FORMAT)
  console.log('COMMENT_FORMAT:', COMMENT_FORMAT)

  console.log('TRACE_FORMAT:', TRACE_FORMAT)
  console.log('DEBUG_TRACE:', TRACE)

  const wb = new Workbook()
  await wb.xlsx.readFile(FILE!)
  console.log('sheets: ', wb.worksheets.length)
  if (TRACE) console.log(wb.worksheets.map(w => w.name))

  const sheets = parseInts(SHEET, wb)
  console.log(sheets)

  for (const sn of sheets) {
    const sheet = wb.getWorksheet(sn) //ISSUE! sometimes.
    console.log()
    console.log('Runnning sheet:', sn, sheet.name, `${sheet.rowCount} row(s)`)
    console.log('---- ---- ---- ----')
    await runSheet(sheet, page, context)
  }

})

