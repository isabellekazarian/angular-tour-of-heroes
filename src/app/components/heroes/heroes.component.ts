// HeroesComponent Class

import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/hero'; //imports hero.ts interface
import { HeroService } from '../../services/hero.service';

//@Component is a decorator function that specifies the Angular metadata for the component

@Component({ 
  selector: 'app-heroes', //css selector matches the name of the HTML element that identifies this component within a parent component's template
  templateUrl: './heroes.component.html', //component's template file
  styleUrls: ['./heroes.component.css'] //component's private css styles
})

export class HeroesComponent implements OnInit {

  // define component property to allow for binding
  heroes: Hero[];
  
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }


  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    // when addHero saves successfully, subscribe reads the hero and adds to the display list 
    this.heroService.addHero({ name } as Hero)
      .then(hero => { this.heroes.push(hero); });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero); // delete hero from list stored here
    this.heroService.deleteHero(hero).subscribe();     // call service to delete from server
  }


}
