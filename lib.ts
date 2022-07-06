import { Workbook } from 'exceljs'
import {
  ACTION_TEMPLATE, COMMENT_TEMPLATE, TRACE,
  LOG_BRIGHT, LOG_RED, LOG_RESET,
  PRINT_TEMPLATE, SKIP_EMPTIES, TRACE_TEMPLATE,
} from './consts';


export function rexss(text: string) { return new RegExp('.*' + text + '.*') }
export function nullempty(text: any): string { return text ? text : '' }

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
  // console.log(sheets0)
  const sheets = [...new Set(sheets0)]
  // console.log(sheets)
  sheets.sort((a, b) => a - b)
  return sheets
}

export function warn(msg: string, key: string = '') {
  console.log(LOG_RED, '\tWarning: ', msg, ':',
    LOG_BRIGHT, key, LOG_RESET)
}

export function printPrint(msg: string) {
  console.log(PRINT_TEMPLATE({ data: msg }))
}

function printInternal(line: string) {
  const ok = !SKIP_EMPTIES || !!line.trim()
  if (!TRACE && ok) console.log(line)
}
export function printActionRow(row: number, cells: string[]) {
  if (TRACE) printTraceRow(row, cells)
  else printInternal(ACTION_TEMPLATE(cells))
}
export function printCommentRow(row: number, cells: string[]) {
  printInternal(COMMENT_TEMPLATE(cells))
}

export function printTraceRow(row: number, cells: string[]) {
  const line = TRACE_TEMPLATE(cells)
  const ok = !SKIP_EMPTIES || !!line
  if (ok) console.log('-', row, line)
}