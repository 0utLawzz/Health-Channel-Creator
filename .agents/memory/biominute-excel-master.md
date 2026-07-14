---
name: BioMinute Excel master sheet
description: How to locate and parse the BioMinute episode master spreadsheet so future episodes don't break on the wrong sheet name.
---

The episode master spreadsheet (e.g., `attached_assets/BioMinute-Episode-Master-Plan_*.xlsx`) is the source of truth for scripts, visual direction, citations, CTAs, hashtags, and thumbnail direction.

**Rule:** the workbook sheet is named **"Episode Master Plan"**, not "Content_Master".

**Why:** the README, production log, and older references call it `Content_Master`, but the actual `.xlsx` file uses `Episode Master Plan` as the sheet name. Reading the wrong sheet name will fail silently or return empty data.

**How to apply:** when parsing the master plan with any tool (Python, Node, xlsx, etc.), always target the sheet named `Episode Master Plan`. If the sheet name changes in a future file, fall back to the first worksheet and report the discrepancy rather than assuming `Content_Master`.
