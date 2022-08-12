import { TRACE } from "./consts"
import { logAll, removeItemOnce } from "./lib"

export class IFmgr {
  private readonly _events: string[] = []
  private readonly _ifstack: string[] = []
  private _ok: boolean = true

  handleEvent(event: string, lineno: number) {
    this._events.push(event)
    if (TRACE)
      logAll(lineno, 'event:: ', this._events, event)

  }
  handleIf(cond: string, lineno: number) {
    // Handling just boolean-not expression now, rest can wait. 
    const not = cond.startsWith('!')
    const event = not ? cond.slice(1) : cond
    const condition = !not && this._events.includes(event) || not && !this._events.includes(event)
    if (condition) {
      this._ifstack.push(cond)
      this._ok = true
    } else {
      this._ok = false
    }
    if (TRACE)
      logAll(lineno, 'if:: ', this._events, event)
  }
  handleEndIf(events: string, lineno: number) {
    this._ifstack.pop()
    let events_clean: string[] = []
    if (!!events) {
      events_clean = events.split(',').map(e => e.trim())
      events_clean.forEach(ev => removeItemOnce(this._events, ev))
    }

    this._ok = true
    if (TRACE)
      logAll(lineno, 'endif:: ', this._events, events_clean)
  }

  get ok() {
    return this._ok
  }
}

// -----------------------------------------------------------------------------

// standalone test: 'ts-node ifmgr.ts' 
// if (require.main !== module) process.exit()

// const ifmgr = new IFmgr()

// ifmgr.handleEvent('miss', 10)
// ifmgr.handleIf('hiss', 20)
// ifmgr.ok
// ifmgr.handleIf('miss', 30)
// ifmgr.ok
// ifmgr.handleEndIf("miss", 40)
