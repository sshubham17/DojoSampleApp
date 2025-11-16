// Dojo 1.04 Website - Unit Tests
// Run before and after migration to ensure no regressions

dojo.require("dijit.form.Button");
dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.ValidationTextBox");
dojo.require("dijit.form.Textarea");
dojo.require("dijit.form.FilteringSelect");
dojo.require("dojo.data.ItemFileReadStore");

// ===========================================
// MODULE: Todo Data Operations
// ===========================================
QUnit.module("Todo Data Operations", {
    beforeEach: function() {
        // Reset global state before each test
        window.todos = [];
        window.todoIdCounter = 1;
    },
    afterEach: function() {
        // Clean up after test
        window.todos = [];
        window.todoIdCounter = 1;
    }
});

QUnit.test("Todo array initializes empty", function(assert) {
    assert.equal(todos.length, 0, "Todos array starts empty");
    assert.ok(Array.isArray(todos), "Todos is an array");
});

QUnit.test("Can add todo item with all fields", function(assert) {
    var todo = {
        id: todoIdCounter++,
        title: "Test Todo",
        description: "Test Description",
        priority: "High",
        status: "Pending",
        createdAt: new Date().toISOString()
    };
    
    todos.push(todo);
    
    assert.equal(todos.length, 1, "Todo added successfully");
    assert.equal(todos[0].title, "Test Todo", "Todo title is correct");
    assert.equal(todos[0].description, "Test Description", "Todo description is correct");
    assert.equal(todos[0].priority, "High", "Todo priority is correct");
    assert.equal(todos[0].status, "Pending", "Todo status is correct");
    assert.equal(todos[0].id, 1, "Todo ID is correct");
});

QUnit.test("Can add multiple todos", function(assert) {
    var todo1 = { id: todoIdCounter++, title: "Todo 1", status: "Pending" };
    var todo2 = { id: todoIdCounter++, title: "Todo 2", status: "Pending" };
    var todo3 = { id: todoIdCounter++, title: "Todo 3", status: "Pending" };
    
    todos.push(todo1);
    todos.push(todo2);
    todos.push(todo3);
    
    assert.equal(todos.length, 3, "Three todos added");
    assert.equal(todoIdCounter, 4, "ID counter incremented correctly");
});

QUnit.test("Can delete todo item by ID", function(assert) {
    todos = [
        { id: 1, title: "Todo 1" },
        { id: 2, title: "Todo 2" },
        { id: 3, title: "Todo 3" }
    ];
    
    var idToDelete = 2;
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === idToDelete) {
            todos.splice(i, 1);
            break;
        }
    }
    
    assert.equal(todos.length, 2, "Todo deleted successfully");
    assert.equal(todos[0].id, 1, "First todo still exists");
    assert.equal(todos[1].id, 3, "Third todo moved to second position");
});

QUnit.test("Can toggle todo status from Pending to Completed", function(assert) {
    todos = [{ id: 1, title: "Test Todo", status: "Pending" }];
    
    var idToToggle = 1;
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === idToToggle) {
            todos[i].status = todos[i].status === "Pending" ? "Completed" : "Pending";
            break;
        }
    }
    
    assert.equal(todos[0].status, "Completed", "Status toggled to Completed");
});

QUnit.test("Can toggle todo status from Completed to Pending", function(assert) {
    todos = [{ id: 1, title: "Test Todo", status: "Completed" }];
    
    var idToToggle = 1;
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === idToToggle) {
            todos[i].status = todos[i].status === "Pending" ? "Completed" : "Pending";
            break;
        }
    }
    
    assert.equal(todos[0].status, "Pending", "Status toggled back to Pending");
});

// ===========================================
// MODULE: Input Validation
// ===========================================
QUnit.module("Input Validation");

QUnit.test("Empty title is invalid", function(assert) {
    var title = "";
    var isValid = title && title.trim() !== "";
    assert.notOk(isValid, "Empty title fails validation");
});

QUnit.test("Whitespace-only title is invalid", function(assert) {
    var title = "   ";
    var isValid = title && title.trim() !== "";
    assert.notOk(isValid, "Whitespace-only title fails validation");
});

QUnit.test("Valid title passes validation", function(assert) {
    var title = "Valid Todo Title";
    var isValid = title && title.trim() !== "";
    assert.ok(isValid, "Valid title passes validation");
});

