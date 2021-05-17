import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

interface TokenResponse {
  token: string;
}

export interface UserPayload {
  _id: string;
  productID: string;
  productAmount: number;
}

@Injectable({
  providedIn: "root"
})
export class CartService {
  private token: string;

  constructor(private http: HttpClient) {}

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
    type: "cart" | "showCart" | "user",
    user?: UserPayload
  ): Observable<any> {
    let base$;
    if (method === "post") {
      base$ = this.http.post(`/api/${type}`, user);
    } else {
      base$ = this.http.get(`/api/${type}`, {
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

  public addToCart(userPayload:UserPayload):Observable<any> {
    return this.request("post", "cart", userPayload);
  }

  public showCart(userPayload:UserPayload):Observable<any> {
    return this.request("post", "showCart", userPayload);
  }

  public getUser(userPayload:UserPayload):Observable<any> {
    return this.request("post", "user", userPayload);
  }
}
