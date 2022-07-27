import { Workbook } from 'exceljs'
import {
  ACTION_TEMPLATE, COMMENT_TEMPLATE, TRACE,
  LOG_BRIGHT, LOG_RED, LOG_RESET,
  PRINT_TEMPLATE, SKIP_EMPTIES, TRACE_TEMPLATE, OUTPUT_LOG,
} from './consts';
import * as fs from 'fs';

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
  if (!TRACE && ok) logAll(line)
}
export function logActionRow(row: number, cells: string[]) {
  if (TRACE) logTraceRow(row, cells)
  else printInternal(ACTION_TEMPLATE(cells))
}
export function logCommentRow(row: number, cells: string[]) {
  printInternal(COMMENT_TEMPLATE(cells))
}

export function logTraceRow(row: number, cells: string[]) {
  const line = TRACE_TEMPLATE(cells)
  const ok = !SKIP_EMPTIES || !!line
  if (ok) logAll('-', row, line)
}