// import { IScope, IAttributes, IAugmentedJQuery, IController } from 'angular';
// /*angular.module("lanchonete").directive('numberonly', function () {
//   return {
//     restrict: 'A',
//     require: 'ngModel',
//     link: function (scope, element, attrs, ngModel) {
//       var negativo = /\-/.test(attrs.numberonly);
//       var decimal = /\.|\,/.test(attrs.numberonly) ? /\.|\,/.exec(attrs.numberonly)[0] : null;

//       var regExp = '^';
//       regExp += negativo ? '[\\-]{0,1}' : '';
//       regExp += '[\\d]+';
//       if (decimal != null) {
//         regExp += '[\\' + decimal + '][\\d]+|';
//         if (negativo) {
//           regExp += '[\\-]{0,1}'
//         }
//         regExp += '[\\d]+'
//       }
//       regExp += '';
//       regExp = new RegExp(regExp);

//       ngModel.$parsers.unshift(function (input) {
//         if (input === undefined) return null;
//         if (input === null) return;

//         input = input.toString().replace(/\./, decimal);
//         if (input == '-') return input;
//         if (decimal !== null && input.charAt(input.length - 1) == decimal) return input;

//         input = regExp.test(input) ? regExp.exec(input)[0] : null;

//         var viewVal = null;

//         if (input !== null) {
//           input = decimal != null ? parseFloat(input.replace(/\,/, '.')) : parseInt(input);
//         }

//         viewVal = isNaN(input) || input === null ? '' : input;

//         ngModel.$setViewValue(decimal != null ? viewVal.toString().replace(/\./, decimal) : viewVal.toString());
//         ngModel.$render();

//         return isNaN(input) ? null : input;
//       });

//       ngModel.$formatters.unshift(function (value) {
//         if (value !== undefined && value !== null) {
//           return decimal != null ? value.toString().replace(/\./, decimal) : value.toString();
//         }
//       });
//     }
//   }
// });*/


// function newFunction(numberonlyDecimal: string): string {
//   let newLocal: RegExpExecArray | null = /\.|\,/.exec(numberonlyDecimal);
//   return newLocal != null ? newLocal.map(c => c)[0] : "";
// }

// export default function numberonly() {
//   return {
//     restrict: 'A',
//     require: 'ngModel',
//     link: function ($scope: IScope, element: IAugmentedJQuery, attrs: IAttributes, ngModel: any) {
//       element.bind('keyup', (e: KeyboardEvent | any ) => {
//         var negativo = /\-/.test(attrs.numberonly);
//       let numberonlyDecimal = !!attrs && attrs.numberonly ? attrs.numberonly as string : "";
//       var decimal: any = /\.|\,/.test(attrs.numberonly) ? newFunction(numberonlyDecimal) : null;

//       let viewVal: HTMLInputElement = e.target as HTMLInputElement;

//       if (!viewVal.value && viewVal.value === '') return;

//       viewVal.value = viewVal.value.replace(/\D/g, '');
//       viewVal.value = viewVal.value.replace(/(\d+)(\d{3})/g, "$1"+numberonlyDecimal+'$2');

//       ngModel.$setViewValue(decimal != null ? viewVal.value.toString().replace(/\./, decimal) : viewVal.value.toString());
//       ngModel.$render();

//       // var regExp: any = '^';
//       // regExp += negativo ? '[\\-]{0,1}' : '';
//       // regExp += '[\\d]+';
//       // if (decimal != null) {
//       //   regExp += '[\\' + decimal + '][\\d]+|';
//       //   if (negativo) {
//       //     regExp += '[\\-]{0,1}';
//       //   }
//       //   regExp += '[\\d]+';
//       // }
//       // regExp += '';
//       // regExp = new RegExp(regExp);

//       // ngModel.$parsers.unshift(function (input: any) {
//       //   if (input === undefined)
//       //     return null;
//       //   if (input === null)
//       //     return;

//       //   input = input.toString().replace(/\./, decimal);
//       //   if (input == '-')
//       //     return input;
//       //   if (decimal !== null && input.charAt(input.length - 1) == decimal)
//       //     return input;

//       //   input = regExp.test(input) ? regExp.exec(input)[0] : null;

//       //   var viewVal = null;

//       //   if (input !== null) {
//       //     input = decimal != null ? parseFloat(input.replace(/\,/, '.')) : parseInt(input);
//       //   }

//       //   viewVal = isNaN(input) || input === null ? '' : input;

//       //   ngModel.$setViewValue(decimal != null ? viewVal.toString().replace(/\./, decimal) : viewVal.toString());
//       //   ngModel.$render();

//       //   return isNaN(input) ? null : input;
//       // });

//       // ngModel.$formatters.unshift(function (value: any) {
//       //   if (value !== undefined && value !== null) {
//       //     return decimal != null ? value.toString().replace(/\./, decimal) : value.toString();
//       //   }
//       // });
//       });
      
//     }
//   };
// }
