import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-excelpivottabledata',
  templateUrl: './excelpivottabledata.component.html',
  styleUrl: './excelpivottabledata.component.css'
})
export class ExcelpivottabledataComponent {
  sheets: any[] = [];  // Store sheets (both pivot and normal)
  columns: string[] = [];  // Columns for the selected sheet
  selectedColumns: string[] = [];  // Columns selected for display
  currentSheetIndex: number = 0;  // Index to track the active sheet
  isPivotSheet: boolean[] = [];  // Array to track if sheet is a pivot
  pivotData: any[] = []; // Store formatted pivot data for detailed view

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

          // Check if it's a pivot sheet based on its structure
          const isPivot = this.isPivotSheetData(data);
          
          // Format the pivot data if it's a pivot sheet
          let formattedData:any = [];
          if (isPivot) {
            formattedData = this.formatPivotData(data);
          }

          // Track if the sheet is pivot or not
          this.isPivotSheet.push(isPivot);

          return { sheetName, columns: data[0], rows: data.slice(1), formattedData };
        });

        if (this.sheets.length > 0) {
          // Initialize with the first sheet's columns and rows
          this.columns = this.sheets[0].columns;
          this.selectedColumns = [...this.columns];
          this.updateDisplayedData();
        }
      };
      reader.readAsBinaryString(file);
    }
  }

  // Determine if the sheet is a pivot sheet based on its structure
  isPivotSheetData(data: any): boolean {
    return data.length > 1 && data[0].length > 1 && data[1].length > 1;
  }

  // Format pivot table data into a usable structure for display
  formatPivotData(data: any): any[] {
    const headers = data[0];
    const rowCategories = [];
    const columnCategories = headers.slice(1); // excluding the first column which represents rows
    const pivotValues:any = [];

    // Iterate through the rows and extract pivot data
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      rowCategories.push(row[0]); // Row categories are in the first column
      pivotValues.push(row.slice(1)); // Pivot values are in the rest of the row
    }

    // Return the pivot data in a structured way
    return rowCategories.map((category, index) => {
      let formattedRow:any = { category };
      columnCategories.forEach((col:any, colIndex:any) => {
        formattedRow[col] = pivotValues[index][colIndex] || 0; // Handle missing values
      });
      return formattedRow;
    });
  }

  // Update data for display based on selected columns
  updateDisplayedData(): void {
    if (this.sheets.length > 0) {
      const sheet = this.sheets[this.currentSheetIndex];
      if (this.isPivotSheet[this.currentSheetIndex]) {
        this.pivotData = sheet.formattedData;
      } else {
        this.pivotData = sheet.rows;
      }
    }
  }

  // Switch between different sheets (both pivot and normal)
  changeSheet(sheetIndex: number): void {
    this.currentSheetIndex = sheetIndex;
    this.columns = this.sheets[sheetIndex].columns;
    this.updateDisplayedData();
  }
  getColumns(): string[] {
  return ['category', ...this.columns.slice(1)];
}


}
