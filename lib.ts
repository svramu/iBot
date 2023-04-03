import { Workbook } from 'exceljs'
import {
  ACTION_TEMPLATE, COMMENT_TEMPLATE, TRACE,
  LOG_BRIGHT, LOG_RED, LOG_RESET,
  PRINT_TEMPLATE, SKIP_EMPTIES, TRACE_TEMPLATE, OUTPUT_LOG, envget,
} from './consts';
import * as fs from 'fs';
import moment from 'moment';
import { FrameLocator, Locator, Page } from '@playwright/test';

export function rexss(text: string) { return new RegExp('.*' + text + '.*') }
export function nullempty(text: any): string { return text ? text : '' }
export function peek(array: any[]) { return array[array.length - 1] }

export function removeItemOnce(arr: any[], value: any) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export function removeItemAll(arr: any[], value: any) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

// SHEET = 1, 6, 6 - 9, 5 # sample format
export function parseInts(str: string, wb: Workbook): number[] {
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
  // logAll(sheets0)
  const sheets = [...new Set(sheets0)]
  // logAll(sheets)
  sheets.sort((a, b) => a - b)
  return sheets
}

function logFile(...msgs: any[]) {
  const msg = msgs.join(' ') + '\n'
  fs.writeFileSync(OUTPUT_LOG, msg, { encoding: "utf8", flag: "a" });
}
function logConsole(msg?: any, ...msgs: any[]) {
  if (msg == null) console.log()
  else console.log(msg, ...msgs) // NOTE: Only place where console.log is used.
}
export function logAll(...msgs: any[]) {
  logConsole(...msgs)
  logFile(...msgs)
}

export function logWarn(msg: string, key: string = '') {
  logConsole(LOG_RED, '\tWarning: ', msg, ':',
    LOG_BRIGHT, key, LOG_RESET)
  logFile('\tWarning: ', msg, ' : ', key)
}

export function logPrint(msg: string) {
  logAll(PRINT_TEMPLATE({ data: msg }))
}

function printInternal(line: string) {
  const ok = !SKIP_EMPTIES || !!line.trim()
  if (!TRACE && ok) logAll(line, ACTION_TIMER.end())
}
export function logActionRow(row: number, cells: string[]) {
  TOTAL_SUMMARY.incAction()
  if (TRACE) logTraceRow(row, cells)
  else printInternal(ACTION_TEMPLATE(cells))
}
export function logCommentRow(row: number, cells: string[]) {
  printInternal(COMMENT_TEMPLATE(cells))
}

export function logTraceRow(row: number, cells: string[]) {
  const line = TRACE_TEMPLATE(cells)
  const ok = !SKIP_EMPTIES || !!line
  if (ok) logAll('-', row, line, ACTION_TIMER.end())
}

export function logSheetClose() {
  logAll('Sheet time:', SHEET_TIMER.end())
}

// -----------------------------------------------------------------------------

class GapTimer {
  private TIMER_START = 0

  start() {
    this.TIMER_START = Date.now()
  }

  end(): string {
    const elapsed = Date.now() - this.TIMER_START
    return GapTimer.humanizeDuration(elapsed)
  }

  static humanizeDuration(ms: number): string {
    let FACTOR = 1000
    const cms = '' + ms % FACTOR
    const s = Math.floor(ms / FACTOR)
    FACTOR = 60
    const cs = s % FACTOR
    const m = Math.floor(s / FACTOR)
    FACTOR = 60
    const cm = m % FACTOR
    const h = Math.floor(m / FACTOR)
    FACTOR = 24
    const ch = h % FACTOR
    const d = Math.floor(h / FACTOR)
    const scms = cms.padStart(3, '0')
    let out = ' = '
    if (d > 0) out += d + 'd-'
    if (ch > 0) out += ch + ':'
    if (cm > 0) out += cm + ':'
    out += cs + '.' + scms
    // out += ' [' + ms + ']'
    return out
  }
}

export const ACTION_TIMER = new GapTimer()
export const SHEET_TIMER = new GapTimer()
export const TOTAL_TIMER = new GapTimer()

// -----------------------------------------------------------------------------

class Summary {
  private ACTIONS_COUNT = 0
  private CHECKS_COUNT = 0

  incAction() { this.ACTIONS_COUNT++ }
  incCheck() { this.CHECKS_COUNT++ }
  reset() {
    this.ACTIONS_COUNT = 0
    this.CHECKS_COUNT = 0
  }

  get actions() { return this.ACTIONS_COUNT }
  get checks() { return this.CHECKS_COUNT }
}

export const TOTAL_SUMMARY = new Summary()

// -----------------------------------------------------------------------------

function getvar(vr: string, vars: { [vid: string]: string }) {
  let out = vars[vr] // NOTE: first try with local variables.
  if (out == null) out = envget(vr) // NOTE: Then from the .env file.
  return out
}

export function replaceVars(input: string, vars: { [vid: string]: string }) {
  const rx = /{{\s*([\w\.]+)\s*}}/g // mustache model {{var}}
  const out = input.replace(rx, (m, c) => getvar(c, vars))
  if (TRACE && input != out) console.log("-->", input, out)
  return out
}

export function locate(ctx: Page | FrameLocator, input: string): Locator {
  let loc!: Locator
  if (input.startsWith("!!!")) {
    const parts = input.substring(3).split("|")
    loc = ctx.getByText(parts[0] as any)
  } else if (input.startsWith("!!")) {
    const parts = input.substring(2).split("|")
    loc = ctx.getByPlaceholder(parts[0] as any)
  } else if (input.startsWith("!")) {
    const parts = input.substring(1).split("|")
    const role = parts[0] as any
    const name = parts[1]
    const exact = parts[2] === 'true'
    loc = ctx.getByRole(parts[0] as any, { name, exact })
  } else loc = ctx.locator(input)
  // console.log(input, " -- ", loc)
  return loc
}

// -----------------------------------------------------------------------------

// standalone test: 'ts-node lib.ts' 

// -----------------------------------------------------------------------------

// function test_replaceVars() {
//   const input = "bingo is {{myvar}} here, and even the {{myvar2}} knows!"
//   const predict = "bingo is 123 here, and even the 007 knows!"
//   const vars = { "myvar": "123", "myvar2": "007" }
//   const transed = replaceVars(input, vars)
//   console.assert(transed == predict, "test replaceVars - " + transed)
// }

// function test_replaceVars_none() {
//   const input = "bingo is here"
//   const predict = "bingo is here"
//   const vars = { "myvar": "123", "myvar2": "007" }
//   const transed = replaceVars(input, vars)
//   console.assert(transed == predict, "test replaceVars - " + transed)
// }

// test_replaceVars()
// test_replaceVars_none()

// -----------------------------------------------------------------------------

// logPrint("test local")
