export class IFmgr {
  private readonly _events: string[] = []
  private readonly _ifstack: string[] = []
  private _ok: boolean = true

  handleEvent(event: string, lineno: number) {
    this._events.push(event)
    console.log(lineno, 'event:: ', event, ',', 'events:', this._events)
  }
  handleIf(event: string, lineno: number) {
    if (!!event && this._events.includes(event)) {
      this._ifstack.push(event)
      this._ok = true
    } else {
      this._ok = false
    }
    console.log(lineno, 'if:: ', 'event:', event, ',', 'ok:', this._ok)
  }
  handleEndIf(lineno: number) {
    this._ifstack.pop()
    this._ok = true
    console.log(lineno, 'endif:: ', 'ok:', this._ok)
  }

  get ok() {
    return this._ok
  }
}

// -----------------------------------------------------------------------------

// if (require.main !== module) process.exit()

// const ifmgr = new IFmgr()

// ifmgr.handleEvent('miss')
// ifmgr.handleIf('hiss')
// ifmgr.ok
// ifmgr.handleIf('miss')
// ifmgr.ok
// ifmgr.handleEndIf()
