import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  apiUrl = "http://bookstore.dionisly.com/api/book/?";

  constructor(private http: HttpClient) { }
  parameters = new HttpParams();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    multipart: []


  };





  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getClassroom(): Observable<any> {
    return this.http.get(this.apiUrl, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getClassroomById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postClassroom(data): Observable<any> {
    console.log()
    const url = `${this.apiUrl}name=` + data.name + `&isbn=` + data.isbn + `&price=` + data.price + `&availability=` + data.availability + ``;

    return this.http.post(url.trim(),  this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateClassroom(id: string, data): Observable<any> {
    const url = `${this.apiUrl}id=` + id + ``;
    return this.http.put(url, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  deleteClassroom(id: string): Observable<{}> {

    this.httpOptions.multipart = [
      {
        'content-type': 'application/json',
        body: JSON.stringify({
          foo: 'bar', _attachments: {
            'value': { follows: true, length: 18, 'content_type': 'text/plain' }

          }
        })
      },
      {
        body: 'id'
      },
      {
        'content-type': 'application/json',
        body: JSON.stringify({
          foo: 'bar', _attachments: {
            'value': { follows: true, length: 18, 'content_type': 'text/plain' }

          }
        })
      },
      {
        body: id
      }
    ];

    const url = `${this.apiUrl}id=` + id + ``;
    this.httpOptions
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    this.httpOptions.multipart = []
  }
}
