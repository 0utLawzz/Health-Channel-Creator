import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(path.join(__dirname, '../attached_assets/BioMinute-Master-Workbook-3_1784865612938.xlsx'));

console.log('\n=== PRODUCTION (ep 51-65) ===');
const prod = wb.getWorksheet('Production');
prod?.eachRow((row, rn) => {
  const ep = Number(row.getCell(1).value);
  if (ep >= 51 && ep <= 65) {
    console.log(`EP${ep} | title: ${row.getCell(2).value} | season: ${row.getCell(3).value} | status: ${row.getCell(4).value}`);
    console.log(`  voScript: ${String(row.getCell(7).value ?? '').slice(0, 200)}`);
    console.log(`  visualDir: ${String(row.getCell(8).value ?? '').slice(0, 150)}`);
    console.log(`  citation: ${String(row.getCell(9).value ?? '').slice(0, 150)}`);
  }
});

console.log('\n=== SOCIAL (ep 51-65) ===');
const social = wb.getWorksheet('Social');
social?.eachRow((row, rn) => {
  const ep = Number(row.getCell(1).value);
  if (ep >= 51 && ep <= 65) {
    console.log(`EP${ep} | ytTitle: ${row.getCell(3).value}`);
    console.log(`  hashtags: ${String(row.getCell(4).value ?? '').split('\n').pop()}`);
    console.log(`  cta: ${row.getCell(5).value}`);
  }
});

console.log('\n=== SCHEDULE (all rows) ===');
const sched = wb.getWorksheet('Schedule');
sched?.eachRow((row, rn) => {
  if (rn <= 4) return;
  const date = row.getCell(2).value;
  const epCell = String(row.getCell(4).value ?? '');
  const match = epCell.match(/Ep\s*(\d+)/i);
  if (match && Number(match[1]) >= 50) {
    console.log(`Row ${rn}: date=${date} | ep=${match[1]} | cell4=${epCell.slice(0, 80)}`);
  }
});
