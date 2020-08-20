// HeroeDetailComponent Class

import { Hero } from '../hero';
import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  // ActivatedRoute holds information about the route per instance
  // HeroService will get hero to display
  // Location - angular service to interact w browser
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // pull hero id from static img of route information
    const id = +this.route.snapshot.paramMap.get('id'); // + converts str to number

    this.heroService.getHero(id).subscribe(hero => this.hero = hero);

  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

}
