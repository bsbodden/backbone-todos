$(function(){
	Backbone.sync = function(method, model, success, error){ 
		success();
	}
  
	var Todo = Backbone.Model.extend({
		defaults: {
			name: null
		}
	});
 
	var Todos = Backbone.Collection.extend({
		model: Todo
	});

	var TodoView = Backbone.View.extend({
		tagName: 'li', 
		className: 'todo',
		//
		events: { 
			'click a.delete': 'remove'
		},    
		//
		initialize: function(){
			_.bindAll(this, 'render', 'unrender', 'remove');

			this.model.bind('change', this.render);
			this.model.bind('remove', this.unrender);
		},
		//
		render: function(){
			$(this.el).html('<div class="text">'+this.model.get('name')+'</div><div class="actions"><a href="#" class="delete">Done</a></div>');
			return this;
		},
		//
		unrender: function(){
			$(this.el).remove();
		},
		// 
		remove: function(){
			this.model.destroy();
		}
	});
  
	var TodosView = Backbone.View.extend({
		el: $('body'),
		//
		events: {
			'click button#add': 'showPrompt'
		},
		//
		initialize: function(){
			_.bindAll(this, 'render', 'appendTodo');

			this.todos = new Todos();
			this.todos.bind('add', this.appendTodo);
			this.render();
		},
		//
		render: function(){
			$(this.el).append("<ul class='todoList'></ul>");
			$(this.el).append("<button id='add'>New Todo</button>");
			_(this.todos.models).each(function(todo) { 
			  appendTodo(todo);
			}, this);
		},
		//
		showPrompt: function () {
			var name = prompt("New Todo:");
			var todo = new Todo({ name: name });
			this.todos.add(todo);
		},
		//
		appendTodo: function(todo){
			var view = new TodoView({
				model: todo
			});
			$('ul', this.el).append(view.render().el);
		}
	});

	var todosView = new TodosView();
});