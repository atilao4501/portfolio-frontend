import { Pipe, PipeTransform } from '@angular/core';
import { SkillColorService } from '../core/services/skill-color.service';

@Pipe({
  name: 'skillColor',
  standalone: true,
  pure: true,
})
export class SkillColorPipe implements PipeTransform {
  constructor(private svc: SkillColorService) {}
  transform(value: string | { id: string } | null | undefined): string {
    const id = typeof value === 'string' ? value : value?.id;
    return this.svc.getColor(id);
  }
}
