import { test, expect, Frame, Page, Locator, FrameLocator } from '@playwright/test'
import { Workbook, Worksheet } from 'exceljs'
import 'dotenv/config'

const MAX_EMPTIES = 3

function rexss(text: string) { return new RegExp('.*' + text + '.*') }

async function runSheet(sheet: Worksheet, page: Page) {
  let empties = 0
  console.log('sheet row count:', sheet.rowCount)
  console.log()
  
  const ctxStack: (Page | FrameLocator)[] = []
  let ctx: Page | FrameLocator = page

  end:
  for (let i = 2; i <= sheet.rowCount; i++) {
    const isHidden = sheet.getRow(i).hidden
    const locator = sheet.getRow(i).getCell(3)
    const action = sheet.getRow(i).getCell(4)
    const data = sheet.getRow(i).getCell(5)

    if (locator.value == null && action.value == null && data.value == null) {
      empties += 1
      if (empties >= MAX_EMPTIES) break
    } else {
      empties = 0
      console.log('-', i, locator.value, action.value, data.value)
    }

    if (action.isMerged || action.value == null || isHidden) {
      console.log('.')
    } else {
      const parts: string[] = action.value.toString().split(',')
      const a = parts[0].trim().toLowerCase()
      let tos = {} //Timeout in seconds
      if (parts.length == 2) {
        const secs: number = +parts[1].trim()
        tos = { timeout: secs * 1000 }
        console.log('\ttimeout:', secs, 'second(s)')
      }
      const l = (locator.value) ? locator.value.toString() : ''
      const loc: Locator = ctx.locator(l)
      const d = (data.value) ? data.value.toString() : ''
      try {
        switch (a) {
          case 'url': await page.goto(l); break
          case 'title': await expect(page).toHaveTitle(rexss(d), tos); break
          case 'title:exact': await expect(page).toHaveTitle(d, tos); break
          case 'attrib:href': await expect(loc).toHaveAttribute('href', rexss(d), tos); break
          case 'attrib:href:exact': await expect(loc).toHaveAttribute('href', d, tos); break
          case 'assert': await expect(loc).toHaveText(rexss(d), tos); break
          case 'assert:exact': await expect(loc).toHaveText(d, tos); break
          case 'exists': await expect(loc).not.toHaveCount(0, tos); break
          case 'exists:not': await expect(loc).toHaveCount(0, tos); break
          case 'keys': await loc.fill(d, tos); break
          // case 'dnd': await page.dragAndDrop(l, d, tos); break //TBD: Is it working?!
          case 'click': await loc.click(tos); break
          case 'click:text':
          case 'link:text': await ctx.locator('text=' + l, tos).click(tos); break
          case 'key': await loc.press(d, tos); break
          case 'keys:enter': await loc.press('Enter', tos); break
          case 'file': loc.setInputFiles(d); break
          case 'frame':
          case 'iframe':
            ctxStack.push(ctx)
            ctx = await ctx.frameLocator(l)
            break
          case 'frame:back':
          case 'iframe:back':
            ctx = ctxStack.pop()!
            break
          case 'script': console.log('\t=', await page.evaluate(d, tos)); break
          case 'noop': break
          case 'end': break end
          default: console.log('\t', "Warning: Unknown Action", a)
        }
      } catch (err) {
        console.log(i, "ERROR: ", err.name, err.message)
      }
    }
  }
}

function parseInts(str: string, wb: Workbook): number[] {
  if (str == 'all') {
    const N = wb.worksheets.length
    return [...Array(N).keys()].map(n => n + 1)
  }
  const sheets0: number[] = []
  const sheetparts = str.split(',')
  sheetparts?.forEach((s: any) => {
    if (!isNaN(s)) sheets0.push(+s)
    else {
      const ss = s.split('-')
      for (var i = +ss[0]; i <= +ss[1]; i++) {
        sheets0.push(i)
      }
    }
  })
  // console.log(sheets0)
  const sheets = [...new Set(sheets0)]
  // console.log(sheets)
  sheets.sort((a, b) => a - b)
  return sheets
}

test('check all', async ({ page }) => {

  console.log('FILE:', process.env.FILE)
  console.log('SHEET:', process.env.SHEET)

  const wb = new Workbook()
  await wb.xlsx.readFile(process.env.FILE!)

  const sheets = parseInts(process.env.SHEET!, wb)
  console.log(sheets)

  for (const sn of sheets) {
    const sheet = wb.getWorksheet(sn)
    console.log()
    console.log('Runnning sheet:', sn, sheet.name)
    console.log('---- ---- ---- ----')
    await runSheet(sheet, page)
  }

});

