import { Acao, AcoesAPI, Acoes } from './modelo/acoes';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';

const API = environment.api;

@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  constructor(private httpClient: HttpClient) {}

  getAcoes(valor?: string) {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    return this.httpClient.get<AcoesAPI>(`${API}/acoes`, { params }).pipe(
      /* tap((retornoApi) => console.log(retornoApi)), //Tap Não modifica o retorno
      map((acoesApi: AcoesAPI) => acoesApi.payload), //Map modifica o retorno */
      pluck('payload'), //Receb uma string que é uma propriedade do objeto que quero extrair
      map((acoes: Acoes) =>
        acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB))
      )
    );
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao): number {
    if (acaoA.codigo > acaoB.codigo) {
      return 1;
    } else if (acaoA.codigo < acaoB.codigo) {
      return -1;
    } else {
      return 0;
    }
  }
}
