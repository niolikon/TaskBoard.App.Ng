// paginator-intl.factory.ts
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

export function matPaginatorIntlFactory(translate: TranslateService): MatPaginatorIntl {
  const intl = new MatPaginatorIntl();
  let sub: Subscription | undefined;

  const translateLabels = () => {
    intl.itemsPerPageLabel = translate.instant('TODOS__PAGINATOR__ITEMS_PER_PAGE');
    intl.nextPageLabel = translate.instant('TODOS__PAGINATOR__NEXT_PAGE');
    intl.previousPageLabel = translate.instant('TODOS__PAGINATOR__PREVIOUS_PAGE');
    intl.firstPageLabel = translate.instant('TODOS__PAGINATOR__FIRST_PAGE');
    intl.lastPageLabel = translate.instant('TODOS__PAGINATOR__LAST_PAGE');

    intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return translate.instant('TODOS__PAGINATOR__RANGE_LABEL_EMPTY', { length });
      }
      const startIndex = page * pageSize;
      const endIndex = Math.min(startIndex + pageSize, length);
      return translate.instant('TODOS__PAGINATOR__RANGE_LABEL', {
        start: startIndex + 1,
        end: endIndex,
        length
      });
    };

    intl.changes.next(); // notifica ai paginator già montati
  };

  // prima traduzione immediata
  translateLabels();
  // aggiorna quando cambia lingua
  sub = translate.onLangChange.subscribe(() => translateLabels());

  // opzionale: cleanup se l'app lo distrugge mai
  (intl as any)._destroy = () => sub?.unsubscribe();

  return intl;
}