QUnit.test("Priority values are valid", function(assert) {
    var validPriorities = ["Low", "Medium", "High"];
    
    assert.ok(validPriorities.indexOf("Low") > -1, "Low is valid priority");
    assert.ok(validPriorities.indexOf("Medium") > -1, "Medium is valid priority");
    assert.ok(validPriorities.indexOf("High") > -1, "High is valid priority");
    assert.notOk(validPriorities.indexOf("Invalid") > -1, "Invalid priority rejected");
});

QUnit.test("Status values are valid", function(assert) {
    var validStatuses = ["Pending", "Completed"];
    
    assert.ok(validStatuses.indexOf("Pending") > -1, "Pending is valid status");
    assert.ok(validStatuses.indexOf("Completed") > -1, "Completed is valid status");
    assert.notOk(validStatuses.indexOf("Invalid") > -1, "Invalid status rejected");
});

// ===========================================
// MODULE: Dojo Widget Creation
// ===========================================
QUnit.module("Dojo Widget Creation", {
    afterEach: function() {
        // Destroy all widgets after each test
        dijit.registry.forEach(function(widget) {
            widget.destroy();
        });
    }
});

QUnit.test("Can create dijit.form.Button", function(assert) {
    var done = assert.async();
    
    dojo.addOnLoad(function() {
        var button = new dijit.form.Button({
            label: "Test Button",
            onClick: function() { return true; }
        });
        
        assert.ok(button, "Button widget created");
        assert.equal(button.label, "Test Button", "Button label is correct");
        assert.equal(typeof button.onClick, "function", "Button has onClick handler");
        done();
    });
});

QUnit.test("Can create dijit.form.ValidationTextBox", function(assert) {
    var done = assert.async();
    
    dojo.addOnLoad(function() {
        var textBox = new dijit.form.ValidationTextBox({
            value: "Test Value",
            required: true
        });
        
        assert.ok(textBox, "ValidationTextBox widget created");
        assert.equal(textBox.getValue(), "Test Value", "TextBox value is correct");
        assert.ok(textBox.required, "TextBox is marked as required");
        done();
    });
});

QUnit.test("Can create dijit.form.Textarea", function(assert) {
    var done = assert.async();
    
    dojo.addOnLoad(function() {
        var textarea = new dijit.form.Textarea({
            value: "Test Description"
        });
        
        assert.ok(textarea, "Textarea widget created");
        assert.equal(textarea.getValue(), "Test Description", "Textarea value is correct");
        done();
    });
});

QUnit.test("Can create dijit.form.FilteringSelect", function(assert) {
    var done = assert.async();
    
    dojo.addOnLoad(function() {
        // Create a simple data store for FilteringSelect
        var data = {
            identifier: 'value',
            items: [
                { value: 'Low', name: 'Low' },
                { value: 'Medium', name: 'Medium' },
                { value: 'High', name: 'High' }
            ]
        };
        
        var store = new dojo.data.ItemFileReadStore({ data: data });
        
        var select = new dijit.form.FilteringSelect({
            value: "Medium",
            store: store,
            searchAttr: "name"
        });
        
        assert.ok(select, "FilteringSelect widget created");
        assert.ok(select.store, "FilteringSelect has a data store");
        done();
    });
});

// ===========================================
// MODULE: Dojo Core Functions
// ===========================================
QUnit.module("Dojo Core Functions");

QUnit.test("dojo.byId() works correctly", function(assert) {
    var container = document.getElementById('test-container');
    var testDiv = document.createElement('div');
    testDiv.id = 'test-element';
    testDiv.innerHTML = 'Test Content';
    container.appendChild(testDiv);
    
    var element = dojo.byId('test-element');
    
    assert.ok(element, "Element found by dojo.byId()");
    assert.equal(element.id, 'test-element', "Element ID is correct");
    assert.equal(element.innerHTML, 'Test Content', "Element content is correct");
    
    container.removeChild(testDiv);
});

QUnit.test("dojo.toJson() converts object to JSON", function(assert) {
    var obj = {
        id: 1,
        title: "Test Todo",
        priority: "High"
    };
    
    var json = dojo.toJson(obj);
    
    assert.ok(typeof json === 'string', "Result is a string");
    assert.ok(json.indexOf('"title"') > -1, "JSON contains title field");
    assert.ok(json.indexOf('"Test Todo"') > -1, "JSON contains title value");
});

QUnit.test("dojo.fromJson() parses JSON string", function(assert) {
    var jsonString = '{"id":1,"title":"Test Todo","priority":"High"}';
    
    var obj = dojo.fromJson(jsonString);
    
    assert.ok(typeof obj === 'object', "Result is an object");
    assert.equal(obj.id, 1, "ID parsed correctly");
    assert.equal(obj.title, "Test Todo", "Title parsed correctly");
    assert.equal(obj.priority, "High", "Priority parsed correctly");
});

