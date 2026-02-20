import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  computed, effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { StateService } from './state-service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-har-analyzer',
  imports: [FormsModule, DatePipe],
  templateUrl: './har-analyzer.component.html',
  styleUrl: './har-analyzer.component.scss',
})
export class HarAnalyzerComponent {
  harAnalyzerStateService = inject(StateService);
  docEntries = signal<any[]>([]);
  errorMessage = signal<string | null>(null);
  expandedIndex = signal<number | null>(null);
  expandedDomain = signal<string | null>(this.harAnalyzerStateService.getHarAnalyzerState().expandedDomain);
  deltaSet = signal<Set<string>>(new Set());
  // computed value
  delta = computed<number | null>(() => {
    if (this.deltaSet().size !== 2) return null;
    const ids = Array.from(this.deltaSet());
    const entries = this.docEntries().filter(entry => ids.includes(entry.id));
    if (entries.length !== 2) return null;

    const time1 = entries[0].startedDateTime.getTime();
    const time2 = entries[1].startedDateTime.getTime();
    return Math.abs(time1 - time2);
  });

  constructor() {
    effect(() => {
      this.harAnalyzerStateService.saveHarAnalyzerState({
        expandedDomain: this.expandedDomain(),
      });
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const harData = JSON.parse(e.target?.result as string);
        this.processHar(harData);
        this.errorMessage.set(null);
      } catch (err) {
        this.errorMessage.set('Invalid HAR file format.');
        console.error(err);
      }
    };

    reader.readAsText(file);
  }

  private processHar(data: any): void {
    if (!data.log || !data.log.entries) {
      this.errorMessage.set('Malformed HAR structure.');
      return;
    }

    // Filtering for "Doc" type entries (usually text/html)
    this.docEntries.set(data.log.entries.filter((entry: any) => {
      const mimeType = entry.response?.content?.mimeType || '';
      return mimeType.includes('text/html');
    }).map((entry: any) => {
      const domain = entry.request.headers.find((h: any) => h.name.toLowerCase() === ':authority')?.value || '';
      console.log('Found Doc entry:', entry, domain);
      return {
        domain,
        id: entry.startedDateTime,
        url: entry.request.url,
        startedDateTime: new Date(entry.startedDateTime),
        method: entry.request.method,
        deltaChecked: false,
      };
    }));
  }

  toggleExpand(index: number): void {
    this.expandedIndex.set(this.expandedIndex() === index ? null : index);
  }

  protected toggleDeltaCheck(entry: any) {
    const set = new Set(this.deltaSet());
    if (entry.deltaChecked) {
      this.expandedDomain.set(entry.domain);

      set.add(entry.id);
      // If the set exceeds 2 items, remove the oldest one
      if (set.size > 2) {
        // Get the first item (the oldest)
        const firstItem = set.values().next().value;
        if (firstItem) {
          set.delete(firstItem);
        }
        // OPTIONAL: If you need to uncheck the UI for the removed item:
        const item = this.docEntries().find(e => e.id === firstItem);
        if (item) {
          item.deltaChecked = false;
        }
      }
    } else {
      set.delete(entry.id);
    }
    this.deltaSet.set(set)
  }
}
