import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";



export interface ProductPayload {
  productName: string;
  productPrice: number;
  productAmount: number;
}

interface TokenResponse {
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private token: string;
  constructor(private http: HttpClient, private router: Router) { }


  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("mean-token");
    }
    return this.token;
  }
  
  private saveToken(token: string): void {
    localStorage.setItem("mean-token", token);
    this.token = token;
  }

  private request(
    method: "post" | "get",
    type: "product",
    product?: ProductPayload
  ): Observable<any> {
    let base$;

    if (method === "post") {
      base$ = this.http.post(`/api/${type}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    }
    

    const request = base$.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public updateCart(product: ProductPayload): Observable<any> {
    return this.request("post", "product", product);
  }
}
