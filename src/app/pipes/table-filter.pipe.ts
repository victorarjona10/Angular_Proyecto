import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(users: any[], searchText: string, keys: string[] = []): any[] {
    if (!users || !searchText) {
      return users;
    }

    searchText = searchText.toLowerCase();

    return users.filter(user =>
      keys.some(key => user[key] && user[key].toString().toLowerCase().includes(searchText))
    );
  }

}
