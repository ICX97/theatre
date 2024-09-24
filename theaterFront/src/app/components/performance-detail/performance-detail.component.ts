import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-performance-detail',
  templateUrl: './performance-detail.component.html',
  styleUrls: ['./performance-detail.component.css']
})
export class PerformanceDetailComponent implements OnInit {
  performance: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.fetchPerformanceDetails(id);
    });
  }

  fetchPerformanceDetails(id: number) {
    // Simuliraj preuzimanje podataka (ovde bi trebao dodati stvarni poziv na API)
    this.performance = {
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
}
