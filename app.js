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

    return {
        addItem: function(type, description, value){

            var newItem, ID;

            //create an id
            if(data.allItems[type].length > 0){
                //get the last id in the array and add 1 to it.
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            }else {
                ID = 0;
            }
            
            //check the status of the item
            if(type === 'exp'){
                newItem = new Expense(ID, description, value);
            }else if(type === 'inc') {
                newItem = new Income(ID, description, value);
            }
            data.allItems[type].push(newItem);

            return newItem;
        },
        detalis: function(){
            console.log(data);
        }
    }
})();

var UIController = (function(){

    var domStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        expenseList: '.expenses__list',
        incomeList: '.income__list'
    };

    return {
        getInput: function(){
            return {
                type: document.querySelector(domStrings.inputType).value,
                description: document.querySelector(domStrings.inputDescription).value,
                value: document.querySelector(domStrings.inputValue).value
            };
        },
        addListItem: function(obj, type) {
            var html, newHtml, element;

            if(type == 'exp'){
                element = domStrings.expenseList;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type == 'inc'){
                element = domStrings.incomeList;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
        },
        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(domStrings.inputValue + ',' + domStrings.inputDescription);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(element => {
                element.value = "";
            });
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

        // Add the item to the budget controller
        var item = budgetController.addItem(input.type, input.description, input.value);

        // Add the item to the ui controller
        UIController.addListItem(item, input.type);

        // Clear the Fields
        UIController.clearFields();
        
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