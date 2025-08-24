import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

export function matPaginatorIntlFactory(translate: TranslateService): MatPaginatorIntl {
  const matPaginatorIntl = new MatPaginatorIntl();

  const propertiesToTranslation = {
    itemsPerPage: 'CORE__PAGINATOR__ITEMS_PER_PAGE',
    nextPage: 'CORE__PAGINATOR__NEXT_PAGE',
    previousPage: 'CORE__PAGINATOR__PREVIOUS_PAGE',
    firstPage: 'CORE__PAGINATOR__FIRST_PAGE',
    lastPage: 'CORE__PAGINATOR__LAST_PAGE',
    range: 'CORE__PAGINATOR__RANGE_LABEL',
    rangeEmpty: 'CORE__PAGINATOR__RANGE_LABEL_EMPTY'
  } as const;

  const translations = Object.values(propertiesToTranslation);

  const sub = merge(
      translate.onLangChange,
      translate.onTranslationChange,
      translate.onDefaultLangChange
  )
      .pipe(
          startWith(null),
          switchMap(() => translate.get(translations))
      )
      .subscribe(dict => {
        matPaginatorIntl.itemsPerPageLabel  = dict[propertiesToTranslation.itemsPerPage]  ?? 'Items per page';
        matPaginatorIntl.nextPageLabel      = dict[propertiesToTranslation.nextPage]      ?? 'Next page';
        matPaginatorIntl.previousPageLabel  = dict[propertiesToTranslation.previousPage]  ?? 'Previous page';
        matPaginatorIntl.firstPageLabel     = dict[propertiesToTranslation.firstPage]     ?? 'First page';
        matPaginatorIntl.lastPageLabel      = dict[propertiesToTranslation.lastPage]      ?? 'Last page';

        matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          if (length === 0 || pageSize === 0) {
            return translate.instant(propertiesToTranslation.rangeEmpty, { length });
          }
          const startIndex = page * pageSize;
          const endIndex = Math.min(startIndex + pageSize, length);
          return translate.instant(propertiesToTranslation.range, {
            start: startIndex + 1,
            end: endIndex,
            length
          });
        };

        matPaginatorIntl.changes.next();
      });

  (matPaginatorIntl as any).ngOnDestroy = () => sub.unsubscribe();

  return matPaginatorIntl;
}