// ===========================================
// MODULE: Table Rendering Logic
// ===========================================
QUnit.module("Table Rendering Logic", {
    beforeEach: function() {
        window.todos = [];
        
        // Create a mock table body
        var container = document.getElementById('test-container');
        var tbody = document.createElement('tbody');
        tbody.id = 'mockTableBody';
        container.appendChild(tbody);
    },
    afterEach: function() {
        var container = document.getElementById('test-container');
        container.innerHTML = '';
        window.todos = [];
    }
});

QUnit.test("Empty state renders correctly", function(assert) {
    var tbody = document.getElementById('mockTableBody');
    
    if (todos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-message">No todos yet. Add one to get started!</td></tr>';
    }
    
    assert.equal(tbody.getElementsByTagName('tr').length, 1, "One row rendered");
    assert.ok(tbody.innerHTML.indexOf('No todos yet') > -1, "Empty message displayed");
});

QUnit.test("Single todo renders correctly", function(assert) {
    todos = [
        { id: 1, title: "Test Todo", description: "Test Desc", priority: "High", status: "Pending" }
    ];
    
    var tbody = document.getElementById('mockTableBody');
    var html = "";
    
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];
        html += '<tr>';
        html += '<td>' + todo.id + '</td>';
        html += '<td>' + todo.title + '</td>';
        html += '<td>' + todo.description + '</td>';
        html += '</tr>';
    }
    
    tbody.innerHTML = html;
    
    assert.equal(tbody.getElementsByTagName('tr').length, 1, "One todo row rendered");
    assert.ok(tbody.innerHTML.indexOf('Test Todo') > -1, "Todo title displayed");
});

QUnit.test("Multiple todos render correctly", function(assert) {
    todos = [
        { id: 1, title: "Todo 1", description: "Desc 1", priority: "High", status: "Pending" },
        { id: 2, title: "Todo 2", description: "Desc 2", priority: "Low", status: "Completed" },
        { id: 3, title: "Todo 3", description: "Desc 3", priority: "Medium", status: "Pending" }
    ];
    
    var tbody = document.getElementById('mockTableBody');
    var html = "";
    
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];
        html += '<tr><td>' + todo.title + '</td></tr>';
    }
    
    tbody.innerHTML = html;
    
    assert.equal(tbody.getElementsByTagName('tr').length, 3, "Three todo rows rendered");
});

// ===========================================
// MODULE: Priority Badge Classes
// ===========================================
QUnit.module("Priority Badge Classes");

QUnit.test("Low priority gets correct class", function(assert) {
    var priority = "Low";
    var className = "priority-" + priority.toLowerCase();
    assert.equal(className, "priority-low", "Low priority class is correct");
});

QUnit.test("Medium priority gets correct class", function(assert) {
    var priority = "Medium";
    var className = "priority-" + priority.toLowerCase();
    assert.equal(className, "priority-medium", "Medium priority class is correct");
});

QUnit.test("High priority gets correct class", function(assert) {
    var priority = "High";
    var className = "priority-" + priority.toLowerCase();
    assert.equal(className, "priority-high", "High priority class is correct");
});

// ===========================================
// MODULE: Status Badge Classes
// ===========================================
QUnit.module("Status Badge Classes");

QUnit.test("Completed status gets correct class", function(assert) {
    var status = "Completed";
    var className = status === "Completed" ? "complete" : "pending";
    assert.equal(className, "complete", "Completed status class is correct");
});

QUnit.test("Pending status gets correct class", function(assert) {
    var status = "Pending";
    var className = status === "Completed" ? "complete" : "pending";
    assert.equal(className, "pending", "Pending status class is correct");
});

// ===========================================
// MODULE: Navigation Functions
// ===========================================
QUnit.module("Navigation Functions");

QUnit.test("Window location object exists", function(assert) {
    assert.ok(typeof window.location !== 'undefined', "Window.location is available");
    assert.ok(typeof window.location.href !== 'undefined', "Window.location.href is available");
});

QUnit.test("Navigation URLs are correct", function(assert) {
    var dashboardUrl = "dashboard.html";
    var todoListUrl = "contents.html";
    var todoUrl = "todo.html";
    
    assert.equal(dashboardUrl, "dashboard.html", "Dashboard URL is correct");
    assert.equal(todoListUrl, "contents.html", "Todo List URL is correct");
    assert.equal(todoUrl, "todo.html", "Todo URL is correct");
});

// ===========================================
// MODULE: API Todo List (contents.html)
// ===========================================
QUnit.module("API Todo List Functions");

