**e2erunner 2.2.1**<br>
*2022-06-22 Wednesday*<br>

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
