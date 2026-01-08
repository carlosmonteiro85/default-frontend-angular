import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Lancamento, ProductService } from '../service/product.service';
import { LancamentoService } from '../service/lancamento.service';
import { DatePickerModule } from 'primeng/datepicker';

import { FileUploadModule } from 'primeng/fileupload';
import { AuthService } from '@/layout/service/auth.service';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-lancamento',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        DatePickerModule,
        FileUploadModule
    ],
    templateUrl: './lancamento.component.html',
    providers: [MessageService, ProductService, ConfirmationService, LancamentoService]
})
export class LancamentoComponent implements OnInit {
    calendarValue: any = null;
    dropdownItems = [
        { name: 'Lançamento', code: 'Option 1' },
        { name: 'Despesa', code: 'Option 2' }
    ];

    dropdownItem = null;

    lancamentoDialog: boolean = false;
    lancamentos = signal<Lancamento[]>([]);
    lancamento!: Lancamento;
    selectedLancamentos!: Lancamento[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];
    exportColumns2!: ExportColumn[];

    cols!: Column[];
    colunas!: Column[];

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private lancamentosService: LancamentoService
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadDemoData();
    }

    loadDemoData() {
        this.lancamentosService.getLancamentos().then((data) => {
            this.lancamentos.set(data);
        });

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];

        this.cols = [
            { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
            { field: 'name', header: 'Name' },
            { field: 'image', header: 'Image' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' }
        ];

        this.colunas = [
            { field: 'data', header: 'Data' },
            { field: 'categoria', header: 'Categoria' },
            { field: 'descricao', header: 'Descrição' },
            { field: 'impactoReceita', header: 'Impacto na receita' },
            { field: 'valor', header: 'Valor R$' },
            { field: 'dataVencimento', header: 'Data vencimento' },
            { field: 'dataPagamento', header: 'Data Pagamento' },
            { field: 'status', header: 'Status' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
        this.exportColumns2 = this.cols.map((coluna) => ({ title: coluna.header, dataKey: coluna.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.lancamento = {};
        this.submitted = false;
        this.lancamentoDialog = true;
    }

    editLancamento(lancamento: Lancamento) {
        this.lancamento = { ...lancamento };
        this.lancamentoDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Cove tem certeza que deseja deletar esse lançamento?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.lancamentos.set(this.lancamentos().filter((val) => !this.selectedLancamentos?.includes(val)));
                this.selectedLancamentos = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.lancamentoDialog = false;
        this.submitted = false;
    }

    deleteLancamento(product: Lancamento) {
        this.confirmationService.confirm({
            message: 'Tem cerceta que deseja deletar o lançamento ' + product.descricao + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.lancamentos.set(this.lancamentos().filter((val) => val.id !== product.id));
                this.lancamento = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Deleted',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.lancamentos().length; i++) {
            if (this.lancamentos()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'Pago':
                return 'success';
            case 'Pendente':
                return 'warn';
            case 'A Receber':
                return 'danger';
            default:
                return 'secondary';
        }
    }

    saveProduct() {
        this.submitted = true;
        let _lancamentos = this.lancamentos();
        if (this.lancamento.descricao?.trim()) {
            if (this.lancamento.id) {
                _lancamentos[this.findIndexById(this.lancamento.id)] = this.lancamento;
                this.lancamentos.set([..._lancamentos]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            } else {
                this.lancamento.id = this.createId();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
                this.lancamentos.set([..._lancamentos, this.lancamento]);
            }
            this.lancamentoDialog = false;
            this.lancamento = {};
        }
    }
}