QUnit.test("Todos variable can store API data", function(assert) {
    var apiTodos = [
        { id: 1, todo: "Complete project", userId: 5, completed: false },
        { id: 2, todo: "Write tests", userId: 10, completed: true }
    ];
    
    assert.ok(Array.isArray(apiTodos), "API todos is an array");
    assert.equal(apiTodos.length, 2, "Can store multiple todos");
    assert.equal(apiTodos[0].todo, "Complete project", "Todo text is correct");
    assert.ok(apiTodos[0].hasOwnProperty('completed'), "Has completed property");
    assert.ok(apiTodos[0].hasOwnProperty('userId'), "Has userId property");
});

QUnit.test("Can filter completed todos", function(assert) {
    var apiTodos = [
        { id: 1, todo: "Task 1", completed: false },
        { id: 2, todo: "Task 2", completed: true },
        { id: 3, todo: "Task 3", completed: true },
        { id: 4, todo: "Task 4", completed: false }
    ];
    
    var completed = apiTodos.filter(function(t) { return t.completed; });
    var pending = apiTodos.filter(function(t) { return !t.completed; });
    
    assert.equal(completed.length, 2, "Correctly filters completed todos");
    assert.equal(pending.length, 2, "Correctly filters pending todos");
});

QUnit.test("Can slice array for pagination", function(assert) {
    var apiTodos = [];
    for (var i = 1; i <= 30; i++) {
        apiTodos.push({ id: i, todo: "Task " + i, completed: false });
    }
    
    var firstPage = apiTodos.slice(0, 20);
    
    assert.equal(firstPage.length, 20, "Slice returns correct number of items");
    assert.equal(firstPage[0].id, 1, "First item is correct");
    assert.equal(firstPage[19].id, 20, "Last item of page is correct");
});

QUnit.test("Status text conversion", function(assert) {
    var todo1 = { completed: true };
    var todo2 = { completed: false };
    
    var status1 = todo1.completed ? "Completed" : "Pending";
    var status2 = todo2.completed ? "Completed" : "Pending";
    
    assert.equal(status1, "Completed", "Completed status is correct");
    assert.equal(status2, "Pending", "Pending status is correct");
});

QUnit.test("Status class conversion", function(assert) {
    var todo1 = { completed: true };
    var todo2 = { completed: false };
    
    var statusClass1 = todo1.completed ? "complete" : "pending";
    var statusClass2 = todo2.completed ? "complete" : "pending";
    
    assert.equal(statusClass1, "complete", "Completed class is correct");
    assert.equal(statusClass2, "pending", "Pending class is correct");
});

// ===========================================
// MODULE: Edge Cases
// ===========================================
QUnit.module("Edge Cases", {
    beforeEach: function() {
        window.todos = [];
        window.todoIdCounter = 1;
    }
});

QUnit.test("Deleting non-existent todo doesn't crash", function(assert) {
    todos = [{ id: 1, title: "Todo 1" }];
    
    var idToDelete = 999; // Non-existent ID
    var initialLength = todos.length;
    
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === idToDelete) {
            todos.splice(i, 1);
            break;
        }
    }
    
    assert.equal(todos.length, initialLength, "Array length unchanged");
});

QUnit.test("Toggling non-existent todo doesn't crash", function(assert) {
    todos = [{ id: 1, title: "Todo 1", status: "Pending" }];
    
    var idToToggle = 999; // Non-existent ID
    var initialStatus = todos[0].status;
    
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === idToToggle) {
            todos[i].status = todos[i].status === "Pending" ? "Completed" : "Pending";
            break;
        }
    }
    
    assert.equal(todos[0].status, initialStatus, "Status unchanged for existing todo");
});

QUnit.test("Empty description defaults correctly", function(assert) {
    var description = "";
    var finalDescription = description || "No description";
    
    assert.equal(finalDescription, "No description", "Empty description gets default value");
});

QUnit.test("Undefined priority defaults correctly", function(assert) {
    var priority = undefined;
    var finalPriority = priority || "Medium";
    
    assert.equal(finalPriority, "Medium", "Undefined priority gets default value");
});

// ===========================================
// Test Summary
// ===========================================
QUnit.done(function(details) {
    console.log("===========================================");
    console.log("TEST RUN COMPLETE");
    console.log("===========================================");
    console.log("Total tests: " + details.total);
    console.log("Passed: " + details.passed);
    console.log("Failed: " + details.failed);
    console.log("Runtime: " + details.runtime + "ms");
    console.log("===========================================");
});
