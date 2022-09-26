var budgetController = (function(){

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
})();

var UIController = (function(){

    var domStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput: function(){
            return {
                type: document.querySelector(domStrings.inputType).value,
                description: document.querySelector(domStrings.inputDescription).value,
                value: document.querySelector(domStrings.inputValue).value
            };
        },
        getDomStrings: function(){
            return domStrings;
        }
    }

})();

var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function(){
        
        domStrings = UIController.getDomStrings();
        
        document.querySelector(domStrings.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });
    
    }

    ctrlAddItem = function(){
        // Get field input data
        var input = UIController.getInput();
        console.log(input);
        // Add the item to the budget controller

        // Add the item to the ui controller

        // Calculate budget in the budget controller

        // Display budget in the ui controller
    }

    return {
        init: function(){
            console.log("Application has been started...");
            return setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();