import {
  expect,
  Page,
  Locator,
  FrameLocator,
  BrowserContext,
  TestInfo,
} from "@playwright/test";
import { Worksheet } from "exceljs";
import {
  nullempty,
  logActionRow,
  logCommentRow,
  rexss,
  logWarn,
  logAll,
  ACTION_TIMER,
  replaceVars,
  logPrint,
} from "./lib";
import { IFmgr } from "./ifmgr";
import { ACTION, DATA, LOCATOR, MAX_EMPTIES, TRACE } from "./consts";

export function getTestCases(
  sheet: Worksheet,
  page: Page,
  context: BrowserContext
  ){
  let empties = 0;



  let boolIf = false;
  let testCases = new Map<number,string>();
  let testCase = ''
  const vars = {};

  end: for (let i = 2; i <= sheet.rowCount; i++) {

    ACTION_TIMER.start();

    const row = sheet.getRow(i);
    const cells: string[] = [""]; // NOTE: to allow 1 based cell count.
    for (let i = 1; i < 10; i++) {
      // NOTE: only 10 cells considered.
      cells.push(nullempty(row.getCell(i).value));
    }

    const isHidden = row.hidden;
    const action = row.getCell(ACTION);
    const locator = row.getCell(LOCATOR);
    const data = row.getCell(DATA);

    if (locator.value == null && action.value == null && data.value == null) {
      empties += 1;
      if (empties >= MAX_EMPTIES) break;
      continue
    } else {
      empties = 0;
    }

    if (action.isMerged || action.value == null || isHidden)
      logCommentRow(i, cells);
    else {
      // General stuff: parse locator (l), action (a) and data (d)
      const raw_l = locator.value ? locator.value.toString() : "";
      const l = replaceVars(raw_l, vars);

      const raw_d = data.value ? data.value.toString() : "";
      const d = replaceVars(raw_d, vars);

      const raw_a = action.value.toString();

      // Note down NEGATIVE events, or events!
      const parts1: string[] = raw_a.split("?");
      const main_a = parts1[0].trim().toLowerCase();
      const event = parts1.length > 1 ? parts1[1].trim().toLowerCase() : null;
      // if (event) logAll('found event!', event)

      // Comma separator in action for Timeout in seconds
      const parts: string[] = main_a.split(",");
      const a = parts[0].trim().toLowerCase();
      testCase = a;

      if ((boolIf) && (a == "endif")) {
        boolIf = false;
        continue;
      }
      if (boolIf) continue;
   

      try {
        switch (a) {
          case "url":  break;
          case "title": break;
            
          case "title:exact": break;
      
          case "attrib:href":break;
            
          case "attrib:href:exact":
            
            break;
          case "assert":  break;
          case "assert:value":
            
            break;
          case "assert:value:exact":
            
            break;
          case "assert:exact": break;
          case "exists":  break;
          case "exists:not": break;
          case "keys":  break;
          case 'dnd':  break;
          //TBD: Is it working?!
          case "click": break;
          case "dblclick": break;
          case "click:text":
          case "link:text":
            
            break;
          case "dblclick:text":
           
            break;

          case "click:tab":

            break;
          case "tab:back":  break;

          case "key": break;
          case "key:enter": break;
          case "select":  break;
          case "file":  break;

          //add multiple files from Browser Open Dialog
          case "files":
            break;
          //Take a ScreenShot
          case "screenshot": break; 
          case "frame":
          case "iframe":
           
            break;
          case "frame:back":
          case "iframe:back":  break;

          case "script":
            
            break;
          case "sleep":
            
            break;
          case "noop": break;
          case "end": break end;
          case "show":
            
            break;
          case "show:value":
           
            break;
          case "wait":
            
            break;
          case "wait:all":
           
            break;
          case "print":  break;
          case "pause":
           
            break;
          case "if": boolIf = true; break;
          case "endif": break;
          case "var":
            
            break;
          case "var:set":  break;
          default: logWarn("Unknown Action", a);
        }
      } catch (err) {
         logAll(i, "ERROR: ", err.message);
      }
      //logActionRow(i, cells);

    }
    testCases.set(i, testCase)
    //if(TRACE) logAll(i, cells);
  }
  return testCases;
}

