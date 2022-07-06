import { test } from '@playwright/test'
import { Workbook } from 'exceljs'
import * as consts from './consts'
import { runSheet } from './actions'
import { parseInts } from './lib'

test('check all', async ({ page }) => {

  console.log('FILE:', consts.FILE)
  console.log('SHEET:', consts.SHEET)

  console.log('LOCATOR:', consts.LOCATOR)
  console.log('ACTION:', consts.ACTION)
  console.log('DATA:', consts.DATA)
  console.log('ACTION_FORMAT:', consts.ACTION_FORMAT)
  console.log('PRINT_FORMAT:', consts.PRINT_FORMAT)
  console.log('COMMENT_FORMAT:', consts.COMMENT_FORMAT)

  console.log('TRACE_FORMAT:', consts.TRACE_FORMAT)
  console.log('DEBUG_TRACE:', consts.DEBUG_TRACE)

  const wb = new Workbook()
  await wb.xlsx.readFile(consts.FILE!)
  console.log('sheets: ', wb.worksheets.length)
  if (consts.DEBUG_TRACE) console.log(wb.worksheets.map(w => w.name))

  const sheets = parseInts(consts.SHEET, wb)
  console.log(sheets)

  for (const sn of sheets) {
    const sheet = wb.getWorksheet(sn) //ISSUE! sometimes.
    console.log()
    console.log('Runnning sheet:', sn, sheet.name, `${sheet.rowCount} row(s)`)
    console.log('---- ---- ---- ----')
    await runSheet(sheet, page)
  }

})

