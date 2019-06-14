import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abrev'
})
export class AbrevPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    switch(value){
      case "PRIMERO": return "1º";
      case "SEGUNDO": return "2º";
      case "POSTRE" : return "Pos"; 
    }
  }

}
