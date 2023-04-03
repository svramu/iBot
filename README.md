**iBot 2.14.0**<br>
*2023-04-03 Monday*<br>

Prerequisites:
--------------
Install [nodejs](https://nodejs.org/en/download/) 16+ (LTS)


Install:
-------
```
npm install
npx playwright install
```

Configure:
----------
See the `.env` file

Run:
---
```
npx playwright test
```

Release Notes:
--------------

**2.14.0** (3rd April 2023, Monday)<br>
Three new locators matching codegen - beta. 

1. `!<role>|<name>|<true>` locator to match codgen getByRole
2. `!!<input>` locator to match codgen getByPlaceholder
3. `!!!<text>` locator to match codgen getByText
4. `reload` action to reload the page.


**2.13.0** (29 September 2022, Thursday)<br>
assert value and text. clarify non-regex escape. 

1. `assert:value` and `assert:value:exact` actions, for input tags. Sample: `basics` sheet
2. Clarification: for assert not-exact, use `\` back slash escape for regex chars like *,.,? etc.


**2.12.0** (28 September 2022, Wednesday)<br>
`files` action, and others. First code contribution!

1. `files` action, for non-input multiple files upload. No sample sheet!
2. Show worksheets with index.
3. Full error.


**2.11.0** (12 August 2022, Friday)<br>
`{{var}}` takes value from `.env` file if not in local.

1. `.env` file key-values can be used as secrets or global variables.
(for now, only the col spec is useful for running, but optional)
(see `var_set` tab in the sample-tests.xlsx)


**2.10.0** (12 August 2022, Friday)<br>
`var` action and fresh `output.log` on every run.

1. `var` action stores the locator's text in the variable name given in the data column.
2. Now, this var name can be used as `{{var}}` in locator or data column.
3. You can also set the var directly as `var:set` with the locator column as value.
4. All this is within the same sheet. 


**2.9.0** (27 July 2022, Wdnesday)<br>
Action and Sheet timings with total summary.


**2.8.0** (27 July 2022, Wdnesday)<br>
Logs same, both in console and to a file.
(Stop tracking output.log in git)


**2.7.0** (27 July 2022, Wdnesday)<br>
Tab catch, go in and out recursively.

1. `click:tab` and `tab:back` actions for catching, going in and out of tabs recursively.
(Test case in the sheet `tab`)


**2.6.0** (18 July 2022, Monday)<br>
Select single or multiple options.

1. `select` action for select box with locator and the options (comma separated, if many) to locate, as data.


**2.5.1** (06 July 2022, Wednesday)<br>
if with negation. endif events.

1. `if !<event>` will start the block below it if the event has NOT happened.
2. `endif <event>,<event>...` resets the `if`, and removes the listed events, so that it can be reused.
3. obeys `TRACE`.


**2.5.0** (06 July 2022, Wednesday)<br>
Action: if endif works!

1. `<action>?<event>` will store the `<event>` IFF the action FAILS.
2. `if <event>` will start the block below it if the event has happened.
3. `endif` resets the if block. You can nest the if blocks!


**2.4.1** (29 June 2022, Wednesday)<br>
Pause works in --headed mode.

1. `pause` works in `--headed` mode.


**2.4.0** (29 June 2022, Wednesday)<br>
Console output revamp.

1. `print` print what is needed with the `PRINT_FORMAT` defined in the `.env`
2. `COMMAND_FORMAT` controls how a command row is displayed.
3. `COMMENT_FORMAT` controls how a NON-command row is displayed.
5. `DEBUG_TRACE` old behaviour for action, locator and data display.
4. Growing code reorganized into multiple files.
5. Fresh `npm install` required.


**2.3.0** (23 June 2022)<br>
Wait for networkidle, implicit and explicit.

New actions:

1. `wait` *"consider navigation to be finished when there are no more than 0 network connections for at least 500 ms."* &nbsp;[ref](https://www.checklyhq.com/docs/browser-checks/timeouts/). (`sleep` is deprecated!)
2. `wait:all` experimental for odd cases. 
3. `show` to debug text content, and `show:value` for *"input.value for the selected \<input> or \<textarea> or \<select> element."* &nbsp;[ref](https://playwright.dev/docs/api/class-elementhandle#element-handle-input-value)


**2.2.2** (22 June 2022)<br>
Quick regression fix in click.


**2.2.1** (22 June 2022)<br>
Action dblclick and sleep. Logs Colored.

Action `dblclick` and `sleep`.
Colors in log output.


**2.2.0** (21 June 2022)<br>
:exact, attrib:href, file, iframe:back. Latest

Many new Actions.

1. `attrib:href` will match href in a tag.
2. `:exact` suffix for `assert`, `attrib:href` and `title` will match exactly.
3. file will enter text to file input.
4. iframe will `iframe:back` will enter and leave a frame. You can use it recursively.
5. `end` will end the sheet
6. `all` allowed in `.env` file for SHEET.
7. `<action>,<timeout>` in secs is allowed for most actions.

Each action is tested in a separate sheet.


**2.1.0** (20 June 2022)<br>
Action specific timeouts. 


**2.0.0** (17 June 2022)<br>
First Release with PlayWright. 
