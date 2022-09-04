import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideEmail'
})
export class HideEmailPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let parts = value.split("@");
    let name = parts[0];
    let domains = parts[1];
    let result = name.slice(0,2);
    let lastLetter = name.slice(-1)
    for (let i=1; i<name.length-1; i++) {
      result += "*";
    }
    return result + lastLetter + '@' + domains;
  }
}
