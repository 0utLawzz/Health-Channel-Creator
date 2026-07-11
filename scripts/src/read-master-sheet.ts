import ExcelJS from 'exceljs';
import path from 'path';

const file = path.resolve(import.meta.dirname, '../..', 'attached_assets/BioMinute-Episode-Master-Plan_1783643847514.xlsx');
const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile(file);
const worksheet = workbook.getWorksheet('Content_Master');
if (!worksheet) {
  console.error('Sheet Content_Master not found');
  process.exit(1);
}
const rows = worksheet.getRows(1, worksheet.rowCount) || [];
const headers = rows[0]?.values as string[];
console.log('Headers:');
console.log(headers);
console.log('\nEpisode row:');
const episodeNumber = Number(process.argv[2] || 2);
const ep2 = rows.find((r) => r.getCell(1).value === episodeNumber || r.getCell(1).value === String(episodeNumber));
console.log(ep2?.values);
if (!ep2) { console.error(`Episode ${episodeNumber} not found`); process.exit(1); }
