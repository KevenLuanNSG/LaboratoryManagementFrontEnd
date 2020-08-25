
 /*   declare var angular: any;
    var app = angular.module('lanchonete', []);
    class HeaderDirective {
        static $inject: string[] = ['$rootScope'];
        constructor(public $rootScope: any) { }
        clear() {
            this.$rootScope.text = '';
        }
    }
    app.directive("customDirective", [() => {
        return {
            restrict: "E",
            controller: HeaderDirective,
            controllerAs: 'ctrl',
            link: (scope: any, element: any, attributes: any, ctrl: HeaderDirective) => {
                ctrl.$rootScope.text = "../../view/cabecarioLanchonete.html";
            }
        };
    }]);

export default HeaderDirective;





import { IScope, IAttributes } from 'angular';

interface IHeaderDirectiveController {
    getUrl(): string;
}

class HeaderDirectiveController implements IHeaderDirectiveController {
    public static $inject = ["$location", "toaster"];
    constructor(private $location: ng.ILocationService, private toaster: any) {
    }

    public getUrl(): string {
        return this.$location.url();
    }
}

export function HeaderDirective(templatesUrl: ITemplates): ng.IDirective {
    return {
        controller: HeaderDirectiveController,
        controllerAs: "vm",

        link: (scope: ng.IScope,
            element: ng.IAugmentedJQuery,
            attributes: ng.IAttributes,
            controller: HeaderDirectiveController): void => {
            let url = controller.getUrl();
            element.text("Current URL: " + url);
        },

        replace: true,
        require: "ngModel",
        restrict: "A",
        templateUrl: templatesUrl.HeaderDirective
    };
}

HeaderDirective.$inject = [
    templatesUrl.prototype.slug
];

HeaderDirective.prototype.slug = "HeaderDirective";

angular.module("lanchonete").directive(HeaderDirective.prototype.slug, HeaderDirective);
*/