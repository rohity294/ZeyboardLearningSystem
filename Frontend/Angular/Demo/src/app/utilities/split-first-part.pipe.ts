// split-first-part.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitFirstPart',
})
export class SplitFirstPartPipe implements PipeTransform {
  transform(value: string, delimiter: string): string | undefined {
    if (value && delimiter) {
      const parts: string[] = value.split(delimiter);
      return parts.length > 0 ? parts[0].trim() : undefined;
    }
    return undefined;
  }
}
