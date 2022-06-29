import { test, expect, Frame, Page, Locator, FrameLocator } from '@playwright/test'
import { Workbook, Worksheet } from 'exceljs'
import * as consts from './consts'
import { runSheet } from './actions'
import { parseInts } from './lib'

test('check all', async ({ page }) => {

  console.log('FILE:', consts.FILE)
  console.log('SHEET:', consts.SHEET)

  console.log('LOCATOR:', consts.LOCATOR)
  console.log('ACTION:', consts.ACTION)
  console.log('DATA:', consts.DATA)
  console.log('COMMAND_FORMAT:', consts.COMMAND_FORMAT)
  console.log('PRINT_FORMAT:', consts.PRINT_FORMAT)
  console.log('COMMENT_FORMAT:', consts.COMMENT_FORMAT)
  console.log('DEBUG_TRACE:', consts.DEBUG_TRACE)

  const wb = new Workbook()
  await wb.xlsx.readFile(consts.FILE!)

  const sheets = parseInts(consts.SHEET, wb)
  console.log(sheets)

  for (const sn of sheets) {
    const sheet = wb.getWorksheet(sn) //ISSUE! sometimes.
    // const sheet = wb.worksheets[sn]
    console.log()
    console.log('Runnning sheet:', sn, sheet.name)
    console.log('---- ---- ---- ----')
    await runSheet(sheet, page)
  }

});

