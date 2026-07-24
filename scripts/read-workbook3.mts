import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(path.join(__dirname, '../attached_assets/BioMinute-Master-Workbook-3_1784865612938.xlsx'));

wb.worksheets.forEach(ws => {
  console.log(`\n${'='.repeat(60)}\nSheet: ${ws.name} (${ws.rowCount} rows)\n${'='.repeat(60)}`);
  ws.eachRow((row, rn) => {
    const vals = row.values as unknown[];
    const nonEmpty = vals.some(v => v !== null && v !== undefined && v !== '');
    if (nonEmpty) console.log(`Row ${rn}:`, JSON.stringify(vals));
  });
});
