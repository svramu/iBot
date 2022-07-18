import { expect, Page, Locator, FrameLocator } from '@playwright/test'
import { Worksheet } from 'exceljs'
import {
  nullempty, printActionRow, printCommentRow, rexss, warn
} from './lib'
import { IFmgr } from './ifmgr'
import {
  ACTION, DATA, LOCATOR, MAX_EMPTIES, PRINT_TEMPLATE, TRACE
} from './consts'


export async function runSheet(sheet: Worksheet, page: Page) {
  let empties = 0

  const wait = async () => await page.waitForLoadState('networkidle')

  const ctxStack: (Page | FrameLocator)[] = []
  let ctx: Page | FrameLocator = page

  const ifmgr = new IFmgr()

  end:
  for (let i = 2; i <= sheet.rowCount; i++) {
    const row = sheet.getRow(i)
    const cells: string[] = [''] // NOTE: to allow 1 based cell count.
    for (let i = 1; i < 10; i++) { // NOTE: only 10 cells considered.
      cells.push(nullempty(row.getCell(i).value))
    }

    const isHidden = row.hidden
    const action = row.getCell(ACTION)
    const locator = row.getCell(LOCATOR)
    const data = row.getCell(DATA)

    if (locator.value == null && action.value == null && data.value == null) {
      empties += 1
      if (empties >= MAX_EMPTIES) break
    } else {
      empties = 0
      printActionRow(i, cells)
    }

    if (action.isMerged || action.value == null || isHidden) printCommentRow(i, cells)
    else {

      // General stuff: parse locator (l), action (a) and data (d) 
      const l = (locator.value) ? locator.value.toString() : ''
      const loc: Locator = ctx.locator(l)
      const d = (data.value) ? data.value.toString() : ''
      const raw_a = action.value.toString()

      // Note down NEGATIVE events, or events!
      const parts1: string[] = raw_a.split('?')
      const main_a = parts1[0].trim().toLowerCase()
      const event = parts1.length > 1 ? parts1[1].trim().toLowerCase() : null
      // if (event) console.log('found event!', event)

      // Comma seperator in action for Timeout in seconds
      const parts: string[] = main_a.split(',')
      const a = parts[0].trim().toLowerCase()
      let tos = {}
      let secs = 0
      if (parts.length == 2) {
        secs = +parts[1].trim()
        tos = { timeout: secs * 1000 }
      }

      // Handle special structural action 'if' 
      if (!ifmgr.ok) { // If not meeting ALL the previous conditions, skip the line
        if (TRACE) console.log(i, '-- skipped!', a)
        if (a == 'endif') ifmgr.handleEndIf('', i)  // endif always resets one level.
        continue // skip line
      }

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
          case 'dblclick': await loc.dblclick(tos); break
          case 'click:text':
          case 'link:text': await ctx.locator('text=' + l, tos).click(tos); break
          case 'dblclick:text': await ctx.locator('text=' + l, tos).dblclick(tos); break
          case 'key': await loc.press(d, tos); break
          case 'keys:enter': await loc.press('Enter', tos); break
          case 'select': await page.selectOption(l, d.split(',')); break
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
          case 'sleep':
            // warn("'sleep' can make flaky tests. Try", 'wait')
            await page.waitForTimeout(secs * 1000)
            break
          case 'noop': break
          case 'end': break end
          case 'show': await wait(); console.log(await loc.textContent()); break
          case 'show:value': await wait(); console.log(await loc.inputValue()); break
          case 'wait': await wait(); break
          case 'wait:all':
            await page.waitForLoadState('networkidle', tos)
            await page.waitForLoadState('load', tos)
            await page.waitForLoadState('domcontentloaded', tos)
            break
          case 'print': console.log(PRINT_TEMPLATE({ data: d })); break
          case 'pause':
            warn('works only in --headed mode', 'pause')
            await page.pause();
            break
          case 'if':
            ifmgr.handleIf(d, i)
            break
          case 'endif':
            ifmgr.handleEndIf(d, i) // All fine, just reset and proceed!
            break // 
          default:
            warn('Unknown Action', a)
        }
      } catch (err) {
        if (event) ifmgr.handleEvent(event, i)
        else console.log(i, "ERROR: ", err.message.split(/\r?\n/)[0])
      }
    }
  }
}
