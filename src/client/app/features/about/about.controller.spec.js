describe("AboutCtrl", function () {
    var controller;

    beforeEach(module("app.about"));

    beforeEach(inject(function(_$controller_){
        controller = _$controller_("AboutCtrl", {});
    }));

    it("should be created successfully", function() {
        expect(controller).toBeDefined();
    });

    it("should have technologies property as an Array", function() {

        expect(angular.isArray(controller.technologies)).toEqual(true);
    });


});