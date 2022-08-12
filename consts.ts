import 'dotenv/config'
import Handlebars from 'handlebars'
import moment from 'moment'
import * as fs from 'fs'


export const MAX_EMPTIES = 10

export const LOG_RESET = '\x1b[0m'
export const LOG_BRIGHT = '\x1b[1m'
export const LOG_DIM = '\x1b[2m'
export const LOG_RED = '\x1b[31m'

export const FILE = process.env.FILE
// SHEET = 1, 6, 6 - 9, 5 # or 'all' - sample format
export const SHEET = (process.env.SHEET ?? 'all')

export const ACTION_FORMAT = process.env.ACTION_FORMAT ?? ""
export const ACTION_TEMPLATE = Handlebars.compile(ACTION_FORMAT);
export const PRINT_FORMAT = process.env.PRINT_FORMAT ?? "" // {{data}}
export const PRINT_TEMPLATE = Handlebars.compile(PRINT_FORMAT);
export const COMMENT_FORMAT = process.env.COMMENT_FORMAT ?? ""
export const COMMENT_TEMPLATE = Handlebars.compile(COMMENT_FORMAT)

export const TRACE_FORMAT = process.env.TRACE_FORMAT ?? ""
export const TRACE_TEMPLATE = Handlebars.compile(TRACE_FORMAT)
export const TRACE = !!JSON.parse(process.env.DEBUG_TRACE || 'false')
export const SKIP_EMPTIES = !!JSON.parse(process.env.SKIP_EMPTIES || 'false')

export const LOCATOR = +(process.env.LOCATOR ?? 3)
export const ACTION = +(process.env.ACTION ?? 4)
export const DATA = +(process.env.DATA ?? 5)

export const OUTPUT_LOG = 'output.log'
fs.writeFileSync(OUTPUT_LOG, '', { encoding: "utf8", flag: "w" })
// recreate once, when started.

// -----------------------------------------------------------------------------

export function humanNowDateTime() {
  return moment().format('LLLL')
}

export function envget(key: string, valifnull: string = ""): string {
  return process.env[key] ?? valifnull
}

// -----------------------------------------------------------------------------

// standalone test: 'ts-node consts.ts' 

// -----------------------------------------------------------------------------

// console.log(envget("MYVAR"))
// console.log(envget("MYVARO", 'nope!'))