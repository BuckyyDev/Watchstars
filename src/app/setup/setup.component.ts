import { Component } from '@angular/core';
import { config } from '../../config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.css'
})
export class SetupComponent {
  constructor(private router: Router) {}

  ngOnInit(){
    // If freshInstall is set to false, then redirect traffic to the main page
    // As we don't need to do the setup again
    if (!config.freshInstall) {      
      this.router.navigate(['/']);
    }
  }

  steps = ['Welcome', 'Setup Website', 'Final Step']; // Array of steps
  currentStep = 0;

  goNext() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  goBack() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

}
