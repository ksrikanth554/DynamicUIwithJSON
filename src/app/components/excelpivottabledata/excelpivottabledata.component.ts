import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-excelpivottabledata',
  templateUrl: './excelpivottabledata.component.html',
  styleUrl: './excelpivottabledata.component.css'
})
export class ExcelpivottabledataComponent {
  data: any[] = [];          // Raw data from Excel
  pivotData: any[] = [];     // Data after pivoting
  columns: string[] = [];    // List of columns (field names)
  selectedColumn: string = ''; // Selected column for pivoting

  constructor() {}

  // Handle the file upload and read the Excel file
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const binaryStr = e.target.result;
        const wb = XLSX.read(binaryStr, { type: 'binary' });

        // Assuming the first sheet contains the data
        const ws = wb.Sheets[wb.SheetNames[0]];
        this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });

        // Dynamically get column headers (first row of data)
        this.columns = this.data[0];

        // Remove header from data to prepare for display
        this.pivotData = this.data.slice(1);
      };
      reader.readAsBinaryString(file);
    }
  }

  // Generate pivot data dynamically
  generatePivot() {
    if (this.pivotData.length > 0 && this.selectedColumn) {
      const pivotResult: any = {};
      const selectedIndex = this.columns.indexOf(this.selectedColumn);

      // Group data by the selected pivot column (dynamically chosen by the user)
      this.pivotData.forEach((row: any) => {
        const key = row[selectedIndex];
        if (!pivotResult[key]) {
          pivotResult[key] = {};
        }

        // Add all other columns to the pivot result
        this.columns.forEach((col: string, index: number) => {
          if (index !== selectedIndex) {
            const cellValue = row[index];
            if (!pivotResult[key][col]) {
              pivotResult[key][col] = [];
            }
            pivotResult[key][col].push(cellValue); // Collect data in arrays for now
          }
        });
      });

      // Format the pivoted data into a structure for easy display
      this.pivotData = [];
      for (const key in pivotResult) {
        const rowData: any = [key]; // Start with the pivot key (e.g., the selected column value)
        this.columns.forEach((col) => {
          if (col !== this.selectedColumn) {
            rowData.push(pivotResult[key][col]?.join(', ')); // Join values in the same field
          }
        });
        this.pivotData.push(rowData);
      }
    }
  }

}
