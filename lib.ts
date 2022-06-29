import { Workbook } from 'exceljs'


export function rexss(text: string) { return new RegExp('.*' + text + '.*') }
export function nullempty(text: any): string { return text ? text : '' }

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

