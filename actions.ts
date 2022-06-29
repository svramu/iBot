import { expect, Page, Locator, FrameLocator } from '@playwright/test'
import { Worksheet } from 'exceljs'
import * as consts from './consts'
import { nullempty, rexss } from './lib'


export async function runSheet(sheet: Worksheet, page: Page) {
  let empties = 0
  console.log('sheet row count:', sheet.rowCount)
  console.log()

  const wait = async () => await page.waitForLoadState('networkidle')

  const ctxStack: (Page | FrameLocator)[] = []
  let ctx: Page | FrameLocator = page

  end:
  for (let i = 2; i <= sheet.rowCount; i++) {
    const row = sheet.getRow(i)
    const cells: string[] = [''] // NOTE: to allow 1 based cell count.
    for (let i = 1; i < 10; i++) { // NOTE: only 10 cells considered.
      cells.push(nullempty(row.getCell(i).value))
    }

    const isHidden = row.hidden
    const action = row.getCell(consts.ACTION)
    const locator = row.getCell(consts.LOCATOR)
    const data = row.getCell(consts.DATA)

    if (locator.value == null && action.value == null && data.value == null) {
      empties += 1
      if (empties >= consts.MAX_EMPTIES) break
    } else {
      empties = 0
      console.log(consts.COMMAND_TEMPLATE(cells))
      if (consts.DEBUG_TRACE != null && consts.DEBUG_TRACE == true)
        console.log('-', i, nullempty(action.value),
          nullempty(locator.value), nullempty(data.value))
    }

    if (action.isMerged || action.value == null || isHidden) {
      console.log(consts.COMMENT_TEMPLATE(cells))
    } else {
      const parts: string[] = action.value.toString().split(',')
      const a = parts[0].trim().toLowerCase()
      let tos = {} //Timeout in seconds
      let secs = 0 //Timeout in seconds
      if (parts.length == 2) {
        secs = +parts[1].trim()
        tos = { timeout: secs * 1000 }
        // console.log('\ttimeout:', secs, 'second(s)')
      } const l = (locator.value) ? locator.value.toString() : ''
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
          case 'dblclick': await loc.dblclick(tos); break
          case 'click:text':
          case 'link:text': await ctx.locator('text=' + l, tos).click(tos); break
          case 'dblclick:text': await ctx.locator('text=' + l, tos).dblclick(tos); break
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
          case 'sleep':
            console.log(consts.LOG_RED, '\t', 'Warning: sleep can make flaky tests. Try',
              consts.LOG_BRIGHT, 'wait.', consts.LOG_RESET)
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
          case 'print': console.log(consts.PRINT_TEMPLATE({ data: d })); break
          case 'pause':
            console.log(consts.LOG_RED, consts.LOG_BRIGHT, 'pause', consts.LOG_RESET,
              consts.LOG_RED, 'works only in --headed mode.',
              consts.LOG_RESET)
            await page.pause();
            break
          default:
            console.log(consts.LOG_RED, '\t', 'Warning: Unknown Action', consts.LOG_BRIGHT, a, consts.LOG_RESET)
        }
      } catch (err) {
        console.log(i, "ERROR: ", err.name, err.message)
      }
    }
  }
}
