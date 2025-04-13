import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-cart',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDividerModule
  ],
  templateUrl: './cart.component.html'
  
})
export class CartComponent implements OnInit {
  cartForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cartForm = this.fb.group({
      country: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  submitOrder(): void {
    if (this.cartForm.valid) {
      console.log(this.cartForm.value);
    }
  }
}