export async function runSheet(
  sheet: Worksheet,
  page: Page,
  context: BrowserContext,
  startRow: number = 0,
  endRow: number = 0,
  testInfo: TestInfo
) {
  let empties = 0;

  const wait = async () => await page.waitForLoadState("networkidle");

  const popStack: Page[] = [];
  const ctxStack: (Page | FrameLocator)[] = [];
  let ctx: Page | FrameLocator = page;

  const ifmgr = new IFmgr();
  const vars = {};

  if (startRow==0) startRow = 2;
  if (endRow==0) startRow = sheet.rowCount;
  end: for (let i = startRow; i <= endRow; i++) {
    ACTION_TIMER.start();

    const row = sheet.getRow(i);
    const cells: string[] = [""]; // NOTE: to allow 1 based cell count.
    for (let i = 1; i < 10; i++) {
      // NOTE: only 10 cells considered.
      cells.push(nullempty(row.getCell(i).value));
    }

    const isHidden = row.hidden;
    const action = row.getCell(ACTION);
    const locator = row.getCell(LOCATOR);
    const data = row.getCell(DATA);

    if (locator.value == null && action.value == null && data.value == null) {
      empties += 1;
      if (empties >= MAX_EMPTIES) break;
    } else {
      empties = 0;
    }

    if (action.isMerged || action.value == null || isHidden)
      logCommentRow(i, cells);
    else {
      // General stuff: parse locator (l), action (a) and data (d)
      const raw_l = locator.value ? locator.value.toString() : "";
      const l = replaceVars(raw_l, vars);
      const loc: Locator = ctx.locator(l);

      const raw_d = data.value ? data.value.toString() : "";
      const d = replaceVars(raw_d, vars);

      const raw_a = action.value.toString();

      // Note down NEGATIVE events, or events!
      const parts1: string[] = raw_a.split("?");
      const main_a = parts1[0].trim().toLowerCase();
      const event = parts1.length > 1 ? parts1[1].trim().toLowerCase() : null;
      // if (event) logAll('found event!', event)

      // Comma separator in action for Timeout in seconds
      const parts: string[] = main_a.split(",");
      const a = parts[0].trim().toLowerCase();
      let tos = {};
      let secs = 0;
      if (parts.length == 2) {
        secs = +parts[1].trim();
        tos = { timeout: secs * 1000 };
      }

      // Handle special structural action 'if'
      if (!ifmgr.ok) {
        // If not meeting ALL the previous conditions, skip the line
        if (TRACE) logAll(i, "-- skipped!", a);
        if (a == "endif") ifmgr.handleEndIf("", i); // endif always resets one level.
        continue; // skip line
      }

      try {
        switch (a) {
          case "url": await page.goto(l); break;
          case "title":
            await expect(ctx as Page).toHaveTitle(rexss(d), tos);
            break;
          case "title:exact":
            await expect(ctx as Page).toHaveTitle(d, tos);
            break;
          case "attrib:href":
            await expect(loc).toHaveAttribute("href", rexss(d), tos);
            break;
          case "attrib:href:exact":
            await expect(loc).toHaveAttribute("href", d, tos);
            break;
          case "assert": await expect(loc).toHaveText(rexss(d), tos); break;
          case "assert:value":
            await expect(loc).toHaveValue(rexss(d), tos);
            break;
          case "assert:value:exact":
            await expect(loc).toHaveValue(d, tos);
            break;
          case "assert:exact": await expect(loc).toHaveText(d, tos); break;
          case "exists": await expect(loc).not.toHaveCount(0, tos); break;
          case "exists:not": await expect(loc).toHaveCount(0, tos); break;
          case "keys": await loc.fill(d, tos); break;
          case 'dnd': await page.dragAndDrop(l, d, tos); break 
          //TBD: Is it working?!
          case "click": await loc.click(tos); break;
          case "dblclick": await loc.dblclick(tos); break;
          case "click:text":
          case "link:text":
            await ctx.locator("text=" + l, tos).click(tos);
            break;
          case "dblclick:text":
            await ctx.locator("text=" + l, tos).dblclick(tos);
            break;

          case "click:tab":
            const [newPage] = await Promise.all([
              context.waitForEvent("page", { timeout: secs }),
              await loc.click(tos),
            ]);
            await newPage.waitForLoadState();
            popStack.push(ctx as Page);
            ctx = newPage;
            break;
          case "tab:back": ctx = popStack.pop()!; break;

          case "key": await loc.press(d, tos); break;
          case "key:enter": await loc.press("Enter", tos); break;
          case "select": await page.selectOption(l, d.split(",")); break;
          case "file": loc.setInputFiles(d); break;

          //add multiple files from Browser Open Dialog
          //bug fix for on page event changed to Promise
          case "files":
            logAll("fileChooser", d);
            const fileChooserPromise = page.waitForEvent('filechooser');
            await page.click(l, { force: true });
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(d.split(","));
            break;
          //Take a ScreenShot
          case "screenshot": 
          const screenshot = await page.screenshot({ fullPage: true }); 
            await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
            break; 
          case "frame":
          case "iframe":
            ctxStack.push(ctx);
            ctx = ctx.frameLocator(l);
            break;
          case "frame:back":
          case "iframe:back": ctx = ctxStack.pop()!; break;

          case "script":
            logAll("\t=", await page.evaluate(d, tos));
            break;
          case "sleep":
            // warn("'sleep' can make flaky tests. Try", 'wait')
            await page.waitForTimeout(secs * 1000);
            break;
          case "noop": break;
          case "end": break end;
          case "show":
            await wait();
            logAll(await loc.textContent());
            break;
          case "show:value":
            await wait();
            logAll(await loc.inputValue());
            break;
          case "wait":
            await wait();
            break;
          case "wait:all":
            await page.waitForLoadState("networkidle", tos);
            await page.waitForLoadState("load", tos);
            await page.waitForLoadState("domcontentloaded", tos);
            break;
          case "print": logPrint(d); break;
          case "pause":
            logWarn("works only in --headed mode", "pause");
            await page.pause();
            break;
          case "if": ifmgr.handleIf(d, i); break;
          // All fine, just reset and proceed!
          case "endif": ifmgr.handleEndIf(d, i); break;
          case "var":
            const val = await loc.textContent();
            vars[d] = val;
            break;
          case "var:set": vars[d] = l; break;
          default: logWarn("Unknown Action", a);
        }
      } catch (err) {
        if (event) ifmgr.handleEvent(event, i);
        else logAll(i, "ERROR: ", err.message);
      }
      logActionRow(i, cells);
    }
  }
}
