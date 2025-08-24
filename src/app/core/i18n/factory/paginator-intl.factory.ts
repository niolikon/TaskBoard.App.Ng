import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { LanguageSelectionService } from "../services/language-selection.service";
import { Subscription } from 'rxjs';

export function matPaginatorIntlFactory(translate: TranslateService, languageSelection: LanguageSelectionService): MatPaginatorIntl {
  const intl = new MatPaginatorIntl();
  const sub = new Subscription();

  const applyLabels = () => {
    intl.itemsPerPageLabel = translate.instant('CORE__PAGINATOR__ITEMS_PER_PAGE');
    intl.nextPageLabel = translate.instant('CORE__PAGINATOR__NEXT_PAGE');
    intl.previousPageLabel = translate.instant('CORE__PAGINATOR__PREVIOUS_PAGE');
    intl.firstPageLabel = translate.instant('CORE__PAGINATOR__FIRST_PAGE');
    intl.lastPageLabel = translate.instant('CORE__PAGINATOR__LAST_PAGE');

    intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return translate.instant('CORE__PAGINATOR__RANGE_LABEL_EMPTY', { length });
      }
      const startIndex = page * pageSize;
      const endIndex = Math.min(startIndex + pageSize, length);
      return translate.instant('CORE__PAGINATOR__RANGE_LABEL', {
        start: startIndex + 1,
        end: endIndex,
        length
      });
    };

    intl.changes.next();
  };

  applyLabels();

  languageSelection.language$.subscribe(_ => applyLabels());

  (intl as any).ngOnDestroy = () => sub.unsubscribe();

  return intl;
}
