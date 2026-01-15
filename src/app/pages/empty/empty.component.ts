import { LoadingComponent } from '@/layout/component/loading/loading.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-empty',
    standalone: true,
    imports: [SkeletonModule, LoadingComponent, CommonModule, BreadcrumbModule],
    templateUrl: './empty.component.html'
})
export class EmptyComponent implements OnInit {

    loading: boolean = true;

    breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    breadcrumbItems = [{ label: 'Páginas' }, { label: 'Pagina vazia' }];

    ngOnInit(): void {
        this.loading = false
    }
}
