import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-performance-detail',
  templateUrl: './performance-detail.component.html',
  styleUrls: ['./performance-detail.component.css']
})
export class PerformanceDetailComponent implements OnInit {
  performance: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.fetchPerformanceDetails(id);
    });
  }

  fetchPerformanceDetails(id: number) {
    // Simulate data fetching (here you should add the actual API call)
    // Ensure the performance object includes an id property
    this.performance = {
      id: id, // Assign the id here
      title: 'Edip',
      director: 'Vito Taufer',
      description: 'U ovoj savremenoj adaptaciji klasične tragedije, "Edip", upoznajemo princa Edipa koji se suočava s neizbežnom sudbinom. U potrazi za istinom o svom poreklu, Edip otkriva mračne tajne koje će ga navesti na put pun tragedije i unutrašnjeg sukoba. Ova predstava istražuje teme sudbine, identiteta i ljudske slabosti, oslikavajući snažne emotivne trenutke kroz upečatljive dijaloge i vizuelno bogate scene. Glumci donose duboke i kompleksne karaktere, dok muzika i scenografija stvaraju nezaboravno iskustvo koje će publiku naterati na razmišljanje o prirodi ljudskih izbora i posledicama koje oni nose.',
      poster: 'assets/images/slide1.jpg',
      adaptation: 'Adaptacija 1',
      dramaturg: 'Dramaturg 1',
      scenographer: 'Scenograf 1',
      costumeDesigner: 'Kostimograf 1',
      music: 'Muzika 1',
      stageSpeech: 'Scenski govor 1',
      stageManager: 'Inspicijent 1',
      actors: [
        { name: 'Milan Marić', role: 'Uloga 1', image: 'assets/images/slide1.jpg' },
        { name: 'Natasha Ninković', role: 'Uloga 2', image: '' }
      ]
    };
  }

  showActorImage(actor: any) {
    actor.hovered = true;
  }

  hideActorImage() {
    this.performance.actors.forEach((actor: any) => actor.hovered = false);
  }

  // Updated method to navigate to the ticket purchase page
  purchaseTickets() {
    const performanceId = this.performance?.id; // Use optional chaining to avoid errors

    if (performanceId) {
      this.router.navigate(['/buy-ticket', performanceId]);
    } else {
      console.error('Performance ID is undefined. Cannot navigate to ticket purchase.');
      // You can also display a user-friendly message here
    }
  }
}
