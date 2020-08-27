// const myDirective = () => {
//   return {
//     require: 'ngModel',
//     link: function (scope:ng.IScope, element: ng.IAugmentedJQuery, attrs:ng.IAttributes, ngModel:ng.INgModelController) {
//         ngModel.$formatters.push(function (data) {
//             data = parseFloat(data);
//             if (data % 1 != 0){
//                 return parseFloat(data.toFixed(2));
//             } else {
//             return data;
//             }
//         })
//     }
//   }
// }
// export default myDirective;