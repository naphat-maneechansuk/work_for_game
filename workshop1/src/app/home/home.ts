import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  name = new FormControl(0);
  multiplier = 0;
  numbers: number[] = [];
  showTable = false;

  createTable() {
    const inputValue = this.name.value;

    // if-else ตรวจสอบค่า
    if (inputValue) {
      this.multiplier = inputValue;
      this.numbers = [];

      // for loop สร้างตัวเลข 1-12
      for (let i = 1; i <= 12; i++) {
        this.numbers.push(i);
      }

      this.showTable = true;
    }
  }
}
