
import { Hero } from '../models/hero';
//import { HEROES } from '../mock-heroes';

import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';




@Injectable({ providedIn: 'root' })

export class HeroService {

  // Define the heroesUrl of the form :base/:collectionName
  // with the address of the heroes resource on the server.
  // Base is the resource that requests are made to
  // and collectionName is the heroes data object in in-memory-data-service.ts.
  private heroesUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // inject MessageService in HeroService
  // service-in-service
  // heroservice is going to use messageservice to add a message
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }




 /** GET heroes from the server */
  // returns an observable of hero arrays
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }


  /** GET hero by id. Will 404 if id not found */
  // returns an observable of hero objects
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;  // construct URL with hero ID
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`)) 
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Promise<Hero> {
    return this.http.post(this.heroesUrl, hero).toPromise()
    .then((newHero: Hero) => {
      this.log(`added hero w/ id=${newHero.id}`);
      return newHero;
    }).catch(err => this.handleError<Hero>('addHero').call(err).toPromise());
    // server generates new hero ID
  }


  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id; // gets hero id in number format
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {

    if (!term.trim()) {
          return of([]); // if not search term, return empty hero array.
    }

    // note the URL includes a query with the search term
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );

  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // Logs error to console
      console.error(error);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
  };
}
}
