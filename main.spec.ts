import { test, expect } from '@playwright/test'
import { Workbook } from 'exceljs'
import 'dotenv/config'

const MAX_EMPTIES = 3

function rexss(text: string) { return new RegExp('.*' + text + '.*') }

async function runSheet(sheet, page) {
  let empties = 0

  for (let i = 2; i < sheet.rowCount; i++) {
    const isHidden = sheet.getRow(i).hidden
    const action = sheet.getRow(i).getCell(4)
    const locator = sheet.getRow(i).getCell(3)
    const data = sheet.getRow(i).getCell(5)

    if (locator.value == null && action.value == null && data.value == null) {
      empties += 1
      if (empties >= MAX_EMPTIES) break
    } else {
      empties = 0
      console.log('-', i, locator.value, action.value, data.value)
    }

    if (action.isMerged || action.value == null || isHidden) {
      console.log()
    } else {
      const a = action.value.toString()
      const l = (locator.value) ? locator.value.toString() : ''
      const loc = page.locator(l)
      const d = (data.value) ? data.value.toString() : ''
      try {
        switch (a) {
          case 'url': await page.goto(l); break
          case 'title': await expect(page).toHaveTitle(rexss(d)); break
          case 'assert': await expect(loc).toHaveText(rexss(d)); break
          case 'exists': await expect(loc).not.toHaveCount(0); break
          case 'exists:not': await expect(loc).toHaveCount(0); break
          case 'keys': await loc.fill(d); break
          case 'dnd': await page.dragAndDrop(l, d); break //TBD: Is it working?!
          case 'click': await loc.click(); break
          case 'click:text':
          case 'link:text': await page.locator('text=' + l).click(); break
          case 'key': await loc.press(d); break
          case 'keys:enter': await await loc.press('Enter'); break
          // case 'dummy':
          //   await page.goto('http://the-internet.herokuapp.com/iframe')
          //   const textarea = await page.frameLocator('#mce_0_ifr').locator('#tinymce')
          //   await textarea.fill('Testersdock.com')
          //   await expect(textarea).toHaveText('Testersdock.com')
          //   break
          // case 'iframe': await page.frame[1]; break
          // case 'iframe:back': await lib.iframeBack(); break
          case 'script':
            const result = await page.evaluate(d)
            console.log(result)
            break
          default: console.log('\t', "Warning: Unknown Action", a)
        }
      } catch (err) {
        console.log(i, "ERROR: ", err.name, err.message)
      }
    }
  }
}

function parseInts(str) {
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

  const sheets = parseInts(process.env.SHEET)
  console.log(sheets)
  console.log('---- ---- ----')

  for (const sn of sheets) {
    const sheet = wb.getWorksheet(sn)
    console.log('Runnning sheet:', sn, sheet.name)
    console.log('---- ---- ----')
    await runSheet(sheet, page)
  }

});

