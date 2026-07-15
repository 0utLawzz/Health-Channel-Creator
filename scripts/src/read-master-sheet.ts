import ExcelJS from 'exceljs';
import path from 'path';

const file = path.resolve(import.meta.dirname, '../..', 'attached_assets/BioMinute-Episode-Master-Plan_1783893698840.xlsx');
const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile(file);
const worksheet = workbook.getWorksheet('Episode Master Plan');
if (!worksheet) {
  console.error('Sheet Episode Master Plan not found');
  process.exit(1);
}
const rows = worksheet.getRows(1, worksheet.rowCount) || [];
// Row 1 = warning banner, row 2 = header, data starts at row 3.
const headers = rows[1]?.values as string[];
console.log('Headers:');
console.log(headers);
console.log('\nEpisode row:');
const episodeNumber = Number(process.argv[2] || 2);
const ep = rows.slice(2).find((r) => {
  const cellValue = r.getCell(1).value;
  return cellValue === episodeNumber || cellValue === String(episodeNumber);
});
console.log(ep?.values);
if (!ep) { console.error(`Episode ${episodeNumber} not found`); process.exit(1); }
