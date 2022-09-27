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

    var calulateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(element => {
            console.log(typeof(element.value));
            sum += Number(element.value);
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
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
        calculateBudget: function(){
            calulateTotal('exp');
            calulateTotal('inc');

            data.budget = data.totals.inc - data.totals.exp;
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else {
                data.percentage = -1;
            }
        },
        getBudget: function(){
            return {
                budget: data.budget,
                percentage: data.percentage,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
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
        incomeList: '.income__list',
        budgetValue: '.budget__value',
        budgetIncomeValue: '.budget__income--value',
        budgetExpenseValue: '.budget__expenses--value',
        budgetExpensePercentage: '.budget__expenses--percentage',
        container: '.container'
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
        displayBudget: function(obj){
            document.querySelector(domStrings.budgetValue).textContent = obj.budget;
            document.querySelector(domStrings.budgetIncomeValue).textContent = obj.totalInc;
            document.querySelector(domStrings.budgetExpenseValue).textContent = obj.totalExp;

            if(obj.percentage > 0){
                document.querySelector(domStrings.budgetExpensePercentage).textContent = obj.percentage + '%';
            }else {
                document.querySelector(domStrings.budgetExpensePercentage).textContent = '---';
            }
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
        
        document.querySelector(domStrings.container).addEventListener('click', ctrlDeleteItem);
    }

    var updateBudget = function() {
        budgetController.calculateBudget();
        var budget = budgetController.getBudget();
        UIController.displayBudget(budget);
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

        // Calculate and display budget
        updateBudget();

    }

    ctrlDeleteItem = function(event){
        var itemId, splitId, ID, type;
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        splitId = itemId.split('-');
        ID = splitId[0];
        type = splitId[1];
        
        // delete item from data structure

        // delete item from ui

        // update budget, expenses, incomes and percentage
    }

    return {
        init: function(){
            UIController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            })
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();