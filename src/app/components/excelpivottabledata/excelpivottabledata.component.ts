import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-excelpivottabledata',
  templateUrl: './excelpivottabledata.component.html',
  styleUrl: './excelpivottabledata.component.css'
})
export class ExcelpivottabledataComponent {
  sheets: any[] = [];  // Store pivot tables as sheets
  columns: string[] = [];  // Columns from the first sheet (to display options)
  selectedColumns: string[] = [];  // Columns selected for display
  currentSheetIndex: number = 0;  // Index to track the active sheet

  constructor() {}

  // Handle file upload and read Excel file
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const binaryStr = e.target.result;
        const wb = XLSX.read(binaryStr, { type: 'binary' });

        this.sheets = wb.SheetNames.map((sheetName: string) => {
          const ws = wb.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          const columns = data[0];
          const rows = data.slice(1);
          return { sheetName, columns, rows };
        });

        // Initialize with the first sheet's columns and rows
        this.columns = this.sheets[0].columns;
        this.selectedColumns = [...this.columns];
        this.updateDisplayedData();
      };
      reader.readAsBinaryString(file);
    }
  }

  // Update data for display based on selected columns
  updateDisplayedData(): void {
    if (this.sheets.length > 0) {
      const sheet = this.sheets[this.currentSheetIndex];
      const selectedIndices = this.selectedColumns.map((col) =>
        sheet.columns.indexOf(col)
      );
      sheet.displayedData = sheet.rows.map((row:any) =>
        selectedIndices.map((index) => row[index])
      );
    }
  }

  // Switch between different pivot tables (sheets)
  changeSheet(sheetIndex: number): void {
    this.currentSheetIndex = sheetIndex;
    this.columns = this.sheets[sheetIndex].columns;
    this.updateDisplayedData();
  }

}
