// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// export enum Status {
//   PAGO = 'PAGO',
//   PENDENTE = 'PENDENTE',
//   VENCENDO = 'VENCENDO'
// }

// export enum Categoria {
//   categoria = 'categoria',
//   RECEITA = 'RECEITA'
// }

// export interface Lancamento {
//   id?: number;
//   data?: Date;
//   categoria?: Categoria;
//   descricao?: string;
//   impactoReceita?: string;
//   valor?: number;
//   dataVencimento?: Date;
//   dataPagamento?: Date;
//   status?: Status;
// }

// @Injectable()
// export class LancamentoService {
//   constructor(private http: HttpClient) {}

//   getLancamentos(): {
//     return [
//       {
//         id: 1,
//         data: new Date('2025-10-04'),
//         categoria: Categoria.categoria,
//         descricao: 'MORGANA (RING NECK)',
//         impactoReceita: '0.00%',
//         valor: 33.33,
//         dataVencimento: new Date('2025-10-25'),
//         dataPagamento: new Date('2025-09-06'),
//         status: Status.PAGO
//       },
//       {
//         id: 2,
//         data: new Date('2025-10-03'),
//         categoria: Categoria.categoria,
//         descricao: 'ALBUM DAYANE',
//         impactoReceita: '1.00%',
//         valor: 100.0,
//         dataVencimento: new Date('2025-10-17'),
//         dataPagamento: undefined,
//         status: Status.PENDENTE
//       },
//       {
//         id: 3,
//         data: new Date('2025-10-07'),
//         categoria: Categoria.categoria,
//         descricao: 'INTERNET OI',
//         impactoReceita: '2.00%',
//         valor: 139.95,
//         dataVencimento: new Date('2025-10-17'),
//         dataPagamento: new Date('2025-10-09'),
//         status: Status.PAGO
//       },
//       {
//         id: 4,
//         data: new Date('2025-10-07'),
//         categoria: Categoria.categoria,
//         descricao: 'CONTA CELULAR CARLOS',
//         impactoReceita: '1.00%',
//         valor: 92.45,
//         dataVencimento: new Date('2025-10-17'),
//         dataPagamento: undefined,
//         status: Status.PENDENTE
//       },
//       {
//         id: 5,
//         data: new Date('2025-10-02'),
//         categoria: Categoria.categoria,
//         descricao: 'CARTÃO CRÉDITO PICPAY',
//         impactoReceita: '23.00%',
//         valor: 1674.9,
//         dataVencimento: new Date('2025-10-16'),
//         dataPagamento: new Date('2025-10-08'),
//         status: Status.PAGO
//       },
//       {
//         id: 6,
//         data: new Date('2025-10-02'),
//         categoria: Categoria.categoria,
//         descricao: 'CARTÃO CRÉDITO BB',
//         impactoReceita: '38.00%',
//         valor: 2754.98,
//         dataVencimento: new Date('2025-10-16'),
//         dataPagamento: new Date('2025-10-08'),
//         status: Status.PAGO
//       },
//       {
//         id: 7,
//         data: new Date('2025-10-02'),
//         categoria: Categoria.categoria,
//         descricao: 'CARTÃO CRÉDITO NUBANK',
//         impactoReceita: '6.00%',
//         valor: 463.49,
//         dataVencimento: new Date('2025-10-16'),
//         dataPagamento: new Date('2025-10-08'),
//         status: Status.PAGO
//       },
//       {
//         id: 8,
//         data: new Date('2025-10-07'),
//         categoria: Categoria.categoria,
//         descricao: 'IPTU 2025',
//         impactoReceita: '1.00%',
//         valor: 56.28,
//         dataVencimento: new Date('2025-10-16'),
//         dataPagamento: new Date('2025-10-08'),
//         status: Status.PAGO
//       }
//     ];
//   }
// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Lancamento {
    id?: string;
    data?: string;
    categoria?: string;
    descricao?: string;
    impactoReceita?: string;
    valor?: number;
    dataVencimento?: string;
    dataPagamento?: string;
    status?: string;
}

@Injectable()
export class LancamentoService {
    constructor(private http: HttpClient) {}

    getLancamentosData(): Lancamento[] {
        return [
            {
                id: 'L001',
                data: '2025-01-10',
                categoria: 'Aluguel',
                descricao: 'Pagamento mensal do escritório',
                impactoReceita: 'Negativo',
                valor: 2500.0,
                dataVencimento: '2025-01-10',
                dataPagamento: '2025-01-09',
                status: 'Pago'
            },
            {
                id: 'L002',
                data: '2025-01-12',
                categoria: 'Energia elétrica',
                descricao: 'Conta de luz da sede',
                impactoReceita: 'Negativo',
                valor: 600.75,
                dataVencimento: '2025-01-15',
                dataPagamento: '2025-01-14',
                status: 'Pago'
            },
            {
                id: 'L003',
                data: '2025-01-20',
                categoria: 'Receita - Venda de serviços',
                descricao: 'Prestação de serviços de consultoria',
                impactoReceita: 'Positivo',
                valor: 8000.0,
                dataVencimento: '2025-01-25',
                dataPagamento: '2025-01-24',
                status: 'Recebido'
            },
            {
                id: 'L004',
                data: '2025-01-25',
                categoria: 'Internet',
                descricao: 'Plano de internet corporativo',
                impactoReceita: 'Negativo',
                valor: 250.0,
                dataVencimento: '2025-01-28',
                dataPagamento: undefined,
                status: 'Pendente'
            },
            {
                id: 'L005',
                data: '2025-02-02',
                categoria: 'Receita - Licenciamento de software',
                descricao: 'Receita anual de licenças',
                impactoReceita: 'Positivo',
                valor: 12000.0,
                dataVencimento: '2025-02-10',
                dataPagamento: undefined,
                status: 'A Receber'
            },
            {
                id: 'L006',
                data: '2025-02-03',
                categoria: 'Marketing digital',
                descricao: 'Campanha de anúncios Google Ads',
                impactoReceita: 'Negativo',
                valor: 1800.0,
                dataVencimento: '2025-02-08',
                dataPagamento: '2025-02-07',
                status: 'Pago'
            }
        ];
    }

    getLancamentosMini(): Promise<Lancamento[]> {
        return Promise.resolve(this.getLancamentosData().slice(0, 5));
    }

    getLancamentos(): Promise<Lancamento[]> {
        return Promise.resolve(this.getLancamentosData());
    }

    getLancamentoById(id: string): Promise<Lancamento | undefined> {
        const lancamento = this.getLancamentosData().find(l => l.id === id);
        return Promise.resolve(lancamento);
    }

    getLancamentosStatus(): string[] {
        return ['Pago', 'Pendente', 'A Receber', 'Cancelado'];
    }

    getLancamentosPorImpacto(): string[] {
        return ['Positivo', 'Negativo'];
    }
}
